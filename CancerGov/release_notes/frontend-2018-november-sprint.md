# Frontend November 2018 Release
This front-end release is primarly geared towards migration preparation work. We've added new styles for modules that will be created later to support `DCEG` content. We've pruned a lot of old and deprecated code. We've added support for microsites such as `NCI-Connect` and the upcoming `My Part` site.

## Tickets
[WCMSFEQ-1161] prune deprecated code
Removing old and deprecated code as well as files that are no longer used. Removing npm modules that are no longer used or needed.

[WCMSFEQ-1187] DCEG Feature Card styles
Adding feature card styles for future DCEG content migration. These styles build off of styles in `_topicFeature.scss` so using old breakpoints (`bp` mixin) to match css declarations.

[WCMSFEQ-1188] DCEG Related Links
Adding styles for future DCEG related links module (a.k.a "asides" or "call-outs"). There may or may not be HTML markup changes prior to migration so two style blocks are included. Placing these styles in InnerPage for now.

[WCMSFEQ-1251] Microsite build support
Modifying the build scripts to include support for microsites or "Themes". Moving the `NCI-Connect` code back into FEQ project from Percussion as the `purple` theme in the `_src\Scripts\NCI\UX\Themes\` folder. New themes will need to be manually added to the config files and `purple` can be used as a template. Each new theme will produce a {theme}.js file as well, weather it's used or not.
### Content Changes Required! See below

# Content Changes
[WCMSFEQ-1251] Microsite build support
  Add and upload the new `svg-sprite-purple.svg` to `\images\design-elements\sprites\`

# Notes
The majority of these changes do not have any UI changes. Smoke tests should catch anything that has been altered.