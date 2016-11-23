/**
 * Created by Виталий on 15.09.2016.
 */
var Users = require('./Permissions').UsersModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };

var getPermission = function(aLogin, aPassword, callback, error) {
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
            return error(err);
        }
    });
}

var addData = function(aData, callback, error) {
    console.log(aData);
    Users.find({login: aData.login}, function (err, data) {
        if (!err) {
            if (!data.length) {
                var user = new Users(aData);

                user.save(function (err) {
                    if (!err) {
                        return callback(user);
                    } else {
                        return error(err);
                    }
                });
            } else {
                return callback(data[0]);
            }
        } else {
            return error(err)
        }
    })
};

var getElementById = function(aId, callback, error) {
    return Users.findById(aId, function (err, article) {
        if(!article) {
            return error(404);
        } else {
            if (!err) {
                return callback(article);
            } else {
                return error(err);
            }
        }

    });
};

var remove = function(anId, callback, error) {
    return Users.remove({_id: anId}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var changePass = function(aData, callback, error) {
    return Users.update( {_id: aData._id, password: aData.password}, {password: aData.new_password}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

var getByPermission = function(aPermission, callback, error) {
    return Users.find({permission: aPermission}, function (err, res) {
        if (!err) {
            return callback(res);
        } else {
            return error(err);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getPermission = getPermission;
module.exports.addData = addData;
module.exports.getElementById = getElementById;
module.exports.getByPermission = getByPermission;
module.exports.remove = remove;
module.exports.changePass = changePass;