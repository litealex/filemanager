/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .controller('TopMenuController', ['$scope', 'fmSrv', TopMenuController])
        .directive('fmTopMenu', ['fmConfig', fmTopMenu]);

    function TopMenuController($scope, fmSrv) {
        $scope.isCopied = false;

        $scope.$on('fmChange', function (e, data) {
            if (data.type == 'reloadFiles') {
                $scope.isFolderSelected = true;
            }
        });

        $scope.copyFiles = function () {
            $scope.$emit('fmEvent', {type: 'copyFiles'});
            $scope.isCopied = true;
        };
        $scope.moveFiles = function () {
            $scope.$emit('fmEvent', {type: 'moveFiles'});
            $scope.isCopied = true;
        };
        $scope.pastFiles = function () {
            $scope.$emit('fmEvent', {type: 'pastFiles'});
            $scope.isCopied = false;
        };

    }

    function fmTopMenu(fmConfig) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: fmConfig.getTemplateUrl('topmenu'),
            controller: 'TopMenuController'
        };
    }
}());