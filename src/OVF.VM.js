/*jslint nomen: true*/
/*global _, Utils*/

var OVF = OVF || {};

OVF.VM = function() {
    var that = {};
    that.isBalancer = false;
    that.network = "public";
    that.memory = 512;
    that.cpu = 1;
    that.version = "1.0";

    that.VirtualizationTechnologyType = {
        XEN:"XEN",
        VMWARE: "VMWARE",
        KVM: "KVM"
    };

    that.getVMEnvelope = function() {
        var file;
        if (that.isBalancer) {
            file = "VMEnvelopeBalancer.xml";
        } else if (that.balancer !== undefined) {
            file = "VMEnvelopeBalanced.xml";
        } else {
            file = "VMEnvelope.xml";
        }

        return Utils.template(file, that);
    };
    
    return that;
};