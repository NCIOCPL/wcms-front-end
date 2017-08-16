import { CTSBaseFormSetup } from './cts-base-form-setup';
import { DiseaseResult} from 'Services/clinical-trials';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctssimpletermbox";

/**
 * Concrete (simple search) implementation of form setup class.
 * @extends {CTSSimpleFormSetup}
 */
export class CTSSimpleFormSetup extends CTSBaseFormSetup{

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
	 * @memberof CTSSimpleFormSetup
	 */
	protected initializeLocalFields(): void {
		//Call the base class' initialize Local fields to get disease menus.		
		
		let $termSelect = $('#q');

		// Populate Trial Investigators dropdown autusuggest
		(<any>$termSelect).ctssimpletermbox({
			source: (request,response) => {
				this.facade.getDiseasesForSimpleTypeAhead(request.term)
				.then((res:DiseaseResult[])=> {
					response(res.map((disease:DiseaseResult) => {
							return {
								term: disease.name,
								id: disease.codes.join("|")
							};
					}));
				})
				.catch(err => {
					console.log(err);
					response([])
				});
			}
		});
	}
	
}