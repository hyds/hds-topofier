var hosts = require('../config/config.json');
var through = require('through');
var geojson = require('./geojson.json');


var tr = through(function (buf) {
    this.queue(buf.toString().toUpperCase());
});

process.stdin.pipe(tr).pipe(process.stdout);





module.exports = { 

	checkBounds : function  (argument) {
		checkHosts();
	},
	geofy : function (req){
		through(function (buf) {
	    	console.log('req [',req,']')
	    	//this.queue(buf.toString().toUpperCase());
		})
	}


}


function checkHosts (argument) {
	for (var i = 0; i < hosts.length; i++) {
		console.log(hosts[i]);
	};
}

function topofy (buf) {
	var line = buf.toString();
			    console.log('line [',geojson,']');
			    console.log('line [',line,']');

	return geojson;
}


var data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 146.62987,-24.1000]
      },
      "properties": {
        "name": "Coors Field1",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [146.62987,-25.2000]
      },
      "properties": {
        "name": "Coors Field2",
        "amenity": "Baseball Stadium2",
        "popupContent": "This is where the Rockies play2!"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [146.62987,-26.3000]
      },
      "properties": {
        "name": "Coors Field3",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play3!"
      }
    }
  ]
}