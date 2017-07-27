/*****************************************
 *  Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;

    return {

        options: {


        },

        default: {
            src: [dirs.src.images + '**/*.{png,jpg,gif}' ],
            dest: dirs.dist.images + 'image-sprite.png',
            destCss: dirs.dist.styles + 'sprites.css'
        }
    }
};