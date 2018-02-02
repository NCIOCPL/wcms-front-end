import './index.scss';
import AdobeAnalytics from 'Patches/AdobeAnalytics';

const cts = {
    href: '/about-cancer/treatment/clinical-trials/search',
    innerHTML: `
        <div class="floating-delighter__icon">
        </div>
        <div class="floating-delighter__label">Find A Clinical Trial</div>
    `,
    classList: ['floating-delighter--cts']
};

const socialMedia = {
    href: '#',
    innerHTML: `
        <div class="floating-delighter__icon">
        </div>
        <div class="floating-delighter__label">NCI Social Media Events</div>
    `,
    classList: ['floating-delighter--social-media']
};

const pages = {
    '/about-cancer/treatment/clinical-trials':{
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
    // '/social-media': {
    //     delighter: socialMedia
    // },
    // '/mock/cts-delightertesting': {
    //     delighter: cts,
    // },
    // '/mock/social-delightertesting': {
    //     delighter: socialMedia
    // }
};

const pageBaseMatches = Object.keys(pages);


let isInitialized = false;

const getStringTail = (head, string) => string.split(head)[1];

const checkExclusions = (pathName, basePartial) => {
    const pathTail = getStringTail(basePartial, pathName);
    const exclusionRules = pages[basePartial].exclude;

    const exclusionMatches = exclusionRules.map(rule => {
        if (rule instanceof RegExp) {
            const isOnExclusionList = pathTail.match(rule) ? true : false;
            return isOnExclusionList;
        }
        // Rule is an object with a whitelist
        else {
            const isOnExclusionList = pathTail.match(rule.rule) ? true : false;
            const isOnWhiteList = rule.whitelist.includes(pathName);

            return isOnExclusionList ? !isOnWhiteList : false;
        }
    })

    const isOnExclusionList = exclusionMatches.includes(true);
    return isOnExclusionList;

}


const getDelighterSettings = pathName => {
    // This is not the most elegant way to deal with the more exceptional root path
    // Remove or change this block to handle root matches
    if(pathName === '/') {
        return cts;
    }

    // Test for path partial match in Map, if a perfect match is found or a partial map with no exclusion rules
    // return the appropriate delighter settings immediately. Otherwise we need to map through the exclusion list rules
    // and their possible associated whitelist paths.
    for(let i = 0; i < pageBaseMatches.length; i++) {
        const basePartial = pageBaseMatches[i];
        if(pathName === basePartial) {
            return pages[basePartial].delighter;
        }
        else if(pathName.includes(basePartial)) {
            if(!pages[basePartial].exclude) {
                return pages[basePartial].delighter
            }

            const isOnExclusionList = checkExclusions(pathName, basePartial);
            return isOnExclusionList ? null : pages[basePartial].delighter;
        }
    }

    return null;
};

const buildDelighter = ({href, innerHTML, classList}) => {
    const delighter = document.createElement('div');
    delighter.classList.add('floating-delighter');
    classList.map(className => delighter.classList.add(className))
    const link = document.createElement('a');
    link.href = href;
    link.classList.add('floating-delighter__link');

    // This is a stopgap, hardcoded until Analytics is brought in line. Needs to be changed this release.
    const analyticsClickEvent = e => {
        var s = AdobeAnalytics.getSObject();
        NCIAnalytics.HomePageDelighterClick(e.currentTarget, 'hp_find', s.pageName);        
    }
    link.addEventListener('click', analyticsClickEvent)

    link.innerHTML = innerHTML;
    delighter.appendChild(link);

    return delighter;
}

const init = () => {
    if(isInitialized) {
        return;
    }
    else {
        isInitialized = true;
    }

    const pathName = location.pathname.toLowerCase();
    const delighterSettings = getDelighterSettings(pathName);

    if(delighterSettings) {
        const delighterElement = buildDelighter(delighterSettings);
        const delighterParent = document.querySelector('.page-options-container'); 
        
        delighterParent.appendChild(delighterElement);

        // This allows us to add more custom CSS rules to siblings when delighter isn't present
        // At the moment it is not being used so I'm leaving it here just in case.
        // delighterParent.classList.append('floating-delighter--active');

        return delighterElement;
    }

    return
}

export default init;