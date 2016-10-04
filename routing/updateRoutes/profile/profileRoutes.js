/**
 * Created by vitalik on 27.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/update/student_profile',
        handler: handlerFactory.createWithData(db.profile_st.updateData)
    });

    core.routes.push({
        url: '/update/teacher_profile',
        handler: handlerFactory.createWithData(db.profile_tc.updateData)
    });
};