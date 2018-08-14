# Frontend-2018-08-22: FEQ August Release

## [WCMSFEQ-###] Ticket Title

Description

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

# Content Changes

## [WCMSFEQ-###] Ticket Title
1. In Percussion, do these things...

  ```html   
  <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
  ```