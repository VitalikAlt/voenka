mongoose = require('mongoose')

Discipline = mongoose.Schema

discipline = new Discipline(
  discipline_name:
    type: String
    required: true
  teacher_id:
    type: String
    required: false
)

DisciplineModel = mongoose.model('discipline', discipline)

module.exports.DisciplineModel = DisciplineModel