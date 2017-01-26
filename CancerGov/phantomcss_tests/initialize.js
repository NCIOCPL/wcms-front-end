/**
 * This is a place to set up code that runs before anything else.
 * Technically, anything set up here is also available in later scripts,
 * but globals should be put in "include.js" instead.
 */

var phantomcss = require( 'phantomcss' );
var fs = require('fs');

// Create global 'hacks' object to workaround some PhantomJS 'oddities.'
// (e.g. require() only working for install'ed node packages.)
var hacks = require(fs.absolute( fs.workingDirectory + '' ) + '/hacks');

(function(){

	var settings = hacks.require('settings');

	/**
	* Set up PhantomCSS
	*/
	phantomcss.init( {
		addIteratorToImage: false,
		addLabelToFailedImage: false,
		onPass: onTestPass
	} );

	// Set cookies in PhantomJS
	settings.cookies.forEach(function(cookie){

		phantom.addCookie({
			'name' : cookie.name,
			'value': cookie.value
		});

	});

	// Set up handling for various Casper events.
	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );

/**
 * Event handler for when a test is run sucessfully. This is primarilly used
 * to supress the messages which PhantomCSS outputs on every test in order
 * to only be notified of failures.   
 * @param {object} test An instance of the CasperJS test structure.
 */
function onTestPass (test){

} 


})();


casper.test.done();
