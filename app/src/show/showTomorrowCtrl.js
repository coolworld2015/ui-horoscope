(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTomorrowCtrl', ShowTomorrowCtrl);

    ShowTomorrowCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService'];

    function ShowTomorrowCtrl($rootScope, $state, $stateParams, ShowService) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showToday: showToday,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            var d = new Date;
            var tomorrowDate = d.getMonth() + 1 + '/' + (d.getDate() + 1) + '/' + d.getFullYear();

            vm.date = tomorrowDate;
            var param = "&sign=" + vm.signName + "&date=" + tomorrowDate;

            ShowService.getHoroscope(param)
                .then(function (data) {
                    var details = data.data[0].details.scope;
                    details = details.replace(/’/g, "'");
                    vm.details = details;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);
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