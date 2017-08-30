import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
/**
 * Base class for all CTS Search Form Pages.
 * 
 * @export
 * @abstract
 * @class BaseCTSSearchPage
 */
export abstract class BaseCTSSearchPage extends NCIBasePage {

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
    super();

    let configSvc:CDERuntimeConfig = new CDERuntimeConfig();
    this.Config = configSvc.getConfiguration();
	}

}