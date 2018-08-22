import AdobeAnalytics from 'Patches/AdobeAnalytics';

export const checkExclusions = (pathName, exclusions) => {

    const exclusionMatches = exclusions.map(exclusion => {
        // Exclusions can either be a simple RegExp or an object with the shape { rule: RegExp, whitelist: Array }
        if (exclusion instanceof RegExp) {
            const isOnExclusionList = pathName.match(exclusion) ? true : false;
            return isOnExclusionList;
        }
        else {
            const isOnExclusionList = pathName.match(exclusion.rule) ? true : false;
            const isOnWhiteList = exclusion.whitelist.includes(pathName);
            return isOnExclusionList ? !isOnWhiteList : false;
        }
    })

    const isOnExclusionList = exclusionMatches.includes(true);
    return isOnExclusionList;
}

export const getDelighterSettings = (pathName, rules) => {
    // Test for path partial match in Map, if a perfect match is found or a partial map with no exclusion rules
    // return the appropriate delighter settings immediately. Otherwise we need to map through the exclusion list rules
    // and their possible associated whitelist paths.
    for(let i = 0; i < rules.length; i++) {
        try {
            const config = rules[i]
            const basePathRule = config.rule;

            if(pathName.match(basePathRule)) {
                const exclusions = config.exclude;
                if(!exclusions) {
                    return config.delighter
                }

                const isOnExclusionList = checkExclusions(pathName, exclusions);
                return isOnExclusionList ? undefined : config.delighter;
            }
        }
        catch(err){
            throw err;
        }
    }
};

export const buildDelighter = ({ href, innerHTML, classList = [] }) => {
    const delighter = document.createElement('div');
    delighter.classList.add('floating-delighter');
    classList.map(className => delighter.classList.add(className))

    const link = document.createElement('a');
    link.href = href;
    link.classList.add('floating-delighter__link');
    link.innerHTML = innerHTML;

    // This is a stopgap, hardcoded until Analytics is brought in line. Needs to be changed this release.
    const analyticsClickEvent = e => {
        var s = AdobeAnalytics.getSObject();
        NCIAnalytics.HomePageDelighterClick(e.currentTarget, 'hp_find', s.pageName);        
    }
    link.addEventListener('click', analyticsClickEvent)

    delighter.appendChild(link);

    return delighter;
}