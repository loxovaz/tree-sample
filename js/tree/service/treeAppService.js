angular.module('treeApp').factory('treeAppService', ['$http', function ($http) {

    return {

        saveState: function (model) {
            localStorage.treeModel = angular.toJson(model);
        },

        restoreState: function () {
            return  angular.fromJson(localStorage.treeModel);
        },
        loadData:function () {
            return $http.get('data/tree.json')
                .then(function (res) {
                    return res.data;
                });
        }
    };


}]);