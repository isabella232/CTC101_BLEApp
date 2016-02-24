angular.module('bleTest.controllers')


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
          _.partial(onData,_,chari)
        );
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
});