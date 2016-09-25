/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_tc').Profile_tcModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove_All = function (anID, callback, error) { return Standart_query.remove_All(callback, error); };


var getProfile = function(aTeacherID, callback, err) {
    return Users.find( {teacher_id: aTeacherID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, error) {

    var article = new Users(aData);

    article.save(function (err) {
        if (!err) {
            return callback(article);
        } else {
            return error(err);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getProfile = getProfile;
module.exports.addData = addData;
module.exports.remove_All = remove_All;