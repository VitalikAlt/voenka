(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('registerHelper', registerHelper);

  function registerHelper(authHelper, currentUser) {
    var factory = {
      register: register
    };

    return factory;

    function register(user) {
        // currentUser.setData(user);
        // ... отправка на сервер и проверка
        return authHelper.login(user);
    }
  }
})();
