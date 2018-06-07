import {
    onClickShareButton,
    onClickAnalytics,
    getContent,
} from '../utilities';

const twitter = {
    hook: '.social-share--twitter a',
    link: (url, {'og:title': text}) => `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${text}`, 
    windowSettings: {},
    textContent: {
        title: {
            'en': () => 'Twitter',
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

export default twitter;