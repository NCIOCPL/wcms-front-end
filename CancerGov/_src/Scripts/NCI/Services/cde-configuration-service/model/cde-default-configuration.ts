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
}