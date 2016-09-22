/**
 * Created by Виталий on 20.09.2016.
 */
var Discipline = require('./Student_disciplines').Discipline_stModel;

// to test (\/ - ready to test) (\/\/ - tested)

//получить список предметов студента \/ \/
//добавить предмет студенту \/ \/
//удалить предмет у студента \/
//изменить предмет у студента \/

var getTableList = function(callback, err) {
    return Discipline.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var addData = function(aData, callback, err) {

    var article = new Discipline({
        student_id: aData.student_id,
        discipline_id: aData.discipline_id,
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

var remove = function(aData, callback, error) {
    return Discipline.remove({discipline_id: aData.discipline_id, student_id: aData.student_id}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Discipline.update( {discipline_id: aData.discipline_id, student_id: aData.student_id}, {discipline_id: aData.new_discipline_id}, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.addData = addData;
module.exports.remove = remove;
module.exports.updateData = updateData;