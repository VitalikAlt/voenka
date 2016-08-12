(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('CalendarController', function($scope) {
            var vm = this;
            vm.currentPageMonth = [];
            vm.currentDate = new Date();
            vm.currentMonth = vm.currentDate.getMonth();
            vm.currentYear = vm.currentDate.getFullYear();
            vm.changePeriod = changePeriod;
            vm.compareDates = compareDates;

            vm.weekDays = [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ];
            vm.months = [
                'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
            ];
            vm.years = getYears();

            var countDaysInPage = 35;
            init();

            function init() {
                var today = new Date();
                vm.currentPageMonth = generateDaysPage(today.getMonth(), today.getFullYear());
            }

            function compareDates(date1, date2) {
                if (date1 && date2) {
                    return date1.getFullYear() == date2.getFullYear() &&
                           date1.getMonth() == date2.getMonth() &&
                           date1.getDate() == date2.getDate();
                }
               return false;
            }

            function changePeriod() {
                vm.currentPageMonth = generateDaysPage(vm.currentMonth, vm.currentYear);
            }

            function getYears() {
                var currentYear = new Date().getFullYear();
                return [ currentYear - 1, currentYear, currentYear + 1];
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

                for (var i = 0; i < startMonthDay + endMonthDay; i++) {
                    // Дата с учетом сдвига
                    var offsetDate = i - startMonthDay + 1;
                    if (i < startMonthDay || offsetDate > endMonthDay) {
                        weekDays.push({});
                    }
                    else {
                        weekDays.push({
                            date: new Date(year, month, offsetDate), // текушая дата
                            data: $scope.getDataByDate(new Date(year, month, offsetDate)) // информация текущего дня
                        });
                    }
                    // Добавление недели
                    if (weekDays.length == 7) {
                        monthDays.push(weekDays);
                        weekDays = [];
                    }
                }
                for (var i = weekDays.length; i < 7; i++) {
                    weekDays.push({});
                }
                monthDays.push(weekDays);
                return monthDays;
            }
        });
})();