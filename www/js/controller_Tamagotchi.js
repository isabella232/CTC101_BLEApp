angular.module('bleTest.controllers')


.controller("Tamagotchi",function($scope, BleServices, BleDefs){
  var tamagotchiService=BleDefs.tamagotchiService;
  var uartService=BleDefs.uartService;

  var tags=["foodChari","playChari","cleanChari"];

  $scope.$on("onConnectBLE",function(e,peripheral){
    onConnect(peripheral);
  });

  function onConnect(peripheral){
    BleServices.startNotification(
      peripheral.id,
      tamagotchiService.service,
      uartService.txChari,
      onData);
  }
  function onData(buffer){
    var data=new Uint8Array(buffer);

    console.log(data);

    $scope.$apply(function(){
      for(var i=0;i<tags.length;i++){
        $scope[tags[i]]=data[i];
      }
    })
  }
  /*
  function onConnect(peripheral){
    _.map(["foodChari","playChari","cleanChari"],
      function(chari){
        BleServices.startNotification(
          peripheral.id,
          tamagotchiService.service,
          tamagotchiService[chari],
          _.partial(onData,_,chari)
        );
      }
    );
    console.log("Tamagotchi connected");
  }

  function onData(buffer,chariName){
    var data = new Uint8Array(buffer);
    console.log(chariName+" "+data[1]);

    $scope.$apply(function(){
      $scope[chariName]=data[1];
    });
  }*/
});