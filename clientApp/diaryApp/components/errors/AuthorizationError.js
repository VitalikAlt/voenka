(function() {
    angular
        .module('app')
        .factory('AuthorizationError', AuthorizationError);

    function AuthorizationError() {
        return angular.extend(this, Error);
    }
})();