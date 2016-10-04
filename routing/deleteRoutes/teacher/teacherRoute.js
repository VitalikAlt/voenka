/**
 * Created by vitalik on 28.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/delete/teacher',
        handler: handlerFactory.createWithData(db.deleteTeacher)
    });
};