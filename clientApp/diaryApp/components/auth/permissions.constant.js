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