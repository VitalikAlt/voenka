/**
 * Created by Виталий on 21.09.2016.
 */
var Discipline = require('./Discipline').DisciplineModel;

// to test (\/ - ready to test) (\/\/ - tested)

//получить список дисциплин \/ \/
//добавить дисциплину \/ \/
//удалить дисциплину \/ \/
//изменить преподавателя дисциплины \/ \/

var getName = function (aData, callback, err) {
    return Discipline.find({_id: aData.discipline_id}, function (err, data) {
        if (!err) {
            return callback(data[0].discipline_name);
        } else {
            return err(500);
        }
    });
};

var addData = function(aData, callback, err) {

    var article = new Discipline({
        discipline_name: aData.discipline_name,
        teacher_id: aData.teacher_id,
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

var remove = function(anID, callback, error) {
    return Discipline.remove({_id: anID}, function(err, succes) {
        if(!err) {
            return callback(succes);
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