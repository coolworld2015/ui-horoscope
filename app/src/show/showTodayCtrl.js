(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTodayCtrl', ShowTodayCtrl);

    ShowTodayCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService', 'today'];

    function ShowTodayCtrl($rootScope, $state, $stateParams, ShowService, today) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showTomorrow: showTomorrow,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
			var d = new Date;
            var todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
            vm.date = todayDate;
			
			if (today) {
			vm.details = today;
            $rootScope.loading = false;
            $rootScope.myError = false;
			} else {
				errorHandler();
			}
 /*			
            $rootScope.loading = true;
            $rootScope.myError = false;

            var d = new Date;
            var todayDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

            vm.date = todayDate;
            var param = "&sign=" + vm.signName + "&date=" + todayDate;

            ShowService.getHoroscope(param)
                .then(function (data) {
                    var details = data.data[0].details.scope;
                    details = details.replace(/’/g, "'");
                    vm.details = details;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);
 */				
        }

        function showYesterday() {
            $rootScope.loading = true;
            $state.go('show-yesterday', {item: $stateParams.item});
        }

        function showTomorrow() {
            $rootScope.loading = true;
            $state.go('show-tomorrow', {item: $stateParams.item});
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