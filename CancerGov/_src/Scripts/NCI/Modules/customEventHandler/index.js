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
            ){
                const listeners = registeredEventListeners[eventType];
                listeners.forEach(listener => listener(target, data));
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
 * @return {object} { eventType: string, listener: function }
 */
export const registerCustomEventListener = (eventType, listener) => {
    if(typeof eventType !== 'string' && typeof listener !== 'function'){
        throw new Error('Expected custom event listener to be a function')
    }
    
    // If the eventType is already registered we want to add to the array, otherwise create a new array of listeners
    registeredEventListeners = { 
        ...registeredEventListeners, 
        [eventType]: registeredEventListeners.hasOwnProperty(eventType) ? [ ...registeredEventListeners[eventType], listener ] : [ listener ]
    };
    return { eventType, listener };
}

/**
 * Remove a custom listener from the customEventHandler listener store.
 * 
 * @param {string} eventType
 * @return {object} { eventType: string, listener: function }
 */
export const unregisterCustomEventListener = (eventType, listenerToUnregister) => {
    if(!registeredEventListeners.hasOwnProperty(eventType)){
        // Can't unregister for an eventType that has no registered listeners
        return;
    }

    const listeners = registeredEventListeners[eventType];
    const filteredListeners = listeners.filter(listener => listener !== listenerToUnregister);

    if(listeners.length === filteredListeners.length){
        // Specific listener could not be found in event type array to deregister
        return;
    }

    if(filteredListeners.length){
        registeredEventListeners = {
            ...otherListeners,
            [eventType]: filteredListeners,
        };
    }
    else{
        // Delete the property if the array is empty
        const { 
            [eventType]: listener, 
            ...otherListeners 
        } = registeredEventListeners;
        registeredEventListeners = otherListeners;
    }
    
    return { eventType, listener: listenerToUnregister };
}