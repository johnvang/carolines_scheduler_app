app.controller('adminAvailController', ['$scope', 'userService', function($scope, userService){

    $scope.userService = userService;

    $scope.users = [];

    var hasRegistered = false;
    $scope.$watch('userService.getUsers()', function(users) {
        $scope.users = users;
        if (hasRegistered) return;
        hasRegistered = true;
        $scope.$$postDigest(function(){
            hasRegistered = false;
            $scope.usersOnly = getAvail(users);
            console.log($scope.users);
            console.log($scope.usersOnly);
        });
    }, true);

    function getAvail(users) {
        adminViewArray = [];
        for (var i = 0; i < users.length; i++) {
            var user = users[i].username;
            var targetHours = users[i].targetHours;
            var hoursAvail = users[i].hoursAvail;
            var tempHoursOnly = getOnlyHoursAvail(hoursAvail);
            var adminViewObj = {
                name: user,
                targetHours: targetHours,
                shifts: tempHoursOnly
            };
            adminViewArray.push(adminViewObj);
        }
        //console.log(adminViewArray);
        return adminViewArray;
    }

    function getOnlyHoursAvail(hoursAvail) {
        var tempShifts = [];
        for (var i=0; i<hoursAvail.length; i++) {
            var tempWorkDay = {};
            //if (hoursAvail[i].first.start == null){
            //    continue;
            //} else {

                if (hoursAvail[i].first.start !== null && hoursAvail[i].second.start !== null) {
                    var firstStart = hoursAvail[i].first.start;
                    var firstEnd = hoursAvail[i].first.end;
                    var secondStart = hoursAvail[i].second.start;
                    var secondEnd = hoursAvail[i].second.end;
                    tempWorkDay = {
                        day: hoursAvail[i].day,
                        firstStart: time(firstStart),
                        firstEnd: time(firstEnd),
                        secondStart: time(secondStart),
                        secondEnd: time(secondEnd)
                    };
                } else {
                    if (hoursAvail[i].first.start !== null) {
                        var firstStart = hoursAvail[i].first.start;
                        var firstEnd = hoursAvail[i].first.end;
                        tempWorkDay = {
                            day: hoursAvail[i].day,
                            firstStart: time(firstStart),
                            firstEnd: time(firstEnd)

                        };
                    }
                }
            tempShifts.push(tempWorkDay);
            }
        return tempShifts;
        }

    function time(time){
        var newDate = new Date(time);
        return newDate.toLocaleTimeString();
    }

}]);


