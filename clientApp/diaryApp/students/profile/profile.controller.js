(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function () {
                var vm = this;

                // Mock for config from server
                vm.config = config;
            }
        ); 
    
    var config = {
        faculties: [
            'ИВТФ',
            'ТЭФ',
            'ЭЭФ',
            'ФЭУ'
        ]
    }
})();