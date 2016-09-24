/**
 * Created by Алексей on 24.09.2016.
 */
var Groups = require('./Group').GroupModel;
var Standart_query = require('../standart_query').standarts(Groups);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove = function (anID, callback, error) { return Standart_query.remove(anID, callback, error); };

var addData = function(aData, callback, error) {
    console.log('s');
    Groups.find({course: aData.course, squad: aData.squad}, function (err, data) {
        if (!err) {
            if (!data.length) {
                console.log('2');
                var article = new Groups({
                    course: aData.course,
                    squad: aData.squad
                });

                article.save(function (err) {
                    if (!err) {
                        console.log("article created");
                        return callback(article);
                    } else {
                        return error(err);
                    }
                });
            } else {
                //console.log(err);
                return callback(data[0]);
            }
        } else {
            console.log(err);
            return error(err);
        }
    });
};

var getElementById = function(aId, callback, err) {
    return Groups.findById(aId, function (err, article) {
        if(!article) {
            return err(404);
        }
        if (!err) {
            return callback(article);
        } else {
            return err(500);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.addData = addData;
module.exports.getElementById = getElementById;
module.exports.remove = remove;