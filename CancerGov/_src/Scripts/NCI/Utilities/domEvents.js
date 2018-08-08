/**
 * A higher order function to handle key events. Especially useful in cases where you want multiple keys to
 * trigger the same event. Pass in the callback you want the keypress to trigger and an array 
 * of keys (using either reserved keychar strings or the numeric keycode),
 * and get back out a wrapped version of your function to use as an eventListener callback that is
 * set to trigger only in cases where the keypress event is triggered by 
 * one of the specified keys.
 * 
 * Additional paramaters allow you to control the stopPropagation and preventDefault handling of the browser.
 * @param {object} options
 * @param {function} [options.fn = () => {}]
 * @param {Array<Number|String>} [options.keys = []] 
 * @param {boolean} [options.stopProp = false] 
 * @param {boolean} [options.prevDef = false]
 * @return {function} A wrapped version of your function to pass to use as an eventListener callback
 */
export const keyHandler = options => e => {
    const {fn = () => {}, keys = [], stopProp = true, prevDef = true} = options;
    if (keys.includes(e.key)) {
        stopProp && e.stopPropagation();
        prevDef && e.preventDefault();
        return fn();
    }
}

/**
 * Dispatch custom events on a DOM node on execution... ADD MORE NOTES LATER
 * 
 * @param {HTMLElement} DOMNode 
 * @param {string} [eventName = 'DEFAULT_CUSTOM_EVENT'] 
 * @param {Object} [detail = {}] 
 */
export const emitCustomEvent = (DOMNode, eventName = 'DEFAULT_CUSTOM_EVENT', detail = {}) => {
    const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail,
    });
    DOMNode.dispatchEvent(event);
}