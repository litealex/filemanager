(function () {
    'use strict';
    angular.module('fm')
        .controller('RigthMenuController', ['$scope', RigthMenuController])
        .directive('fmRightMenu', ['fmConfig', fmRightMenu]);


    function RigthMenuController($scope) {
        $scope.type = 'list';

        $scope.setView = function (viewName) {
            $scope.$emit('fmEvent', {
                type: 'changeView',
                viewName: viewName
            });
        };

        $scope.refresh = function () {
            $scope.$emit('fmEvent', {
                type: 'refresh'
            });
        };
    }

    function fmRightMenu(fmConfig) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: fmConfig.getTemplateUrl('rightmenu'),
            controller: 'RigthMenuController'
        };
    }
}());