'use strict';
var express    = require("express");
var app        = express();
var body       = require('body-parser');
var path       = require('path');
var db = require('./db_models/query');

app.use(express.static(path.join(__dirname + '/clientApp')));

app.get('/api/articles', function(req, res) {
    db.getPermission(req.query.login, req.query.password, function(data) {
        res.send(data);
    });
});

app.post('/api/articles', function(req, res) {
    db.addData(req.query, function(data) {
        res.send(data);
    });
});

app.get('/api/articles/:id', function(req, res) {
    db.getElementById(req.params.id, function (data) {
        res.send(data);
    }, function (data) {
        res.send(data);
    });
});

app.post('/auth/admin/connect', function(req, res) {
    console.log(req.query.password);
    res.send(req.query.password);
    //res.redirect('/auth/admin/connect');
    //res.sendFile(__dirname + '/clientApp/admin/connect.html');
});

app.get('/admin', function(req, res) {
    //res.send('sda');
    res.sendFile(__dirname + '/clientApp/admin/administration.html');
});

app.get('/api/articles', function(req, res) {
    first_API.getTableList(function(data) {
        res.send(data);
    });
});

app.get('/auth/s', function(req, res) {
    res.send('sda');
    //res.sendFile(__dirname + '/clientApp/admin/connect.html');
});

app.use('*', function(req, res){
    res.sendFile(__dirname + '/clientApp/index.html');
});

app.listen(8084);

