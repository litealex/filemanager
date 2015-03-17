(function () {
    'use strict';
    angular.module('fm')
        .controller('UploadController', ['$scope', 'fmSrv', UploadController]);


    function UploadController($scope, fmSrv) {
        $scope.files = [];
        $scope.addToList = function (files) {
            $scope.files = $scope.files.concat(files);
        };

        $scope.upload = function (files) {
            $scope.$emit('fmEvent',{
                type:'uploadFiles',
                files: files
            });
        };

        $scope.$on('fmChange',function(e,data){
            if(data.type==='uploaded'){
                $scope.uploading = false;
                $scope.close();
            }
        });

        $scope.remove = function (i) {
            $scope.files.splice(i, 1);
        };
    }
}());