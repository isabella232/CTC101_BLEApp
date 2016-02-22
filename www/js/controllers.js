angular.module('bleTest.controllers', [])

.controller("AppController",function($scope, $ionicModal, BleServices){
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

  //BleServices.onConnect=onConnect;
  //BleServices.onScan=onScan;
  //BleServices.onDisconnect=onDisconnect;
  //BleServices.onError=onError;
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
    $scope.$broadcast("onConnectBLE",peripheral);
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
})


.controller("BleMessenger",function($scope ,BleServices){
  var MessengerService= {
    service:"19B10000-E8F2-537E-4F6C-D104768A1214",
    measurement:"19B10001-E8F2-537E-4F6C-D104768A1214"
  }

  $scope.formData={};
  $scope.bleData="";

  /*
  * When write button is pressed. Send a string to a ble device
  *
  *
  */
  $scope.sendMsg=function(){
    var data=str2ab($scope.formData.msg);
    //console.log(this);
  	BleServices.writeData($scope.peripheral.id, data, MessengerService, $scope.readVal, onError);
    
    function str2ab(str) {
      var buf = new ArrayBuffer(str.length); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
  }

  /*
  * When read button is pressed. Request value from a ble device
  *
  *
  */
  $scope.readVal=function(){
    console.log($scope.peripheral.id)
    BleServices.readData($scope.peripheral.id, MessengerService, showString, onError);
    //console.log($scope.formData.msg);
  }

  /*
  * Display buffer data to frontend
  *
  *
  */
  function showString(buffer){
    //console.log(buffer);
    var data=ab2str(buffer);
    console.log(data);
    
    $scope.$apply(function(){
      $scope.bleData = data;
    });

    function ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
  }

  /*
  * Event handler for when a ble error occurs
  *
  *
  */
  function onError(reason) {
    alert("There was an error " + reason);
  }
})

.controller("Tamagotchi",function($scope, BleServices){
  var tamagotchiService={
    service:"361dbb0c-0193-49dd-93af-753ab760a344",
    foodChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698d",
    playChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698e",
    cleanChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698f"
  }
  
  $scope.$on("onConnectBLE",function(e,peripheral){
    onConnect(peripheral);
  });

  function onConnect(peripheral){
    _.map(["foodChari","playChari","cleanChari"],
      function(chari){
        BleServices.startNotification(
          peripheral,
          tamagotchiService.service,
          tamagotchiService[chari],
          _.partial(onData,_,chari),
          onError);
      }
    );
    
  }

  function onData(buffer,chariName){
    var data = new Uint8Array(buffer);
    console.log(chariName+" "+data[1]);

    $scope.$apply(function(){
      $scope[chariName]=data[1];
    });
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