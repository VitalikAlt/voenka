/**
 * Created by Алексей on 24.09.2016.
 */
var Groups = require('./Group').GroupModel;
var Standart_query = require('../standart_query').standarts(Groups);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove = function (anID, callback, error) { return Standart_query.remove(anID, callback, error); };

var addData = function(aData, callback, error) {
    Groups.find({course: aData.course, squad: aData.squad}, function (err, data) {
        if (!err) {
            if (!data.length) {
                var article = new Groups(aData);

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

var getElementById = function(aData, callback, error) {
    return Groups.findById(aData.Id, function (err, article) {
        if(!article) {
            return error(err);
        }
        if (!err) {
            return callback(article);
        } else {
            return error(err);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.addData = addData;
module.exports.getElementById = getElementById;
module.exports.remove = remove;