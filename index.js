var request = require('request'),
	hosts = require('./config/config.json'),
	through = require('through'),
	topofy = require('./topofier'),
	http = require('http')
	geojson = require('./geojson.json');

http.createServer(function (req, res) {
	var url = req.url;
	url = url.replace(/\//,'').replace(/%7B/g,'{').replace(/%7D/g,'}').replace(/%22/g,'"');
	//console.log(JSON.parse(url));
	// var query = hosts.nrm.host + '?' + url + "&userid=363708495";
	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log('ulr [',url,']');
	if (req.method === 'GET') {
		//console.log('line [',geojson,']');
        req
        	.pipe( through(function (buf) {
	            var line = buf.toString();
			    console.log('line [',geojson,']');
			    console.log('line [',line,']');
			    this.queue(geojson);
	        }))
	        .pipe(res)
	        .on('error', function(err) {
		    	console.log(err);
			})
        //console.log(res);
    }
    else res.end(console.log('send me a GET\n'));

/*
	req
	 	.get(query,function(){
	 		topofy.geofy(query
	 	})
	 	.on('error', function(err) {
	    	console.log(err)

	  	})
	pipe( function(body){

	}));
	console.log(topofy.geofy.pipe(req));
*/
   	
	//hosts.checkBounds();

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