app.controller('adminScheduleController', ['$scope', 'userService', function($scope, userService){

    $scope.userService = userService;

    var hasRegistered = false;
    $scope.$watch('userService.getUsers()', function(users) {
        $scope.users = users;
        if (hasRegistered) return;
        hasRegistered = true;
        $scope.$$postDigest(function(){
            hasRegistered = false;
            console.log($scope.users);
        });
    }, true);

    console.log($scope.users);

}]);