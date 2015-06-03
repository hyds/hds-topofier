var stream = require('stream');
var util = require('util');
var numeral = require('numeral');
var moment = require('moment');
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
    console.log('line',line);    

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
        var elev = sites[i].elev || "UNKNOWN";
        var stname = sites[i].stname || "UNKNOWN";
        var station = sites[i].station || "UNKNOWN";
        var stntype =sites[i].stntype || "UNKNOWN";
        var lat =sites[i].latitude || "UNKNOWN";
        var lon =sites[i].longitude || "UNKNOWN";
        var complianceStatus = Math.random();
        var complianceIcon;

        if ( complianceStatus > 0.7 ) {
            complianceIcon = '&#10060'; 
        }
        else if ( complianceStatus < 0.3 ){
            complianceIcon = '&#10071'; 
        }
        else{
            complianceIcon = '&#9989'; 
        }

        var assesmentDate = moment().subtract(complianceStatus * 1000, 'days').format("MMM Do YY"); 

        feature.properties.name = stname;
        feature.properties.amenity = stntype;

        feature.properties.popupContent = '<table style="width:100%">'+
        '<col align="right">'+
        '<col align="left">'+
        '<tr><td align="right"><b>Site ID:</b></td> <td>' + station + '</td></tr>'+
        '<tr><td align="right"><b>Name:</b></td> <td>' + stname + '</td></tr>'+
        '<tr><td align="right"><b>Lat:</b></td> <td>' + lat + '</td></tr>'+
        '<tr><td align="right"><b>Long:</b></td> <td>' + lon + '</td></tr>'+
        '<tr><td align="right"><b>Elevation:</b></td> <td>' + elev + '</td></tr>'+
        '<tr><td align="right"><b>WQ Compliance:</b></td> <td>' + complianceIcon + '</td></tr>'+
        '<tr><td align="right"><b>Technical Risk:</b></td> <td>' + numeral(Math.round(Math.random()*100000)).format('($ 0.00 a)') + '</td></tr>'+
        '<tr><td align="right"><b>Env. Risk:</b></td> <td>' + numeral(Math.round(Math.random()*10000000)).format('($ 0.00 a)')  + '</td></tr>'+
        '<tr><td align="right"><b>Assess Date:</b></td> <td>' + assesmentDate + '</td></tr>'+
        '<tr><td align="right"><b>Cumulative Impact:</b></td> <td>' +  numeral(Math.round(Math.random()*100000000)).format('($ 0.00 a)')  + '</td></tr>'+
        '<tr><td align="right"><b>Hedge Book Risk:</b></td> <td>' + numeral(Math.round(Math.random()*1000000)).format('($ 0.00 a)') + '</td></tr>'+
        '</table>';//+'First name: <input type="text" name="fname"><br>Last name: <input type="text" name="lname"><br><input type="submit" value="Submit">"';

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