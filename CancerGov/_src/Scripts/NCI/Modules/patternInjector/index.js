import GeoPattern from 'GeoPattern';
import { getNodeArray } from 'Utilities//domManipulation';

/**
 * This is a helper library that wraps the GeoPattern external library and simplifies component calls to it for
 * injecting patterns into the DOM.
 * 
 */

const buildPattern = (seed = `${Date.now()}`) => {
    let pattern;
    if(typeof seed === 'string') {
        pattern = GeoPattern.generate(seed);
    } 
    else if(typeof seed === 'object') {
        try {
            pattern = GeoPattern.generate(seed.str, seed.options)
        }
        catch(err) {
            pattern = GeoPattern.generate(seed.str)
            console.log('Invalid options', err)
        }
    }
    else {
        throw new Error('Invalid seed provided for GeoPattern')
    }
    const dataUrl = pattern.toDataUrl();
    return dataUrl;
};

const insertPatternIntoElement = (element, imgData) => {
    if(element && imgData) {
        element.style.backgroundImage = imgData;
    }
    return element;
};

/**
 * Using the GeoPattern NPM library, inject on-the-fly rendered SVG patterns into the DOM. 
 * Pass a settings object containing keys matching a selector string for the elements you wish to process, 
 * and values that are either a string (representing a random seed) or an object with color, basecolor, and or generator
 * keys with string values (see https://github.com/btmills/geopattern for a more detailed explanation)
 * 
 * @param {object} settings 
 */
const processBackgrounds = settings => {
    const elementTypes = Object.entries(settings);
    return elementTypes.map(elementValues => {
        const selector = elementValues[0];
        const elements = getNodeArray(selector);
        const seed = elementValues[1];
        const pattern = buildPattern(seed);
        return elements.map(element => insertPatternIntoElement(element, pattern));
    });
}

export default processBackgrounds;