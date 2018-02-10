var socket = io();

        socket.on('connect',function () {
            console.log('new user connected');

            // socket.emit('createEmail', {
            //     to: 'amit@gmail.com',
            //     text: 'hello'
            // });

            // socket.emit('createMessage', {
            //     from: 'prasoon',
            //     text: 'cool its working'
            // });
        });

        socket.on('disconnect', function () {
            console.log('Disconnected server');
        });
         
        socket.on('newEmail', function (email) {
            console.log('new email', email);
        });

        socket.on('newMessage', function (message) {
            console.log('New-Message', message);
            var li = jQuery('<li></li>');

            li.text(`${message.from}: ${message.text}`);
            jQuery('#message').append(li);
        });

        // socket.on('joined', function (join) {
        //     console.log('join user', join);
        // });

        socket.on('userjoined', function (Admin) {
            console.log('user joined', Admin);
            
        });

        // socket.emit('createMessage',{
        //     from: 'prasoon',
        //     text: 'hello world'
        // }, function () {
        //     console.log('Acknowledgment from server:- Data is got it!');
        // });

        jQuery('#message-form').on('submit', function (event) {
            event.preventDefault();

            socket.emit('createMessage',{
                from: 'prasoon',
                text: jQuery('[name="message"]').val()
            }, function () {

            });
        });