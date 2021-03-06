module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //    },
        //    build: {
        //        src: 'client/scripts/avail.js',
        //        dest: 'server/public/assets/scripts/app.min.js'
        //    }
        //},
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            css: {
                expand: true,
                cwd: "client/styles/",
                src: [
                    "style.css"
                ],
                "dest": "server/public/assets/styles/"
            },
        },
        concat: {
            admin: {
                dest: "server/public/assets/scripts/admin.js",
                src: [
                    "client/scripts/admin/index.js",
                    "client/scripts/admin/avail.js",
                    "client/scripts/admin/change.js",
                    "client/scripts/admin/home.js",
                    "client/scripts/admin/reg.js",
                    "client/scripts/admin/schedule.js",
                    "client/scripts/userService.js"
                ]
            },
            student: {
                dest: "server/public/assets/scripts/student.js",
                src: [
                    "client/scripts/student/index.js",
                    "client/scripts/student/avail.js",
                    "client/scripts/student/change.js"
                ]
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['copy', 'concat']);

    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s)
};
