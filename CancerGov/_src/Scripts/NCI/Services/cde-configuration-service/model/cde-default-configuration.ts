import { CDEConfiguration } from './';

/**
 * Class for specifying default values for runtime configuration options.
 * 
 * NOTE: New options must be defined in CDEConfiguration and given explicit default values
 * in CDEDefaultConfiguration.
 */
export class CDEDefaultConfiguration implements CDEConfiguration {
    /**
     * Identifies the hostname of the clinicaltrials API server
     * 
     * @type {string}
     * @memberof CDEDefaultConfiguration
     */
    ClinicalTrialsAPIServer : string = 'clinicaltrialsapi.cancer.gov';

    /**
     * The key required to conect to the Google developer API
     * 
     * @type {string}
     * @memberof CDEDefaultConfiguration
     */
    // This is our official key
    GoogleAPIKey : string = 'AIzaSyB0DtmqLHmCLjAMjGfNh9myktZYz2-yIfg';
    
    // This is Brendan's key for testing on localhost
    // GoogleAPIKey : string = 'AIzaSyASmav6-lTS2G7xb-7fL146lsvtK9_oJgs';
 
        /**
     * Identifies the hostname of the clinicaltrials API server
     * 
     * @type {string}
     * @memberof CDEDefaultConfiguration
     */
    R4RAPIServer : string = 'https://webapis.cancer.gov/r4r/v1';
}
