var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//var swig  = require('swig');

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo app listening at http://%s:%s', host, port);

});

/**
 * @type {Array<{author: string, content: string}>}
 */
var todo_items = [];