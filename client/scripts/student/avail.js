app.controller("studAvailController", ['$scope', '$http', function($scope, $http){

    $scope.targetHours = "";

    $scope.addHours = function(){
        console.log($scope.targetHours);
        var hoursAvail = {
            mon1start: $scope.mon1start,
            mon1end: $scope.mon1end,
            mon2start: $scope.mon2start,
            mon2end: $scope.mon2end
        };
        console.log(hoursAvail);
    };

}]);