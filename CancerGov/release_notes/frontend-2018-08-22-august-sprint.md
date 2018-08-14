# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-980] A White Line Appears at the Bottom (below the footer) of different pages on IE-11

On some spanish pages in IE only, a white line is appearing at the very bottom of the page (below the footer).  It seems to be an issue with the <sup>®</sup> and it having a CSS reset style of vertical-align: baseline. Added vertical-align: text-top the <sup> element to overwrite this and remove white line at the bottom of the page. NO CONTENT CHANGES.


## [WCMSFEQ-1086] Hide Font Resizer on App Module Pages

Some App Module pages only receive the InnerPage template and provide no simple way to disable features that are required on other Inner Pages (such as those used for content). Because an appmodule specific class is added to the body element, we can use that to implement a hack to hide the font resizer using CSS.
NO CONTENT CHANGES.

## [WCMSFEQ-1091] jQuery UI Selectmenu Accessibility Fix

The crux of the problem was that the extension that was created to obviate the accessibility issues was loading after the first pass of the selectmenu plugin. Fixing the issue only required flipping the order of execution.
However, to avoid similar issues in the future as well as to continue our efforts towards cleaning up Common.js, I have moved all the jquery UI extension scripts into their own file, which can be pulled in right after jquery itself and before any other modules (which may utilize jQuery UI) have a chance to execute.
NO CONTENT CHANGES.

## [WCMSFEQ-1087] Stricter Dependency Management

Begin tracking package-lock.json for better out of the box dependency locking.
NO CONTENT CHANGES.

## [WCMSFEQ-1096] Stop PDQ navigation from updating og:url meta tag

In order to meet the current requirement for social sharing via page options, we need to stop updating the og:url with hash paths. 
In addition, deprecated code related to the old page options email sharing link was removed as cleanup.
NO CONTENT CHANGES.

## [WCMSFEQ-1088] Page Options Email Mailto Link - Fix URI Encoding

Links with query params were not embedding correcting in pageOptions mailto href links. This fix corrects that by encoding the links with encodeURIComponent and the surrounding text with encodeURI.

## [WCMSFEQ-1081] Hide Missing Language Warnings on Page Options

The page options getContent utility function logs a warning when a piece of content does not have a translation in the desired language and is falling back to the English default. In the case of trademarked names like Google and Facebook, no translation is necessary so the fall.back works. However, to alleviate concerns about seeing warnings on Spanish pages in the console, I'm provided redundant spanish translations to stop the warning from appearing.
NO CONTENT CHANGES.

## [WCMSFEQ-1099] Updates to s_code
###(Requires updating static.cancer.gov)

Changes in concert with a CDE release. See Dion for deployment step. (He will be handling it). This was a working CDE branch that got merged into FEQ.

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```