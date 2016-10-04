/**
 * Created by vitalik on 28.11.16.
 */

module.exports.deleteTeacher = function(permissions) {
    var auth = require('./../adminAuth').adminAuth(permissions);


    var deleteTeacher = function(aData, callback, error) {
        var del1= new Promise(function(resolve, reject) {
            permissions.remove(aData.id, function(res) {
                return resolve(res);
            }, function() {});
        });

        Promise.all([del1])
            .then(function(data) {
                return callback(true);
            });
    };

    return function(aData, callback, error) {
        auth(aData.auth_key, function() {
            deleteTeacher(aData, callback, error);
        }, error);
    };
};