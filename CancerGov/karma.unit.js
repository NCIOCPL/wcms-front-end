/**
 *
 * This config is based on 'How to setup testing using Typescript, Mocha, Chai, Sinon, Karma and Webpack'
 * http://templecoding.com/blog/2016/02/02/how-to-setup-testing-using-typescript-mocha-chai-sinon-karma-and-webpack/
 * Note: files must contain the babel-polyfill in order for most TS tests to work.
 *
 * To understand how Karma & Webpack interact see
 * http://www.ersinakinci.com/how-do-karma-webpack-and-karma-webpack-interact/
 *
 */
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            '_test/**/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            '_test/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}