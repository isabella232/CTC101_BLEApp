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


    scan: function(onScan) {
      this.status("Scanning for Heart Rate Monitor");

      var me=this;

      function scanFailure(reason) {
          alert("BLE Scan Failed");
      }
      ble.scan([], 5, onScan, scanFailure);

      /*setTimeout(function() {
          if (!foundHeartRateMonitor) {
              alert("Did not find a heart rate monitor.");
          }
      }, 5000);*/
    },
    connect: function(id,onConnect,onDisconnect){
      ble.connect(id, onConnect, onDisconnect);
    },
    startNotification: function(peripheral,serviceID,charicaristicID, onData, onError){
      ble.startNotification(peripheral.id, serviceID, charicaristicID, onData, onError);
    },
    readData: function(id,scPair,onReadData,onError) {
      ble.read(id, scPair.service, scPair.measurement, onReadData, onError);
    },
    writeData: function(id,value,scPair,onWriteData,onError) {
      ble.write(id, scPair.service, scPair.measurement, value, onWriteData, onError);
    },

  };

  return app;

})


