(function() {
  'use strict';
  angular.module('app.auth', []);
})();
(function() {
    'use strict';
    angular
        .module('app.table', []);
})();
(function() {
    'use strict';
    angular.module('app.utils', []);
})();
(function() {
  'use strict';
  angular
    .module('app.core', [
      'ui.router',
      'ngResource',
      'ngMessages',
      'ngMaterial',
      'ngCookies'
    ])
})();

angular.module('app',
    [
        'app.core',
        'app.directives',
        'app.auth',
        'app.students',
        'app.teachers',
        'app.table',
        'app.utils'
    ])
.run(function($http, $cookies, $rootScope, currentUser, $state, $log, authHelper) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

        // Handle exceptions
        $rootScope.$on('$stateChangeError', function() {
            var error = arguments[5];
            // Перекидывание на страницу авторизации
            // if (error instanceof AuthorizationError) {
            //     $state.go('auth');
            // }
            throw error;
        });

        // Упрощенная проверка и прееброс на страницу авторизации
        $rootScope.$on('$stateChangeStart',
         function(evt, next, current) {
             if (next.data && !currentUser.checkPermissions(next.data.permissions)) {
                //  $state.go('auth');
                 authHelper.noPermissionsRedirect(currentUser.getPermissions());
                 evt.preventDefault();
             }
            //  if (next.name == 'auth') return;
            //  currentUser.isLogin()
            //     .catch(function() {
            //         $state.go('auth');
            //         evt.preventDefault();
            //     });
         });

        // $rootScope.$on('AuthorizationError', function (ev, error){
        //     $log.error(error.message);
        //     $state.go('auth');
        // });
    }
);
(function() {
    angular.module('app.directives', []);
})();
(function(){
    'use strict';
    angular.module('app.students', []);
})();

