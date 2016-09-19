/**
 * Created by Виталий on 15.09.2016.
 */
var mongoose    = require('mongoose');

mongoose.connect('mongodb://192.168.1.101:27017/permissions');
var db = mongoose.connection;

var Permissions = mongoose.Schema;

var Users = new Permissions({
    Login: { type: String, required: true },
    Password: { type: String, required: true},
    Permission: { type: String, required: true}
});

var UsersModel = mongoose.model('Progress', Users);

module.exports.UsersModel = UsersModel;