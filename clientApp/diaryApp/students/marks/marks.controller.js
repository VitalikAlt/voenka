(function() {
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsMarksController', function($scope, tableHelper) {
            var vm = this;
            vm.helper = tableHelper.getInstance();
            $scope.marks = vm;
            vm.summary = getSummary();

            init();


            function init() {
                getTableTitles();
                getTableList();
            }

            function getSummary() {
                var summary = {
                    average: 4.3, // Средний балл
                    missed: 13, // Количество пропусков
                    placed: 60 // Кол-во присутствий на парах
                };
                summary.percentMissed = (summary.missed / (summary.missed + summary.placed) * 100).toFixed(1);
                return summary;
            }

            // Получение заголовков таблицы
            function getTableTitles() {
                // получение заголовков
                // ...
                var titles = config.titles; // заглушка
                for (var i = 0; i < titles.length; i++) {
                    $scope.marks.helper.addTitle(titles[i].name, titles[i].options);
                }
            }
            function getTableList() {
                // получение строк
                // ...
                var rows = config.rows; // заглушка
                for (var i = 0; i < rows.length; i++) {
                    $scope.marks.helper.addItemRow(rows[i]);
                }
            }
            // Получение дат
            // function getDates() {
            //     return [];
            // }
            // // Получение предметов
            // function getSubjects() {
            //     return [];
            // }

            // function getShedule() {
            //     return {
            //         lessons: [
            //             {
            //                 name: 'subject name',
            //                 room: 'cabinet',
            //                 date: '01.01.2016',
            //                 teacher: 'teacher name',
            //                 mark: 4,
            //                 notes: ''
            //             }
            //         ]
            //     }
            // }

            // // Получение общего массива оценок
            // function getMarks() {
            //     // return {
            //     //     semestr: [
            //     //         {
            //     //             name: '1 семестр',
            //     //             marks: [
            //     //                 {
            //     //                     date: '01.01.2016',
            //     //                     place: true, // присутствие
            //     //                     mark: 4,
            //     //                     note: ''
            //     //                 }
            //     //             ]
            //     //         }
            //     //     ]
            //     // }
            //     return {
            //         marks: {
            //             semestr: '1 семестр',
            //             date: '',
            //             hasPlace: true,
            //             mark: 4,
            //             note: ''
            //         }
            //         // normativs: {}
            //     }
            // }

            // Тестовый конфиг. имитация данных
            
        });

        var config = {
                titles: [
                    { name: 'Название', options: { label: 'nameSubject', show: true } },
                    { name: '1 семестр', options: { label: 'semestr1', show: true } },
                    { name: '2 семестр', options: { label: 'semestr2', show: true } }
                ],
                rows: [
                    { nameSubject: 'ВСП', semestr1: 4, semestr2: 5 },
                    { nameSubject: 'ТСП', semestr1: 5, semestr2: 3 }
                ]
            }
})();