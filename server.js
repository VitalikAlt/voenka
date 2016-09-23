'use strict';
var express     = require("express");
var app         = express();
var body        = require('body-parser');
var path        = require('path');
var db          = require('./db_models/database').db;

app.use(express.static(path.join(__dirname + '/clientApp')));

//========================== Permissions ==========================================================================
app.get('/Permissions/get', function(req, res) {
    db.permissions.getPermission(req.query.login, req.query.password, function(data) {
        res.send(data);
    });
});

app.get('/Permissions/add', function(req, res) {
    db.permissions.addData(req.query, function(data) {
        res.send(data);
    });
});

app.get('/api/Permissions/:id', function(req, res) {
    db.permissions.getElementById(req.params.id, function (data) {
        res.send(data);
    }, function (data) {
        res.send(data);
    });
});
app.get('/api/t', function(req,res) {
    db.permissions.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/Permissions/changePass', function(req,res) {
    console.log(req.query);
    db.permissions.changePass(req.query, function (data) {
        res.send(data);
    }, function (err) {
        console.log('s');
    })
});
// student - 57da839dc9b8671924909235
// teacher - 57da83c4c9b8671924909236
//=================================================================================================================


//====================== Student_profile ==========================================================================
app.get('/Profile_st/get', function(req, res) {
    db.profile_st.getProfile(req.query.ID, function(data) {
        res.send(data);
    });
});

app.get('/Profile_st/add', function(req, res) {
    db.profile_st.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/Profile_st/table', function(req, res) {
    db.profile_st.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/Profile_st/remove', function(req, res) {
    db.profile_st.removeAll(function(data) {
        res.send(data);
    })
});
app.get('/Profile_st/update', function(req, res) {
    db.profile_st.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== Teacher_profile ==========================================================================
app.get('/api/Profile_tc', function(req, res) {
    db.profile_tc.getProfile(req.query.ID, function(data) {
        res.send(data);
    });
});

app.post('/api/Profile_tc', function(req, res) {
    db.profile_tc.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/api/table1', function(req, res) {
    db.profile_tc.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/api/remove1', function(req, res) {
    db.profile_tc.removeAll(function(data) {
        res.send(data);
    })
})
//=================================================================================================================

//====================== Progress =================================================================================
app.get('/api/Progress', function(req, res) {
    db.progress.getProgress(req.query.student_id, function(data) {
        res.send(data);
    });
});

app.post('/api/Progress', function(req, res) {
    db.progress.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/db/Progress/table', function(req, res) {
    db.progress.getTableList(function(data) {
        res.send(data);
    })
});
app.post('/api/update', function(req, res) {
    db.progress.updateData(req.query, function(data) {
        res.send(data);
    })
})
//=================================================================================================================


//====================== Discipline =================================================================================
//test
app.get('/db/discipline/get', function(req, res) {
    db.discipline.getName(req.query, function(data) {
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

//====================== St_discipline =================================================================================
//test
app.get('/db/st_discipline/get', function(req, res) {
    db.st_discipline.getTableList(req.query, function (data) {
        res.send(data);
    });
});
app.post('/db/st_discipline/add', function(req, res) {
    db.st_discipline.addData(req.query, function(data) {
        res.send(data);
    });
});
app.post('/db/st_discipline/remove', function(req, res) {
    db.st_discipline.getProgress(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/st_discipline/update', function(req, res) {
    db.st_discipline.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== Marks =================================================================================
//test
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
//test
app.get('/db/Standarts/table', function(req, res) {
    db.Standarts.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/db/Standarts/get', function(req, res) {
    db.Standarts.get(req.query, function(data) {
        res.send(data);
    })
});
app.post('/db/Standarts/add', function(req, res) {
    db.Standarts.addData(req.query, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts/remove', function(req, res) {
    db.Standarts.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts/update', function(req, res) {
    db.Standarts.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

//====================== Standarts_st ================================================================================
//test
app.get('/db/Standarts_st/table', function(req, res) {
    db.Standarts_st.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/db/Standarts_st/get', function(req, res) {
    db.Standarts_st.get(req.query, function (data) {
        res.send(data);
    })
});
app.post('/db/Standarts_st/add', function(req, res) {
    db.Standarts_st.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/db/Standarts_st/remove', function(req, res) {
    db.Standarts_st.remove(req.query.ID, function(data) {
        res.send(data);
    });
});
app.post('/db/Standarts_st/update', function(req, res) {
    db.Standarts_st.updateData(req.query, function(data) {
        res.send(data);
    })
});
//=================================================================================================================

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