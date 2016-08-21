(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($state, $q, PERMISSIONS, currentUser) {
    var factory = {
      login: login, // авторизация пользователя
      noPermissionsRedirect: redirectToStartByPermission
    };

    return factory;


    function login(loginData) {
        // Получение permissions
        // ...
// test data
if (loginData.login == 'teacher') loginData.permissions = PERMISSIONS.TEACHER;
if (loginData.login == 'student') loginData.permissions = PERMISSIONS.STUDENT;

        // Заглушка установка токена. Будет подтягиваться с серва
          var token = '';
          switch (loginData.permissions) {
              case PERMISSIONS.STUDENT: {
                  loginData.token = 'student';
                  break;
              }
              case PERMISSIONS.TEACHER: {
                  loginData.token = 'teacher';
                  break;
              }
              case PERMISSIONS.ADMIN: {
                  loginData.token = 'admin';
                  break;
              }
          }
        // Полученные данные с серва
        var dataFromServer = loginData;

        var deferred = $q.defer();
        if (loginData.permissions != PERMISSIONS.GUEST) {
          currentUser.setData(dataFromServer);
          deferred.resolve(dataFromServer);
        }
        else {
          deferred.reject();
        }
        
        redirectToStartByPermission(loginData.permissions);
        // switch (loginData.permissions) {
        //   case PERMISSIONS.GUEST:   { $state.go('auth'); break; }
        //   case PERMISSIONS.STUDENT: { $state.go('students.profile'); break; }
        //   case PERMISSIONS.TEACHER: { $state.go('teachers.profile'); break; }
        //   case PERMISSIONS.ADMIN:   { $state.go('admin.profile'); break; }
        // }
        
        return deferred.promise;

        // Заглушка на авторизацию
        // if (loginData.login == '777777' && loginData.password == '123') {
        //     return { type: 'student' };
        // }
        // if (loginData.login == 'admin' && loginData.password == '123') {
        //     return { type: 'admin' };
        // }
        // return { type: 'error' };
    }

    function redirectToStartByPermission(permission) {
        switch (permission) {
          case PERMISSIONS.GUEST:   { $state.go('auth'); break; }
          case PERMISSIONS.STUDENT: { $state.go('students.profile'); break; }
          case PERMISSIONS.TEACHER: { $state.go('teachers.profile'); break; }
          case PERMISSIONS.ADMIN:   { $state.go('admin.profile'); break; }
        }
    }
  }
})();
