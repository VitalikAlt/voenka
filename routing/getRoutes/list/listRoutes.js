/**
 * Created by vitalik on 26.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

    core.routes.push({
        url: '/get/studentList',
        handler: handlerFactory.create(db.getStudentList)
    });

    core.routes.push({
        url: '/get/teacherList',
        handler: handlerFactory.create(db.getTeacherList)
    });

    core.routes.push({
        url: '/get/permissionList',
        handler: handlerFactory.create(db.permissions.getTableList)
    });

    core.routes.push({
        url: '/get/student_profileList',
        handler: handlerFactory.create(db.profile_st.getTableList)
    });

    core.routes.push({
        url: '/get/discipline_groupsList',
        handler: handlerFactory.create(db.groups_dis.getTableList)
    });
};