mongoose = require('mongoose')

#   Модули базы данных
database =
  permissions: require('./Permissions/permissions_query')
  profile_st: require('./Profile_st/pr_st_query')
  profile_tc: require('./Profile_tc/pr_tc_query')
  groups: require('./Group/group_query')
  groups_dis: require('./group_discipline/group_dis_query')
  discipline: require('./Discipline/discipline_query')
  standarts: require('./Standarts/standarts_query')
  progress: require('./Student_progress/progress/progress_query')
  marks: require('./Student_progress/marks/marks_query')
  standarts_st: require('./Student_progress/st_standars/standarts_st_query')

#   Специальные запросы
database.addStudent = require('./src/admin/addStudent').addStudent(database.permissions, database.profile_st, database.groups)
database.addTeacher = require('./src/admin/addTeacher').addTeacher(database.permissions, database.profile_tc)
database.getStudentList = require('./src/admin/getStudentList').getStudentList(database.permissions, database.profile_st, database.groups)
database.getTeacherList = require('./src/admin/getTeacherList').getTeacherList(database.permissions, database.profile_tc)
database.getGroupList = require('./src/admin/getGroupList').getGroupList(database.permissions, database.groups, database.profile_st)
database.deleteStudent = require('./src/admin/deleteStudent').deleteStudent(database.permissions, database.profile_st, database.marks, database.standarts_st)
database.deleteTeacher = require('./src/admin/deleteTeacher').deleteTeacher(database.permissions)
database.getStandarts = require('./getStandarts').getStandarts(database.standarts, database.standarts_st)
database.getMarks = require('./getMarks').getMarks(database.discipline, database.marks)
database.getStudents = require('./getStudents').getMarks(database.discipline, database.marks, database.groups, database.profile_st, database.groups_dis)
database.updateMarks = require('./updateMarks').updateMarks(database.marks)

module.exports.db = (anUrl) ->
  mongoose.connect(anUrl)
  return database

