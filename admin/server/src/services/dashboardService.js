import Dashboard from '../models/dashboardModel.js';

const getAll = async result => {
  try {
    Dashboard.getAll((error, data) => {
      if (error) {
        result(error, null);
      } else {
        const { groupGender, totalMember, totalFamily } = data;
        const labelGender = { male: 'Nam', female: 'Nữ' };
        const genderRatio = groupGender.map(item => ({
          name: labelGender?.[item._id],
          value: +((item.count / totalMember) * 100).toFixed(0)
        }));
        result(null, { totalMember, totalFamily, genderRatio });
      }
    });
  } catch (error) {
    throw error;
  }
};

export default { getAll };
