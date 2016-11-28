/**
 * Created by vitalik on 27.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/update/marks',
        handler: handlerFactory.createWithData(db.updateMarks)
    });

    core.routes.push({
        url: '/permissions/change_pass',
        handler: handlerFactory.createWithData(db.permissions.changePass)
    });
};