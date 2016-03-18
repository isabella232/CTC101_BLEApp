angular.module('bleTest.controllers',[])

.controller("AppController",function($scope, $ionicModal, $state, BleServices, BleDefs){
  /*
  * Create modal for connect/disconnect ble devices
  *
  *
  */
  $ionicModal.fromTemplateUrl('templates/BleConnector.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.bleSelectModal = modal;
  });

  BleServices.status=status;

  $scope.bles=[];
  $scope.peripheral=undefined;

  /*
  * Event handle for when the connect button is clicked
  *
  *
  */
  
  $scope.connectClicked=function(){
    if(_.isUndefined($scope.peripheral)){
      $scope.bles=[];
      BleServices.enable(function(){
        BleServices.scan(onScan);
        $scope.openBleModal();
      });
    }else{
      //console.log("disconnect");
      disconnectDevice();
    }
  }
  
  /*
  * Open the ble list modal
  *
  *
  */
  $scope.openBleModal=function(){
    $scope.bleSelectModal.show();
  }
  /*
  * close the ble list modal
  *
  *
  */
  $scope.closeBleModal=function(){
    $scope.bleSelectModal.hide();
  }

  /*
  * Connect to a ble device
  *
  *
  */
  $scope.bleClicked=function(ble,index){
    //console.log(ble,index);
    BleServices.connect(ble.id,onConnect,onDisconnect);
    //$scope.connectBle(ble.id);
    $scope.closeBleModal();
  }
  /*
  * Displaying a status message
  *
  *
  */
  function status(message) {
    console.log(message);
    //statusDiv.innerHTML = message;
    $scope.statusMsg=message;
  }
  /*
  * Event handler for ble.scan, keep the list of 
  * available devices
  *
  */
  function onScan(peripheral) {
    //console.log(peripheral);
    $scope.$apply(function(){
      $scope.bles.push(peripheral);
    });
  }
  /*
  * Event handler for ble.connect
  *
  *
  */
  function onConnect(peripheral) {
    status("Connected to " + peripheral.id);
    $scope.peripheral=peripheral;
    //console.log(peripheral);
    
    var uartService=BleDefs.uartService;
    BleServices.readData(
      $scope.peripheral.id,
      uartService.service,
      uartService.typeChari,
      changeView
      )
  }

  $scope.testStuff=function(){
    var buffer=new ArrayBuffer(1);
    var buffview=new Uint8Array(buffer);
    buffview[0]=-1;

    changeView(buffer);
  }
  function changeView(buffer){
    var viewCode=new Uint8Array(buffer)[0];
    //console.log(viewCode);

    var service=_.pickBy(BleDefs, function(value,key){
      //value.service is included in peripheral.services 
      return value.exampleID==viewCode;
    });
    //console.log(service);
    var stateToGo=_.get(_.head(_.values(service)),"state");
    //console.log(stateToGo);
    if(_.isUndefined(stateToGo)){
      stateToGo=BleDefs.uartService.state;
    }

    $state.go(stateToGo).then(function(){
      $scope.$broadcast("onConnectBLE",$scope.peripheral);
    });
  }

  function disconnectDevice(device){
    if(_.isUndefined(device))device=$scope.peripheral;

    BleServices.disconnect(device.id,onDisconnect);
  }
  /*
  * Event handler for when ble is disconnected 
  *
  *
  */
  function onDisconnect(reason) {
    //alert("Disconnected " + reason);
    status("Disconnected");
    $scope.peripheral=undefined;
    $state.go("app.welcome");
  }
  /*
  * Event handler for when a ble error occurs
  *
  *
  */
  function onError(reason) {
    alert("There was an error " + reason);
  }
});