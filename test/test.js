describe('OVF', function(){
  describe('Service Application Test', function(){
    it('get instance evenlope empty', function(){
      var service = OVF.Service();
      service.serAppName = "name";

      var result = service.instantiateOVF();

      Utils.compare(result, "1testGetInstanceEnvelopeEmpty.xml");
  });

    it('get envelope', function(){
      var service = OVF.Service();
      service.serAppName = "name";

      var vm = OVF.VM();
      vm.name = "test2";
      vm.virtType = OVF.VirtualizationTechnologyType.XEN;
      vm.imageName = "imagentest";
      vm.memory = 512;
      vm.cpu = 1;

      service.addVM(vm);

      var result = service.instantiateOVF();

      Utils.compare(result, "2testGetEnvelope.xml");
  });

    it('get Intantiate OVF', function(){
      var service = OVF.Service();
      service.serAppName = "recordmanagement";

      var vm = OVF.VM();
      vm.name = "tomcat";
      vm.imageName = "TomcatRecordManagementScale";
      vm.memory = 1024;
      vm.cpu = 1;

      service.addVM(vm);

      var result = service.instantiateOVF();

      Utils.compare(result, "3testGetInstantiateOvfParams.xml");
  });

    it('get Envelope 2 VMs', function(){
      var service = OVF.Service();
      service.serAppName = "name";

      var vm = OVF.VM();
      vm.name = "test2";
      vm.virtType = OVF.VirtualizationTechnologyType.XEN;
      vm.imageName = "imagentest";
      vm.memory = 512;
      vm.cpu = 1;

      var vm2 = OVF.VM();
      vm2.name = "test3";
      vm2.virtType = OVF.VirtualizationTechnologyType.XEN;
      vm2.imageName = "imagentest3";
      vm2.memory = 512;
      vm2.cpu = 1;

      service.addVM(vm);
      service.addVM(vm2);

      var result = service.instantiateOVF();

      Utils.compare(result, "4testGetEnvelope2VMs.xml");
  });

    it('get Envelope Balancer', function(){
      var service = OVF.Service();
      service.serAppName = "balancer";

      var vm = OVF.VM();
      vm.name = "balance";
      vm.imageName = "haproxy";
      vm.memory = 512;
      vm.cpu = 1;
      vm.balancer = true;

      service.addVM(vm);

      var result = service.instantiateOVF();

      Utils.compare(result, "5testGetEnvelopeBalancer.xml");
  });

    it('Get Envelope 2 VMs With Products', function(){
      var service = OVF.Service();
      service.serAppName = "name";

      var vm = OVF.VM();
      vm.name = "test2";
      vm.virtType = OVF.VirtualizationTechnologyType.XEN;
      vm.imageName = "imagentest";
      vm.memory = 512;
      vm.cpu = 1;
      vm.balancer = true;

      var product = OVF.Product({name: "tomcat"});
      product.version = "1.0";
      product.recipe = "recipe 2.0";

      vm.addProduct(product);
      service.addVM(vm);

      var result = service.instantiateOVF();

      Utils.compare(result, "6testGetEnvelope2VMsWithProducts.xml");
  });

    it('Record Management Instantiate Ovf', function(){
      var service = OVF.Service();
      service.serAppName = "sapusecase";

      var network = OVF.Network({name: "public"});
      network.publicNet = true;
      service.addNetwork(network);

      var vmTomcat = OVF.VM();
      vmTomcat.name = "tomcat";
      vmTomcat.imageName = "TomcatRecordManagementScale";
      vmTomcat.memory = 1024;
      vmTomcat.cpu = 1;
      vmTomcat.balancedBy = "haproxy";
      vmTomcat.addNetwork(network);

      var vmBalancer = OVF.VM();
      vmBalancer.name = "haproxy";
      vmBalancer.imageName = "4CaastHaproxyNoSetup";
      vmBalancer.balancer = true;
      vmBalancer.memory = 512;
      vmBalancer.cpu = 1;
      vmBalancer.addNetwork(network);

      service.addVM(vmBalancer);
      service.addVM(vmTomcat);

      var result = service.instantiateOVF();

      Utils.compare(result, "7testRecordManagementInstantiateOvf.xml");
  });

    it('Record Management Instantiate Ovf With Scalability', function(){
      var service = OVF.Service();
      service.serAppName = "sapusecase28";

      var kpi = OVF.ServiceKPI({name: "requestDelay"});
      kpi.KPIVmname("tomcat");
      service.registerServiceKPI(kpi);

      var rule = OVF.GovernanceRule({name: 1});
      rule.setKpi("requesDelay", 6, 3);
      rule.vmForRule("tomcat");

      var network = OVF.Network({name: "public"});
      network.publicNet = true;
      service.addNetwork(network);

      var vmTomcat = OVF.VM();
      vmTomcat.name = "tomcat";
      vmTomcat.imageName = "TomcatRecordManagementScale";
      vmTomcat.memory = 1024;
      vmTomcat.cpu = 1;
      vmTomcat.balancedBy = "haproxy";
      vmTomcat.addNetwork(network);
      vmTomcat.recProduct = true;
      vmTomcat.recVersion = "7";
      vmTomcat.registerVMRule(rule);

      var vmBalancer = OVF.VM();
      vmBalancer.name = "haproxy";
      vmBalancer.imageName = "4CaastHaproxyNoSetup";
      vmBalancer.balancer = true;
      vmBalancer.memory = 512;
      vmBalancer.cpu = 1;
      vmBalancer.addNetwork(network);
      vmBalancer.recProduct = true;

      service.addVM(vmBalancer);
      service.addVM(vmTomcat);

      var result = service.instantiateOVF();

      Utils.compare(result, "9testRecordManagementInstantiateOvfWithScalability.xml");
  });

it('Instantiate OVF Params VM', function(){
      var vmTomcat = OVF.VM();
      vmTomcat.name = "tomcat";
      vmTomcat.imageName = "TomcatRecordManagementScale";
      vmTomcat.memory = 1024;
      vmTomcat.cpu = 1;
      
      var result = vmTomcat.instantiateOVF();

      Utils.compare(result, "10testInstantiateOVFParamsVM.xml");
  });

it('Instantiate OVF Params Service Fiware', function(){
      var service = OVF.Service();
      service.serAppName = "fiwaretest";
      service.organization = "demo";
      service.vdcName = "occivdc";

      var net1 = OVF.Network({name: "servicio"});
      var net2 = OVF.Network({name: "gestion"});

      service.addNetwork(net1);
      service.addNetwork(net2);

      var result = service.instantiateOVF();

      Utils.compare(result, "11testInstantiateOVFParamsServiceFiware.xml");
  });

it('Instantiate OVF Params VM Fiware', function(){
      var vmTomcat = OVF.VM();
      vmTomcat.name = "tomcat";
      vmTomcat.imageName = "file:///cirros-0.3.0-x86_64-uec";
      vmTomcat.memory = 1024;
      vmTomcat.cpu = 1;
      
      var result = vmTomcat.instantiateOVF();

      Utils.compare(result, "12testInstantiateOVFParamsVMFiware.xml");
  });


});
});