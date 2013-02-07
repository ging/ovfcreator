/*global describe, it, OVF, service, Utils*/
var expect = chai.expect;

var compare = function(strg1, strg2) {
    strg1 = strg1.replace(/\\n/g, '');
    strg1 = strg1.replace(/\\t/g, '');
    strg1 = strg1.replace(/\n/g, '');
    strg1 = strg1.replace(/\t/g, '');
    strg1 = strg1.replace(/>\s*/g, '>');
    strg1 = strg1.replace(/(?!=)"\s*/g, '" ');
    strg1 = strg1.replace(/=\"\s/g, '="');

    strg2 = strg2.replace(/\\n/g, '');
    strg2 = strg2.replace(/\\t/g, '');
    strg2 = strg2.replace(/\n/g, '');
    strg2 = strg2.replace(/\t/g, '');
    strg2 = strg2.replace(/>\s*/g, '>');
    strg2 = strg2.replace(/(?!=)"\s*/g, '" ');
    strg2 = strg2.replace(/=\"\s/g, '="');

    expect(strg1).to.equal(strg2);
};

describe('OVF', function () {
    "use strict";
    describe('Service Application Test', function () {
        var service, result, vm, vm1, vm2, product, network, net1, net2, kpi, rule;
        it('get instance evenlope empty', function () {
            service = OVF.Service();
            service.servAppName = "name";

            result = service.instantiateOVF();

            var strg1 = result;
            var strg2 = Utils.getFile("/static/tests/1testGetInstanceEnvelopeEmpty.xml");
            
            compare(strg1, strg2);
            
        });

        it('get envelope', function () {
            service = OVF.Service();
            service.servAppName = "name";

            vm = OVF.VM();
            vm.name = "test2";
            vm.virtType = vm.VirtualizationTechnologyType.XEN;
            vm.imageName = "imagentest";
            vm.memory = 512;
            vm.cpu = 1;

            service.addVM(vm);

            result = service.getEnvelope();
            var strg1 = result;
            var strg2 = Utils.getFile("/static/tests/2testGetEnvelope.xml");

            compare(strg1, strg2);
        });

        it('get Intantiate OVF', function () {
            service = OVF.Service();
            service.servAppName = "recordmanagement";

            vm = OVF.VM();
            vm.name = "tomcat";
            vm.imageName = "TomcatRecordManagementScale";
            vm.memory = 1024;
            vm.cpu = 1;

            service.addVM(vm);

            result = service.instantiateOVF();

            var strg1 = result;
            var strg2 = Utils.getFile("/static/tests/3testGetInstantiateOvfParams.xml");

            compare(strg1, strg2);
        });

        it('get Envelope 2 VMs', function () {
            service = OVF.Service();
            service.servAppName = "name";

            vm = OVF.VM();
            vm.name = "test2";
            vm.virtType = OVF.VirtualizationTechnologyType.XEN;
            vm.imageName = "imagentest";
            vm.memory = 512;
            vm.cpu = 1;

            vm2 = OVF.VM();
            vm2.name = "test3";
            vm2.virtType = OVF.VirtualizationTechnologyType.XEN;
            vm2.imageName = "imagentest3";
            vm2.memory = 512;
            vm2.cpu = 1;

            service.addVM(vm);
            service.addVM(vm2);

            result = service.instantiateOVF();
            var strg1 = result;
            var strg2 = Utils.getFile("/static/tests/4testGetEnvelope2VMs.xml");

            compare(strg1, strg2);
        });

        it('get VDC from JSON', function () {
            var vdc = OVF.VDC({description: 'A description...', 
                name: 'occivdc',
                id: 3,
                disk_units: 'byte * 2 * ^ 30',
                disk_limit: '50000.0', 
                cpu_units: '# CPUs', 
                cpu_limit: '10000.0',
                memory_limit: 'byte * 2 ^ 30',
                memory_units: '10000.0'});
            vdc.addVirtualNetwork('public_protected', 1, 'service', 'Godzillas ADSL', 'routed', 'Mb', 6, 2);
            vdc.addVirtualNetwork('private_protected', 2, 'management', 'Godzillas Intranet', 'isolated', 'Gb', 1, 254);
            //alert(vdc.toXML());
        });

        it('get VDC from XML', function () {
            var vdc = OVF.VDC({});
            vdc.fromXML('<?xml version="1.0" encoding="UTF-8"?><VDC name="occivdc" Id="3"><Description>A description...</Description><Topology><Zone type="public-protected"><VirtualNetwork id="1" name="service"><Description>Godzillas ADSL</Description><Mode>routed</Mode><Bandwidth units="Mb">6</Bandwidth><Size>2</Size></VirtualNetwork></Zone><Zone type="private-protected"><VirtualNetwork id="2" name="management"><Description>Godzillas Intranet</Description><Mode>isolated</Mode><Bandwidth units="Gb">1</Bandwidth><Size>254</Size></VirtualNetwork></Zone></Topology><StorageCapacity><Disk><Units>byte * 2 * ^ 30</Units><Limit>50000.0</Limit></Disk></StorageCapacity><ComputeCapacity><Cpu><Units># CPUs</Units><Limit>10000.0</Limit></Cpu><Memory><Units>byte * 2 ^ 30</Units><Limit>10000.0</Limit></Memory></ComputeCapacity></VDC>');
            alert(vdc);
            alert(vdc.toXML());
        });

        /*it('get Envelope Balancer', function () {
            service = OVF.Service();
            service.servAppName = "balancer";

            vm = OVF.VM();
            vm.name = "balance";
            vm.imageName = "haproxy";
            vm.memory = 512;
            vm.cpu = 1;
            vm.balancer = true;

            service.addVM(vm);

            result = service.instantiateOVF();

            Utils.compare(result, "5testGetEnvelopeBalancer.xml");
        });

        it('Get Envelope 2 VMs With Products', function () {
            service = OVF.Service();
            service.servAppName = "name";

            vm = OVF.VM();
            vm.name = "test2";
            vm.virtType = OVF.VirtualizationTechnologyType.XEN;
            vm.imageName = "imagentest";
            vm.memory = 512;
            vm.cpu = 1;
            vm.balancer = true;

            product = OVF.Product({name: "tomcat"});
            product.version = "1.0";
            product.recipe = "recipe 2.0";

            vm.addProduct(product);
            service.addVM(vm);

            result = service.instantiateOVF();

            Utils.compare(result, "6testGetEnvelope2VMsWithProducts.xml");
        });

        it('Record Management Instantiate Ovf', function () {
            service = OVF.Service();
            service.servAppName = "sapusecase";

            network = OVF.Network({name: "public"});
            network.publicNet = true;
            service.addNetwork(network);

            vm1 = OVF.VM();
            vm1.name = "tomcat";
            vm1.imageName = "TomcatRecordManagementScale";
            vm1.memory = 1024;
            vm1.cpu = 1;
            vm1.balancedBy = "haproxy";
            vm1.addNetwork(network);

            vm2 = OVF.VM();
            vm2.name = "haproxy";
            vm2.imageName = "4CaastHaproxyNoSetup";
            vm2.balancer = true;
            vm2.memory = 512;
            vm2.cpu = 1;
            vm2.addNetwork(network);

            service.addVM(vm2);
            service.addVM(vm1);

            result = service.instantiateOVF();

            Utils.compare(result, "7testRecordManagementInstantiateOvf.xml");
        });

        it('Record Management Instantiate Ovf With Scalability', function () {
            service = OVF.Service();
            service.servAppName = "sapusecase28";

            kpi = OVF.ServiceKPI({name: "requestDelay"});
            kpi.KPIVmname = "tomcat";
            service.registerServiceKPI(kpi);

            rule = OVF.GovernanceRule();
            rule.number = 1;
            rule.setKpi("requestDelay", 6, 3);
            rule.vmForRule = "tomcat";

            network = OVF.Network();
            network.name = "public";
            network.publicNet = true;
            service.addNetwork(network);

            vm1 = OVF.VM();
            vm1.name = "tomcat";
            vm1.imageName = "TomcatRecordManagementScale";
            vm1.memory = 1024;
            vm1.cpu = 1;
            vm1.balancedBy = "haproxy";
            vm1.addNetwork(network);
            vm1.recProduct = true;
            vm1.recVersion = "7";
            vm1.registerVMRule(rule);

            vm2 = OVF.VM();
            vm2.name = "haproxy";
            vm2.imageName = "4CaastHaproxyNoSetup";
            vm2.balancer = true;
            vm2.memory = 512;
            vm2.cpu = 1;
            vm2.addNetwork(network);
            vm2.recProduct = true;

            service.addVM(vm2);
            service.addVM(vm1);

            result = service.instantiateOVF();

            Utils.compare(result, "9testRecordManagementInstantiateOvfWithScalability.xml");
        });

        it('Instantiate OVF Params VM', function () {
            vm1 = OVF.VM();
            vm1.name = "tomcat";
            vm1.imageName = "TomcatRecordManagementScale";
            vm1.memory = 1024;
            vm1.cpu = 1;

            result = vm1.instantiateOVF();

            Utils.compare(result, "10testInstantiateOVFParamsVM.xml");
        });

        it('Instantiate OVF Params Service Fiware', function () {
            service = OVF.Service();
            service.servAppName = "fiwaretest";
            service.organization = "demo";
            service.vdcName = "occivdc";

            net1 = OVF.Network({name: "servicio"});
            net2 = OVF.Network({name: "gestion"});

            service.addNetwork(net1);
            service.addNetwork(net2);

            result = service.instantiateOVF();

            Utils.compare(result, "11testInstantiateOVFParamsServiceFiware.xml");
        });

        it('Instantiate OVF Params VM Fiware', function () {
            vm1 = OVF.VM();
            vm1.name = "tomcat";
            vm1.imageName = "file:///cirros-0.3.0-x86_64-uec";
            vm1.memory = 1024;
            vm1.cpu = 1;

            result = vm1.instantiateOVF();

            Utils.compare(result, "12testInstantiateOVFParamsVMFiware.xml");
        });
        */
    });
});