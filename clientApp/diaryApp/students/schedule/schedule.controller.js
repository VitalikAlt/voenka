(function(){
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsScheduleController', function() {
            var vm = this;

            vm.currentPageMonth = [];
            vm.currentDate = new Date();
            vm.weekDays = [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ]
            
            var countDaysInPage = 35; // 7 x 5  (для календаря)
            init();

            function init() {
                var today = new Date();
                vm.currentPageMonth = generateDaysPage(today.getMonth(), today.getFullYear());
            }

            // Получить последний день месяца
            function getLastDayInMonth(month, year) {
                return (new Date(year, month + 1, 0));
            }

            // Сгенерировать страницу календаря
            function generateDaysPage(month, year) {
                var startMonthDay = new Date(year, month, 1).getDay();
                // var endMonthDay = getLastDayInMonth(month, year).getDay();
                var endMonthDay = getLastDayInMonth(month, year).getDate();

                var monthDays = [];
                var weekDays = [];

                for (var i = 0; i < countDaysInPage; i++) {
                    if (i < startMonthDay || i > endMonthDay) {
                        weekDays.push({});
                    }
                    else {
                        weekDays.push({
                            date: new Date(year, month, i), // текушая дата
                            data: getDayData(new Date(year, month, i)) // информация текущего дня
                        });
                    }
                    if ((i + 1) % 7 == 0) {
                        monthDays.push(weekDays);
                        weekDays = [];
                    }
                }
                monthDays.push(weekDays);
                return monthDays;
            }

            function getDayData(date) {
                // Получение инфы по текущей дате
                var data = {};
                var curDate = date.getDate();
                if (curDate % 9 == 0) 
                    data = {
                        lessons: [
                            { name: "ТСП", time: "15:00", room: "В513" },
                            { name: "ТСП", time: "15:00", room: "В513" }
                        ]
                    }
                return data;
            }
        });
})();