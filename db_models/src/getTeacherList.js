/**
 * Created by vitalik on 24.11.16.
 */
// получить список преподавателей

module.exports.getByTeacherList = function(permissions, profile_tc) {
    var getTeacherList = function(callback, error) {
        var rows = [];

        var getPermissions = new Promise(function(resolve, reject) {
            permissions.getByPermission("teacher", function(data) {
                return resolve(data);
            });
        }, function(err) {reject(err)});

        getPermissions.then(function (res) {
            var count = res.length;

            res.forEach(function (teacher) {
                profile_tc.getProfile({Id: teacher._id}, function(res) {
                    try {
                        var name = res.surname + ' ' + res.name[0] + '. ' + res.fatherName[0] + '.';
                        rows.push({
                            id: teacher._id,
                            name: name
                        });
                    } catch (e) {
                        rows.push({
                            id: teacher._id,
                            name: 'Undefined'
                        })
                    }
                    if (rows.length === count) callback(rows);
                }, function (err) {error(err)});
            })
        });
    };

    return getTeacherList;
};