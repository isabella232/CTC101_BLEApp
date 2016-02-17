angular.module('bleTest.controllers', [])

.controller("HeartRateDisplay",function($scope ,BleServices){
    BleServices.onReadData=showString;

    BleServices.initialize("ledService");
    
    //$scope.ledVal=0;


    $scope.sendMsg=function(){
      var data=str2ab(this.msg);
      //console.log(this.msg);
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
      //var val=BleServices.readData();
      console.log($scope.msg);
      $scope.bleData = $scope.msg;
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
      $scope.bleData = data;
      //beatsPerMinute.innerHTML=data;

      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
      }
    }






    
});

