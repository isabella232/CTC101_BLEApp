angular.module('bleTest.services', [])
.factory("BleServices",function(){
  var app={
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
    disconnect:function(id,onDisconnect,onError){
      ble.disconnect(id,onDisconnect,this.onError);
    },
    startNotification: function(id,serviceID,charicaristicID, onData, onError){
      ble.startNotification(id, serviceID, charicaristicID, onData, this.onError);
    },
    readData: function(id,service,characteristic,onReadData,onError) {
      ble.read(id, service, characteristic, onReadData, this.onError);
    },
    writeData: function(id,value,service,characteristic,onWriteData,onError) {
      ble.write(id, service, characteristic, value, onWriteData, this.onError);
    },

    onError: function(reason){
      console.log("error: "+reason);
      alert("error: "+reason)
    }

  };

  return app;

})

.factory("UtilServices",function(){
  return {
    ab2str: function(buff){
      return String.fromCharCode.apply(null, new Uint8Array(buff));
    },

    str2ab: function(str){
      var buf = new ArrayBuffer(str.length); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      //bufView[i]=0;
      return buf;
    }
  }
})
