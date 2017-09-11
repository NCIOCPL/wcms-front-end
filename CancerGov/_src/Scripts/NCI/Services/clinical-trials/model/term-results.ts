import { TermResult } from './term-result';

/**
 * Represents a list of Terms returned from the CTAPI terms endpoint
 */
export class TermResults {

    /**
     * Total number of terms
     */
    total: number;

    /**
     * Gets the terms in this batch
     */
    terms:  TermResult[];

    constructor() {
        this.total = 0;
        this.terms = [];
    }

    static fromJSON(json: any) : TermResults {
        if (typeof json === 'string') {
            return JSON.parse(json, TermResults.reviver);
        } else {
            //Create an instance of the TermResults class
            let termresults = Object.create(TermResults.prototype)



            //Copy all the fields from the json object.
            return Object.assign(termresults, json, {
                //Convert any fields that have different names or need conversion.
                terms: json.terms.map(
                    (termJson: any) => { 
                        return TermResult.fromJSON(termJson); 
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
        return key === "" ? TermResults.fromJSON(value) : value;
    }
}