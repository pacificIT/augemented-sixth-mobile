	angular.module('augementedSixth')
		.controller('CarCtrl', function(
			$scope, $ionicModal, SensorService, $cordovaMedia,
			$ionicPlatform
		) {
			var vm = this;

			init();

			document.addEventListener("deviceready", function () {
				vm.beep = $cordovaMedia.newMedia('/android_asset/www/sound/beep.mp3');
			});
			vm.mute = window.localStorage.getItem('mute') || false;

			vm.toggleMute = toggleMute;

			function init () {
				$scope.sensors = {
					front: new Sensor('front'),
					back: new Sensor('back'),
					frontLeft: new Sensor('frontLeft'),
					frontRight: new Sensor('frontRight'),
					backLeft: new Sensor('backLeft'),
					backRight: new Sensor('backRight')
				};

				SensorService.getSensor($scope.sensors.front.name)
					.$bindTo($scope, 'sensors.front.distance');
				SensorService.getSensor($scope.sensors.back.name)
					.$bindTo($scope, 'sensors.back.distance');
				SensorService.getSensor($scope.sensors.frontRight.name)
					.$bindTo($scope, 'sensors.frontRight.distance');
				SensorService.getSensor($scope.sensors.frontLeft.name)
					.$bindTo($scope, 'sensors.frontLeft.distance');
				SensorService.getSensor($scope.sensors.backLeft.name)
					.$bindTo($scope, 'sensors.backLeft.distance');
				SensorService.getSensor($scope.sensors.backRight.name)
					.$bindTo($scope, 'sensors.backRight.distance');
			}

			function toggleMute () {
				vm.mute = !vm.mute;
				if (!vm.mute) {
					document.addEventListener("deviceready", function () {
						vm.beep.play();
					});
				}

				window.localStorage.setItem('mute', vm.mute);
			}

			function Sensor (name) {
				this.far = false;
				this.middle = false;
				this.close = false;
				this.name = name;
				this._distance = '';

				Object.defineProperty(this, 'distance', {
					get: function() {
						return this._distance;
					},
					set: function(firebaseRef) {
						switch (firebaseRef.$value) {
							case "far":
								if (!vm.mute) {
									vm.beep.play({
										numberOfLoops: 2
									});
								}
								this.close = false;
								this.middle = false;
								this.far = true;
								break;
							case "middle":
								if (!vm.mute) {
									vm.beep.play({
										numberOfLoops: 3
									});
								}
								this.close = false;
								this.middle = true;
								this.far = true;
								break;
							case "close":
								if (!vm.mute) {
									vm.beep.play({
										numberOfLoops: 4
									});
								}
								this.close = true;
								this.middle = true;
								this.far = true;
								break;
							default:
								this.close = false;
								this.middle = false;
								this.far = false;
								break;
						}

						this._distance = firebaseRef;
					}
				});
			}
		});
