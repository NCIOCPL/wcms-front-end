#Frontend-2018-06-21: Custom Social Share/Page Options

## Summary

In the past, CGov used the AddThis library to handle social sharing. That is being deprecated in favor of a vanilla approach. This means we no longer need to support a rather large dependency.

In addition, the system for including page options has been updated to allow more extensibility. Page templates now have full control over which page options they want to be available on a given page type.

The only notable difference on the site for this release will be in using an email system through cgov vs a mailto link in the vanilla implementation.

## Deployment
Upload all templates, js, and css. Republish CDE config.
NCIAnalytics changed, upload to static (handled pre-release)

## Content Changes
https://www.cancer.gov/about-nci/organization/crchd/inp/screen-to-save/connect needs to have the following changes:
(File = Connect With Screen to Save.Article)

go from:

<a title="Tweet" class="addthis_button_twitter at300b tl-link" href="#" data-tl-code="ARN2016-1-TW" data-title="#ScreentoSave aims to increase #colorectalcancer screening rates in racially/ethnically diverse &amp; rural communities" data-url="http://go.usa.gov/x9yfF"> <span class="at300bs at15nc at15t_twitter"><span class="at_a11y">Share on Twitter</span></span> </a>

to:

<a class="social-share--custom-tweet" href="#" data-tl-code="ARN2016-1-TW" data-title="#ScreentoSave aims to increase #colorectalcancer screening rates in racially/ethnically diverse &amp; rural communities" data-url="http://go.usa.gov/x9yfF">  </a>

(remove span and all classes and add social-share--custom-tweet)
(There are two more instances of the custom social share that need to be changed in the same fashion)

All pages with addthis_share override blocks and pulling in addthis need to be edited to remove addthis and rename global addthis config object to pageOptionsContentOverride