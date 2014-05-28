angular.module('treeApp').controller('treeController', ['$scope', 'treeAppService', function ($scope, treeAppService) {

    $scope.saveState = function (data) {
        treeAppService.saveState(data);
    };
}]);