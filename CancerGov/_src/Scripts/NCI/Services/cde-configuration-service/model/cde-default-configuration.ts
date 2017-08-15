import { CDEConfiguration } from './';

/**
 * Class for specifying default values for runtime configuration options.
 * 
 * NOTE: New options must be defined in CDEConfiguration and given explicit default values
 * in CDEDefaultConfiguration.
 */
export class CDEDefaultConfiguration implements CDEConfiguration {
    // These setting names are placeholders
    setting1 : string = 'this is the first default string value';
    setting2 : string = 'this is the second default string value';
    setting3 : number = 87600;
}