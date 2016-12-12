/**
 * Created by vitalik on 12.12.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/delete/discipline',
        handler: handlerFactory.createWithData(db.discipline.remove)
    });
};