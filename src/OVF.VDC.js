/*jslint nomen: true*/
/*global _, Utils*/

var OVF = OVF || {};

OVF.VDC = function(spec) {
	var that = {};
	var parser = new X2JS();

	that.Description = spec.description;
	that._name = spec.name;
	if (spec.id !== undefined) {
		that._Id = spec.id;
	}

	that.StorageCapacity = {
		Disk: {
			Units: spec.disk_units,
			Limit: spec.disk_limit
		}
	};

	that.ComputeCapacity = {
		Cpu: {
			Units: spec.cpu_units,
			Limit: spec.cpu_limit
		},
		Memory: {
			Units: spec.memory_units,
			Limit: spec.memory_limit
		},
	};

	that.addVirtualNetwork = function(type, id, name, description, mode, bw_units, bw_size, size) {
		that.Topology = that.Topology || {
			Zone: []
		}
		that.Topology.Zone.push({
			_type: type,
			VirtualNetwork: {
				id: id,
				_name: name,
				Description: description,
				Mode: mode,
				Bandwidth: {
					_units: bw_units,
					__text: bw_size
				},
				Size: size
			}
		});
	};

	that.toXML = function() {
		return '<?xml version="1.0" encoding="UTF-8"?>' + 
			parser.json2xml_str({VDC:that});
	};

	that.fromXML = function(xml_str) {
		var xml = parser.xml_str2json(xml_str).VDC;
		that._name = xml._name;
		that._Id = xml._Id;
		that.Topology = xml.Topology;
		that.StorageCapacity = xml.StorageCapacity;
		that.ComputeCapacity = xml.ComputeCapacity;
		that.Description = xml.Description;
	};

	return that;
};