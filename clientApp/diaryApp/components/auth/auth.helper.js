(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($location, $mdDialog) {
    var factory = {
      isLogin: isLogin, // проверка авторизации текущего пользователя
      login: login // авторизация пользователя
    };

    return factory;

    function isLogin() {
        return false; // mock
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
