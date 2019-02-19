# FEQ February 2019 Backlog Release

## [WCMSFEQ-1274] Get link audioplayer to work on the CDR
### (NO CONTENT CHANGES)

Link audioplayer currently looks only at the href attribute of an anchor to determine the file pathname. On the CDR, this is insufficient and the library needs to also append the search attribute as well. This change support the two methods of retrieving the path to the audiofile.

# Content Changes
No content changes required

## [WCMSFEQ-1354] Homepage carousel arrows overlap at mobile
### (NO CONTENT CHANGES)

Issue looks like it was introduced with the Modal changes which somehow affected when a sprite mixin was being generated in the css. That sprite was overwriting the display none set in mobile for these carousel arrows. We moved the modal call in nvcg.scss higher up in the list and that seems to fix this issue.

# Content Changes
No content changes required