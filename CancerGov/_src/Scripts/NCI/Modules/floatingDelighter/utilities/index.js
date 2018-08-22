import AdobeAnalytics from 'Patches/AdobeAnalytics';

// export const getStringTail = (head, string) => string.split(head)[1];

export const checkExclusions = (pathName, basePartial, basePaths) => {
    // const pathTail = getStringTail(basePartial, pathName);
    const exclusionRules = basePaths[basePartial].exclude;

    const exclusionMatches = exclusionRules.map(rule => {
        if (rule instanceof RegExp) {
            const isOnExclusionList = pathName.match(rule) ? true : false;
            return isOnExclusionList;
        }
        // Rule is an object with a whitelist
        else {
            const isOnExclusionList = pathName.match(rule.rule) ? true : false;
            const isOnWhiteList = rule.whitelist.includes(pathName);
            return isOnExclusionList ? !isOnWhiteList : false;
        }
    })

    const isOnExclusionList = exclusionMatches.includes(true);
    return isOnExclusionList;
}

export const getDelighterSettings = (pathName, pages) => {
    // Test for path partial match in Map, if a perfect match is found or a partial map with no exclusion rules
    // return the appropriate delighter settings immediately. Otherwise we need to map through the exclusion list rules
    // and their possible associated whitelist paths.
    const basePathRules = Object.keys(pages);
    for(let i = 0; i < basePathRules.length; i++) {
        try {
            // Base path rules have to be converted because JS objects can't take regexs as keys, 
            // and Map is not fully supported by IE11 ('new' keyword + iterable particularly)
            // This library will assume all paths are case insensitve for efficiency's sake.
            const basePathKey = basePathRules[i];
            const basePathRule = new RegExp(basePathKey, 'i');

            if(pathName.match(basePathRule)) {
                if(!pages[basePathKey].exclude) {
                    return pages[basePathKey].delighter
                }
    
                const isOnExclusionList = checkExclusions(pathName, basePathKey, pages);
                return isOnExclusionList ? undefined : pages[basePathKey].delighter;
            }
        }
        catch(err){
            throw err;
        }
    }
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