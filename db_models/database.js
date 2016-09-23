/**
 * Created by Алексей on 23.09.2016.
 */
var mongoose    = require('mongoose');

mongoose.connect('mongodb://192.168.1.101:27017');

// модули базы данных

var database = {
    permissions: require('./Permissions/permissions_query'),
    profile_st: require('./Profile_st/pr_st_query'),
    profile_tc: require('./Profile_tc/pr_tc_query'),
    discipline: require('./Discipline/discipline_query'),
    Standarts: require('./Standarts/standarts_query'),
    progress: require('./Student_progress/Progress/progress_query'),
    st_discipline: require('./Student_progress/St_discipline/discipline_st_query'),
    marks: require('./Student_progress/Marks/marks_query'),
    Standarts_st: require('./Student_progress/St_standars/standarts_st_query')
};

module.exports.db = database;