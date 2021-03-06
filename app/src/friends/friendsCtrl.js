(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendsCtrl', FriendsCtrl);

    FriendsCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'UsersLocalStorage'];

    function FriendsCtrl($scope, $rootScope, $state, $timeout, UsersLocalStorage) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showToday: showToday,
            goToBack: goToBack,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

		$timeout(function () {
			window.scrollTo(0,0);
		});
		
		init();
		
        function init() {
            $rootScope.loading = false;
            $rootScope.myError = false;
            vm.title = 'Friend\'s horoscope';
			
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                getUsersOn();
            } else {
                vm.friends = UsersLocalStorage.getUsers();
				$rootScope.myError = false;
				$rootScope.loading = false;
            }
        }

        function showToday(item) {
			item.friends = true;
			$rootScope.loading = true;
            $rootScope.myError = false;
            $state.go('show-today', {signName: item.signName, friends: true});
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function signsBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }

})();
