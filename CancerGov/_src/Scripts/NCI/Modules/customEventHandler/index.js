import { createCustomEventBroadcaster } from 'Utilities/domEvents';

export const customEventGlobalNamespace = 'NCI.UX.Action';
let registeredEventListeners = {};
let isCustomEventHandlerAttached = false;

/**
 * Attach a global listener to the window that handles custom events broadcast using the method broadcastCustomEvent.
 * If the events have an eventType property that corresponds to a custom listener function registered using the method registerCustomEventListener,
 * this function will call that listener with the passed arguments.
 */
const initialize = () => {
    if(!isCustomEventHandlerAttached){
        isCustomEventHandlerAttached = true;
        __attachCustomEventHandler__();
    }
};
export default initialize;

/**
 * DO NOT CALL DIRECTLY!
 * This is a setup function that should not be used directly.
 * It is only being exported for testing purposes.
 */
export const __attachCustomEventHandler__ = () => {
    if(typeof window !== undefined){
        const eventHandler = event => {
            const { 
                target, 
                detail = {}
            } = event;
            const { 
                eventType, 
                data
            } = detail;
            if(
                typeof eventType === 'string' 
                && registeredEventListeners.hasOwnProperty(eventType) 
                && typeof registeredEventListeners[eventType] === 'function'
            ){
                registeredEventListeners[eventType](target, data);
            }
        };
    
        window.addEventListener(customEventGlobalNamespace, eventHandler);
    }
};

/**
 * Dispatch custom events on a DOM node on execution.
 *  
 * 
 * @param {string} eventType Used by the customEventHandler to find the appropriate listener function to execute
 * @param {object} settings
 * @param {HTMLElement} settings.node The event target node
 * @param {object} [settings.data = {}] Any custom user data to be passed through the CustomEvent detail object
 * @return {function} Event Handler
 */
export const broadcastCustomEvent = createCustomEventBroadcaster(customEventGlobalNamespace);

/**
 * Register an event listener to the customEventHandler listener store.
 * 
 * @param {string} eventType the key used to reference the listener
 * @param {function} listener 
 */
export const registerCustomEventListener = (eventType, listener) => {
    if(typeof eventType !== 'string' && typeof listener !== 'function'){
        throw new Error('Expected custom event listener to be a function')
    }
    
    registeredEventListeners = { 
        ...registeredEventListeners, 
        [eventType]: listener 
    };
    return eventType;
}

/**
 * Remove a custom listener from the customEventHandler listener store.
 * 
 * @param {string} eventType
 * @return {function} listener
 */
export const unregisterCustomEventListener = eventType => {
    const { 
        [eventType]: listener, 
        ...otherListeners 
    } = registeredEventListeners;
    registeredEventListeners = otherListeners;
    return listener;
}