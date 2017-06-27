module.exports = function(grunt) {

    var config = {
        dirs: {
            src: {
                base: "_src/",
                templates: "_src/PageTemplates/",
                sublayouttemplates: "_src/SublayoutTemplates/",
                velocitytemplates: "_src/VelocityTemplates/",
                styles: "_src/StyleSheets/",
                scripts: "_src/Scripts/",
                images: "_src/ImageAssets/",
                fonts: '_src/Fonts'
            },
            tmp: {
                base: "_tmp/",
                templates: "_tmp/PageTemplates/",
                sublayouttemplates: "_tmp/SublayoutTemplates/",
                velocitytemplates: "_tmp/VelocityTemplates/",
                styles: "_tmp/Styles/",
                scripts: "_tmp/js/"
            },
            dist: {
                base: "_dist/",
                templates: "_dist/PageTemplates/",
                sublayouttemplates: "_dist/SublayoutTemplates/",
                velocitytemplates: "_dist/VelocityTemplates/",
                styles: "_dist/Styles/",
                scripts: "_dist/js/",
                images: "_dist/Images/",
                fonts: '_dist/fonts'
            },
            bower: 'bower_components/'
        },
        runtime: {
            clinicaltrialsearch : {
                apiserver : {
                    name : {
                        dev : 'clinicaltrialsapi.cancer.gov',
                        prod : 'clinicaltrialsapi.cancer.gov'
                    },
                    port : {
                        dev : '443',
                        prod : '443'
                    },
                    basePath : {
                        dev : 'v1',
                        prod : 'v1'
                    }
                }
            }
        },
        fingerprint:'06/14/2017',
        env: 'dev'
    };

    // Load Plugins
    require('load-grunt-config')(grunt,{
        data: config
    });

    // ----------------------------------------------------------------
    // Tasks
    // ----------------------------------------------------------------
    /**
     * Generates the configuration.js file which is embedded into a
     * front-end build to provide different values according to which
     * tier the build is targetting.
     **/
    // ----------------------------------------------------------------
    grunt.registerTask('generate-config', 'Generate tier-specific configuration files', function (env) {

        var configPath = grunt.config.process('<%= dirs.src.scripts %>/NCI/Generated/configuration.js');
        // Skeleton for the configuration object.
        var config = {
            'clinicaltrialsearch': {
                'apiServer': 'server-name-goes-here',
                'apiPort': 'port-goes-here',
                'apiBasePath': 'basePath-goes-here'
            }
        };
        config['clinicaltrialsearch']['apiServer'] = grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.name.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>');
        config['clinicaltrialsearch']['apiPort'] = grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.port.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>');
        config['clinicaltrialsearch']['apiBasePath'] = grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.basePath.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>');
        grunt.file.write(configPath, "define(" + JSON.stringify(config) + ");");
    });


    // ----------------------------------------------------------------
    grunt.registerTask('build-styles', 'Build the CSS.', function(env) {
        env = (env === 'prod' ? 'prod' : 'dev');
        grunt.config('env', env);

        var tasks = ['sass:' + env,
            'copy:styles',
            'clean:tmp'];
        grunt.task.run(tasks);
    });


    // ----------------------------------------------------------------
    // Copying all XSLT stylesheets to the _dist folder
    // ----------------------------------------------------------------
    grunt.registerTask('build-xsl', 'Copy xsl stylesheets.', function() {
        var tasks = ['copy:xsl'];
        grunt.log.writeln('Copying XSLT files');
        grunt.task.run(tasks);
    });


    // ----------------------------------------------------------------
    // Copying all images and icons to the _dist folder
    // ----------------------------------------------------------------
    grunt.registerTask('build-images', 'Copy images and icons.', function() {
        var tasks = ['copy:images'];
        grunt.log.writeln('Copying image files');
        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    // Copying all fonts to the _dist folder
    // ----------------------------------------------------------------
    grunt.registerTask('copy-fonts', 'Copy fonts.', function() {
        var tasks = ['copy:fonts'];
        grunt.log.writeln('Copying font files');
        grunt.task.run(tasks);
    });


    // ----------------------------------------------------------------
    grunt.registerTask('build-templates', 'Build the CDE page, sublayout & velocity templates.', function(env) {
        env = (env === 'prod' ? 'prod' : 'dev');
        grunt.config('env', env);

        var tasks = ['bake:templates',
            'copy:templates',
            'bake:sublayouttemplates',
            'copy:sublayouttemplates',
            'bake:velocitytemplates',
            'copy:velocitytemplates',
            'clean:tmp'];
        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    grunt.registerTask('build', 'Build all files.', function (env) {
        env = (env === 'prod' ? 'prod' : 'dev');
        grunt.config('env', env);

        var tasks = [
            'generate-config:' + env,
            'build-styles:' + env,
            'uglify:' + env,
            'copy:scripts',
            'clean:tmp',
            'build-templates:' + env,
            'build-xsl',
            'build-images',
            'copy-fonts',
            'webpack:' + env
        ];

        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    grunt.registerTask('build-local', 'Build all files for local CDE and watch for changes.', function(path) {

        //Assumes path is a PublishedContent folder.
        if (path == null || path == '') {
            grunt.log.error('path for build-local cannot be null or empty');
            return false;
        }

        //HACK: Figure out how to override the dist.
        grunt.config('dirs', {
            src: {
                base: "_src/",
                templates: "_src/PageTemplates/",
                sublayouttemplates: "_src/SublayoutTemplates/",
                velocitytemplates: "_src/VelocityTemplates/",
                styles: "_src/StyleSheets/",
                scripts: "_src/Scripts/"
            },
            tmp: {
                base: "_tmp/",
                templates: "_tmp/Templates/",
                sublayouttemplates: "_tmp/SublayoutTemplates/",
                velocitytemplates: "_tmp/VelocityTemplates/",
                styles: "_tmp/Styles/",
                scripts: "_tmp/js/"
            },
            dist: {
                base: path + "/",
                templates: path + "/PageTemplates/",
                sublayouttemplates: path + "/SublayoutTemplates/",
                velocitytemplates: path + "/VelocityTemplates/",
                styles: path + "/Styles/",
                scripts: path + "/js/"
            },
            bower: 'bower_components/'
        });

        //Watch cannot work yet because it would need to push in the new paths.
        //removing it for now so we don't have to hit CTRL-C everytime we do
        //a build
        // var tasks = ['build:dev',
        //             'watch'];
        var tasks = ['build:dev'];

        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    grunt.registerTask('build-watch', 'Build all files and watch for changes.', function(env) {
        var proxy;
        var useHttps = true;

        switch (env) {
            case 'dev/red':
            case 'red-dev':
            case 'red':
                proxy = 'www-red-dev';
                break;
            case 'dev/red/preview':
            case 'preview-red-dev':
            case 'preview-red':
                proxy = 'preview-red-dev';
                break;
            case 'dev/pink':
            case 'pink-dev':
            case 'pink':
                proxy = 'www-pink-dev';
                break;
            case 'dev/blue':
            case 'blue-dev':
            case 'blue':
            case 'dev':
            default:
                proxy = 'www-blue-dev';
                if(/^\d+$/.test(env))
                    proxy = 'www-ocdev' + env + '.ha2';
                break;
            case 'qa':
                proxy = 'www-qa';
                break;
            case 'dt-qa':
            case 'dt':
                proxy = 'www-dt-qa';
                break;
            case 'stage':
                proxy = 'www-stage';
                break;
            case 'training':
                proxy = 'www-training';
                useHttps = false;
                break;
            case 'preview':
                proxy = 'preview';
                break;
            case 'production':
            case 'prod':
                proxy = 'www';
                env = 'prod';
                break;
        }
        env = (env === 'prod' ? 'prod' : 'dev');

        config.env = env;

        grunt.config('env', env);
        grunt.config.merge({
            develop: {
                server: {
                    env: {
                        PROXY_ENV: proxy,
                        PROXY_HTTPS: useHttps
                    }
                }
            }
        });

        var tasks = ['build:' + env,
            'develop',
            'watch'];
        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------

    // We should ALWAYS define the 'default' task
    grunt.registerTask('default', ['build']);

    // Deploy task is used by the build script
    grunt.registerTask('deploy', ['build:prod']);
};