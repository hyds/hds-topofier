var request = require('request'),
	hosts = require('./config/config.json'),
	topofy = require('./topofier'),
	http = require('http');

http.createServer(function (req, res) {
	var url = req.url;
	url = url.replace(/\//,'').replace(/%7B/g,'{').replace(/%7D/g,'}');
	
	// var query = hosts.nrm.host + '?' + url + "&userid=363708495";
	
   	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");

	hosts.checkBounds();

	/*
	request
		.get(query)
	  	.on('error', function(err) {
	    	console.log(err)
	  	})
	  	.pipe(res);
	*/
}).listen(8800);

console.log("listening on 8800");

/*
 var concat = require('concat-stream');
 var http = require('http');

 var server = http.createServer(function (req, res) {
     if (req.method === 'POST') {
         req.pipe(concat(function (body) {
             var obj = JSON.parse(body);
             res.end(Object.keys(obj).join('\n'));
         }));
     }
     else res.end();
 });
 server.listen(5000);

 */