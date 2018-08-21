import { CTSBaseDiseaseFormSetup } from './cts-base-disease-form-setup';
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect";
import "UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete";
import * as Select2InterventionsInitializer from 'UX/AppModuleSpecific/BasicCTS/Common/select2-intervention-initializer';
import "../../Common/Enhancements/trialCheck";
import { lang } from "Modules/NCI.config";
import scrollMonitor from "scrollmonitor";
import { createFragment, appendNodes, getNodeArray } from "Utilities/domManipulation";

/**
 * Concrete (advanced search) implementation of form setup class.
 * @extends {CTSBaseFormSetup}
 */
export class CTSAdvancedFormSetup extends CTSBaseDiseaseFormSetup{

	/**
	 * Creates an instance of CTSAdvancedFormSetup.
	 * Execute the constructor function on the base form setup class.
	 * @param {string} apiHost
	 */
	constructor(apiHost: string) {
		super(apiHost);
	}

	/**
	 * Initialize field creation for this subclass.
	 * @protected
	 * @memberof CTSAdvancedFormSetup
	 */
	protected initializeLocalFields(): void {

		//Call the base class' initialize Local fields to get disease menus.		
		super.initializeLocalFields();


		// Create jQuery selector vars
		let $country = $('#lcnty');
		let $hospital = $('.adv-search #hos');
		let $treatmentType = $('.adv-search #ti');
		let $drugSelect = $("#dr-multiselect");
		let $ivSelect = $("#ti-multiselect");
		let $trialInvestigators = $('.adv-search #in');
		let $leadOrg = $('.adv-search #lo');
		let $this = this; // create $this variable for use within initialize() scope

		// Get countries on page load
		$this.getCountries($country)
			.then(() => {
				$country.each(function () {
					let $this:any = $(this);

					$this.selectmenu({
						change: function (event, ui) {
							// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
							// console.log("changing!");
							if(ui.item.value == "United States"){
								// $(".state-input").removeClass("disabled");
								$("#lst-multiselect").prop('disabled',false).parent().removeClass('disabled');
							} else {
								// $(".state-input").addClass("disabled");
								$("#lst-multiselect").prop('disabled',true).parent().addClass('disabled');
							}

							ui.item.element.change();
						},
						width: $this.hasClass('fullwidth') ? '100%' : null
					}).selectmenu('menuWidget').addClass('scrollable-y');
				});
			});

        // $('select2-container').select2({
		// 	dropdownAutoWidth : true,
		// 	theme: "nci"
		// });

		// Add select2 wrapper to state selector, with options
		(<any>$("#lst-multiselect")).select2({
            theme: "nci",
			matcher: function(params, data) {
				return $this.matchBeginning(params, data);
			},
		});

		// Populate Hospital/Institution dropdown autusuggest
		(<any>$hospital).ctsautoselect({
			source: (request,response) => {
				this.facade.searchHospital(request.term)
				.then((res)=> {
					response(res)
				})
				.catch(err => {
					console.log(err);
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
					console.log(err);
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
					console.log(err);
					response([])
				});
			}
		});

		// Build up Select2 control for drug selection
		(<any>Select2InterventionsInitializer).default(
			$drugSelect,
			"dr-label",
			this.facade.searchDrugs.bind(this.facade)
		);

		// Build up Select2 control for other treatments
		(<any>Select2InterventionsInitializer).default(
			$ivSelect,
			"ti-label",
			this.facade.searchOtherInterventions.bind(this.facade)
		);

        // Gray out unselected location fields
		this.selectLocFieldset();

		// Add form label to state select2 input
		$('#lst-multiselect').data('select2').$container.find("input").attr('aria-labelledby', 'lst-label');

		// Float the submit button
		this.floatSubmitButton();
		
		// Bind the 'Limit results to Veterans Affairs facilities' toggle control to enable/disable Hospitals/Institutions and At NIH
		this.orgVaToggle();
	}

	/*
	* Populate the location Country dropdown field
	*/
	private getCountries($cSel) {
		return this.facade.getCountries()
			.then((countriesList:string[]) => {
				countriesList.forEach(country => {
					if(country == "United States") {
						$cSel.append($('<option></option>')
							.attr('value',country)
							.attr('selected', 'selected')
							.text(country)
						);
					}
					else {
						$cSel.append($('<option></option>')
							.attr('value',country)
							.text(country)
						);
					}
				})
			})
			//TODO: remove log message on error - keeping now for debugging purposes
			.catch((err:any) => {
				console.log(err)
			})

	}

	/*
    * Enable or disable selection features based on the selected 'Location' radio button.
    * TODO: disable state for non-US countries
	*/
    private selectLocFieldset() {

        // Gray out unchecked fieldsets on load
		var $checked = $('input[name="loc"]:checked');
		var $fieldsetItems  = this;
        $fieldsetItems.enableLocFieldset($checked.closest('section'));
        $fieldsetItems.disableLocFieldset($checked.closest('section').siblings("section"));

        // Gray out unchecked fieldsets when a selection is made
        $("input[name='loc']").on("click",function(e){
			//console.log("Location radio clicked");
        	var $this = $(this);
			var $parent = $this.closest('section');
            $fieldsetItems.enableLocFieldset($parent);
			$fieldsetItems.disableLocFieldset($parent.siblings("section"));

			// Do not preserve fields with errors (i.e. Zip code) if we select a different location type
			let $err = $('#fieldset--location input.error');
			if($err){
				$err.removeClass("error");
				$err.next('.error-msg').css('visibility','hidden');
				$err.val('');
			}
        });
	}

