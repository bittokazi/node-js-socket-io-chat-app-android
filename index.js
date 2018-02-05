var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message', function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.on("image", function(info) {
        //var img = new Image();
        //img.src = 'data:image/jpeg;base64,' + info.imageData;
        console.log('message: ' + info);
        io.emit('image', info);
    });
});

http.listen(server_port, function(){
    console.log('listening on *:'+server_port);
});