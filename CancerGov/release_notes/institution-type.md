# Institution Type Release

## [WMCMSFEQ-1193] Institution Page Style Requirements
### CONTENT CHANGES REQUIRED!

The Biography Content Type pages were in need of a facelift due to the impending DCEG migration.  In an effort not to reinvent the wheel, the look and feel originally designed for the Biography Content Type pages were used for the Institution type pages, with the exception of the page style requirements outlined in this ticket.


## [WMCSFEQ-1194] Analytics for Institution Content Type

The analytics requested only applies to the "profile panel" section at the top of the page.  If the user selects the website, or clicks on the phone numbers listed, this data will be collected. Created a new click event called 'ProfilePanelClick' in analytics.js which targets any phone number within an href, as well as targets just the last foldername from the website path.

When a user clicks on a link within the "Profile Panel" box at the top of the page, the following information is passed:

    Prop66 - InstitutionCard_location-name_linkidentifier, where "InstitutionCard" is static, location name is the URL value of the cancer center (ie "dartmouthnorriscotton" instead of "Norris Cotton Cancer Center at Dartmouth"), and link identifier is either "website" for the external website clicked or "phone" for the clicked phone number.
    Prop67 - D=Pagename


## [WCMSFEQ-1221] Add Paddding to Container on Mobile

Missing from the Institution Page Style requirements was a request for right padding, so that the content of the profile panel does not touch the right-most edge of the box when at mobile view (or 640px or less).


## [WCMSFEQ-1192] Update CTHP Card styles for new headers

In a discussion far far away, there was a request. A request to change all of the H3's on the Cancer Type Home Pages to H2s.  A reasonable ask for SEO intents and purposes.  The request was approved and implemented in a Percussion template, however, in the process breaking the look and feel and functionality of all CTHP pages. This "styling" request was a calm cry for help to fix the brokenness.  

* This required changing the h3 calls of .cthpCard class from h3's to h2's in the CHTPPage.scss. Also the same change (from h3's to h2's) in accordion.js and accordionSettings.js for proper functionality of the patternInjector (for CTHP background headers) on all breakpoints.

# Content Changes

Percussion Deployment Steps:
* Create ProfilePage.js and ProfilePage.css
* Create NVCGProfilePageTemplate Page Template
* Slot in jQuery.js, jQueryUI.js, cdeConfig.js, Common.js, ProfilePage.js, Common.css, and ProfilePage.css into the Related Content section of the NVCGProfilePageTemplate file
* Create NVCGProfilePageTemplateColl, and slot in NVCGProfilePageTemplate into the Related Content Section
* Add the new NVCGProfilePageTemplate PageTemplateCollection to the PageTemplateCollections slot of the default Template Theme Info content item, and push to public.
* Navigate to the Configuration folder and republish the CDE Configuration file.
* Detailed steps can be found on Confluence (<a href="https://collaborate.nci.nih.gov/display/OCECTBWIKI/Institution+Update+Deployment+Steps">here</a>)
