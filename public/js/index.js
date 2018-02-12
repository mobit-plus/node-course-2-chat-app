//const moment = require('moment');

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
            var formattedTime = moment(message.createdAt).format('h:mm a');
            //console.log('New-Message', message);
            var li = jQuery('<li></li>');

            li.text(`${message.from} ${formattedTime} :${message.text}`);
            jQuery('#message').append(li);
        });

        socket.on('newLocationMessage', function (message) {
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var li = jQuery('<li></li>');
            var a = jQuery('<a target="_blank">My Current Location</a>');

            li.text(`${message.from}${formattedTime}:`);
            a.attr('href', message.url);
            li.append(a);
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

            var messageText = jQuery('[name="message"]');

            socket.emit('createMessage',{
                from: 'prasoon',
                text: messageText.val()
            }, function () {
                messageText.val();
            });
        });
        var locationButton = jQuery('#send-location');

        locationButton.on('click', function () {
            
            if (!navigator.geolocation) {
                return alert('Geoloction not supported by your browser.');
            }
            locationButton.attr('disabled','disabled').text('Sending location..');

            navigator.geolocation.getCurrentPosition( function (position) {
                
                locationButton.removeAttr('disabled').text('Send location');
                //console.log(position);
                socket.emit('createLocationmessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function () {
                locationButton.removeAttr('disabled').text('Send location');
                alert('unable to fetch location');
            });
            
        });

        