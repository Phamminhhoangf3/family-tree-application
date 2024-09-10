import { StatusCodes } from 'http-status-codes';
import dashboardService from '../services/dashboardService.js';

const getAll = async (req, res, next) => {
  try {
    dashboardService.getAll((error, data) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || 'Có lỗi xảy ra!'
        });
      } else {
        res.status(StatusCodes.OK).json(data);
      }
    });
  } catch (error) {
    next(error);
  }
};

export default { getAll };
