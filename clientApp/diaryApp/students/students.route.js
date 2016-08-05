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
          });
    });
})();