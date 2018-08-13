# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

## [WCMSFEQ-1096] Stop PDQ navigation from updating og:url meta tag

In order to meet the current requirement for social sharing via page options, we need to stop updating the og:url with hash paths. 
In addition, deprecated code related to the old page options email sharing link was removed as cleanup.
NO CONTENT CHANGES.

## [WCMSFEQ-1088] Page Options Email Mailto Link - Fix URI Encoding

Links with query params were not embedding correcting in pageOptions mailto href links. This fix corrects that by encoding the links with encodeURIComponent and the surrounding text with encodeURI.


# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```