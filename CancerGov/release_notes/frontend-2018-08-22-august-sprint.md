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
### (Requires updating static.cancer.gov)

Changes in concert with a CDE release. See Dion for deployment step. (He will be handling it). This was a working CDE branch that got merged into FEQ.

## [WCMSFEQ-1093] New Custom Event Broadcasting System (for analytics and other uses)
### (NO CONTENT CHANGES)

We're moving towards an event system where almost all events are broadcast globally and handled by a listener attached to the window. This is particularly useful for analytics reporting. 

Previously, in the analytics.js file, a querySelector would find an element and attach a click handler to it. The click handler would directly interface with the NCIAnalytics global object (which would in turn interface with another global module, s_code, which does the actual analytics reporting). The idea going forward is to move the click event listener callback into the relevant module and instead of having it directly reference NCIAnalytics with custom analytics related data processing it will simply broadcast an event to the global listener with a custom event type. 

In order for that to be useful, first the module must also subscribe a listener that handles the event (where interfacing with NCIAnalytics will take place) to the global listener. That subscribed listener will be called by the global listener on each matching event type it intercepts. The custom listener will contain the analytics setup logic that was previously directly handled by the click event listener.

Implementing this will be a two step process, in anticipation of moving towards incorporating DTM and other potential future changes we are going to constrain the changes for now. Until the second part, some logic will stay in the analytics.js file -- instead of being a bucket file of all the click handlers, it will be a bucket of customEventListeners. Setting up the click handlers will be moved closer to the code (ie into the relevant module) as much as possible -- generic handlers will remain in analytics.js now with the intent to be broken out later. In addition, in many places the data processing for event reporting logic is split between the analytics.js clickhandler and the matxhing NCIAnalytics method. The goal is to combine this wholly into the custom listener callback as well. Eventually NCIAnalytics should simply be a class with agnostic methods designed to directly call s_code, and not custom methods. 

In the future, these custom listeners will be scoped to their own modules.

An explanation of how to implement is as follows:

I create a new module for an animated button. The button markup comes from the template (the DOM is not rewritten) but it's functionality is extended by the module. In cases like these, typically I would then go into analytics.js and use a jquery selector that uniquely identifies this button and attach a click event listener with a callback that extracts the relevant event data and passes it to a custom NCIAnalytics method (eg NCIAnalytics.AnimatedButton). Instead, in the module itself I am going to import the method broadcastCustomEvent from the customEventHandler library. Inside the animated button module, where I have attached event listeners to whatever activity is is being monitored by the library (for example mouse position changes, keypresses, or clicks), I can add a call to broadcastCustomEvent inside the callback. The first argument is a string that the global handler will use to lookup the matching subscribed listener. Now I need to create the subscribed listener that will know how to respond to the custom event. (For now, this listener is going to be in analytics.js). In analytics.js I will import the method registerCustomEventListener from the customEventHandler library. I then call this method with the first argument being a string that matches the name of the custom event type I want to listen for and the second argument being the listener function itself. Again, for now, this listener is being defined in place, but will be modularized later. It's in this listener that we talk to NCIAnalytics directly.

An example of how it looks in implementation:

```javascript
// animatedButton.js
import { broadcastCustomEvent } from 'Modules/customEventHandler';

const animatedButton = document.querySelector('#animated-button');
const onClick = event => {
  event.target.classlist.toggle('active');
  broadcastCustomEvent('NCI.animated-button.click', { 
    node: event.target, 
    data: { 
      currentState: event.target.classlist.indexOf('active') !== -1 ? 'active' : 'inactive'
    }
  });
}
animatedButton.addEventListener('click', onClick);
```

```javascript
// analytics.js
import { registerCustomEventListener } from 'Modules/customEventHandler';
...
const animatedButtonClickAnayticsEvent = (target, data) => {
  const { currentState } = data;
  const clickParams = new NCIAnalytics.ClickParams(target, 'nciglobal', 'o', 'NCI.animated-button.click');
  clickParams.Events = [42];
  clickParams.Evars = {
    43: 'Animated Button'
  };
  clickParams.Props = {
    44: currentState,
  };
  clickParams.LogToOmniture();
};
registerCustomEventListener('NCI.animated-button.click', animatedButtonClickAnalyticsEvent);
...
```

## [WCMSFEQ-1098] Hotfix to NCI Logo analytics
### (NO CONTENT CHANGES)

A few years ago the class being attached to the main NCI logo and the analytics function hooking into it got out of sync. This change is just pointing the existing analytics function at the correct selector.

## [WCMSFEQ-1062] Port CTS Tests from Karma/Mocha/Chai/Sinon to Jest
### (NO CONTENT CHANGES)

Now that we have Jest in place as the FEQ test framework of choice. Tests previously supported by a Karma suite needed to be ported over. To do so the Jest setup was extended to support Typescript tests.

## [WCMSFEQ-932] All Basic CTS pages (Search Form, Search Results Page and Trial Description Page) looks weird when printed
### (NO CONTENT CHANGES)

When printed, the basic CTS pages were missing a border around the fieldset headers (for Cancer Type/Keyword, Age, and U.S. Zip Code) due to the fieldsets using a background color on the page  - background colors do not get printed.  The help icons appeared to be off-center due to the missing background color.  Added a print media query to _cts.basic.scss with a background border for the fieldset legends, and aligned the help icon to the vertical center of the fieldset.

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```