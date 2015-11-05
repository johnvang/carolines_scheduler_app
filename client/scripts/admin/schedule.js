app.controller('adminScheduleController', ['$scope', 'userService', function($scope, userService){

    $scope.userService = userService;
    $scope.users = [];

    //$scope.open = "1970-01-01T14:00:00.000Z";
    //$scope.close = "1970-01-02T03:00:00.000Z";
    $scope.open = "";
    $scope.close = "";
    var open = new Date($scope.open);
    var close = new Date($scope.close);

    var allShiftsByDay = [];


    var hasRegistered = false;
    $scope.$watch('userService.getUsers()', function(users) {
        $scope.users = users;
        if (hasRegistered) return;
        hasRegistered = true;
        $scope.$$postDigest(function(){
            hasRegistered = false;
            //var x = new Date(users[0].hoursAvail[0].first.end);
            //var y = new Date(users[0].hoursAvail[0].first.start);
            //console.log(x);
            //console.log(y);
            //console.log(x.getTime() - y.getTime());
            //generate();
        });
    }, true);

    $scope.generate = function() {
        var workdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        for (var i=0; i<workdays.length; i++){
            var day = workdays[i];
            getAllShiftsForDay(day);
        }
        getWorkdays();
        targetHours();
    };

    function getAllShiftsForDay(day){
        var allShiftsForDay = [];
        var x = "";
        switch(day){
            case "Monday": x = 0;
                break;
            case "Tuesday": x = 1;
                break;
            case "Wednesday": x = 2;
                break;
            case "Thursday": x = 3;
                break;
            case "Friday": x = 4;
                break;
            default: console.log("switch funciton defaulted");
                return x;
        }
        for (var i=0; i<$scope.users.length; i++){
            var shift = {
                student: $scope.users[i].username,
                avail: $scope.users[i].hoursAvail[x]
            };
            allShiftsForDay.push(shift);
        }
        allShiftsByDay.push(allShiftsForDay);
    }

    function getWorkdays(){
        //for (var i=0; i<allShiftsByDay.length; i++){
            var weekday = allShiftsByDay[0];
            generateDay(weekday);
        //}
    }

    function generateDay(weekday){
        var workdayFirstShift = [];
        var lastShiftEnd = $scope.open;
        var nextShiftStart = $scope.open;
        while (lastShiftEnd.getTime() < $scope.close.getTime()){
            for (var i=0; i<weekday.length; i++){
                var end = new Date(weekday[i].avail.first.end);
                var start = new Date(weekday[i].avail.first.start);
                if ((end.getTime()-lastShiftEnd.getTime) >= 7200000 && start.getTime() <= lastShiftEnd.getTime ){
                    var shiftObj = {
                        stud: stud,
                        start: new Date(weekday[i].avail.first.start),
                        end: new Date(weekday[i].avail.first.end)
                    };
                    workdayFirstShift.push(shiftObj);
                    lastShiftEnd = new Date(weekday[i].avail.first.end);
                    nextShiftStart = lastShiftEnd;
                    weekday[i].avail.first.end = null;
                    weekday[i].avail.first.start = null;
                    console.log(workdayFirstShift);
                } else {
                    newEnd = new Date(weekday[i].avail.second.end);
                    newStart = new Date(weekday[i].avail.second.start);
                    if ((newEnd.getTime()-lastShiftEnd.getTime) >= 7200000 && newStart.getTime() <= lastShiftEnd.getTime ){
                        var nextShiftObjSecond = {
                            stud: stud,
                            start: new Date(weekday[i].avail.first.start),
                            end: new Date(weekday[i].avail.first.end)
                        };
                        workdayFirstShift.push(nextShiftObjSecond);
                        lastShiftEnd = new Date(weekday[i].avail.first.end);
                        nextShiftStart = lastShiftEnd;
                        weekday[i].avail.second.end = null;
                        weekday[i].avail.second.start = null;
                        console.log(workdayFirstShift);
                    }
                }
            }
        }
    }

    //
    //function generateDay(weekday){
    //    var day =  weekday[0].avail.day;
    //    var workday = {
    //        day: day,
    //        first: [{stud: "", start: "", end: ""}],
    //        second: [{stud: "", start: "", end: ""}]
    //    };
    //    var workdayFirstShift = [];
    //    var lastShiftEnd = "";
    //    for (var i=0; i<weekday.length; i++){
    //        var start = new Date(weekday[i].avail.first.start);
    //        var stud = weekday [i].student;
    //        var shift = weekday[i].avail.first;
    //        //if (start.getTime() == $scope.open.getTime() && checkHours(stud, shift) == true) {
    //        if (start.getTime() == $scope.open.getTime()){
    //            console.log('found a match)');
    //            console.log(weekday[i].avail.day);
    //            console.log(weekday[i].student);
    //            console.log(start);
    //            var firstShiftObj = {
    //                stud: stud,
    //                start: new Date(weekday[i].avail.first.start),
    //                end: new Date(weekday[i].avail.first.end)
    //            };
    //            workdayFirstShift.push(firstShiftObj);
    //            lastShiftEnd = new Date(weekday[i].avail.first.end);
    //            weekday[i].avail.first.end = null;
    //            weekday[i].avail.first.start = null;
    //            console.log(workdayFirstShift);
    //            console.log(lastShiftEnd);
    //            console.log(weekday);
    //            break;
    //        }
    //    }
    //    for (var i=0; i<weekday.length; i++){
    //        var newEnd = new Date(weekday[i].avail.first.end);
    //        var newStart = new Date(weekday[i].avail.first.start);
    //        if ((newEnd.getTime()-lastShiftEnd.getTime) >= 7200000 && newStart.getTime() <= lastShiftEnd.getTime ){
    //            var nextShiftObj = {
    //                stud: stud,
    //                start: new Date(weekday[i].avail.first.start),
    //                end: new Date(weekday[i].avail.first.end)
    //            };
    //            workdayFirstShift.push(nextShiftObj);
    //            weekday[i].avail.first.end = null;
    //            weekday[i].avail.first.start = null;
    //            console.log(workdayFirstShift);
    //        } else {
    //            newEnd = new Date(weekday[i].avail.second.end);
    //            newStart = new Date(weekday[i].avail.secon.start);
    //            if ((newEnd.getTime()-lastShiftEnd.getTime) >= 7200000 && newStart.getTime() <= lastShiftEnd.getTime ){
    //                var nextShiftObjSecond = {
    //                    stud: stud,
    //                    start: new Date(weekday[i].avail.first.start),
    //                    end: new Date(weekday[i].avail.first.end)
    //                };
    //                workdayFirstShift.push(nextShiftObjSecond);
    //                weekday[i].avail.second.end = null;
    //                weekday[i].avail.second.start = null;
    //                console.log(workdayFirstShift);
    //            }
    //        }
    //    }
    //}


    function checkHours(user, shift) {
        console.log('in checkHours function');
        var start = new Date(shift.start);
        var startTime = start.getTime();
        var end = new Date(shift.end);
        var endTime = end.getTime();
        var shiftHours = (endTime - startTime)/3600000;
        console.log("shiftHours: " + shiftHours);
        var currentHours =  "";
        for (var i = 0; i < $scope.targetHoursArray.length; i++) {
            console.log('in for loop in check hours');
            if ($scope.targetHoursArray[i].stud = user) {
                currentHours = $scope.targetHoursArray[i].hours;
                updateHours(user, shiftHours);
                return (shiftHours < currentHours);
            }
            console.log(shiftHours);
            console.log(currentHours);
        }
    }
        //if convert to hours.(shift end - shift start) is greater than user.targethours remain then return false else return true
        //updateHours()

    $scope.targetHoursArray = [];
    function targetHours(){
        for (var i=0; i<$scope.users.length; i++){
            var hoursObj = {
                stud: $scope.users[i].username,
                hours: $scope.users[i].targetHours
            };
            $scope.targetHoursArray.push(hoursObj);
            console.log($scope.targetHoursArray);
        }
    }

    function updateHours(stud, shiftHours){
        console.log('in update Hours function');
    }

}]);