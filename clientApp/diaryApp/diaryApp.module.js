angular.module('app',
    [
        'app.test',
        'app.core',
        'app.directives',
        'app.auth',
        'app.students',
        'app.teachers',
        'app.table',
        'app.utils',
        'app.admin'
    ])
.run(function($http, $cookies, $rootScope, currentUser, $state, $log, authHelper) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

        // Handle exceptions
        $rootScope.$on('$stateChangeError', function() {
            var error = arguments[5];
            // Перекидывание на страницу авторизации
            // if (error instanceof AuthorizationError) {
            //     $state.go('auth');
            // }
            throw error;
        });

        // Упрощенная проверка и прееброс на страницу авторизации
        $rootScope.$on('$stateChangeStart',
         function(evt, next, current) {
             if (next.data && !currentUser.checkPermissions(next.data.permissions)) {
                //  $state.go('auth');
                 authHelper.noPermissionsRedirect(currentUser.getPermissions());
                 evt.preventDefault();
             }
            //  if (next.name == 'auth') return;
            //  currentUser.isLogin()
            //     .catch(function() {
            //         $state.go('auth');
            //         evt.preventDefault();
            //     });
         });

        // $rootScope.$on('AuthorizationError', function (ev, error){
        //     $log.error(error.message);
        //     $state.go('auth');
        // });
    }
);