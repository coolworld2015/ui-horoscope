(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignsCtrl', SignsCtrl);

    SignsCtrl.$inject = ['$scope', '$rootScope', '$state', 'SignsService'];

    function SignsCtrl($scope, $rootScope, $state, SignsService) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showToday: showToday,
            goToBack: goToBack,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        function init() {
            $rootScope.loading = false;
            $rootScope.myError = false;

            vm.signs = SignsService.getSignsLocal();

            var online = false;
            if (online) {
                SignsService.getSigns()
                    .then(function (data) {
                        vm.signs = data.data;
                        $rootScope.myError = false;
                        $rootScope.loading = false;
                    })
                    .catch(errorHandler);
            }
        }

        function showToday(item) {
			$rootScope.loading = true;
            $rootScope.myError = false;
            $state.go('show-today', {signName: item.signName});
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function signsBack() {
            $state.go('main');
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }

})();
