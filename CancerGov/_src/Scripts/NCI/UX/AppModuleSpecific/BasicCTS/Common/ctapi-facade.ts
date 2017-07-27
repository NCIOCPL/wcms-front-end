
import { ClinicalTrialsService, TermResults, TermResult, InterventionResults, InterventionResult} from 'Services/clinical-trials';

//Statuses of what Cancer.gov trials should be shown
const VIEWABLE_TRIALS:string[] = [
    "Active",
    "Approved", 
    "Enrolling by Invitation",
    "In Review",
    "Temporarily Closed to Accrual",
    "Temporarily Closed to Accrual and Intervention"
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

        let res:InterventionResult[] = [];
        //https://m-pink-dev.cancer.gov/trial-aggregates?agg_field=_interventions.drugs&agg_term=her&size=20&current_trial_status%5B%5D=active&current_trial_status%5B%5D=approved&current_trial_status%5B%5D=enrolling_by_invitation&current_trial_status%5B%5D=in_review&current_trial_status%5B%5D=temporarily_closed_to_accrual

        let drug1:InterventionResult = new InterventionResult();
            drug1.name = "Trastuzumab";
            drug1.codes = [ "c1647" ];
            drug1.synonyms = [ "Herceptin" ];
            drug1.category = "Agent";
        
        res.push(drug1);

        let drug2:InterventionResult = new InterventionResult();
            drug2.name = "Chinese Herbal Formulation PHY906";
            drug2.codes = [ "c91704" ];
            drug2.synonyms = [];
            drug2.category = "Agent";
            
        res.push(drug2);

        let drug3:InterventionResult = new InterventionResult();
            drug3.name = "HER2-pulsed Autologous Type-1 Polarized Dendritic Cell Vaccine";
            drug3.codes = [ "c114293" ];
            drug3.category = "Agent";

        res.push(drug3);

        let drug4:InterventionResult = new InterventionResult();
            drug4.name = "Adenovirus HER2-Transduced Autologous Dendritic Cell Vaccine";
            drug4.codes = [ "c61098" ];
            drug4.category = "Agent";

        res.push(drug4);

        let drug5:InterventionResult = new InterventionResult();
            drug5.name = "Autologous TGFbeta-Resistant HER2/EBV-Specific Cytotoxic T Lymphocytes";
            drug5.codes = [ "c85459" ];
            drug5.category = "Agent";

        res.push(drug5);    

        let family1:InterventionResult = new InterventionResult();
            family1.name = "Recombinant Interleukin";
            family1.codes = [ "c593" ];
            family1.synonyms = [ "Interleukin" ];
            family1.category = "Agent Category";

        res.push(family1);

        let family2:InterventionResult = new InterventionResult();
            family2.name = "Cytokine";
            family2.codes = [ "c1283", "c20464" ];
            family2.synonyms = [ "Recombinant Cytokine" ];
            family2.category = "Agent Category";
        
        res.push(family2);

        return Promise.resolve(res)

    }

    //TODO: add other getField methods.

}