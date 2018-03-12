import { newWindow } from 'Utilities/popups';
import { getNodeArray, getMetaData } from 'Utilities/domManipulation';

const FACEBOOK = 'facebook';
const TWITTER = 'twitter';
const GOOGLEPLUS = 'googleplus';
const PINTEREST = 'pinterest';
const shareButtonHooks = [
    {
        type: FACEBOOK,
        hook: '.social-share--facebook a',
    },
    {
        type: TWITTER,
        hook: '.social-share--twitter a',
    },
    {
        type: GOOGLEPLUS,
        hook: '.social-share--googleplus a',
    },
    {
        type: PINTEREST,
        hook: '.social-share--pinterest a',
    },
];
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

const getShareButtonNodes = (shareButtonHooks) => {
    const shareButtons = shareButtonHooks.map(({type, hook}) => {
        return {
            type,
            hook,
            nodes: getNodeArray(hook)
        };
    });
    return shareButtons;
}

const facebookLink = (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

const initialize = () => {
    console.log('Begin SOCIAL SHARE Plugin');
    const metaData = getMetaData(metaTags, document);
    const url = getURL(document, metaData);
    const shareButtons = getShareButtonNodes(shareButtonHooks);
    console.log({metaData});
    console.log({url});
    console.log({shareButtons})
    
}

export default initialize;