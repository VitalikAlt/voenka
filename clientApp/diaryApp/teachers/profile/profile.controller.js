(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersProfileController',
             function ($scope, CONFIG, $mdDialog, Utils, PopupService) {
                var vm = this;
                vm.Utils = Utils;
                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;
                // Текущий препод. Заглушка
                vm.teacher = getTeacherData();

                vm.showPopupImage = showPopupImage;

                if (!vm.teacher.photo) {
                    vm.teacher.preview_img = CONFIG.defaultAvatar;
                }

                vm.startDeleteDocDialog = startDeleteDocDialog;
                vm.startChangePassDialog = startChangePassDialog;
                
                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 50;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;

                vm.startAddDocDialog = startAddDocDialog;

                $scope.docPlaceholder = CONFIG.docPlaceholderImage;
                // Документы пользователя. Заглушка. Будут загружены в методе gteTeacherData()
                vm.teacher.docs = [];


                // TODO: Получение данных студента
                function getTeacherData() {
                    return {};
                }

                function showPopupImage(image) {
                    PopupService.showPopup(image);
                }

                function startAddDocDialog(ev) {
                    $mdDialog.show({
                        controller: 'TeachersProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/teachers/profile/views/addDocDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(doc) {
                        Utils.getPhotoFromFile(doc.file)
                            .then(function(image) {
                                $scope.$apply(function(){
                                    doc.cover = image;
                                });
                            });
                        // получение фото из файла
                        $scope.profile.teacher.docs.push(doc);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function startChangePassDialog(ev) {
                    $mdDialog.show({
                        controller: 'TeachersProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/teachers/profile/views/changePasswordDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(pass) {
                        console.dir(pass);
                        // смена пароля (проверять внутри диалога до отправки)
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function dialogDone(doc) {
                    $mdDialog.hide(doc);
                }

                function dialogCancel() {
                    $mdDialog.cancel();
                }
                // Удаление документа
                function deleteDoc(doc) {
                    var docs = $scope.profile.teacher.docs;
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
                // Открытие диалога удаления
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
        });

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
        }
})();