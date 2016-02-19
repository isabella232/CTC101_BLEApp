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
   

    /*
    * Create modal for connect/disconnect ble devices
    *
    *
    */
    $ionicModal.fromTemplateUrl('bleSelector.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.bleSelectModal = modal;
    });


    //BleServices.onConnect=onConnect;
    BleServices.onScan=onScan;
    BleServices.onDisconnect=onDisconnect;
    BleServices.onError=onError;
    BleServices.status=status;

    $rootScope.bles=[];
    $rootScope.connectStatus=false;
    $rootScope.connectedDevice;


    /*
    * Event handle for when the connect button is clicked
    *
    *
    */
    $rootScope.connectClicked=function(){
      if($rootScope.connectStatus==false){
        $rootScope.bles=[];
        BleServices.scan();
        $rootScope.openBleModal();
      }else{
        console.log("disconnect");
      }
    }
    /*
    * Open the ble list modal
    *
    *
    */
    $rootScope.openBleModal=function(){
      $rootScope.bleSelectModal.show();
    }
    /*
    * close the ble list modal
    *
    *
    */
    $rootScope.closeBleModal=function(){
      $rootScope.bleSelectModal.hide();
    }

    /*
    * Connect to a ble device
    *
    *
    */
    $rootScope.connectBle=function(ble,index){
      //console.log(ble,index);
      BleServices.connect(ble.id);
      $rootScope.closeBleModal();
    }

    /*
    * Displaying a status message
    *
    *
    */
    function status(message) {
      console.log(message);
      //statusDiv.innerHTML = message;
      $rootScope.statusMsg=message;
    }
    /*
    * Event handler for ble.scan, keep the list of 
    * available devices
    *
    */
    function onScan(peripheral) {
      //console.log(peripheral);
      $rootScope.$apply(function(){
        $rootScope.bles.push(peripheral);
      });
    }
    /*
    * Event handler for ble.connect
    *
    *
    */
    function onConnect(peripheral) {
      status("Connected to " + peripheral.id);
      //console.log(peripheral);
      //ble.startNotification(peripheral.id, app.scPair.service, app.scPair.measurement, app.onData, app.onError);
    }
    /*
    * Event handler for when ble is disconnected 
    *
    *
    */
    function onDisconnect(reason) {
      alert("Disconnected " + reason);
      //beatsPerMinute.innerHTML = "...";
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
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state("app",{
    url:"/app",
    abstract:true,
    templateUrl: "templates/baseTemplate.html",
    controller:"appController"
  })
})