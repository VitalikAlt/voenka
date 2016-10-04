(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    function currentUser($q, PERMISSIONS, $cookieStore) {
        var User = this;
        User.currentPermissions = PERMISSIONS.GUEST;
        User.currentData = {};
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
            User.currentData = data;
            setPermissions(data.permissions || 0);
            
            $cookieStore.put('token', data.token);
            $cookieStore.put('login', data.login);
        }

        function clearData() {
            User.currentData = {};
            setPermissions(PERMISSIONS.GUEST);
        }

        /*
           Проверка доступов
           @param neededPermissions (Array)  необходимые доступы
           @return (bool) Возможность доступа
        */
        function checkPermissions(neededPermissions) {
            if (!getPermissions()) {
                // TODO: Получать Permissions с сервера по токену
                // Заглушка
                switch ($cookieStore.get('token')) {
                    case 'student': {
                        setPermissions(PERMISSIONS.STUDENT);
                        break;
                    }
                    case 'teacher': {
                        setPermissions(PERMISSIONS.TEACHER);
                        break;
                    }
                    case 'admin': {
                        setPermissions(PERMISSIONS.ADMIN);
                        break;
                    }
                }
            }
            if (neededPermissions.length) {
                if (neededPermissions.indexOf(getPermissions()) != -1) {
                    return true;
                }
            }
            return false;
        }

        // Возвращает зарезервированное число для доступов
        function getPermissions() {
            User.currentPermissions = User.currentPermissions || PERMISSIONS.GUEST;
            return User.currentPermissions;
        }

        // Устанавливает текущие доступы
        function setPermissions(permissions) {
            User.currentPermissions = permissions;
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