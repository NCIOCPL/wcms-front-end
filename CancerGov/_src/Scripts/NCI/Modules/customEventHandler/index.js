import { createCustomEventBroadcaster } from 'Utilities/domEvents';

const eventNamespace = 'NCI.UX.Action';
let registeredEventListeners = {};

let isCustomEventHandlerAttached = false;
const initialize = () => {
    if(!isCustomEventHandlerAttached){
        isCustomEventHandlerAttached = true;
        attachCustomEventHandler();
    }
};
export default initialize;

export const attachCustomEventHandler = () => {
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
    
        window.addEventListener(eventNamespace, eventHandler);
    }
};

/**
 * Dispatch custom events on a DOM node on execution... ADD MORE NOTES LATER
 * 
 * @param {string} eventType 
 * @param {object} settings
 * @param {HTMLElement} settings.node
 * @param {object} [settings.data = {}]
 * @return {function} Event Handler
 */
export const broadcastCustomEvent = createCustomEventBroadcaster(eventNamespace);


export const registerCustomEventListener = (eventType, listener) => {
    if(typeof eventType !== 'string' && typeof listener !== 'function'){
        throw new Error('Expected custom event listener to be a function')
    }
    
    registeredEventListeners = { 
        ...registeredEventListeners, 
        eventType: listener 
    };
    return eventType;
}

export const unregisterCustomEventListener = eventType => {
    const { 
        eventType: listener, 
        ...otherListeners 
    } = registeredEventListeners;
    registeredEventListeners = otherListeners;
    return listener;
}