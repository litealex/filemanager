/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .controller('FoldersTreeController', ['$scope', 'fmSrv', FoldersTreeController])
        .directive('fmFoldersTree', ['fmConfig', fmFoldersTree]);

    function FoldersTreeController($scope, fmSrv) {
        var activeFolderPath = '';
        $scope.reload = function () {
            fmSrv.getFolders()
                .then(function (tree) {
                    if (!activeFolderPath) {
                        $scope.select(tree);
                    }
                    $scope.node = tree;
                });
        };

        $scope.toggleExpand = function (node) {
            node.expanded = !node.expanded;
        };

        $scope.select = function (node) {
            $scope.$emit('fmEvent', {
                type: 'selectFolder',
                path: node.fullPath
            });
        };

        $scope.isActive = function (node) {
            if (!node) {
                return false;
            }
            return node.fullPath == activeFolderPath;
        };

        $scope.reload();


        $scope.$on('fmChange', function (e, data) {
            switch (data.type) {
                case 'changeFolder':
                    activeFolderPath = data.path;
                    return;
                case 'reloadFolders':
                    $scope.reload();
                    return;
            }
        });
    }

    function fmFoldersTree(fmConfig) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: 'FoldersTreeController',
            templateUrl: fmConfig.getTemplateUrl('foldersTree'),
            link: function () {
            }
        };
    }
}());
