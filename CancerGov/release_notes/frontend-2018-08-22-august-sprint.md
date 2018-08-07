# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

## [WCMSFEQ-1081] Hide Missing Language Warnings on Page Options
### (NO CONTENT CHANGES)

The page options getContent utility function logs a warning when a piece of content does not have a translation in the desired language and is falling back to the English default. In the case of trademarked names like Google and Facebook, no translation is necessary so the fall.back works. However, to alleviate concerns about seeing warnings on Spanish pages in the console, I'm provided redundant spanish translations to stop the warning from appearing.

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```