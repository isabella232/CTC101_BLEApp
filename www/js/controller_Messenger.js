angular.module('bleTest.controllers')

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
      var buf = new ArrayBuffer(str.length+1); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      bufView[i]=0;
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