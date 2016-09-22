/**
 * Created by Виталий on 17.09.2016.
 */
var mongoose    = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/permissions');
//var db = mongoose.connection;

var profile_st = mongoose.Schema;

var Profile = new profile_st({
    student_id: { type: String, required: true },

    group: { type: String, required: false},

    name: { type: String, required: false},
    surname: { type: String, required: false},
    fatherName: { type: String, required: false},
    student_card_number: { type: String, required: false},

    student_propis_number: { type: String, required: false},
    student_military_number: { type: String, required: false},
    contract_data: { type: String, required: false},
    parents_data: { type: String, required: false},
    public_work: { type: String, required: false},
    family_status: { type: String, required: false},

    birthPlace: { type: String, required: false},
    education: { type: String, required: false},
    military: { type: String, required: false},
    address: { type: String, required: false},
    parents_address: { type: String, required: false},
    faculty: { type: String, required: false},
    conclusion: { type: String, required: false},
    start_study_year: { type: String, required: false},
    birthDate: { type: Date, required: false},
});

var Profile_stModel = mongoose.model('Profile', Profile);

module.exports.Profile_stModel = Profile_stModel;