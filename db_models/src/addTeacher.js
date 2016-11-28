/**
 * Created by vitalik on 28.11.16.
 */
module.exports.addTeacher = function(permissions, profile_tc) {

    var addTeacher = function(aData, callback, error) {

        var getPermissions = new Promise(function(resolve, reject) {
            permissions.addData({login: aData.login, password: aData.password, permission: 'teacher'}, function(permission) {
                return resolve(permission);
            }, error);
        });

        getPermissions.then(function (res) {
            profile_tc.addData({teacher_id: res._id}, function(result) {
                return callback(result);
            }, error);
        }, error);
    };

    return addTeacher;
};