(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function ($scope) {
                var vm = this;
                vm.defaultPhoto = '/assets/images/background.png';

                $scope.student_cover = vm.defaultPhoto;
                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 10;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;
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
        docs: [
            {
                name: 'Паспорт',
                cover: '/assets/images/background.png' //url("/assets/images/background.png")
            },
            {
                name: 'СНИЛС',
                cover: '/assets/images/background.png'
            },
        ]
    }
})();