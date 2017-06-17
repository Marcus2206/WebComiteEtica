var app=angular.module("app");

app.run(["$rootScope", "editableOptions",function($rootScope, editableOptions) {
    editableOptions.theme = 'bs3';
}]);