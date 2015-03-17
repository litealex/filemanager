(function () {
    'use strict';
    angular.module('fm')
        .controller('NewFolderController', ['$scope', NewFolderController]);

    function NewFolderController($scope) {
        $scope.createFolder = function (folderName) {
            $scope.$emit('fmEvent', {
                type: 'createFolder',
                folderName: folderName
            });
        };
    }

}());