/**
 * Created by Виталий on 15.09.2016.
 */
var mongoose    = require('mongoose');

var Permissions = mongoose.Schema;

var Users = new Permissions({
    login: { type: String, required: true },
    password: { type: String, required: true},
    permission: { type: String, required: true}
});

var UsersModel = mongoose.model('Users', Users);

module.exports.UsersModel = UsersModel;