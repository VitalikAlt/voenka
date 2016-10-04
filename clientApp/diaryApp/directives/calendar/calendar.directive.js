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