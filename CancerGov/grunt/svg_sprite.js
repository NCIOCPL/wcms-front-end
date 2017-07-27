/*****************************************
 * SVG Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;

    return {

        options: {
            shape: {
                dimension: {		// Dimension related options
                    maxWidth: 32,	// Max. shape width
                    maxHeight: 32,	// Max. shape height
                    precision: 2    // Floating point precision
                },
                spacing: {
                    padding: 5      // Padding around all shapes
                }
            },
            svg: {
                dimensionAttributes: false
            },
            mode: {
                css: {       // Activate the «css» mode
                    dest: './',
                    sprite: dirs.tmp.base + 'svg-sprite.svg',
                    render: {
                        scss: {
                            dest: dirs.src.styles + "sprites/_svg-sprite-map.scss",
                            template: dirs.src.styles + 'sprites/sprite-template.scss'
                        }
                    },
                    bust: false,
                    example: false
                }
            },
            variables: {
                mapname: "icons"
            }

        },

        default: {
            expand: true,
            cwd: dirs.src.images + "/svg",
            src: ['**/*.svg'],
            //src: dirs.src.images + "/svg/**/*.svg",
            dest: './'

            // expand: true,
            // cwd: dirs.src.images + "/svg",
            // src: ['**/*.svg'],
            // dest: dirs.dist.images + "/svg"
        }
    }
};