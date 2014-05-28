// Init main app modules
angular.module('treeApp',[]).run(["$templateCache","$http", function($templateCache,$http) {
    $http.get('js/tree/component/child/views/childTemplate.html').then(function(response) {
        $templateCache.put('treeItemTemplate', response.data);
        return response;
    });

}]);