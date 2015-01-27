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
                    '_dist/css/nvcg.css': '_src/StyleSheets/nvcg.scss'
                }
            }
        },
        bake: {
            build: {
                options: {
                },
                files: {
                    "_dist/PageTemplates/NVCGCancerTypeHomePageTemplate.aspx":   "_src/PageTemplates/NVCGCancerTypeHomePageTemplate.aspx",
                    "_dist/PageTemplates/NVCGHomePageTemplate.aspx":             "_src/PageTemplates/NVCGHomePageTemplate.aspx",
                    "_dist/PageTemplates/NVCGInnerPageTemplate.aspx":             "_src/PageTemplates/NVCGInnerPageTemplate.aspx",
                    "_dist/PageTemplates/NVCGLandingPageTemplate.aspx":           "_src/PageTemplates/NVCGLandingPageTemplate.aspx",
                    "_dist/PageTemplates/NVCGPDQCancerInfoSummaryTemplate.aspx":  "_src/PageTemplates/NVCGPDQCancerInfoSummaryTemplate.aspx",
                    "_dist/PageTemplates/NVCGTopicPageTemplate.aspx":             "_src/PageTemplates/NVCGTopicPageTemplate.aspx"
                }
            }
        },
        watch: {
            options: {
                //liveReload: true
            },
            bake: {
                files: ['_src/PageTemplates/*.aspx', '_src/PageTemplates/Includes/*.inc'],
                tasks: ['bake:build']
            },
            css: {
                files: '_src/StyleSheets/**/*.scss',
                tasks: ['sass']
            }
        },
    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    // We should ALWAYS define the 'default' task
    grunt.registerTask('default', ['sass', 'bake:build', 'watch']);
    // watch should run last so that it's not running over things twice
};
