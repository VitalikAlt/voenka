/**
 * Created by Виталий on 17.09.2016.
 */
var Users = require('./Profile_st').Profile_stModel;
var Standart_query = require('../standart_query').standarts(Users);

var getTableList = function(callback, error) { return Standart_query.list(callback, error); };
var remove_All = function (anID, callback, error) { return Standart_query.remove_All(callback, error); };

var getProfile = function(aStudentID, callback, err) {
    return Users.find( {student_id: aStudentID}, function (err, data) {
        if (!err) {
            return callback(data[0]);
        } else {
            return err(500);
        }
    });
}

var addData = function(aData, callback, err) {

    var article = new Users({
        student_id: aData.student_id,

        group: aData.group,

        name: aData.name,
        surname: aData.surname,
        fatherName: aData.fatherName,
        student_card_number: aData.student_card_number,

        student_propis_number: aData.student_propis_number,
        student_military_number: aData.student_military_number,
        contract_data: aData.contract_data,
        parents_data: aData.parents_data,
        public_work: aData.public_work,
        family_status: aData.family_status,

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

var removeAll = function(callback, error) {
    return Users.remove({}, function(err, succes) {
        if(!err) {
            return callback(succes);
        } else {
            return error(err);
        }
    });
};

var updateData = function(aData, callback, error) {
    return Users.update( {student_id: aData.student_id},
        {
            group: aData.group,

            name: aData.name,
            surname: aData.surname,
            fatherName: aData.fatherName,
            student_card_number: aData.student_card_number,

            student_propis_number: aData.student_propis_number,
            student_military_number: aData.student_military_number,
            contract_data: aData.contract_data,
            parents_data: aData.parents_data,
            public_work: aData.public_work,
            family_status: aData.family_status,

            birthPlace: aData.birthPlace,
            education: aData.education,
            military: aData.military,
            address: aData.address,
            parents_address: aData.parents_address,
            faculty: aData.faculty,
            conclusion: aData.conclusion,
            start_study_year: aData.start_study_year,
            birthDate: aData.birthDate,
        }, function (err) {
        if (!err) {
            return callback(true);
        } else {
            return error(false);
        }
    });
};

module.exports.getTableList = getTableList;
module.exports.getProfile = getProfile;
module.exports.addData = addData;
module.exports.remove_All = remove_All;
module.exports.updateData = updateData;