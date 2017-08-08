var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});




app.controller("subirController", function ($scope, $http, $log, fileUpload, investigacions, $timeout, $interval) {
    $scope.myFile = [];
    $scope.progressBar = 0;

    $scope.investigacions = investigacions;
    $scope.investigacion = {};

//    $scope.enviar = function () {
//        $log.log($scope.investigacion);
////                    $uibModalInstance.dismiss(investigacionRespond);
//    };

    var vm = this;

//    vm.disabled = undefined;
    $scope.disabled = false;
    vm.searchEnabled = undefined;

//    vm.setInputFocus = function () {
//        $scope.$broadcast('UiSelectDemo1');
//    };

    $scope.enable = function () {
        $scope.disabled = false;
        alert("enabled");
    };

    $scope.disable = function () {
        $scope.disabled = true;
        alert("disabled");
    };

    vm.enableSearch = function () {
        vm.searchEnabled = true;
    };

    vm.disableSearch = function () {
        vm.searchEnabled = false;
    };

    $scope.clear = function () {
        $scope.person.selected = undefined;
    };

    $scope.peopleObj = {
        '1': {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
        '2': {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
        '3': {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
        '4': {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
        '5': {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
        '6': {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
        '7': {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
        '8': {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
        '9': {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
        '10': {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
    };

    $scope.person = {};

    $scope.person.selectedSingle = 'Samantha';
    $scope.person.selectedSingleKey = '5';
    // To run the demos with a preselected person object, uncomment the line below.
    //vm.person.selected = vm.person.selectedValue;

    $scope.people = [
        {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
        {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
        {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
        {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
        {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
        {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
        {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
        {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
        {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
        {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
    ];

});


