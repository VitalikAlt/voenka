/**
 * Created by Виталий on 15.09.2016.
 */
angular.module('app', []);

angular.module('app').controller('main', function($scope, $http) {
    $scope.SendPass = function () {
        if ($scope.pass === '123') {
            console.log('1');
        }
    }
});