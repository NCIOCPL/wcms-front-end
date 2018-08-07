# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

## [WCMSFEQ-1091] jQuery UI Selectmenu Accessibility Fix
### (NO CONTENT CHANGES)

The crux of the problem was that the extension that was created to obviate the accessibility issues was loading after the first pass of the selectmenu plugin. Fixing the issue only required flipping the order of execution.

However, to avoid similar issues in the future as well as to continue our efforts towards cleaning up Common.js, I have moved all the jquery UI extension scripts into their own file, which can be pulled in right after jquery itself and before any other modules (which may utilize jQuery UI) have a chance to execute.


# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```