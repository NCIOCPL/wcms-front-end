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
     * @param searchText Search text to narrow terms by
     * @param sort The sort order
     * @param size The number of terms to return. NOTE: API allows max of 100
     * @param from The 0-based offset of where to start fetching terms from.
     * @param additionalParams Additional params to use in narrowing endpoint call.  See API for additional params.
     */
    getTerms(termType: string, searchText:string, sort:string, size:number, from:number, additionalParams:any): Promise<TermResults>;
}

