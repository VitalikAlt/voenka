(function(){
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $log, $state, $mdDialog, currentUser, registerHelper, PERMISSIONS) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = startAddStudentDialog;
                vm.registerTeacher = startAddTeacherDialog;

                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                function authorize(formData) {
                    authHelper.login(formData);
                }

                // function addStudent(ev) {
                //     // $state.go('students.add');
                //     $state.go('students.profile', { student_id: 'temp' });
                //     //startAddStudentDialog(ev);
                // }

                // function registerTeacher() {
                //     $state.go('teachers.add');
                // }


                // Запуск диалогового окна добавления студента
                function startAddStudentDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addStudentDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(newStudent) {
                        console.log(newStudent);
                        newStudent.token = '12345';
                        newStudent.permissions = PERMISSIONS.STUDENT;
                        // $state.go('students.profile');
                        registerHelper.register(newStudent)
                            .then(function() {
                                $log.log('Register success!');
                            })
                            .catch(function() {
                                $log.log('Registration failed');
                            });
                        // var newID = '1234567'; // TODO: отправка данных на сервак и получение ID
                        // $state.go('students.profile', { student_id: newID });
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Запуск диалогового окна добавления преподавателя
                function startAddTeacherDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addTeacherDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(newStudent) {
                        console.log(newTeacher);
                        newStudent.token = '12345';
                        registerHelper.register(newStudent);

                        // var newID = '1234567'; // TODO: отправка данных на сервак и получение ID
                        // $state.go('teachers.profile', { student_id: newID });
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Обработка подтверждения действия и закрытия диалогового окна
                // objFromDialog (Object) - объект изменений
                function dialogDone(objFromDialog) {
                    this.mdDialog.hide(objFromDialog);
                }

                // Нажатие отмены (закрыть)
                function dialogCancel() {
                    this.mdDialog.cancel();
                }
            }
        ); 
})();