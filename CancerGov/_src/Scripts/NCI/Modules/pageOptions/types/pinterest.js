import {
    onClickShareButton,
    onClickAnalytics,
} from '../utilities';

const pinterest = {
    hook: '.social-share--pinterest a',
    link: url => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
    windowSettings: {
        width: 700
    },
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

export default pinterest;