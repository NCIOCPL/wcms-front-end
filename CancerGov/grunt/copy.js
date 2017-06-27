/*****************************************
 *  Copying
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    return {
        templates: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [dirs.tmp.templates + '**/*.aspx'],
                dest: dirs.dist.templates + '',
                filter: 'isFile'
            }]
        },
        sublayouttemplates: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [dirs.tmp.sublayouttemplates + '**/*.ascx'],
                dest: dirs.dist.sublayouttemplates,
                filter: 'isFile'
            }]
        },
        velocitytemplates: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [dirs.tmp.velocitytemplates + '**/*.vm'],
                dest: dirs.dist.velocitytemplates,
                filter: 'isFile'
            }]
        },
        styles: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [
                    dirs.tmp.styles + '**/*.css',
                    dirs.tmp.styles + '**/*.css.map'
                ],
                dest: dirs.dist.styles,
                filter: 'isFile'
            }]
        },
        xsl: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [
                    dirs.src.styles + '**/*.xsl'
                ],
                dest: dirs.dist.styles,
                filter: 'isFile'
            }]
        },
        images: {
            nonull: true,
            files: [{
                expand: true,
                flatten: false,
                cwd: dirs.src.images,
                src: [
                    '**/*.jpg',
                    '**/*.png',
                    '**/*.gif',
                    '**/*.svg'
                ],
                dest: dirs.dist.images,
                filter: 'isFile'
            }]
        },
        scripts: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [
                    dirs.tmp.scripts + 'NCI_OLD/**/*.js*',
                    dirs.tmp.scripts + '/**/build.txt'
                ],
                dest: dirs.dist.scripts,
                filter: 'isFile'
            }]
        },
        fonts: {
            nonull: true,
            files: [{
                expand: true,
                flatten: false,
                cwd: dirs.src.fonts,
                src: [
                    '**/*'
                ],
                dest: dirs.dist.fonts
            }]
        }
    }
};