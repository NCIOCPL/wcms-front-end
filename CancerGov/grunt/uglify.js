/*****************************************
 * Uglify JS
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    var oldFiles = {
        expand: true,
        flatten: true,
        dest: dirs.tmp.scripts + 'NCI_OLD',
        src: [dirs.src.scripts + 'NCI_OLD/*.js']
    };
    var analyticsJsFiles = {
        expand: true,
        flatten: true,
        dest: dirs.dist.scripts + 'analytics',
        src: [dirs.src.scripts + 'NCI/analytics/AppMeasurement*.js']
    };
    var analyticsHtmlFiles = {
        expand: true,
        flatten: true,
        dest: dirs.dist.scripts + 'analytics',
        src: [dirs.src.scripts + 'NCI/analytics/!(AppMeasurement)*.js'],
        ext: '.html'
    };

    return {
        options: {
            preserveComments: 'some',
            maxLineLen: 500
        },
        dev: {
            options: {
                mangle: false,
                beautify: true,
                sourceMap: true
            },
            files: [oldFiles]
        },
        prod: {
            options: {
                mangle: true
            },
            files: [oldFiles]
        },
        dictionaryWidget: {
            options: {
                compress: {
                    collapse_vars: false,
                    keep_fnames: true,
                    unused: false,

                },
                mangle: true
            },
            files: [{
                expand: true,
                flatten: true,
                dest: dirs.dist.scripts + 'dictionaryWidget',
                src: [dirs.src.base + 'Widgets/**/*.js']
            }]
        },
        analyticsJs: {
            options: {
                compress: {
                    collapse_vars: false,
                    keep_fnames: true,
                    unused: false,
                },
                mangle: true
            },
            files: [analyticsJsFiles]
        },
        analyticsHtml: {
            options: {
                compress: {
                    collapse_vars: false,
                    keep_fnames: true,
                    unused: false,
                },
                mangle: true,
                banner: '<script>',
                footer: '</script>'
            },
            files: [analyticsHtmlFiles]
        }
        
    }
};