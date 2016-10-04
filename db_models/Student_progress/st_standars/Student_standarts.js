/**
 * Created by Виталий on 22.09.2016.
 */
var mongoose    = require('mongoose');

var Standarts_st = mongoose.Schema;

var Standart_st = new Standarts_st({
    student_id: { type: String, required: true },
    standart_id: { type: String, required: true},
    term: { type: String, required: true},
    standart: { type: String, required: true}
});

var Standarts_stModel = mongoose.model('Standart_st', Standart_st);

module.exports.Standarts_stModel = Standarts_stModel;