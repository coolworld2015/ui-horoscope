(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowYesterdayCtrl', ShowYesterdayCtrl);

    ShowYesterdayCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService'];

    function ShowYesterdayCtrl($rootScope, $state, $stateParams, ShowService) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showToday: showToday,
            showTomorrow: showTomorrow,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            var d = new Date;
            var yesterdayDate = d.getMonth() + 1 + '/' + (d.getDate() - 1) + '/' + d.getFullYear();

            vm.date = yesterdayDate;
            var param = "&sign=" + vm.signName + "&date=" + yesterdayDate;

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

        function showToday() {
            $rootScope.loading = true;
            $state.go('show-today', {item: $stateParams.item});
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