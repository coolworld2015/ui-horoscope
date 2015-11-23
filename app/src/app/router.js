(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

	routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
		getHoroscope.$inject =['$rootScope', '$http', '$stateParams', 'ShowService'];
		
		function getHoroscope($rootScope, $http, $stateParams, ShowService) {
			var webUrl = $rootScope.myConfig.webUrl;
			var d = new Date;
			var todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
			var param = "&sign=" + $stateParams.item.signName + "&date=" + ShowService.paramDate();
			var url = webUrl + param + '&callback=JSON_CALLBACK';
			return $http.jsonp(url)
				.then(function (result) {
					var details = result.data[0].details.scope;
					details = details.replace(/’/g, "'");
					return details;
				})
				.catch(function() {
				});
		}
						
        $urlRouterProvider.otherwise('/main');
		
        $stateProvider
		    .state('main', {
                url: '/main',
				templateUrl: 'app/main.html',
				controller: 'MainCtrl',
				controllerAs: 'mainCtrl',
                data: {
                    requireLogin: false
                }
            })
			
            .state('signs', {
                url: '/signs',
                templateUrl: 'signs/signs.html',
                controller: 'SignsCtrl',
                controllerAs: 'signsCtrl',
                data: {
                    requireLogin: false
                }
            })

            .state('show-today', {
                url: '/show-today',
                params: {item:{}},
                templateUrl: 'show/show-today.html',
                controller: 'ShowTodayCtrl',
                controllerAs: 'showTodayCtrl',
                data: {
                    requireLogin: false
                },
				resolve: {
					today: getHoroscope
				}
            })

            .state('show-yesterday', {
                url: '/show-yesterday',
                params: {item:{}},
                templateUrl: 'show/show-yesterday.html',
                controller: 'ShowYesterdayCtrl',
                controllerAs: 'showYesterdayCtrl',
                data: {
                    requireLogin: false
                },
				resolve: {
					yesterday: 
					['$rootScope', '$http', '$stateParams',
					function ($rootScope, $http, $stateParams) {
						var webUrl = $rootScope.myConfig.webUrl;
						var d = new Date;
						var yesterdayDate = d.getMonth() + 1 + '/' + (d.getDate() - 1) + '/' + d.getFullYear();
						var param = "&sign=" + $stateParams.item.signName + "&date=" + yesterdayDate;
						var url = webUrl + param + '&callback=JSON_CALLBACK';
						return $http.jsonp(url)
							.then(function (result) {
								var details = result.data[0].details.scope;
								details = details.replace(/’/g, "'");
								return details;
							})
							.catch(function() {
							});
						}
					]
				}
            })

            .state('show-tomorrow', {
                url: '/show-tomorrow',
                params: {item:{}},
                templateUrl: 'show/show-tomorrow.html',
                controller: 'ShowTomorrowCtrl',
                controllerAs: 'showTomorrowCtrl',
                data: {
                    requireLogin: false
                },
				resolve: {
					tomorrow: 
					['$rootScope', '$http', '$stateParams',
					function getHoroscope($rootScope, $http, $stateParams) {
						var webUrl = $rootScope.myConfig.webUrl;
						var d = new Date;
						var tomorrowDate = d.getMonth() + 1 + '/' + (d.getDate() + 1) + '/' + d.getFullYear();
						var param = "&sign=" + $stateParams.item.signName + "&date=" + tomorrowDate;
						var url = webUrl + param + '&callback=JSON_CALLBACK';
						return $http.jsonp(url)
							.then(function (result) {
								var details = result.data[0].details.scope;
								details = details.replace(/’/g, "'");
								return details;
							})
							.catch(function() {
							});
						}
					]
				}
            })

            .state('main.users', {
                url: '/users',
                views: {
                    'display': {
                        templateUrl: 'users/users.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'usersCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('main.users-add', {
                url: '/users-add',
                params: {item:{}},
                views: {
                    'display': {
                        templateUrl: 'users/users-add.html',
                        controller: 'UsersAddCtrl',
                        controllerAs: 'usersAddCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
			
			.state('main.users-edit', {
                url: '/users-edit',
                params: {item:{}},
                views: {
                    'display': {
                        templateUrl: 'users/users-edit.html',
                        controller: 'UsersEditCtrl',
                        controllerAs: 'usersEditCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('main.users-dialog', {
                url: '/users-dialog',
                params: {item:{}},
                views: {
                    'display': {
                        templateUrl: 'users/users-dialog.html',
                        controller: 'UsersDialogCtrl',
                        controllerAs: 'usersDialogCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
    }
})();