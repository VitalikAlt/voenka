/**
 * Created by vitalik on 27.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/add/student',
        handler: handlerFactory.createWithData(db.addStudent)
    });
};