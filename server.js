'use strict';

var express    = require("express"),
    app        = express();
    
class Server {
    constructor(port){
        this.port = port;
    }
    
    initExpress(){
        app.use(express.static(__dirname + '/clientApp'));
        app.use('*', function(req, res){
            res.sendFile(__dirname + '/clientApp/index.html');
        });
    }
    
    run(){
        this.initExpress();
        app.listen(this.port);
        console.log('Сервер запущен на порте ' + this.port);
    }
}

var server = new Server(8080);
server.run();

module.exports = Server;

