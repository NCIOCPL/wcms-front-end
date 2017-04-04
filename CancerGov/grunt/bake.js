/*****************************************
 *  Build template files
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    return {
        templates: {
            options: {},
            files: [{
                expand: true,
                cwd: dirs.src.templates,
                src: ['**/*.aspx'],
                dest: dirs.tmp.templates,
                ext: ".aspx"
            }]
        },
        sublayouttemplates: {
            options: {},
            files: [{
                expand: true,
                cwd: dirs.src.sublayouttemplates,
                src: ['**/*.ascx'],
                dest: dirs.tmp.sublayouttemplates,
                ext: ".ascx"
            }]
        },
        velocitytemplates: {
            options: {},
            files: [{
                expand: true,
                cwd: dirs.src.velocitytemplates,
                src: ['**/*.vm'],
                dest: dirs.tmp.velocitytemplates,
                ext: ".vm"
            }]
        }
    }
};