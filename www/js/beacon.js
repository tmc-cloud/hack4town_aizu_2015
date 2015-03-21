
const PROXIMITY_IMMEDIATE = 3;
const PROXIMITY_NEAR = 2;
const PROXIMITY_FAR = 1;
const PROXIMITY_UNKNOWN = 0;

var beaconRegion;

function startBLEScan(uuid, callback){
	var delegate = new cordova.plugins.locationManager.Delegate();

	delegate.didDetermineStateForRegion = function (pluginResult) {
	};

	delegate.didStartMonitoringForRegion = function (pluginResult) {
	};

	// Beaconを検出した
	delegate.didRangeBeaconsInRegion = function (pluginResult) {
		console.log('didRangeBeaconsInRegion!!!!!!!!!!!!');

		var bcn = pluginResult;

		for(var i = 0; i < bcn.beacons.length; i++){
			var beacon = bcn.beacons[i];

			console.log('bcn.beacons[' + i + '].proximity = ' + bcn.beacons[i].proximity + '!!!!!!!!!!!!!!!!');

			var iProximity = proximityToInt(beacon.proximity);

			// 1つでも近くにBeaconがあったらそれをcallbackして終了
			if(iProximity >= PROXIMITY_NEAR) {
				console.log('Find Beacon ' + beacon.uuid, beacon.major, beacon.minor, beacon.proximty);
				stopBLEScan();
				callback(beacon.uuid, beacon.major, beacon.minor, beacon.proximity);
			}
		}
	};

	var identifier = 'mybeacons';
	beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

	cordova.plugins.locationManager.setDelegate(delegate);
	cordova.plugins.locationManager.requestWhenInUseAuthorization();
	cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(console.error).done();

  console.log('Start ranging beacons.');
}

function stopBLEScan(){
	console.log('Stop ranging beacons.');
	cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion).fail(console.error).done();
}

function proximityToInt(proximity) {
	switch (proximity){
  	case 'ProximityImmediate':
    	return PROXIMITY_IMMEDIATE;
    	break;
  	case 'ProximityNear':
    	return PROXIMITY_NEAR;
    	break;
  	case 'ProximityFar':
    	return PROXIMITY_FAR;
    	break;
		case 'ProximityUnknown':
			return PROXIMITY_UNKNOWN;
			break;
	}
}
