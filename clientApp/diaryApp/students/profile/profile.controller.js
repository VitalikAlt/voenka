(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function ($scope, CONFIG) {
                var vm = this;
                // Текущий студент. Заглушка
                vm.student = getStudentData();

                if (!vm.student.photo) {
                    vm.student.preview_img = CONFIG.defaultAvatar;
                }
                
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
    
    // TODO: Получение данных студента
    function getStudentData() {
        return {};
    }

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