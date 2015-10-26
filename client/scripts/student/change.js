/**
 * Created by johnvang on 10/25/15.
 */
app.controller("studChangeController", ['$scope', '$http', function($scope, $http){

    $scope.change = {};

    $scope.addChangeReq = function(){
        console.log($scope.change);

        $http.post('/changes', $scope.change, {withCredentials: true}).then(function(response){
           alert("Your change request has been submitted.");
            $scope.change = {};
        }, function(err){
            console.log(err);
        });
    }



}]);