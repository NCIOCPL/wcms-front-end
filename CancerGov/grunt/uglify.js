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
    var analyticsFiles = {
	    expand: true,
	    flatten: true,
	    dest: dirs.dist.scripts + 'analytics',
	    src: [dirs.src.scripts + 'NCI/analytics/*.js']
    }
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
	    analytics: {
		    options: {
		        compress: {
			        collapse_vars: false,
			        keep_fnames: true,
			        unused: false,

                },
			    mangle: true
		    },
		    files: [analyticsFiles]
	    }
    }
};