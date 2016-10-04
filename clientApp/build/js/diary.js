(function() {
  'use strict';
  angular.module('app.auth', []);
})();
(function() {
    'use strict';
    angular
        .module('app.table', []);
})();
(function() {
    'use strict';
    angular
        .module('app.test', []);
})();
(function() {
    'use strict';
    angular.module('app.utils', []);
})();


(function() {
  'use strict';
  angular
    .module('app.core', [
      'ui.router',
      'ngResource',
      'ngMessages',
      'ngMaterial',
      'ngCookies'
    ])
})();



angular.module('app',
    [
        'app.core',
        'app.directives',
        'app.auth',
        'app.students',
        'app.teachers',
        'app.table',
        'app.utils',
        'app.test',
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
(function() {
    angular.module('app.directives', []);
})();
(function(){
    'use strict';
    angular.module('app.students', []);
})();

(function(){
    'use strict';
    angular.module('app.admin',[]);
})();

(function() {
    'use strict';
    angular
        .module('app.teachers', []);
})();

(function() {
    angular
        .module('app.admin')
        .controller('AdminProfileController', function($scope, $mdDialog, $http, $cookieStore, currentUser, PERMISSIONS) {
            var vm = this;
            vm.mdDialog = $mdDialog;
            vm.dialogDone = dialogDone;
            vm.dialogCancel = dialogCancel;
            var controller = this;
            $scope.logout = logout;
            $scope.removeTc = function() {};
            $scope.data = [];
            $scope.data_tc = [];
            var selectedSt = [];
            var selectedTc = [];
            var data_c = [];
            var data_tc_c = [];

            $scope.reloadNum = function() {
                for (var i = 0; i < this.data.length; i++) {
                    this.data[i].num = i + 1;
                }
                for (i = 0; i < this.data_tc.length; i++) {
                    this.data_tc[i].num = i + 1;
                }
            };

            function logout() {
                clearData();
                $cookieStore.remove('token');
                $cookieStore.remove('ID');
            }

            function clearData() {
                currentUser.clearData();
                console.log(currentUser.setPermissions(PERMISSIONS.GUEST));
            }

            $http.get('/get/studentList', {params: {auth_key: currentUser.getID()}})
                .then(function(res) {
                    $scope.data = res.data;
                    data_c = res.data;
                    $scope.reloadNum();
                });

            $http.get('/get/teacherList', {params: {auth_key: currentUser.getID()}})
                .then(function(res) {
                    $scope.data_tc = res.data;
                    data_tc_c = res.data;
                    $scope.reloadNum();
                });

            $scope.selectStudent = function (st) {
                console.log(currentUser.getID());
                if (selectedSt.indexOf(st) !== -1) {
                    selectedSt.splice(selectedSt.indexOf(st), 1);
                } else {
                    selectedSt.push(st);
                }
            };

            $scope.selectTeacher = function (st) {
                if (selectedTc.indexOf(st) !== -1) {
                    selectedTc.splice(selectedTc.indexOf(st), 1);
                } else {
                    selectedTc.push(st);
                }
                console.log(selectedTc);
            };

            $scope.deleteStudents = function () {
                var self = this;
                if (!selectedSt) {
                    return;
                }

                for (var i = self.data.length - 1; i >= 0; i--) {
                    (function(i) {
                        if (selectedSt.indexOf(self.data[i].id) !== -1) {
                            selectedSt.splice(selectedSt.indexOf(self.data[i].id), 1);
                            $scope.removeStudent(i);
                        }
                    })(i);
                }
            };

            $scope.deleteTeachers = function () {
                var self = this;
                if (!selectedTc) {
                    return;
                }

                for (var i = self.data_tc.length - 1; i >= 0; i--) {
                    (function(i) {
                        if (selectedTc.indexOf(self.data_tc[i].id) !== -1) {
                            selectedTc.splice(selectedTc.indexOf(self.data_tc[i].id), 1);
                            $scope.removeTeacher(i);
                        }
                    })(i);
                }
            };

            $scope.removeStudent = function (element) {
                var self = this;
                $http.get('/delete/student', {params: {auth_key: currentUser.getID(), id: $scope.data[element].id}})
                    .then(function(res) {
                        if (selectedSt.indexOf(self.data[element].id) !== -1) {
                            selectedSt.splice(selectedSt.indexOf(self.data[element].id), 1);
                        }
                        element = self.data[element];
                        self.data.splice(self.data.indexOf(element),1);
                        if (self.data.length != data_c.length) data_c.splice(data_c.indexOf(element),1);
                        self.reloadNum();
                    });
            };

            $scope.removeTeacher = function (element) {
                var self = this;
                $http.get('/delete/teacher', {params: {auth_key: currentUser.getID(), id: $scope.data_tc[element].id}})
                    .then(function(res) {
                        if (selectedTc.indexOf(self.data_tc[element].id) !== -1) {
                            selectedTc.splice(selectedTc.indexOf(self.data_tc[element].id), 1);
                        }
                        element = self.data_tc[element];
                        self.data_tc.splice(self.data_tc.indexOf(element),1);
                        if (self.data_tc.length != data_tc_c.length) data_tc_c.splice(data_tc_c.indexOf(element),1);
                        self.reloadNum();
                    });
            };

            $scope.sort = function(mode, field, value) {
                if (mode === 'st') {
                    if (field === 'name') {
                        this.data = data_c.filter(function (item) {
                            return item[field].indexOf(value) !== -1;
                        });
                        this.reloadNum();
                    } else {
                        if (!value) return this.data = data_c;
                        this.data = data_c.filter(function (item) {
                            return item[field] == value;
                        });
                        this.reloadNum();
                    }
                } else {
                    this.data_tc = data_tc_c.filter(function (item) {
                        return item[field].indexOf(value) !== -1;
                    });
                    this.reloadNum();
                }
            };

            $scope.addStudent = function startAddStudentDialog(ev) {
                var self = this;
                controller.mdDialog.show({
                    controller: 'AdminProfileController',
                    controllerAs: 'auth',
                    templateUrl: 'diaryApp/auth/views/addStudentDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                }).then(function (objFromDialog) {
                    objFromDialog.auth_key = currentUser.getID();
                    $http.get('/add/student', {params: objFromDialog})
                        .success(function (res) {
                            console.log(res);
                            self.data.push({id: res.student_id, num: self.data.length + 1, name: 'Undefined', squad: objFromDialog.squad, course: objFromDialog.course});
                            if (self.data.length != data_c.length) data_c.push({id: res.student_id, num: self.data.length + 1, name: 'Undefined', squad: objFromDialog.squad, course: objFromDialog.course});
                        });
                }, function (err) {
                    console.log(err);
                })
            };

            $scope.addTeacher = function startAddStudentDialog(ev) {
                var self = this;
                controller.mdDialog.show({
                    controller: 'AuthController',
                    controllerAs: 'auth',
                    templateUrl: 'diaryApp/auth/views/addTeacherDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                }).then(function(newTeacher) {
                    newTeacher.auth_key = currentUser.getID();
                    $http.get('/add/teacher', {params: newTeacher})
                        .success(function (res) {
                            console.log(res);
                            self.data_tc.push({id: res.teacher_id, num: self.data_tc.length + 1, name: 'Undefined'});
                            if (self.data_tc.length != data_tc_c.length) data_tc_c.push({id: res.teacher_id, num: self.data_tc.length + 1, name: 'Undefined'});
                        });
                    }, function(err) {
                        console.log(err);
                    });
            };

            function dialogDone(objFromDialog) {
                this.mdDialog.hide(objFromDialog);
            }

            function dialogCancel() {
                this.mdDialog.cancel();
            }

            function startChangePassDialog(ev) {
                $mdDialog.show({
                    controller: 'AdminProfileController',
                    controllerAs: 'auth',
                    templateUrl: 'diaryApp/admin/profile/views/changePasswordDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                })
                    /*.then(function(pass) {
                        if (pass.new === pass.new_confirm) {
                            $http.get('/permissions/change_pass', {params: {_id: currentUser.getID(), password: pass.old, new_password: pass.new}})
                                .success(function(res) {
                                    console.log(res);
                                });
                        } else {
                            console.log('Not change');
                        }
                    }, function() {
                        // закрыто диалоговое окно
                    });*/
            }
        });
})();


(function(){
    angular
        .module('app.auth')
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        })
        .controller('AuthController',
            function (authHelper, $log, $state, $mdDialog, currentUser, registerHelper, PERMISSIONS, $http) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = startAddStudentDialog;
                vm.registerTeacher = startAddTeacherDialog;

                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                function authorize(formData) {
                    authHelper.login(formData);
                }

                // Запуск диалогового окна добавления студента
                function startAddStudentDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addStudentDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false
                    });
                }

                // Запуск диалогового окна добавления преподавателя
                function startAddTeacherDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addTeacherDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(newTeacher) {
                        console.log(newTeacher);
                        newTeacher.token = 'teacher';
                        registerHelper.register(newTeacher);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Обработка подтверждения действия и закрытия диалогового окна
                // objFromDialog (Object) - объект изменений
                function dialogDone(objFromDialog) {
                    // $http.get('/add/student', {params: objFromDialog})
                    //     .success(function (res) {
                    //         console.log(res);
                    //     });
                    this.mdDialog.hide(objFromDialog);
                    //this.mdDialog.cancel();
                }

                // Нажатие отмены (закрыть)
                function dialogCancel() {
                    this.mdDialog.cancel();
                }
            }
        ); 
})();
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
(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($http, $state, $q, PERMISSIONS, currentUser, $window) {
    var factory = {
      login: login, // авторизация пользователя
      noPermissionsRedirect: redirectToStartByPermission
    };

    return factory;


    function login(loginData) {
        // Получение данных permission
        // ...
        var s = $http.get('/get/permission', {params: {login: loginData.login, password: loginData.password}})
            .success(function (data) {
                currentUser.setID(data.ID);
                console.log(data.ID);
                console.log(currentUser.getID());
                switch (data.permission) {
                    case 'student':
                    {
                        loginData.permissions = PERMISSIONS.STUDENT;
                        break;
                    }
                    case 'teacher':
                    {
                        loginData.permissions = PERMISSIONS.TEACHER;
                        break;
                    }
                    case 'admin':
                    {
                        //$window.location.href = '/admin/list';
                        loginData.permissions = PERMISSIONS.ADMIN;
                        break;
                    }
                        //permission заданы
                }

            var token = '';
            switch (loginData.permissions) {
                case PERMISSIONS.STUDENT:
                {
                    loginData.token = 'student';
                    break;
                }
                case PERMISSIONS.TEACHER:
                {
                    loginData.token = 'teacher';
                    break;
                }
                case PERMISSIONS.ADMIN:
                {
                    loginData.token = 'admin';
                    break;
                }
            }
            // Полученные данные с серва
            var dataFromServer = loginData;
            // тут он видимо хочет данные о студенте\преподе с серва


            var deferred = $q.defer();
            if (loginData.permissions != PERMISSIONS.GUEST) {
                console.log(currentUser);
                currentUser.setData(dataFromServer);
                deferred.resolve(dataFromServer);
            }
            else {
                deferred.reject();
            }

            redirectToStartByPermission(loginData.permissions);
            // switch (loginData.Permissions) {
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
    });
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

(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    function currentUser($q, PERMISSIONS, $cookieStore) {
        var User = this;
        User.currentPermissions = PERMISSIONS.GUEST;
        User.currentData = {};
        User.ID = '';
        var factory = {
            // isLogin: isLogin,
            
            getID: getID,
            setID: setID,
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
            $cookieStore.remove('ID');
        }

        // Устанавливает данные текущему пользователю
        function setData(data) {
            User.currentData = data;
            setPermissions(data.permissions || 0);
            
            $cookieStore.put('token', data.token);
            $cookieStore.put('ID', data.login);
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
                User.ID = $cookieStore.get('ID');
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
    
        function setID(ID) {
            User.ID = ID;
        }
        
        function getID() {
            return User.ID;
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
(function(){
    angular
        .module('app.auth')
        .constant('PERMISSIONS', {
              GUEST: 0,
            STUDENT: 1,
            TEACHER: 2,
              ADMIN: 3,
        })
        // .constant('GUEST', 0)
        // .constant('STUDENT', 1)
        // .constant('TEACHER', 2)
        // .constant('ADMIN', 3)
})();
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
        // ... отправка на сервер и проверка
        return authHelper.login(user);
    }
  }
})();

function AuthorizationError(message) {
    this.name = 'AuthorizationError';
    this.message = message;
}
(function() {
    'use strict';
    angular
        .module('app.table')
        .factory('tableHelper', function() {
            var Helper = function (queryOptions) {
                // Список заголовков (название, отображение, ...)
                this.titles = [];
                // Список всех строк таблицы
                this.list = [];
                // Список отображаемых (прошедших фильтр) строк (массив строк)
                this.displayed = [];
                // Фильтр для отсечения лишних строк/заголовков
                this.filter = {
                    textQuery: '',
                    options: {}
                };
            }

            // Добавление заголовков
            Helper.prototype.addTitle = function(name, options) {
                this.titles.push({ name: name, options: options });
            }

            // Добавление строки
            Helper.prototype.addItemRow = function(row) {
                this.list.push(row);
                var displayedRow = [];
                for (var i = 0; i < this.titles.length; i++) {
                    var currentValue = {};
                    currentValue.value = row[this.titles[i].options.label];
                    currentValue.options = this.titles[i].options;
                    currentValue.options.titleName = this.titles[i].name;
                    displayedRow.push(currentValue || '');
                }
                this.displayed.push(displayedRow);
            }

            // Получение заголоков
            Helper.prototype.getTitles = function() {
                return this.titles.map(function(title) {
                    return title.name;
                });
            }

            // Получение строк
            Helper.prototype.getRows = function() {
                return this.displayed;
            }

            // Очистить список строк
            Helper.prototype.clearList = function() {
                this.list = [];
                this.displayed = [];
            }

            // Очистить список заголовков
            Helper.prototype.clearHeaders = function() {
                this.titles = [];
            }

            return {
                getInstance: function(queryOptions) {
                    return new Helper(queryOptions);
                }
            }
        });
})();
(function() {
    angular
        .module('app.utils')
        .factory('Utils', function() {
           var factory = {
               getPhotoFromFile: getPhotoFromFile
           };
           return factory;
        });
})();

function getPhotoFromFile(file) {
    if (file) {
        // scope.downloadFile = newFiles[0];
        var reader = new FileReader();
        var promise = new Promise(function(resolve, reject) {
            reader.onload = function(event) {
                resolve(event.target.result);
            }
        });
        reader.readAsDataURL(file);
        return promise;
    }  
}
(function() {
    'use strict';
    angular
        .module('app.utils')
        .factory('PopupService', function($rootScope, $compile) {
            return {
                showPopup: showPopup
            }

            function showPopup(image){
                var element = '<popup-image image-src="' + image + '"></popup-image>';
                angular.element(document.body).append($compile(element)($rootScope));
            }
        });
})();
(function(){
    'use strict';
    angular
        .module('app.core')
        .constant('CONFIG', {
            defaultAvatar: '/assets/images/default_avatar.jpg',
            docPlaceholderImage: '/assets/images/page_white_get.png'
        });
})();
(function(){
    angular
        .module('app')
        .config(['$resourceProvider', function($resourceProvider){
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})();

(function(){
    angular
        .module('app')
        .controller("appController",
            function ($state, authHelper) {
                var vm = this;
                // $state.go('auth');
                // if (!authHelper.isLogin()) {
                //     $state.go('auth');
                // }
            }
        ); 
})();
(function() {
    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, PERMISSIONS) {
            'use strict';
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            
            $stateProvider
                .state('app', {
                    url: '/',
                    //templateUrl: 'diaryApp/mainPage/view.html',
                    template: '<div>main</div>',
                    controller: 'appController',
                    controllerAs: 'main',
                    data: {
                        permissions: [
                            PERMISSIONS.ADMIN
                        ]
                    }
                })
                .state('page404', {
                    url: '/404_page_not_found',
                    templateUrl: 'diaryApp/page404/page404.html'
                })
                .state('admin', {
                    url: '/admin',
                    controller: 'AdminProfileController',
                    templateUrl: 'diaryApp/admin/admin.html',
                    data: {
                        permissions: [
                            PERMISSIONS.ADMIN
                        ]
                    }
                })
                .state('admin.profile', {
                    url: '/list/',
                    controller: 'AdminProfileController',
                    controllerAs: 'admin',
                    templateUrl: 'diaryApp/admin/profile/profile.html'
                })
                .state('admin.discipline', {
                    url: '/discipline/',
                    controller: 'AdminDisciplineController',
                    controllerAs: 'admin',
                    templateUrl: 'diaryApp/admin/discipline/discipline.html'
                })
                .state('admin.group', {
                    url: '/group/',
                    controller: 'AdminGroupController',
                    controllerAs: 'admin',
                    templateUrl: 'diaryApp/admin/group/group.html'
                })


            $urlRouterProvider.otherwise('/404_page_not_found');
        });
})();


 // Директива для подсветки пунктов меню
 angular.module('app.directives').directive('badgeMenu', function ($state) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$stateChangeSuccess', function(){
                badgeCurrentMenuRow(element, attrs.uiSref, $state.current.name);
            });
        }
    }
});

