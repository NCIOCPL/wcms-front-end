#Frontend-2018-07-20: FEQ Bucket Release (508 and Architecture Tickets)

TBD...

##  [WCMSFEQ-1063] Roll ContentPage into Common

Instead of two global js files being requested on each page, we will only have one. Other tickets will ideally pare this file down.

Content changes are required to make sure all the Percussion templates are no longer slotting in ContentPage.

## [WCMSFEQ-1052] Add Aria-Label to pageoptions for 508 compliance

The title attribute was felt to be insignificant for 508 purposes on the empty anchor tags used in the page options (as click handler targets). This change sets the title content as the aria-label as well, both in english and in spanish as a part of the template and of the pageOptions module.