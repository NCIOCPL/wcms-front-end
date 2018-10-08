import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'UX/Common/Enhancements/sharecomponent';
import FloatingDelighter from 'Modules/floatingDelighter';
import * as ImageCarousel from 'UX/Common/Enhancements/image-carousel';
import * as VideoCarousel from 'UX/Common/Enhancements/video-carousel';
import './TopicPage.scss';

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
	* Creates an instance of TopicPage.
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
		(<any>FloatingDelighter)();
		(<any>ImageCarousel).init();
		(<any>VideoCarousel).apiInit(this.Config.GoogleAPIKey);		
	}

}

/**
 * Initialize TopicPage
 */
let topicPage:TopicPage = new TopicPage();
topicPage.init();