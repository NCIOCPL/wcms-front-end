import { ClinicalTrialsServiceFactory, InterventionResult } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import { NCIBaseEnhancement } from 'UX/core';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "../../../../../../../../node_modules/select2";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-initializer';


export abstract class CTSBaseFormSetup extends NCIBaseEnhancement{

	// make this protected 
	protected facade:CTAPIFacade;

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
	 * This is an abstract initialize method that must be implemented by subclasses
	 * @abstract
	 */
	protected abstract initializeLocalFields(): void;

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
		let $this = this; // create $this variable for use within initialize() scope

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
		
		// Initialize any fields that are drawn by the subclass.
		this.initializeLocalFields();
		
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
	private getStageFields($stgSel) {
		$stgSel.empty();
		$stgSel.select2({
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
	
	
}