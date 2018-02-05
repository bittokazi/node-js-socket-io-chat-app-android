var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

http.listen(3000, function(){
    console.log('listening on *:3000');
});