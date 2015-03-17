(function(){
    'use strict';
    angular.module('fm')
        .controller('RemoveConfirmController',['$scope',RemoveConfirmController]);

    function RemoveConfirmController($scope){
        $scope.remove = function () {
            $scope.$emit('fmEvent', {
                type: $scope.data.remove
            });
            $scope.close();
        }
    }
}());