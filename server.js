'use strict';

var express     = require("express");
var app         = express();
var body        = require('body-parser');
var path        = require('path');
var db          = require('./db_models/database').db('mongodb://192.168.1.101:27017');

app.use(express.static(path.join(__dirname + '/clientApp')));

app.get('/add/student', function(req,res) {
    db.addStudent(req.query, function (succes) {
        res.send(succes);
    }, function (err) { res.send(err); });
});

app.get('/get/standarts', function(req,res) {
    db.getStandarts(req.query, function (succes) {
        res.send(succes);
    }, function (err) { res.send(err); });
});

app.get('/permissions/change_pass', function(req,res) {
    db.permissions.changePass(req.query, function (data) {
        res.send(data);
    }, function (err) {
        res.sen(err);
    })
});

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
//=================================================================================================================

//========================== Groups ==========================================================================
app.get('/Groups/get', function(req, res) {
    db.groups.getElementById(req.query.ID, function(data) {
        res.send(data);
    });
});

app.get('/groups/add', function(req, res) {
    db.groups.addData(req.query, function(data) {
        res.send(data);
    });
});

app.get('/Groups/t', function(req,res) {
    db.groups.getTableList(function(data) {
        res.send(data);
    })
});
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
//test
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

app.use('*', function(req, res){
    res.sendFile(__dirname + '/clientApp/index.html');
});

app.listen(8084);