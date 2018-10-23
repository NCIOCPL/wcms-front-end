/**
 * Interface for specifying properties to store configuration options.
 * 
 * NOTE: New options must be defined in CDEConfiguration and given explicit default values
 * in CDEDefaultConfiguration.
 */
export interface CDEConfiguration {
    /**
     * Identifies the hostname of the clinicaltrials API server
     * 
     * @type {string}
     * @memberof CDEConfiguration
     */
    ClinicalTrialsAPIServer : string;

    /**
     * The key required to conect to the Google developer API
     * 
     * @type {string}
     * @memberof CDEConfiguration
     */
    GoogleAPIKey : string;    

    /**
     * Identifies the hostname of the R4R API server
     * 
     * @type {string}
     * @memberof CDEConfiguration
     */
    R4RAPIServer : string;    

}