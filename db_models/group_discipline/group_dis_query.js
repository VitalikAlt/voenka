/**
 * Created by Виталий on 29.09.2016.
 */
var Group_dis = require('./Group_discipline').Group_disModel;
var Standart_query = require('../standart_query').standarts(Group_dis);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove = function (anID, callback, error) { return Standart_query.remove(anID, callback, error); };

var addData = function(aData, callback, error) {
    Group_dis.find({discipline_id: aData.discipline_id, group_id: aData.group_id}, function (err, data) {
        if (!err) {
            if (!data.length) {
                var article = new Group_dis(aData);

                article.save(function (err) {
                    if (!err) {
                        return callback(article);
                    } else {
                        return error(err);
                    }
                });
            } else {
                return callback(data[0]);
            }
        } else {
            return error(err);
        }
    });
};

var get = function(aData, callback, error) {
    return Group_dis.find({discipline_id: aData.discipline_id}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return error(err);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.addData = addData;
module.exports.get = get;
module.exports.remove = remove;