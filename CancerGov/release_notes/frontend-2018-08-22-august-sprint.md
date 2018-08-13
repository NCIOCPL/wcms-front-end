# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-1086] Hide Font Resizer on App Module Pages

Some App Module pages only receive the InnerPage template and provide no simple way to disable features that are required on other Inner Pages (such as those used for content). Because an appmodule specific class is added to the body element, we can use that to implement a hack to hide the font resizer using CSS.
NO CONTENT CHANGES.

## [WCMSFEQ-1091] jQuery UI Selectmenu Accessibility Fix
### (NO CONTENT CHANGES)

The crux of the problem was that the extension that was created to obviate the accessibility issues was loading after the first pass of the selectmenu plugin. Fixing the issue only required flipping the order of execution.

However, to avoid similar issues in the future as well as to continue our efforts towards cleaning up Common.js, I have moved all the jquery UI extension scripts into their own file, which can be pulled in right after jquery itself and before any other modules (which may utilize jQuery UI) have a chance to execute.


## [WCMSFEQ-1087] Stricter Dependency Management

Begin tracking package-lock.json for better out of the box dependency locking.
NO CONTENT CHANGES.

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