
/**
 * Represents a single intervention item in the results of an intervention endpoint call
 */
export class InterventionResult {

    /**
     * The key of this intervention.
     */
    key: string;

    /**
     * The number of occurrences of the intervention.
     */
    count: number;

    /**
     * The NCI Thesaurus codes associated with this intervention.
     */
    codes: string[]

    /**
     * Alternate names for this intervention.
     */
    synonyms: string[]

    /**
     * The type of intervention this is.
     */
    type: string;


    constructor() {
        this.key = undefined;
        this.count = 0;
        this.codes = [];
        this.synonyms = [];
        this.type = undefined;
    }

    static fromJSON(json: any) : InterventionResult {
        if (typeof json === 'string') {
            return JSON.parse(json, InterventionResult.reviver);
        } else {
            //Create an instance of the InterventionResults class
            let rtnIntervention = new InterventionResult();

            //Loop over source
            Object.keys(json).forEach((key: string) => {
                switch(key) {
                    case "key" : rtnIntervention.key = json[key]; break;
                    case "count" : rtnIntervention.count = json[key]; break;
                    case "codes" : rtnIntervention.codes = json[key]; break;
                    case "synonyms" : rtnIntervention.synonyms = json[key]; break;
                    case "type" : rtnIntervention.type = json[key]; break;
                }
            })

            return rtnIntervention;
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
        return key === "" ? InterventionResult.fromJSON(value) : value;
    }    
}