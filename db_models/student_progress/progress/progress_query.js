/**
 * Created by Виталий on 15.09.2016.
 */
var Progress = require('./Progress').ProgressModel;

var getTableList = function(callback, err) {
    return Progress.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var getProgress = function(aStudentID, callback, err) {
    return Progress.find( {student_id: aStudentID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, err) {

    var article = new Progress({
        student_id: aData.student_id,
        average_point: aData.average_point,
        skippings: aData.skippings,
        visitings: aData.visitings
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