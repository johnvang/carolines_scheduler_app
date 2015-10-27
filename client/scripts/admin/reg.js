app.controller('adminRegController', ['$scope', 'userService', function($scope, userService) {

    $scope.userService = userService;

    $scope.$watch('userService.getUsers()', function (users) {
        $scope.users = users;
    }, true);

    $scope.content = "placeholder for Reg content";

    $scope.student = {};

    $scope.createStudent = function(){
        console.log('in create student function');
        console.log($scope.student);
        userService.create($scope.student, function(){
          $scope.student = {};
        });
    };

    $scope.removeUser = function(user){
       userService.remove(user);
    };

    $scope.confirmRemove = function(user){
        console.log('in confirm remove funtion');
        if (confirm("Are you sure you want to permanently remove this worker?") == true){
            $scope.removeUser(user);
        } else {
            return false;
        }
    };

    //ajax calls here
    //$.ajax('/students'/, function(data){
    // studentService.add(data);
    //});

}]);

