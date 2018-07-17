#Frontend-2018-07-20: FEQ Bucket Release (508 and Architecture Tickets)

## [WCMSFEQ-1070] CTListing loading before Common.js

To preserve order of execution, CTListing needs to be set to defer. This is a change to the velocity templates: DynamicTrialListingPageDesc.vm and TrialListingPageDesc.vm.
TBD...

##  [WCMSFEQ-1063] Roll ContentPage into Common

Instead of two global js files being requested on each page, we will only have one. Other tickets will ideally pare this file down.

Content changes are required to make sure all the Percussion templates are no longer slotting in ContentPage.

## [WCMSFEQ-1052] Add Aria-Label to pageoptions for 508 compliance

The title attribute was felt to be insignificant for 508 purposes on the empty anchor tags used in the page options (as click handler targets). This change sets the title content as the aria-label as well, both in english and in spanish as a part of the template and of the pageOptions module.

## [WCMSFEQ-1055] jquery-ui.selectmenu 508 fix

Jquery UI's selectmenu module does not properly add in 508 compliance. Using the built in _super() method, we are able to extend the drawbutton method to add in aria labels after seletmenu draws an element to the page.

## [WCMSFEQ-940] Remove Right Padding on Last Feature Guide Card

Small CSS only tweak.

## [WCMSFEQ-1040] Remove Modernizr dependency

The now-unnecessary Modernizr library adds a small amount of weight and build complexity. Removing it required JS, CSS, and build changes.

## [WCMSFEQ-1029] CTHP Dropdown obstructed by Video Thumbnail

Issues with CSS Nano minifying z-indexes (which is a known issue with the library and targetted for a bugfix in the next release) means when z-indexes exist in two different stylesheets they are unpredictable. For now, it means overrides will have to be in a common file to both rules (so moving the z-index rule from CTHP to nvcg where the video thumbnail rules are fixes it).