// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bleTest', ['ionic', 'bleTest.controllers', 'bleTest.services'])

.run(function($ionicPlatform,$rootScope) {
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
  });

})
.constant("BleDefs",{
  LogoRobotService: {
    state:"app.BleRobot",
    service:"19f82bd2-da79-11e5-b5d2-0a1d41d68578",
    measurement:"19f82bd2-da79-11e5-b5d2-0a1d41d68579"
  },
  MessengerService: {
    state:"app.BleMessenger",
    service:"19b10000-e8f2-537e-4f6c-d104768a1214",
    measurement:"19b10001-e8f2-537e-4f6c-d104768a1214"
  },
  tamagotchiService: { 
    state:"app.Tamagotchi",
    service:"361dbb0c-0193-49dd-93af-753ab760a344",
    foodChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698d",
    playChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698e",
    cleanChari:"6ba3791d-bc31-4c7b-8a56-df1642fb698f"
  },
  uartService:{
    service:"6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    txChari:"6E400003-B5A3-F393-E0A9-E50E24DCCA9E",
    rxChari:"6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
  }
})

.config(function($stateProvider, $urlRouterProvider,BleDefs){
  $stateProvider

  .state("app",{
    url:"/app",
    abstract:true,
    templateUrl: "templates/baseTemplate.html",
    controller:"AppController"
  })

  .state(BleDefs.tamagotchiService.state,{
    url:"/tamagotchi",
    views:{
      "content":{
        templateUrl: "templates/Tamagotchi.html",
        controller:"Tamagotchi"  
      }
    }
  })

  .state(BleDefs.MessengerService.state,{
    url:"/blemessenger",
    views:{
      "content":{
        templateUrl: "templates/BleMessenger.html",
        controller:"BleMessenger"
      }
    }
  })

  .state(BleDefs.LogoRobotService.state,{
    url:"/blerobot",
    views:{
      "content":{
        templateUrl: "templates/BleRobot.html",
        controller:"LogoRobot"
      }
    }
  })
  .state("app.welcome", {
    url:"/welcome",
    views:{
      "content":{
        templateUrl: "templates/Welcome.html",
      }
    }
  })
  .state("app.Test",{
    url:"/test",
    views:{
      "content":{
        templateUrl:"templates/TestView.html"
      }
    }
  });

  $urlRouterProvider.otherwise('/app/welcome');
})