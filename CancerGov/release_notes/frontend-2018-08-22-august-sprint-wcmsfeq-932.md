# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-932] All Basic CTS pages (Search Form, Search Results Page and Trial Description Page) looks weird when printed

When printed, the basic CTS pages were missing a border around the fieldset headers (for Cancer Type/Keyword, Age, and U.S. Zip Code) due to the fieldsets using a background color on the page  - background colors do not get printed.  The help icons appeared to be off-center due to the missing background color.  Added a print media query to _cts.basic.scss with a background border for the fieldset legends, and aligned the help icon to the vertical center of the fieldset.  NO CONTENT CHANGES.