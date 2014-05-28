angular.module('treeApp').directive('tree',['$compile','$templateCache','uuidService', function ($compile,$templateCache,uuidService) {
    return {
        restrict: "E",
        terminal:true,
        scope: {
            child: '='
        },
        link: function (scope, element, attrs) {
            scope.isRoot = (scope.child.uuidKey==undefined);
            if(!scope.isRoot){
                element.append($compile(angular.element($templateCache.get('treeItemTemplate')))(scope));
            }
            /** Item's Action  Listeners **/
            element.find("span.add").on('click', function (e) {
                var newChild = {name: "New leaf", editMode: true};
                if (!scope.child.children) {
                    scope.child.children = [newChild];
                } else {
                    scope.child.children.push(newChild);
                }
                appendChild(newChild);
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
                scope.$destroy();
                e.preventDefault();
                return false;
            });
            /** DOM building **/
            var collapseIcon,createChildren,appendChild,body = scope.isRoot?element:element.find(".panel-body ul");
            appendChild = function(child){
                var uuidKey = uuidService.nextUid();
                child.uuidKey = uuidKey;
                scope[uuidKey] = child;
                body.append($compile(angular.element('<tree child="'+uuidKey+'"></tree>'))(scope));
            };
            createChildren = function(children){
                angular.forEach(children, function(value, key) {
                    appendChild(value);
                });
                collapseIcon = element.find(".expand-icon");
                element.find("[data-toggle]").on('click',function(e){
                    collapseIcon.toggleClass('glyphicon-minus-sign glyphicon-plus-sign');
                });
            };
            if (angular.isArray(scope.child.children)) {
                createChildren(scope.child.children);
            }

            /** Model Listeners **/
            scope.$on('child:delete',function(e,child) {
                if(e.targetScope == e.currentScope) return;
                var index = scope.child.children.indexOf(child);
                if (index > -1) {
                    scope.child.children.splice(index, 1);
                    delete scope[child.uuidKey];
                    body.find('tree[child='+child.uuidKey+']').remove();
                }
                scope.$digest();
                e.stopPropagation();
            });

            if(scope.isRoot){
                scope.$watch('child.children', function(newValue, oldValue) {
                    if(angular.equals(newValue,oldValue)){
                        return;
                    }
                    console.log('child',newValue,oldValue);
                    if(oldValue){
                        body.empty();
                        if (angular.isArray(newValue)) {
                            createChildren(newValue);
                        }
                    }

                });
            }

        }
    }
}]);