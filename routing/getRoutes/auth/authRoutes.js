/**
 * Created by vitalik on 26.11.16.
 */
module.exports.add = function(core) {
    console.log(core.routes);
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/get/permission',
        handler: handlerFactory.createWithData(db.permissions.getPermission)
    });

    core.routes.push({
        url: '/get/student_profile',
        handler: handlerFactory.createWithData(db.profile_st.getProfile)
    });

    core.routes.push({
        url: '/get/teacher_profile',
        handler: handlerFactory.createWithData(db.profile_tc.getProfile)
    });
};