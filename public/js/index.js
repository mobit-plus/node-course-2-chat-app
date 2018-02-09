var socket = io();

        socket.on('connect',function () {
            console.log('new user connected');

            // socket.emit('createEmail', {
            //     to: 'amit@gmail.com',
            //     text: 'hello'
            // });

            socket.emit('createMessage', {
                from: 'prasoon',
                text: 'cool its working'
            });
        });

        socket.on('disconnect', function () {
            console.log('Disconnected server');
        });
         
        socket.on('newEmail', function (email) {
            console.log('new email', email);
        });

        socket.on('newMessage', function (message) {
            console.log('new message', message)
        });