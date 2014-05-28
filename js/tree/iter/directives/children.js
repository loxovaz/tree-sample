angular.module('treeApp').directive('children', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            children: '='
        },
        template: "<child ng-repeat='child in children' child='child'></child>"
    }
});