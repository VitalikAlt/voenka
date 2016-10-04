(function() {
    'use strict';
    angular
        .module('app.admin')
        .config(function($stateProvider, PERMISSIONS) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    controller: 'adminController',
                    controllerAs: 'admin',
                    templateUrl: 'diaryApp/admin/admin.html',
                    abstract: true,
                    data: {
                        permissions: [
                            PERMISSIONS.TEACHER
                        ]
                    }
                })
                .state('admin.profile', {
                    url: '/profile/',
                    controller: 'AdminProfileController',
                    controllerAs: 'profile',
                    templateUrl: 'diaryApp/admin/profile/profile.html'
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