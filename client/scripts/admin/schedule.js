app.controller('adminScheduleController', ['$scope', 'userService', function($scope, userService){

    $scope.userService = userService;

    $scope.$watch('userService.getUsers()', function (users) {
        $scope.users = users;
    }, true);

    $scope.content = "placeholder for Schedule content";

}]);