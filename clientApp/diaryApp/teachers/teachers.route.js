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