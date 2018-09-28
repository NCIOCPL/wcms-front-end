# Frontend-2018: FEQ September Release

## [WCMSFEQ-464] Resolve jQuery ready and load events.
### (NO CONTENT CHANGES)

Sorting out document.ready and window.load events. Updating a few modules for more streamlined execution order.

## [WCMSFEQ-639] Set up proper event delegation for analytics.after.js
### (NO CONTENT CHANGES)

Added "On This Page" analytics to the analytics.js "load" event. Click events will be bound after the OTP element has been rendered to the DOM in the document.ready event

## [WCMSFEQ-909] The Help-link is overlapping the blue heading label Type/Condition...
## (NO CONTENT CHANGES)

The help-icon was overlapping the Type/Condition heading label at the 326px breakpoint and lower.
  * Changed padding-right of fieldset legend to 43px to prevent icon overlapping text 

## [WCMSFEQ-914] Email for providers appears next to phone number under Location Contacts
### (NO CONTENT CHANGES)

Provider emails were appearing next to the phone number (rather than on the following line) under Locations and Contacts accordion:
  * added <br> to Email line in CTSDrawLocations include file
  
## [WCMSFEQ-1037] Update Tweet This graphic
### (NO CONTENT CHANGES)

The Tweet This feature as seen on /about-nci/organization/crchd/inp/screen-to-save/connect is being updated with a new SVG and modified CSS rules
  * Upload updated svg-sprite.svg from /images/design-elements/sprites in the build to /images/design-elements/sprites folder in Percussion
  * Updates to CSS to add brackets around the text, change SVG background positioning, change font color, size and family.

## [WCMSFEQ-1043] Adding support for Highmaps
### (NO CONTENT CHANGES)
This update will allow lazy loading of Highmaps when the necessary chart type is defined in Fact Book pages. This is needed to support development on `about-nci/budget/fact-book/extramural-programs/grant-contract-awards`

## [WCMSFEQ-1079] Seeing the blue bar with the text "Cancer Currents Blog"...
### (NO CONTENT CHANGES)

At 1024px breakpoint, the Section Menu was defaulting to an open state and showing the submenu that it contains.  This was occurring on every page that invokes the Section Menu Nav button, not just the Cancer Currents Blog page.
  * Set min-width for the section menu resizeHandler to 1025px to prevent the section menu navigation from defaulting to open at the 1024px breakpoint

## [WCMSFEQ-1114] White Space on Landing Pages 
### (NO CONTENT CHANGES)

Since there is no content in the multimedia slot of the About Cancer, El Cancer, Investigacion, Subvenciones-Capacitacion, and Nuestro Instituto landing pages, they all have an extra white space between the last multimedia card and the footer.  Removed the bottom margin in the multimedia slot to alleviate the white space.
  * Used psuedo selector to target just the last set of cards on the page
  * Corrects the same issue on NCI connect guide card row

## [WCMSFEQ-1119] Change font style attributes on inline feature cards
### (NO CONTENT CHANGES)

The text in the inline feature cards was too large for the space, which caused most lines to break to one word. The H3 and p font sizes were reduced, along with a slight line-height and color change. 


## [WCMSFEQ-1128] Remove Scrollbar from Megamenu
### (NO CONTENT CHANGES)

The goal of this ticket is to enhance the usability of the megamenu by removing the scrollbar. 
  * Removed the mega-menu-scroll class and set subnav max open height to 450px
  * Updated font size and line height for submenu list items and titles
  * Re-adjusted subnav max open height to 460px and line height of sub-nav-mega class to 1.1em to accomodate largest spanish mega menu list items


# Notes

Template files have been updated in **WCMSFEQ-914** and they should be uploaded to Percussion as part of this FEQ release