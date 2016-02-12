angular.module('bleTest.controllers', [])

.controller("HeartRateDisplay",function($scope,BleServices){
    BleServices.initialize();

})

