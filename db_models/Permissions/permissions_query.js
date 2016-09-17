/**
 * Created by Виталий on 15.09.2016.
 */
var Users = require('./Permissions').UsersModel;

var getTableList = function(callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var getPermission = function(aLogin, aPassword, callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            var status = false;
            data.forEach(function(usr) {
                if (aLogin == usr.Login && aPassword == usr.Password) {
                    status = true;
                    var data = {
                        permission: usr.Permission,
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
        Login: aData.login,
        Password: aData.password,
        Permission: aData.permission
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

module.exports.getTableList = getTableList;
module.exports.getPermission = getPermission;
module.exports.addData = addData;
module.exports.getElementById = getElementById;