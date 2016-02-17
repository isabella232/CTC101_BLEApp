// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bleTest', ['ionic', 'bleTest.controllers', 'bleTest.services'])

.run(function($rootScope, $ionicPlatform, $ionicModal ,BleServices) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $ionicModal.fromTemplateUrl('bleSelector.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.bleSelectModal = modal;
    });


    BleServices.onConnect=onConnect;
    BleServices.onScan=onScan;
    BleServices.onDisconnect=onDisconnect;
    //BleServices.onData=onData;
    BleServices.onError=onError;
    BleServices.status=status;

    $rootScope.bles=[];
    $rootScope.connectStatus=false;
    $rootScope.connectedDevice;

    $rootScope.connectClicked=function(){
      if(this.connectStatus==false){
        this.bles=[];
        BleServices.scan();
        this.openBleModal();
      }else{
        console.log("disconnect");
      }
    }
    $rootScope.openBleModal=function(){
      $rootScope.bleSelectModal.show();
    }
    $rootScope.closeBleModal=function(){
      $rootScope.bleSelectModal.hide();
    }

    $rootScope.connectBle=function(ble,index){
      //console.log(ble,index);
      BleServices.connect(ble.id);
      this.closeBleModal();
    }


    function status(message) {
      console.log(message);
      //statusDiv.innerHTML = message;
      $rootScope.statusMsg=message;
    }
    function onScan(peripheral){
      //console.log(peripheral);
      $rootScope.bles.push(peripheral);
    }
    function onConnect(peripheral) {
      status("Connected to " + peripheral.id);
      //console.log(peripheral);
      //ble.startNotification(peripheral.id, app.scPair.service, app.scPair.measurement, app.onData, app.onError);
    }
    function onDisconnect(reason) {
      alert("Disconnected " + reason);
      //beatsPerMinute.innerHTML = "...";
      status("Disconnected");
    }
    function onError(reason) {
      alert("There was an error " + reason);
    }
  });
});

