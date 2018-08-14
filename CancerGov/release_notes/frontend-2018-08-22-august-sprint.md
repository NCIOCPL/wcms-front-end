# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-932] All Basic CTS pages (Search Form, Search Results Page and Trial Description Page) looks weird when printed

When printed, the basic CTS pages were missing a border around the fieldset headers (for Cancer Type/Keyword, Age, and U.S. Zip Code) due to the fieldsets using a background color on the page  - background colors do not get printed.  The help icons appeared to be off-center due to the missing background color.  Added a print media query to _cts.basic.scss with a background border for the fieldset legends, and aligned the help icon to the vertical center of the fieldset.  NO CONTENT CHANGES.

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