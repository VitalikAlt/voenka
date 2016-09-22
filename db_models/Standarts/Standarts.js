/**
 * Created by Виталий on 22.09.2016.
 */
var mongoose    = require('mongoose');

var Standarts = mongoose.Schema;

var Standart = new Standarts({
    standart_name: { type: String, required: true }
});

var StandartsModel = mongoose.model('Standart', Standart);

module.exports.StandartsModel = StandartsModel;