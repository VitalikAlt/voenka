(function() {
  'use strict';
  angular
    .module('app.auth')
    .config(function($stateProvider, PERMISSIONS) {
      $stateProvider
        .state('auth', {
          url: '/auth',
          controller: 'AuthController',
          controllerAs: 'auth',
          templateUrl: 'diaryApp/auth/auth.html',
          data: {
            permissions: [
              PERMISSIONS.GUEST
            ]
          }
        });
    });
})();