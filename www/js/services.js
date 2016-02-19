angular.module('bleTest.services', [])
.factory("BleServices",function(){
  var scPairs={
    heartRate: {
      service: '180d',
      measurement: '2a37'
    },
    ledService: {
      service:"19B10000-E8F2-537E-4F6C-D104768A1214",
      measurement:"19B55555-E8F2-537E-4F6C-D104768A1214"
    }
  }

  var peri;
  var scP;

  var app={
    initialize: function(scPair) {
      scP=scPairs[scPair];
    },


    bindEvents: function() {
      document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.scan();
    },


    scan: function() {
      this.status("Scanning for Heart Rate Monitor");

      var me=this;

      function scanFailure(reason) {
          alert("BLE Scan Failed");
      }
      ble.scan([], 5, this.onScan, scanFailure);

      /*setTimeout(function() {
          if (!foundHeartRateMonitor) {
              alert("Did not find a heart rate monitor.");
          }
      }, 5000);*/
    },
    connect: function(id){
      var me=this;
      ble.connect(id, 
        function(peripheral){
          peri=peripheral;
          me.onConnect(peripheral);
        }, 
        function(reason){
          peri=null;
          me.onDisconnect(reason);
        });
    },
    startNotification: function(peripheral,serviceID,charicaristicID, onData, onError){
      ble.startNotification(peripheral.id, serviceID, charicaristicID,onData,onError);
    },
    readData: function() {
      ble.read(peri.id, scP.service, scP.measurement,this.onReadData,this.onError);
    },
    writeData: function(value) {
      var me=this;
      ble.write(peri.id, scP.service, scP.measurement,value,
        function(){
          me.readData();
        },
      this.onError);
    },

  };

  return app;

})


