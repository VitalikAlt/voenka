/**
 * Created by Виталий on 15.09.2016.
 */
var Users = require('./Permissions').UsersModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };

var getPermission = function(aLogin, aPassword, callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            var status = false;
            data.forEach(function(usr) {
                if (aLogin == usr.login && aPassword == usr.password) {
                    status = true;
                    var data = {
                        permission: usr.permission,
                        ID: usr._id
                    }
                    return callback(data);
                }
            });
            if (!status) {
                return callback('false');
            }
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, err) {

    var article = new Users({
        login: aData.login,
        password: aData.password,
        permission: aData.permission
    });

    article.save(function (err) {
        if (!err) {
            console.log("article created");
            return callback(article);
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                return err(400);
            } else {
                return err(500);
            }
            console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
};

var getElementById = function(aId, callback, err) {
    return Users.findById(aId, function (err, article) {
        if(!article) {
            return err(404);
        }
        if (!err) {
            return callback(article);
        } else {
            return err(500);
        }
    });
};

var remove = function(aData, callback, error) {
    return Users.remove({login: aData.login}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var changePass = function(aData, callback, error) {
    return Users.update( {_id: aData._id, Password: aData.password}, {Password: aData.new_password}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getPermission = getPermission;
module.exports.addData = addData;
module.exports.getElementById = getElementById;
module.exports.remove = remove;
module.exports.changePass = changePass;