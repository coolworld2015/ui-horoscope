(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);
		
	MainCtrl.$inject = ['$rootScope', '$state', '$timeout'];		
	
	function MainCtrl($rootScope, $state, $timeout) {
		var vm = this;
		
		angular.extend(vm, {
			init: init,
			go: go
		});

		$timeout(function () {
			window.scrollTo(0,0);
		});
	
		init();
		
		function init() {
			$rootScope.loading = false;
			window.scrollTo(0,0);
		}
		
		function go() {
			$rootScope.loading = true;
		}
	}
		
})();