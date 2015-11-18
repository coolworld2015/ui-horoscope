(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowCtrl', ShowCtrl);

    ShowCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService'];

    function ShowCtrl($rootScope, $state, $stateParams, ShowService) {
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
            var yesterdayDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
            var tomorrowDate = d.getMonth() + 2 + '/' + d.getDate() + '/' + d.getFullYear();

            var src = "http://m-api.californiapsychics.com/horoscope?format=json" +
                "&sign=" + vm.signName +
                "&date=" + todayDate +
                "&callback=JSON_CALLBACK";

            var param = "&sign=" + vm.signName + "&date=" + todayDate;

            ShowService.getHoroscope(param)
                .then(function(data){
                    var details = data.data[0].details.scope;
                    details = details.replace(/’/g, "'");
                    vm.details = details;
                    vm.todayDate = todayDate;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);

            //$http({method: 'JSONP', url: src})
            //    .success(function (data) {
            //        var details = data[0].details.scope;
            //        details = details.replace(/’/g, "'");
            //        vm.details = details;
            //        vm.todayDate = todayDate;
            //        $rootScope.myError = false;
            //        $rootScope.loading = false;
            //    }).error(errorHandler);
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