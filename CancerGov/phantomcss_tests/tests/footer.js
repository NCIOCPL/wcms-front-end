VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/research/key-initiatives/moonshot-cancer-initiative/blue-ribbon-panel',
    selectors : [
        '.article-footer'
    ],
    name: "Article Footer"
});

VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/research/key-initiatives/moonshot-cancer-initiative/blue-ribbon-panel/brp-lowy-letter ',
    selectors : [
        '.article-footer'
    ],
    name: "General Footer"
});

VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/types/leukemia/hp/adult-all-treatment-pdq#section/_48',
    selectors : [
        '.article-footer'
    ],
    name: "PDQ Footer"
});

VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/news-events/cancer-currents-blog/2016/caregivers-needs-challenges',
    selectors : [
        '.article-footer'
    ],
    name: "Blog Post Footer"
});

VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/news-events/press-releases/2016/physical-activity-lowers-cancer-risk',
    selectors : [
        '.article-footer'
    ],
    name: "Press Release Footer"
});



