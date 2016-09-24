/**
 * Created by Алексей on 23.09.2016.
 */

//  Стандартные функции:
//      1) Получить список              (list)
//      2) Найти элемент по ID ((?))
//      2) Удалить элемент по ID        (remove)
//      3) Удалить все элементы         (remove_All)
//

var standarts = {};

standarts.a = function () {
    console.log(standarts.aDatabase);
    //return aDatabase;
}

standarts.list = function (callback, error) {
    return standarts.aDatabase.find(function (err, array) {
        if (!err) {
            return callback(array);
        } else {
            return error(err);
        }
    });
};

standarts.remove = function(anID, callback, error) {
    return standarts.aDatabase.remove({_id: anID}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

standarts.remove_All = function(callback, error) {
    return standarts.aDatabase.remove(function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

// var standart_functions = function(aDatabase, aFunction, aParams, callback, error) {
//     switch (aFunction) {
//         case 'list':
//             list(callback, error);
//             break;
//         case 'remove':
//             remove(aParams, callback, error);
//             break;
//         case 'remove_All':
//             remove_All(callback, error);
//             break;
//     }
// };

//module.exports.standart_functions = standart_functions;
module.exports.standarts = function(Database) {
    standarts.aDatabase = Database;
    return standarts;
};