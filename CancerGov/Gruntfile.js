module.exports = function(grunt) {

    var config = {
        dirs: {
            src: {
                base: "_src/",
                templates: "_src/PageTemplates/",
                sublayout_templates: "_src/SublayoutTemplates/",
                velocity_templates: "_src/VelocityTemplates/",
                styles: "_src/StyleSheets/",
                scripts: "_src/Scripts/",
                modules: "_src/Scripts/NCI/Modules/",
                images: "_src/ImageAssets/images/",
                sprites: "_src/ImageAssets/sprites/",
                files: "_src/FileAssets/",
                fonts: '_src/Fonts/'
            },
            tmp: {
                base: "_tmp/",
                templates: "_tmp/PageTemplates/",
                sublayout_templates: "_tmp/SublayoutTemplates/",
                velocity_templates: "_tmp/VelocityTemplates/",
                styles: "_tmp/Styles/",
                scripts: "_tmp/js/"
            },
            dist: {
                base: target + "/",
                templates: target + "/PageTemplates/",
                sublayout_templates: target + "/SublayoutTemplates/",
                velocity_templates: target + "/VelocityTemplates/",
                styles: target + "/Styles/",
                scripts: target + "/js/",
                images: target + "/images/images/",
                designelements: target + "/images/images/design-elements/",
                sprites: target + "/images/images/design-elements/sprites/",
                files: target + "/Files/",
                fonts: target + "/fonts/"
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
        fingerprint: Date.now(),
        env: 'dev'
    };

    var getProxy = function(env) {
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

        return proxy;
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
            'copy:styles'];
        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    grunt.registerTask('build-sprites', 'Building Sprites.', function(env) {
        env = (env === 'prod' ? 'prod' : 'dev');
        grunt.config('env', env);

        var tasks = [
            'sprite:carousel',
            'sprite:accordion',
            'svg_sprite',
            'svgmin'];
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
    // Copying all file assets to the _dist folder
    // ----------------------------------------------------------------
    grunt.registerTask('build-files', 'Copy file assets.', function() {
        var tasks = ['copy:files'];
        grunt.log.writeln('Copying file assets');
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
            'build-sprites:' + env,
            'build-styles:' + env,
            'uglify:' + env,
            'copy:scripts',
            'copy:widget_styles',
            'clean:tmp',
            'build-templates:' + env,
            'build-xsl',
            'build-images',
            'build-files',
            'copy-fonts',
            'webpack:' + env
        ];

        grunt.task.run(tasks);
    });

    // ----------------------------------------------------------------
    grunt.registerTask('build-local', 'Build all files for local CDE and watch for changes.', function() {

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
        var proxy = getProxy(env);

        grunt.config.merge({
            develop: {
                server: {
                    env: {
                        PROXY_ENV: proxy
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

    // ----------------------------------------------------------------
    grunt.registerTask('proxy', 'Watch for changes without rebuild.', function(env) {
        var proxy = getProxy(env);

        grunt.config.merge({
            develop: {
                server: {
                    env: {
                        PROXY_ENV: proxy
                    }
                }
            }
        });

        var tasks = [
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