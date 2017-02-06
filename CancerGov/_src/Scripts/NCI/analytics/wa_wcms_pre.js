var wa_hier1 = '';
var wa_hier2 = '';
var wa_lang = '';

/* 
 * Check to see if this is a Prod site, if so set the 'live_or_other' flag to map to the Live
 * site report suites
 */
var live_or_other = 'other';
if (document.URL.indexOf('www.cancer.gov') != -1 ||
    document.URL.indexOf('dceg.cancer.gov') != -1 ||
    document.URL.indexOf('proteomics.cancer.gov') != -1 ||
    document.URL.indexOf('cancergenome.nih.gov') != -1) {
    live_or_other = 'live';
};

/*
 * Mapping of all WCMS reporting suites
 * Last update: 2017-02-06
 */
var AllSuites =
{
    /// CancerGov suites
    'nciglobal': {
        live: 'nciglobal',
        other: 'ncidev'
    },
    'ncienglish-all': {
        live: 'ncienglish-all',
        other: 'ncienglish-all-dev'
    },
    'ncispanish-all': {
        live: 'ncispanish-all',
        other: 'ncispanish-all-dev'
    },
    'ncincidictionary': {
        live: 'ncincidictionary',
        other: 'ncincidictionary-dev'
    },
    'ncidrugdictionary': {
        live: 'ncidrugdictionary',
        other: 'ncidrugdictionary-dev'
    },
    'ncinews': {
        live: 'ncinews',
        other: 'ncinews-dev'
    },
    'nciresearch': {
        live: 'nciresearch',
        other: 'nciresearch-dev'
    },
    'nciabout': {
        live: 'nciabout',
        other: 'nciabout-dev'
    },
    'nciclinicaltrials': {
        live: 'nciclinicaltrials',
        other: 'nciclinicaltrials-dev'
    },
    'ncicancertopics': {
        live: 'ncicancertopics',
        other: 'ncicancertopics-dev'
    },
    'ncitiposdecancer': {
        live: 'ncitiposdecancer',
        other: 'ncitiposdecancer-dev'
    },
    'ncinoticias': {
        live: 'ncinoticias',
        other: 'ncinoticias-dev'
    },
    'ncinuestroinstituto': {
        live: 'ncinuestroinstituto',
        other: 'ncinuestroinstituto-dev'
    },
    'ncielcancer': {
        live: 'ncielcancer',
        other: 'ncielcancer-dev'
    },
    'nciogcr-governmentcongressionalrelations': {
        live: 'nciogcr-governmentcongressionalrelations',
        other: 'nciogcr-govcongressionalrelations-dev', 
    },
	
    /// CCOP suites
    'ncidcp-cancerprevention': {
        live: 'ncidcp-cancerprevention',
        other: 'ncidcp-cancerprevention-dev'
    },
        
    /// DCEG suites
    'ncidceg-cancerepidemiologyandgenetics': {
        live: 'ncidceg-cancerepidemiologyandgenetics',
        other: 'ncidceg-cancerepidemiologyandgenetics-dev'
    },

    /// TCGA and Proteomics suites
    'ncicssi-strategicscientificinitiatives': {
    live: 'ncicssi-strategicscientificinitiatives',
        other: 'ncicssi-strategicscientificinitiatives-dev'
    }    
};

/*
* Get the aggregated, comma-separated list of report suites from the Section Details.
* If the key is found in the map, check the URL and return the 'live' or 'other' (dev) report suite 
*/
var AnalyticsMapping =
{
    GetSuites: function(suites) {
        var suiteArray = suites.split(",");
        var filteredSuites = '';

        for (i = 0; i < suiteArray.length; i++) {
            try {
                var suiteName = suiteArray[i].replace(' ','');
                filteredSuites += AllSuites[suiteName][live_or_other];
                if (i < (suiteArray.length - 1)) {
                    filteredSuites += ',';
                }
            }
            catch (Error) {
                filteredSuites += '';
            }
        }
        return filteredSuites;
    }
};