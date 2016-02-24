angular.module('bleTest.controllers')

.controller("BleMessenger",function($scope ,BleServices, UtilServices){
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
    var data=UtilServices.str2ab($scope.formData.msg);
    //console.log(this);
  	BleServices.writeData($scope.peripheral.id, data, MessengerService, $scope.readVal);
    
  }

  /*
  * When read button is pressed. Request value from a ble device
  *
  *
  */
  $scope.readVal=function(){
    console.log($scope.peripheral.id)
    BleServices.readData($scope.peripheral.id, MessengerService, showString);
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