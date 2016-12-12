/**
 * Created by vitalik on 27.11.16.
 */
var baseRoute = require('./../baseRoute');

// Добавление роутов
require('./student/studentRoute').add(baseRoute);
require('./teacher/teacherRoute').add(baseRoute);
require('./teacher/teacherRoute').add(baseRoute);

module.exports = baseRoute.routes;