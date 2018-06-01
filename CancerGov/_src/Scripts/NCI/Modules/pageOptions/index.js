import { getNodeArray } from 'Utilities/domManipulation';
import pageOptionsTypes from './types';

// ################## POLYFILL ######################
// TODO: Move to polyfills - this is for ie9-11 compatibility used by module utility functions
(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
  
    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
     }
  
    CustomEvent.prototype = window.Event.prototype;
  
    window.CustomEvent = CustomEvent;
})();
// ##################################################

const getPageOptionsNodes = (pageOptionsTypes) => {
    // Creating a new copy of the object. Why not use For...in instead of this more complicated
    // array reduction pattern? Because we don't want to iterate over any potential enumerables on the prototype.
    const pageOptions = Object.entries(pageOptionsTypes).reduce((acc, [type, settings]) => {
        const { hook, link, windowSettings, initialize, initializeAnalytics } = settings;
        const nodes = getNodeArray(hook)
            .map(initialize(settings))
            .map(initializeAnalytics)
        acc[type] = { hook, link, nodes, windowSettings };
        return acc;
    }, {})
    return pageOptions;
}

const initialize = () => {
    const pageOptions = getPageOptionsNodes(pageOptionsTypes);
    return pageOptions;    
}

export default initialize;
