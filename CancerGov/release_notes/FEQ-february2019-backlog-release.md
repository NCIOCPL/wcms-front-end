# FEQ February 2019 Backlog Release

## [WCMSFEQ-1338] Sortable Tables Header Row is Broken
The Sortable Tables header row was broken on all breakpoints due the load order of the svg-sprite. Cleaned up the sortable table styling to remove unnecessary positioning, add annotations, as well as updated the footer and mobile styles.  

## [WCMSFEQ-1303] The first column header
For sortable tables, the first column (header and corresponding table cells) were misaligned, and (in some tables) sorting the first column makes it appear as tiles.  This is a known bug (and limitation of the use of tables) and occurs when the content in some columns exceed the height of the first.  On mobile, height was set at 200px on mobile, which accomodates most content sizing.  This cannot be set as auto, or inherit, because a table row cannot inherit from the cells, since an element cannot inherit from its descendants, only from ascendants.

# Content Changes
All inline styles must be removed from any sortable table in percussion.