/**
 * Created by Виталий on 22.09.2016.
 */
var Standarts_st = require('./Student_standarts').Standarts_stModel;

// to test (\/ - ready to test) (\/\/ - tested)

//получить список нормативов студента ( мб по дисциплине ) \/
//добавить норматив студенту \/
//удалить норматив у студента ( за все семестры? (сейчас) ) \/
//изменить норматив у студента \/

var getTableList = function(callback, err) {
    return Standarts_st.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var get = function(aData, callback, err) {
    return Standarts_st.find({student_id: aData.student_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var addData = function(aData, callback, err) {

    var article = new Standarts_st({
        student_id: aData.student_id,
        standart: aData.standart,
        standart_id: aData.standart_id,
        term: aData.term
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
    return Standarts_st.remove({student_id: aData.student_id, standart_id: aData.standart_id}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Standarts_st.update( {standart_id: aData.standart_id, student_id: aData.student_id, term: aData.term}, {standart: aData.standart}, function (err) {
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