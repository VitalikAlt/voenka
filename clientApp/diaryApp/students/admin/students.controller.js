(function(){
    angular
        .module('app.students')
        .controller('AdminController', function(currentUser){
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();