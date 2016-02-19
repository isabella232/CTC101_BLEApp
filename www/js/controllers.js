angular.module('bleTest.controllers', [])

.controller("appController",function(){

})
.controller("MessageDisplay",function($scope ,BleServices){
    BleServices.onReadData=showString;
    //BleServices.onData=onData;

    BleServices.initialize("ledService");
    
    //$scope.ledVal=0;
    $scope.formData={};
    $scope.bleData="";

    /*
    * Send a string to a ble device
    *
    *
    */
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

    /*
    * Request value from a ble device
    *
    *
    */
    $scope.readVal=function(){
      BleServices.readData();
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
})

.controller("tamagotchi",function($scope,BleServices){
  var tamagotchiService={
    service:"361dbb0c-0193-49dd-93af-753ab760a344",
    foodChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698d",
    playChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698e",
    cleanChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698f"
  }
  
  BleServices.onConnect=onConnect;
  //$scope.foodChari=30;
  function onConnect(peripheral){
    console.log("start notification");
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