(function () {
    'use strict';

    angular
        .module('app')
        .factory('SignsService', SignsService);

    SignsService.$inject = ['$rootScope', '$http', '$q'];

    function SignsService($rootScope, $http, $q) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            getSigns: getSigns,
            getSignsLocal: getSignsLocal
        };

        function getSigns() {
            var url = webUrl + '&callback=JSON_CALLBACK';
            return $http.jsonp(url)
                .then(function (result) {
                    return result;
                });
        }

        function getSignsLocal() {
            return [
                {
                    signName : "Aries",
                    startDate: "/Date(922003200000-0000)/",
                    endDate: "/Date(924505200000-0000)/"
                },
                {
                    signName : "Taurus",
                    startDate: "/Date(924591600000-0000)/",
                    endDate: "/Date(927183600000-0000)/"
                },
                {
                    signName : "Gemini",
                    startDate: "/Date(927270000000-0000)/",
                    endDate: "/Date(929948400000-0000)/"
                },
                {
                    signName : "Cancer",
                    startDate: "/Date(930034800000-0000)/",
                    endDate: "/Date(932626800000-0000)/"
                },
                {
                    signName : "Leo",
                    startDate: "/Date(932713200000-0000)/",
                    endDate: "/Date(935305200000-0000)/"
                },
                {
                    signName : "Virgo",
                    startDate: "/Date(935391600000-0000)/",
                    endDate: "/Date(937983600000-0000)/"
                },
                {
                    signName : "Libra",
                    startDate: "/Date(938070000000-0000)/",
                    endDate: "/Date(940575600000-0000)/"
                },
                {
                    signName : "Scorpio",
                    startDate: "/Date(940662000000-0000)/",
                    endDate: "/Date(943171200000-0000)/"
                },
                {
                    signName : "Sagittarius",
                    startDate: "/Date(943257600000-0000)/",
                    endDate: "/Date(945763200000-0000)/"
                },
                {
                    signName : "Capricorn",
                    startDate: "/Date(945849600000-0000)/",
                    endDate: "/Date(948268800000-0000)/"
                },
                {
                    signName : "Aquarius",
                    startDate: "/Date(916819200000-0000)/",
                    endDate: "/Date(919324800000-0000)/"
                },
                {
                    signName : "Pisces",
                    startDate: "/Date(919411200000-0000)/",
                    endDate: "/Date(921916800000-0000)/"
                }
            ]
        }
    }
})();

