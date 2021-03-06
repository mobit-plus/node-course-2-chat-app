const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generatemessage,generateLocationmessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
//console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conncted');

    socket.on('join', (param,callback) => {
        if(!isRealString(param.name) && !isRealString(param.room)) {
            return callback('name and room are require.');
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.emit('newMessage', generatemessage('Admin', 'welcome to chat app'));
        socket.broadcast.to(param.room).emit('newMessage', generatemessage('Admin', `Welcome ${param.name} to join us.`));
        callback();
    });

    socket.on('createMessage', (message,callback) => {
        // console.log('new message', message);
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage',generatemessage(user.name, message.text));
        }
        
        callback();
    });

    socket.on('createLocationmessage' ,(coords) => {
        var user = users.getUser(socket.id);
        
        if(user) {
            io.to(user.room).emit('newLocationMessage',generateLocationmessage(user.name,  coords.latitude,coords.longitude))
        }
              
    });

    socket.on( 'disconnect' ,() => {
        //console.log('user was disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList' , users.removeUser(user.room));
            io.to(user.room).emit('newMessage', generatemessage('Admin', `${user.name} has left.`));
        }
    });

//    socket.emit('newMessage', {
//     from: 'prasoon',
//     text: 'hello prasoon',
//     createAt: 123
//    });

        socket.on('createAdmin',(Admin) => {
        console.log('this is admin', Admin);

        socket.broadcast.emit('userjoined', generatemessage(Admin.from, Admin.text));
        });
});
 
server.listen(port, () => {
 console.log(`server up to port ${port}`);

});
