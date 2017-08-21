import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';

/**
 * Base class for all CTS Search Form Pages.
 * 
 * @export
 * @abstract
 * @class BaseCTSSearchPage
 */
export abstract class BaseCTSSearchPage {

  /**
   * Gets the running CDEConfiguration for this environment.
   * 
   * @protected
   * @type {CDEConfiguration}
   * @memberof BaseCTSSearchPage
   */
  protected Config: CDEConfiguration;

  /**
	 * Creates an instance of BaseCTSSearchPage.
	 * @param {string} apiHost 
	 */
	constructor() { 
    let configSvc:CDERuntimeConfig = new CDERuntimeConfig();
    this.Config = configSvc.getConfiguration();
	}

  /**
   * Wires up the required enhancements onReady
   * 
   * @abstract
   * @memberof BaseCTSSearchPage
   */
  public abstract onReady(): void;

}