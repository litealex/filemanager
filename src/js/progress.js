(function(){
    'use strict';

    angular.module('fmProgress',['fmConfig',fmProgress])
    function fmProgress(fmConfig) {
        return {
            scope: true,
            templateUrl: fmConfig.getTemplateUrl('progress'),
            link: function (scope, element, attrs) {
                scope.$on(attrs.fmProgress, function (e, val) {
                    if (typeof val === 'number') {
                        scope.visible = true;
                        scope.progress = val.toFixed(2);
                    } else {
                        scope.visible = false;
                    }

                });
            }
        };
    }
}());