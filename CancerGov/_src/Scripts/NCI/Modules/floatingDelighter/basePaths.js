import {
    cts,
    socialMedia,
} from './types';

const basePaths = {
    '__default__': cts,
    '/about-cancer/treatment/clinical-trials': {
        delighter: cts,
        exclude: [
            /^\/advanced-search$/,
            {
                rule: /^\/search/,
                whitelist: [
                    '/about-cancer/treatment/clinical-trials/search/help',
                    '/about-cancer/treatment/clinical-trials/search/trial-guide'
                ]
            },
        ]
    },
    '/social-media': {
        delighter: socialMedia,
    }
};

export default basePaths;