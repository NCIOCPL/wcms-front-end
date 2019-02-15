# FEQ February 2019 Backlog Release

## [WCMSFEQ-1274] Get link audioplayer to work on the CDR
### (NO CONTENT CHANGES)

Link audioplayer currently looks only at the href attribute of an anchor to determine the file pathname. On the CDR, this is insufficient and the library needs to also append the search attribute as well. This change support the two methods of retrieving the path to the audiofile.

# Content Changes
No content changes required