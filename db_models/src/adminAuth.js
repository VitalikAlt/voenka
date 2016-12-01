/**
 * Created by vitalik on 01.12.16.
 */
module.exports.adminAuth = function(permission) {
    var validate = function(anId, callback, error) {
        permission.getElementById(anId, function(res) {
            if (res.permission === 'admin') {
                callback();
            } else {
                error();
            }
        }, error);
    };

    return validate;
};