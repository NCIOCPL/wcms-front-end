define(function(require) {
    var $ = require('jquery');
    //document ready
    $(function() {
        var page = $(".contentid-916787");

        if(page[0]) {
            var target = $("#overview").nextAll('h3:first');
            var content = $('<div class="materials-to-share">' +
                '<!-- 1. Graphic showing cancer death rates declining -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="Overall cancer death rates in the US decreased from 2003-2012: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-1-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>Overall cancer death rates in the US decreased from 2003-2012: #ARN16</p>' +
                '</div>' +
                '<!-- 2. Graphic showing 10-year mortality trends -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="Trends in cancer death rates provide evidence for progress against cancer: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-2-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>Trends in cancer death rates provide evidence for progress against cancer: #ARN16</p>' +
                '</div>' +
                '<!-- 3. Graphic showing SEER Incidence trends [no link] -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="Overall US cancer incidence rates continued to decrease for men and were stable for women from 2003-2012. #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-3-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>Overall US cancer incidence rates continued to decrease for men and were stable for women from 2003-2012. #ARN16</p>' +
                '</div>' +
                '<!-- 4. Graphic showing rate of new cases of cancer declined for men and women annually -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="The Report to the Nation has statistics on cancer incidence in the US: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-4-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>The Report to the Nation has statistics on cancer incidence in the US: #ARN16</p>' +
                '</div>' +
                '<!-- 5. Graphic showing lung cancer continues to decline -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="In the US, the rate of new cases of lung cancer continues to decrease: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-5-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>In the US, the rate of new cases of lung cancer continues to decrease: #ARN16</p>' +
                '</div>' +
                '<!-- 6. Graphic showing showing liver cancer deaths in the US increasing -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="In contrast to the overall trends, US deaths due to liver cancer have increased: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-6-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>In contrast to the overall trends, US deaths due to liver cancer have increased: #ARN16</p>' +
                '</div>' +
                '<!-- 7. Graphic showing incidence rate of liver cancer increasing -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="In the US, the incidence rate of liver cancer is higher in men than in women: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-7-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>In the US, the incidence rate of liver cancer is higher in men than in women: #ARN16</p>' +
                '</div>' +
                '<!-- 8. Graphic showing incidence rates for liver cancer by race ethnicity -->' +
                '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="The Report to the Nation has incidence rates for liver cancer by race/ethnicity: #ARN16" addthis:url="http://go.usa.gov/3Yg5Y">' +
                '<a class="addthis_button_twitter at300b tl-link" href="#" title="Tweet" data-tl-code="ARN2016-DR8Fact-TW">' +
                '<span class=" at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span>' +
                '</a>' +
                '<p>The Report to the Nation has incidence rates for liver cancer by race/ethnicity: #ARN16</p>' +
                '</div>' +
                '</div>');
            target.before(content);
        }
    });
});