(function() {
  'use strict';
  angular.module('app.auth', []);
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
        'app.students'
    ])
.run(function($http, $cookies, $rootScope, currentUser, $state, $log) {
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
                 $state.go('auth');
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
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $log, $state, $mdDialog, currentUser, registerHelper, PERMISSIONS) {
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
                        clickOutsideToClose: false,
                    })
                    .then(function(newStudent) {
                        if (newStudent) {
                            console.log(newStudent);
                        newStudent.token = '12345';
                        newStudent.permissions = PERMISSIONS.STUDENT;
                        registerHelper.register(newStudent)
                            .then(function() {
                                $log.log('Register success!');
                            })
                            .catch(function() {
                                $log.log('Registration failed');
                            });
                        }
                        
                    }, function() {
                        // закрыто диалоговое окно
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
                        newTeacher.token = '12345';
                        registerHelper.register(newTeacher);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Обработка подтверждения действия и закрытия диалогового окна
                // objFromDialog (Object) - объект изменений
                function dialogDone(objFromDialog) {
                    this.mdDialog.hide(objFromDialog);
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
    .config(function($stateProvider) {
      $stateProvider
        .state('auth', {
          url: '/auth',
          controller: 'AuthController',
          controllerAs: 'auth',
          templateUrl: 'diaryApp/auth/auth.html'
        });
    });
})();
(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($state, $q, PERMISSIONS, currentUser) {
    var factory = {
      login: login, // авторизация пользователя
    };

    return factory;


    function login(loginData) {
        // Получение permissions
        // ...
        // Заглушка
        if (!loginData.permissions) {
          loginData.permissions = PERMISSIONS.STUDENT;
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
        
        switch (loginData.permissions) {
          case PERMISSIONS.GUEST:   { $state.go('auth'); break; }
          case PERMISSIONS.STUDENT: { $state.go('students.profile'); break; }
          case PERMISSIONS.TEACHER: { $state.go('teachers.profile'); break; }
          case PERMISSIONS.ADMIN:   { $state.go('admin.profile'); break; }
        }
        
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
  }
})();

(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    function currentUser(PermissionService, $q, PERMISSIONS, $cookieStore) {
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
        }

        /*
           Проверка доступов
           @param neededPermissions (Array)  необходимые доступы
           @return (bool) Возможность доступа
        */
        function checkPermissions(neededPermissions) {
            if (!getPermissions()) {
                // TODO: Получать permissions с сервера по токену
                // Заглушка
                return $cookieStore.get('token');
            }
            if (neededPermissions) {
                if (neededPermissions.indexOf(getPermissions()) != -1) {
                    return true;
                }
            }
            return false;
        }

        // Возвращает зарезервированное число для доступов
        function getPermissions() {
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
(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('PermissionService', PermissionService);

    function PermissionService(PERMISSIONS) {
        var permissionService = {
            // getPermissions: getPermissions
        }

        return permissionService;

        // function getPermissions() {
            
        // }
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
(function(){
    'use strict';
    angular
        .module('app.core')
        .constant('CONFIG', {
            defaultAvatar: '/assets/images/default_avatar.jpg'
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
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
                    // redirectTo: 'auth',
                })
                .state('page404', {
                    url: '/404_page_not_found',
                    templateUrl: 'diaryApp/page404/page404.html'
                });
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
        .directive('fileDownload', function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    downloadFile: '=',
                    preview: '='
                },
                templateUrl: 'diaryApp/directives/fileDownload/fileDownload.html',
                compile: compile
            }
        });

        function compile(templateElement, templateAttrs) {
            return {
                pre: pre,
                post: post
            }
        }

        function pre(scope, element, attrs) {
            
        }

        function post(scope, element, attrs) {
            var elem = element;
            var id = attrs.id;
            var button = element.find('button');
            var fileChooseElem = element.find('input');

            elem.bind('click', function(e) {
                this.children['download_input'].click();                            
            });
            
            fileChooseElem.bind('change', function(e) {
                var newFiles = e.target.files;
                if (newFiles) {
                    scope.downloadFile = newFiles[0];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        scope.$apply(function() {
                            scope.preview = event.target.result;
                        });
                    }
                    reader.readAsDataURL(newFiles[0]);
                    
                }     
            });
        }
})();
(function(){
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsMarksController', function() {
            
        });
})();
(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function ($scope, CONFIG) {
                var vm = this;
                // Текущий студент. Заглушка
                vm.student = getStudentData();

                if (!vm.student.photo) {
                    vm.student.preview_img = CONFIG.defaultAvatar;
                }
                
                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 10;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;
            }
        ); 
    
    // TODO: Получение данных студента
    function getStudentData() {
        return {};
    }

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
        docs: [
            {
                name: 'Паспорт',
                cover: '/assets/images/background.png' //url("/assets/images/background.png")
            },
            {
                name: 'СНИЛС',
                cover: '/assets/images/background.png'
            },
        ]
    }
})();
(function(){
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsScheduleController', function() {

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
          });
    });
})();