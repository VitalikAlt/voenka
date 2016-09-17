/**
 * Created by Виталий on 17.09.2016.
 */
var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:27017/profile_tc');
var db = mongoose.connection;

var profile_tc = mongoose.Schema;

var Profile = new profile_tc({
    teacher_id: { type: String, required: true },
    name: { type: String, required: true},
    surname: { type: String, required: true},
    fatherName: { type: String, required: true},
    teacher_passport: { type: String, required: true},
    birthPlace: { type: String, required: true},
    education: { type: String, required: true},
    military: { type: String, required: true},
    address: { type: String, required: true},
    appointment: { type: String, required: true},
    start_year: { type: String, required: true},
    birthDate: { type: Date, required: true},
});

var Profile_tcModel = mongoose.model('Profile', Profile);

module.exports.Profile_tcModel = Profile_tcModel;