// Проверяет, совпадают ли id пункта меню и параметр текущей страницы
function badgeCurrentMenuRow(element, elemId, currentState) {
    if (currentState.indexOf(elemId) !== -1) {
        element.addClass('active-row');
        element.removeClass('unactive-row');
    }
    else {
        element.removeClass('active-row');
        element.addClass('unactive-row');
    }
}
(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('CalendarController', function($scope) {
            var vm = this;
            vm.currentPageMonth = [];
            vm.currentDate = new Date();
            vm.currentMonth = vm.currentDate.getMonth();
            vm.currentYear = vm.currentDate.getFullYear();
            vm.changePeriod = changePeriod;
            vm.compareDates = compareDates;

            vm.weekDays = [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ];
            vm.months = [
                'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
            ];
            vm.years = getYears();

            init();

            function init() {
                var today = new Date();
                vm.currentPageMonth = generateDaysPage(today.getMonth(), today.getFullYear());
            }

            function compareDates(date1, date2) {
                if (date1 && date2) {
                    return date1.getFullYear() == date2.getFullYear() &&
                           date1.getMonth() == date2.getMonth() &&
                           date1.getDate() == date2.getDate();
                }
               return false;
            }

            function changePeriod() {
                vm.currentPageMonth = generateDaysPage(vm.currentMonth, vm.currentYear);
            }

            function getYears() {
                var currentYear = new Date().getFullYear();
                return [ currentYear - 1, currentYear, currentYear + 1];
            }

             // Получить последний день месяца
            function getLastDayInMonth(month, year) {
                return (new Date(year, month + 1, 0));
            }

            // Сгенерировать страницу календаря
            function generateDaysPage(month, year) {
                var startMonthDay = new Date(year, month, 1).getDay();
                // var endMonthDay = getLastDayInMonth(month, year).getDay();
                var endMonthDay = getLastDayInMonth(month, year).getDate();

                var monthDays = [];
                var weekDays = [];

                for (var i = 0; i < startMonthDay + endMonthDay; i++) {
                    // Дата с учетом сдвига
                    var offsetDate = i - startMonthDay + 1;
                    if (i < startMonthDay || offsetDate > endMonthDay) {
                        weekDays.push({});
                    }
                    else {
                        weekDays.push({
                            date: new Date(year, month, offsetDate), // текушая дата
                            data: $scope.getDataByDate(new Date(year, month, offsetDate)) // информация текущего дня
                        });
                    }
                    // Добавление недели
                    if (weekDays.length == 7) {
                        monthDays.push(weekDays);
                        weekDays = [];
                    }
                }
                for (var i = weekDays.length; i < 7; i++) {
                    weekDays.push({});
                }
                monthDays.push(weekDays);
                return monthDays;
            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('calendar', function($window) {
            return {
                restrict: 'E',
                replace: true,
                link: link,
                scope: {
                    getDataByDate: '=',
                    onDayClick: '='
                },
                templateUrl: 'diaryApp/directives/calendar/calendar.html',
                controller: 'CalendarController',
                controllerAs: 'calendar'
            }

            function link(scope, elem, attrs, controller) {
                angular.element($window).bind('scroll', function() {
                    if (window.pageYOffset >= 10) {
                        console.log('fire');
                        // angular.element();
                    }
                })
            }
           
        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('fileDownload', function($timeout, Utils) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    downloadFile: '=',
                    preview: '=',
                    onFileLoad: '='
                },
                templateUrl: 'diaryApp/directives/fileDownload/fileDownload.html',
                compile: compile
            }

            function compile(templateElement, templateAttrs) {
                return {
                    pre: pre,
                    post: post
                }
            }

            function pre(scope, element, attrs) {
                var button = element.find('button');
                button.attr('class', button.attr('class') + ' ' + attrs.buttonClass);
                // button.text(attrs.labelButton);
            }

            function post(scope, element, attrs) {
                var elem = element;
                var id = attrs.id;
                element.find('button').text(attrs.labelButton);
                var fileChooseElem = element.find('input');
                elem.bind('click', function(e) {
                    this.children['download_input'].click();                            
                });
                
                fileChooseElem.bind('change', function(e) {
                    var newFiles = e.target.files;
                    if (newFiles) {
                        scope.downloadFile = newFiles[0];
                        Utils.getPhotoFromFile(scope.downloadFile)
                            .then(function(image) {
                                scope.$apply(function(){
                                    scope.preview = image;
                                    // Вызов колбэка. Передача в аргументах: {0} - файл, {1} - картинка
                                    if (typeof(scope.onFileLoad) == 'function') scope.onFileLoad(scope.downloadFile, scope.preview);
                                });
                            });
                    }     
                });


            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('PopupImageController', function($scope, $timeout, $mdDialog) {
            var vm = this;
            vm.closePopup = closePopup;
            vm.show = show;
            vm.isShow = false;

            // init();

            function closePopup() {
                document.querySelector('#popup_image').remove();
            }

            function show() {
                vm.isShow = true;
            }

            // function init() {
            //     // Задержка для загрузки стилей
            //     $timeout(function(){
            //         isShow = true;
            //     }, 100)
            // }

        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('popupImage', function() {
             return {
                restrict: 'E',
                link: link,
                replace: true,
                controller: 'PopupImageController',
                controllerAs: 'popup',
                templateUrl: 'diaryApp/directives/popupImage/popupImage.html',
                scope: {
                    imageSrc: '@'
                }
            };
        });

        function link(scope, elem, attrs, controller) {
            elem.bind('click', function(e) {
                //controller.openPopupImage(e, attrs.ngSrc, attrs.alt);
                controller.closePopup();
            });
        }
})();

(function() {
    'use strict';
    angular
        .module('app.admin')
        .controller('AdminController', function () {

        });
});

(function() {
    'use strict';
    angular
        .module('app.admin')
        .controller('AdminDisciplineController', function () {

        });
})

(function() {
    'use strict';
    angular
        .module('app.admin')
        .controller('AdminGroupController', function () {

        });
});

(function() {
    'use strict';
    angular
        .module('app.admin')
        .controller('AdminMarksController', function($scope, tableHelper, $http, currentUser) {
            var vm = this;
            vm.marksHelper = tableHelper.getInstance();
            vm.standartsHelper = tableHelper.getInstance();

            init();

            function init() {
                getTableTitles(vm.marksHelper, config.marks);
                getTableList(vm.marksHelper, config.marks);

                getTableTitles(vm.standartsHelper, config.standarts);
                getTableList(vm.standartsHelper, config.standarts);
            }

            $http.get('/get/progress', {params: {student_id: currentUser.getID()}})
                .success(function (data) {
                    vm.summary = getSummary();
                    function getSummary() {
                        var summary = {
                            average: data.average_point, // Средний балл
                            missed: data.skippings, // Количество пропусков
                            placed: data.visitings // Кол-во присутствий на парах
                        };
                        summary.percentMissed = (summary.missed / (Number(summary.missed) + Number(summary.placed)) * 100).toFixed(1);
                        return summary;
                    }
                });

            // Получение заголовков таблицы
            function getTableTitles(helper, resource) {
                // получение заголовков
                var titles = resource.titles; // заглушка
                for (var i = 0; i < titles.length; i++) {
                    helper.addTitle(titles[i].name, titles[i].options);
                }
            }
            function getTableList(helper, resource) {
                var rows = [];
                if (resource === config.marks) {
                    $http.get('/get/marks', {params: {student_id: currentUser.getID()}})
                        .success(function (results) {
                            results.rows.forEach(function (result) {
                                helper.addItemRow(result);
                            });
                            vm.summary.average = results.average.toFixed(2);
                        });
                } else {
                    $http.get('/get/standarts', {params: {student_id: currentUser.getID()}})
                        .success(function (results) {
                            results.forEach(function (result) {
                                helper.addItemRow(result);
                            })
                        });
                }
            }
        });

    // Тестовый конфиг. имитация данных
    var config = {
        marks: {
            titles: [
                { name: 'Название', options: { label: 'nameSubject', show: true } },
                { name: '1 семестр', options: { label: 'semestr1', show: true } },
                { name: '2 семестр', options: { label: 'semestr2', show: true } },
                { name: '3 семестр', options: { label: 'semestr3', show: true } },
                { name: '4 семестр', options: { label: 'semestr4', show: true } },
                { name: '5 семестр', options: { label: 'semestr5', show: true } },
                { name: '6 семестр', options: { label: 'semestr6', show: true } },
                { name: '7 семестр', options: { label: 'semestr7', show: true } },
                { name: '8 семестр', options: { label: 'semestr8', show: true } }
            ]
        },
        standarts: {
            titles: [
                { name: 'Название', options: { label: 'nameStandart', show: true } },
                { name: '1 семестр', options: { label: 'semestr1', show: true } },
                { name: '2 семестр', options: { label: 'semestr2', show: true } },
                { name: '3 семестр', options: { label: 'semestr3', show: true } },
                { name: '4 семестр', options: { label: 'semestr4', show: true } },
                { name: '5 семестр', options: { label: 'semestr5', show: true } },
                { name: '6 семестр', options: { label: 'semestr6', show: true } },
                { name: '7 семестр', options: { label: 'semestr7', show: true } },
                { name: '8 семестр', options: { label: 'semestr8', show: true } }
            ]
        },
    }

})();
(function() {
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsMarksController', function($scope, tableHelper, $http, currentUser) {
            var vm = this;
            vm.marksHelper = tableHelper.getInstance();
            vm.standartsHelper = tableHelper.getInstance();

            init();

            function init() {
                getTableTitles(vm.marksHelper, config.marks);
                getTableList(vm.marksHelper, config.marks);

                getTableTitles(vm.standartsHelper, config.standarts);
                getTableList(vm.standartsHelper, config.standarts);
            }

            vm.summary = getSummary();
            function getSummary() {
                var summary = {
                    average: 0, // Средний балл
                    missed: 0, // Количество пропусков
                    placed: 0 // Кол-во присутствий на парах
                };
                summary.percentMissed = (summary.missed / (Number(summary.missed) + Number(summary.placed)) * 100).toFixed(1);
                return summary;
            }
            $http.get('/api/Progress', {params: {student_id: currentUser.getID()}})
                .success(function (data) {

                });

            // Получение заголовков таблицы
            function getTableTitles(helper, resource) {
                // получение заголовков
                var titles = resource.titles; // заглушка
                for (var i = 0; i < titles.length; i++) {
                    helper.addTitle(titles[i].name, titles[i].options);
                }
            }
            function getTableList(helper, resource) {
                    var rows = [];
                    if (resource === config.marks) {
                        $http.get('/get/marks', {params: {student_id: currentUser.getID()}})
                            .success(function (results) {
                                results.rows.forEach(function (result) {
                                    helper.addItemRow(result);
                                });
                                vm.summary.average = results.average.toFixed(2);
                            });
                    } else {
                        $http.get('/get/standarts', {params: {student_id: currentUser.getID()}})
                            .success(function (results) {
                                results.forEach(function (result) {
                                    helper.addItemRow(result);
                                })
                            });
                    }
            }
        });

         // Тестовый конфиг. имитация данных
        var config = {
            marks: {
                titles: [
                    { name: 'Название', options: { label: 'nameSubject', show: true } },
                    { name: '1 семестр', options: { label: 'semestr1', show: true } },
                    { name: '2 семестр', options: { label: 'semestr2', show: true } },
                    { name: '3 семестр', options: { label: 'semestr3', show: true } },
                    { name: '4 семестр', options: { label: 'semestr4', show: true } },
                    { name: '5 семестр', options: { label: 'semestr5', show: true } },
                    { name: '6 семестр', options: { label: 'semestr6', show: true } },
                    { name: '7 семестр', options: { label: 'semestr7', show: true } },
                    { name: '8 семестр', options: { label: 'semestr8', show: true } }
                ]
            },
            standarts: {
                titles: [
                    { name: 'Название', options: { label: 'nameStandart', show: true } },
                    { name: '1 семестр', options: { label: 'semestr1', show: true } },
                    { name: '2 семестр', options: { label: 'semestr2', show: true } },
                    { name: '3 семестр', options: { label: 'semestr3', show: true } },
                    { name: '4 семестр', options: { label: 'semestr4', show: true } },
                    { name: '5 семестр', options: { label: 'semestr5', show: true } },
                    { name: '6 семестр', options: { label: 'semestr6', show: true } },
                    { name: '7 семестр', options: { label: 'semestr7', show: true } },
                    { name: '8 семестр', options: { label: 'semestr8', show: true } }
                ]
            },
        }

})();
(function(){
    angular
        .module('app.students')
        .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = function(date) {
                var s = new Date(date);
                var day = '';
                if (s.getDate() < 10) {
                    day = '0' + s.getDate();
                } else {
                    day = s.getDate();
                }
                var month = '';
                if (s.getMonth() < 9) {
                    month = '0' + (s.getMonth() + 1);
                } else {
                    month = s.getMonth() + 1;
                }
                return date ? day + '.' + month + '.' + String(s.getFullYear()) : '';
            };

            $mdDateLocaleProvider.parseDate = function(dateString) {
                var month = Number(dateString.substr(3).substr(0,2)) - 1;
                return new Date(dateString.substr(6).substr(0,4), month, dateString.substr(0,4));
            };
        })
        .controller('StudentsProfileController',
            function ($scope, CONFIG, $mdDialog, Utils, PopupService, currentUser, $http) {
                var vm = this;
                vm.Utils = Utils;
                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                $http.get('/get/student_profile', {params: {Id: currentUser.getID()}})
                    .success(function (data) {
                        vm.student = getStudentData();

                        $http.get('/get/groups', {params: {Id: data.group_id}})
                            .success(function (group) {
                                vm.student.squad = group.squad;
                                vm.student.course = group.course;
                            })

                        function getStudentData() {
                            return {
                                name: data.name,
                                surname: data.surname,
                                fatherName: data.fatherName,
                                student_card_number: data.student_card_number,

                                student_propis_number: data.student_propis_number,
                                student_military_number: data.student_military_number,
                                contract_data: data.contract_data,
                                parents_data: data.parents_data,
                                public_work: data.public_work,
                                family_status: data.family_status,

                                birthPlace: data.birthPlace,
                                education: data.education,
                                military: data.military,
                                address: data.address,
                                parents_address: data.parents_address,
                                parents_address_1: data.parents_address_1,
                                faculty: data.faculty,
                                conclusion: data.conclusion,
                                start_study_year: data.start_study_year,
                            };
                        }
                        if (!vm.student.photo) {
                            vm.student.preview_img = CONFIG.defaultAvatar;
                        }
                        vm.student.docs = [];
                        vm.student.birthDate = new Date(data.birthDate);
                    });

                vm.saveData = saveData;
                vm.clear = clear;
                function saveData() {
                    if ((vm.student.squad < 7 && vm.student.squad>=0) || (vm.student.course < 7 && vm.student.course>=0))
                    $http.get('/add/group', {params: {squad: vm.student.squad, course:vm.student.course}})
                        .success(function (group) {
                            console.log(group);
                            $http.get('/update/student_profile', {params: {
                                student_id: currentUser.getID(),

                                group_id: group._id,

                                name: vm.student.name,
                                surname: vm.student.surname,
                                fatherName: vm.student.fatherName,
                                student_card_number: vm.student.student_card_number,

                                student_propis_number: vm.student.student_propis_number,
                                student_military_number: vm.student.student_military_number,
                                contract_data: vm.student.contract_data,
                                parents_data: vm.student.parents_data,
                                public_work: vm.student.public_work,
                                family_status: vm.student.family_status,

                                birthPlace: vm.student.birthPlace,
                                education: vm.student.education,
                                military: vm.student.military,
                                address: vm.student.address,
                                parents_address: vm.student.parents_address,
                                parents_address_1: vm.student.parents_address_1,
                                faculty: vm.student.faculty,
                                conclusion: vm.student.conclusion,
                                start_study_year: vm.student.start_study_year,
                                birthDate: vm.student.birthDate
                            }})
                                .success(function (data) {
                                    console.log(data);
                                })
                        })
                }

                function clear() {
                    vm.student = {};
                }

                vm.showPopupImage = showPopupImage;

                vm.startDeleteDocDialog = startDeleteDocDialog;
                vm.startChangePassDialog = startChangePassDialog;

                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 10;  // количество лет для выбора
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;

                vm.startAddDocDialog = startAddDocDialog;

                $scope.docPlaceholder = CONFIG.docPlaceholderImage;
                // Документы пользователя. Заглушка. Будут загружены в методе gteStudentData()



                // TODO: Получение данных студента ------ готов

                function showPopupImage(image) {
                    PopupService.showPopup(image);
                }

                function startAddDocDialog(ev) {
                    $mdDialog.show({
                        controller: 'StudentsProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/students/profile/views/addDocDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(doc) {
                        Utils.getPhotoFromFile(doc.file)
                            .then(function(image) {
                                $scope.$apply(function(){
                                    doc.cover = image;
                                });
                            });
                        // получение фото из файла
                        $scope.profile.student.docs.push(doc);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function startChangePassDialog(ev) {
                    $mdDialog.show({
                        controller: 'StudentsProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/students/profile/views/changePasswordDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(pass) {
                        if (pass.new === pass.new_confirm) {
                            $http.get('/permissions/change_pass', {params: {_id: currentUser.getID(), password: pass.old, new_password: pass.new}})
                                .success(function(res) {
                                    console.log(res);
                                });
                        } else {
                            console.log('Not change');
                        }
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function dialogDone(doc) {
                    $mdDialog.hide(doc);
                }

                function dialogCancel() {
                    $mdDialog.cancel();
                }
                // Удаление документа
                function deleteDoc(doc) {
                    var docs = $scope.profile.student.docs;
                    for (var i = 0; i < docs.length; i++) {
                        if (docs[i].$$hashKey == doc.$$hashKey) {
                            // Удаление
                            docs.splice(i, 1);
                            for(var j = i; j < docs.length; j++) {
                                docs[j].num--;
                            }
                            return;
                        }
                    }
                }
                // Открытие диалога удаления
                function startDeleteDocDialog(ev, doc) {
                    var confirm =
                        $mdDialog.confirm()
                            .title('Удалить документ "' + doc.name + '"?')
                            .textContent('Вы не сможете восстановить данный документ. Действительно удалить?')
                            .ariaLabel('delete_doc_dialog')
                            .parent(angular.element(document.body))
                            .targetEvent(ev)
                            .ok('Удалить')
                            .cancel('Отмена');
                    $mdDialog.show(confirm)
                        .then(function() {
                            deleteDoc(doc);
                        });
                }
            }
        );

    var config = {
        faculties: [
            'ИВТФ',
            'ТЭФ',
            'ЭЭФ',
            'ФЭУ'
        ],
        conclusions: [
            "А - годен к военной службе",
            "Б - годен с ограничениями"
        ],
        // docs: [
        //     {
        //         name: 'Паспорт',
        //         cover: '/assets/images/background.png' //url("/assets/images/background.png")
        //     },
        //     {
        //         name: 'СНИЛС',
        //         cover: '/assets/images/background.png'
        //     },
        //
    }
})();

(function(){
    'use strict';
    angular
        .module('app.admin')
        .controller('StudentsScheduleController', function($scope, $mdDialog) {
            var vm = this;
            vm.onDayClick = openDayDialog;

            vm.getDayData = getDayData;
            vm.dialogCancel = dialogCancel;

            function getDayData(date) {
                // Получение инфы по текущей дате
                // ...
                var data = {};
                var curDay = date.getDay();
                // заглушка и тестовые данные
                if (curDay && curDay % 5 == 0)
                    data = {
                        lessons: [
                            { name: "Практика", time: "11:00", room: "В513", teacher: "Герасев В.Е." },
                            { name: "ТСП", time: "13:00", room: "В513", teacher: "Герасев В.Е." },
                            { name: "Техническая подготовка", time: "15:00", room: "В513", teacher: "Герасев В.Е." }
                        ]
                    }
                return data;
            }

            function openDayDialog(ev, dayData) {
                if (!dayData.data) return;

                var newScope = $scope.$new();
                newScope.dayData = dayData;
                $mdDialog.show({
                    scope: newScope,
                    controller: 'StudentsScheduleController',
                    controllerAs: 'schedule',
                    templateUrl: 'diaryApp/students/schedule/views/dayDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                })
                    .then(function() {
                        // console.dir(dayData);
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }
        });
})();

(function(){
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsScheduleController', function($scope, $mdDialog) {
            var vm = this;
            vm.onDayClick = openDayDialog;

            vm.getDayData = getDayData;
            vm.dialogCancel = dialogCancel;

            function getDayData(date) {
                // Получение инфы по текущей дате
                // ...
                var data = {};
                var curDay = date.getDay();
                // заглушка и тестовые данные
                if (curDay && curDay % 5 == 0) 
                    data = {
                        lessons: [
                            { name: "Практика", time: "11:00", room: "В513", teacher: "Герасев В.Е." },
                            { name: "ТСП", time: "13:00", room: "В513", teacher: "Герасев В.Е." },
                            { name: "Техническая подготовка", time: "15:00", room: "В513", teacher: "Герасев В.Е." }
                        ]
                    }
                return data;
            }

            function openDayDialog(ev, dayData) {
                if (!dayData.data) return;

                var newScope = $scope.$new();
                newScope.dayData = dayData;
                $mdDialog.show({
                        scope: newScope,
                        controller: 'StudentsScheduleController',
                        controllerAs: 'schedule',
                        templateUrl: 'diaryApp/students/schedule/views/dayDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function() {
                        // console.dir(dayData);
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }
        });
})();
(function(){
    angular
        .module('app.students')
        .controller('StudentsController', function(currentUser){
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();
(function() {
  'use strict';
  angular
    .module('app.students')
    .config(function($stateProvider, PERMISSIONS) {
      $stateProvider
        .state('students', {
          url: '/students',
          controller: 'StudentsController',
          controllerAs: 'students',
          templateUrl: 'diaryApp/students/students.html',
          abstract: true,
          data: {
            permissions: [
              PERMISSIONS.STUDENT
            ]
          }
          // resolve: {
          //   isLogin: function(authHelper) {
          //     return authHelper.isLogin();
          //   }
          // }
          // resolve: {
          // //Кидать AuthorizationError <- Error и обрабатывать в run
          //   isGranted: function(permissionService) {
          //     return permissionService.isGrantedAccessToStudent;
          //   }
          // }
        })
          .state('students.profile', {
            url: '/profile/',
            controller: 'StudentsProfileController',
            controllerAs: 'profile',
            templateUrl: 'diaryApp/students/profile/profile.html'
          })
          .state('students.marks', {
            url: '/marks/',
            controller: 'StudentsMarksController',
            controllerAs: 'marks',
            templateUrl: 'diaryApp/students/marks/marks.html'
          })
          .state('students.schedule', {
            url: '/schedule/',
            controller: 'StudentsScheduleController',
            controllerAs: 'schedule',
            templateUrl: 'diaryApp/students/schedule/schedule.html'
          })
          .state('students.admin', {
              url: '/admin/',
              controller: 'AdminController',
              controllerAs: 'admin',
              templateUrl: 'diaryApp/students/admin/admin.html'
          });
    });
})();


(function() {
    angular
        .module('app.students')
        .controller('TeachersDiaryController', function($scope, tableHelper, $mdDialog, PopupService, $http, currentUser) {
            var vm = this;

            vm.saveData = save;
            vm.clear = clear;
            vm.changePresence = changePresence;
            vm.dialogCancel = dialogCancel;
            vm.dialogDone = dialogDone;
            vm.onDocLoad = onDocLoad;

            function clear() {
                $http.get('/get/students', {params: {teacher_id: currentUser.getID()}})
                    .success(function (responce) {
                        setData(responce);
                    });
            }

            function save() {
                vm.data.troops.forEach(function (troop) {
                    console.log(troop);
                    var request = [];
                    troop.students.forEach(function (mark) {
                        var student_id = mark.data.student_id;
                        var s = mark;
                        for (key in s) {
                            if (key !== 'data' && key !== 'student') {
                                var discipline_id = s[key].id;
                                for (term in s[key]) {
                                    if (term !== 'id' && term!== 'student') {
                                        if (s[key][term].marks === undefined) {
                                            s[key][term].marks = 0;
                                        }
                                        if (s[key][term].presence) {
                                            request.push({
                                                student_id: student_id,
                                                discipline_id: discipline_id,
                                                term: term[term.length - 1],
                                                mark: s[key][term].marks
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    })
                    console.log(request);
                    $http.get('/update/marks', {params: {req: request}})
                        .success(function(res) {
                            console.log(res);
                        })
                })
            }



            $http.get('/get/students', {params: {teacher_id: currentUser.getID()}})
                .success(function (responce) {
                    console.log(responce);
                    setData(responce);
                });


            // Обработка изменения присутствия студента на занятии
            function changePresence(cell) {
                cell.value.marks = cell.value.presence ? cell.value.marks : '';
                console.log(cell.value.makrs);
            }

            function onDocLoad(doc, photo) {
                // Utils.getPhotoFromFile(doc.file)
                //         .then(function(image) {
                //             $scope.$apply(function(){
                //                 doc.cover = image;
                //             });
                //         });
                var newDoc = {};
                newDoc.file = doc;
                newDoc.cover = photo;
                $scope.diary.day.docs.push(newDoc);
            }

            function showPopupImage(image) {
                PopupService.showPopup(image);
            }

            function openReasonDialog(ev, student, date) {
                var newScope = $scope.$new();
                newScope.student = student;
                newScope.date = date;
                $mdDialog.show({
                    scope: newScope,
                    controller: 'TeachersDiaryController',
                    controllerAs: 'diary',
                    templateUrl: 'diaryApp/teachers/diary/views/reasonDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                })
                    .then(function(reasonObj) {

                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }

            function dialogDone(reasonDialog) {
                $mdDialog.hide(reasonDialog);
            }

            function setData(aData) {
                vm.data = {troops: aData};
                vm.diaryHelper = tableHelper.getInstance();
                vm.getStudentInfo = getStudentInfo;
                vm.openReasonDialog = openReasonDialog;
                vm.changeParams = changeParams;

                vm.showPopupImage = showPopupImage;

                vm.day = {};
                vm.day.docs = [];

                init();

                function init() {
                    vm.currentTroop = vm.data.troops[0] || {};
                    vm.currentSubject = vm.currentTroop.subjects[0] || {};
                    changeParams();
                }

                function getTableTitles(helper, titles) {
                    for (var i = 0; i < titles.length; i++) {
                        helper.addTitle(titles[i].name, titles[i].options);
                    }
                }

                function getStudentById(studentId, collection) {
                    for (var i = 0; i < collection.length; i++) {
                        if (collection[i].student.id == studentId) return collection[i];
                    }
                    return false;
                }

                function getStudentInfo(ev, cell) {
                    console.dir(cell);
                    var newScope = $scope.$new();
                    var currentStudent = getStudentById(cell.value.id, vm.currentTroop.students);
                    newScope.student = currentStudent // записать данные студента

                    $mdDialog.show({
                        scope: newScope,
                        controller: 'TeachersDiaryController',
                        controllerAs: 'diary',
                        templateUrl: 'diaryApp/teachers/diary/views/studentInfo.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                        .then(function(studentData) {

                        }, function() {});
                }

                function getStudentsMarks(helper, students) {
                    for (var i = 0; i < students.length; i++) {
                        var row = students[i][vm.currentSubject.label];
                        row.student = students[i].student;
                        helper.addItemRow(row);
                    }
                }

                // Обработка изменения параметров
                function changeParams(ev) {
                    // Запрос данных при изменении взвода и предмета
                    // console.log('params changed');
                    vm.diaryHelper.clearHeaders();
                    vm.diaryHelper.clearList();
                    getTableTitles(vm.diaryHelper, vm.currentSubject.titles);
                    getStudentsMarks(vm.diaryHelper, vm.currentTroop.students);
                }
            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = function(date) {
                var s = new Date(date);
                var day = '';
                if (s.getDate() < 10) {
                    day = '0' + s.getDate();
                } else {
                    day = s.getDate();
                }
                var month = '';
                if (s.getMonth() < 9) {
                    month = '0' + (s.getMonth() + 1);
                } else {
                    month = s.getMonth() + 1;
                }
                return date ? day + '.' + month + '.' + String(s.getFullYear()) : '';
            };

            $mdDateLocaleProvider.parseDate = function(dateString) {
                var month = Number(dateString.substr(3).substr(0,2)) - 1;
                return new Date(dateString.substr(6).substr(0,4), month, dateString.substr(0,4));
            };
        })
        .controller('TeachersProfileController',
             function ($scope, CONFIG, $mdDialog, Utils, PopupService, $http, currentUser) {
                var vm = this;
                vm.Utils = Utils;
                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;
                var s = $http.get('/get/teacher_profile', {params: {Id: currentUser.getID()}})
                 .success(function (data) {
                     vm.teacher = getTeacherData();
                     function getTeacherData() {
                         return {
                             name: data.name,
                             surname: data.surname,
                             fatherName: data.fatherName,
                             teacher_passport: data.teacher_passport,
                             birthPlace: data.birthPlace,
                             education: data.education,
                             military: data.military,
                             appointment: data.appointment,
                             address: data.address,
                             start_year: data.start_year,
                         };
                     }
                     if (!vm.teacher.photo) {
                         vm.teacher.preview_img = CONFIG.defaultAvatar;
                     }
                     vm.teacher.docs = [];
                     vm.teacher.birthDate = new Date(data.birthDate);
                 });

                 vm.saveData = saveData;
                 vm.clear = clear;
                 function saveData() {
                     $http.get('/update/teacher_profile', {params: {
                         teacher_id: currentUser.getID(),

                         name: vm.teacher.name,
                         surname: vm.teacher.surname,
                         fatherName: vm.teacher.fatherName,
                         teacher_passport: vm.teacher.teacher_passport,
                         birthPlace: vm.teacher.birthPlace,
                         education: vm.teacher.education,
                         military: vm.teacher.military,
                         appointment: vm.teacher.appointment,
                         address: vm.teacher.address,
                         start_year: vm.teacher.start_year,
                         birthDate: vm.teacher.birthDate
                     }})
                         .success(function (data) {
                             console.log(data);
                         })
                 }

                 function clear() {
                     vm.teacher = {};
                 }

                vm.showPopupImage = showPopupImage;

                vm.startDeleteDocDialog = startDeleteDocDialog;
                vm.startChangePassDialog = startChangePassDialog;

                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 50;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;

                vm.startAddDocDialog = startAddDocDialog;

                $scope.docPlaceholder = CONFIG.docPlaceholderImage;
                // Документы пользователя. Заглушка. Будут загружены в методе gteTeacherData()


                // TODO: Получение данных студента

                function showPopupImage(image) {
                    PopupService.showPopup(image);
                }

                function startAddDocDialog(ev) {
                    $mdDialog.show({
                        controller: 'TeachersProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/teachers/profile/views/addDocDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(doc) {
                        Utils.getPhotoFromFile(doc.file)
                            .then(function(image) {
                                $scope.$apply(function(){
                                    doc.cover = image;
                                });
                            });
                        // получение фото из файла
                        $scope.profile.teacher.docs.push(doc);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function startChangePassDialog(ev) {
                    $mdDialog.show({
                        controller: 'TeachersProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/teachers/profile/views/changePasswordDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(pass) {
                        if (pass.new === pass.new_confirm) {
                            $http.get('/permissions/change_pass', {params: {_id: currentUser.getID(), password: pass.old, new_password: pass.new}})
                                .success(function(res) {
                                    console.log(res);
                                });
                        } else {
                            console.log('Not change');
                        }
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function dialogDone(doc) {
                    $mdDialog.hide(doc);
                }

                function dialogCancel() {
                    $mdDialog.cancel();
                }
                // Удаление документа
                function deleteDoc(doc) {
                    var docs = $scope.profile.teacher.docs;
                    for (var i = 0; i < docs.length; i++) {
                        if (docs[i].$$hashKey == doc.$$hashKey) {
                            // Удаление
                            docs.splice(i, 1);
                            for(var j = i; j < docs.length; j++) {
                                docs[j].num--;
                            }
                            return;
                        }
                    }
                }
                // Открытие диалога удаления
                function startDeleteDocDialog(ev, doc) {
                    var confirm =
                        $mdDialog.confirm()
                            .title('Удалить документ "' + doc.name + '"?')
                            .textContent('Вы не сможете восстановить данный документ. Действительно удалить?')
                            .ariaLabel('delete_doc_dialog')
                            .parent(angular.element(document.body))
                            .targetEvent(ev)
                            .ok('Удалить')
                            .cancel('Отмена');
                    $mdDialog.show(confirm)
                        .then(function() {
                            deleteDoc(doc);
                        });
                }
        });

        var config = {
            faculties: [
                'ИВТФ',
                'ТЭФ',
                'ЭЭФ',
                'ЭМФ',
                'ФЭУ',
                'ИФФ'
            ],
            conclusions: [
                "А - годен к военной службе",
                "Б - годен с ограничениями"
            ],
        }
})();




(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersReportsController', function() {

        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersScheduleController', function($scope, $mdDialog) {
            var vm = this;
            vm.onDayClick = openDayDialog;

            vm.getDayData = getDayData;
            vm.dialogCancel = dialogCancel;

            function getDayData(date) {
                // Получение инфы по текущей дате
                // ...
                var data = {};
                var curDay = date.getDay();
                // заглушка и тестовые данные
                if (curDay % 6 != 0) 
                    data = {
                        lessons: [
                            { name: "Практика", time: "11:00", room: "В513", troop: "1 взвод" },
                            { name: "ТСП", time: "13:00", room: "В513", troop: "1 взвод" },
                            { name: "Техническая подготовка", time: "15:00", room: "В513", troop: "2 взвод" }
                        ]
                    }
                return data;
            }

            function openDayDialog(ev, dayData) {
                if (!dayData.data) return;

                var newScope = $scope.$new();
                newScope.dayData = dayData;
                $mdDialog.show({
                        scope: newScope,
                        controller: 'TeachersScheduleController',
                        controllerAs: 'schedule',
                        templateUrl: 'diaryApp/teachers/schedule/views/dayDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function() {
                        // console.dir(dayData);
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersController', function(currentUser) {
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .config(function($stateProvider, PERMISSIONS) {
            $stateProvider
                .state('teachers', {
                    url: '/teachers',
                    controller: 'TeachersController',
                    controllerAs: 'teachers',
                    templateUrl: 'diaryApp/teachers/teachers.html',
                    abstract: true,
                    data: {
                        permissions: [
                            PERMISSIONS.TEACHER
                        ]
                    }
                })
                .state('teachers.profile', {
                    url: '/profile/',
                    controller: 'TeachersProfileController',
                    controllerAs: 'profile',
                    templateUrl: 'diaryApp/teachers/profile/profile.html'
                })
                .state('teachers.diary', {
                    url: '/diary/',
                    controller: 'TeachersDiaryController',
                    controllerAs: 'diary',
                    templateUrl: 'diaryApp/teachers/diary/diary.html'
                })
                .state('teachers.schedule', {
                    url: '/schedule/',
                    controller: 'TeachersScheduleController',
                    controllerAs: 'schedule',
                    templateUrl: 'diaryApp/teachers/schedule/schedule.html'
                })
                .state('teachers.reports', {
                    url: '/reports/',
                    controller: 'TeachersReportsController',
                    controllerAs: 'reports',
                    templateUrl: 'diaryApp/teachers/reports/reports.html'
                })
        });
})();


(function() {
    'use strict';
    angular
        .module('app.test')
        .config(function($stateProvider, PERMISSIONS) {
            $stateProvider
                .state('test', {
                    url: '/test',
                    controller: 'TestController',
                    controllerAs: 'test',
                    templateUrl: 'diaryApp/test/admin.html',
                    abstract: true,
                    data: {
                        permissions: [
                            PERMISSIONS.TEACHER
                        ]
                    }
                })
                .state('test.profile', {
                    url: '/profile/',
                    controller: 'TestProfileController',
                    controllerAs: 'profile',
                    templateUrl: 'diaryApp/teachers/profile/profile.html'
                })
        });
})();