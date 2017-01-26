'use strict';

/**
 * Collection of viewport sizes. These objects contain the dimensions of the virtual
 * browser to in use for running a test.
 */
exports.viewports = [
    {width: 390, height: 1000, name: 'small'},
    {width: 640, height: 1000, name: 'medium'},
    {width: 1024, height: 2000, name: 'large'},
    {width: 1440, height: 2000, name: 'x-large'}
];

// default server is dev
exports.server = "http://localhost:3000";


// if dev was specified then use localhost as server
if(casper.cli.get('server') == 'prod'){
    exports.server = "https://www.cancer.gov";
}

//casper.echo(exports.server);

// casper.exit();

exports.cookies = [
    {name: 'fsr.0', value: '365'}, // Block ForeSee prompt
    {name: 'pcs4cts-opt', value: 'any'} // Block Proactive chat prompt
];

/**
 * Create the settings.folders structure.
 * <ul>
 * <li>outputbase - the name of the folder where all tests' output is created.  Individual
 *      tests will have separate folders under outputbase.
 * <li>failure - the name of per-test folder for failure images.
 * <li>snapshot -  the name of per-test folder for reference images.
 * </ul>
 */
exports.folders = {};
exports.folders.outputbase = "output";
exports.folders.failure = "failures";
exports.folders.snapshot = "snapshots";
exports.folders.tests = "tests";
