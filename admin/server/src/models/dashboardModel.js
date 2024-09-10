const { FAMILY_COLLECTION_NAME } = require('../schemas/familySchema.js');
const { MEMBER_COLLECTION_NAME } = require('../../build/src/models/memberModel.js');
const { GET_DB } = require('../config/mongodb.js');

const Dashboard = function (dashboard) {
  this.countFamily = dashboard.countFamily;
};

Dashboard.getAll = async result => {
  try {
    const totalMember = await GET_DB().collection(MEMBER_COLLECTION_NAME).countDocuments({
      status: true,
      _destroy: false
    });

    const totalFamily = await GET_DB().collection(FAMILY_COLLECTION_NAME).countDocuments({
      status: true,
      _destroy: false
    });

    const groupGender = await GET_DB()
      .collection(MEMBER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            status: true,
            _destroy: false
          }
        },
        {
          $group: {
            _id: '$gender',
            count: { $sum: 1 }
          }
        }
      ])
      .toArray();

    result(null, {
      totalMember,
      totalFamily,
      groupGender
    });
  } catch (error) {
    result(error, null);
  }
};

module.exports = Dashboard;
