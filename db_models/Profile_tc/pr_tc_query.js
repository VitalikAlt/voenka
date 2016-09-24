/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_tc').Profile_tcModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove_All = function (anID, callback, error) { return Standart_query.remove_All(callback, error); };


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

module.exports.getTableList = getTableList;
module.exports.getProfile = getProfile;
module.exports.addData = addData;
module.exports.removeAll = removeAll;