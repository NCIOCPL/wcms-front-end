import { InterventionResult } from './intervention-result';

/**
 * Represents a list of Interventions returned from the CTAPI interventions endpoint
 */
export class InterventionResults {

    /**
     * Total number of interventions
     */
    total: number;

    /**
     * Gets the intervention terms in this batch
     */
    terms:  InterventionResult[];

    constructor() {
        this.total = 0;
        this.terms = [];
    }

    static fromJSON(json: any) : InterventionResults {
        if (typeof json === 'string') {
            return JSON.parse(json, InterventionResults.reviver);
        } else {
            //Create an instance of the TermResults class
            let interventionresults = Object.create(InterventionResults.prototype)

            //Copy all the fields from the json object.
            return Object.assign(interventionresults, json, {
                //Convert any fields that have different names or need conversion.
                terms: json.terms.map(
                    (termJson: any) => { 
                        return InterventionResult.fromJSON(termJson); 
                    }
                )
            });
        }
    }

    /**
     * Reviver can be passed as the second parameter to JSON.parse to
     * automatically call User.fromJSON on the resulting value.
     * 
     * @param key 
     * @param value 
     */
    static reviver(key: string, value: any): any {
        return key === "" ? InterventionResults.fromJSON(value) : value;
    }
}