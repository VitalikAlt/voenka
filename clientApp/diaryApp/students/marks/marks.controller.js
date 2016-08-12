(function() {
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsMarksController', function($scope, tableHelper) {
            var vm = this;
            vm.marksHelper = tableHelper.getInstance();
            vm.standartsHelper = tableHelper.getInstance();
            // $scope.marks = vm;
            vm.summary = getSummary();

            init();


            function init() {
                getTableTitles(vm.marksHelper, config.marks);
                getTableList(vm.marksHelper, config.marks);

                getTableTitles(vm.standartsHelper, config.standarts);
                getTableList(vm.standartsHelper, config.standarts);
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
            function getTableTitles(helper, resource) {
                // получение заголовков
                // ...
                var titles = resource.titles; // заглушка
                for (var i = 0; i < titles.length; i++) {
                    helper.addTitle(titles[i].name, titles[i].options);
                }
            }
            function getTableList(helper, resource) {
                // получение строк
                // ...
                var rows = resource.rows; // заглушка
                for (var i = 0; i < rows.length; i++) {
                    helper.addItemRow(rows[i]);
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
        });

         // Тестовый конфиг. имитация данных
        var config = {
            marks: {
                titles: [
                    { name: 'Название', options: { label: 'nameSubject', show: true } },
                    { name: '1 семестр', options: { label: 'semestr1', show: true } },
                    { name: '2 семестр', options: { label: 'semestr2', show: true } },
                    { name: '3 семестр', options: { label: 'semestr3', show: true } },
                    { name: '4 семестр', options: { label: 'semestr4', show: true } },
                    { name: '5 семестр', options: { label: 'semestr5', show: true } },
                    { name: '6 семестр', options: { label: 'semestr6', show: true } },
                    { name: '7 семестр', options: { label: 'semestr7', show: true } },
                    { name: '8 семестр', options: { label: 'semestr8', show: true } }
                ],
                rows: [
                    { nameSubject: 'ВСП', semestr1: 4, semestr2: 5 },
                    { nameSubject: 'ТСП', semestr1: 5, semestr2: 3 }
                ]
            },
            standarts: {
                titles: [
                    { name: 'Название', options: { label: 'nameStandart', show: true } },
                    { name: '1 семестр', options: { label: 'semestr1', show: true } },
                    { name: '2 семестр', options: { label: 'semestr2', show: true } },
                    { name: '3 семестр', options: { label: 'semestr3', show: true } },
                    { name: '4 семестр', options: { label: 'semestr4', show: true } },
                    { name: '5 семестр', options: { label: 'semestr5', show: true } },
                    { name: '6 семестр', options: { label: 'semestr6', show: true } },
                    { name: '7 семестр', options: { label: 'semestr7', show: true } },
                    { name: '8 семестр', options: { label: 'semestr8', show: true } }
                ],
                rows: [
                    { nameStandart: 'Подтягивания', semestr1: 14, semestr2: 15 },
                    { nameStandart: 'Бег 100 м', semestr1: '10.7 с', semestr2: '11 с' },
                    { nameStandart: 'Бег 1000 м', semestr1: '3.40 м' }
                ]
            },
        }
                
})();