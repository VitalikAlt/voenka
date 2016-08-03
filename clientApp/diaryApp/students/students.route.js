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