/*****************************************
 * SVG Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;

    return {

        options: {
            shape: {
                dimension: {		// Dimension related options
                    // maxWidth: 32,	// Max. shape width
                    // maxHeight: 32,	// Max. shape height
                    precision: 5    // Floating point precision
                }
                ,
                spacing: {
                    padding: 10      // Padding around all shapes - must remain 5 due to calculation bug in svg-sprite
                }
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
                    layout:"vertical",
                    bust: false,
                    example: false
                }
            },
            variables: {
                mapname: "icons"
            },
            svg: {
	            precision: 5
            }

        },

        purple: {
            expand: true,
            cwd: dirs.src.themes + "purple/images/sprites/svg/",
            src: ['**/*.svg'],
            dest: './',
            options: {
                mode: {
                    css: {
                        dest: './',
                        sprite: dirs.tmp.base + 'svg-sprite-purple.svg',
                        render: {
                            scss: {
                                dest: dirs.src.themes + "purple/images/sprites/_svg-sprite-map.scss",
                                template: dirs.src.styles + 'sprites/sprite-template.scss'
                            }
                        },
                        layout:"vertical",
                        bust: false,
                        example: false
                    }
                }
            }
        },

        blue: {
            expand: true,
            cwd: dirs.src.themes + "blue/images/sprites/svg/",
            src: ['**/*.svg'],
            dest: './',
            options: {
                mode: {
                    css: {
                        dest: './',
                        sprite: dirs.tmp.base + 'svg-sprite-blue.svg',
                        render: {
                            scss: {
                                dest: dirs.src.themes + "blue/images/sprites/_svg-sprite-map.scss",
                                template: dirs.src.styles + 'sprites/sprite-template.scss'
                            }
                        },
                        layout:"vertical",
                        bust: false,
                        example: false
                    }
                }
            }
        },

        default: {
            expand: true,
            cwd: dirs.src.sprites + "svg",
            src: ['**/*.svg'],
            dest: './'
        },
        
    }
};