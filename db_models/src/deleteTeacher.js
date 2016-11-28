/**
 * Created by vitalik on 28.11.16.
 */
module.exports.deleteTeacher = function(permissions) {
    var deleteTeacher = function(aData, callback, error) {

        if (aData.key = "123") {
            var del1= new Promise(function(resolve, reject) {
                permissions.remove(aData.id, function(res) {
                    return resolve(res);
                }, function() {});
            });
            Promise.all([del1])
                .then(function(data) {
                    return callback(true);
                });
        }
    };

    return deleteTeacher;
};