# FEQ January 2019 Release

## [WCMSFEQ-585] Dictionary popups as modals
The popup functions for glossified terms have been rewritten to make ajax calls to the dictionary API. The returned results are then rendered into a popup modal window on the same page. This replaces the older method of makeing a server call to a dictionary page that is rendered into a new browser window. We did not have front-end control over the backend templates being used to render the popup windows, which had fallen out of sync with the front-end modernization. The old popups could also be blocked by popup blockers. 

This is also a pre-migration task so we no longer have to migrate all the dictionary term pages into the new CMS system.

We also have a new reusable modal component that can be used throughout the site.

This ticket also resloves outstanding tickets concerning dictionary popup issues, such as [WCMSFEQ-1191]


## [WCMSFEQ-1289] Convert search help popup into a modal
Making use of the new modal component created for ticket [WCMSFEQ-585], we've converted the search help popup window into a modal window as well. This helps to create a more consistant user experience. This will also help resolve issues with popup blockers preventing help windows from opening.

## [WCMSFEQ-1306] Dictionary modal analytics
Adding new analytics for tracking clicks on glossified terms. Merging this functionality with the pre-existing click event on blog pages where glossified terms were already being tracked.

## [WCMSFEQ-1273] Update inline feature card styles on Cancer.gov
Updaing the styles for inline feature cards. This effects Cancer Center Profile pages, Blog Feature Cards, Topic Feature Cards, and Callout Boxes.



# Content Changes
No content changes required