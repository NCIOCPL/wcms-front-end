import {
    onClickShareButton,
    onClickAnalytics,
    getContent,
} from '../utilities';

const googleplus = {
    hook: '.social-share--googleplus a',
    link: url => `https://plus.google.com/share?url=${encodeURIComponent(url)}`,
    windowSettings: {},
    textContent: {
        title: {
            'en': () => 'Google+',
        },
    },
    initialize: language => settings => node => {
        const title = getContent(settings.textContent.title, language)();
        node.title = title;
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