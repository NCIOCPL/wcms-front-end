# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

## [WCMSFEQ-1086] Hide Font Resizer on App Module Pages
### (NO CONTENT CHANGES)

Some App Module pages only receive the InnerPage template and provide no simple way to disable features that are required on other Inner Pages (such as those used for content). Because an appmodule specific class is added to the body element, we can use that to implement a hack to hide the font resizer using CSS.

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```