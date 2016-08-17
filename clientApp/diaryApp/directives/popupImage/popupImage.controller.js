(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('PopupImageController', function($scope, $mdDialog) {
            var vm = this;
            vm.openPopupImage = openPopupImage;
            vm.closePopup = closePopup;
            
            function openPopupImage(ev, popupSrc, popupName) {
                $scope.$apply(function() {
                    $scope.popupSrc  = popupSrc;
                    $scope.popupName = popupName;
                });
                var newScope = $scope.$new();
                newScope.popupSrc = popupSrc,
                newScope.popupName = popupName,
                newScope.closePopup = closePopup;
                $mdDialog.show({
                    scope: newScope,
                    templateUrl: 'diaryApp/directives/popupImage/popupImage.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                })
                .then(function() {},
                function() {
                    // закрыто popup окно
                });
               
            }

            function closePopup() {
                $mdDialog.cancel();
            } 
        });
})();