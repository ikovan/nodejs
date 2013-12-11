var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs'), hodnota = 0

app.listen(3001);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    
    res.writeHead(200);
    res.end(data);
  });
};  

io.sockets.on('connection', function (client) {
    console.log('Client connected');
    var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  port	   : '3999',
	  user     : 'pentaho',
	  password : 'pentaho',
	  database : 'pentaho_oltp'
	});

    connection.query('SELECT * FROM orderdetails LIMIT 10', function(err, rows, fields) {
	  client.emit('clients', JSON.stringify(rows));
	  });
//	  client.disconnect();
});




