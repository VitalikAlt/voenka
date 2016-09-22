/**
 * Created by Виталий on 20.09.2016.
 */
var MarkModel = require('./Marks').MarkModel;

// to test (\/ - ready to test) (\/\/ - tested)

//получить список оценок по предмету \/ \/
//добавить оценку по предмету \/ \/
//удалить оценку по предмету \/
//изменить оценку \/ \/


var getTableList = function(callback, err) {
    return MarkModel.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var get = function(aData, callback, err) {
    return MarkModel.find({student_discipline_id: aData.student_discipline_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var addData = function(aData, callback, err) {

    return MarkModel.find({student_discipline_id: aData.student_discipline_id, term: aData.term}, function (err, data) {
        if (!err) {
            if (data.length === 0) {
                var article = new MarkModel({
                    student_discipline_id: aData.student_discipline_id,
                    term: aData.term,
                    mark: aData.mark
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
            } else {
                return callback('Element already created');
            }
        } else {
            return err(500);
        }
    });
};

var remove = function(aData, callback, error) {
    return MarkModel.remove({student_discipline_id: aData.student_discipline_id, term: aData.term}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return MarkModel.update( {student_discipline_id: aData.student_discipline_id, term: aData.term}, {mark: aData.mark}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.get = get;
module.exports.addData = addData;
module.exports.remove = remove;
module.exports.updateData = updateData;