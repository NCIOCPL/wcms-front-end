import { ClinicalTrialsServiceFactory, InterventionResult, DiseaseResult } from 'Services/clinical-trials';
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
	protected $primaryCancer: any;
	protected $subtypeCancer: any;
	protected $stageCancer: any;
	protected $findings: any;

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
		this.$primaryCancer = $('.adv-search #ct-select');
		this.$subtypeCancer = $('.adv-search #st-multiselect');
		this.$stageCancer = $('.adv-search #stg-multiselect');
		this.$findings = $('.adv-search #fin-multiselect');

		let $this = this; // create $this variable for use within initialize() scope

		// TODO: Verify run background processes before drawing things on form;  
		// our select2 elements should proceed in this order:
		// 1) Initialize, empty, reset data for each field's selctor before drawing
		// 2) Draw selection box text - this will be done dynamically depending on the 
		//    parent type(s) or if the endpoint can't be reached
		// 3) Fetch & populate data

    //Initialize Select2 controls.
		this.$subtypeCancer.select2({
			// do all the things
			placeholder: 'Please select a Cancer Type First'			
		})
			.on("select2:select", (e) => {
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

				this.populateStageField(allCodes);
				this.populateFindingField(allCodes);
			})
			.on("select2:unselect", (e) => {
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
					this.populateFindingField(allCodes);
				} else {
					this.clearStageField();
					this.clearFindingField();
				}
			});

		this.$stageCancer.select2({
			placeholder: 'Please select a Cancer Type or Sub Type First'
		})

		this.$findings.select2({
			minimumInputLength: 1, 
			placeholder: 'Please select a Cancer Type or Sub Type First'
		})

		this.$primaryCancer.select2({})
			.on("select2:select", (e) => {
				//Extract codes
				let codesStr:string = e.target.value;
				let codes:string[] = codesStr.split("|");

				this.populateSubtypeField(codes)
				this.populateStageField(codes)
				this.populateFindingField(codes)
			})
			.on("select2:unselect", (e) => {
				this.clearSubtypeField();
				this.clearStageField();
				this.clearFindingField();
			})

		// Populate main 'diseases' list
		this.populateMainType();

		// When we get to subtypes etc...:
		// this.facade.getSubtypes.bind(this.facade, primaryTypeID)
		
		// Initialize any fields that are drawn by the subclass.
		this.initializeLocalFields();
		
	}
	

	
	/*
	* Populate main 'diseases' list
	* TODO: Hook up real endpoint when in place
	*       Add 'all' as a primary, have 'all' populate dropdown on error
	*       Remove the second Primary Type dropdown	
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

	/*
	* Populate Subtypes
	* TODO: Using empty select2 for now; hook up with actual data
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

				this.$subtypeCancer.select2({data: subtypes});
				this.$subtypeCancer.prop("disabled", false);
			})
	}

	private clearSubtypeField() {
		this.$subtypeCancer.empty();
		this.$subtypeCancer.select2().val(null).trigger("change");
		this.$subtypeCancer.prop("disabled", true);
	}

	/*
	* Populate Stages
	* TODO: Using empty select2 for now; hook up with actual data
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

				this.$stageCancer.select2({data: stages});
				this.$stageCancer.prop("disabled", false);
			})		
	}

	private clearStageField() {
		this.$stageCancer.empty();
		this.$stageCancer.select2().val(null).trigger("change");
		this.$stageCancer.prop("disabled", true);		
	}
	
	/*
	* Populate Findings
	* TODO: Using empty select2 for now; hook up with actual data
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

				this.$findings.select2({data: findings});
				this.$findings.prop("disabled", false);
			})		
	}
	
	private clearFindingField() {
		this.$findings.empty();
		this.$findings.select2().val(null).trigger("change");
		this.$findings.prop("disabled", true);
	}
	
}