(function () {
    'use strict';
    angular.module('fm')
        .directive('fmFile', ['fmConfig', fmFile]);

    function fmFile(fmConfig) {
        var imgExtensions = fmConfig.imgExtensions,
            prefix = fmConfig.extensionPrefix512;
        return {
            scope: true,
            templateUrl: fmConfig.getTemplateUrl('file'),
            link: function (scope, element, attrs) {
                var file = attrs.fmFile,
                    ext = (file.split('.').pop() || '').toLowerCase();

                if (imgExtensions.indexOf(ext) == -1) {
                    scope.file = prefix + ext + '.png';
                    element.find('img').on('error', function () {
                        this.src = prefix + '_blank.png';
                    });
                } else {
                    scope.file = attrs.fmFilePrefix + '/' + file;
                }
            }
        };
    }
}());