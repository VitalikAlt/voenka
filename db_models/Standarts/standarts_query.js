/**
 * Created by Виталий on 22.09.2016.
 */
var Standarts = require('./Standarts').StandartsModel;

// to test (\/ - ready to test) (\/\/ - tested)

//получить список нормативов \/
//добавить норматив \/
//удалить норматив \/
//изменить наименование норматива (?) \/

var getTableList = function(callback, err) {
    return Standarts.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var get = function(aData, callback, err) {
    return Standarts.find({_id: aData.standart_id}, function (err, data) {
        if (!err) {
            return callback(data[0].standart_name);
        } else {
            return err(500);
        }
    });
};

var addData = function(aData, callback, err) {

    var article = new Standarts({
        standart_name: aData.standart_name
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