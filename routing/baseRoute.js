/**
 * Created by vitalik on 26.11.16.
 */
var db = require('./../db_models/database').db('mongodb://localhost:27017');

module.exports = (function() {
    this.db = db;
    this.routes = [];

    this.handlerFactory = (function() {
        this.createWithData = function (handler) {
            return function(req,res) {
                handler(req.query, function (succes) {
                    res.send(succes);
                }, function (err) { res.send(err); });
            };
        };

        this.create = function(handler) {
            return function(req,res) {
                handler(function (succes) {
                    res.send(succes);
                }, function (err) { res.send(err); });
            };
        };
        return this;
    })();

    return this;
})();