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
			var today, tomorrow, month, paramDate, year;
			var d = new Date;
			
			month = d.getMonth() + 1;
			if (month == 13) {month = '12'};
			
			today = d.getDate();
			if (today == 30) {
				tomorrow = '01';
			} else {
				tomorrow = today + 1;
			}
			
			year = d.getFullYear();
			switch(param) {
				case 'today': paramDate = month + '/' + today + '/' + year;
							  break;
				case 'yesterday': paramDate = month + '/' + (today - 1) + '/' + year;
							  break;
				case 'tomorrow': paramDate = month + '/' + tomorrow + '/' + year;
							  break;
				default: paramDate = month + '/' + day + '/' + year;
							  break;				
			}
			return paramDate;
		}
    }
})();


