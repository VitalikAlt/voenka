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
                });
                $urlRouterProvider.otherwise('/404_page_not_found');
        });
})();
