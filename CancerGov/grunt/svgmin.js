/*****************************************
 * SVG Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;

    return {

        options: {
            plugins: [
                {removeViewBox: true},
                {removeDimensions: false},
                {removeUselessStrokeAndFill: true},
                {removeTitle: true}
            ]
        },
        default: {
            files: [{
                expand: true,
                cwd: dirs.tmp.base,
                src: '**/*.svg',
                dest:dirs.dist.sprites
            }]
        }
    }
};