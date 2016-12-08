'use strict';

var express     = require("express");
var app         = express();
var body        = require('body-parser');
var path        = require('path');
require('coffee-script');
var RouteHandler = require('./routing/RouteHandler');
var db = {};
app.use(express.static(path.join(__dirname + '/clientApp')));

RouteHandler.createRoute(app);

//========================== Permissions ==========================================================================
//нужно, чтобы добавить админа
app.get('/Permissions/add', function(req, res) {
    db.permissions.addData(req.query, function(data) {
        res.send(data);
    });
});
//=================================================================================================================

//====================== Discipline =================================================================================
//test не ведут запросы
app.get('/db/discipline/get', function(req, res) {
    db.discipline.get(req.query, function(data) {
        res.send(data);
    });
});
app.get('/db/discipline/table', function(req, res) {
    db.discipline.getTableList(function(data) {
        res.send(data);
    });
});
app.post('/db/discipline/add', function(req, res) {
    db.discipline.addData(req.query, function(data) {
        res.send(data);
    });
});
app.post('/db/discipline/remove', function(req, res) {
    db.discipline.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/discipline/update', function(req, res) {
    db.discipline.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== marks =================================================================================
//test не ведут запросы
app.get('/db/marks/get', function(req, res) {
    db.marks.get(req.query, function(data) {
        res.send(data);
    })
});
app.get('/db/marks/table', function(req, res) {
    db.marks.getTableList(function(data) {
        res.send(data);
    })
});
app.post('/db/marks/add', function(req, res) {
    db.marks.addData(req.query, function(data) {
        res.send(data);
    });
});
app.post('/db/marks/remove', function(req, res) {
    db.marks.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/marks/update', function(req, res) {
    db.marks.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== Standarts ================================================================================
//test не ведут запросы
app.get('/db/Standarts/table', function(req, res) {
    db.standarts.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/db/Standarts/get', function(req, res) {
    db.standarts.get(req.query, function(data) {
        res.send(data);
    })
});
app.post('/db/Standarts/add', function(req, res) {
    db.standarts.addData(req.query, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts/remove', function(req, res) {
    db.standarts.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts/update', function(req, res) {
    db.standarts.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== Standarts_st ================================================================================
//test не ведут
app.get('/db/Standarts_st/table', function(req, res) {
    db.standarts_st.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/db/Standarts_st/get', function(req, res) {
    db.standarts_st.get(req.query, function (data) {
        res.send(data);
    })
});
app.post('/db/Standarts_st/add', function(req, res) {
    db.standarts_st.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/db/Standarts_st/remove', function(req, res) {
    db.standarts_st.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts_st/update', function(req, res) {
    db.standarts_st.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== group_dis ================================================================================
//test не ведут
app.get('/db/group_dis/table', function(req, res) {
    db.groups_dis.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/db/group_dis/get', function(req, res) {
    db.groups_dis.get(req.query, function (data) {
        res.send(data);
    })
});
app.post('/db/group_dis/add', function(req, res) {
    db.groups_dis.addData(req.query, function(data) {
        res.send(data);
    }, function (err) {
        res.send(err);
    });
});
app.get('/db/group_dis/remove', function(req, res) {
    db.groups_dis.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts_st/update', function(req, res) {
    db.standarts_st.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

app.use('*', function(req, res){
    res.sendFile(__dirname + '/clientApp/index.html');
});

app.listen(8084);
