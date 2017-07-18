/*****************************************
 * Webpack 2
 * Compile the JavaScript modules into packages.
 ****************************************/

module.exports = function (grunt) {
    var webpackConfig = require("../webpack.config.js");
    var webpack = require("webpack");
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    return {
        options: webpackConfig,
        dev: {
            devtool: "source-map"
        },
        prod: {
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