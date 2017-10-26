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
        sublayout_templates: {
            options: {},
            files: [{
                expand: true,
                cwd: dirs.src.sublayout_templates,
                src: ['**/*.ascx'],
                dest: dirs.tmp.sublayout_templates,
                ext: ".ascx"
            }]
        },
        velocity_templates: {
            options: {},
            files: [{
                expand: true,
                cwd: dirs.src.velocity_templates,
                src: ['**/*.vm'],
                dest: dirs.tmp.velocity_templates,
                ext: ".vm"
            }]
        }
    }
};