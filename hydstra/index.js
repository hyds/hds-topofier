var request = require('request');
var queries = require('./queries.json');
var fs = require('fs');
var through = require('through');

var host = 'http://realtimedata.water.nsw.gov.au/cgi/webservice.server.pl?';

module.exports = {
	getSites : function (buf){
		console.log('getSites', buf);
		var sites = through(hydservice);
		console.log('sites', sites);
		return sites;
	},
	test : function (buf){ through( function(buf){
		this.queue(buf.toString().toUpperCase());
	})}

}

function hyservice (req) {
    var query  = host + "jsoncallback=test&" + JSON.stringify(queries.getsites) +"&userid=363708495";
	console.log('witin hyservice', query);
	counts[row.country] = (counts[row.country] || 0) + 1;
    var data = request
		.get(query)
	  	.on('error', function(err) {
	    	console.log(err)
	  	})
	return data;
}

/*
	var input = through();
        var output = through();
        setTimeout(function () {
            var hqa = hyperquest.post('http://localhost:' + port);
            hqa.on('error', function (err) {
                console.error('ACTUAL SERVER ' + err.stack);
            });
            input.pipe(hqa).pipe(output);
            
            var chunks = data.slice();
            var iv = setInterval(function () {
                if (chunks.length === 0) {
                    clearInterval(iv);
                    input.end();
                }
                else input.write(chunks.shift());
            });
        }, 500);
        return duplexer(input, output);
    }

*/    