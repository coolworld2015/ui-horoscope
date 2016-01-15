(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTodayCtrl', ShowTodayCtrl);

    ShowTodayCtrl.$inject = ['$rootScope', '$state', '$timeout', '$stateParams', 'ShowService', 'today'];

    function ShowTodayCtrl($rootScope, $state, $timeout, $stateParams, ShowService, today) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showTomorrow: showTomorrow,
            signsBack: signsBack,
            errorHandler: errorHandler
        });
		
		$timeout(function () {
			window.scrollTo(0,0);
		},100);
		
		init();

        function init() {
            vm.date = ShowService.paramDate('today');
			vm.signName = $stateParams.signName;
			
			if (today) {
				vm.details = today;
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

        function showTomorrow() {
            $rootScope.loading = true;
            $state.go('show-tomorrow', {signName: $stateParams.signName, friends: $stateParams.friends});
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