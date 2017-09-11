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
            files: [dirs.src.scripts + '**/*.js', dirs.src.scripts + '**/*.ts', dirs.src.scripts + '**/*.hbs'],
            tasks: ["webpack:dev"],
            options: {
                spawn: false
            }
        },
        templates: {
            files: [
                dirs.src.templates + '*.aspx',
                dirs.src.templates + 'Includes/*.inc',
                dirs.src.sublayouttemplates + '*.ascx',
                dirs.src.sublayouttemplates + 'Includes/*.inc',
                dirs.src.velocitytemplates + '*.vm',
                dirs.src.velocitytemplates + 'Includes/*.inc',
                dirs.src.velocitytemplates + '/*.inc'
            ],
            tasks: ['build-templates:' + 'dev']
        }
    }
};