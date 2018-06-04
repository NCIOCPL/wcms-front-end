import { newWindow } from 'Utilities/popups';
import { getNodeArray, getMetaData } from 'Utilities/domManipulation';

// Currently we aren't using most of these tags since the services themselves are scraping the info they
// need. But I'm leaving this here as a point of reference ('og:title' is the only one being used
// at the moment, by Twitter) BB 3/2018
export const metaTags = [
    ['property', 'og:url'],
    ['property', 'og:title'], 
    // ['property', 'og:description'], 
    // ['property', 'og:site_name'], 
    // ['property', 'og:type'],
    // ['name', 'twitter:card']
]

// In the event that the metaData is not pulled down (which is a non-case as of this comment but might
// change shortly), we want to default to the opengraph url with the canonical as a fallback.
export const getCanonicalURL = document => document.querySelector("link[rel='canonical']").href;

export const getMetaURL = document => document.querySelector("meta[property='og:url']").getAttribute('content');

export const getURL = (document, metaData) => {
    const metaURL = metaData ? metaData['og:url'] : getMetaURL(document);
    return metaURL ? metaURL : getCanonicalURL(document);
}

// We don't want to take the metadata until the share link has been activated (so that if some
// of it was changed dynamically, we can capture the new data)
export const onClickShareButton = ({ 
    link, 
    windowSettings 
}) => () => {
    const metaData = getMetaData(metaTags, document)
    const url = getURL(document, metaData);
    newWindow(link(url, metaData), windowSettings);
}

export const onClickAnalytics = ({ 
    node, 
    detail = {},
}) => event => {
    const analyticsEvent = new CustomEvent('NCI.page_option.clicked', {
        bubbles: true,
        cancelable: true,
        detail,
    });
    node.dispatchEvent(analyticsEvent);
};