import GeoPattern from 'geopattern';
import './CTHPPage.scss';

const accordionBackgrounds = {
    ".cthp-overview-title": 'aaa',
    ".cthp-treatment h3": 'bbb',
    ".cthp-research h3": 'ccc',
    ".cthp-causes h3": 'ddd',
    ".cthp-genetics h3": 'eee',
    ".cthp-screening h3": 'fff',
    ".cthp-survival h3": 'ggg',
    ".cthp-general h3": 'hhh',
    ".cthp-overview h3": 'iii',
    ".cthp-pink-feature h3": 'jjj',
    ".cthp-yellow-feature h3": 'kkk',
}

const getElement = (selector, container = document) => container.querySelector(selector);

const buildPattern = seed => {
    const pattern = GeoPattern.generate(seed);
    const dataUrl = pattern.toDataUrl();
    return dataUrl;
}

const insertPatternIntoElement = (element, imgData) => {
    if(element && imgData) {
        element.style.backgroundImage = imgData;
    }
    return element;
}

const processBackgrounds = hash => {
    const elements = Object.entries(hash)
    return elements.map(elementValues => {
        const selector = elementValues[0];
        const element = getElement(selector);
        const seed = elementValues[1];
        const pattern = buildPattern(seed);
        return insertPatternIntoElement(element, pattern)
    })
}

const onPageLoad = () => processBackgrounds(accordionBackgrounds)

window.addEventListener("DOMContentLoaded", onPageLoad)
