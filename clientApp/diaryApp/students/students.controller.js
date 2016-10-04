(function(){
    angular
        .module('app.students')
        .controller('StudentsController', function(currentUser){
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();