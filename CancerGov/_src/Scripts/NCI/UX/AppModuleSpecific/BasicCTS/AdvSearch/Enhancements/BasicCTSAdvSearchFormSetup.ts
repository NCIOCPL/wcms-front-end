import "Plugins/jquery.nci.equal_heights";
import "UX/Common/Plugins/Widgets/jquery.ui.autocompleteselector"; 
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
		
		// Populate Lead Organization dropdown autusuggest
		$leadOrg.keyup(function(event) {
			if($leadOrg.val().toString().length > 1)
				$this.searchLeadOrg($leadOrg.val());
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
	private searchLeadOrg(orgName) {
			this.facade.searchLeadOrg(orgName)
			.then((orgs:string[]) => {
				//TODO - hook up the form and remove the console.log messages
				console.log(orgs)
			})
			.catch((err:any) => {
				console.log(err)
			})
	}

	private sAutocomplete(module, fieldName, input, trialStatuses) {
        // Do nothing
	}
	private hAutocomplete(module, fieldName, trialStatuses){
        // Do nothing
	}
	
}