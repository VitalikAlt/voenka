/**
 * Created by Виталий on 24.09.2016.
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
var s = function() {
    var arr = [];
    for (var j = 0; j < 1000000000; j++) {
        var pr = new Promise(function(res, rej) {
            var start = new Date();
            var a = true, b = false;
            for(var i = 0; i<10000000;i++) {
                if (a > b) {
                    result++;
                }
            }
            return res(new Date() - start);
        });
        pr.then(function(onFulfilled) {
            var start = new Date();
            var a = true, b = false;
            for(var i = 0; i<10000000;i++) {
                (a > b)? result++: null;
            }
            arr.push(onFulfilled - (new Date() - start));
            console.log(onFulfilled - (new Date() - start));
            if (j === 1000000000 - 1) {
                console.log(arr.reduce(function(a,b) {
                    return (a+b)/2;
                }, 0));
                console.log(arr.reduce(function(a,b) {
                        return a+b;
                    }, 0)/arr.length);
            }
        });
    }
};
var pr = new Promise(function(res, rej) {
    var start = new Date();
    var a = true, b = false;
    for(var i = 0; i<10000000;i++) {
        if (a > b) {
            result++;
        }
    }
    return res(new Date() - start);
});
pr.then(function(onFulfilled) {
    var start = new Date();
    var a = true, b = false;
    for(var i = 0; i<10000000;i++) {
        (a > b)? result++: null;
    }
    console.log(onFulfilled - (new Date() - start));
});
var f1 = function() {
    var start = new Date();
    var a = true, b = false;
    for(var i = 0; i<10000000;i++) {
        if (a > b) {
            result++;
        }
    }
    return (new Date() - start);
};
var f2 = function() {
    var start = new Date();
    var a = true, b = false;
    for(var i = 0; i<10000000;i++) {
        (a > b)? result++: null;
    }
    return (new Date() - start);
};

var s = function(k) {
    var arr = [];
    for (var j = 0; j < k; j++) {
        (function(j) {
            var pr = new Promise(function(res, rej) {
                var start = new Date();
                var a = true, b = false;
                for(var i = 0; i<10000000;i++) {
                    if (a > b) {
                        result++;
                    }
                }
                return res(new Date() - start);
            });
            pr.then(function(onFulfilled) {
                var start = new Date();
                var a = true, b = false;
                for(var i = 0; i<10000000;i++) {
                    (a > b)? result++: null;
                }
                arr.push(onFulfilled - (new Date() - start));
                if (j === k-1) {
                    console.log("1-й быстрее второго на: " + arr.reduce(function(a,b) {
                        return (a+b)/2;
                    }, 0));
                }
            });
        })(j);
    }
};