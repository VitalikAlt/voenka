/**
 * Created by vitalik on 26.11.16.
 */
var baseRoute = require('./../baseRoute');

// Добавление роутов
require('./auth/authRoutes').add(baseRoute);
require('./data/dataRoutes').add(baseRoute);
require('./list/listRoutes').add(baseRoute);

module.exports = baseRoute.routes;
