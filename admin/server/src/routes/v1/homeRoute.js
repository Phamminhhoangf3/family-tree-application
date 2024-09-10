import express from 'express';
import dashboardController from '../../controllers/dashboardController.js';

const Router = express.Router();

Router.get('/', dashboardController.getAll);

export const dashboardRoute = Router;
