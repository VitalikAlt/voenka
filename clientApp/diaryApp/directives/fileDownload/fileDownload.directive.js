(function() {
    'use strict';
    angular
        .module('app.directives')
        .directive('fileDownload', function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    downloadFile: '=',
                    preview: '='
                },
                templateUrl: 'diaryApp/directives/fileDownload/fileDownload.html',
                compile: compile
            }
        });

        function compile(templateElement, templateAttrs) {
            return {
                pre: pre,
                post: post
            }
        }

        function pre(scope, element, attrs) {
            
        }

        function post(scope, element, attrs) {
            var elem = element;
            var id = attrs.id;
            var button = element.find('button');
            var fileChooseElem = element.find('input');

            elem.bind('click', function(e) {
                this.children['download_input'].click();                            
            });
            
            fileChooseElem.bind('change', function(e) {
                var newFiles = e.target.files;
                if (newFiles) {
                    scope.downloadFile = newFiles[0];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        scope.$apply(function() {
                            scope.preview = event.target.result;
                        });
                    }
                    reader.readAsDataURL(newFiles[0]);
                    
                }     
            });
        }
})();