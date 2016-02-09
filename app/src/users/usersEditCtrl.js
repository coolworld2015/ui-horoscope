(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersEditCtrl', UsersEditCtrl);

    UsersEditCtrl.$inject = ['$state', '$rootScope', '$timeout',
        'UsersService', 'UsersLocalStorage', 'SignsService',
        '$stateParams'];

    function UsersEditCtrl($state, $rootScope, $timeout,
                           UsersService, UsersLocalStorage, SignsService,
                           $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            usersSubmit: usersSubmit,
            usersDialog: usersDialog,
            usersEditBack: usersEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('users');
            }

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function usersSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var signName = SignsService.getSignName(vm.birthDate) || "logo";
            var item = {
                id: vm.id,
                name: vm.name,
                birthDate: vm.birthDate,
                signName: signName,
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                UsersService.editItem(item)
                    .then(function () {
                        $rootScope.myError = false;
                        $state.go('users');
                    })
                    .catch(errorHandler);
            } else {
                UsersLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('users');
                }, 100);
            }
        }

        function usersDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users-dialog', {item: obj});
            }, 100);
        }

        function usersEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();