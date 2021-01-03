var express = require('express');//modulo de node;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//middleware de express
app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [
    {
        id: 1,
        text: 'Bienvenido al chat privado de Socket.io y NodeJS de Oscar Portillo.',
        nickname: 'Bot - OscarPortilloSV'
    }
];

//conexión al socket
io.on('connection', function(socket) {
    console.log("El nodo con IP: "+socket.handshake.address+" se ha conectado.");
    
    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
    
});

server.listen(6677, function() {
    console.log("el servidor está funcionando en: localhost:6677");
});