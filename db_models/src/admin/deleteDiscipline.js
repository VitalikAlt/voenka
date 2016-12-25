/**
 * Created by vitalik on 25.12.16.
 */
module.exports.deleteDiscipline = function(permissions, discipline, group_dis) {
    var auth = require('./../adminAuth').adminAuth(permissions);

    var deleteDiscipline = function(aData, callback, error) {
        var del1= new Promise(function(resolve, reject) {
            discipline.remove(aData, function(res) {
                return resolve(res);
            }, function() {});
        });
        var del2= new Promise(function(resolve, reject) {
            group_dis.removeByDis(aData, function(res) {
                return resolve(res);
            }, function(err) {});
        });
        Promise.all([del1, del2])
            .then(function(data) {
                return callback(true);
            });
    };

    return function(aData, callback, error) {
        auth(aData.auth_key, function() {
            deleteDiscipline(aData, callback, error);
        }, error);
    };
};