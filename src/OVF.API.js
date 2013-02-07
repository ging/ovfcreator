/*jslint nomen: true*/
/*global _, Utils*/

var OVF = OVF || {};

OVF.API = (function() {
	var that = {};

	var conf = {};

	var sendRequest = function (method, path, body, callback) {

		var req = new XMLHttpRequest();

		req.onreadystatechange = onreadystatechange = function () {

	  		if (req.readyState == '4') {
	    		console.log('Respuesta: ', req.responseText);
	    		callback(req.responseText);
	    	}
		}

		req.open(method, conf.url + path, true);

		req.setRequestHeader('Accept', 'application/xml');
	    req.setRequestHeader('Content-Type', 'application/xml');
	    req.setRequestHeader('X-Auth-Token', conf.token);
		req.send(body);

	};

	that.configure = function (url, tenant, token) {
		conf.url = url + '/' + tenant + '/';
		conf.token = token;
	};

	that.createVDC = function (vdc) {
		sendRequest('POST', 'vdc', vdc.toXML(), function(resp) {
			console.log(resp);
		});
	};

	that.getVDCs = function(callback) {
		sendRequest('GET', 'vdc', undefined, function(resp) {
			callback(resp);
		});
	};

	that.getVDC = function (vdc_id, callback) {
		sendRequest('GET', 'vdc/'+vdc_id, undefined, function(resp) {
			var vdc = OVF.VDC({});
			vdc.fromXML(resp);
			if (callback !== undefined) {
				callback(vdc);
			}
		});
	};

	that.createService = function (vdc_id, service) {
		sendRequest('POST', 'vdc/'+vdc_id+'/services', service.instantiateOVF(), function(resp) {
			console.log(resp);
		});
	};

	that.getServices = function(vdc_id, callback) {
		sendRequest('GET', 'vdc/'+vdc_id+'/services', undefined, function(resp) {
			callback(resp);
		});
	};

	that.getService = function
	
	return that;
}) ();