/**
 * Created by Алексей on 23.09.2016.
 */
var mongoose    = require('mongoose');

// модули базы данных
var database = {
    permissions: require('./Permissions/permissions_query'),
    profile_st: require('./Profile_st/pr_st_query'),
    profile_tc: require('./Profile_tc/pr_tc_query'),
    groups: require('./Group/group_query'),
    discipline: require('./Discipline/discipline_query'),
    standarts: require('./Standarts/standarts_query'),
    progress: require('./Student_progress/Progress/progress_query'),
    marks: require('./Student_progress/Marks/marks_query'),
    standarts_st: require('./Student_progress/St_standars/standarts_st_query')
};

// Специальные запросы
database.addStudent = require('./addStudent').addStudent(database.permissions, database.profile_st, database.groups);
database.getStandarts = require('./getStandarts').getStandarts(database.standarts, database.standarts_st);
database.getMarks = require('./getMarks').getMarks(database.discipline, database.marks);

module.exports.db = function(anUrl) {
    mongoose.connect(anUrl);

    return database;
}