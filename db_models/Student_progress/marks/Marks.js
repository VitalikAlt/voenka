/**
 * Created by Виталий on 20.09.2016.
 */
var mongoose    = require('mongoose');

var marks = mongoose.Schema;

var Mark = new marks({
    student_id: { type: String, required: true },
    discipline_id: { type: String, required: true },
    term: { type: String, required: true},
    mark: {type: Number, required: true, min: 0, max: 5}
});

var MarkModel = mongoose.model('Mark', Mark);

module.exports.MarkModel = MarkModel;