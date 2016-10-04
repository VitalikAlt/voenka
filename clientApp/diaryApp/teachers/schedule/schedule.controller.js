(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersScheduleController', function($scope, $mdDialog) {
            var vm = this;
            vm.onDayClick = openDayDialog;

            vm.getDayData = getDayData;
            vm.dialogCancel = dialogCancel;

            function getDayData(date) {
                // Получение инфы по текущей дате
                // ...
                var data = {};
                var curDay = date.getDay();
                // заглушка и тестовые данные
                if (curDay % 6 != 0) 
                    data = {
                        lessons: [
                            { name: "Практика", time: "11:00", room: "В513", troop: "1 взвод" },
                            { name: "ТСП", time: "13:00", room: "В513", troop: "1 взвод" },
                            { name: "Техническая подготовка", time: "15:00", room: "В513", troop: "2 взвод" }
                        ]
                    }
                return data;
            }

            function openDayDialog(ev, dayData) {
                if (!dayData.data) return;

                var newScope = $scope.$new();
                newScope.dayData = dayData;
                $mdDialog.show({
                        scope: newScope,
                        controller: 'TeachersScheduleController',
                        controllerAs: 'schedule',
                        templateUrl: 'diaryApp/teachers/schedule/views/dayDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function() {
                        // console.dir(dayData);
                    }, function() {
                        // закрыто диалоговое окно
                    });
            }

            function dialogCancel() {
                $mdDialog.cancel();
            }
        });
})();