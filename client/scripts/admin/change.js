app.controller('adminChangeController', ['$scope', '$http', 'userService' , function($scope, $http, userService){

    $scope.userService = userService;

    $scope.changes = [];

    $http.get('/changes', {withCredentials: true}).then(function(response) {
        $scope.changes = response.data;
        console.log(response.data);
    }, function(err) {
        $log.info(err);
    });


    $scope.$watch('userService.getUsers()', function (users) {
        $scope.users = users;
    }, true);

    $scope.content = "placeholder for change request content";

}]);