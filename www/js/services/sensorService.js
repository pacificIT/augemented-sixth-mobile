(function(angular, Firebase) {
	angular.module('augementedSixth')
		.service('SensorService', SensorService);

	function SensorService ($firebaseObject) {
		var ref = new Firebase('augmented-sixth.firebaseIO.com');

		return {
			getSensor: getSensor,
			getFrontSensor: getFrontSensor
		};

		function getFrontSensor () {
			return $firebaseObject(ref.child('front'));
		}

		function getSensor (name) {
			return $firebaseObject(ref.child(name));
		}
	}
})(angular, Firebase);
