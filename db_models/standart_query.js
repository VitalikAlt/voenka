/**
 * Created by Виталий on 23.09.2016.
 */

//  Стандартные функции:
//      1) Получить список              (list)
//      2) Найти элемент по ID ((?))
//      2) Удалить элемент по ID        (remove)
//      3) Удалить все элементы         (remove_All)
//

module.exports.standarts = function(aDatabase) {

    var query = {};
    var database = aDatabase;

    query.list = function (callback, error) {
        database.find(function (err, array) {
            if (!err) {
                callback(array);
            } else {
                error(err);
            }
        });
    };

    query.remove = function(anID, callback, error) {
        database.remove({_id: anID}, function(err, succes) {
            if(!err) {
                callback(succes);
            } else {
                error(err);
            }
        });
    };

    query.remove_All = function(callback, error) {
        database.remove(function(err, succes) {
            if(!err) {
                callback(succes);
            } else {
                error(err);
            }
        });
    };

    return query;
};