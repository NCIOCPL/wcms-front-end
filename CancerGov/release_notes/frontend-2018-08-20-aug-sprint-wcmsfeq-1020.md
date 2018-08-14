# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-1020] Use Sprite Mixin for CTHP dropdown styling

The CTHP dropdown arrows were set up to use the svgsprite-mixin, but the background positioning was hardcoded.  This needed to be fixed because the dropdown arrows could potentially break whenever the svg-sprite.svg file was updated.  Instead of using the svg-sprite mixin within the Table/Mobile styles media query, the hardcoded positioning elements were removed and it was reassigned to outside the media query.
