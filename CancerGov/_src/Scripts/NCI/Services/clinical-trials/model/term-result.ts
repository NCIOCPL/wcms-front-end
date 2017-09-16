
/**
 * Represents a single term in the results of a term endpoint call
 */
export class TermResult {

    /**
     * The key of this term.
     */
    termKey: string;

    /**
     * The actual term text
     */
    term: string;

    /**
     * The type of term this is (_disease, site.org_name, etc.)
     */
    termType: string;

    /**
     * The number of occurrences of the term
     */
    count: number;

    /**
     * The NCI Thesaurus codes associated with this term
     */
    codes: string[]

    constructor() {
        this.termKey = undefined;
        this.term = undefined;
        this.termType = undefined;
        this.count = 0;
        this.codes = [];
    }

    static fromJSON(json: any) : TermResult {
        if (typeof json === 'string') {
            return JSON.parse(json, TermResult.reviver);
        } else {
            //Create an instance of the TermResults class
            let rtnTerm = new TermResult();

            //Loop over source
            Object.keys(json).forEach((key: string) => {
                switch(key) {
                    case "term_key" : rtnTerm.termKey = json[key]; break;
                    case "term" : rtnTerm.term = json[key]; break;
                    case "term_type" : rtnTerm.termType = json[key]; break;
                    case "count" : rtnTerm.count = json[key]; break;
                    case "codes" : rtnTerm.codes = json[key]; break;
                }
            })

            return rtnTerm;
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
        return key === "" ? TermResult.fromJSON(value) : value;
    }    
}