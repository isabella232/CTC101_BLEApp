angular.module('bleTest.controllers')

.controller("BleMessenger",function($scope ,BleServices, UtilServices, BleDefs){
  //var MessengerService=BleDefs.MessengerService;
  var uartService=BleDefs.uartService;

  $scope.formData={};
  $scope.bleData="";

  /*
  * When write button is pressed. Send a string to a ble device
  *
  *
  */
  $scope.sendMsg=function(){
    var data=UtilServices.str2ab($scope.formData.msg);
    //console.log(this);
  	BleServices.writeData(
      $scope.peripheral.id, 
      data, 
      uartService.service,
      uartService.rxChari, 
      $scope.readVal);
    
  }

  /*
  * When read button is pressed. Request value from a ble device
  *
  *
  */
  $scope.readVal=function(){
    //console.log($scope.peripheral.id)
    BleServices.readData(
      $scope.peripheral.id, 
      uartService.service,
      uartService.txChari, 
      showString);
    //console.log($scope.formData.msg);
  }

  /*
  * Display buffer data to frontend
  *
  *
  */
  function showString(buffer){
    //console.log(buffer);
    var data=UtilServices.ab2str(buffer);
    console.log(data);
    
    $scope.$apply(function(){
      $scope.bleData = data;
    });

  }

});