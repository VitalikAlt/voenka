/**
 * Created by Виталий on 20.09.2016.
 */
var MarkModel = require('./Marks').MarkModel;
var Standart_query = require('../../standart_query').standarts(MarkModel);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };

// to test (\/ - ready to test) (\/\/ - tested)

//получить список оценок по предмету \/ \/
//добавить оценку по предмету \/ \/
//удалить оценку по предмету \/
//изменить оценку \/ \/

var get = function(aData, callback, error) {
    return MarkModel.find({student_discipline_id: aData.student_discipline_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {

    return MarkModel.find({student_discipline_id: aData.student_discipline_id, term: aData.term}, function (err, data) {
        if (!err) {
            if (data.length === 0) {
                var article = new MarkModel(aData);

                article.save(function (err) {
                    if (!err) {
                        return callback(article);
                    } else {
                        return error(err);
                    }
                });
            } else {
                return callback('Element already created');
            }
        } else {
            return error(err);
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