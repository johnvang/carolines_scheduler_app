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
        $http.put('/users/hoursAvail', {
            targetHours: $scope.targetHours,
            hoursAvail: $scope.hoursAvail
        }, {withCredentials: true}).then(function(res){
            console.log(res);
        }, function(err){
            console.log(err);
        });
    };


}]);









//$scope.addHours = function(){
//    console.log();
//    $scope.hoursAvail = {
//        mon1start: $scope.mon1start,
//        mon1end: $scope.mon1end,
//        mon2start: $scope.mon2start,
//        mon2end: $scope.mon2end,
//        tue1start: $scope.tue1start,
//        tue1end: $scope.tue1end,
//        tue2start: $scope.tue2start,
//        tue2end: $scope.tue2end,
//        wed1start: $scope.wed1start,
//        wed1end: $scope.wed1end,
//        wed2start: $scope.wed2start,
//        wed2end: $scope.wed2end,
//        thu1start: $scope.thu1start,
//        thu1end: $scope.thu1end,
//        thu2start: $scope.thu2start,
//        thu2end: $scope.thu2end,
//        fri1start: $scope.fri1start,
//        fri1end: $scope.fri1end,
//        fri2start: $scope.fri2start,
//        fri2end: $scope.fri2end
//    };
//    console.log($scope.targetHours);
//    console.log($scope.hoursAvail);
//
//};,

//$http.put('/users/hoursAvail', $scope.hoursAvail, {withCredentials: true}).then(function(response){
//    alert("hoursAvail added to user profile");
//    $scope.hoursAvail = {};
//}, function(err){
//    console.log(err);
//});

//$http.put('/users/targetHours', $scope.targetHours, {withCredentials: true}).then(function(response){
//    alert("targetHours added to user profile");
//    $scope.targetHours = 0;
//}, function(err){
//    console.log(err);
//});
