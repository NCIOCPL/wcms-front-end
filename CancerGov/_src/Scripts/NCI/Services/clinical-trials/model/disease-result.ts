
/**
 * Represents a single disease item in the results of an diseases endpoint call
 */
export class DiseaseResult {

    /**
     * The name of this disease menu item.
     */
    name: string;

    /**
     * The NCI Thesaurus codes associated with this disease.
     */
    codes: string[]

    /**
     * Parent disease ID of this menu item. Null if top level menu item.
     */
    parentDiseaseID: string

    /**
     * The menu this disease is in --
     * can be "disease", "stage", or "finding".
     */
    menu: string;

    constructor() {
        this.name = undefined;
        this.codes = [];
        this.parentDiseaseID = undefined;
        this.menu = undefined;
    }

    static fromJSON(json: any) : DiseaseResult {
        if (typeof json === 'string') {
            return JSON.parse(json, DiseaseResult.reviver);
        } else {
            //Create an instance of the InterventionResults class
            let rtnDisease = new DiseaseResult();

            //Loop over source
            Object.keys(json).forEach((key: string) => {
                switch(key) {
                    case "name" : rtnDisease.name = json[key]; break;
                    case "codes" : rtnDisease.codes = json[key]; break;
                    case "disease_parent_id" : rtnDisease.parentDiseaseID = json[key]; break;
                    case "menu" : rtnDisease.menu = json[key]; break;
                }
            })

            return rtnDisease;
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
        return key === "" ? DiseaseResult.fromJSON(value) : value;
    }    
}