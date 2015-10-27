app.controller('adminAvailController', ['$scope', 'userService', function($scope, userService){
    $scope.userService = userService;

    $scope.$watch('userService.getUsers()', function(users) {
        $scope.users = users;
    }, true);

    $scope.content = "place holder for availability view";

}]);