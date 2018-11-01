# FEQ October 2018 Release

## [WCMSFEQ-1189] Fix Exit Disclaimer on R4R Resource

The custom event listener was being bound after the `Load Resource` event was triggered on cached pages. Adjusted the script to bind event subscribers earlier.

## [WCMSFEQ-1179] Scroll events are not throttled, generating too many events

Jettisoned `jquery-scrolltofixed.js` in favor of `scrollMonitor`. Hooked up passive event listeners for `headroom.js` and `backToTop.js`. Applied event throttling, debouncing and requestAnimationFrame to improve performance on scroll and resize events as well as to reduce the amount of layout thrashing (particularly in Firefox). Applied some minor code optimizations to `backToTop.js` as well. `jquery-scrolltofixed.js` is now depricated.

## [WCMSFEQ-1178] When resizing the browser window the page scrolls downward to the footer

Fixed the issue where element calculations were being triggered on every resize event. Also fixed another issue where the fixed element placeholder dimensions were not being recalculated properly between breakpoints.

## [WCMSFEQ-1178] Fall 2018 Cleaning - Remove deprecated code
Pruning deprecated code and removing unsued Node Modules from the project

## [WCMSFEQ-1159] Fix issue with megamenu functionality when initializes at tablet breakpoints

Since it's inception, there has been a bug in the megamenu that caused certain pieces of functionality to not be added to the module on instantiation at screen sizes below 1024px. This fix conditionally creates a self-expiring (cue the Mission Impossible theme song) media listener that will let the existing megamenu instance rerun it's setup functions when a user goes from tablet to desktop size for the first time. 

In addition, the throttle-debounce dependency was used and as such updated, so the package-lock is updated as well.

## [WCMSFEQ-699] Fix sitewide search behavior when developing on local environments

At some point SWS stopped working on localhost. Turns out, recent (annoyingly undocumented) updates to the proxy library dependency version we were already using (express-http-proxy) fix this issue without any other code changes being necessary. (Under the hood, they improved their handling of non-GET http requests: SWS uses a POST). 

## [WCMSFEQ-1105] Refactor AMD and UMD Modules into ES6 modules

This represents a massive refactor of some 75 js files. The idea is to deprecate the use of require.js/AMD style modules (and UMD where unnecessary) in favor of ES6 modules (import/export). This is not a full refactor, but many singletons needed to be fixed and in a few other cases (eg a lingering global assignment) code was cleaned up minorly. In addition, the API for some imports changed and this is reflected in the changes to Common.js most clearly. A few files have not been converted, either because they are already deprecated and awaiting deletion or because they are jquery-ui extensions and would be a more substantial undertaking for less obvious gains. 

All code is now evaluated with the "use strict" mode. Undeclared JavaScript variables are no longer allowed. This issue has been resolved up in several analytics files (mostly found in CTS App Module).

## [WCMSFEQ-1190] Some analytics clicks are not working on CTS

Related to `[WCMSFEQ-1105]`. Resolved undeclared variables causing script errors.

## Hotfix the errorPage template in Percussion
After switching the codebase to all ES6 modules, the megamenu stopped working on 404 Error Pages. The root cause seemed to be that script loading was not deferred on the errorPage template. We updated the errorPage template to defer scripts, remove jplayer as well as a few other overdue updates.

## [WCMSFEQ-873] Replace jplayer with new custom module, linkAudioPlayer

The jplayer library previously being used to create audio elements from anchor tags with mp3 links has become unnecessary now that we no longer need to support browsers that do not support HTML5 audio elements. This release is a new custom module that replaces the heavier jquery/jplayer dependency.

## [WCMSFEQ-377] Dictionary pronunciations do not work on some Android devices and <br/> [WCMSFEQ-893] Prod-The Audio is not working on mobile device for Dictionaries

Related to `[WCMSFEQ-873]`. Our audio links are `<a>` tags and the default click event was being prevented so the browser's default audio player would not be triggered. This also hides the user interaction from the mobile browser. The code has been updated to circumvent this issue.

## [WCMSFEQ-1167] Remove Google+ support
### CONTENT CHANGES REQUIRED!

Bye bye Google+, we hardly knew thee. Enjoy your time in the great halls of valhalla amongst your brethern like Geocities, Orkut, and Hi5!

Because our footer is hardcoded in a content block, manual changes in percussion to that block will be required, the full changes are detailed below.

# Content Changes

## [WCMSFEQ-1167] Remove Google+ support

Remove the following block from 
  - 'CancerGov/SharedItems/SiteFooter/NVCG Site Footer - English'
  - 'CancerGov/SharedItems/SiteFooter/NVCG Site Footer - Spanish'
  - 'CancerGov/sites/nano/NSDB Site Footer`:

`<li><a class="googleplus icon" onclick="NCIAnalytics.FooterLink(this, 'Google+');" href="/social-media#google+"> <span class="hidden">Google+</span> </a></li>`

