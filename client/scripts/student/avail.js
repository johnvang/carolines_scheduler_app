app.controller("studAvailController", ['$scope', '$http', function($scope, $http){

    $scope.targetHours = "";
    $scope.hoursAvail = [];

    initHoursAvail();

    function initHoursAvail(){
        var list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        for (var i=0; i<list.length; i++){
            var temp = {
                day: list[i],
                first: {
                    start: null,
                    end: null
                },
                second: {
                    start: null,
                    end: null
                }
            };
            //temp.day = list[i];
            $scope.hoursAvail.push(temp);
        }
        console.log($scope.hoursAvail);
    }

    //this parses payload from get/users/current req below to get times into correct format
    function setHoursAvail(avail){
        //var hours = [];
        var i = 0;
        for (i=0; i < avail.length; i++) {
            var hourObj = avail[i];
            var obj = $scope.hoursAvail[i];
            console.log(hourObj);
            if(hourObj.first.start !== null)
                obj.first.start = new Date(hourObj.first.start);
            if(hourObj.first.end !== null)
                obj.first.end = new Date(hourObj.first.end);
            if(hourObj.second.start !== null)
                obj.second.start = new Date(hourObj.second.start);
            if(hourObj.second.end !== null)
                obj.second.end = new Date(hourObj.second.end);
        }
    }

    //get call for hours avail info, if any
    $http.get('/users/current', {withCredentials: true}).then(function(res){
        console.log(res);
        $scope.targetHours = res.data.targetHours;
        var hours = res.data.hoursAvail;
        if(hours.length > 0){
            setHoursAvail(hours);
        }
    }, function(err){
        console.log(err);
    });


    $scope.addHours = function(){
        console.log($scope.hoursAvail);
        $http.put('/users/hoursAvail', { targetHours: $scope.targetHours, hoursAvail: $scope.hoursAvail}, {withCredentials: true}).then(function(res){
            console.log(res);
        }, function(err){
            console.log(err);
        });
    };


}]);

