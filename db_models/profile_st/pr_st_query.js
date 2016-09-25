/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_st').Profile_stModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove_All = function (anID, callback, error) { return Standart_query.remove_All(callback, error); };

var getProfile = function(aStudentID, callback, error) {
    return Users.find( {student_id: aStudentID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {
    Users.find({student_id: aData.student_id}, function (err, data) {
        if (!err) {
            if (data.length) {
                return callback(data[0])
            } else {
                var user = new Users(aData);

                user.save(function (err) {
                    if (!err) {
                        return callback(user);
                    } else {
                        return error(err);
                    }
                });
            }
        }
    })
};

var updateData = function(aData, callback, error) {
    return Users.update( {student_id: aData.student_id}, aData, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getProfile = getProfile;
module.exports.addData = addData;
module.exports.remove_All = remove_All;
module.exports.updateData = updateData;