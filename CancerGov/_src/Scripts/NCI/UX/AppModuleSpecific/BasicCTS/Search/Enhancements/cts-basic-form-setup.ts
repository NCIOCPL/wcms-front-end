import { CTSBaseDiseaseFormSetup } from './cts-base-disease-form-setup';
import * as NCI from "UX/Common/Enhancements/NCI"; 

/**
 * Concrete (basic search) implementation of form setup class.
 * @extends {CTSBaseFormSetup}
 */
export class CTSBasicFormSetup extends CTSBaseDiseaseFormSetup{

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
		//Call the base class' initialize Local fields to get disease menus.		
		super.initializeLocalFields();

		// Empty method for now - any Basic Search-specific fields should be 
		// added here. This method is required in order to implement CTSBaseFormSetup. 

		// I said this looks like a job for me
		// So everybody, just follow me!
		// ‘Cause we need a little controversy
		// ‘Cause it feels so empty without me
		// Hum dei dei la la Hum dei dei la la la la la
		// Hum dei dei la la Hum dei dei la la la la la

	}
	
}