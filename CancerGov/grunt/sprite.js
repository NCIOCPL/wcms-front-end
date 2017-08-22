/*****************************************
 *  Sprite Generation
 ****************************************/
module.exports = function (grunt, options) {
    var dirs = options.dirs;
    var imgPath = options.env === 'dev' ? "/Images/sprites" : "/publishedcontent/images/images/design-elements/background-graphics";
    console.log("env is:", options.env);

    return {

        all: {
            imgPath: dirs.dist.sprites

        },
        carousel: {
            imgPath: imgPath + '/carousel-bgs.jpg',
            src: [dirs.src.sprites + '/carousel-bgs/*.{png,jpg,gif}' ],
            dest: dirs.dist.sprites + '/carousel-bgs.jpg',
            destCss: dirs.src.modules + '/carousel/_carousel-sprites-bgs.scss',
            algorithm: 'top-down',
            cssOpts: {functions: false},
            imgOpts: {quality: 75}
        },
        accordion: {
            imgPath: imgPath + '/accordion-bgs.jpg',
            src: [dirs.src.sprites + '/accordion-bgs/*.{png,jpg,gif}' ],
            dest: dirs.dist.sprites + '/accordion-bgs.jpg',
            destCss: dirs.src.modules + '/accordion/_accordion-sprites-bgs.scss',
            algorithm: 'top-down',
            cssOpts: {functions: false},
            imgOpts: {quality: 75}
        }
    }
};