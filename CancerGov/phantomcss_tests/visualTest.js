/**
* The "include" script is executed before anything else and any functions or variables
* it creates are available in any of the other scripts, including the actual tests.
*/
var fs = require('fs');
var url = require('url');
var hacks = require(fs.absolute( fs.workingDirectory + '' ) + '/hacks');
var mouse = require("mouse").create(casper);

var settings = hacks.require('settings');

/**
 VisualTest object. Simple test type that works with a screenshot of a single url
 and one more CSS selectors. There is capability to evaluate the results of
 dynamic elements.
 */
function VisualTest(fileName, options) {
    this.fileName = fileName;
    this.path = options.path;
    this.selectors = options.selectors;
    this.testName = options.name;

    this.viewports = options.viewports || settings.viewports;
    this.mouseEvent = options.mouseEvent;
}

// Instance items.
VisualTest.prototype = {

    /**
     * Performs the actual test.
     */
    RunTest : function() {

        // Reference to the VisualTest object for use in callbacks.
        var self = this;
        var testName = this.testName?" - " + this.testName:"";
        var waitNseconds = function(n) {
            var seconds = new Date().getTime() / 1000;
            var time_now = seconds;
            while ((time_now + n) > seconds)
            {
                seconds = new Date().getTime() / 1000;
            }
        };

        casper.test.begin("Running Test: " + this.fileName + testName, function(test) {

            // Update the locations for test output to reflect the current test.
            self.SetOutputDirectories();
            // Clean up any pre-existing output leftover from prior runs.
            self.CleanupOutputs();

            // Navigate to the url
            var path = url.resolve(settings.server, self.path);
            casper.start(path);

            // Set up a single casper step for each viewport size.
            self.viewports.forEach(function(port, portIndex) {

                // This is the heart of it all. The function passed to casper.then(),
                // is a step in a list of tasks to be executed.
                // NOTE: Despite the name, casper.then() is completely unrelated to the
                // then() function associated with Promises.
                casper.then(function(){

                    // Set (or change) the viewport size and after it's finished
                    // reflowing the page, take a snapshot.
                    casper.viewport(port.width, port.height, function(){

                        // Loop through the test's list of CSS selectors, creating
                        // a screenshot of each one.
                        self.selectors.forEach(function(selector, selectorIndex){
                            if(self.mouseEvent) {
                                casper.mouse[self.mouseEvent.event](self.mouseEvent.targets[selectorIndex]);
                                casper.evaluate(function(){

                                });
                                if (self.mouseEvent.wait) {
                                    console.log("waiting "+ self.mouseEvent.wait +"s for hover");
                                    // casper.wait is async so screenshot would have to go in callback
                                    // casper.wait(self.mouseEvent.wait,function(){
                                    //     console.log("The wait is over.")
                                    //
                                    // });
                                    waitNseconds(self.mouseEvent.wait);
                                }
                            }


                            var testBaseName = self.testName?self.testName.replace(/[^a-z0-9]/gi, '-'):self.fileName;
                            var snapshotName = testBaseName + '-(' + port.name + ')-' + selectorIndex;
                    		phantomcss.screenshot( selector, snapshotName );
                        });
                    });

                });

            });

            // Screenshot comparison for the current spec.
            casper.then( function now_check_the_screenshots() {
                  // compare screenshots
                  phantomcss.compareSession();
            });

            // So that a "test" is recorded.
            test.assertTrue(true);

            // Run the test
            casper.run(function(){
                test.done();
            })
        });
    },

    /**
     * Sets the output directories for the current test. Specific file output locations
     * are controlled by the settings.folders structure, with one output structure for
     * each test. 
     */
    SetOutputDirectories: function () {
        var fs = require('fs');
        var settings = hacks.require('settings');

        var failuresFolder = this.GetFailuresFolder();
        var snapshotFolder = this.GetSnapshotFolder();
        var comparisonFolder = snapshotFolder;

        phantomcss.update({
            screenshotRoot: fs.absolute( snapshotFolder ),
		    failedComparisonsRoot: fs.absolute( failuresFolder ),
            comparisonResultRoot: fs.absolute( comparisonFolder ),
            addIteratorToImage: false // phantomcss requires this to be set on each call.
        });
    },

    /**
     * Removes directories containing non-reference images.
     */
    CleanupOutputs: function() {
        var failuresFolder = this.GetFailuresFolder();
        if(fs.exists(failuresFolder))
            fs.removeTree(failuresFolder);
    },

    /**
     * Returns a string containing the name of the folder where images will be stored
     * when there is a comparison failure. The folder name is computed from the current
     * working directory (folder the script resides in), the folders.outputbase,
     * folders.failure, and the current test name.
     */
    GetFailuresFolder : function() {
        return fs.workingDirectory + fs.separator + settings.folders.outputbase + fs.separator + this.fileName + fs.separator + settings.folders.failure;
    },

    /**
     * Returns a string containing the name of the folder where test references images
     * will be stored. The folder name is computed from the current working directory
     * (folder the script resides in), the folders.outputbase, folders.failure, and
     * the current test name.
     */
    GetSnapshotFolder : function() {
        return fs.workingDirectory + fs.separator + settings.folders.outputbase + fs.separator + this.fileName + fs.separator + settings.folders.snapshot;
    }

};

// Static methods begin here.
/**
 * Entry point for individual tests. Each test consists of a single function call of the
 * form:
 * 
 *  VisualTest.Run(filepath, options);
 * 
 * with the parameters listed below 
 * 
 * @param {string} filepath The path to the test file.
 * @param {object} options An opbject consisting of the properties:
 * <ul>
 *     <li>path (required) - A path on the configured web site for a page which will be examined.
 *     <li>selectors (required) - An array of CSS selectors to screenshot on path.
 * </ul> 
 */
VisualTest.Run = function(filepath,options) {
    // The node 'path' module doesn't work in PhantomJS, so we fake it with a String.split()
    // that looks for either slashes or backslashes.  This needs to be its own function
    // though with error handling and such. Perhaps a 'PhantomHacks' module?
    //var fileName = path.basename(filepath);
    var run = function(f,o){
        var pathbits = f.split("/");
        var fileName = pathbits[pathbits.length - 1];
        fileName = fileName.split(".")[0];

        var a = new VisualTest(fileName, o);
        a.RunTest();
    };

    // if first argument is an array then loop through test. if it's a string then run a single test
    if(typeof filepath == "object"){
        for (var i=0; i < arguments.length; i++) {
            run(arguments[i][0],arguments[i][1]);
        }
    } else {
        run(filepath,options);
    }

};
