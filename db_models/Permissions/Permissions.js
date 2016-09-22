/**
 * Created by Виталий on 15.09.2016.
 */
var mongoose    = require('mongoose');
// вот это
mongoose.connect('mongodb://192.168.1.100:27017/permissions');
var db = mongoose.connection;

var Permissions = mongoose.Schema;

var Users = new Permissions({
    Login: { type: String, required: true },
    Password: { type: String, required: true},
    Permission: { type: String, required: true}
});

var UsersModel = mongoose.model('Users', Users);

module.exports.UsersModel = UsersModel;