VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/about-cancer/treatment/clinical-trials/search/r?q=&t=&z=&a=',
        selectors : [
            '.cts-results-title'
        ],
        name: "CTS Results top control"
    }
);
VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/about-cancer/treatment/clinical-trials/search/r?q=&t=&z=&a=',
        selectors : [
            '.clinical-trial-individual-result'
        ],
        name: "CTS Results single result"
    }
);
VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/about-cancer/treatment/clinical-trials/search/r?q=&t=&z=&a=',
        selectors : [
            '.ct-results-lower-control.basic'
        ],
        name: "CTS Results bottom control"
    }
);
/*TODO: Create test to caputre pagers on CT listing pages */