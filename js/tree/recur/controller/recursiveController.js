angular.module('treeApp').controller('iterativeController', ['$scope','treeAppService', function ($scope,treeAppService) {
    //Copy paste in order to have two copies of data
    treeAppService.loadData().then(function (data) {
        $scope.data = data;
    });
    $scope.restoreState = function () {
        $scope.data = treeAppService.restoreState();
    };

}]);