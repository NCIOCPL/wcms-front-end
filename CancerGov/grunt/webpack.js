/*****************************************
 * Webpack 2
 * Compile the JavaScript modules into packages.
 ****************************************/

module.exports = function (grunt,options) {
    var webpackConfig = require("../webpack.config.js");
    var webpack = require("webpack");
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    var dirs = options.dirs;
    var dist_scripts = dirs.dist.scripts;
    if (!dist_scripts.startsWith("/")) {
        dist_scripts = path.resolve(__dirname, "..", dist_scripts);
    }

    return {
        options: webpackConfig,
        dev: {
            devtool: "source-map",
            output: {
                filename: '[name].js',
                path: dist_scripts
            }
        },
        prod: {
            output: {
                filename: '[name].js',
                path: dist_scripts
            },
            plugins: webpackConfig.plugins.concat(
                new webpack.DefinePlugin({
                    "process.env": {
                        // This has effect on the react lib size
                        "NODE_ENV": JSON.stringify("production")
                    }
                }),
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                }),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false,
                        screw_ie8: true,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true
                    },
                    output: {
                        comments: false
                    },
                    exclude: [/\.min\.js$/gi], // skip pre-minified libs
                })
                // new webpack.LoaderOptionsPlugin({
                //     minimize: true,
                //     debug: false
                // })

            )
        },
        analyse: {
            plugins: webpackConfig.plugins.concat(
                new BundleAnalyzerPlugin({analyzerMode: 'static'})
            )
        }
    }
};