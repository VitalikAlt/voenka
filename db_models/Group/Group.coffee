mongoose = require('mongoose')

groups = mongoose.Schema

Group = new groups(
  course:
    type: Number
    required: true
    min: 0
    max: 6
  squad:
    type: Number
    required: false
    min: 0
    max: 15
)

GroupModel = mongoose.model('Group', Group)

module.exports.GroupModel = GroupModel