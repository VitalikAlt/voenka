/**
 * Created by vitalik on 27.11.16.
 */
var baseRoute = require('./../baseRoute');

// Добавление роутов
require('./profile/profileRoutes').add(baseRoute);
require('./data/dataRoutes').add(baseRoute);

module.exports = baseRoute.routes;