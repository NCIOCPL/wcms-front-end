/*****************************************
 * Webpack 2
 * Compile the JavaScript modules into packages.
 ****************************************/

module.exports = function (grunt,options) {
    var webpackConfig = require("../webpack.config.js");
    var webpack = require("webpack");
    var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    var dirs = options.dirs;
    var dist_scripts = dirs.dist.scripts;
    if (!dist_scripts.startsWith("/")) {
        dist_scripts = path.resolve(__dirname, "..", dist_scripts);
    }

    return {
        options: webpackConfig,
        dev: {
            devtool: "eval-source-map",
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
                new UglifyJsPlugin({
                    parallel: true,
                    uglifyOptions: {
                        exclude: [/\.min\.js$/gi], // skip pre-minified libs
                    }
                })
            )
        },
        analyze: {
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
		        new UglifyJsPlugin({
			        parallel: true,
			        uglifyOptions: {
				        exclude: [/\.min\.js$/gi], // skip pre-minified libs
			        }
		        }),
		        new BundleAnalyzerPlugin({analyzerMode: 'static'})
	        )
        }
    }
};