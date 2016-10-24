/**
 * Created by Виталий on 23.09.2016.
 */

//  Стандартные функции:
//      1) Получить список              (list)
//      2) Удалить элемент по ID        (remove)
//      3) Удалить все элементы         (remove_All)

module.exports.standarts = function(aDatabase) {

    var query = {};

    query.list = function (callback, error) {
        aDatabase.find(function (err, array) {
            (!err)? callback(array): error(err);
        });
    };

    query.remove = function(anID, callback, error) {
        aDatabase.remove({_id: anID}, function(err, succes) {
            (!err)? callback(succes): error(err);
        });
    };

    query.remove_All = function(callback, error) {
        aDatabase.remove(function(err, succes) {
            (!err)? callback(succes): error(err);
        });
    };

    return query;
};