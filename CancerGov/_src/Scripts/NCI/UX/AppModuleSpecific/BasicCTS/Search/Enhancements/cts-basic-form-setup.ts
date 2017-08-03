import { ClinicalTrialsServiceFactory, InterventionResult } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import { NCIBaseEnhancement } from 'UX/core';
import { CTSBaseFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-base-form-setup';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "../../../../../../../../node_modules/select2";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-initializer';

/**
 * Concrete implementation of form setup class for basic search
 * @extends {CTSBaseFormSetup}
 */
export class CTSBasicFormSetup extends CTSBaseFormSetup{

	/**
	 * Creates an instance of CTSBasicFormSetup.
	 * Execute the constructor function on the base form setup class. 
	 * @param {string} apiHost 
	 */
	constructor(apiHost: string) { 
		super(apiHost);
	}

	/**
	 * Initialize field creation for this subclass. 
	 * @protected
	 * @memberof CTSBasicFormSetup
	 */
	protected initializeLocalFields(): void {
		// We don't need to do anything in here right now, since everything 
		// we care about for this form lives in cts-base-form-setup. However, we 
		// need to have this method in place to run the main initialize function. 
	}
	
}