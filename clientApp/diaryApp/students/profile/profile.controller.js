(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function ($scope, CONFIG, $mdDialog, Utils) {
                var vm = this;
                vm.Utils = Utils;
                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;
                // Текущий студент. Заглушка
                vm.student = getStudentData();

                if (!vm.student.photo) {
                    vm.student.preview_img = CONFIG.defaultAvatar;
                }

                vm.startDeleteDocDialog = startDeleteDocDialog;
                
                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 10;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;

                vm.startAddDocDialog = startAddDocDialog;

                $scope.docPlaceholder = CONFIG.docPlaceholderImage;
                // Документы пользователя. Заглушка. Будут загружены в методе gteStudentData()
                vm.student.docs = [];


                // TODO: Получение данных студента
                function getStudentData() {
                    return {};
                }

                function startAddDocDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'StudentsProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/students/profile/views/addDocDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(doc) {
                        controller.Utils.getPhotoFromFile(doc.file)
                            .then(function(image) {
                                $scope.$apply(function(){
                                    doc.cover = image;
                                });
                            });
                        // получение фото из файла
                        controller.student.docs.push(doc);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function dialogDone(doc) {
                    this.mdDialog.hide(doc);
                }

                function dialogCancel() {
                    this.mdDialog.cancel();
                }
                // Удаление документа
                function deleteDoc(doc) {
                    var docs = $scope.profile.student.docs;
                    for (var i = 0; i < docs.length; i++) {
                        if (docs[i].$$hashKey == doc.$$hashKey) {
                            // Удаление
                            docs.splice(i, 1);
                            for(var j = i; j < docs.length; j++) {
                                docs[j].num--;
                            }
                            return;
                        }
                    }
                }

                function startDeleteDocDialog(ev, doc) {
                    var confirm = 
                        $mdDialog.confirm()
                            .title('Удалить документ "' + doc.name + '"?')
                            .textContent('Вы не сможете восстановить данный документ. Действительно удалить?')
                            .ariaLabel('delete_doc_dialog')
                            .parent(angular.element(document.body))
                            .targetEvent(ev)
                            .ok('Удалить')
                            .cancel('Отмена');
                    $mdDialog.show(confirm)
                        .then(function() {
                            deleteDoc(doc);
                        });
                }
            }
        ); 
    
   

    var config = {
        faculties: [
            'ИВТФ',
            'ТЭФ',
            'ЭЭФ',
            'ФЭУ'
        ],
        conclusions: [
            "А - годен к военной службе",
            "Б - годен с ограничениями"
        ],
        // docs: [
        //     {
        //         name: 'Паспорт',
        //         cover: '/assets/images/background.png' //url("/assets/images/background.png")
        //     },
        //     {
        //         name: 'СНИЛС',
        //         cover: '/assets/images/background.png'
        //     },
        // ]
    }
})();