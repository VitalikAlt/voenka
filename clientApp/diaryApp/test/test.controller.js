(function(){
    angular
        .module('app.test')
        .controller('TestController', function(currentUser){
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();