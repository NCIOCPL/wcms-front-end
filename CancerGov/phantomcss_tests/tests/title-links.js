VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/about-website/sitemap',
    selectors : [
        '.column1'
    ],
    name: "Sitemap page - column links"
});
VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/about-nci/leadership',
    selectors : [
        '#cgvBody h3 a'
    ],
    name: "Leadership page - name links"
});
VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/about-nci/budget/fact-book',
    selectors : [
        '#cgvBody h3 a'
    ],
    name: "Factbook page - title links"
});
VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/about-cancer/treatment/types',
    selectors : [
        '#cgvBody h3 a'
    ],
    name: "Treatment Types page - title links"
});
VisualTest.Run(
    casper.test.currentTestFile,
    {
    path : '/',
    selectors : [
        '.card-thumbnail h3 a'
    ],
    name: "Homepage - thumbnail title links"
});