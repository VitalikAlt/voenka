/**
 * Created by vitalik on 17.11.16.
 */
// Добавить студента (Логин, пароль, взвод, курс)

module.exports.addStudent = function(permissions, profile_st, groups) {

    var addStudent = function(aData, callback, error) {

        var getPermissions = new Promise(function(resolve, reject) {
            permissions.addData({login: aData.login, password: aData.password, permission: 'student'}, function(permission) {
                return resolve(permission);
            }, error);
        });

        var addData = new Promise(function(resolve, reject) {
            groups.addData({course: aData.course, squad: aData.squad}, function (group) {
                return resolve(group);
            }, error);
        });

        Promise.all([getPermissions, addData])
            .then(function(data) {
                profile_st.addData({student_id: data[0]._id, group_id: data[1]._id}, function(result) {
                    return callback(result);
                }, error);
            });
    };

    return addStudent;
};