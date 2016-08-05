(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($location, $mdDialog, $rootScope, $q) {
    var factory = {
      isLogin: isLogin, // проверка авторизации текущего пользователя
      login: login, // авторизация пользователя
      getGrantedAccess: getGrantedAccess
    };

    return factory;

    function getGrantedAccess() {
      // Return permissions number. 
      // 7 (111) - full permissions (admin)
      // 6 (110) - teacher
      // 4 (100) - student
      // 0 (000) - not authorized
    }

    function isLogin() {
        //return false; // mock
        var defered = $q.defer();
        // defered.resolve(true);
        if (true) {
          $rootScope.$broadcast(
            'AuthorizationError',
            new AuthorizationError('Current user is not authorized')
          );
          defered.reject();
        }
        return defered.promise;
    }

    function login(username, password) {
        // Заглушка на авторизацию
        if (username == 'student' && password == '123') {
            return { type: 'student' };
        }
        if (username == 'admin' && password == '123') {
            return { type: 'admin' };
        }
        return { type: 'error' };
    }
  }
})();
