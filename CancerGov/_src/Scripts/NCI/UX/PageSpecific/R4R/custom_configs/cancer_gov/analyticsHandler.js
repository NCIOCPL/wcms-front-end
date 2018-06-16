import queryString from 'query-string';

// Idiosyncratic helpers

/**
 * Given a params object (generated by the query-string library), a string
 * representing the individual counts of the facet groups will be returned.
 * 
 * @param {Object} params
 * @return {string} 
 */
const extractFilterSummary = params => {
    const baseFilters = {
        'researchAreas': {
            alias: 'ra',
            count: 0,
        },
        'toolTypes': {
            alias: 'tt',
            count: 0,
        },
        'researchTypes': {
            alias: 'rt',
            count: 0,
        },
        'toolSubtypes': {
            alias: 'tst',
            count: 0,
        },
    }

    const filterSummary = Object.entries(params).reduce((acc, [key, value]) => {
        if(acc.hasOwnProperty(key)){
            const length = typeof value === 'string' ? 1 : value.length
            acc[key].count = length;
        }
        return acc;
    }, baseFilters);

    const composed = Object.entries(filterSummary).reduce((acc, [key, { alias, count }]) => {
        acc = [...acc, `${ alias }=${ count }`];
        return acc;
    }, []).join(';');

    return composed;    
}

const extractProp40 = pathname => {
    if(pathname.match(/resource/i)){
        return 'Resource View';
    }
    if(pathname.match(/search$/i)){
        return 'Search View';
    }
    return 'Home View';
}

const extractProp39ForResultsResult = event => {
    const base = event.meta.clickType;
    const params = queryString.parse(event.meta.location.search);
    const searchTerm = params.q || 'none';
    const filterSummary = extractFilterSummary(params);
    const page = `${ Math.ceil((event.meta.clickInfo.startFrom + 1) / event.meta.clickInfo.pageSize) }:${ event.meta.clickInfo.localIndex }`;
    const numberOfResults = event.meta.clickInfo.totalResults;
    const resultNumber = event.meta.clickInfo.localIndex + event.meta.clickInfo.startFrom;

    const composed = [base, searchTerm, filterSummary, page, numberOfResults, resultNumber].join('|');
    return composed;
}

const extractProp39ForResultsLoad = event => {
    const from = event.payload.results.meta.from;
    const page = Math.ceil((from + 1) / 20) // If custom results sizes beome a thing, this will be out of sync (can be possibly derived from results meta originalquerystring)
    const totalResults = event.payload.results.meta.totalResults;
    const searchString = event.meta.location.search;
    const params = queryString.parse(searchString);
    const searchTerm = params.q || 'none';
    const filterSummary = extractFilterSummary(params);

    const composed = ['r4r_results|view', searchTerm, filterSummary, page, totalResults ].join('|');
    return composed;
}

const extractProp40ForResultsLoad = event => {
    const searchString = event.meta.location.search;
    const params = queryString.parse(searchString);
    const filters = Object.entries(params).reduce((acc, [key, value]) => {
        if(['researchAreas', 'toolTypes', 'researchTypes', 'toolSubtypes'].includes(key)){
            if(typeof value === 'string'){
                acc = [...acc, value]
            }
            else{
                acc = [...acc, ...value]
            }
        }
        return acc;
    }, [])
    const composed = filters.length ? filters.join('|') : 'none';
    return composed;
}

// #####

const loadHomePage = event => ({
    Props: {
        39: 'r4r_home|view',
        40: extractProp40(event.meta.location.href),
    },
    Events: [37],
})

const loadSearchPage = event => ({
    Props: {
        39: extractProp39ForResultsLoad(event),
        40: extractProp40ForResultsLoad(event),
    },
    Events: [65],
})

const loadResourcePage = event => ({
    Props: {
        39: 'r4r_resource|view',
        40: event.payload.title,
    },
    Events: [66],
})

const loadErrorPage = event => ({
    Props: {
        39: "r4r_error|view",
        40: `Error Page: ${ event.payload.message || 'UNKNOWN' }`,
    },
    Events: [41]
})

