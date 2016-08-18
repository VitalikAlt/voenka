(function() {
    angular
        .module('app.students')
        .controller('TeachersDiaryController', function($scope, tableHelper, $mdDialog, PopupService) {
            var vm = this;

            vm.data = testData;
            vm.diaryHelper = tableHelper.getInstance();
            vm.changeParams = changeParams;
            vm.changePresence = changePresence;
            vm.getStudentInfo = getStudentInfo;
            vm.openReasonDialog = openReasonDialog;

            vm.dialogCancel = dialogCancel;
            vm.dialogDone = dialogDone;
            vm.onDocLoad = onDocLoad;

            vm.showPopupImage = showPopupImage;

            vm.day = {};
            vm.day.docs = [];

            init();

            function init() {
                vm.currentTroop = vm.data.troops[0] || {};
                vm.currentSubject = vm.currentTroop.subjects[0] || {};
                changeParams();
            }

            function getTableTitles(helper, titles) {
                for (var i = 0; i < titles.length; i++) {
                    helper.addTitle(titles[i].name, titles[i].options);
                }
            }

            function getStudentById(studentId, collection) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i].student.id == studentId) return collection[i];
                }
                return false;
            }

            function getStudentInfo(ev, cell) {
                console.dir(cell);
                var newScope = $scope.$new();
                var currentStudent = getStudentById(cell.value.id, vm.currentTroop.students);
                newScope.student = currentStudent // записать данные студента

                $mdDialog.show({
                        scope: newScope,
                        controller: 'TeachersDiaryController',
                        controllerAs: 'diary',
                        templateUrl: 'diaryApp/teachers/diary/views/studentInfo.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function(studentData) {
                        
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function getStudentsMarks(helper, students) {
                // var rows = students[vm.currentSubject.label];
                for (var i = 0; i < students.length; i++) {
                    var row = students[i][vm.currentSubject.label];
                    row.student = students[i].student;
                    helper.addItemRow(row);
                }
            }

            // Обработка изменения параметров
            function changeParams(ev) {
                // Запрос данных при изменении взвода и предмета
                // console.log('params changed');
                vm.diaryHelper.clearHeaders();
                vm.diaryHelper.clearList();
                getTableTitles(vm.diaryHelper, vm.currentSubject.titles);
                getStudentsMarks(vm.diaryHelper, vm.currentTroop.students);
            }

            // Обработка изменения присутствия студента на занятии
            function changePresence(cell) {
                cell.value.marks = cell.value.presence ? cell.value.marks : '';
            }

            function onDocLoad(doc, photo) {
                // Utils.getPhotoFromFile(doc.file)
                //         .then(function(image) {
                //             $scope.$apply(function(){
                //                 doc.cover = image;
                //             });
                //         });
                var newDoc = {};
                newDoc.file = doc;
                newDoc.cover = photo;
                $scope.diary.day.docs.push(newDoc);
            }

            function showPopupImage(image) {
                PopupService.showPopup(image);
            }

            function openReasonDialog(ev, student, date) {
                var newScope = $scope.$new();
                newScope.student = student;
                newScope.date = date;
                $mdDialog.show({
                        scope: newScope,
                        controller: 'TeachersDiaryController',
                        controllerAs: 'diary',
                        templateUrl: 'diaryApp/teachers/diary/views/reasonDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(reasonObj) {
                        
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }

            function dialogDone(reasonDialog) {
                $mdDialog.hide(reasonDialog);
            }
        });
    // тестовые данные    
    var testData = {
        troops: [
            { 
                name: '1 взвод',
                subjects: [ 
                    {
                        name: 'ВСП',
                        label: 'vsp',
                        titles: [ 
                            { name: 'Студент', options: { label: 'student', isDiaryDay: false, editable: false } },
                            { name: '01.09.2016', options: { label: 'date01092016', isDiaryDay: true, editable: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', isDiaryDay: true, editable: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', isDiaryDay: true, editable: true } },
                        ]
                    }, 
                    { 
                        name: 'ТСП',
                        label: 'tsp',
                        titles: [ 
                            { name: 'Студент', options: { label: 'student', isDiaryDay: false, editable: false } },
                            { name: '01.09.2016', options: { label: 'date01092016', isDiaryDay: true, editable: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', isDiaryDay: true, editable: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', isDiaryDay: true, editable: true } },
                        ]
                    } 
                ],
                students: [
                    {
                        student: { name: 'Иванов И. И.', id: 111 },
                        vsp: {
                            date01092016: { marks: 3, presence: true },
                            date02092016: { marks: '', presence: false },
                            date03092016: { marks: 3, presence: true } 
                        },
                        tsp: {
                            date01092016: { marks: 4, presence: true },
                            date02092016: { marks: 5, presence: true },
                            date03092016: { marks: 4, presence: true } 
                        },

                        data: {
                            name: 'Иван',
                            surname: 'Иванов',
                            fatherName: 'Иванович',
                            birthDate: '01.01.1994',
                            birthPlace: 'Иваново',
                            faculty: 'ТЭФ',
                            troop: 1,
                            address: 'г. Иваново, ул. Пушкина, д. 1',
                            parentsAddress: 'г. Иваново, ул. Пушкина, д. 1',
                            conclusion: 'А - годен к военной службе',
                            start_study_year: 2016,
                            military: 'не служил, не участвовал',
                            education: 'Лицей №21 г. Иваново',

                            image: '/assets/images/default_avatar.jpg'
                        }
                    },
                    {
                        student: { name: 'Петров И. И.', id: 112 },
                        vsp: {
                            date01092016: { marks: 4, presence: true },
                            date02092016: { marks: 5, presence: true },
                            date03092016: { marks: 4, presence: true }
                        },
                        tsp: {
                            date01092016: { marks: '', presence: false },
                            date02092016: { marks: 5, presence: true },
                            date03092016: { marks: 4, presence: true }
                        },

                        data: {
                            name: 'Иван',
                            surname: 'Петров',
                            fatherName: 'Иванович',
                            birthDate: '02.02.1993',
                            birthPlace: 'Иваново',
                            faculty: 'ТЭФ',
                            troop: 1,
                            address: 'г. Иваново, ул. Пушкина, д. 1',
                            parentsAddress: 'г. Иваново, ул. Пушкина, д. 1',
                            conclusion: 'А - годен к военной службе',
                            start_study_year: 2016,
                            military: 'не служил, не участвовал',
                            education: 'Лицей №67 г. Иваново',

                            image: '/assets/images/default_avatar.jpg'
                        }
                    },
                ] 
            },
            { 
                name: '2 взвод',
                subjects: [ { name: 'ВСП' }, { name: 'ТСП' } ] 
            },
            { 
                name: '3 взвод',
                subjects: [ { name: 'ВСП' }, { name: 'ТСП' } ] 
            },
            { 
                name: '4 взвод',
                subjects: [ { name: 'ВСП' }, { name: 'ТСП' } ] 
            },
            { 
                name: '5 взвод',
                subjects: [ { name: 'ВСП' }, { name: 'ТСП' } ] 
            },
            { 
                name: '6 взвод',
                subjects: [ { name: 'ВСП' }, { name: 'ТСП' } ] 
            },
        ]
    }
})();