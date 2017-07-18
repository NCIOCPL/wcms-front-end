
import { ClinicalTrialsService, TermResults } from 'Services/clinical-trials';

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
    getCountries():Promise<TermResults> {
        return this.svc.getTerms(
            "site.org_country",
            { 
                current_trial_status: VIEWABLE_TRIALS
            },
            100
        );
    }

    //TODO: add other getField methods.

}