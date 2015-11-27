(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTomorrowCtrl', ShowTomorrowCtrl);

    ShowTomorrowCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService', 'tomorrow'];

    function ShowTomorrowCtrl($rootScope, $state, $stateParams, ShowService, tomorrow) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showToday: showToday,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        function init() {
            vm.date = ShowService.paramDate('tomorrow');
			
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
            $state.go('show-yesterday', {item: $stateParams.item});
        }

        function showToday() {
            $rootScope.loading = true;
            $state.go('show-today', {item: $stateParams.item});
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function signsBack() {
            $rootScope.loading = true;
            $state.go('signs');
        }
    }
})();