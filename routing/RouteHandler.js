/**
 * Created by vitalik on 26.11.16.
 */
var getRoutes = require('./getRoutes/routes');
var addRoutes = require('./addRoutes/routes');
var deleteRoutes = require('./deleteRoutes/routes');
var updateRoutes = require('./updateRoutes/routes');

module.exports.createRoute = function(app) {
    getRoutes.forEach(function (route) {
        app.get(route.url, route.handler);
    });

    addRoutes.forEach(function (route) {
        app.post(route.url, route.handler);
    });

    deleteRoutes.forEach(function (route) {
        app.post(route.url, route.handler);
    });

    updateRoutes.forEach(function (route) {
        app.post(route.url, route.handler);
    });

    return app;
};