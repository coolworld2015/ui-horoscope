(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersDialogCtrl', UsersDialogCtrl);

    UsersDialogCtrl.$inject = ['$state', '$rootScope', '$timeout', 'UsersService', 'UsersLocalStorage', '$stateParams'];

    function UsersDialogCtrl($state, $rootScope, $timeout, UsersService, UsersLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            usersDelete: usersDelete,
            usersEditBack: usersEditBack,
			_errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

		$timeout(function () {
			window.scrollTo(0,0);
            $rootScope.loading = false;
		});
		
        function usersDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;
			
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
				UsersService.deleteItem(vm.id)
					.then(function () {
						$rootScope.myError = false;
						$state.go('users');
					})
					.catch(errorHandler);
			} else {
				UsersLocalStorage.deleteItem(vm.id);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('users');
                }, 100);
			}
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