import { ClinicalTrialsServiceFactory, InterventionResult } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import { NCIBaseEnhancement } from 'UX/core';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "../../../../../../../../node_modules/select2";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-initializer';


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
		
		// Populate Hospital/Institution dropdown autusuggest
		(<any>$hospital).ctsautoselect({
			source: (request,response) => {
					this.facade.searchHospital(request.term)
					.then((res)=> {
						response(res)
					})
					.catch(err => {
						console.log(err)
						response([])
					});
			}
		});

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


		// Build up Select2 control for drug selection
		var $drugSelect = $("#dr-multiselect");
		(<any>Select2InterventionsInitializer).default(
			$drugSelect,
			'Type the drug you are looking for below',
			this.facade.searchDrugs.bind(this.facade)
		);
			
		// Build up Select2 control for other treatments
		var $ivSelect = $("#ti-multiselect");
		(<any>Select2InterventionsInitializer).default(
			$ivSelect,
			'Start typing the treatment/intervention you are looking for',
			this.facade.searchOtherInterventions.bind(this.facade)
		);

		// 1. initialize select2 on selector
		// 2. fetch & populate primary data
		// run background processes before drawing things on form

		// Populate main 'diseases' list
		// TODO: hook up real endpoint when in place		
		this.facade.searchDiseases(null)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})

		//when we get to subtypes etc...
		//this.facade.getSubtypes.bind(this.facade, primaryTypeID)

        // Gray out unselected location fields 		
        this.selectLocFieldset();
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
    * Enable or disable selection features based on the selected 'Location' radio button.
	*/
    private selectLocFieldset() {

        // Gray out unchecked fieldsets on load
		var $checked = $('input[name="loc"]:checked');
		var $fieldsetItems  = this;
        $fieldsetItems.disableLocFieldset($checked.closest('fieldset').siblings());

        // Gray out unchecked fieldsets when a selection is made
        $("input[name='loc']").on("click",function(e){
        	var $this = $(this);
			var $parent = $this.closest('fieldset');
            $fieldsetItems.enableLocFieldset($parent);
            $fieldsetItems.disableLocFieldset($parent.siblings());
        });
	}

	/*
    * Activate a selected location fieldset
	*/	
    private enableLocFieldset($elem) {
        $elem.attr('class','fieldset-enabled');
        $('.fieldset-enabled').find('input[type=text], input[type=checkbox]').removeAttr('disabled');
        $('.fieldset-enabled').find('span[role=combobox]').removeClass('ui-state-disabled');
    }

	/*
    * Gray out a disabled location fieldsets
	*/	
    private disableLocFieldset($elem) {
        $elem.attr('class','fieldset-disabled');
        $('.fieldset-disabled').find('input[type=text], input[type=checkbox]').attr('disabled','disabled');
        $('.fieldset-disabled').find('span[role=combobox]').addClass('ui-state-disabled');
    }


	private sAutocomplete(module, fieldName, input, trialStatuses) {
        // Do nothing
	}
	private hAutocomplete(module, fieldName, trialStatuses){
        // Do nothing
	}
	
}