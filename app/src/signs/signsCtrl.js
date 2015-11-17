(function() {
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

        init();

        function init() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            SignsService.getSigns()
                .then(function(data){
                    vm.signs = data.data;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);
        }

        function showToday(item) {
            $state.go('show-today', {item: item});
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



        //showName = function (name) {
        //    document.location.href = "#/signs/" + name;
        //}
    }

})();
