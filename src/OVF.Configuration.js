/*jslint nomen: true*/
/*global _, Utils*/

var OVF = OVF || {};

OVF.Configuration = (function() {
	var that = {};
	that.restHost = "localhost";
	that.restPort = "8182";
	that.organizationId = "es.tid";
	that.vdcName = "test";
	
	return that;
}) ();