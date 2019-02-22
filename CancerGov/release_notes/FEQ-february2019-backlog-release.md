# FEQ February 2019 Backlog Release


## [WCMSFEQ-1322] [Change Request] DCEG Video Player Padding
### See Content Changes
Inline video player on DCEG (set to left or right) had a forced zero-set left margin, so content was flush against the video player.  Created two video classes (video-lft and video-rt) to adopt the same 41.75px margins currently implemented on cancergov.  Removed the zero left margin from all three existing video size classes (.size50, .size75, and .size100).

## [WCMSFEQ-1338] Sortable Tables Header Row is Broken
### See Content Changes
The Sortable Tables header row was broken on all breakpoints due the load order of the svg-sprite. Cleaned up the sortable table styling to remove unnecessary positioning, add annotations, as well as updated the footer and mobile styles.  

## [WCMSFEQ-1303] The first column header
For sortable tables, the first column (header and corresponding table cells) were misaligned, and (in some tables) sorting the first column makes it appear as tiles.  This is a known bug (and limitation of the use of tables) and occurs when the content in some columns exceed the height of the first.  On mobile, height was set at 200px on mobile, which accomodates most content sizing.  This cannot be set as auto, or inherit, because a table row cannot inherit from the cells, since an element cannot inherit from its descendants, only from ascendants.

## [WCMSFEQ-1274] Get link audioplayer to work on the CDR
### (NO CONTENT CHANGES)
Link audioplayer currently looks only at the href attribute of an anchor to determine the file pathname. On the CDR, this is insufficient and the library needs to also append the search attribute as well. This change support the two methods of retrieving the path to the audiofile.

## [WCMSFEQ-1301] Add DLP override for C152494
### (NO CONTENT CHANGES)
Changes to CancerGov/_src/FileAssets/Configuration/clinical-trials/DynamicTrialListingFriendlyNameOverrideMapping.txt and /CancerGov/_src/FileAssets/Configuration/clinical-trials/OverrideMapping.txt. Added new item to both.

To deploy update these files in Percussion at /Configuration/clinical-trials

## [WCMSFEQ-1323] Highchart label change
### (NO CONTENT CHANGES)
Changed label in charts.js from Average to Average (thousands). This changes the label in the x-axis as well as the hover over data point.

## [WCMSFEQ-1343] Remove capitalization from dictionary terms modal
### (NO CONTENT CHANGES)
Removed text transform capitalize from modal.scss so that the term will show exactly as its coming from the cdr database.

## [WCMSFEQ-1354] Homepage carousel arrows overlap at mobile
### (NO CONTENT CHANGES)
Issue looks like it was introduced with the Modal changes which somehow affected when a sprite mixin was being generated in the css. That sprite was overwriting the display none set in mobile for these carousel arrows. We moved the modal call in nvcg.scss higher up in the list and that seems to fix this issue.


# Content Changes
## [WCMSFEQ-1322]
New class names will have to be applied to elements containing videos. `right` and `left` utility classes can be removed from these elements.

## [WCMSFEQ-1338]
All inline styles must be removed from any sortable table in percussion.
