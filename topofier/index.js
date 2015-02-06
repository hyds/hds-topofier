var hosts = require('../config/config.json');

module.exports = { 

	checkBounds : function  (argument) {
		checkHosts();
	}	
}


function checkHosts (argument) {
	for (var i = 0; i < hosts.length; i++) {
		console.log(hosts[i]);
	};
}