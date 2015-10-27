/**
 * Created by johnvang on 10/25/15.
 */
app.factory('userService', ['$http', '$log', function($http, $log) {
    var usersArray = [];

    //ajax request to get all students
    $http.get('/users', {withCredentials: true}).then(function(response) {
    //$log.info(response.data);
        usersArray = response.data;
    }, function(err) {
        $log.info(err);
    });

    return {
        create: function (attrs, success, failure) {
            //ajax
            $http.post('/users', {
                username: attrs.username,
                password: attrs.password,
                email: attrs.email
            }, {withCredentials: true}).then(function(response) {
            //$log.info(response.data);
                usersArray.push(response.data);
                if (success != undefined)
                    success();
            }, function(err) {
                $log.info(err);
                if (failure != undefined)
                    failure();
            });
        },

        remove: function(user, success, failure) {
            $http.delete('/users/' + user._id, {withCredentials: true}).then(function (response) {
                var index = usersArray.indexOf(user);
                if (index > -1) {
                    usersArray.splice(index, 1);
                }
                if (success != undefined)
                    success();
            }, function (err) {
                $log.info(err);
                if (failure != undefined)
                    failure();
            });
        },

        getUsers: function() {
            var students = [];
            usersArray.forEach(function(user){
                if(!user.isAdmin)
                students.push(user);
            });
            return students;
        }

    };
}]);