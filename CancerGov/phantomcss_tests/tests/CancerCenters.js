VisualTest.Run(
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#AtoZlistName'
        ],
        name: "AtoZ List Name"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#AtoZlistState'
        ],
        name: "AtoZ List State"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#picker'
        ],
        name: "Picker"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#picker1'
        ],
        name: "display none"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '.rawHtml > p'
        ],
        name: "Intro"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#findCCTitle'
        ],
        name: "Find CC Header"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#dropDownCCDisplay1'
        ],
        name: "Drop Down 1"
    }
    ],
    [
    casper.test.currentTestFile, {
        path : '/research/nci-role/cancer-centers/find',
        selectors : [
            '#dropDownCCDisplay2'
        ],
        name: "Drop Down 2"
    }
    ]
);
