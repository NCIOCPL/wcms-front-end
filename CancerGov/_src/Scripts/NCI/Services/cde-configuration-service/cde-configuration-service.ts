import { CDEConfiguration } from './';

/**
 * Speicifies an interface for retrieving environment-specific JavaScript configuration values.
 * This allows configuration settings to be specified at runtime rather than being baked into
 * the JavaScript at build-time.
 */
export interface CDEConfigurationService {

    /**
     * Gets the runtime configuration options for the current runtime environment.
     * (eg. A service URL specific to the lower tiers.)
     */
    getConfiguration() : CDEConfiguration;
}