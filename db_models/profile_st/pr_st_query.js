/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_st').Profile_stModel;

var getTableList = function(callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var getProfile = function(aStudentID, callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            var status = false;
            data.forEach(function(usr) {
                console.log(usr.student_id);
                if (usr.student_id == aStudentID) {
                    status = true;
                    return callback(usr);
                }
            });
            if (!status) {
                return callback('false');
            }
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, err) {

    var article = new Users({
        student_id: aData.student_id,
        name: aData.name,
        surname: aData.surname,
        fatherName: aData.fatherName,
        student_card_number: aData.student_card_number,
        birthPlace: aData.birthPlace,
        education: aData.education,
        military: aData.military,
        address: aData.address,
        parents_address: aData.parents_address,
        faculty: aData.faculty,
        conclusion: aData.conclusion,
        start_study_year: aData.start_study_year,
        birthDate: aData.birthDate,
    });

    article.save(function (err) {
        if (!err) {
            console.log("article created");
            return callback(article);
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                return err(400);
            } else {
                return err(500);
            }
            console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
};

var getElementById = function(aId, callback, err) {
    return Users.findById(aId, function (err, article) {
        if(!article) {
            return err(404);
        }
        if (!err) {
            return callback(article);
        } else {
            return err(500);
        }
    });
};

var removeAll = function(callback, error) {
    return Users.remove({}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
}

module.exports.getTableList = getTableList;
module.exports.getProfile = getProfile;
module.exports.addData = addData;
module.exports.getElementById = getElementById;
module.exports.removeAll = removeAll;