
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
     * Dummy data - remove when endpoint is in place
     */
    searchDrugs(searchText:string):Promise<InterventionResult[]> {
        let res:InterventionResult[] = [];
        //https://m-pink-dev.cancer.gov/trial-aggregates?agg_field=_interventions.drugs&agg_term=her&size=20&current_trial_status%5B%5D=active&current_trial_status%5B%5D=approved&current_trial_status%5B%5D=enrolling_by_invitation&current_trial_status%5B%5D=in_review&current_trial_status%5B%5D=temporarily_closed_to_accrual

        let drug0:InterventionResult = new InterventionResult();
            drug0.name = "Autologous TGFbeta-Resistant HER2/EBV-Specific Cytotoxic T Lymphocytes";
            drug0.codes = [ "c85459" ];
            drug0.category = "Agent";
        if(drug0.name.indexOf(searchText) !== -1) {
            res.push(drug0);
        }
        
        let drug1:InterventionResult = new InterventionResult();
            drug1.name = "Trastuzumab";
            drug1.codes = [ "c1647" ];
            drug1.synonyms = [ "Herceptin" ];
            drug1.category = "Agent";
        if(drug1.name.indexOf(searchText) !== -1) {
            res.push(drug1);
        }

        let drug2:InterventionResult = new InterventionResult();
            drug2.name = "Chinese Herbal Formulation PHY906";
            drug2.codes = [ "c91704" ];
            drug2.synonyms = [];
            drug2.category = "Agent";
        if(drug2.name.indexOf(searchText) !== -1) {
            res.push(drug2);
        }
            
        let drug3:InterventionResult = new InterventionResult();
            drug3.name = "HER2-pulsed Autologous Type-1 Polarized Dendritic Cell Vaccine";
            drug3.codes = [ "c114293" ];
            drug3.category = "Agent";
        if(drug3.name.indexOf(searchText) !== -1) {
            res.push(drug3);
        }

        let drug4:InterventionResult = new InterventionResult();
            drug4.name = "Adenovirus HER2-Transduced Autologous Dendritic Cell Vaccine";
            drug4.codes = [ "c61098" ];
            drug4.category = "Agent";
        if(drug4.name.indexOf(searchText) !== -1) {
            res.push(drug4);
        }

        let family0:InterventionResult = new InterventionResult();
            family0.name = "Cytokine";
            family0.codes = [ "c1283", "c20464" ];
            family0.synonyms = [ "Recombinant Cytokine" ];
            family0.category = "Agent Category";
        if(family0.name.indexOf(searchText) !== -1) {
            res.push(family0);
        }
        
        let family1:InterventionResult = new InterventionResult();
            family1.name = "Recombinant Interleukin";
            family1.codes = [ "c593" ];
            family1.synonyms = [ "Interleukin" ];
            family1.category = "Agent Category";
        if(family1.name.indexOf(searchText) !== -1) {
            res.push(family1);
        }
        
        return Promise.resolve(res)

    }

    /**
     * Gets other intervention items for search field
     * Dummy data - remove when endpoint is in place
     */
    searchOtherInterventions(searchText:string):Promise<InterventionResult[]> {
        let res:InterventionResult[] = [];
        //https://m-pink-dev.cancer.gov/trial-aggregates?agg_field=_interventions.drugs&agg_term=her&size=20&current_trial_status%5B%5D=active&current_trial_status%5B%5D=approved&current_trial_status%5B%5D=enrolling_by_invitation&current_trial_status%5B%5D=in_review&current_trial_status%5B%5D=temporarily_closed_to_accrual

        let iv0:InterventionResult = new InterventionResult();
            iv0.name = "Frequency-Domain Photon Migration";
            iv0.codes = [ "c70940" ];
            iv0.synonyms = [ "Herceptin" ];
            iv0.category = "Other";
        if(iv0.name.indexOf(searchText) !== -1) {
            res.push(iv0);
        }

        let iv1:InterventionResult = new InterventionResult();
            iv1.name = "Intensity-Modulated Radiation Therapy";
            iv1.codes = [ "c16135" ];
            iv1.synonyms = [];
            iv1.category = "Other";
        if(iv1.name.indexOf(searchText) !== -1) {
            res.push(iv1);
        }

        let iv2:InterventionResult = new InterventionResult();
            iv2.name = "Behavioral Dietary Intervention";
            iv2.codes = [ "c67021" ];
            iv2.synonyms = [];
            iv2.category = "Other";
        if(iv2.name.indexOf(searchText) !== -1) {
            res.push(iv2);
        }        
        
        let iv3:InterventionResult = new InterventionResult();
            iv3.name = "Magnetic Resonance Imaging";
            iv3.codes = [ "c16809" ];
            iv3.category = "Other";
        if(iv3.name.indexOf(searchText) !== -1) {
            res.push(iv3);
        }

        let iv4:InterventionResult = new InterventionResult();
            iv4.name = "Evaluation of Cancer Risk Factors";
            iv4.codes = [ "c15455" ];
            iv4.category = "Other";
        if(iv4.name.indexOf(searchText) !== -1) {
            res.push(iv4);
        }
        
        return Promise.resolve(res)

    }

    //TODO: add other getField methods.

}