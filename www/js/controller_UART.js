angular.module("bleTest.controllers")

.controller("UART",function($scope,$ionicPopup,BleServices,BleDefs){
	$scope.valueDisplays=[];
	$scope.editMode=false;

	var uartService=BleDefs.uartService;

	var numValueDisplays=0;

	$scope.addNewValue=function(){
		if(numValueDisplays>=20)return;

		$scope.valueDisplays.push({
			title:"value"+(++numValueDisplays),
			value:0
		});
	}
	$scope.addNewValue();

	$scope.toggleEdit=function(){
		$scope.editMode=!$scope.editMode;
	}


	$scope.$on("onConnectBLE",function(e,peripheral){
		onConnect(peripheral);
	})
	
	function onConnect(peripheral){
		BleServices.startNotification(
			peripheral.id,
			uartService.service,
			uartService.txChari,
			onData
		)
	}

	function onData(buffer){
		var data=new Uint8Array(buffer);

		$scope.$apply(function(){
			_.forEach($scope.valueDisplays,function(valueDisplay,index){
				if(index>=data.length){
					valueDisplay.value="NaN";	
				}else{
					valueDisplay.value=data[index];
				}
			})
		});
	}

	$scope.editValueDisplay=function(index){
		if($scope.editMode==false)return;

		$scope.valNameToEdit={title:$scope.valueDisplays[index].title};

		var editValueDisplayPopup=$ionicPopup.show({
			template:"<input type='text' ng-model='valNameToEdit.title'></input>",
			title:"Edit Value Dispaly",
			scope:$scope,
			buttons:[
				{text:'Cancel'},
				{
					text:'Save',
					type:'button-positive',
					onTap:function(e){
						return $scope.valNameToEdit.title;
					}
				}
			]
		})
		.then(function(val){
			if(val){
				$scope.valueDisplays[index].title=val;	
			}
		});

	}
	
})