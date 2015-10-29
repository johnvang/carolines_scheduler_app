app.controller('adminChangeController', ['$scope', '$http', 'userService' , function($scope, $http, userService){

    $scope.userService = userService;

    $scope.$watch('userService.getUsers()', function (users) {
        $scope.users = users;
    }, true);


    $scope.changes = [];

    $scope.$watch('userService.getUsers()', function (changes) {
        $scope.changes = changes;
    }, true);

    $http.get('/changes', {withCredentials: true}).then(function(response) {
        $scope.changes = response.data;
    }, function(err) {
        console.log(err);
    });

    $scope.confirmDone = function(change){
        if (confirm("Permanently remove request from list?") == true){
            $scope.changeRemove(change);
        } else {
            return false;
        }
    };

    $scope.changeRemove = function(change){
        $http.delete('/changes/' + change._id, {withCredentials: true}).then(function (response){
            var index = $scope.changes.indexOf(change);
            if (index > -1){
                $scope.changes.splice(index,1);
            }
        });
    };

}]);
