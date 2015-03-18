/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .controller('FilesListController', ['$scope', 'fmSrv', FilesListController])
        .directive('fmFilesList', ['fmConfig', fmFilesList]);


    function FilesListController($scope, fmSrv) {
        $scope.viewName = 'list';
        $scope.$on('fmChange', function (e, data) {
            switch (data.type) {
                case 'reloadFiles':
                    fmSrv
                        .loadFiles(data.path + '/')
                        .then(function (files) {
                            $scope.path = data.path;
                            $scope.files = files;
                        });
                    return;
                case 'changeView':
                    $scope.viewName = data.viewName;
                    return;
            }
        });

        $scope.$watch('files', function (files) {
            $scope.$emit('fmEvent', {
                type: 'selectedFiles',
                selectedFiles: (files || []).filter(function (file) {
                    return file.selected;
                })
            });
        }, true);
    }

    function fmFilesList(fmConfig) {
        return {
            restrict: 'E',
            replace: true,
            controller: 'FilesListController',
            templateUrl: fmConfig.getTemplateUrl('fileslist')
        }
    }
}());
