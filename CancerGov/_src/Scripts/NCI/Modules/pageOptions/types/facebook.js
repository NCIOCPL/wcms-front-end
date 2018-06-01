import {
    onClickShareButton,
    onClickAnalytics,
} from '../utilities';

const facebook =  {
    hook: '.social-share--facebook a',
    link: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
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
}

export default facebook;