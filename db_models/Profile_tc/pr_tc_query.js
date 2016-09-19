/**
 * Created by Виталий on 19.09.2016.
 */
/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_tc').Profile_tcModel;

var getTableList = function(callback, err) {
    return Users.find(function (err, data) {
        if (!err) {
            return callback(data);
        } else {
            return err(500);
        }
    });
};

var getProfile = function(aTeacherID, callback, err) {
    return Users.find( {teacher_id: aTeacherID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, err) {

    var article = new Users({
        teacher_id: aData.teacher_id,
        name: aData.name,
        surname: aData.surname,
        fatherName: aData.fatherName,
        teacher_passport: aData.student_card_number,
        birthPlace: aData.birthPlace,
        education: aData.education,
        military: aData.military,
        address: aData.address,
        appointment: aData.appointment,
        start_year: aData.start_year,
        birthDate: aData.birthDate
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