import { CTSBaseFormSetup } from './cts-base-form-setup';
import { DiseaseResult } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "../../../../../../../../node_modules/select2";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-initializer';

/**
 * Class to be used as a base for all CTS forms with disease selection menus
 * 
 * @export
 * @abstract
 * @class CTSBaseFormSetup
 * @extends {NCIBaseEnhancement}
 */
export abstract class CTSBaseDiseaseFormSetup extends CTSBaseFormSetup{
		
	protected $primaryCancer: any;

	protected $subtypeCancer: any;

	protected $stageCancer: any;
	
	protected $findings: any;

	protected $otherDiseaseWrap: any;

	/**
	 * Execute the constructor function on the base enhancement class &
	 * create an instance of the CT API service.
	 */
	constructor(apiHost: string) { 
		super(apiHost);
	}

	/**
	 * This is an abstract initialize method that must be implemented by subclasses
	 * 
	 */
	protected initializeLocalFields(): void {		
		// Create jQuery selector vars
		this.$primaryCancer = $('.adv-search #ct-select');
		this.$subtypeCancer = $('.adv-search #st-multiselect');
		this.$stageCancer = $('.adv-search #stg-multiselect');
		this.$findings = $('.adv-search #fin-multiselect');
		this.$otherDiseaseWrap = $('#other-diseases');

		// TODO: Verify run background processes before drawing things on form;  
		// our select2 elements should proceed in this order:
		// 1) Initialize, empty, reset data for each field's selctor before drawing
		// 2) Draw selection box text - this will be done dynamically depending on the 
		//    parent type(s) or if the endpoint can't be reached
		// 3) Fetch & populate data

		//disable select fields from the start.
		this.$otherDiseaseWrap.attr('class','fieldset-disabled');
		this.$subtypeCancer.prop("disabled", true);
		this.$stageCancer.prop("disabled", true);
		this.$findings.prop("disabled", true);

    //Initialize Select2 controls.
		//These initializations do no load data but only add select2 to the controls,
		//as well as attach event handlers.		
		this.$subtypeCancer.select2(
			{
				// do all the things
				placeholder: 'Please select a Cancer Type First'			
			})
			.on("select2:select", this.onSubtypeChange.bind(this))
			.on("select2:unselect", this.onSubtypeChange.bind(this));
			//NOTE: bind(this) will ensure that when onSubtypeChange is called "this" will be the instance of our class.			

		this.$stageCancer.select2({
			placeholder: 'Please select a Cancer Type or Sub Type First'
		})

		// Add findings select2 control only if the selector exists
		if(this.isNotEmpty(this.$findings)) {
			this.$findings.select2({
				minimumInputLength: 3, 
				placeholder: 'Please select a Cancer Type or Sub Type First'
			})
		}

		//Initialize maintype selector
		this.$primaryCancer.select2({})
			.on("select2:select", this.onMaintypeChange.bind(this));
			//NOTE: bind(this) will ensure that when onSubtypeChange is called "this" will be the instance of our class.

		// Populate main 'diseases' list
		this.populateMainType();
	}

	/**
	 * Event handler for subtype menu changes
	 * 
	 * @private
	 * @param {any} e The event
	 * @memberof CTSBaseFormSetup
	 */
	private onMaintypeChange(e) {

		if (e.target.value == undefined || e.target.value == "") {
			//All was selected - clear everything out.
			this.clearSubtypeField();
			this.clearStageField();
			if(this.isNotEmpty(this.$findings)) {			
				this.clearFindingField();
			}
			this.$otherDiseaseWrap.attr('class','fieldset-disabled');
			//Set disabled class around the 3 field's & labels when all is selected.

		} else {
			//A type was selected.  So go fetch the other menus.

			//Extract codes
			let codesStr:string = e.target.value;
			let codes:string[] = codesStr.split("|");

			this.populateSubtypeField(codes)
			this.populateStageField(codes)
			if(this.isNotEmpty(this.$findings)) {
				this.populateFindingField(codes)
			}

			this.$otherDiseaseWrap.attr('class','fieldset-enabled');	
		}
	}

