const postcss = require('postcss');

const cachekiller = postcss.plugin('cachekiller', function cachekiller(options = {}) {
    return function (css) {
        css.replaceValues(/url\(['|"].+\.\w+['|"]\)/, string => {
            return string.replace(/(url\(['|"])(.+)(\.\w+['|"]\))/, (full, pre, match, post) => `${pre}${match}${'.__v' + Date.now()}${post}`)
        })
    }
});

module.exports = {
    plugins: [
        require('autoprefixer'),
        cachekiller(),
        require('css-mqpacker')(),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
}