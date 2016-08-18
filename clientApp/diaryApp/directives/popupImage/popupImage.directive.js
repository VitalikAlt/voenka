(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('popupImage', function() {
             return {
                restrict: 'E',
                link: link,
                replace: true,
                controller: 'PopupImageController',
                controllerAs: 'popup',
                templateUrl: 'diaryApp/directives/popupImage/popupImage.html',
                scope: {
                    imageSrc: '@'
                }
            };
        });

        function link(scope, elem, attrs, controller) {
            elem.bind('click', function(e) {
                //controller.openPopupImage(e, attrs.ngSrc, attrs.alt);
                controller.closePopup();
            });
        }
})();