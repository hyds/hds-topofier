var http = require('http');
var request = require('request'),
	hosts = require('./config/config.json'),
	through = require('through'),
	topofy = require('./topofier'),
	testes = require('./hydstra').test(),
	geojson = require('./topofier/geojson.json'),
	fs = require('fs');



var server = http.createServer(function (req, res) {
	var body = 'hello world';
	var url = req.url;
	//console.log("url",url);
	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	var writable = fs.createWriteStream('file.txt');
	

	 if (req.method === 'GET') {
        //console.log(req);
        req.pipe(through(writable));
        res.write(JSON.stringify(geojson));
        req.pipe(res);
    }
    else res.end('send me a GET\n');

 



	/*
	req.pipe(through(function (buf) {
	            console.log('GET req, ulr [',url,']');
	            this.queue(buf.toString().toUpperCase());
	        })).pipe(res);


		// Readable streams emit 'data' events once a listener is added
		req.on('data', function (chunk) {
				console.log('chunk',chunk);
				body += chunk;
			})
			.on('end', function () {
				try {
				  //var data = JSON.parse(body);
				  console.log("body",body);
				  var data = body;
				} catch (er) {
				  // uh oh!  bad json!
				  res.statusCode = 400;
				  return res.end('error: ' + er.message);
				}

		// write back something interesting to the user:
		res.write(data);
		res.end();
		});
	*/	
});

server.listen(8800);
console.log('listening on port 8800');


/*

http.createServer(function (req, res) {
	var url = req.url;
	url = url.replace(/\//,'').replace(/%7B/g,'{').replace(/%7D/g,'}').replace(/%22/g,'"');
	//console.log(JSON.parse(url));
	// var query = hosts.nrm.host + '?' + url + "&userid=363708495";
	res.removeHeader("Cache-Control");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	if (req.method === 'GET') {
		
		req.pipe(through(function (buf) {
            console.log('GET req, ulr [',url,']');
            this.queue(buf.toString().toUpperCase());
        })).pipe(res);

		/*
		function test(buf){
			console.log("test pipe",buf);
			return geojson;
		}

		req.pipe(through()
			.pipe(through(function (buf) {
	            //this.queue(topofy.geofy(buf));
	            this.queue(geojson);
	            this.queue(hydstra.getSites(buf));
	        }))
	        .pipe(res)
	        .on('error', function(err) {
		    	console.log(err);
			})
		*/
        //console.log(res);
  /*
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
/*

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