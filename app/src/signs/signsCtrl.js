(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignsCtrl', SignsCtrl);

    SignsCtrl.$inject = ['$rootScope', 'SignsService'];

    function SignsCtrl($rootScope, SignsService) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            errorHandler: errorHandler
        });

        init();

        function init() {
            SignsService.getSigns()
                .then(function(data){
                    vm.signs = data.data;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);
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