	/*
    * Activate a selected location fieldset
	*/
    private enableLocFieldset($elem:any) {
        $elem.addClass('enabled').removeClass('disabled');
		$elem.find('input[type=text], input[type=checkbox]').removeAttr('disabled');
		$elem.find('.loc-select-menu').each((index, element) => {
			//console.log("element",element);
			let $element:any = $(element);
			if($element.selectmenu("instance")) {
				$element.selectmenu("enable");
			}
			else {
				$element.removeAttr('disabled');
			}
		});
		$elem.find('.loc-select2-menu').each((index, element) => {
			//console.log("element .loc-select2-menu",element);
			let $element:any = $(element);
			if(!$element.parent().is('.disabled')){
				$element.removeAttr('disabled');
			}
		});
    }

	/*
    * Gray out a disabled location fieldsets
	*/
    private disableLocFieldset($elem:any) {
        $elem.addClass('disabled').removeClass('enabled');
		$elem.find('input[type=text], input[type=checkbox]').attr('disabled','disabled');
		$elem.find('.loc-select-menu').each((index, element) => {
			let $element:any = $(element);
			// console.log($element);
			if($element.selectmenu("instance")) {
				$element.selectmenu("disable");
			}
			else {
				$element.attr('disabled', 'disabled');
			}
		});

		$elem.find('.loc-select2-menu').each((index, element) => {
			let $element:any = $(element);
			$element.attr('disabled', 'disabled');
		});
	}

	/*
	 * Floating Submit Button
	 */
	private floatSubmitButton() {

		const submitBtn = createFragment(`<div id="submit-button-floating" aria-hidden="true">
								  <div class="columns medium-9 small-12">
									<div class="btn-group">
									  <input id="cts-submit-floater" class="submit button" value="${lang.Find_Trials.en}" type="submit" />
									  <div>${lang.CTS_Search_Hint.en}</div>
									</div>
								  </div>
								</div>`);

		appendNodes(submitBtn, document.getElementById('form--cts-advanced'));

		document.getElementById('cts-submit-floater').addEventListener('click',(e) => {
			document.getElementById('form--cts-advanced').setAttribute("data-trigger",'floater');
		})

		// submitBtn.map(btn => container.appendChild(btn));

		const floater = document.getElementById('submit-button-floating');

		const sideEffectsLabel = scrollMonitor.create(document.getElementById('fin-label'));
		const ctsForm = scrollMonitor.create(document.getElementById('cts-advanced'));

        sideEffectsLabel.visibilityChange(function() {
            if(sideEffectsLabel.isAboveViewport || sideEffectsLabel.isInViewport) {
				floater.classList.add('active');
				floater.setAttribute("aria-hidden", "false");
            } else {
				floater.classList.remove('active');
				floater.setAttribute("aria-hidden", "true");
            }
        });

		ctsForm.enterViewport(function(){
            if(sideEffectsLabel.isAboveViewport || sideEffectsLabel.isInViewport) {
				floater.classList.add('active');
				floater.setAttribute("aria-hidden", "false");
            } else {
                floater.classList.remove('active');
				floater.setAttribute("aria-hidden", "true");
            }

        });
        ctsForm.partiallyExitViewport(function(){
            if(sideEffectsLabel.isAboveViewport) {
                floater.classList.add('at-bottom');
				floater.setAttribute("aria-hidden", "true");
            }
        });
        ctsForm.fullyEnterViewport(function() {
            floater.classList.remove('at-bottom');
			floater.setAttribute("aria-hidden", "false");
		});
	}

	private orgVaToggle() {
		const toggleControl = document.getElementById('va') as HTMLInputElement;

		toggleControl.addEventListener('change',(e) => {
			const fields = getNodeArray('#hospital,#nih');
			const all = document.getElementById('all-locations');

			if(toggleControl.checked) {
				fields.map(node => {
					node.setAttribute('disabled','disabled')
					node.nextElementSibling.classList.add('disabled');
					// if this field is selected when it becomes disabled then move selection to 'all-locations'
					if(node.checked) {
						all.dispatchEvent(new MouseEvent('click'));
					}
				});
			} else {
				fields.map(node => {
					node.removeAttribute('disabled')
					node.nextElementSibling.classList.remove('disabled')
				});
			}
			
		});

		// this will run once on page load to set the field state
		toggleControl.dispatchEvent(new Event('change'));
	}

	/**
	 * Custom matcher function - returns only items that begin with the search string
	 * @param params 
	 * @param data 
	 */
	public matchBeginning(params, data) {
		params.term = params.term || '';
		if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {
			return data;
		}
		return false;
	}

}
