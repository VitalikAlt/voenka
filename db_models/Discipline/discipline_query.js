/**
 * Created by Виталий on 21.09.2016.
 */
var Discipline = require('./Discipline').DisciplineModel;
var Standart_query = require('../standart_query').standarts(Discipline);

var remove = function (anID, callback, error) { return Standart_query.remove(anID, callback, error); };

// to test (\/ - ready to test) (\/\/ - tested)

//получить список дисциплин \/ 
//добавить дисциплину \/ 
//удалить дисциплину \/ 
//изменить преподавателя дисциплины \/

var getName = function (aData, callback, error) {
    return Discipline.find({_id: aData.discipline_id}, function (err, data) {
        if (!err) {
            return callback(data[0].discipline_name);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {
    var article = new Discipline(aData);

    article.save(function (err) {
        if (!err) {
            return callback(article);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Discipline.update( {_id: aData._id}, {teacher_id: aData.teacher_id}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getName = getName;
module.exports.addData = addData;
module.exports.remove = remove;
module.exports.updateData = updateData;