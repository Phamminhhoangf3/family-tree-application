const { ObjectId } = require('mongodb');
const { GET_DB } = require('../config/mongodb');

const MEMBER_COLLECTION_NAME = 'members';
const FAMILY_COLLECTION_NAME = 'families';

const Family = function (family) {
  this.type = family.type;
  this.husbandId = family.husbandId;
  this.wifeId = family.wifeId;
  this.exWifeId = family.exWifeId;
  this.childrenIds = family.childrenIds;
  this.status = family.status;
};

Family.getView = async (id, result) => {
  try {
    const family = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
            status: true
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'husbandId',
            foreignField: '_id',
            as: 'husband',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $addFields: {
            husband: {
              $cond: {
                if: { $isArray: ['$husband'] },
                then: { $arrayElemAt: ['$husband', 0] },
                else: null
              }
            }
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'wifeId',
            foreignField: '_id',
            as: 'wife',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $addFields: {
            wife: {
              $cond: {
                if: { $isArray: ['$wife'] },
                then: { $arrayElemAt: ['$wife', 0] },
                else: null
              }
            }
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'exWifeId',
            foreignField: '_id',
            as: 'exWife',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $addFields: {
            exWife: {
              $cond: {
                if: { $isArray: ['$exWife'] },
                then: { $arrayElemAt: ['$exWife', 0] },
                else: null
              }
            }
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'childrenIds',
            foreignField: '_id',
            as: 'children',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $addFields: {
            children: {
              $map: {
                input: '$children',
                as: 'child',
                in: {
                  $mergeObjects: ['$$child', { dadId: '$husbandId' }]
                }
              }
            }
          }
        },
        { $project: { _destroy: 0, husbandId: 0, wifeId: 0, exWifeId: 0, childrenIds: 0 } }
      ])
      .next();
    result(null, family);
  } catch (error) {
    result(error, null);
  }
};

module.exports = Family;
