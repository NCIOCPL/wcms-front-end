# Steps for running Phantom Tests

## The Components
1. [PhantomJS](http://phantomjs.org/documentation/) - headless browser. Must be installed globally e.g.: `npm install -g phantomjs-prebuilt`
2. [CasperJS](http://docs.casperjs.org/en/latest/) - testing suite. Must be installed globally e.g.: `npm install -g casperjs`
3. [PhantomCSS](https://github.com/Huddle/PhantomCSS) - captures screenshots
4. [ResembleJS](https://github.com/Huddle/Resemble.js) - used by PhantomCSS to compare screenshots

## The Commands
From the command line, path into `CancerGov\test` this is where all test scrips and commands reside

- Use the command `./runVisualTests.sh` to run all visual tests. Currently we do not have any functional test so they are all visual for now.
- Use `-b` to run all the *baseline* test on cancer.gov
- Use `-b file-name.js` to get a *baseline* for a specific test
- Don't use any arguments to run all test files on your localhost
- Use `-f file-name.js` to run a specific test *file* on your localhost


##Creating Your Baseline
The first step when testing with Phantom is to create your baseline images based on the production server. Run `./runVisualTests.sh -b`.
A new folder named `output` will be created with all the screenshots

## Running Local Tests
*Ensure your localhost is running*
Run all tests using `./runVisualTests.sh`
Run a specific test using `./runVisualTests.sh -f file-name.js`
This will run the tests on your local environment and compare the results to your baseline. You should see *.diff.png* files within the sreenshot folder. If a test fails then a new folder named `failures` should appear on the same level as `screenshots` and *.fail.png* image files should appear in the screenshot folder as well showing the visual differences in hot pink.

## Creating Tests
All test should be placed in the `CancerGov\test\tests` folder
Test files should be named based on the functionality you're testing for, from generic to specific. e.g.: `pagination-numbers-cts.js`.

### Visual Tests
Most of the visual test implementation details has been abstracted away in the `visualTest.js` file. This makes writing new visual tests very simple. You can have multiple `VisualTest` calls in one file, but only one url per visual test.

### Visual Test Function
The visualTest.js has a public method `Run` that accepts two arguments to run a test, or a variadic number of arrays with arguments to run multiple tests in a row. `VisualTest.Run(filename[string],options[object])`

**filename**: *string* is filled in by  CasperJS suite as `casper.test.currentTestFile`
**options**: *object* { path, selectors, testname }
  - **path**: *string* The page url to send to PhantomJS. Also used for naming the output folder
  - **selectors**: *array* A collection of selectors to look for on the provided path
  - **testname**: *string (optional)* The name of the test that will be reported in the console and appended to screenshot file names

### Simple Test
```
VisualTest.Run(
  casper.test.currentTestFile,
  {
    path : '/about-cancer/treatment/clinical-trials/search',
    selectors : [
      '.delighter.cts-livehelp',
      '.resize-content span'
    ],
    name: 'Which Delighter'
  }
);
```

### Multiple Test Array
```
VisualTest.Run(
  [
    casper.test.currentTestFile,
    {
      path : '/research/areas/genomics',
      selectors : [
        '.caption-container'
      ],
      name: "Image Caption"
    }
  ],
  [
    casper.test.currentTestFile,
    {
      path : '/types/leukemia/hp/adult-all-treatment-pdq#section/_69',
      selectors : [
        '.pdq-footer '
      ],
      name: "Table Caption"
    }
  ],
  [
    casper.test.currentTestFile,
    {
      path : '/types/breast/beyond-cancer-video',
      selectors : [
        '.caption-container'
      ],
        name: "Video Caption"
    }
  ]
);
```
## TODO's
1. Need to write a compatible script for Windows
2. Resolve JavaScript race conditions
3. There are grunt wrappers for casperJS and phantomCSS, but they've become a bit stale. Would be nice to incorporate grunt commands for tool consistency.
4. Rewrite visualTest.js as a module so it can be imported into other modules.
5. Create a functionalTest.js module to support simple functional tests
6. Create a runTests.js module that can invoke all other test modules
7. Support ES2015?