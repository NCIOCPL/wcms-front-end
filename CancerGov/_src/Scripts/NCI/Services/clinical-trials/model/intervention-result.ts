
/**
 * Represents a single intervention item in the results of an intervention endpoint call
 */
export class InterventionResult {

    /**
     * The name of this intervention.
     */
    name: string;

    /**
     * The NCI Thesaurus codes associated with this intervention.
     */
    codes: string[]

    /**
     * Alternate names for this intervention.
     */
    synonyms: string[]

    /**
     * The category of intervention this is --
     * can be "agent", "agent_category", or "other".
     */
    category: string;

    /**
     * The type of intervention this is --
     * can be "Drug", "Dietary Supplement", "Surgery / Procedure", etc..
     * This is lower level than category
     */
    type: string;    

    constructor() {
        this.name = undefined;
        this.type = undefined;
        this.codes = [];
        this.synonyms = [];
        this.category = undefined;
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
                    case "name" : rtnIntervention.name = json[key]; break;
                    case "type" : rtnIntervention.type = json[key]; break;
                    case "codes" : rtnIntervention.codes = json[key]; break;
                    case "synonyms" : rtnIntervention.synonyms = json[key]; break;
                    case "category" : rtnIntervention.category = json[key]; break;
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