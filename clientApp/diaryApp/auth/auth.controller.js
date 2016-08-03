(function(){
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $state) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = addStudent;
                vm.registerTeacher = registerTeacher;

                function authorize(login, password) {
                    var type = authHelper.login(login, password).type;
                    switch(type) {
                        case 'student': { console.log(type); break; };
                        case 'admin': { console.log(type); break; };
                        default: { console.log(type); break; };
                    }   
                }

                function addStudent() {
                    $state.go('students.add');
                }

                function registerTeacher() {
                    $state.go('teachers.add');
                }
            }
        ); 
})();