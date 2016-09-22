/**
 * Created by Алексей on 19.09.2016.
 */
var mongoose    = require('mongoose');

var Student_discipline = mongoose.Schema;

var Discipline_st = new Student_discipline({
    student_id: { type: String, required: true },
    discipline_id: { type: String, required: true}
});

var Discipline_stModel = mongoose.model('Discipline_st', Discipline_st);

module.exports.Discipline_stModel = Discipline_stModel;