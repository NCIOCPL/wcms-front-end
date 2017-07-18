import { CTAPIConnection } from './';
import { TermResults } from './model/term-results';

/**
 * This class represents the methods to accessing a CTAPI service
 */
export interface ClinicalTrialsService {

    /**
     * Gets terms from the terms endpoint
     * 
     * @param termType The term type
     * @param additionalParams Additional params to use in narrowing endpoint call.  Add search keywords here & sort options. See API for additional params.
     * @param sort The sort order
     * @param size The number of terms to return. NOTE: API allows max of 100
     * @param from The 0-based offset of where to start fetching terms from.
     */
    getTerms(termType: string, additionalParams?:any, size?:number, from?:number): Promise<TermResults>;
}

