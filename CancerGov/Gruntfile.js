module.exports = function(grunt) {
    // Project Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'expanded',
                precision: 5
            },
            dist: {
                files: {
                    '_dist/css/nvcg.css': '_src/sass/nvcg.scss'
                }
            }
        },
        watch: {
            options: {
                //liveReload: true
            },
            css: {
                files: '_src/sass/**/*.scss',
                tasks: ['sass']
            }
        },
    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    // We should ALWAYS define the 'default' task
    grunt.registerTask('default', ['sass', 'watch']);
    // watch should run last so that it's not running over things twice
};