const clickEvent = event => {
    switch(event.meta.clickType){
        case 'r4r_home_viewall':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: 'View All Resources',
                    39: 'r4r_home|viewall',
                    40: extractProp40(event.meta.location.pathname),
                },
                Events: [2, 39],
            }
        case 'r4r_home_filteredsearch':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: `${ event.meta.clickInfo.filterType }:${ event.meta.clickInfo.filter }`,
                    39: 'r4r_home|filteredsearch',
                    40: extractProp40(event.meta.location.pathname),
                },
                Events: [2, 39],
            }
        // There's obviously the potential to compress the search functions with more extract helpers so the deecision tree is
        // abstracted away to one place
        case 'r4r_home_searchbar':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: event.meta.clickInfo.keyword,
                    39: 'r4r_home|search',
                    40: extractProp40(event.meta.location.pathname),
                },
                Events: [2, 39],
            }
        case 'r4r_resource_searchbar':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: event.meta.clickInfo.keyword,
                    39: 'r4r_resource|search',
                    40: extractProp40(event.meta.location.pathname),                    
                },
                Events: [2, 39]
            }
        case 'r4r_results_searchbar':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: event.meta.clickInfo.keyword,
                    39: 'r4r_results|search',
                    40: extractProp40(event.meta.location.pathname),                    
                },
                Events: [2, 39]
            }
        case 'r4r_results|result_click':
            return {
                Props: {
                    39: extractProp39ForResultsResult(event),
                    40: event.meta.clickInfo.title,
                },
                Events: [42],
            }
        case 'r4r_resource_relatedresourcesearch':
            return {
                Props: {
                    11: event.meta.clickType,
                    14: `Related Resources:${ event.meta.clickInfo.filter }`,
                    39: 'r4r_resource|related_resource_search',
                    40: event.meta.clickInfo.title,
                },
                Events: [2, 39],               
            }
        // TODO: Possibly need to delay page transition explicitly here by passing true as the sender
        // TODO: TODO: Create pattern for explicating sender value
        case 'r4r_resource|resource_click':
            return {
                Props: {
                    39: event.meta.clickType,
                    40: event.meta.clickInfo.title,
                },
                Events: [67],
                config_delay: true,
            }
        default:
            return {};
    }
}


const analyticsEvents = {
    // The app initialization is not being used at the moment.
    // '@@event/APP_INITIALIZATION': () => ({}),
    'LOAD NEW SEARCH RESULTS': {
        processor: loadSearchPage,
        linkName: "R4R Data Load"
    },
    'LOAD NEW FACET RESULTS': {
        processor: loadHomePage,
        linkName: "R4R Data Load"
    },
    'LOAD RESOURCE': {
        processor: loadResourcePage,
        linkName: "R4R Data Load"
    },
    'REGISTER ERROR': {
        processor: loadErrorPage,
        linkName: "R4R Error"
    },
    '@@event/CLICK': {
        processor: clickEvent,
        linkName: "R4R Click Event"
    },
}

const analyticsEventsMap = new Map(Object.entries(analyticsEvents));

// Here is where we do the heavy lifting of processing events and passing them to
// the analytics library
export const createCancerGovAnalyticsHandler = analytics => events => {
    // TODO: FINISH THE REST OF THE FUCKING OWL
    events.map(event => {
        if(analyticsEventsMap.has(event.type)){
            try{
                // This assumes that this exists!
                const NCIAnalytics = window.NCIAnalytics || {};
                
                // Determine what type of processor to run on the event
                const { processor, linkName } = analyticsEventsMap.get(event.type);
                const report = processor(event);
                
                // S code integration
                const shouldDelay = report.config_delay || window;
                const clickParams = new NCIAnalytics.ClickParams(shouldDelay, 'nciglobal', 'o', linkName);
                clickParams.Props = report.Props;
                clickParams.Events = report.Events;
                clickParams.LogToOmniture();
            }
            catch(err){
                console.log(err)
            }

            // One way of doing it if an analytics handler gets directly passed
            // analytics(report); // This could be an event broadcaster or the analytics library itself
        }
        return event;
    })
    // analytics(event); // this won't work as is since window.s is not actually a function on the site


}

// Once the analytics library is available, we want to first curry the analytics event listener (which does the heavy lifting
// of processing r4r events in a way that the analytics library like) with access to the analytics library. Henceforth it just
// receives new events, processes them, and passes them on.
// Once the analytics event listener is bound to the analytics library, it first recieves all the cached events in the
// proxy and then begins listening to future events in real time. 
export const subscribeToAnalyticsEvents = (analytics, eventHandler) => {
    const cancerGovAnalyticsHandler = createCancerGovAnalyticsHandler(analytics);
    eventHandler.dumpCache(cancerGovAnalyticsHandler);
    const unsubscribe = eventHandler.subscribe(cancerGovAnalyticsHandler);
    window.addEventListener('unload', unsubscribe);
}

// We want to make sure the analytics library is available before we subscribe it
// to the event handler proxy.
export const awaitAnalyticsLibraryAvailability = (eventHandler) => {
    const listener = () => {
        subscribeToAnalyticsEvents(window.s, eventHandler);
    }

    // if(process.env.NODE_ENV !== 'development'){
    //     window.addEventListener('analytics_ready', listener);

    //     if(window.s){
    //         window.removeEventListener('analytics_ready', listener);
    //         subscribeToAnalyticsEvents(window.s, eventHandler);
    //     }
    // }
    // else {
    //     subscribeToAnalyticsEvents((report) => { console.log('Analytics', report)}, eventHandler);
    // }

    setTimeout(()=> {
        subscribeToAnalyticsEvents({}, eventHandler)
    }, 1000)
    
    //This is only for dev
    // subscribeToAnalyticsEvents((report) => { console.log('Analytics', report)}, eventHandler);
}