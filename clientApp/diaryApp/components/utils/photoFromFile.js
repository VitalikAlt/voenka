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