(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTomorrowCtrl', ShowTomorrowCtrl);

    ShowTomorrowCtrl.$inject = ['$rootScope', '$state', '$timeout', '$stateParams', 'ShowService', 'tomorrow'];

    function ShowTomorrowCtrl($rootScope, $state, $timeout, $stateParams, ShowService, tomorrow) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showToday: showToday,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

		$timeout(function () {
			window.scrollTo(0,0);
		},100);
	
		init();

        function init() {
            vm.date = ShowService.paramDate('tomorrow');
			vm.signName = $stateParams.signName;
			
			if (tomorrow) {
				vm.details = tomorrow;
				$rootScope.loading = false;
				$rootScope.myError = false;
			} else {
				errorHandler();
			}			
        }

        function showYesterday() {
            $rootScope.loading = true;
            $state.go('show-yesterday', {signName: $stateParams.signName, friends: $stateParams.friends});
        }

        function showToday() {
            $rootScope.loading = true;
            $state.go('show-today', {signName: $stateParams.signName, friends: $stateParams.friends});
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function signsBack() {
            $rootScope.loading = true;
			if ($stateParams.friends) {
				$state.go('friends');
			} else {
				$state.go('signs');
			}
        }
    }
})();