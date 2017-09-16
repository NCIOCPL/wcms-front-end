import { ClinicalTrialsServiceFactory } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import { NCIBaseEnhancement } from 'UX/core';

/**
 * Class to be used as a base for all CTS forms.
 * 
 * @export
 * @abstract
 * @class CTSBaseFormSetup
 * @extends {NCIBaseEnhancement}
 */
export abstract class CTSBaseFormSetup extends NCIBaseEnhancement{
		
	protected facade:CTAPIFacade;

	/**
	 * Execute the constructor function on the base enhancement class &
	 * create an instance of the CT API service.
	 */
	constructor(apiHost: string) { 
		super();
		this.facade = new CTAPIFacade(
			ClinicalTrialsServiceFactory.create(apiHost),
			this.isDebug()
		);
	}

	/**
	 * This is an abstract initialize method that must be implemented by subclasses
	 * @abstract
	 */
	protected abstract initializeLocalFields(): void;	

	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	protected initialize(): void {

		
		// Initialize any fields that are drawn by the subclass.
		this.initializeLocalFields();		
	}
	
}