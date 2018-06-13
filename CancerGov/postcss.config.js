const postcss = require('postcss');

/* This is a custom postcss-loader that is designed specifically to target our current percussion setup (
     which knows to ignore hashes that start with '.__v') */
const cachekiller = postcss.plugin('cachekiller', function cachekiller(options = {}) {
    return function (css) {
        css.replaceValues(/url\(['|"].+\.\w+['|"]\)/, string => {
            return string.replace(/(url\(['|"])(.+)(\.\w+['|"]\))/, (full, pre, match, post) => `${pre}${match}${'.__v' + Date.now().toString().slice(0,-5)}${post}`)
        })
    }
});

module.exports = {
    plugins: [
        require('autoprefixer'),
        cachekiller(),
        // require('css-mqpacker')(), // Ideal in a world where cascades don't cascade onto cascade

        // Note this has a bug (fixed when 4 releases) that recalculates zIndex by default. Try to deprecate until then.
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