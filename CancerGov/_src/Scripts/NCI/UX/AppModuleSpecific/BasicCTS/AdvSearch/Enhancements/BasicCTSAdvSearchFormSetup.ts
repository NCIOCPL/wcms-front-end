import { ClinicalTrialsServiceFactory, InterventionResult } from 'Services/clinical-trials';
import { CTAPIFacade } from 'UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';
import { NCIBaseEnhancement } from 'UX/core';
import * as NCI from "UX/Common/Enhancements/NCI"; 
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect"; 
import "../../../../../../../../node_modules/select2";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete"; 
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-adapter';


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


		// Populate the drug field 
		var $drugSelect = $("#dr-multiselect");
		this.buildDrugSelect($drugSelect);
			
		// Populate the other interventions field
		var $ivSelect = $("#ti-multiselect");
		this.buildInterventionSelect($ivSelect);

        // Gray out unselected location fields 		
        this.selectLocFieldset();
	}

	/*
	* Build the Select2 for drugs
	*/
	private buildDrugSelect($selector) {
		var $drugWrap = $('<div class="drug-select-dropdown">');
		$drugWrap.appendTo($('body'));

		(<any>Select2InterventionsInitializer).default($selector, {
			dropdownParent: $drugWrap,
            theme: "classic",
			placeholder: 'Type the drug you are looking for below',
			minimumInputLength: 3,
			escapeMarkup: function (markup) { return markup; },
			templateResult: function(item) {
				console.log(item);
				if (item.loading) return item.text;
				var markup = '<div class="drug-item-wrap"><div class="drug-item">';

				//Draw name line
				markup += '<div class="preferred-name">' + item.text;
				if ( item.category == 'agent category') {
					markup += ' <span class="type">(DRUG FAMILY)</span> '
				}
				markup += "</div>";
				//End name line

				//Draw synonyms
				if (item.synonyms.length > 0) {
					//This is a bit hacky to get at the words a user is filtering.
					var filter_text = $selector.data('select2').$container.find("input").val();
					if (filter_text) {
						var matchedSyn = [];
						var regexBold = new RegExp('(^' + filter_text + '|\\s+' + filter_text + ')', 'i');
						item.synonyms.forEach(function(syn) {
							if (syn.match(regexBold)) {
								matchedSyn.push(syn.replace(regexBold, "<strong>$&</strong>"));
							}
						});
						if (matchedSyn.length >0) {
							markup += ' <span class="synonyms">Other Names: ' +
							matchedSyn.join(", ");
							markup += '</span>';
						}
					}
					// highlight autocomplete item if it appears at the beginning
                	//

            		//var word = (item.item || item.term).replace(regexBold, "<strong>$&</strong>");
				}
				//End synonyms
				markup += '</div></div>'
				return markup;
			},
			promise: {
				dataFunction: this.facade.searchDrugs.bind(this.facade),
				processResults: (results:InterventionResult[]) => {
					return {
						results: results.map((res:InterventionResult) => {
							return {
								id: res.codes.join(","),
								text: res.name,
								synonyms: res.synonyms,
								category: res.category,
								type: res.type
							}
						})
					}
				}				
			}			
		});
	}

	/*
	* Build the Select2 for other interventions
	*/
	private buildInterventionSelect($selector) {
		var $ivWrap = $('<div class="trtmnt-select-dropdown">');
		$ivWrap.appendTo($('body'));
		(<any>Select2InterventionsInitializer).default($selector, {
			dropdownParent: $ivWrap,
            theme: "classic",
			placeholder: 'Start typing the treatment/intervention you are looking for',
			minimumInputLength: 3,
			escapeMarkup: function (markup) { return markup; },
			templateResult: function(item) {
				console.log(item);
				if (item.loading) return item.text;
				var markup = '<div class="trtmnt-item-wrap"><div class="trtmnt-item">';

				//Draw name line
				markup += '<div class="preferred-name">' + item.text;
				markup += "</div>";
				//End name line

				//Draw synonyms
				if (item.synonyms.length > 0) {
					//This is a bit hacky to get at the words a user is filtering.
					var filter_text = $selector.data('select2').$container.find("input").val();
					if (filter_text) {
						var matchedSyn = [];
						var regexBold = new RegExp('(^' + filter_text + '|\\s+' + filter_text + ')', 'i');
						item.synonyms.forEach(function(syn) {
							if (syn.match(regexBold)) {
								matchedSyn.push(syn.replace(regexBold, "<strong>$&</strong>"));
							}
						});
						if (matchedSyn.length >0) {
							markup += ' <span class="synonyms">Other Names: ' +
							matchedSyn.join(", ");
							markup += '</span>';
						}
					}
					// highlight autocomplete item if it appears at the beginning
                	//

            		//var word = (item.item || item.term).replace(regexBold, "<strong>$&</strong>");
				}
				//End synonyms
				markup += '</div></div>'
				return markup;
			},
			promise: {
				dataFunction: this.facade.searchOtherInterventions.bind(this.facade),
				processResults: (results:InterventionResult[]) => {
					return {
						results: results.map((res:InterventionResult) => {
							return {
								id: res.codes.join(","),
								text: res.name,
								synonyms: res.synonyms,
								category: res.category,
								type: res.type
							}
						})
					}
				}
			}			
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