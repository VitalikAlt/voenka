/**
 * Created by vitalik on 12.12.16.
 */
module.exports.getDisciplineList = function(permissions, discipline, profile_tc) {
    var auth = require('./../adminAuth').adminAuth(permissions);

    var getDisciplineList = function(callback, error) {
        var rows = [];

        var getDisciplines = new Promise(function(resolve, reject) {
            discipline.getTableList(function(data) {
                return resolve(data);
            }, error);
        });

        getDisciplines.then(function (res) {
            var count = res.length;

            res.forEach(function (discipline) {
                profile_tc.getProfile({Id: discipline.teacher_id}, function(res) {
                    rows.push({
                        id: discipline._id,
                        name: discipline.discipline_name,
                        teacher: res.surname
                    });
                    if (rows.length === count) callback(rows);
                }, error);
            })
        }, error);
    };

    return function(aData, callback, error) {
        auth(aData.auth_key, function() {
            getDisciplineList(callback, error);
        }, error);
    };
};