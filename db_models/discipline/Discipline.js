/**
 * Created by Алексей on 19.09.2016.
 */

var discipline = mongoose.Schema;

var Discipline = new discipline({
    student_id: { type: String, required: true },
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

var DisciplineModel = mongoose.model('Discipline', Discipline);

module.exports.DisciplineModel = DisciplineModel;