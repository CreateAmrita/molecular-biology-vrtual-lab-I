(function(){
    angular
    .module('users',['FBAngular'])
    .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q','$scope','$element','Fullscreen','$mdToast','$animate',
        UserController
    ]);
    /**
    * Main Controller for the Angular Material Starter App
    * @param $scope
    * @param $mdSidenav
    * @param avatarsService
    * @constructor
    */
    function UserController( $mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate, $translate, dialogs) {
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        $scope.toggleSidenav = function(ev) {
            $mdSidenav('right').toggle();
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };
        $scope.showActionToast = function() {        
            var toast = $mdToast.simple()
            .content(help_array[0])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
        
            var toast1 = $mdToast.simple()
            .content(help_array[1])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
		  
            var toast2 = $mdToast.simple()
            .content(help_array[2])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
            var toast3 = $mdToast.simple()
            .content(help_array[3])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
            var toast4 = $mdToast.simple()
            .content(help_array[4])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());            

            var toast5 = $mdToast.simple()
            .content(help_array[5])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            var toast6 = $mdToast.simple()
            .content(help_array[6])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            var toast7 = $mdToast.simple()
            .content(help_array[7])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            var toast8 = $mdToast.simple()
            .content(help_array[8])
            .action(help_array[10])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            var toast9 = $mdToast.simple()
            .content(help_array[9])
            .action(help_array[11])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            $mdToast.show(toast).then(function() {
                $mdToast.show(toast1).then(function() {
                    $mdToast.show(toast2).then(function() {
                        $mdToast.show(toast3).then(function() {
                            $mdToast.show(toast4).then(function() {
                                $mdToast.show(toast5).then(function() {
                                    $mdToast.show(toast6).then(function() {
                                        $mdToast.show(toast7).then(function() {
                                            $mdToast.show(toast8).then(function() {
                                                $mdToast.show(toast9).then(function() {
                                                });
                                            });
                                        });
                                    });
                                });
			 				});
			  			});
			  		});
			  	});
            });		
        };
		var self = this;
		self.selected     = null;
		self.users        = [ ];
		self.toggleList   = toggleUsersList;

		$scope.showVariables = false; /** I hides the 'Variables' tab */
		$scope.isActive = true;
		$scope.isActive1 = true; 
	
		$scope.goFullscreen = function () {
			/** Full screen */
			if (Fullscreen.isEnabled())
				Fullscreen.cancel();
			else
				Fullscreen.all();
		};
	
		$scope.resetExperiment = function() {
		$mdToast.cancel();
		resetExperiment($scope);
		} 

		$scope.toggle = function () {
			$scope.showValue=!$scope.showValue;
			$scope.isActive = !$scope.isActive;
		};  
	
		$scope.toggle1 = function () {
			$scope.showVariables=!$scope.showVariables;
			$scope.isActive1 = !$scope.isActive1;
		};

		/** Change event function of agarose dropdown */
		$scope.changeAgarose = function() {
			agaroseExperiment($scope);
		}
		
		/** Change event function of DNA dropdown */
		$scope.changeDna = function() {
			dnaExperiment($scope);
		}
	
		/** Change event function of marker slider */
		$scope.changeMarker = function() {
			markerExperiment($scope);
		}
		
		/** Change event function of well1 dropdown */
		$scope.changeWell1 = function() {
			changeWell1Fn($scope);
		}
		
		/** Change event function of well2 dropdown */
		$scope.changeWell2 = function() {
			changeWell2Fn($scope);
		}
		
		/** Change event function of well3 dropdown */
		$scope.changeWell3 = function() {
			changeWell3Fn($scope);
		}
		
		/** Change event function of well4 dropdown */
		$scope.changeWell4 = function() {
			changeWell4Fn($scope);
		}
		
		/** Change event function of well5 dropdown */
		$scope.changeWell5 = function() {
			changeWell5Fn($scope);
		}

		/** Change event function of start/reset button */
		$scope.startsimulator = function() {	
			startExperiment($scope);
		}
		
		/** Change event function of power on/off button */
		$scope.poweron = function() {	
			poweronExperiment($scope);
		}
		
		/** Change event function of turn on/off button */
		$scope.turnon = function() {	
			turnonExperiment($scope);
		}
	
		/**
		* First hide the bottom sheet IF visible, then
		* hide or Show the 'left' sideNav area
		*/
		function toggleUsersList() {
			$mdSidenav('right').toggle();
		}
	}
})();