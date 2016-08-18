(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    function currentUser($q, PERMISSIONS, $cookieStore) {
        var currentPermissions = PERMISSIONS.GUEST;
        var currentData = {};
        var factory = {
            // isLogin: isLogin,

            getPermissions: getPermissions,
            setPermissions: setPermissions,
            checkPermissions: checkPermissions,

            setData: setData,
            clearData: clearData,
            logout: logout
        }

        return factory;

        function logout() {
            clearData();
            $cookieStore.remove('token');
        }

        // Устанавливает данные текущему пользователю
        function setData(data) {
            currentData = data;
            currentPermissions = data.permissions ? data.permissions : 0;
            
            $cookieStore.put('token', '12345');
            $cookieStore.put('login', data.login);
            // $cookieStore.put('photo', '');

            // currentData.name = studentData.name;
            // currentData.surname = studentData.surname;
            // currentData.student_card = studentData.student_card;
            // currentData.photo = studentData.photo;

            // currentData.token = studentData.token;
        }

        function clearData() {
            currentData = {};
            setPermissions(PERMISSIONS.GUEST);
        }

        /*
           Проверка доступов
           @param neededPermissions (Array)  необходимые доступы
           @return (bool) Возможность доступа
        */
        function checkPermissions(neededPermissions) {
            if (neededPermissions.length) {
                if (neededPermissions.indexOf(getPermissions()) != -1) {
                    return true;
                }
            }
            if (!getPermissions()) {
                // TODO: Получать permissions с сервера по токену
                // Заглушка
                return $cookieStore.get('token');
            }
            return false;
        }

        // Возвращает зарезервированное число для доступов
        function getPermissions() {
            currentPermissions = currentPermissions || PERMISSIONS.GUEST;
            return currentPermissions;
        }

        // Устанавливает текущие доступы
        function setPermissions(permissions) {
            currentPermissions = permissions;
        }

        // TODO: использовать метод getGrantedAccess для разделения доступа
        function isLogin() {
            //return false; // mock
            var defered = $q.defer();
            defered.resolve(true);
            // if (true) {
            //   $rootScope.$broadcast(
            //     'AuthorizationError',
            //     new AuthorizationError('Current user is not authorized')
            //   );
            //   defered.reject();
            // }
            return defered.promise;
        }
    }
})();