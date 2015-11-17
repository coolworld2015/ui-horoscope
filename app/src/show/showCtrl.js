(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowCtrl', ShowCtrl);

    ShowCtrl.$inject = ['$rootScope', '$state', '$stateParams', '$http'];

    function ShowCtrl($rootScope, $state, $stateParams, $http) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            //showToday: showToday,
            //goToBack: goToBack,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            var d = new Date;
            var todayDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

            var src = "http://m-api.californiapsychics.com/horoscope?format=json" +
                "&sign=" + vm.signName +
                "&date=" + todayDate +
                "&callback=JSON_CALLBACK";

            $http({method: 'JSONP', url: src})
                .success(function (data) {
                    var details = data[0].details.scope;
                    details = details.replace(/’/g, "'");
                    vm.details = details;
                    vm.todayDate = todayDate;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                }).error(errorHandler);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function signsBack() {
            $state.go('signs');
        }

    }


})();