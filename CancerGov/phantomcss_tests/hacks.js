'use strict';

/**
 * Workarounds for places where PhantomJS doesn't provide quite the same functionality
 * as Node.
 */

var fs = require('fs');

/**
 * A look-a-like for the AMD require() function.
 * Allows a user-created JS file to be 'required' similarly to how it works in node.
 * @method require
 * @param {string} the name of the module to be loaded.
 * @return {Object} A structure consisting of the contents of the module's exports
 * object.
 */
exports.require = function (module) {
    return require(fs.absolute( fs.workingDirectory + '' ) + '/' + module);
};
