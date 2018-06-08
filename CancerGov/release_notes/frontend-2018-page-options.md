Upload all templates, js, and css. Republish CDE config.

NCIAnalytics changed, upload to static

https://www.cancer.gov/about-nci/organization/crchd/inp/screen-to-save/connect needs to have the following changes:

go from:

<a title="Tweet" class="addthis_button_twitter at300b tl-link" href="#" data-tl-code="ARN2016-1-TW" data-title="#ScreentoSave aims to increase #colorectalcancer screening rates in racially/ethnically diverse &amp; rural communities" data-url="http://go.usa.gov/x9yfF"> <span class="at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span> </a>

to:

<a class="social-share--custom-tweet" href="#" data-tl-code="ARN2016-1-TW" data-title="#ScreentoSave aims to increase #colorectalcancer screening rates in racially/ethnically diverse &amp; rural communities" data-url="http://go.usa.gov/x9yfF">  </a>

(remove span and all classes and add social-share--custom-tweet)




All pages with addthis_share override blocks and pulling in addthis need to be edited to remove addthis and rename global config
to whatever gets decided on.



TODO: Spanish text for custom tweet title and email
Rename this file with release date?