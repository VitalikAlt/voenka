angular.module('app',
    [
        'app.core',
        'app.auth',
        'app.students'
    ])
.run(function($http, $cookies, $rootScope, authHelper, $state) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

        // $rootScope.$on('$routeChangeStart',
        //  function(evt, next, current) {
        //     if (!authHelper.isLogin()) {
        //         if (next.templateUrl === "login.html") {
        //         } else {
        //             $state.go('auth');
        //         }
        //     }
        //  });
    }
);