import {
    cts,
    socialMedia,
} from './types';

// NB: Base paths need to be encoded as a string because RegExps cannot serve as object keys and IE11 doesn't support new Map([iterable]).
const basePaths = {
    "^\/$": {
        delighter: cts,
    },
    "^\/about-cancer\/treatment\/clinical-trials": {
        delighter: cts,
        exclude: [
            /\/advanced-search$/,
            {
                rule: /^\/about-cancer\/treatment\/clinical-trials\/search/,
                whitelist: [
                    '/about-cancer/treatment/clinical-trials/search/help',
                    '/about-cancer/treatment/clinical-trials/search/trial-guide'
                ]
            },
        ]
    },
    "^\/social-media": {
        delighter: socialMedia,
    }
};

export default basePaths;