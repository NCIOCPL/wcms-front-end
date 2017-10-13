import { YouTubeItem } from './youtube-item';

/**
 * Represents a list of diseases returned from the CTAPI diseases endpoint
 */
export class YouTubeItems {

    /**
     * Total number of interventions
     */
    total: number;

    /**
     * Gets the intervention terms in this batch
     */
    terms:  YouTubeItem[];

    constructor() {
        this.total = 0;
        this.terms = [];
    }

    static fromJSON(json: any) : YouTubeItems {
        if (typeof json === 'string') {
            return JSON.parse(json, YouTubeItems.reviver);
        } else {
            //Create an instance of the TermResults class
            let interventionresults = Object.create(YouTubeItems.prototype)

            //Copy all the fields from the json object.
            return Object.assign(interventionresults, json, {
                //Convert any fields that have different names or need conversion.
                terms: json.terms.map(
                    (termJson: any) => { 
                        return YouTubeItem.fromJSON(termJson); 
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
        return key === "" ? YouTubeItems.fromJSON(value) : value;
    }
}