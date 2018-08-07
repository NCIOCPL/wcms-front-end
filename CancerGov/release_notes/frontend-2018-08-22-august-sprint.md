# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

## [WCMSFEQ-1088] Page Options Email Mailto Link - Fix URI Encoding

Links with query params were not embedding correcting in pageOptions mailto href links. This fix corrects that by encoding the links with encodeURIComponent and the surrounding text with encodeURI.

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```