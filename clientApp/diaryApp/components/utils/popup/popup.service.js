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