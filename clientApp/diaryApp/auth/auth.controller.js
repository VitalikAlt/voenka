(function(){
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $state, $mdDialog) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = startAddStudentDialog;
                vm.registerTeacher = registerTeacher;

                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                function authorize(login, password) {
                    var type = authHelper.login(login, password).type;
                    switch(type) {
                        case 'student': { console.log(type); break; };
                        case 'admin': { console.log(type); break; };
                        default: { console.log(type); break; };
                    }   
                }

                // function addStudent(ev) {
                //     // $state.go('students.add');
                //     $state.go('students.profile', { student_id: 'temp' });
                //     //startAddStudentDialog(ev);
                // }

                function registerTeacher() {
                    $state.go('teachers.add');
                }


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
                        var newID = '1234567'; // TODO: отправка данных на сервак и получение ID
                        $state.go('students.profile', { student_id: newID });
                        // if (controller.dialogParams.getParams().isAddedState) {
                        //     insertToStageArray(newStage, controller.config.sales_funnel.stages);
                        //     controller.config.sales_funnel.countUserStages++;
                        // }
                        // else {
                        //     delFromStageArray(newStage, controller.config.sales_funnel.stages);
                        //     insertToStageArray(newStage, controller.config.sales_funnel.stages);
                        // }
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