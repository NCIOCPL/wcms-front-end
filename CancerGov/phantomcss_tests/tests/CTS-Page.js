VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/about-cancer/treatment/clinical-trials/search',
        selectors : [
            '#PageOptionsControl1'
        ],
        name: "Page Options"
    }
);
VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/about-cancer/treatment/clinical-trials/search',
        selectors : [
            '.delighter.cts-which'
        ],
        name: "Which Delighter"
    }
);
