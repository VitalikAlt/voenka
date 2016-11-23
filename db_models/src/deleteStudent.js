/**
 * Created by vitalik on 17.11.16.
 */

module.exports.deleteStudent = function(permissions, profile_st, marks, st_standart) {
    var deleteStudent = function(aData, callback, error) {

        console.log(aData);

        if (aData.key = "123") {
            var del1= new Promise(function(resolve, reject) {
                permissions.remove(aData.id, function(res) {
                    return resolve(res);
                }, function() {});
            });
            var del2= new Promise(function(resolve, reject) {
                profile_st.remove(aData.id, function(res) {
                    return resolve(res);
                }, function() {});
            });
            var del3= new Promise(function(resolve, reject) {
                marks.remove(aData.id, function(res) {
                    return resolve(res);
                }, function() {});
            });
            var del4= new Promise(function(resolve, reject) {
                st_standart.remove(aData.id, function(res) {
                    return resolve(res);
                }, function() {});
            });
            Promise.all([del1, del2, del3, del4])
                .then(function(data) {
                    return callback(true);
                });
        }
    };

    return deleteStudent;
};