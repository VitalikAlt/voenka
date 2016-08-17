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
                    onLoad: '='
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
                                    if (typeof(scope.onLoad) == 'function') scope.onLoad(scope.downloadFile, scope.preview);
                                });
                            });
                    }     
                });


            }
        });
})();