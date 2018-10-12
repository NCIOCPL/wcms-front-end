# FEQ October 2018 Release

## [WCMSFEQ-###] Ticket Title
### (NO CONTENT CHANGES)

Include: reason for changes, description of changes, any relevant code examples, and  any manual/content changes required as part of this commit.

```javascript
// path/to/file/<filename>.js
let codeExample = this
```

## [WCMSFEQ-1159] Fix issue with megamenu functionality when initializes at tablet breakpoints
### (NO CONTENT CHANGES)

Since it's inception, there has been a bug in the megamenu that caused certain pieces of functionality to not be added to the module on instantiation at screen sizes below 1024px. This fix conditionally creates a self-expiring (cue the Mission Impossible theme song) media listener that will let the existing megamenu instance rerun it's setup functions when a user goes from tablet to desktop size for the first time. 

In addition, the throttle-debounce dependency was used and as such updated, so the package-lock is updated as well.

## [WCMSFEQ-699] Fix sitewide search behavior when developing on local environments
### (NO CONTENT CHANGES)

At some point SWS stopped working on localhost. Turns out, recent (annoyingly undocumented) updates to the proxy library dependency version we were already using (express-http-proxy) fix this issue without any other code changes being necessary. (Under the hood, they improved their handling of non-GET http requests: SWS uses a POST). 

## [WCMSFEQ-1105] Refactor AMD and UMD Modules into ES6 modules
### (NO CONTENT CHANGES)

This represents a massive refactor of some 75 js files. The idea is to deprecate the use of require.js/AMD style modules (and UMD where unnecessary) in favor of ES6 modules (import/export). This is not a full refactor, but many singletons needed to be fixed and in a few other cases (eg a lingering global assignment) code was cleaned up minorly. In addition, the API for some imports changed and this is reflected in the changes to Common.js most clearly. A few files have not been converted, either because they are already deprecated and awaiting deletion or because they are jquery-ui extensions and would be a more substantial undertaking for less obvious gains. 

## [WCMSFEQ-1167] Remove Google+ support
### CONTENT CHANGES REQUIRED!

Bye bye Google+, we hardly knew thee. Enjoy your time in the great halls of valhalla amongst your brethern like Geocities, Orkut, and Hi5!

Because our footer is hardcoded in a content block, manual changes in percussion to that block will be required, the full changes are detailed below.

# Content Changes

## [WCMSFEQ-###] Updates to {percussion asset}

Requires update to...

## [WCMSFEQ-1167] Remove Google+ support

Remove the following block from 'CancerGov/SharedItems/SiteFooter/NVCG Site Footer - English' and 'CancerGov/SharedItems/SiteFooter/NVCG Site Footer - Spanish':

<li><a class="googleplus icon" onclick="NCIAnalytics.FooterLink(this, 'Google+');" href="/social-media#google+"> <span class="hidden">Google+</span> </a></li>

