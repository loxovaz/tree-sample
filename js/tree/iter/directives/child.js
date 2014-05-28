angular.module('treeApp').directive('child', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            child: '='
        },
        templateUrl:'treeItemTemplate',
        link: function (scope, element, attrs) {
            /** DOM building **/
            var collapseIcon,appendChildren;
            appendChildren = function(){
                collapseIcon = element.find(".expand-icon");
                element.find('.panel-body ul').append("<children children='child.children'></children>");
                $compile(element.contents())(scope);
                element.find("[data-toggle]").on('click',function(e){
                    collapseIcon.toggleClass('glyphicon-minus-sign glyphicon-plus-sign');
                });
            };
            if (angular.isArray(scope.child.children)) {
                appendChildren();
            }

            /** Item's Action  Listeners **/
            element.find("span.add").on('click',function(e){
                var newChild = {name:"New leaf",editMode:true};
                if(!scope.child.children){
                    scope.child.children = [newChild];
                    appendChildren();
                }else{
                    scope.child.children.push(newChild);
                }

                scope.$digest();
                e.preventDefault();
                return false;
            });
            element.find("span.edit").on('click',function(e){
                scope.child.editMode=true;
                scope.$digest();
            });
            element.find("span.save").on('click',function(e){
                delete scope.child.editMode;
                scope.$digest();
            });
            element.find("span.delete").on('click',function(e){
                scope.$emit('child:delete',scope.child);
                e.preventDefault();
                return false;
            });
            /** Model Listeners **/
            scope.$on('child:delete',function(e,child) {
                if(e.targetScope == e.currentScope) return;
                var index = scope.child.children.indexOf(child);
                if (index > -1) {
                    scope.child.children.splice(index, 1);
                    scope.$digest();
                }
                e.stopPropagation();
            });
        }
    }
});