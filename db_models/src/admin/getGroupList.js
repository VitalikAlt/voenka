/**
 * Created by vitalik on 08.12.16.
 */
// получить список групп с кол-вом человек

module.exports.getGroupList = function(permissions, groups, profile_st) {
    var auth = require('./../adminAuth').adminAuth(permissions);

    var getGroupList = function(callback, error) {
        var rows = [];

        var getGroups = new Promise(function(resolve, reject) {
            groups.getTableList(function(data) {
                return resolve(data);
            }, error);
        });

        getGroups.then(function (res) {
            var count = res.length;

            res.forEach(function (group) {
                profile_st.getProfileByGroup({Id: group._id}, function(res) {
                    rows.push({
                        course: group.course,
                        squad: group.squad,
                        count: res.length
                    });
                    if (rows.length === count) callback(rows);
                }, error);
            })
        }, error);
    };

    return getGroupList;

    return function(aData, callback, error) {
        auth(aData.auth_key, function() {
            getGroupList(callback, error);
        }, error);
    };
};