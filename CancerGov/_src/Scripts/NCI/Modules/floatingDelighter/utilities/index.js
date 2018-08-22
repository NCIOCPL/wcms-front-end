import AdobeAnalytics from 'Patches/AdobeAnalytics';

export const getStringTail = (head, string) => string.split(head)[1];

export const checkExclusions = (pathName, basePartial, basePaths) => {
    const pathTail = getStringTail(basePartial, pathName);
    const exclusionRules = basePaths[basePartial].exclude;

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

export const getDelighterSettings = (pathName, pages) => {
    // This is not the most elegant way to deal with the more exceptional root path
    // Remove or change this block to handle root matches
    if(pathName === '/') {
        return pages['__default__'];
    }

    // Test for path partial match in Map, if a perfect match is found or a partial map with no exclusion rules
    // return the appropriate delighter settings immediately. Otherwise we need to map through the exclusion list rules
    // and their possible associated whitelist paths.
    const pageBaseMatches = Object.keys(pages);
    for(let i = 0; i < pageBaseMatches.length; i++) {
        const basePartial = pageBaseMatches[i];
        if(pathName === basePartial) {
            return pages[basePartial].delighter;
        }
        else if(pathName.startsWith(basePartial)) {
            if(!pages[basePartial].exclude) {
                return pages[basePartial].delighter
            }

            const isOnExclusionList = checkExclusions(pathName, basePartial, pages);
            return isOnExclusionList ? null : pages[basePartial].delighter;
        }
    }

    return null;
};

export const buildDelighter = ({ href, innerHTML, classList }) => {
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