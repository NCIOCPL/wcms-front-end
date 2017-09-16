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
                src: dirs.tmp.base + 'svg-sprite.svg',
                dest:dirs.dist.sprites + "svg-sprite.svg"
            }]
        }
    }
};