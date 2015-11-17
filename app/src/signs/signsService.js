(function () {
    'use strict';

    angular
        .module('app')
        .factory('SignsService', SignsService);

    SignsService.$inject = ['$rootScope', '$http', '$q'];

    function SignsService($rootScope, $http, $q) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            getSigns: getSigns
        };

        function getSigns() {
            var url = webUrl + '&callback=JSON_CALLBACK';
            return $http.jsonp(url)
                .then(function (result) {
                    return result;
                });
        }
    }
})();

