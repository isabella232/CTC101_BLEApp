angular.module("bleTest.controllers")

.controller("UART",function($scope,$ionicPopup,BleServices,UtilServices,BleDefs){
	$scope.valueDisplays=[];
	$scope.customControls=[];

	$scope.editMode=false;
	$scope.uartTabMode=0;



	var uartService=BleDefs.uartService;

	var numValueDisplays=0;

	function init(){
		$scope.addNewValueDisplay();
		initCustomCommands();
	}

	/*
	*	Value Display
	*
	*
	*/
	$scope.addNewValueDisplay=function(){
		if(numValueDisplays>=20)return;

		$scope.valueDisplays.push({
			title:"value"+(++numValueDisplays),
			value:0
		});
	}
	

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



	/*
	*	Custom Commands
	*
	*
	*/
	function initCustomCommands(){
		$scope.customControls=[
			{
				icon:"ion-arrow-up-c",
				value:"1",
			},
			{
				icon:"ion-arrow-left-c",
				value:2,
			},
			{
				icon:"ion-arrow-down-c",
				value:3,
			},
			{
				icon:"ion-arrow-right-c",
				value:4,
			},
			{
				icon:"ion-checkmark-round",
				value:5,
			},
			{
				icon:"ion-close-round",
				value:6,
			},
			{
				icon:"ion-help",
				value:7,
			},
			{
				icon:"ion-alert",
				value:8,
			},
		]
	}
	$scope.customControlClicked=function(index){
		if($scope.editMode==false)
			sendCommand(index);
		else
			editCustomControl(index);

	}

	function sendCommand(index){
		var source=$scope.customControls[index];

		var data=new ArrayBuffer(1);
		var bufView=new Uint8Array(data);
		bufView[0]=source.value;

    //var data=UtilServices.str2ab(source.value);
    //console.log(this);
  	BleServices.writeData(
      $scope.peripheral.id, 
      data, 
      uartService.service,
      uartService.rxChari
    );
 	}

 	function editCustomControl(index){
		$scope.custControlToEdit=_.clone($scope.customControls[index]);

		var editCustomControlPopup=$ionicPopup.show({
			template:
				"<!--icon:<input type='text' ng-model='custControlToEdit.icon'></input>--> \
				value:<input type='text' ng-model='custControlToEdit.value'></input>",
			title:"Edit Custom Control",
			scope:$scope,
			buttons:[
				{text:'Cancel'},
				{
					text:'Save',
					type:'button-positive',
					onTap:function(e){
						return $scope.custControlToEdit;
					}
				}
			]
		})
		.then(function(val){
			val.value=Number(val.value);
			var numVal=val.value;
			if(!isNaN(numVal) && numVal===parseInt(numVal,10) && numVal>0 && numVal<255){
				$scope.customControls[index]=val;	
			}else{
				editCustomControlAlert();
			}
		}); 	
	}
	function editCustomControlAlert(){
	   var alertPopup = $ionicPopup.alert({
	     title: 'Invalid value',
	     template: 'Please use a integer between, and including 0 and 255'
	   });

	}

	$scope.setTabMode=function(mode){
		$scope.uartTabMode=mode;
	}
	

	init();

})