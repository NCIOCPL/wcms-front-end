import { onClickAnalytics } from '../utilities';

const print = {
    hook: '.page-options--print a',
    initialize: () => node => {
        node.addEventListener('click', e => {
            e.preventDefault();
            window.print();
        })
        return node;
    },
    initializeAnalytics: node => {
        const detail = {
            type: 'PrintLink',
        };
        node.addEventListener('click', onClickAnalytics({ node, detail }))
        return node;
    },
};

export default print;