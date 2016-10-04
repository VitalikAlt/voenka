mongoose = require('mongoose')

Permissions = mongoose.Schema

Users = new Permissions(
  login:
    type: String
    required: true
  password:
    type: String
    required: true
  permission:
    type: String
    required: true
)

UsersModel = mongoose.model('Users', Users)

module.exports.UsersModel = UsersModel