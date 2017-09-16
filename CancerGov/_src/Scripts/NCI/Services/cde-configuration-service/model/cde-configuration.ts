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
}