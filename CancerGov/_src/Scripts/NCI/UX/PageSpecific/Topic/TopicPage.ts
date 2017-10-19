import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'Plugins/jquery.nci.equal_heights';
import 'UX/Common/Enhancements/sharecomponent';
import * as ClinicalTrialsDelighter from 'UX/Common/Enhancements/clinicalTrialsDelighter';
import * as VideoCarousel from 'UX/Common/Enhancements/video-carousel';
import * as AnalyticsAfter from 'UX/Common/Enhancements/analytics.After';


/**
 * Class representing CancerGov Topic Pages.
 * 
 * @export
 * @abstract
 * @class TopicPage
 */
class TopicPage extends NCIBasePage {
    /**
    * Gets the running CDEConfiguration for this environment.
    * @protected
    * @type {CDEConfiguration}
    */
    protected Config: CDEConfiguration;
	
	/**
	* Creates an instance of InnerPage.
	* @param {string} apiHost 
	*/
	constructor() { 
		super();
		let configSvc:CDERuntimeConfig = new CDERuntimeConfig();
		this.Config = configSvc.getConfiguration();
	}

	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof TopicPage
	 */
	onReady():void {
		(<any>ClinicalTrialsDelighter).init();
		(<any>$('[data-match-height]')).NCI_equal_heights();
		(<any>VideoCarousel).init();
		(<any>AnalyticsAfter).init();
	}

}

/**
 * Initialize TopicPage
 */
(function() { //encapsulation
	let topicPage:TopicPage = new TopicPage();
	topicPage.init();
})();