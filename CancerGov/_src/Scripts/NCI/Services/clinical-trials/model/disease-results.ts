import { DiseaseResult } from './disease-result';

/**
 * Represents a list of diseases returned from the CTAPI diseases endpoint
 */
export class DiseaseResults {

    /**
     * Total number of interventions
     */
    total: number;

    /**
     * Gets the intervention terms in this batch
     */
    terms:  DiseaseResult[];

    constructor() {
        this.total = 0;
        this.terms = [];
    }

    static fromJSON(json: any) : DiseaseResults {
        if (typeof json === 'string') {
            return JSON.parse(json, DiseaseResults.reviver);
        } else {
            //Create an instance of the TermResults class
            let interventionresults = Object.create(DiseaseResults.prototype)

            //Copy all the fields from the json object.
            return Object.assign(interventionresults, json, {
                //Convert any fields that have different names or need conversion.
                terms: json.terms.map(
                    (termJson: any) => { 
                        return DiseaseResult.fromJSON(termJson); 
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
        return key === "" ? DiseaseResults.fromJSON(value) : value;
    }
}