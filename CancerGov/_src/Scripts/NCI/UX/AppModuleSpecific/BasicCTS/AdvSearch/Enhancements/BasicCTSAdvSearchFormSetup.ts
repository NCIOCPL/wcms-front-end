import "Plugins/jquery.nci.equal_heights";
import "UX/Common/Plugins/Widgets/jquery.ui.autocompleteselector"; 
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import "select2/dist/js/select2";
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
		this.facade.getCountries()
				.then((countriesList:string[]) => {
					//TODO - hook up the form and remove the console.log messages
					console.log(countriesList)
				})
				.catch((err:any) => {
					console.log(err)
				})

        // Create jQuery selector vars for
		var $primaryCancer = $('.adv-search #ct-select');
		var $subtypeCancer = $('.adv-search #st-multiselect');
		var $stageCancer = $('.adv-search #stg-multiselect');
		var $findings = $('.adv-search #fin-multiselect');


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


        // // Select2 for drugs
		// var $drugWrap = $('<div class="drug-select-dropdown">');
		// $drugWrap.appendTo($('body'));
		// var $drugSelect = $("#dr-multiselect");
		// $drugSelect.select2({
		// 	dropdownParent: $drugWrap,
        //     theme: "classic",
        //     placeholder: 'In development - drug autosuggest turned off'
        // }); 

        // // Select2 for other treatment
		// var $trtmntWrap = $('<div class="trtmnt-select-dropdown">');
		// $trtmntWrap.appendTo($('body'));
		// var $trtmntSelect = $("#ti-multiselect");
		// $trtmntSelect.select2({
		// 	dropdownParent: $trtmntWrap,
        //     theme: "classic",
        //     placeholder: 'In development - treatment autosuggest turned off'
        // });

        // Activate / deactivate location fields

    }

	private sAutocomplete(module, fieldName, input, trialStatuses) {
        // Do nothing
	}
	private hAutocomplete(module, fieldName, trialStatuses){
        // Do nothing
	}
	
}