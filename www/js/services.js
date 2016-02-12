angular.module('bleTest.services', [])
.factory("BleServices",function(){
  var heartRate = {
      service: '180d',
      measurement: '2a37'
  };
  
  var app={
    initialize: function() {
      app.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.scan();
    },
    scan: function() {
      app.status("Scanning for Heart Rate Monitor");

      var foundHeartRateMonitor = false;

      function onScan(peripheral) {
          // this is demo code, assume there is only one heart rate monitor
          console.log("Found " + JSON.stringify(peripheral));
          foundHeartRateMonitor = true;

          ble.connect(peripheral.id, app.onConnect, app.onDisconnect);
      }

      function scanFailure(reason) {
          alert("BLE Scan Failed");
      }

      ble.scan([heartRate.service], 5, onScan, scanFailure);

      setTimeout(function() {
          if (!foundHeartRateMonitor) {
              app.status("Did not find a heart rate monitor.");
          }
      }, 5000);
    },
    onConnect: function(peripheral) {
      app.status("Connected to " + peripheral.id);
      ble.startNotification(peripheral.id, heartRate.service, heartRate.measurement, app.onData, app.onError);
    },
    onDisconnect: function(reason) {
      alert("Disconnected " + reason);
      beatsPerMinute.innerHTML = "...";
      app.status("Disconnected");
    },
    onData: function(buffer) {
      // assuming heart rate measurement is Uint8 format, real code should check the flags
      // See the characteristic specs http://goo.gl/N7S5ZS
      var data = new Uint8Array(buffer);
      beatsPerMinute.innerHTML = data[1];
    },
    onError: function(reason) {
      alert("There was an error " + reason);
    },
    status: function(message) {
      console.log(message);
      statusDiv.innerHTML = message;
    }

  };

  return {
    initialize: app.initialize,
    
  };

})


