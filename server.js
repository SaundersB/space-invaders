var http = require('http');
var st   = require('st');

var port = process.env.PORT;
if (port === undefined) port = 4000;

var static = st({ path: process.cwd() + '/', index: 'index.html', cache: false });

http.createServer(function(req, res) {
    static(req, res)
}).listen(port);
