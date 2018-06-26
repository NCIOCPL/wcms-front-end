import { CDEConfigurationService, CDEConfiguration, CDEDefaultConfiguration } from './';
export class CDERuntimeConfig implements CDEConfigurationService {

    private defaultConfiguration : CDEConfiguration;

    constructor() {
        this.defaultConfiguration = new CDEDefaultConfiguration();
    }

    /**
     * Gets the runtime configuration options for the current runtime environment.
     * (eg. A service URL specific to the lower tiers.)
     */
    getConfiguration() : CDEConfiguration {

        // Get the default configuration.  Maintained in the CDEDefaultConfiguration model.
        let configuration:CDEConfiguration = this.defaultConfiguration;

        // If any overrides are available for the current runtime environment, load them on top of
        // the existing defaults.
        if (typeof CDEConfig !== 'undefined') {

            // Find environment-specific overrides.
            let hostname:string = window.location.hostname;
            if( hostname in CDEConfig.environmentConfig ) {
                console.log( 'Loading overrides for \'' + hostname + '\'');
                let overrides:CDEConfiguration = <CDEConfiguration>CDEConfig.environmentConfig[hostname];
                configuration = { ...this.defaultConfiguration, ...overrides };
            }

        }

        return configuration;
    }
}