(function() {
    'use strict';
    angular
        .module('app.teachers', []);
})();
(function(){
    angular
        .module('app.auth')
        .controller('AuthController',
            function (authHelper, $log, $state, $mdDialog, currentUser, registerHelper, PERMISSIONS) {
                var vm = this;

                vm.authorize = authorize;
                vm.addStudent = startAddStudentDialog;
                vm.registerTeacher = startAddTeacherDialog;

                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;

                function authorize(formData) {
                    authHelper.login(formData);
                }

                // Запуск диалогового окна добавления студента
                function startAddStudentDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addStudentDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(newStudent) {
                        if (newStudent) {
                            console.log(newStudent);
                        newStudent.token = '12345';
                        newStudent.permissions = PERMISSIONS.STUDENT;
                        registerHelper.register(newStudent)
                            .then(function() {
                                $log.log('Register success!');
                            })
                            .catch(function() {
                                $log.log('Registration failed');
                            });
                        }
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Запуск диалогового окна добавления преподавателя
                function startAddTeacherDialog(ev) {
                    var controller = this;
                    controller.mdDialog.show({
                        controller: 'AuthController',
                        controllerAs: 'auth',
                        templateUrl: 'diaryApp/auth/views/addTeacherDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                    })
                    .then(function(newTeacher) {
                        console.log(newTeacher);
                        newTeacher.token = '12345';
                        registerHelper.register(newTeacher);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                // Обработка подтверждения действия и закрытия диалогового окна
                // objFromDialog (Object) - объект изменений
                function dialogDone(objFromDialog) {
                    this.mdDialog.hide(objFromDialog);
                }

                // Нажатие отмены (закрыть)
                function dialogCancel() {
                    this.mdDialog.cancel();
                }
            }
        ); 
})();
(function() {
  'use strict';
  angular
    .module('app.auth')
    .config(function($stateProvider, PERMISSIONS) {
      $stateProvider
        .state('auth', {
          url: '/auth',
          controller: 'AuthController',
          controllerAs: 'auth',
          templateUrl: 'diaryApp/auth/auth.html',
          data: {
            permissions: [
              PERMISSIONS.GUEST
            ]
          }
        });
    });
})();
(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('authHelper', authHelper);

  function authHelper($state, $q, PERMISSIONS, currentUser) {
    var factory = {
      login: login, // авторизация пользователя
      noPermissionsRedirect: redirectToStartByPermission
    };

    return factory;


    function login(loginData) {
        // Получение permissions
        // ...
// test data
if (loginData.login == 'teacher') loginData.permissions = PERMISSIONS.TEACHER;
if (loginData.login == 'student') loginData.permissions = PERMISSIONS.STUDENT;


        // Заглушка
        if (!loginData.permissions) {
          loginData.permissions = PERMISSIONS.STUDENT;
        }
        // Полученные данные с серва
        var dataFromServer = loginData;

        var deferred = $q.defer();
        if (loginData.permissions != PERMISSIONS.GUEST) {
          currentUser.setData(dataFromServer);
          deferred.resolve(dataFromServer);
        }
        else {
          deferred.reject();
        }
        
        redirectToStartByPermission(loginData.permissions);
        // switch (loginData.permissions) {
        //   case PERMISSIONS.GUEST:   { $state.go('auth'); break; }
        //   case PERMISSIONS.STUDENT: { $state.go('students.profile'); break; }
        //   case PERMISSIONS.TEACHER: { $state.go('teachers.profile'); break; }
        //   case PERMISSIONS.ADMIN:   { $state.go('admin.profile'); break; }
        // }
        
        return deferred.promise;

        // Заглушка на авторизацию
        // if (loginData.login == '777777' && loginData.password == '123') {
        //     return { type: 'student' };
        // }
        // if (loginData.login == 'admin' && loginData.password == '123') {
        //     return { type: 'admin' };
        // }
        // return { type: 'error' };
    }

    function redirectToStartByPermission(permission) {
        switch (permission) {
          case PERMISSIONS.GUEST:   { $state.go('auth'); break; }
          case PERMISSIONS.STUDENT: { $state.go('students.profile'); break; }
          case PERMISSIONS.TEACHER: { $state.go('teachers.profile'); break; }
          case PERMISSIONS.ADMIN:   { $state.go('admin.profile'); break; }
        }
    }
  }
})();

(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    function currentUser(PermissionService, $q, PERMISSIONS, $cookieStore) {
        var currentPermissions = PERMISSIONS.GUEST;
        var currentData = {};
        var factory = {
            // isLogin: isLogin,

            getPermissions: getPermissions,
            setPermissions: setPermissions,
            checkPermissions: checkPermissions,

            setData: setData,
            clearData: clearData,
            logout: logout
        }

        return factory;

        function logout() {
            clearData();
            $cookieStore.remove('token');
        }

        // Устанавливает данные текущему пользователю
        function setData(data) {
            currentData = data;
            currentPermissions = data.permissions ? data.permissions : 0;
            
            $cookieStore.put('token', '12345');
            $cookieStore.put('login', data.login);
            // $cookieStore.put('photo', '');

            // currentData.name = studentData.name;
            // currentData.surname = studentData.surname;
            // currentData.student_card = studentData.student_card;
            // currentData.photo = studentData.photo;

            // currentData.token = studentData.token;
        }

        function clearData() {
            currentData = {};
            setPermissions(PERMISSIONS.GUEST);
        }

        /*
           Проверка доступов
           @param neededPermissions (Array)  необходимые доступы
           @return (bool) Возможность доступа
        */
        function checkPermissions(neededPermissions) {
            if (!getPermissions()) {
                // TODO: Получать permissions с сервера по токену
                // Заглушка
                return $cookieStore.get('token');
            }
            if (neededPermissions) {
                if (neededPermissions.indexOf(getPermissions()) != -1) {
                    return true;
                }
            }
            return false;
        }

        // Возвращает зарезервированное число для доступов
        function getPermissions() {
            return currentPermissions;
        }

        // Устанавливает текущие доступы
        function setPermissions(permissions) {
            currentPermissions = permissions;
        }

        // TODO: использовать метод getGrantedAccess для разделения доступа
        function isLogin() {
            //return false; // mock
            var defered = $q.defer();
            defered.resolve(true);
            // if (true) {
            //   $rootScope.$broadcast(
            //     'AuthorizationError',
            //     new AuthorizationError('Current user is not authorized')
            //   );
            //   defered.reject();
            // }
            return defered.promise;
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('PermissionService', PermissionService);

    function PermissionService(PERMISSIONS) {
        var permissionService = {
            // getPermissions: getPermissions
        }

        return permissionService;

        // function getPermissions() {
            
        // }
    }
})();
(function(){
    angular
        .module('app.auth')
        .constant('PERMISSIONS', {
              GUEST: 0,
            STUDENT: 1,
            TEACHER: 2,
              ADMIN: 3,
        })
        // .constant('GUEST', 0)
        // .constant('STUDENT', 1)
        // .constant('TEACHER', 2)
        // .constant('ADMIN', 3)
})();
(function () {
  'use strict';
  angular
    .module('app.auth')
    .factory('registerHelper', registerHelper);

  function registerHelper(authHelper, currentUser) {
    var factory = {
      register: register
    };

    return factory;

    function register(user) {
        // ... отправка на сервер и проверка
        return authHelper.login(user);
    }
  }
})();

function AuthorizationError(message) {
    this.name = 'AuthorizationError';
    this.message = message;
}
(function() {
    'use strict';
    angular
        .module('app.table')
        .factory('tableHelper', function() {
            var Helper = function (queryOptions) {
                // Список заголовков (название, отображение, ...)
                this.titles = [];
                // Список всех строк таблицы
                this.list = [];
                // Список отображаемых (прошедших фильтр) строк (массив строк)
                this.displayed = [];
                // Фильтр для отсечения лишних строк/заголовков
                this.filter = {
                    textQuery: '',
                    options: {}
                };
            }

            // Добавление заголовков
            Helper.prototype.addTitle = function(name, options) {
                this.titles.push({ name: name, options: options });
            }

            // Добавление строки
            Helper.prototype.addItemRow = function(row) {
                this.list.push(row);
                var displayedRow = [];
                for (var i = 0; i < this.titles.length; i++) {
                    //displayedRow.push(row[this.titles[i].options.label] || '-');
                   
                    var currentValue = {};
                    currentValue.value = row[this.titles[i].options.label];
                    currentValue.options = this.titles[i].options;
                    currentValue.options.titleName = this.titles[i].name;
                    displayedRow.push(currentValue || '');
                }
                this.displayed.push(displayedRow);
            }

            // Получение заголоков
            Helper.prototype.getTitles = function() {
                return this.titles.map(function(title) {
                    return title.name;
                });
            }

            // Получение строк
            Helper.prototype.getRows = function() {
                return this.displayed;
            }

            // Очистить список строк
            Helper.prototype.clearList = function() {
                this.list = [];
                this.displayed = [];
            }

            // Очистить список заголовков
            Helper.prototype.clearHeaders = function() {
                this.titles = [];
            }

            return {
                getInstance: function(queryOptions) {
                    return new Helper(queryOptions);
                }
            }
        });
})();
(function() {
    angular
        .module('app.utils')
        .factory('Utils', function() {
           var factory = {
               getPhotoFromFile: getPhotoFromFile
           };
           return factory;
        });
})();

function getPhotoFromFile(file) {
    if (file) {
        // scope.downloadFile = newFiles[0];
        var reader = new FileReader();
        var promise = new Promise(function(resolve, reject) {
            reader.onload = function(event) {
                resolve(event.target.result);
            }
        });
        reader.readAsDataURL(file);
        return promise;
    }  
}
(function() {
    'use strict';
    angular
        .module('app.utils')
        .factory('PopupService', function($rootScope, $compile) {
            return {
                showPopup: showPopup
            }

            function showPopup(image){
                var element = '<popup-image image-src="' + image + '"></popup-image>';
                angular.element(document.body).append($compile(element)($rootScope));
            }
        });
})();
(function(){
    'use strict';
    angular
        .module('app.core')
        .constant('CONFIG', {
            defaultAvatar: '/assets/images/default_avatar.jpg',
            docPlaceholderImage: '/assets/images/page_white_get.png'
        });
})();
(function(){
    angular
        .module('app')
        .config(['$resourceProvider', function($resourceProvider){
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})();

(function(){
    angular
        .module('app')
        .controller("appController",
            function ($state, authHelper) {
                var vm = this;
                // $state.go('auth');
                // if (!authHelper.isLogin()) {
                //     $state.go('auth');
                // }
            }
        ); 
})();
(function() {
    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            'use strict';
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            
            $stateProvider
                .state('app', {
                    url: '/',
                    //templateUrl: 'diaryApp/mainPage/view.html',
                    template: '<div>main</div>',
                    controller: 'appController',
                    controllerAs: 'main',
                    // redirectTo: 'auth',
                })
                .state('page404', {
                    url: '/404_page_not_found',
                    templateUrl: 'diaryApp/page404/page404.html'
                });
                $urlRouterProvider.otherwise('/404_page_not_found');
        });
})();

 // Директива для подсветки пунктов меню
 angular.module('app.directives').directive('badgeMenu', function ($state) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$stateChangeSuccess', function(){
                badgeCurrentMenuRow(element, attrs.uiSref, $state.current.name);
            });
        }
    }
});

// Проверяет, совпадают ли id пункта меню и параметр текущей страницы
function badgeCurrentMenuRow(element, elemId, currentState) {
    if (currentState.indexOf(elemId) !== -1) {
        element.addClass('active-row');
        element.removeClass('unactive-row');
    }
    else {
        element.removeClass('active-row');
        element.addClass('unactive-row');
    }
}
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
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('calendar', function($window) {
            return {
                restrict: 'E',
                replace: true,
                link: link,
                scope: {
                    getDataByDate: '=',
                    onDayClick: '='
                },
                templateUrl: 'diaryApp/directives/calendar/calendar.html',
                controller: 'CalendarController',
                controllerAs: 'calendar'
            }

            function link(scope, elem, attrs, controller) {
                angular.element($window).bind('scroll', function() {
                    if (window.pageYOffset >= 10) {
                        console.log('fire');
                        // angular.element();
                    }
                })
            }
           
        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('fileDownload', function($timeout, Utils) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    downloadFile: '=',
                    preview: '=',
                    onFileLoad: '='
                },
                templateUrl: 'diaryApp/directives/fileDownload/fileDownload.html',
                compile: compile
            }

            function compile(templateElement, templateAttrs) {
                return {
                    pre: pre,
                    post: post
                }
            }

            function pre(scope, element, attrs) {
                var button = element.find('button');
                button.attr('class', button.attr('class') + ' ' + attrs.buttonClass);
                // button.text(attrs.labelButton);
            }

            function post(scope, element, attrs) {
                var elem = element;
                var id = attrs.id;
                element.find('button').text(attrs.labelButton);
                var fileChooseElem = element.find('input');
                elem.bind('click', function(e) {
                    this.children['download_input'].click();                            
                });
                
                fileChooseElem.bind('change', function(e) {
                    var newFiles = e.target.files;
                    if (newFiles) {
                        scope.downloadFile = newFiles[0];
                        Utils.getPhotoFromFile(scope.downloadFile)
                            .then(function(image) {
                                scope.$apply(function(){
                                    scope.preview = image;
                                    // Вызов колбэка. Передача в аргументах: {0} - файл, {1} - картинка
                                    if (typeof(scope.onFileLoad) == 'function') scope.onFileLoad(scope.downloadFile, scope.preview);
                                });
                            });
                    }     
                });


            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .controller('PopupImageController', function($scope, $timeout, $mdDialog) {
            var vm = this;
            vm.closePopup = closePopup;
            vm.show = show;
            vm.isShow = false;

            // init();

            function closePopup() {
                document.querySelector('#popup_image').remove();
            }

            function show() {
                vm.isShow = true;
            }

            // function init() {
            //     // Задержка для загрузки стилей
            //     $timeout(function(){
            //         isShow = true;
            //     }, 100)
            // }

        });
})();
(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('popupImage', function() {
             return {
                restrict: 'E',
                link: link,
                replace: true,
                controller: 'PopupImageController',
                controllerAs: 'popup',
                templateUrl: 'diaryApp/directives/popupImage/popupImage.html',
                scope: {
                    imageSrc: '@'
                }
            };
        });

        function link(scope, elem, attrs, controller) {
            elem.bind('click', function(e) {
                //controller.openPopupImage(e, attrs.ngSrc, attrs.alt);
                controller.closePopup();
            });
        }
})();
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
(function(){
    angular
        .module('app.students')
        .controller('StudentsProfileController',
            function ($scope, CONFIG, $mdDialog, Utils, PopupService) {
                var vm = this;
                vm.Utils = Utils;
                vm.mdDialog = $mdDialog;
                vm.dialogDone = dialogDone;
                vm.dialogCancel = dialogCancel;
                // Текущий студент. Заглушка
                vm.student = getStudentData();

                vm.showPopupImage = showPopupImage;

                if (!vm.student.photo) {
                    vm.student.preview_img = CONFIG.defaultAvatar;
                }

                vm.startDeleteDocDialog = startDeleteDocDialog;
                vm.startChangePassDialog = startChangePassDialog;
                
                vm.years = [];
                var currentYear = new Date().getFullYear();
                var CountYearsForSelect = 10;
                for (var year = currentYear; year > currentYear - CountYearsForSelect; year--) {
                    vm.years.push(year);
                }

                // Mock for config from server
                vm.config = config;

                vm.startAddDocDialog = startAddDocDialog;

                $scope.docPlaceholder = CONFIG.docPlaceholderImage;
                // Документы пользователя. Заглушка. Будут загружены в методе gteStudentData()
                vm.student.docs = [];


                // TODO: Получение данных студента
                function getStudentData() {
                    return {};
                }

                function showPopupImage(image) {
                    PopupService.showPopup(image);
                }

                function startAddDocDialog(ev) {
                    $mdDialog.show({
                        controller: 'StudentsProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/students/profile/views/addDocDialog.html',
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
                        $scope.profile.student.docs.push(doc);
                    }, function() {
                        // закрыто диалоговое окно
                    });
                }

                function startChangePassDialog(ev) {
                    $mdDialog.show({
                        controller: 'StudentsProfileController',
                        controllerAs: 'profile',
                        templateUrl: 'diaryApp/students/profile/views/changePasswordDialog.html',
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
                    var docs = $scope.profile.student.docs;
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
        // docs: [
        //     {
        //         name: 'Паспорт',
        //         cover: '/assets/images/background.png' //url("/assets/images/background.png")
        //     },
        //     {
        //         name: 'СНИЛС',
        //         cover: '/assets/images/background.png'
        //     },
        // ]
    }
})();
(function(){
    'use strict';
    angular
        .module('app.students')
        .controller('StudentsScheduleController', function($scope, $mdDialog) {
            var vm = this;
            vm.onDayClick = openDayDialog;

            vm.getDayData = getDayData;

            function getDayData(date) {
                // Получение инфы по текущей дате
                // ...
                var data = {};
                var curDate = date.getDate();
                // заглушка и тестовые данные
                if (curDate % 7 == 0) 
                    data = {
                        lessons: [
                            { name: "Практика", time: "11:00", room: "В513" },
                            { name: "ТСП", time: "13:00", room: "В513" },
                            { name: "Техническая подготовка", time: "15:00", room: "В513" }
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
                        controller: 'StudentsScheduleController',
                        controllerAs: 'schedule',
                        templateUrl: 'diaryApp/students/schedule/views/dayDialog.html',
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
        });
})();
(function(){
    angular
        .module('app.students')
        .controller('StudentsController', function(currentUser){
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();
(function() {
  'use strict';
  angular
    .module('app.students')
    .config(function($stateProvider, PERMISSIONS) {
      $stateProvider
        .state('students', {
          url: '/students',
          controller: 'StudentsController',
          controllerAs: 'students',
          templateUrl: 'diaryApp/students/students.html',
          abstract: true,
          data: {
            permissions: [
              PERMISSIONS.STUDENT
            ]
          }
          // resolve: {
          //   isLogin: function(authHelper) {
          //     return authHelper.isLogin();
          //   }
          // }
          // resolve: {
          // //Кидать AuthorizationError <- Error и обрабатывать в run
          //   isGranted: function(permissionService) {
          //     return permissionService.isGrantedAccessToStudent;
          //   }
          // }
        })
          .state('students.profile', {
            url: '/profile/',
            controller: 'StudentsProfileController',
            controllerAs: 'profile',
            templateUrl: 'diaryApp/students/profile/profile.html'
          })
          .state('students.marks', {
            url: '/marks/',
            controller: 'StudentsMarksController',
            controllerAs: 'marks',
            templateUrl: 'diaryApp/students/marks/marks.html'
          })
          .state('students.schedule', {
            url: '/schedule/',
            controller: 'StudentsScheduleController',
            controllerAs: 'schedule',
            templateUrl: 'diaryApp/students/schedule/schedule.html'
          });
    });
})();
(function() {
    angular
        .module('app.students')
        .controller('TeachersDiaryController', function($scope, tableHelper, $mdDialog, PopupService) {
            var vm = this;

            vm.data = testData;
            vm.diaryHelper = tableHelper.getInstance();
            vm.changeParams = changeParams;
            vm.changePresence = changePresence;
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
                            { name: 'Название', options: { label: 'studentName', isDiaryDay: false, editable: false } },
                            { name: '01.09.2016', options: { label: 'date01092016', isDiaryDay: true, editable: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', isDiaryDay: true, editable: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', isDiaryDay: true, editable: true } },
                        ]
                    }, 
                    { 
                        name: 'ТСП',
                        label: 'tsp',
                        titles: [ 
                            { name: 'Название', options: { label: 'studentName', isDiaryDay: false, editable: false } },
                            { name: '01.09.2016', options: { label: 'date01092016', isDiaryDay: true, editable: true } },
                            { name: '02.09.2016', options: { label: 'date02092016', isDiaryDay: true, editable: true } },
                            { name: '03.09.2016', options: { label: 'date03092016', isDiaryDay: true, editable: true } },
                        ]
                    } 
                ],
                students: [
                    {
                        studentName: 'Иванов И. И.',
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
                    },
                    {
                        studentName: 'Петров И. И.',
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
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersProfileController', function() {

        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersScheduleController', function() {

        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .controller('TeachersController', function(currentUser) {
            var vm = this;

            vm.logout = logout;

            function logout() {
                currentUser.logout();
            }
        });
})();
(function() {
    'use strict';
    angular
        .module('app.teachers')
        .config(function($stateProvider, PERMISSIONS) {
            $stateProvider
                .state('teachers', {
                    url: '/teachers',
                    controller: 'TeachersController',
                    controllerAs: 'teachers',
                    templateUrl: 'diaryApp/teachers/teachers.html',
                    abstract: true,
                    data: {
                        permissions: [
                            PERMISSIONS.TEACHER
                        ]
                    }
                })
                .state('teachers.profile', {
                    url: '/profile/',
                    controller: 'TeachersProfileController',
                    controllerAs: 'profile',
                    templateUrl: 'diaryApp/teachers/profile/profile.html'
                })
                .state('teachers.diary', {
                    url: '/diary/',
                    controller: 'TeachersDiaryController',
                    controllerAs: 'diary',
                    templateUrl: 'diaryApp/teachers/diary/diary.html'
                })
                .state('teachers.schedule', {
                    url: '/schedule/',
                    controller: 'TeachersScheduleController',
                    controllerAs: 'schedule',
                    templateUrl: 'diaryApp/teachers/schedule/schedule.html'
                })
        });
})();