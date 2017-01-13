VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/types/breast/beyond-cancer-video',
        selectors : [
            '.caption-container'
        ],
        name: "Video Caption"
    }
);
VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/research/areas/genomics',
        selectors : [
            '.caption-container'
        ],
        name: "Image Caption"
    }
);
VisualTest.Run(
    casper.test.currentTestFile, {
        path : '/types/leukemia/hp/adult-all-treatment-pdq#section/_69',
        selectors : [
            '.pdq-footer '
        ],
        name: "Table Caption"
    }
);