/*jslint nomen: true*/
/*global _, Utils*/

var OVF = OVF || {};

OVF.Service = function (spec) {
    "use strict";

    var that = {};
    that.servAppName = "";
    that.networks = [];
    that.organizationId = "";
    that.vdcName = "";
    that.vms = [];
    that.kpis = [];
    that.rules = [];
    that.organizationId = OVF.Configuration.organizationId;
    that.vdcName = OVF.Configuration.vdcName;

    that.addVM = function(vm) {
        that.vms.push(vm);
    };

    that.addNetwork = function(network) {
        that.networks.push(network);
    };

    that.addServiceKPI = function(kpi) {
        that.kpis.push(kpi);
    };

    that.instantiateOVF = function () {
        var net;
        if (that.networks.length === 0) {
            net = OVF.Network();
            net.name = "gestion";
            net.publicNet = false;
            that.addNetwork(net);

            net = OVF.Network();
            net.name = "public";
            net.publicNet = true;
            that.addNetwork(net);

        }
        return Utils.template("InstantiateServiceTemplate.xml", that);
        /*
        RESOURCE_PATH).replace("{serv}",
        this.getSerAppName()).replace("{net}",
        this.generateNetworkSection()).replace("{netinst}",
        this.generateNetworkInstSection()).replace("{vms}",
        generateVmsSection()).replace("{files}",
        generateFileSection()).replace("{disks}",
        generateDiskSection()).replace("{kpis}", generateKPIs())
        .replace("{rules}", generateGovernanceRules());
        */
    };

    that.getEnvelope = function () {
        var net;
        if (that.networks.length === 0) {
            net = OVF.Network();
            net.name = "gestion";
            net.publicNet = false;
            that.addNetwork(net);

            net = OVF.Network();
            net.name = "public";
            net.publicNet = true;
            that.addNetwork(net);

        }

        if (that.vms.length === 0) {
            return Utils.template("ServiceEmptyEnvelope.xml", that);
        } else {
            return Utils.template("ServiceScheleton.xml", that);
        }
        
        /*
        RESOURCE_PATH).replace("{serv}",
        this.getSerAppName()).replace("{net}",
        this.generateNetworkSection()).replace("{netinst}",
        this.generateNetworkInstSection()).replace("{vms}",
        generateVmsSection()).replace("{files}",
        generateFileSection()).replace("{disks}",
        generateDiskSection()).replace("{kpis}", generateKPIs())
        .replace("{rules}", generateGovernanceRules());
        */
    };

    return that;
};

