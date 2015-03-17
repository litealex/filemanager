/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .controller('FilesListController', ['$scope', 'fmSrv', FilesListController])
        .directive('fmFilesList', ['fmConfig', fmFilesList]);


    function FilesListController($scope, fmSrv) {
        $scope.$on('fmChange', function (e, data) {
            if (data.type === 'reloadFiles') {
                fmSrv
                    .loadFiles(data.path)
                    .then(function (files) {
                        $scope.files = files;
                    });
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
            templateUrl: fmConfig.getTemplateUrl('fileslist'),
            link: function () {
            }
        }
    }
}());
