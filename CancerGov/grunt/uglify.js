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
        }
    }
};