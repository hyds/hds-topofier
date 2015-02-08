var hosts = require('../config/config.json');
var through = require('through');
//var geojson = require('./geojson.json');
var moment = require('moment');

var geojson = {
	"type": "FeatureCollection",
};

module.exports = { 
	geofy : geofy
}

function geofy (buf) {
	var line = buf.toString();
    console.log('buffer [',buf,']');
    console.log('line [',line,']');
    
    /*
    var site = buf;
    var features = [];
    var feature = {
	      	"type": "Feature",
	      	"geometry": {
	        	"type": "Point",
    		}
    };

    var coordinates = [];
    coordinates.push(site.longitude).push(site.latitude);
    delete site.longitude;
    delete site.latitude;

    feature.geometry.coordinates = coordinates;
    feature.properties = site;

    features.push(feature);
    geojson.features = features;

  	console.log('line [',geojson,']');
    function write (row) {
        counts[row.country] = (counts[row.country] || 0) + 1;
    }

    */

	//return geojson;
}

/*
{"station": "070048", "longitude": "149.44790000", "stname": "HOSKINTOWN RADIO
 OBSERVATORY (CBM)", "active": false, "stntype": "WEA", "elev": "1.910", "datemo
d": 20111111, "latitude": "-35.36840000", "lldatum": "GDA94", "orgcode": "CBM"}


*/