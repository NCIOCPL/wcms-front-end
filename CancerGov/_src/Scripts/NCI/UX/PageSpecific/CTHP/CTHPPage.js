import GeoPattern from 'geopattern';
import './CTHPPage.scss';

const overviewSettings = {
    str: '',
    options: {
        color: '#543ecd',
        generator: 'concentricCircles'
    }
}

const accordionBackgrounds = {
    ".cthp-overview-title": overviewSettings,
    ".cthp-overview h3": overviewSettings,
    ".cthp-treatment h3": {
        str: '',
        options: {
            color: '#00c088',
            generator: 'sineWaves'
        }
    },
    ".cthp-research h3": {
        str: '',
        options: {
            color: '#1e7dc5',
            generator: 'tessellation'
        }
    },
    ".cthp-causes h3": {
        str: '',
        options: {
            color: '#8127a9',
            generator: 'nestedSquares'
        }
    },
    ".cthp-genetics h3": 'NONE',
    ".cthp-screening h3": {
        str: '',
        options: {
            color: '#c6395a',
            generator: 'triangles'
        }
    },
    ".cthp-survival h3": {
        str: '',
        options: {
            color: '#d6891a',
            generator: 'squares'
        }
    },
    ".cthp-general h3": {
        str: '',
        options: {
            color: '#119bb5',
            generator: 'octogons' // The library maker mispelled it in the source :p
        }
    },
    ".cthp-pink-feature h3": {
        str: '',
        options: {
            color: '#ce2daf',
            generator: 'mosaicSquares'
        }
    },
    ".cthp-yellow-feature h3": {
        str: '',
        options: {
            color: '#dbc416',
            generator: 'hexagons'
        }
    },
}

const getDOMElement = (selector, container = document) => container.querySelector(selector);

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
}

const insertPatternIntoElement = (element, imgData) => {
    if(element && imgData) {
        element.style.backgroundImage = imgData;
        element.style.backgroundSize = '30%'; // Because scale is hardcoded we have to try little hacks to replicate the original pattern scale
    }
    return element;
}

const processBackgrounds = hash => {
    const elements = Object.entries(hash)
    return elements.map(elementValues => {
        const selector = elementValues[0];
        const element = getDOMElement(selector);
        const seed = elementValues[1];
        const pattern = buildPattern(seed);
        return insertPatternIntoElement(element, pattern)
    })
}

const onPageLoad = () => processBackgrounds(accordionBackgrounds)

window.addEventListener("DOMContentLoaded", onPageLoad)
