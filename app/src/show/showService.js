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
			var d, today, yesterday, tomorrow, month, paramDate, 
				year, monthTomorrow, monthYesterday;
			d = new Date;
			year = d.getFullYear();
			month = d.getMonth() + 1;
			monthTomorrow = month;
			monthYesterday = month;
			today = d.getDate();
			
			if (today == '01') {
				monthYesterday = month - 1;
				yesterday = '30';
			} else {
				yesterday = today - 1;
			}
			
			if (today == 30) {
				tomorrow = '01';
				monthTomorrow = month + 1;
			} else {
				tomorrow = today + 1;
			}
			
			if (month == 13) {month = '12'};
			
			switch(param) {
				case 'today': paramDate = month + '/' + today + '/' + year;
							  break;
				case 'yesterday': paramDate = monthYesterday + '/' + yesterday + '/' + year;
							  break;
				case 'tomorrow': paramDate = monthTomorrow + '/' + tomorrow + '/' + year;
							  break;
				default: paramDate = month + '/' + day + '/' + year;
							  break;				
			}
			return paramDate;
		}
    }
})();


