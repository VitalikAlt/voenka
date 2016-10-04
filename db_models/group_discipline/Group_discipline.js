/**
 * Created by Виталий on 29.09.2016.
 */
var mongoose    = require('mongoose');

var Group_dis = mongoose.Schema;

var group_dis = new Group_dis({
    discipline_id: { type: String, required: true },
    group_id: { type: String, required: true }
});

var Group_disModel = mongoose.model('group_dis', group_dis);

module.exports.Group_disModel = Group_disModel;