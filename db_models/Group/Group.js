/**
 * Created by Виталий on 24.09.2016.
 */
var mongoose    = require('mongoose');

var groups = mongoose.Schema;

var Group = new groups({
    course: {type: Number, required: true, min: 0, max: 6},
    squad: {type: Number, required: true, min: 0, max: 15}
});

var GroupModel = mongoose.model('Group', Group);

module.exports.GroupModel = GroupModel;