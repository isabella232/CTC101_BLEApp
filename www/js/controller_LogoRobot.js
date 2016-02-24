angular.module("bleTest.controllers")

.controller("LogoRobot",function($scope, BleServices, UtilServices){
  var MessengerService= {
    service:"19B10000-E8F2-537E-4F6C-D104768A1214",
    measurement:"19B10001-E8F2-537E-4F6C-D104768A1214"
  }

	var commandList={
		"up":1,
		"down":2,
		"left":3,
		"right":4
	};

	$scope.logoCommands=[];
	var isSent=false;

	$scope.addCmd=function(cmd){
		cleanupCmds();
		var cmdCode=commandList[cmd];
		$scope.logoCommands.push({name:cmd,code:cmdCode});
	}

	$scope.sendCmd=function(){
		var cmdString=_.join(_.map($scope.logoCommands,"code"),"");
		console.log(cmdString);
		var data=UtilServices.str2ab(cmdString);
  	BleServices.writeData($scope.peripheral.id, data, MessengerService, onWrite);
		isSent=true;
	}

	$scope.backspace=function(num){
		if(_.isUndefined(num))num=1;
		cleanupCmds();
		$scope.logoCommands=_.dropRight($scope.logoCommands,num);
	}

	function cleanupCmds(){
		if(isSent){
			$scope.logoCommands=[];
			isSent=false;
		}
	}

	function onWrite(bla){
		console.log("write success ", bla);

	}

})