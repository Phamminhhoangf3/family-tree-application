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

const START_SERVER = () => {
  const app = express();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET
  });

  const bucket = admin.storage().bucket();
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  app.use(cors(corsOptions));

  app.options('*', cors(corsOptions));

  app.use(express.json());

  app.use(errorHandlingMiddleware);

  app.use(cookieParser());

  app.use('/v1', APIs_V1);

  app.get('/', (req, res) => res.send('Wellcome to api admin!'));

  app.post('/uploadImage', upload.single('image'), async (req, res) => {
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
  });

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production port:${process.env.PORT}`);
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Local dev: ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`);
    });
  }

  exitHook(() => {
    CLOSE_DB();
    console.log('exit done!');
  });
};

(async () => {
  try {
    await CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
