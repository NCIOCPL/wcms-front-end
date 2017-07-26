import { CTAPIConnection, ClinicalTrialsService, TermResults, InterventionResults } from '../';

/**
 * This class represents the methods to accessing a CTAPI service
 */
export class ClinicalTrialsServiceV1Impl implements ClinicalTrialsService {

    /**
     * The connection to use for calls.
     */
    private connection: CTAPIConnection;

    /**
     * Create a new instance of a ClinicalTrialsService
     * @param connection The CTAPIConnection to use for interacting with the service.
     * 
     */
    constructor(connection: CTAPIConnection) {
        this.connection = connection;
    }

    /**
     * Gets terms from the terms endpoint
     * 
     * @param termType The term type (REQUIRED)
     * @param additionalParams Optional additional params to use in narrowing endpoint call. Add search text and sorting here. See API for additional params.
     * @param size The number of terms to return. NOTE: API allows max of 100 (DEFAULT: 10)
     * @param from The 0-based offset of where to start fetching terms from. (DEFAULT: 0)
     */
    getTerms(termType: string, additionalParams = {}, size = 10, from = 0): Promise<TermResults> {

        //Setup the request
        let params = {
            term_type: termType,
            size: size,
            from: from
        };

        //Merge in any additional params.
        //NOTE: The order matters here as we want to ensure that our params are not overwritten.
        let requestParams = Object.assign({}, additionalParams, params);
        
        //Write a unit test for the request URL

        //Setup additional params for Viewable.

        return this.connection.getRequest(
                '/terms',
                requestParams
            )
            .then((resJSON: any) => {
                return TermResults.fromJSON(resJSON);
            })
    }

    /**
     * Gets interventions from the interventions endpoint
     * 
     * @param category The high-level type of the term (agent, agent_category, other) (OPTIONAL)
     * @param intervention Type ahead support to search for the interventions (OPTIONAL)
     * @param size The number of interventions to return (OPTIONAL)
     * @param additionalParams Additional Parameters like interventionType (OPTIONAL)
     * @param sort The sort order of the results (OPTIONAL)
     * @param order The direction to sort the results (OPTIONAL)
     */    
    getInterventions(category?: string|string[], intervention?: string, size = 10 , additionalParams?:any, sort = "term", order = "asc"): Promise<InterventionResults> {

        //Setup the request
        let params = {
            size: size,
            sort: sort,
            order: order
        };

        if (category) {
            params["category"] = category;
        }

        if (intervention) {
            params["intervention"] = intervention;
        }

        let requestParams = Object.assign({}, additionalParams, params);

        //Setup additional params for Viewable.

        return this.connection.getRequest(
                '/interventions',
                requestParams
            )
            .then((resJSON: any) => {
                return InterventionResults.fromJSON(resJSON);
            })
    }
}

