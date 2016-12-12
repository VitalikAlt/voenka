/**
 * Created by vitalik on 27.11.16.
 */
var baseRoute = require('./../baseRoute');

// Добавление роутов
require('./student/studentRoute').add(baseRoute);
require('./teacher/teacherRoute').add(baseRoute);
require('./group/groupRoute').add(baseRoute);
require('./discipline/disciplineRoute').add(baseRoute);

module.exports = baseRoute.routes;