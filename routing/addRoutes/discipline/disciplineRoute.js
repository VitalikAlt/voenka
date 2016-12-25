/**
 * Created by vitalik on 12.12.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/add/discipline',
        handler: handlerFactory.createWithData(db.discipline.addData)
    });

    core.routes.push({
        url: '/add/group_dis',
        handler: handlerFactory.createWithData(db.groups_dis.addData)
    });
};