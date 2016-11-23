/**
 * Created by Алексей on 19.09.2016.
 */
var mongoose    = require('mongoose');

var progress = mongoose.Schema;

//переделать в int (заменить замену строки в число в модуле подсчёта % прогулов)

var Progress_st = new progress({
    student_id: { type: String, required: true },
    average_point: { type: String, required: true},
    skippings: { type: String, required: true},
    visitings: { type: String, required: true},
});

var ProgressModel = mongoose.model('Progress_st', Progress_st);

module.exports.ProgressModel = ProgressModel;