/**
 * Created by Виталий on 17.09.2016.
 */
var mongoose    = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/profile_tc');
// var db = mongoose.connection;

var profile_tc = mongoose.Schema;

var Profile_tc = new profile_tc({
    teacher_id: { type: String, required: true },
    name: { type: String, required: true},
    surname: { type: String, required: true},
    fatherName: { type: String, required: true},
    teacher_passport: { type: String, required: false},
    birthPlace: { type: String, required: false},
    education: { type: String, required: false},
    military: { type: String, required: false},
    address: { type: String, required: false},
    appointment: { type: String, required: false},
    start_year: { type: String, required: false},
    birthDate: { type: Date, required: false},
});

var Profile_tcModel = mongoose.model('Profile_tc', Profile_tc);

module.exports.Profile_tcModel = Profile_tcModel;