# FEQ February 2019 Backlog Release

## [WCMSFEQ-1322] [Change Request] DCEG Video Player Padding
### (NO CONTENT CHANGES)

Inline video player on DCEG (set to left or right) had a forced zero-set left margin, so content was flush against the video player.  Created two video classes (video-lft and video-rt) to adopt the same 41.75px margins currently implemented on cancergov.  Removed the zero left margin from all three existing video size classes (.size50, .size75, and .size100).

## [WCMSFEQ-1274] Get link audioplayer to work on the CDR
### (NO CONTENT CHANGES)

Link audioplayer currently looks only at the href attribute of an anchor to determine the file pathname. On the CDR, this is insufficient and the library needs to also append the search attribute as well. This change support the two methods of retrieving the path to the audiofile.

# Content Changes
No content changes required