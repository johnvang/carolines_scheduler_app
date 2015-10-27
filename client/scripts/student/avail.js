app.controller("studAvailController", ['$scope', '$http', function($scope, $http){

    $scope.targetHours = "";
    $scope.hoursAvail = {};

    $scope.addHours = function(){
        console.log();
        $scope.hoursAvail = [{
            mon1start: $scope.mon1start,
            mon1end: $scope.mon1end,
            mon2start: $scope.mon2start,
            mon2end: $scope.mon2end,
            tue1start: $scope.tue1start,
            tue1end: $scope.tue1end,
            tue2start: $scope.tue2start,
            tue2end: $scope.tue2end,
            wed1start: $scope.wed1start,
            wed1end: $scope.wed1end,
            wed2start: $scope.wed2start,
            wed2end: $scope.wed2end,
            thu1start: $scope.thu1start,
            thu1end: $scope.thu1end,
            thu2start: $scope.thu2start,
            thu2end: $scope.thu2end,
            fri1start: $scope.fri1start,
            fri1end: $scope.fri1end,
            fri2start: $scope.fri2start,
            fri2end: $scope.fri2end
        }];
        console.log($scope.targetHours);
        console.log($scope.hoursAvail);

        $http.put('/users/hoursAvail', $scope.hoursAvail, {withCredentials: true}).then(function(response){
            alert("hoursAvail added to user profile");
            $scope.hoursAvail = {};
        }, function(err){
            console.log(err);
        });
    };

}]);