var stream = require('stream');
var util = require('util');
var numeral = require('numeral');
// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform;


var geojson = { "type": "FeatureCollection"};

function Geofy(options) {
  // allow use without new
  if (!(this instanceof Geofy)) {
    return new Geofy(options);
  }

  // init Transform
  Transform.call(this, options);
}

util.inherits(Geofy, Transform);

Geofy.prototype._transform = function (buf, enc, cb) {
    var line = JSON.parse(buf.toString().replace(/;$/,""));

    var sites = line._return.rows;
    var features = [];
    

    for (var i = 0; i < sites.length; i++) {
        var feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
            },
            "properties":{}
        };
        var coordinates = [];
        //console.log("i [",i,"] - ",sites[i].stname);
        //console.log(Number(sites[i].longitude));
        //console.log(sites[i].longitude.replace(/\"/g,''));
        coordinates.push(Number(sites[i].longitude));
        coordinates.push(Number(sites[i].latitude));
        //delete sites[i].longitude;
        //delete sites[i].latitude;

        feature.geometry.coordinates = coordinates;
        //console.log("station ["+sites[i].station+"]")
        var stname = sites[i].stname || "UNKNOWN";
        var station = sites[i].station || "UNKNOWN";
        var stntype =sites[i].stntype || "UNKNOWN";
        feature.properties.name = stname;
        feature.properties.amenity = stntype;
        feature.properties.popupContent = "<b>Site ID:</b> " + station + "</br><b>Name:</b> " + stname + "</br><b>Type:</b> " + stntype + "</br><b>Technical Risk:</b> $" + Math.round(Math.random()*100000) + "</br><b>Environmenatal Risk:</b> $" + Math.round(Math.random()*10000000)+ "</br><b>Cumulative Impact:</b> $" + Math.round(Math.random()*100000000);

/*
        {"station": "070048", "longitude": "149.44790000", "stname": "HOSKINTOWN RADIO
 OBSERVATORY (CBM)", "active": false, "stntype": "WEA", "elev": "1.910", "datemo
d": 20111111, "latitude": "-35.36840000", "lldatum": "GDA94", "orgcode": "CBM"}
*/
        features.push(feature);
    }   

    geojson.features = features;
    //console.log("geojson [",geojson,"], enc [",enc,"]");

    this.push(JSON.stringify(geojson), 'utf8');
    cb();
};


module.exports = {
    geofy : Geofy
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