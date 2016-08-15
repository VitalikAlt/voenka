(function() {
    angular
        .module('app.students')
        .controller('TeachersDiaryController', function(tableHelper) {
            var vm = this;

            vm.data = testData;
            vm.diaryHelper = tableHelper.getInstance();
            vm.changeParams = changeParams;

            

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

            function getStudentsMarks(helper, students) {
                // var rows = students[vm.currentSubject.label];
                for (var i = 0; i < students.length; i++) {
                    var row = students[i][vm.currentSubject.label];
                    row.studentName = students[i].studentName;
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
                            { name: 'Название', options: { label: 'studentName', show: true } },
                            { name: '01.09.2016', options: { label: 'date01092016', show: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', show: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', show: true } },
                        ]
                    }, 
                    { 
                        name: 'ТСП',
                        label: 'tsp',
                        titles: [ 
                            { name: 'Название', options: { label: 'studentName', show: true } },
                            { name: '01.09.2016', options: { label: 'date01092016', show: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', show: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', show: true } },
                        ]
                    } 
                ],
                students: [
                    {
                        studentName: 'Иванов И. И.',
                        vsp: {
                            date01092016: 3,
                            date02092016: 3,
                            date03092016: 3 
                        },
                        tsp: {
                            date01092016: 4,
                            date02092016: 'н',
                            date03092016: 5 
                        },
                    },
                    {
                        studentName: 'Петров И. И.',
                        vsp: {
                            date01092016: 5,
                            date02092016: 'н',
                            date03092016: 'н'
                        },
                        tsp: {
                            date01092016: 2,
                            date02092016: 5,
                            date03092016: 3 
                        },
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