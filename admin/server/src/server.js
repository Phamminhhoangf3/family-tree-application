/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import exitHook from 'async-exit-hook';
import cookieParser from 'cookie-parser';
import { APIs_V1 } from './routes/v1/index.js';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import { env } from './config/environment.js';
import { corsOptions } from './config/cors.js';
import serviceAccount from './serviceAccountKey.json';
import admin from 'firebase-admin';
import sharp from 'sharp';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';

const initFirebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET
  });
  return admin.storage().bucket();
};

const configureMulter = () => multer({ storage: multer.memoryStorage() });

const initMiddlewares = app => {
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(errorHandlingMiddleware);
  app.use('/v1', APIs_V1);
};

const uploadImageHandler = bucket => async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(StatusCodes.BAD_GATEWAY).send('không có file được gửi lên!');
  }
  try {
    const resizedImageBuffer = await sharp(file.buffer).resize(200).toFormat('png').toBuffer();
    const blob = bucket.file(`images/resized-${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'image/png'
      }
    });

    blobStream.on('error', err => {
      console.error('Lỗi khi tải lên:', err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Lỗi trong quá trình tải lên ảnh!');
    });

    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(StatusCodes.OK).json({
        message: 'Ảnh đã được tải lên thành công!',
        imageUrl: publicUrl
      });
    });

    blobStream.end(resizedImageBuffer);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Lỗi trong quá trình tải lên ảnh!');
  }
};

const createServer = bucket => {
  const app = express();
  const upload = configureMulter();
  initMiddlewares(app);
  app.get('/', (req, res) => res.send('WellCome to api admin!'));
  app.post('/uploadImage', upload.single('image'), uploadImageHandler(bucket));
  return app;
};

const startServer = app => {
  const port = env.BUILD_MODE === 'production' ? process.env.PORT : env.LOCAL_DEV_APP_PORT;
  const host = env.BUILD_MODE === 'production' ? undefined : env.LOCAL_DEV_APP_HOST;

  app.listen(port, host, () => {
    console.log(
      `${env.BUILD_MODE === 'production' ? 'Production' : 'Local dev'}: ${
        host ? `${host}:` : ''
      }${port}/`
    );
  });
};

(async () => {
  try {
    await CONNECT_DB();
    const bucket = initFirebaseAdmin();
    const app = createServer(bucket);
    startServer(app);
    exitHook(() => {
      CLOSE_DB();
      console.log('exit done!');
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
