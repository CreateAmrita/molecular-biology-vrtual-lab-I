/**	 
* @author:anisha
* @filename:user_controller.js
* @created 09-03-2017 10:00:50 AM
*/

(function() {
 angular.module('users', ['FBAngular'])
  .controller('UserController', [
   '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$element', 'Fullscreen', '$mdToast', '$animate',
   UserController
  ]);

 /**
  * Main Controller for the Angular Material Starter App
  * @param $scope
  * @param $mdSidenav
  * @param avatarsService
  * @constructor
  */
 function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate) {
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
		.filter(function(pos) {
		return $scope.toastPosition[pos];
		})
		.join(' ');
	};
	/**show the help on toast*/
  $scope.showActionToast = function() {
	var toast = $mdToast.simple()
	.content(help_array[0])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast1 = $mdToast.simple()
	.content(help_array[1])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast2 = $mdToast.simple()
	.content(help_array[2])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast3 = $mdToast.simple()
	.content(help_array[3])
	.action(help_array[5])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());
	
	/**for displaying help in the template*/
	$mdToast.show(toast).then(function() {
		$mdToast.show(toast1).then(function() {
			$mdToast.show(toast2).then(function() {
				$mdToast.show(toast3).then(function() {
				});
			});
		});
	});
  };
  var self = this;
  self.selected = null;
  self.users = [];
  self.toggleList = toggleUsersList;

  $scope.showValue = false; /** It hides the 'Result' tab */
  $scope.showVariables = false; /** I hides the 'Variables' tab */
  $scope.isActive = true;
  $scope.isActive1 = true;
  
  $scope.goFullscreen = function() {
		/** Full screen */
		if (Fullscreen.isEnabled())
		Fullscreen.cancel();
		else
		Fullscreen.all();
		/** Set Full screen to a specific element (bad practice) */
		/** Full screen.enable( document.getElementById('img') ) */
  };
  	$scope.resetExp = function() {
		$mdToast.cancel();
		window.location.reload();
	}
	$scope.toggle = function() {
		$scope.showValue = !$scope.showValue;
		$scope.isActive = !$scope.isActive;
	};
	/**menu tab 'Variable' toggle*/
	$scope.toggle1 = function() {
		$scope.showVariables = !$scope.showVariables;
		$scope.isActive1 = !$scope.isActive1;
	};
		/**chenge the enzyme from the dropdown box*/
	$scope.changeEnzyme = function() {	
	//reinitialize the variables and array when we change the enzymes.
			string="";
			txt_array1=txt_array2=[];
			GreenLineArr=[]  ;			
			line2.graphics.clear();
			lineFlag = false;
			cut_flag = false
			selected_enzyme= $scope.enzyme_name;				
			//clear the stage and loading the images again.
			split_container1.removeAllChildren();
			split_container2.removeAllChildren();		
			for ( var i = 0; i < 15; i++ ) { //strants				
				loadImages( queue.getResult( "line" ), "line", ( i + 1 ) * 43, 208, "", restriction_digestion_stage );
			}
			drawStaticRect();//re-draw the static rectboxes.			
			ShowRecognitionSequence($scope,selected_enzyme);		
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