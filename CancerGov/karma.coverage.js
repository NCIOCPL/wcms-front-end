/** Configuration for Code Coverage checking with Istanbul */
const path = require('path');
var webpackConfig = require('./webpack.config');

const OUTPUT_LOG_FILE = path.join(__dirname, '_dist', 'logs', 'karma-output.log')

webpackConfig.module.rules = [
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        query: {
            compilerOptions: {
                inlineSourceMap: true,
                sourceMap: false 
            }
        }
    },
    {
        test: /\.ts$/,
        enforce: "post",
        loader: 'istanbul-instrumenter-loader',
        options: {
            esModules: true
        },
        exclude: [
            'node_modules',
            /\.spec\.ts$/
        ]
    }
];

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',            
            '_test/**/*.ts'
        ],
        exclude: [],
        preprocessors: {
            '_test/**/*.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        //This keeps webpack quiet
        webpackMiddleware: {
            stats: 'errors-only',
            noInfo: true
        },
        reporters: ['coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['json-summary'],
            dir: path.join(__dirname, '_dist', 'logs')
        },
        loggers: [{
            type: 'file',
            filename: OUTPUT_LOG_FILE
        }],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}