var hosts = require('../config/config.json');
var through = require('through');
//var geojson = require('./geojson.json');
var duplexer = require('duplexer');
var moment = require('moment');
var fs = require('fs');
var stream = require('stream');
var Duplex = stream.Duplex || require('readable-stream').Duplex;

var Writable = require('stream').Writable;


var geofy = Writable({ decodeStrings: false });

geofy._write = function (chunk, enc, next) {
    console.dir(chunk);
    next();
};

module.exports = {
    geofy : geofy
} 




/*

module.exports = { 
	geofy : function geofy(buf){
        var rs = new Readable;
        rs.push('beep ');
        rs.push('boop\n');
        rs.push(null);


        var input = through(write, end);
        var geojson = {
            "type": "FeatureCollection",
        };
        
        function write (row) {
        
            var line = JSON.parse(buf.toString().replace(/;$/,""));
            
            console.log("line [",line,"]")

            var sites = line._return.rows;
            var features = [];
            var feature = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                    }
            };

            for (var i = 0; i < sites.length; i++) {
                var coordinates = [];
                coordinates.push(sites[i].longitude);
                coordinates.push(sites[i].latitude);
                delete sites[i].longitude;
                delete sites[i].latitude;
                feature.geometry.coordinates = coordinates;
                feature.properties = sites[i];
                features.push(feature);
            }   

            geojson.features = features;

            

            

        
            
        }
        
        function end () { console.log('geojson [',geojson,']'); }

        return duplexer(input, geojson);

    }
}





function geofyOld (buf) {
    var line = JSON.parse(buf.toString().replace(/;$/,""));
    
    var sites = line._return.rows;
    var features = [];
    var feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
            }
    };

    for (var i = 0; i < sites.length; i++) {
        var coordinates = [];
        coordinates.push(sites[i].longitude);
        coordinates.push(sites[i].latitude);
        delete sites[i].longitude;
        delete sites[i].latitude;
        feature.geometry.coordinates = coordinates;
        feature.properties = sites[i];
        features.push(feature);
    }   

    geojson.features = features;

  	//console.log('geojson [',geojson,']');

	return geojson;
}

/*
{"station": "070048", "longitude": "149.44790000", "stname": "HOSKINTOWN RADIO
 OBSERVATORY (CBM)", "active": false, "stntype": "WEA", "elev": "1.910", "datemo
d": 20111111, "latitude": "-35.36840000", "lldatum": "GDA94", "orgcode": "CBM"}


*/