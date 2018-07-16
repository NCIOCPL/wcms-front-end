#Frontend-2018-07-20: FEQ Bucket Release (508 and Architecture Tickets)

## [WCMSFEQ-1070] CTListing loading before Common.js

To preserve order of execution, CTListing needs to be set to defer. In addition, the picturefill polyfill which is currently loaded from a CDN will be required directly by CTListing to lessen http requests.
This is a change to the velocity templates: DynamicTrialListingPageDesc.vm and TrialListingPageDesc.vm, as well as CTlistingPage.js.