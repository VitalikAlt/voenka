mongoose = require('mongoose')

Standarts = mongoose.Schema

Standart = new Standarts(
  standart_name:
    type: String
    required: true
)

StandartsModel = mongoose.model('Standart', Standart)

module.exports.StandartsModel = StandartsModel