// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bleTest', ['ionic', 'bleTest.controllers', 'bleTest.services'])

.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state("app",{
    url:"/app",
    abstract:true,
    templateUrl: "templates/baseTemplate.html",
    controller:"AppController"
  })

  .state("app.Tamagotchi",{
    url:"/tamagotchi",
    views:{
      "content":{
        templateUrl: "templates/Tamagotchi.html",
        controller:"Tamagotchi"  
      }
    }
  })

  .state("app.BleMessenger",{
    url:"/blemessenger",
    views:{
      "content":{
        templateUrl: "templates/BleMessenger.html",
        controller:"BleMessenger"
      }
    }
  })

  .state("app.BleRobot",{
    url:"/blerobot",
    views:{
      "content":{
        templateUrl: "templates/BleRobot.html",
        controller:"LogoRobot"
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

  $urlRouterProvider.otherwise('/app/tamagotchi');
})