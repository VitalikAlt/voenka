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