'use strict';
var express     = require("express");
var app         = express();
var body        = require('body-parser');
var path        = require('path');
var permissions = require('./db_models/permissions/permissions_query');
var profile_st  = require('./db_models/Profile_st/pr_st_query');
var profile_tc  = require('./db_models/profile_tc/pr_tc_query');
var progress    = require('./db_models/progress/progress_query');

app.use(express.static(path.join(__dirname + '/clientApp')));
//========================== permissions ==========================================================================
app.get('/api/permissions', function(req, res) {
    permissions.getPermission(req.query.login, req.query.password, function(data) {
        res.send(data);
    });
});

app.post('/api/permissions', function(req, res) {
    permissions.addData(req.query, function(data) {
        res.send(data);
    });
});

app.get('/api/permissions/:id', function(req, res) {
    permissions.getElementById(req.params.id, function (data) {
        res.send(data);
    }, function (data) {
        res.send(data);
    });
});
app.get('/api/t', function(req,res) {
    permissions.getTableList(function(data) {
        res.send(data);
    })
})
// student - 57da839dc9b8671924909235
// teacher - 57da83c4c9b8671924909236
//=================================================================================================================


//====================== Student_profile ==========================================================================
app.get('/api/Profile_st', function(req, res) {
    profile_st.getProfile(req.query.ID, function(data) {
        res.send(data);
    });
});

app.post('/api/Profile_st', function(req, res) {
    profile_st.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/api/table', function(req, res) {
    profile_st.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/api/remove', function(req, res) {
    profile_st.removeAll(function(data) {
        res.send(data);
    })
})
//=================================================================================================================

//====================== Teacher_profile ==========================================================================
app.get('/api/profile_tc', function(req, res) {
    profile_tc.getProfile(req.query.ID, function(data) {
        res.send(data);
    });
});

app.post('/api/profile_tc', function(req, res) {
    profile_tc.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/api/table1', function(req, res) {
    profile_tc.getTableList(function(data) {
        res.send(data);
    })
});
app.get('/api/remove1', function(req, res) {
    profile_tc.removeAll(function(data) {
        res.send(data);
    })
})
//=================================================================================================================

//====================== Progress =================================================================================
app.get('/api/progress', function(req, res) {
    progress.getProgress(req.query.student_id, function(data) {
        res.send(data);
    });
});

app.post('/api/progress', function(req, res) {
    progress.addData(req.query, function(data) {
        res.send(data);
    });
});
app.get('/api/table2', function(req, res) {
    progress.getTableList(function(data) {
        res.send(data);
    })
});
app.post('/api/update', function(req, res) {
    progress.updateData(req.query, function(data) {
        res.send(data);
    })
})
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

