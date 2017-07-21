import "Plugins/jquery.nci.equal_heights";
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import "select2";
import * as NCI from "UX/Common/Enhancements/NCI"; 
import { NCIBaseEnhancement } from 'UX/core';
import { ClinicalTrialsServiceFactory } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';

export class BasicCTSAdvSearchFormSetup extends NCIBaseEnhancement{
 
	private facade:CTAPIFacade;

	/**
	 * Execute the constructor function on the base enhancement class &
	 * create an instance of the CT API service.
	 */
	constructor(apiHost: string) { 
		super();
		this.facade = new CTAPIFacade(
			ClinicalTrialsServiceFactory.create(apiHost)
		);
	}

	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	protected initialize(): void {

		// Create jQuery selector vars
		let $primaryCancer = $('.adv-search #ct-select');
		let $subtypeCancer = $('.adv-search #st-multiselect');
		let $stageCancer = $('.adv-search #stg-multiselect');
		let $findings = $('.adv-search #fin-multiselect');
		let $hospital = $('.adv-search #hos');
		let $treatmentType = $('.adv-search #ti');
		let $trialInvestigators = $('.adv-search #in');
		let $leadOrg = $('.adv-search #lo');
		let $this = this; // create $this variable for use within selector

		// Get countries on page load
		$this.getCountries();
		
		// Populate Trial Investigators dropdown autusuggest
		(<any>$trialInvestigators).ctsautoselect({
			source: (request,response) => {
					this.facade.searchTrialInvestigators(request.term)
					.then((res)=> {
						response(res)
					})
					.catch(err => {
						console.log(err)
						response([])
					});
			}
		});

		// Populate Lead Organization dropdown autusuggest
		(<any>$leadOrg).ctsautoselect({
			source: (request,response) => {
					this.facade.searchLeadOrg(request.term)
					.then((res)=> {
						response(res)
					})
					.catch(err => {
						console.log(err)
						response([])
					});
			}
		});

        // Disable subtype/stage/findings
		// $subtypeCancer.select2({
		// 	disabled: true,
		// 	placeholder: 'In development - subtypes cannot be selected'
		// })
		// $stageCancer.select2({
		// 	disabled: true,
		// 	placeholder: 'In development - stages cannot be selected'
		// })
		// $findings.select2({
		// 	disabled: true,
		// 	placeholder: 'In development - findings cannot be selected'
		// })


        // Select2 for drugs
		var $drugWrap = $('<div class="drug-select-dropdown">');
		$drugWrap.appendTo($('body'));
		var $drugSelect = $("#dr-multiselect");
		$drugSelect.select2({
			dropdownParent: $drugWrap,
            theme: "classic",
            placeholder: 'In development - drug autosuggest turned off'
        }); 

        // Select2 for other treatment
		var $trtmntWrap = $('<div class="trtmnt-select-dropdown">');
		$trtmntWrap.appendTo($('body'));
		var $trtmntSelect = $("#ti-multiselect");
		$trtmntSelect.select2({
			dropdownParent: $trtmntWrap,
            theme: "classic",
            placeholder: 'In development - treatment autosuggest turned off'
        });


	}
	
	/*
	* Populate the location Country dropdown field
	*/
	private getCountries() {
		this.facade.getCountries()
				.then((countriesList:string[]) => {
					for(let country of countriesList) { 
						$('#lcnty').append($('<option></option')
							.attr('value',country)
							.text(country)
						)
					}
				})
				//TODO: remove log message on error - keeping now for debugging purposes
				.catch((err:any) => {
					console.log(err)
				})

	}

	/*
	* Populate the LeadOrg select2 field
	* Preliminary call to ctapi-facade
	*/	
	// private searchLeadOrg(leadOrg) {
	// 		this.facade.searchLeadOrg(leadOrg.val())
	// 		.then((orgs:TermResult[]) => {
	// 			//TODO - hook up the form and remove the console.log messages
	// 			console.log(orgs)
	// 		})
	// 		.catch((err:any) => {
	// 			console.log(err)
	// 		})

			// .highlighterautocomplete({
			//     fetchSrc: function(term) {
			// 		dataQuery = {
			// 			'agg_field': fieldName,
			// 			'agg_term': term,
			// 			'size': 10,
			// 			'current_trial_status': trialStatuses
			// 		};
			// 		return $.ajax({
			// 			url: 'https://m-pink-dev.cancer.gov/trial-aggregates',
			// 			data: dataQuery,
			// 			dataType: 'json'
			// 		}).pipe(function(res){
			// 			var rtn = res.terms.map(function(item){
			// 				return {'term': item.key};
			// 			});
			// 			return {
			// 				result: rtn
			// 			}
			// 		});
			// 	}
			// });			

			// (<any>$leadOrg).autocompleteselector(
			// );

	//}

	private sAutocomplete(module, fieldName, input, trialStatuses) {
        // Do nothing
	}
	private hAutocomplete(module, fieldName, trialStatuses){
        // Do nothing
	}
	
}