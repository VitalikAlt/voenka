/**
 * Created by Алексей on 23.09.2016.
 */

//  Стандартные функции:
//      1) Получить список              (list)
//      2) Удалить элемент по ID        (remove)
//      3) Удалить все элементы         (remove_All)
//

var standarts = {};

standarts.list = function (aDatabase, callback, error) {
    return aDatabase.find(function (err, array) {
        if (!err) {
            return callback(array);
        } else {
            return error(err);
        }
    });
};

standarts.remove = function(aDatabase, aData, callback, error) {
    return aDatabase.remove({_id: aData._id}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

standarts.remove_All = function(aDatabase, callback, error) {
    return aDatabase.remove(function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var standart_functions = function(aDatabase, aFunction, aParams, callback, error) {
    switch (aFunction) {
        case 'list':
            list(callback, error);
            break;
        case 'remove':
            remove(aParams, callback, error);
            break;
        case 'remove_All':
            remove_All(callback, error);
            break;
    }
};

module.exports.standart_functions = standart_functions;
