(function(){
    angular
        .module('app')
        .controller("appController",
            function ($state, authHelper) {
                var vm = this;
                // $state.go('auth');
                // if (!authHelper.isLogin()) {
                //     $state.go('auth');
                // }
            }
        ); 
})();