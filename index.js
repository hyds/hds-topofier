var request = require('request'),
	hosts = require('./config/url.json'),
	http = require('http');

http.createServer(function (req, res) {
	var url = req.url;
	url = url.replace(/\//,'').replace(/%7B/g,'{').replace(/%7D/g,'}');
	
	var query = hosts.nrm.host + '?' + url + "&userid=363708495";
	
   	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");

	var data = request
		.get(query)
	  	.on('error', function(err) {
	    	console.log(err)
	  	})
	  	.pipe(res);

}).listen(8800);

console.log("listening on 8800");
