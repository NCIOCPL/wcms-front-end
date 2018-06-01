import {
    onClickShareButton,
    onClickAnalytics,
} from '../utilities';

const googleplus = {
    hook: '.social-share--googleplus a',
    link: url => `https://plus.google.com/share?url=${encodeURIComponent(url)}`,
    windowSettings: {},
    initialize: settings => node => {
        node.addEventListener('click', onClickShareButton(settings));
        return node;
    },
    initializeAnalytics: node => {
        const detail = {
            type: 'BookmarkShareClick',
        };
        node.addEventListener('click', onClickAnalytics({ node, detail }))
        return node;
    },
};

export default googleplus;