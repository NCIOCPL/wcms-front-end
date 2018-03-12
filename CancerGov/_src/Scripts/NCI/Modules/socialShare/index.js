import { newWindow } from 'Utilities/popups';
import { getNodeArray, getMetaData } from 'Utilities/domManipulation';

const shareButtonHooks = ['facebook', 'twitter', 'gplus', 'p'];
const facebookLink = (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const metaTags = [
    ['property', 'og:url'],
    ['property', 'og:title'], 
    ['property', 'og:description'], 
    ['property', 'og:site_name'], 
    ['property', 'og:type'],
    ['name', 'twitter:card']
]

const getCanonicalURL = document => document.querySelector("link[rel='canonical']").href;
const getMetaURL = document => document.querySelector("meta[property='og:url']").getAttribute('content');
const getURL = (document, metaData) => {
    const metaURL = metaData ? metaData['og:url'] : getMetaURL(document);
    return metaURL ? metaURL : getCanonicalURL(document);
}

const initialize = () => {
    console.log('Begin SOCIAL SHARE Plugin');
    const metaData = getMetaData(metaTags, document);
    const url = getURL(document, metaData);
    console.log({metaData});
    console.log({url});
    // newWindow(facebookLink(url))
}

export default initialize;