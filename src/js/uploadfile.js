(function () {
    'use strict';
    angular.module('fm')
        .directive('fmUploadFile', ['$parse', fmUploadFile])
    function fmUploadFile($parse) {
        var $file = angular.element('<input style="display: none" multiple="multiple" type="file"/>'),
            $body = angular.element(document.body);
        return {
            scope: true,
            link: function (scope, element, attrs) {
                $body.append($file);
                $file.on('change', function (e) {
                    scope.$files = Array.prototype.slice.call(this.files);
                    scope.$apply(function () {
                        $parse(attrs.fmUploadFile)(scope);
                    });
                });
                element.on('click', function () {
                    if($file[0].click){
                        $file[0].click()
                    }else if($file[0].onclick) {
                        $file[0].onclick();
                    }
                });
            }
        }
    }
}());