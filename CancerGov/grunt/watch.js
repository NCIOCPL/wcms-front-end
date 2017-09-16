/*****************************************
 *  Watch
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    return {
        css: {
            files: [dirs.src.styles + '**/*.scss',dirs.src.scripts + '/NCI/Modules/**/*.scss'],
            tasks: ['build-styles:' + 'dev']
        },
        js: {
            files: [dirs.src.scripts + '**/*.js', dirs.src.scripts + '**/*.hbs'],
            tasks: ["webpack:dev"],
            options: {
                spawn: false
            }
        },
        templates: {
            files: [
                dirs.src.templates + '*.aspx',
                dirs.src.templates + 'Includes/*.inc',
                dirs.src.sublayout_templates + '*.ascx',
                dirs.src.sublayout_templates + 'Includes/*.inc',
                dirs.src.velocity_templates + '*.vm',
                dirs.src.velocity_templates + 'Includes/*.inc',
                dirs.src.velocity_templates + '/*.inc'
            ],
            tasks: ['build-templates:' + 'dev']
        }
    }
};