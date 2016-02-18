angular.module('bleTest.controllers', [])

.controller("MessageDisplay",function($scope ,BleServices){
    BleServices.onReadData=showString;
    //BleServices.onData=onData;

    BleServices.initialize("ledService");
    
    //$scope.ledVal=0;
    $scope.formData={};
    $scope.bleData="";
    //$scope.statusMsg="";

    $scope.sendMsg=function(){
      var data=str2ab($scope.formData.msg);
      //console.log(this);
    	BleServices.writeData(data);
      
      function str2ab(str) {
        var buf = new ArrayBuffer(str.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }
    }
    $scope.readVal=function(){
      BleServices.readData();
      //console.log($scope.formData.msg);
    }


/*
    function onData(buffer) {
      // assuming heart rate measurement is Uint8 format, real code should check the flags
      // See the characteristic specs http://goo.gl/N7S5ZS
      var data = new Uint8Array(buffer);
      //beatsPerMinute.innerHTML = data[1];
    }
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
});

