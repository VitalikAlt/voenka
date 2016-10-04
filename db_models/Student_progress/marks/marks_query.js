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
    return MarkModel.find({student_id: aData.student_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return error(err);
        }
    });
};

var get1 = function(aData, callback, error) {
    return MarkModel.find({student_id: aData.student_id, discipline_id: aData.discipline_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return error(err);
        }
    });
};

var getByDiscipline = function(aData, callback, error) {
    return MarkModel.find({discipline_id: aData.discipline_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {

    return MarkModel.find({student_id: aData.student_id, term: aData.term, discipline_id: aData.discipline_id}, function (err, data) {
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
    return MarkModel.remove({student_id: aData.student_id, term: aData.term, discipline_id: aData.discipline_id}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var removeSt = function(anId, callback, error) {
    return MarkModel.remove({student_id: anId}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    addData(aData, function (res) {
        if (res === 'Element already created') {
            return MarkModel.update( {student_id: aData.student_id, term: aData.term, discipline_id: aData.discipline_id}, {mark: aData.mark}, function (err) {
                if (!err) {
                    return callback(true);
                } else {
                    return error(false);
                }
            });
        } else {
            callback(res);
        }
    }, error);
};

module.exports.getTableList = getTableList;
module.exports.get = get;
module.exports.get1 = get1;
module.exports.getByDiscipline = getByDiscipline;
module.exports.addData = addData;
module.exports.remove = remove;
module.exports.removeSt = removeSt;
module.exports.updateData = updateData;