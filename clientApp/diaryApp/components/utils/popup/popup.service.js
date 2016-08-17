(function() {
    'use strict';
    angular
        .module('app.utils')
        .factory('PopupService', function() {
            var show = false;

            return {
                showPopup: showPopup,
                // hidePopup: hidePopup,
                // tooglePopup: tooglePopup
            }

            function showPopup(image){
                var selector = "'#popup_image'";
                angular.element(document.body).append(
                    '<div id="popup_image" onclick="document.querySelector('+ selector +').remove();" class="popup_container">' +
                    '    <link rel="stylesheet" href="diaryApp/components/utils/popup/popup.css">' +
                    '    <img class="popup_image" src="' + image + '">' +
                    '</div>');
                show = true;
            }

            // function hidePopup() {
            //     document.querySelector('#popup_image').remove();
            //     show = false;
            // }

            // function tooglePopup(image) {
            //     if (show) hidePopup;
            //     else showPopup(image);
            // }
        });
})();