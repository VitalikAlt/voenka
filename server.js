'use strict';

var express     = require("express");
var app         = express();
var body        = require('body-parser');
var path        = require('path');

require('coffee-script');

var RouteHandler = require('./routing/RouteHandler');
var db = {};
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(express.static(path.join(__dirname + '/clientApp')));

RouteHandler.createRoute(app);

app.use('*', function(req, res){
    res.sendFile(__dirname + '/clientApp/index.html');
});

app.listen(8084);