module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-assets')({
            cachebuster: true
        }),
        require('css-mqpacker')()
    ]
}