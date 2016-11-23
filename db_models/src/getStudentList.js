/**
 * Created by vitalik on 17.11.16.
 */

//  получить список студентов в виде (ФИО, взвод, курс)

module.exports.getStudentList = function(permissions, profile_st, groups) {
    var getStudentList = function(callback, error) {
        var rows = [];

        var getPermissions = new Promise(function(resolve, reject) {
            permissions.getByPermission("student", function(data) {
                return resolve(data);
            });
        }, function(err) {reject(err)});

        getPermissions.then(function (res) {
            var count = res.length;

            res.forEach(function (student) {
                profile_st.getProfile(student._id, function(res) {
                    var squad, course;
                    if (res.group_id) {
                        groups.getElementById(res.group_id, function(group) {
                            try {
                                var name = res.surname + ' ' + res.name[0] + '. ' + res.fatherName[0] + '.';
                                rows.push({
                                    id: student._id,
                                    num: rows.length,
                                    name: name,
                                    squad: group.squad,
                                    course: group.course
                                });
                            } catch (e) {
                                rows.push({
                                    id: student._id,
                                    num: rows.length,
                                    name: 'Undefined',
                                    squad: group.squad,
                                    course: group.course
                                })
                            }
                            if (rows.length === count) callback(rows);
                        }, function() {});
                    } else {
                        error('No squad');
                    }

                }, function(err) {error(err);})
            });
        })
    };

    return getStudentList;
};