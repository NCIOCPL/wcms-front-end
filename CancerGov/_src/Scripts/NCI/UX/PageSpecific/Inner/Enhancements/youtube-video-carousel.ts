import { YouTubeAPIFacade } from 'UX/PageSpecific/Inner/Enhancements/youtubeapi-facade';
import { NCIBaseEnhancement } from 'UX/core';

/**
 * Class to be used as a base for all CTS forms.
 * 
 * @export
 * @abstract
 * @class CTSBaseFormSetup
 * @extends {NCIBaseEnhancement}
 */
export class YouTubeVideoCarousel extends NCIBaseEnhancement{
		

	/**
	 * Execute the constructor function on the base enhancement class &
	 * create an instance of the CT API service.
	 */
	constructor() { 
		super();
	}


	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	protected initialize(): void {

        //console.log('vc.ts lives');
	}
	
}