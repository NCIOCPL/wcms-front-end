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
        sublayout_templates: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [dirs.tmp.sublayout_templates + '**/*.ascx'],
                dest: dirs.dist.sublayout_templates,
                filter: 'isFile'
            }]
        },
        velocity_templates: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [dirs.tmp.velocity_templates + '**/*.vm'],
                dest: dirs.dist.velocity_templates,
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
        widget_styles: {
            nonull: true,
            files: [{
                expand: true,
                flatten: true,
                src: [
                    dirs.src.base + 'Widgets/**/*.css'
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
        files: {
            nonull: true,
            files: [{
                expand: true,
                flatten: false,
                cwd: dirs.src.files,
                src: [
                    '**/**/*.txt',
                    '**/**/*.xml'
                ],
                dest: dirs.dist.files,
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