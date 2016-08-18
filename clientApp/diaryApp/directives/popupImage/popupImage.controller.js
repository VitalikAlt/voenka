(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('PopupImageController', function($scope, $timeout, $mdDialog) {
            var vm = this;
            vm.closePopup = closePopup;
            vm.show = show;
            vm.isShow = false;

            // init();

            function closePopup() {
                document.querySelector('#popup_image').remove();
            }

            function show() {
                vm.isShow = true;
            }

            // function init() {
            //     // Задержка для загрузки стилей
            //     $timeout(function(){
            //         isShow = true;
            //     }, 100)
            // }

        });
})();