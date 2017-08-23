import 'core-js/fn/array/includes';
import { ClinicalTrialsService, TermResults, TermResult, InterventionResults, InterventionResult, DiseaseResults, DiseaseResult} from 'Services/clinical-trials';

//Statuses of what Cancer.gov trials should be shown
const VIEWABLE_TRIALS:string[] = [
    "Active",
    "Approved", 
    "Enrolling by Invitation",
    "In Review",
    "Temporarily Closed to Accrual",
    "Temporarily Closed to Accrual and Intervention"
];

//These are the two catch all buckets that we must add to the bottom of the list.
//ORDER will matter here.
const OTHER_MAIN_TYPES = [ 
    'C2916', //Carcinoma not in main type 
    'C3262' //Neoplasm not in main type
];

/**
 * Facade wrapping a ClinicalTrialsService instance to create app specific methods
 * and simplify interacting with API.
 */
export class CTAPIFacade {

    private svc:ClinicalTrialsService;

    constructor(svc: ClinicalTrialsService) {
        this.svc = svc;
    }

    getDiseasesForSimpleTypeAhead(name: string):Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            ["maintype", "subtype", "stage"],
            undefined,
            { 
                name: name,
                size: 10,
                sort: "cancergov",
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:DiseaseResults) => {
            return res.terms
        }).then((diseases:DiseaseResult[]) => {
            //Do cool sorting.
            return diseases;
        });
    }

    /**
     * Gets all primary cancer types
     */
    getMainType():Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            "maintype",
            undefined,
            { 
                size: 0,
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:DiseaseResults) => {
            let types:DiseaseResult[] = [];
            let otherTypes:DiseaseResult[] = [];

            res.terms.forEach((disease:DiseaseResult) => {
                if (OTHER_MAIN_TYPES.includes(disease.codes.join("|"))) {
                    otherTypes.push(disease);
                } else {
                    types.push(disease);
                }
            });            

            return types.concat(otherTypes);
        })
    }

    /**
     * Gets cancer subtypes for a given parent ID
     * @param {string} ancestorID 
     * @returns {Promise<DiseaseResult[]>} 
     * @memberof CTAPIFacade
     */
    getSubtypes(ancestorID:string|string[]):Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            "subtype",
            ancestorID,
            { 
                size: 0,
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:DiseaseResults) => {
            return res.terms
        })
    }
    
    /**
     * Gets cancer stages for a given parent ID
     * @param {string} ancestorID 
     * @returns {Promise<DiseaseResult[]>} 
     * @memberof CTAPIFacade
     */
    getStages(ancestorID:string|string[]):Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            "stage", 
            ancestorID,
            { 
                size: 0,
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:DiseaseResults) => {
            return res.terms
        })
    }

    /**
     * Gets cancer findings based on parent ID
     * @param {string} searchText 
     * @returns {Promise<DiseaseResult[]>} 
     * @memberof CTAPIFacade
     */
    getFindings(ancestorID:string|string[]):Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            "finding", 
            ancestorID,
            { 
                size: 0,
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:DiseaseResults) => {
            return res.terms
        })
    }    

    /**
     * Gets a list of countries for populating the Countries dropdown
     */
    getCountries():Promise<string[]> { 
        return this.svc.getTerms(
            "sites.org_country",
            { 
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            100
        ).then((res:TermResults) => {
            return res.terms.map(term => term.term)
        })
    }

    /**
     * Gets hospital/institution to populate the Hospital/Institution field
     */
    searchHospital(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "sites.org_name",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets trial investigators to populate the Trial Investigators field
     */
    searchTrialInvestigators(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "principal_investigator",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets lead orgs to populate the Lead Organization field
     */
    searchLeadOrg(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "lead_org",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets drugs intervention items for search field
     */
    searchDrugs(searchText:string):Promise<InterventionResult[]> {
        return this.svc.getInterventions(
            ["Agent", "Agent Category"],
            searchText,            
            10,
            {
                current_trial_status: VIEWABLE_TRIALS
            },
            "cancergov"
        ).then((res:InterventionResults) => {
            return res.terms
        })
    }

    /**
     * Gets other intervention items for search field
     */
    searchOtherInterventions(searchText:string):Promise<InterventionResult[]> {
        return this.svc.getInterventions(
            "Other",
            searchText,
            10,
            {
                current_trial_status: VIEWABLE_TRIALS
            },
            "cancergov"
        ).then((res:InterventionResults) => {
            return res.terms
        })
    }

    //TODO: add other getField methods.

}