	/**
	 * Event handler for subtype menu changes
	 * 
	 * @private
	 * @param {any} e The event.
	 * @memberof CTSBaseFormSetup
	 */
	private onSubtypeChange(e) {
		//Do not clear, but repopulate if others selected.
		let allCodes:string[] = [];

		let primarySelected = this.$primaryCancer.select2("val"); //Single
		let subTypeSelected = this.$subtypeCancer.select2("val"); //Array

		if (primarySelected) {
			let codes:string[] = primarySelected.split("|");
			codes.forEach(c => allCodes.push(c));
		}

		if (subTypeSelected.length > 0) {
			subTypeSelected.forEach(subtype => {
				let codes:string[] = subtype.split("|");
				codes.forEach(c => allCodes.push(c));
			})
		}

		if (allCodes.length > 0) {
			this.populateStageField(allCodes);
			if(this.isNotEmpty(this.$findings)) {
				this.populateFindingField(allCodes);
			}	
		} else {
			this.clearStageField();
			if(this.isNotEmpty(this.$findings)) {			
				this.clearFindingField();
			}
		}
	}
	
	/**
	 * Method that populates the MainType dropdown.
	 * 
	 * @private
	 * @memberof CTSBaseFormSetup
	 */
	private populateMainType() {
		this.facade.getMainType()
			.then((resList:DiseaseResult[]) => {
				let primaryTypes = resList.map( val => {
							return {
								id: val.codes.join('|'),
								text: val.name
							}
						});

				this.$primaryCancer.select2({	data: primaryTypes });
			})
			.catch((err) => {
				console.log(err)
			})	
	}

	/**
	 * Method that populates the Subtypes field given one or more ancestor Concept IDs
	 * 
	 * @private
	 * @param {(string|string[])} codes One or more NCI Thesaurus concept ids.
	 * @memberof CTSBaseFormSetup
	 */
	private populateSubtypeField(codes:string|string[]) {
		this.$subtypeCancer.empty();
		this.facade.getSubtypes(codes)
			.then((resList:DiseaseResult[]) => {
				let subtypes = resList.map( val => {
							return {
								id: val.codes.join('|'),
								text: val.name
							}
						});

				this.$subtypeCancer.select2({
					data: subtypes,
					language: {
						noResults: ( params => "No available options based on your previous selection." )
					}
				});
				this.$subtypeCancer.prop("disabled", false);
			})
	}

	private clearSubtypeField() {
		this.$subtypeCancer.empty();
		this.$subtypeCancer.select2().val(null).trigger("change");
		this.$subtypeCancer.prop("disabled", true);
	}

	/**
	 * Method that populates the Stages field given one or more ancestor Concept IDs
	 * 
	 * @private
	 * @param {(string|string[])} codes One or more NCI Thesaurus concept ids.
	 * @memberof CTSBaseFormSetup
	 */
	private populateStageField(codes:string|string[]) {
		this.$stageCancer.empty();
		this.facade.getStages(codes)
			.then((resList:DiseaseResult[]) => {
				let stages = resList.map( val => {
							return {
								id: val.codes.join('|'),
								text: val.name
							}
						});

				this.$stageCancer.select2({
					data: stages,
					language: {
						noResults: ( params => "No available options based on your previous selection." )
					}
				});
				this.$stageCancer.prop("disabled", false);
			})		
	}

	private clearStageField() {
		this.$stageCancer.empty();
		this.$stageCancer.select2().val(null).trigger("change");
		this.$stageCancer.prop("disabled", true);		
	}
	
	/**
	 * Method that populates the findings field given one or more ancestor Concept IDs
	 * 
	 * @private
	 * @param {(string|string[])} codes One or more NCI Thesaurus concept ids.
	 * @memberof CTSBaseFormSetup
	 */
	private populateFindingField(codes:string|string[]) {
		this.$findings.empty();
		this.facade.getFindings(codes)
			.then((resList:DiseaseResult[]) => {
				let findings = resList.map( val => {
							return {
								id: val.codes.join('|'),
								text: val.name
							}
						});

				this.$findings.select2({
					data: findings,
					minimumInputLength: 3,
					language: {
						noResults: ( params => "No available options based on your previous selection." )
					}
				});
				this.$findings.prop("disabled", false);
			})
	}
	
	private clearFindingField() {
		this.$findings.empty();
		this.$findings.select2().val(null).trigger("change");
		this.$findings.prop("disabled", true);
	}

	/**
	 * Utility method to check if a selector has a value.
	 * @param sel 
	 */
	private isNotEmpty(sel) {
		return sel.length > 0;
	}
	
}