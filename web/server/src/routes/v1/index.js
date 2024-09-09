import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { familyWebRoute } from './familyRoute.js';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});

Router.use('/family', familyWebRoute);

export const APIs_V1 = Router;
