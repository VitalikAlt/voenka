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
        'app.auth',
        'app.students'
    ])
.run(function($http, $cookies, $rootScope, authHelper, $state) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

        // $rootScope.$on('$routeChangeStart',
        //  function(evt, next, current) {
        //     if (!authHelper.isLogin()) {
        //         if (next.templateUrl === "login.html") {
        //         } else {
        //             $state.go('auth');
        //         }
        //     }
        //  });
    }
);
(function(){
    'use strict';
    angular.module('app.students', []);
})();

(function(){
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $state) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = addStudent;
                vm.registerTeacher = registerTeacher;

                function authorize(login, password) {
                    var type = authHelper.login(login, password).type;
                    switch(type) {
                        case 'student': { console.log(type); break; };
                        case 'admin': { console.log(type); break; };
                        default: { console.log(type); break; };
                    }   
                }

                function addStudent() {
                    $state.go('students.add');
                }

                function registerTeacher() {
                    $state.go('teachers.add');
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
          templateUrl: 'diaryApp/auth/view.html'
        });
    });
})();
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
                if (!authHelper.isLogin()) {
                    $state.go('auth');
                }
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
                    templateUrl: 'diaryApp/page404/view.html'
                });
                $urlRouterProvider.otherwise('/404_page_not_found');
        });
})();

(function(){
    angular
        .module('app.students')
        .controller('StudentsAddController',
            function () {
                var vm = this;
            }
        ); 
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
          templateUrl: 'diaryApp/students/view.html',
          abstract: true
        })
          .state('students.add', {
            url: '/add',
            controller: 'StudentsAddController',
            controllerAs: 'add',
            templateUrl: 'diaryApp/students/add/view.html'
          });
          // .state('students.profile', {
          //   url: '/profile/:student_id',
          //   controller: 'StudentsAddController',
          //   controllerAs: 'add',
          //   templateUrl: 'diaryApp/students/add/view.html'
          // });
    });
})();