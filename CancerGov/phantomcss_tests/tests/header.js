VisualTest.Run([
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-1 .sub-nav-mega'
        ],
        name: "About Cancer",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-1"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
],[
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-2 .sub-nav-mega'
        ],
        name: "Cancer Types",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-2"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
],[
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-3 .sub-nav-mega'
        ],
        name: "Research",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-3"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
],[
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-4 .sub-nav-mega'
        ],
        name: "Grants and Training",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-4"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
],[
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-5 .sub-nav-mega'
        ],
        name: "News and Events",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-5"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
],[
    casper.test.currentTestFile,
    {
        path : '/',
        selectors : [
            '#mega-nav li.item-6 .sub-nav-mega'
        ],
        name: "About NCI",
        mouseEvent: {
            event: 'move',
            targets: [
                "#mega-nav li.item-6"
            ],
            wait: 1.25
        },
        viewports: [
            {width: 1440, height: 2000, name: 'x-large'}
        ]
    }
]
);
