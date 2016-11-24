(function() {
    angular
        .module('app.admin')
        .controller('adminController', function(currentUser) {
            var vm = this;
            $scope.data = [
                {
                    number: "1",
                    name:"Ilya324",
                    vzvod:"1",
                    course: "1"
                },
                {
                    number: "2",
                    name:"Roma234",
                    vzvod:"1",
                    course: "2"
                }

            ]
            $scope.remove = function (element) {
                this.data.splice(element,1)
            };
            $scope.add = function () {
                this.data.push(
                    {
                        number: "1",
                        name:"serj1dsa",
                        vzvod:"Radist",
                        course: "1"
                    }
                )
                
            }

        });
})();