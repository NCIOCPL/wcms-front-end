# Frontend-2018: FEQ September Release

## [WCMSFEQ-914] Email for providers appears next to phone number under Location Contacts
### (NO CONTENT CHANGES)

Provider emails were appearing next to the phone number (rather than on the following line) under Locations and Contacts accordion:
  * added <br> to Email line in CTSDrawLocations include file

## [WCMSFEQ-909] The Help-link is overlapping the blue heading label Type/Condition...
## (NO CONTENT CHANGES)

The help-icon was overlapping the Type/Condition heading label at the 326px breakpoint and lower.
  * Changed padding-right of fieldset legend to 43px to prevent icon overlapping text 
  
## [WCMSFEQ-1079] Seeing the blue bar with the text "Cancer Currents Blog"...
### (NO CONTENT CHANGES)

At 1024px breakpoint, the Section Menu was defaulting to an open state and showing the submenu that it contains.  This was occurring on every page that invokes the Section Menu Nav button, not just the Cancer Currents Blog page.
  * Set min-width for the section menu resizeHandler to 1025px to prevent the section menu navigation from defaulting to open at the 1024px breakpoint

## [WCMSFEQ-1119] Change font style attributes on inline feature cards
### (NO CONTENT CHANGES)

The text in the inline feature cards was too large for the space, which caused most lines to break to one word. The H3 and p font sizes were reduced, along with a slight line-height and color change. 

## [WCMSFEQ-639] Set up proper event delegation for analytics.after.js
### (NO CONTENT CHANGES)

Added "On This Page" analytics to the analytics.js "load" event. Click events will be bound after the OTP element has been rendered to the DOM in the document.ready event


# Notes

Template files have been updated in **WCMSFEQ-914** and they should be uploaded to Percussion as part of this FEQ release