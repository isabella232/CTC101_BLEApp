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
  $scope.connectStatus=false;
  $scope.connectedDevice;

  /*
  * Event handle for when the connect button is clicked
  *
  *
  */
  
  $scope.connectClicked=function(){
    if($scope.connectStatus==false){
      $scope.bles=[];
      BleServices.scan(onScan);
      $scope.openBleModal();
    }else{
      console.log("disconnect");
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
  $scope.changeState=function(){
    var peripheral={};
    peripheral.services=["1800","1801","19B10000-E8F2-537E-4F6C-D104768A1214"];
    var service=_.pickBy(BleDefs, function(value,key){
      //value.service is included in peripheral.services 
      return _.includes(peripheral.services,value.service);
    });
    //console.log(service);
    var stateToGo=_.values(service)[0].state
    //console.log(stateToGo);
    $state.go(stateToGo)
  }
*/
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
    
    var service=_.pickBy(BleDefs, function(value,key){
      //value.service is included in peripheral.services 
      return _.includes(peripheral.services,value.service);
    });
    //console.log(service);
    var stateToGo=_.values(service)[0].state;
    //console.log(stateToGo);
    $state.go(stateToGo).then(function(){
      $scope.$broadcast("onConnectBLE",peripheral);
    });
    
    
  }
  /*
  * Event handler for when ble is disconnected 
  *
  *
  */
  function onDisconnect(reason) {
    alert("Disconnected " + reason);
    status("Disconnected");
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