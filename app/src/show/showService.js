(function () {
    'use strict';

    angular
        .module('app')
        .factory('ShowService', ShowService);

    ShowService.$inject = ['$rootScope', '$http', '$q'];

    function ShowService($rootScope, $http, $q) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            getHoroscope: getHoroscope,
			paramDate: paramDate
        };

        function getHoroscope(param) {
            var url = webUrl + param + '&callback=JSON_CALLBACK';
            return $http.jsonp(url)
                .then(function (result) {
                    return result;
                });
        }
		
		function paramDate(param) {
			var d = new Date;
			var paramDate;
		
			switch(param) {
				case 'today': paramDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
							  break;
				case 'yesterday': paramDate = d.getMonth() + 1 + '/' + (d.getDate() - 1) + '/' + d.getFullYear();
							  break;
				case 'tomorrow': paramDate = d.getMonth() + 1 + '/' + (d.getDate() + 1) + '/' + d.getFullYear();
							  break;
				default: paramDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
							  break;				
			}
			
			return paramDate;
		}
    }
})();


