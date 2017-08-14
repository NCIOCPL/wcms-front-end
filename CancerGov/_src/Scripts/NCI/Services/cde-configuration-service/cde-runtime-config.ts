import { CDEConfigurationService, CDEConfiguration, CDEDefaultConfiguration } from './';
import * as jquery from 'jquery';


export class CDERuntimeConfig implements CDEConfigurationService {

    private defaultConfiguration : CDEConfiguration;

    constructor() {
        this.defaultConfiguration = new CDEDefaultConfiguration();
    }

    getConfiguration() : CDEConfiguration {

        // Get the default configuration.  Maintained in the CDEDefaultConfiguration model.
        let configuration:CDEConfiguration = this.defaultConfiguration;
        console.log('defaults:');
        console.log(configuration);

        // If any overrides are available for the current runtime environment, load them on top of
        // the existing defaults.
        if (typeof CDEConfig !== 'undefined') {
            console.log('Found configuration overrides.');
            console.log(CDEConfig);

            let hostname:string = window.location.hostname;
            if( hostname in CDEConfig.environmentConfig ) {
                console.log( 'Loading overrides for \'' + hostname + '\'');
                let overrides = CDEConfig.environmentConfig[hostname];
                console.log(overrides);
                configuration = jquery.extend({}, this.defaultConfiguration, <CDEConfiguration>overrides);
            }

        }

        console.log(configuration);

        return configuration;
    }
}