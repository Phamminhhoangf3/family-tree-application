import Family from '../models/familyModel.js';

const getView = async (id, result) => {
  try {
    Family.getView(id, result);
  } catch (error) {
    throw error;
  }
};

export default { getView };
