(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersController', function(currentUser) {
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();