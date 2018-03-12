import { newWindow } from 'Utilities/popups';
import { getNodeArray } from 'Utilities/domManipulation';

const shareButtonHooks = ['facebook', 'twitter', 'gplus', 'pinterest'];

const getCanonicalURL = () => document.querySelector("link[rel='canonical']").href;
const getMetaURL = () => document.querySelector("meta[property='og:url']").getAttribute('content');
const getURL = () => {
    const metaURL = getMetaURL();
    return metaURL ? metaURL : getCanonicalURL();
}

const initialize = () => {
    console.log('Begin SOCIAL SHARE Plugin');
    console.log(getURL())
}

export default initialize;