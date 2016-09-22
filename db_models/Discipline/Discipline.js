/**
 * Created by Виталий on 20.09.2016.
 */
var mongoose    = require('mongoose');

var Discipline = mongoose.Schema;

var discipline = new Discipline({
    discipline_name: { type: String, required: true },
    teacher_id: { type: String, required: true}
});

var DisciplineModel = mongoose.model('discipline', discipline);

module.exports.DisciplineModel = DisciplineModel;