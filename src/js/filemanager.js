/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .directive('fileManager', ['$parse', 'fmConfig', 'fmSrv', fileManager]);

    function fileManager(fmConfig, fmSrv) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: fmConfig.getTemplateUrl('filemanager'),
            link: function (scope, element, attrs) {
                var currentPath = '';
                scope.selectedFiles = [];
                scope.buffer = {};

                scope.$on('fmEvent', function (e, data) {
                    e.stopPropagation();
                    switch (data.type) {
                        case 'copyFiles':
                            scope.buffer.from = currentPath;
                            scope.buffer.copy = true;
                            scope.buffer.files = scope.selectedFiles;
                            return;
                        case 'moveFiles':
                            scope.buffer.from = currentPath;
                            scope.buffer.copy = false;
                            scope.buffer.files = scope.selectedFiles;
                            return;
                        case 'pastFiles':
                            scope.buffer.to = currentPath;
                            fmSrv.past(scope.buffer);
                            return;
                        case 'removeFiles':
                            fmSrv.removeFiles(currentPath, scope.selectedFiles)
                                .then(reloadFiles);
                            return;
                        case 'selectedFiles':
                            scope.selectedFiles = data.selectedFiles;
                            return;
                        case 'selectFolder':
                            currentPath = data.path;
                            reloadFiles();
                            scope.$broadcast('fmChange', {
                                type: 'changeFolder',
                                path: currentPath
                            });
                            return;
                        case 'createFolder':
                            var newFolderPath = currentPath + '/' + data.folderName;
                            fmSrv.folderActions('createfolder',
                                newFolderPath)
                                .then(function () {
                                    scope.$emit('fmEvent', {
                                        type: 'selectFolder',
                                        path: newFolderPath
                                    });
                                });
                            return;
                        case 'removeFolder':
                            fmSrv.folderActions('delfolder',
                                currentPath)
                                .then(function () {
                                    scope.$emit('fmEvent', {
                                        type: 'selectFolder',
                                        path: currentPath.split('/').slice(0, -1).join('/')
                                    });
                                });
                            return;
                        case 'uploadFiles':
                            scope.$broadcast('fmChange', {
                                type: 'uploaded'
                            });
                            fmSrv.upload(data.files, currentPath, function (event) {
                                scope.$broadcast('fmChange', {
                                    type: 'uploadProgress',
                                    progress: event.loaded / event.total * 100
                                });
                            }).then(function () {
                                reloadFiles();
                            });
                            return;
                        case 'refresh':
                            reloadFiles();
                            reloadFolders();
                            return;

                    }
                });

                scope.insert = function () {
                    var newScope;
                    if (attrs.onSelect) {
                        newScope = scope.$parent.$new();
                        newScope.$files = scope.selectedFiles;
                        $parse(attrs.onSelect)(newScope);
                    }
                };

                function reloadFiles() {
                    scope.$broadcast('fmChange', {
                        type: 'reloadFiles',
                        path: currentPath
                    });
                }


                function reloadFolders() {
                    scope.$broadcast('fmChange', {
                        type: 'reloadFolders'
                    });
                }
            }
        };
    }
}());