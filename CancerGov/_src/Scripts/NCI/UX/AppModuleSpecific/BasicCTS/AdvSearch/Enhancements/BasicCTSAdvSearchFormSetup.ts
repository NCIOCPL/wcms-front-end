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

		// TODO: Verify run background processes before drawing things on form;  
		// our select2 elements should proceed in this order:
		// 1) Initialize, empty, reset data for each field's selctor before drawing
		// 2) Draw selection box text - this will be done dynamically depending on the 
		//    parent type(s) or if the endpoint can't be reached
		// 3) Fetch & populate data

		// Populate main 'diseases' list
		$this.getMainType($primaryCancer);

		// When we get to subtypes etc...:
		// this.facade.getSubtypes.bind(this.facade, primaryTypeID)

		// Build select2 for Subtypes, Stages, Findings
		$this.getSubtypeFields($subtypeCancer);
		$this.getStageFields($stageCancer);
		$this.getFindingFields($findings);

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

        // Gray out unselected location fields 		
        this.selectLocFieldset();
	}
	

	
	/*
	* Populate main 'diseases' list
	* TODO: Hook up real endpoint when in place
	*       Add 'all' as a primary, have 'all' populate dropdown on error
	*       Remove the second Primary Type dropdown	
	*/
	private getMainType($ctSel) {
		this.facade.getMainType()
			.then((resList) => {
				//$ctSel.empty();
				$ctSel.select2({
					data: <any>resList.map(function(val) {
						return {
							id: val.codes.join('|'),
							text: val.name
						}
					})
				})
			})
			.catch((err) => {
				console.log(err)
			})	
	}

	/*
	* Populate Subtypes
	* TODO: Using empty select2 for now; hook up with actual data
	*/
	private getSubtypeFields($stSel) {
		$stSel.empty();
		$stSel.select2({
			// do all the things
			placeholder: 'Please select a Cancer Type First'			
		})
	}

	/*
	* Populate Stages
	* TODO: Using empty select2 for now; hook up with actual data
	*/
	private getStageFields($stSel) {
		$stSel.empty();
		$stSel.select2({
			placeholder: 'Please select a Cancer Type or Sub Type First'
		})
	}
	
	/*
	* Populate Findings
	* TODO: Using empty select2 for now; hook up with actual data
	*/
	private getFindingFields($fSel) {
		$fSel.empty();
		$fSel.select2({
			minimumInputLength: 1, 
			placeholder: 'Please select a Cancer Type or Sub Type First'
		})
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

		// TODO: gray out unchecked, errored fields when a differet location type selection is made

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