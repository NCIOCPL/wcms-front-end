module.exports = function(grunt) {

    // Define Dirs
    grunt.config('dirs', {
        src: {
            base:       "_src/",
            pages:      "_src/PageTemplates/",
            styles:     "_src/StyleSheets/",
            scripts:    "_src/Scripts/",
        },
        dist:   {
            base:       "_dist/",
            pages:      "_dist/PageTemplates/",
            styles:     "_dist/css/",
            scripts:    "_dist/js/",
        },
    });

    // Project Config
    grunt.config('pkg', grunt.file.readJSON('package.json'));

    // Environment?
    grunt.config('env', grunt.option('env') || process.env.GRUNT_DEV || 'development');

    // Load Plugins
    /*****************************************
     *  SVN Repo Updating
     ****************************************/
    grunt.loadNpmTasks('grunt-svn-fetch');
    grunt.config('svn_fetch', {
        options: {
            'repository':   
            "<%= pkg.repository.url %><%= pkg.repository.branchdir %><%= pkg.repository.devbranch %><%= pkg.repository.subpath %>",
            //'path':   '<%= pkg.repository.path %><%= pkg.repository.branchdir %><%= pkg.repository.devbranch %><%= pkg.repository.subpath %>'
        },
        nvcg: {
            map: {
                "_src":"_src",
            }
        }
    });

    /*****************************************
     *  SASS Preprocessing
     ****************************************/
    grunt.loadNpmTasks('grunt-sass');
    grunt.config('sass', {
        options: {
            sourceMap: true,
            outputStyle: 'expanded',
            precision: 5
        },
        dist: {
            files: {
                '<%= dirs.dist.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
            }
        }
    });

    /*****************************************
     *  Build template files
     ****************************************/
    grunt.loadNpmTasks('grunt-bake');
    grunt.config('bake', {
        build: {
            options: {},
            files: [{
                expand: true,
                cwd: '<%= dirs.src.pages %>',
                src: ['**/*.aspx'],
                dest: '<%= dirs.dist.pages %>',
                ext: ".aspx"
            }]
        }
    });

    /*****************************************
     *  Move JS Files into place...
     ****************************************/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        js: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: ['<%= dirs.src.scripts %>**/*.js'],
                dest: '<%= dirs.dist.scripts %>',
                filter: 'isFile'
            }]
        }
    });

    /*****************************************
     * Uglify JS
     ****************************************/
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        options: {
            mangle: false,
            compress: {
                drop_console: true
            },
            preserveComments: false,
        },
        js: {
            files: [{
                expand: true,
                flatten: true,
                dest: '<%= dirs.dist.scripts %>min',
                src: ['<%= dirs.src.scripts %>**/*.js']
            }]
        },
        nci_util: {
            options: {
                compress: false,
                preserveComments: false,
                mangle: false,
                beautify: true
            },
            files: {
                '<%= dirs.dist.scripts %>nci-util.js': [ 
                // Specifying file names here will allow us to order the concatenation
                // otherwise, we have no control of the order, and it's important.
                // This would be a good place to use require.js and AMD compatible modules.
                // Ideally, we never have to specify file names here...just a bad place to dictate this.
                    '<%= dirs.src.scripts %>NCI/NCI.js',
                    '<%= dirs.src.scripts %>NCI/NCI.Buttons.js',
                    '<%= dirs.src.scripts %>NCI/NCI.Buttons.toggle.js',
                    '<%= dirs.src.scripts %>NCI/NCI.Nav.js',
                    '<%= dirs.src.scripts %>NCI/*.js' // CATCH ALL. Must Go LAST
                ],
            }
        }
    });

    /*****************************************
     *  Watch
     ****************************************/
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
            options: {
                //liveReload: true
            },
            bake: {
                files: ['<%= dirs.src.pages %>*.aspx', '<%= dirs.src.pages %>Includes/*.inc'],
                tasks: ['svn_fetch', 'bake:build']
            },
            css: {
                files: '<%= dirs.src.styles %>**/*.scss',
                tasks: ['svn_fetch', 'sass']
            },
            js: {
                files: '<%= dirs.src.scripts %>*.js',
                tasks: ['svn_fetch', 'copy', 'uglify']
            }
    });

    // Tasks
    // We should ALWAYS define the 'default' task
    grunt.registerTask('default', ['svn_fetch', 'sass', 'copy', 'bake:build', 'watch']);
    grunt.registerTask('build', ['svn_fetch', 'sass', 'copy', 'uglify', 'bake:build']);
    grunt.registerTask('force-build', ['sass', 'copy', 'uglify', 'bake:build']);
    // watch should run last so that it's not running over things twice
};

