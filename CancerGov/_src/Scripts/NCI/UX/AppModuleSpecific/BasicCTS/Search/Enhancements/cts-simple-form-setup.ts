import { CTSBaseFormSetup } from './cts-base-form-setup';
import { DiseaseResult} from 'Services/clinical-trials';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctssimpletermbox";

/**
 * Concrete (simple search) implementation of form setup class.
 * @extends {CTSSimpleFormSetup}
 */
export class CTSSimpleFormSetup extends CTSBaseFormSetup{

	protected $termSelect: any;

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
		
		this.$termSelect = $('#q');

		// Initialize Type/Phrase autosuggest
		this.$termSelect.ctssimpletermbox({
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

	/**
	 * This is meant to be called post validation.  This is used to lookup
	 * the first term and see if the user used those words, but did not 
	 * select it.
	 * 
	 * @private
	 * @memberof CTSSimpleFormSetup
	 */
	private postValidationStep() {
		var hasKeywordMatch = false;

		//If our fancy input exists and it does not have a set value.
		if (
			this.$termSelect && 
			this.$termSelect.ctssimpletermbox("getSelection") !== false &&
			(this.$termSelect.val() != undefined && this.$termSelect.val() != "") 
		){

			let searchText = this.$termSelect.val();
			
			//Now we must go to the facade and fetch the first item.
			this.facade.getDiseasesForSimpleTypeAhead(searchText)
				.then((res:DiseaseResult[])=> {
					if (res.length > 0) {

						if (this.CalculateLevenshtein(searchText, res[0].name) == 0) {
							//if it matches, then set the autosuggest
							this.$termSelect.ctssimpletermbox("setSelection", res[0].codes.join("|"));
							//Set $hasKeywordMatch flag to true in order to track term instead of keyword
							hasKeywordMatch = true;
							
							//NOW do stuff.
						}
					}
				})					
				.catch(err => {
					console.log(err);					
				});

		}

	}

	/**
	 * Determines the Levenshtein distance between two strings.
	 * https://en.wikipedia.org/wiki/Levenshtein_distance
	 */
	private CalculateLevenshtein(a:string, b:string) {		
		a = a + "";
		b = b + "";

		a = a.toLowerCase();
		b = b.toLowerCase();

		let m = [], i, j, min = Math.min;

		if (!(a && b)) return (b || a).length;

		for (i = 0; i <= b.length; m[i] = [i++]);
		for (j = 0; j <= a.length; m[0][j] = j++);

		for (i = 1; i <= b.length; i++) {
			for (j = 1; j <= a.length; j++) {
				m[i][j] = b.charAt(i - 1) == a.charAt(j - 1)
					? m[i - 1][j - 1]
					: m[i][j] = min(
						m[i - 1][j - 1] + 1,
						min(m[i][j - 1] + 1, m[i - 1 ][j] + 1))
			}
		}

		return m[b.length][a.length];
	};
	
}