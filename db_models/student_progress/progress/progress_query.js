/**
 * Created by Виталий on 15.09.2016.
 */
var Progress = require('./Progress').ProgressModel;
var Standart_query = require('../../standart_query').standarts(Progress);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };

var getProgress = function(aStudentID, callback, error) {
    return Progress.find( {student_id: aStudentID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return error(err);
        }
    });
}

var addData = function(aData, callback, error) {

    var article = new Progress(aData);

    article.save(function (err) {
        if (!err) {
            return callback(article);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Progress.update( {student_id: aData.student_id}, {average_point: aData.average_point}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getProgress = getProgress;
module.exports.addData = addData;
module.exports.updateData = updateData;