# Institution Type Release

## [WMCMSFEQ-1193] Institution Page Style Requirements

The Biography Content Type pages were in need of a facelift due to the impending DCEG migration.  In an effort not to reinvent the wheel, the look and feel originally designed for the Biography Content Type pages were used for the Institution type pages, with the exception of the page style requirements outlined in this ticket.

Percussion Deployment Steps:
* Create ProfilePage.js and ProfilePage.css
* Create NVCGProfilePageTemplate Page Template
* Slot in ProfilePage.js and ProfilePage.css into the NVCGProfilePage Template file
* Create NVCGPrfilePage TemplateColl, and slot in NVCGProfilePage Template into the Related Content Section
* Navigate to the Configuration folder and republish the CDE Configuration file.

## [WMCSFEQ-1194] Analytics for Institution Content Type

The analytics requested only applies to the "profile panel" section at the top of the page.  If the user selects the website, or clicks on the phone numbers listed, this data will be collected.  Added ProfilePanelClick event to the analytics.js file

When a user clicks on a link within the "Profile Panel" box at the top of the page, the following information is passed:

    Prop66 - InstitutionCard_location-name_linkidentifier, where "InstitutionCard" is static, location name is the URL value of the cancer center (ie "dartmouthnorriscotton" instead of "Norris Cotton Cancer Center at Dartmouth"), and link identifier is either "website" for the external website clicked or "phone" for the clicked phone number.
    Prop67 - D=Pagename


## [WCMSFEQ-1221] Add Paddding to Container on Mobile

Missing from the Institution Page Style requirements was a request for right padding, such that the content of the profile panel does not touch the right-most edge of the box when at mobile view (or 640px or less).

## [WCMSFEQ-1192]  Update CTHP Card styles for new headers

In a discussion far far away, there was a request. A request to change all of the H3's on the Cancer Type Home Pages to H2s.  A reasonable ask for SEO intents and purposes.  The request was approved and implemented in Percussion template- in the process breaking the look and feel and functionality of all CTHP pages. This "styling" request was a calm cry for help to fix the brokenness.  

* This required changing the h3 calls of .cthpCard class from h3's to h2's in the CHTPPage.scss. Also changes to accordion.js and accordionSettings.js to reflect change from H3s to H2s on CTHP pages for collapsed accordion headers on mobile.