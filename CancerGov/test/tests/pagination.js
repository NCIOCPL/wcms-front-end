VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/about-cancer/treatment/clinical-trials/search/r?q=&t=&z=&a=',
    selectors : [
        '.pagination'
    ],
    name: "Pagination"
});
