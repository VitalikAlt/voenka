mongoose = require('mongoose')

Group_dis = mongoose.Schema

group_dis = new Group_dis(
  discipline_id:
    type: String
    required: true
  group_id:
    type: String
    required: true
)

Group_disModel = mongoose.model('group_dis', group_dis)

module.exports.DisciplineModel = Group_disModel