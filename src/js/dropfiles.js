(function () {
    'use strict';
    angular.module('fm')
        .directive('fmDropFiles', ['$parse', '$compile', fmDropFiles]);


    function fmDropFiles($parse, $compile) {
        return {
            scope: true,
            link: function (scope, element, attrs) {
                //element
                //    .on('dragleave', function () {
                //    });

                //element[0].ondrop

                element[0].ondragover  = function(e){
                    return false;
                };

                element[0].ondragleave  = function(e){
                    return false;
                };

                element[0].ondrop = function(e){
                    e.preventDefault();
                    scope.$files = Array.prototype.slice.call(e.dataTransfer.files);
                    scope.$apply(function () {
                        $parse(attrs.fmDropFiles)(scope);
                    });

                    return false;
                };
/*
                element
                    .on('dragleave', function () {
                        element.removeClass('aaa');
                        return false;
                    })
                    .on('dragover', function () {
                        element.addClass('aaa');

                        return false;
                    }).on('drop', function (e) {
                        e.preventDefault();
                        alert();
                        scope.$files = Array.prototype.slice.call(e.originalEvent.dataTransfer.files);
                        scope.$apply(function () {
                            $parse(attrs.fmDropFiles)(scope);
                        });
                        return false;
                    });
*/
                scope.$on('fmEndUploading', function () {
                });
            }
        };
    }
}());