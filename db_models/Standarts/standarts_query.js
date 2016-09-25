/**
 * Created by Виталий on 22.09.2016.
 */
var Standarts = require('./Standarts').StandartsModel;
var Standart_query = require('../standart_query').standarts(Standarts);

var getTableList = function(callback, error) { return Standart_query.list (callback, error); };
var remove_All = function (anID, callback, error) { return Standart_query.remove_All (callback, error); };

// to test (\/ - ready to test) (\/\/ - tested)

//получить список нормативов \/
//добавить норматив \/
//удалить норматив \/
//изменить наименование норматива (?) \/

var get = function(aData, callback, error) {
    return Standarts.find({_id: aData.standart_id}, function (err, data) {
        if (!err) {
            return callback(data[0].standart_name);
        } else {
            return error(err);
        }
    });
};

var addData = function(aData, callback, error) {

    var article = new Standarts({
        standart_name: aData.standart_name
    });

    article.save(function (err) {
        if (!err) {
            return callback(article);
        } else {
            return error(err);
        }
    });
};

var remove = function(aData, callback, error) {
    return Standarts.remove({standart_name: aData.standart_name}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Standarts.update( {standart_name: aData.standart_name}, {standart_name: aData.new_standart_name}, function (err) {
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