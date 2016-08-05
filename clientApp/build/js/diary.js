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
.run(function($http, $cookies, $rootScope, authHelper, $state, $log) {
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
             if (next.name == 'auth') return;
             authHelper.isLogin()
                .catch(function() {
                    $state.go('auth');
                    evt.preventDefault();
                });
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
            function (authHelper, $state, $mdDialog) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = startAddStudentDialog;
                vm.registerTeacher = startAddTeacherDialog;

                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                function authorize(login, password) {
                    var type = authHelper.login(login, password).type;
                    switch(type) {
                        case 'student': { console.log(type); break; };
                        case 'admin': { console.log(type); break; };
                        default: { console.log(type); break; };
                    }   
                }

                // function addStudent(ev) {
                //     // $state.go('students.add');
                //     $state.go('students.profile', { student_id: 'temp' });
                //     //startAddStudentDialog(ev);
                // }

                // function registerTeacher() {
                //     $state.go('teachers.add');
                // }


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
                        console.log(newStudent);
                        var newID = '1234567'; // TODO: отправка данных на сервак и получение ID
                        $state.go('students.profile', { student_id: newID });
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Запуск диалогового окна добавления студента
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
                    .then(function(newStudent) {
                        console.log(newStudent);
                        var newID = '1234567'; // TODO: отправка данных на сервак и получение ID
                        // $state.go('teachers.profile', { student_id: newID });
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

function AuthorizationError(message) {
    this.name = 'AuthorizationError';
    this.message = message;
}
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
            function () {
                var vm = this;

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
        .controller('StudentsController', function(){
            
        });
})();
(function() {
  'use strict';
  angular
    .module('app.students')
    .config(function($stateProvider) {
      $stateProvider
        .state('students', {
          url: '/students',
          controller: 'StudentsController',
          controllerAs: 'students',
          templateUrl: 'diaryApp/students/students.html',
          abstract: true,
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
            url: '/profile/:student_id',
            controller: 'StudentsProfileController',
            controllerAs: 'profile',
            templateUrl: 'diaryApp/students/profile/profile.html'
          })
          .state('students.marks', {
            url: '/marks/:student_id',
            controller: 'StudentsMarksController',
            controllerAs: 'marks',
            templateUrl: 'diaryApp/students/marks/marks.html'
          })
          .state('students.schedule', {
            url: '/schedule/:student_id',
            controller: 'StudentsScheduleController',
            controllerAs: 'schedule',
            templateUrl: 'diaryApp/students/schedule/schedule.html'
          });
    });
})();