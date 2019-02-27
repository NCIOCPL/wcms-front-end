# FEQ MyPART Microsite Creation

## [WCMSFEQ-1237] My Part Style Requirements
This story involves the creation of a new microsite palette for cancer.gov, blue. This palette is being used for the new microsite, MyPART, /nci/pediatric-adult-rare-tumor. Creation included a new theme folder, /Scripts/NCI/UX/Themes/blue. In this folder is a them style sheet, blue.scss and a javascript file, blue.js, which has not had any javascript added.

The main work of the theme occurs in blue.scss. It starts off by defining a color palette naming convention. It is followed by variable declarations of all the changeable items in the theme. Finally, those items are applied to individual styles to override cancer.gov default styling to produce the theme.

In addition to CSS changes, the theme includes a number of SVG image changes. These images are located in /Scripts/NCI/UX/Themes/blue/images/sprites/svg. The build process creates a single sprite image from all the svgs, svg-sprite-blue.svg.

# Release Steps
1. Upload /images/design-elements/sprites/svg-sprite-blue.svg to /CancerGov/images/design-elements/sprites folder in Percussion
2. Upload /Styles/Blue.css to /CancerGov/Configuration/css (this file is slotted into the navon in /pediatric-adult-rare-tumor)

# Content Changes
No content changes required. Content has been made directly to prod environment.