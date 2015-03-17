/**
 * Created by alexander on 15.03.2015.
 */
(function () {
    'use strict';
    angular.module('fm')
        .service('fmSrv', ['$http', '$rootScope', '$q', 'fmConfig', fmSrv]);

    function fmSrv($http, $rootScope, $q, fmConfig) {

        this.getFolders = function () {
            return $http({
                url: fmConfig.actionsUrl,
                method: 'GET'
            }).then(function (resp) {
                return prepareFolders(resp.data, resp.data.prefix, 0);
            });
        };

        this.loadFiles = function (path) {
            return $http({
                url: fmConfig.actionsUrl,
                params: {
                    virtualpath: path
                },
                method: 'GET'
            }).then(function (res) {
                return res.data.files;
            });
        };

        this.past = function (buffer) {
            return $http({
                url: fmConfig.actionsUrl,
                method: 'POST',
                params: {
                    c: buffer.copy ? 'copy' : 'move',
                    virtualpath: buffer.to,
                    addInfo: JSON.stringify({
                        files: buffer.files
                            .map(function (file) {
                                return file.name
                            }),
                        from: buffer.from
                    })
                }
            });
        };

        this.folderActions = function (action, path) {
            return $http({
                url: fmConfig.actionsUrl,
                method: 'POST',
                params: {
                    virtualpath: path,
                    c: action
                }
            });
        };

        this.upload = function (files, path, progress) {
            var fd = new FormData(),
                xhr = new XMLHttpRequest();

            fd.append('virtualpath', path);
            fd.append('c', 'upload');
            files.forEach(function (file) {
                fd.append('files[]', file);
            });

            xhr.open('POST', fmConfig.actionsUrl);

            return $q(function (resolve, reject) {
                xhr.onload = function () {
                    resolve(xhr.responseText);
                };
                xhr.upload.onprogress = function () {
                    if (!$rootScope.$$phase)
                        $rootScope.$apply(function () {
                            (progress || angular.noop).apply(this, arguments);
                        });
                };
                xhr.onerror = reject;
                xhr.send(fd);
            });
        };

        this.removeFiles = function (path, selectedFiles) {
            return $http({
                url: fmConfig.actionsUrl,
                method: 'POST',
                params: {
                    c: 'del',
                    virtualpath: path,
                    addInfo: JSON.stringify(getFilesNames(selectedFiles))
                }
            });
        };

    }

    function getFilesNames(files) {
        return files.map(function (item) {
            return item.name;
        });
    }

    function prepareFolders(node, prefix, level) {
        node.fullPath = prefix + node.name;
        node.level = level;
        node.expanded = true;
        node.folders.forEach(function (folder) {
            prepareFolders(folder, node.fullPath + '/', level + 1);
        });
        return node;
    }
}());