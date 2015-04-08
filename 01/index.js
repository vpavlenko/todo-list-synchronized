var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo app listening at http://%s:%s', host, port);

});

var io = require('socket.io')(server);

/**
 * @type {Array<{author: string, content: string}>}
 */
var todo_items = [];

io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('new task', function (content) {
        console.log('new task: ' + content);

        io.sockets.emit('new task', {
            author: socket.username,
            content: content
        });
    });

    socket.on('login', function(username) {
        console.log('login: ' + username);

        socket.username = username;
    });
});
