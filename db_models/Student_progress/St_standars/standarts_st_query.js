/**
 * Created by Виталий on 22.09.2016.
 */
var Standarts_st = require('./Student_standarts').Standarts_stModel;
var Standart_query = require('../../standart_query').standarts(Standarts_st);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };

// to test (\/ - ready to test) (\/\/ - tested)

//получить список нормативов студента ( мб по дисциплине ) \/
//добавить норматив студенту \/
//удалить норматив у студента ( за все семестры? (сейчас) ) \/
//изменить норматив у студента \/

var get = function(aData, callback, error) {
    return Standarts_st.find({student_id: aData.student_id}, function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {

    var article = new Standarts_st(aData);

    article.save(function (err) {
        if (!err) {
            return callback(article);
        } else {
            return error(err);
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