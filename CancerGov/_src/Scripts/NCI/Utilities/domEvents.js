/**
 * A higher order function to handle key events. Especially useful in cases where you want multiple keys to
 * trigger the same event. Pass in the callback you want the keypress to trigger and an array 
 * of keys (using either reserved keychar strings or the numeric keycode),
 * and get back out a wrapped version of your function to use as an eventListener callback that is
 * set to trigger only in cases where the keypress event is triggered by 
 * one of the specified keys.
 * 
 * Additional paramaters allow you to control the stopPropagation and preventDefault handling of the browser.
 * 
 * @param {function} fn 
 * @param {Array<Number|String>} [keys = []] 
 * @param {boolean} [stopProp = true] 
 * @param {boolean} [prevDef = true]
 * @return {function} A wrapped version of your function to pass to use as an eventListener callback
 */
export const keyHandler = (fn, keys = [], stopProp = true, prevDef = true) => e => {

    stopProp && e.stopPropagation();
    prevDef && e.preventDefault();
    
    if (keys.includes(e.key)) {
        return fn();
    }
}