const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
//console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conncted');

    // socket.emit('newEmail', {
    //     from: 'example@gmail.com',
    //     text: 'hey whats going on.',
    //     createdAt: 123
    // });

    // socket.on('createEmail' ,(cEmail) => {
    //     console.log('create a new email', cEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('new message', message)
    });

    socket.on( 'disconnect' ,() => {
        console.log('user was disconnected');
    });

   socket.emit('newMessage', {
    from: 'prasoon',
    text: 'hello prasoon',
    createAt: 123
   });
});
 
server.listen(port, () => {

 console.log(`server up to port ${port}`);

});
