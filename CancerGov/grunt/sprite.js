/*****************************************
 *  Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    var imgPath = "/publishedcontent/images/images/design-elements/sprites/";
    console.log("env is:", options.env);

    return {

        all: {
            imgPath: dirs.dist.sprites

        },
        carousel: {
            imgPath: imgPath + 'carousel-bgs.jpg',
            src: [dirs.src.sprites + 'carousel-bgs/*.{png,jpg,gif}' ],
            dest: dirs.dist.sprites + 'carousel-bgs.jpg',
            destCss: dirs.src.modules + 'carousel/_carousel-sprite-map.scss',
            algorithm: 'top-down',
            cssOpts: {functions: false},
            imgOpts: {quality: 75},
            cssSpritesheetName: 'carousel'
        },
        accordion: {
            imgPath: imgPath + 'accordion-bgs.jpg',
            src: [dirs.src.sprites + 'accordion-bgs/*.{png,jpg,gif}' ],
            dest: dirs.dist.sprites + 'accordion-bgs.jpg',
            destCss: dirs.src.modules + 'accordion/_accordion-sprite-map.scss',
            algorithm: 'top-down',
            cssOpts: {functions: false},
            imgOpts: {quality: 75},
            cssSpritesheetName: 'accordion',
            cssVarMap: function (sprite) {
                sprite.name = 'accordion-' + sprite.name;
            }
        }
    }
};