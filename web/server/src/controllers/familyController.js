import { StatusCodes } from 'http-status-codes';
import familyService from '../services/familyService';

const getView = async (req, res, next) => {
  try {
    const id = req.params?.id;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Nội dung không được để trống!'
      });
    }
    familyService.getView(id, (error, data) => {
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

export default { getView };
