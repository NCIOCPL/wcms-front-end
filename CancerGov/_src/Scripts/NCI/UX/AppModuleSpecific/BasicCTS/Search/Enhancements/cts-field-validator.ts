import { NCIBaseEnhancement } from 'UX/core';
import * as NCI from "UX/Common/Enhancements/NCI";
import "../../Common/Plugins/Widgets/jquery.ui.ctsautoselect";
import "../../Search/Plugins/jquery.basicctsformtrack";
import "../../../../../Patches/AdobeAnalytics";

/**
 * Represents a field validation object
 * @export
 * @class CTSFieldValidator
 * @extends {NCIBaseEnhancement}
 *
 * TODO:
 * Add null location field validation
 */
export class CTSFieldValidator extends NCIBaseEnhancement{

	/**
	 * Execute the constructor function on the base enhancement class
	 */
	constructor() {
		super();
	}

	// Member variables for error-able selectors
	protected $zipSelector = $('input#z');
	protected $ageSelector = $('input#a');
	protected $hosSelector = $('input#hos');
	protected $nonEmptySelector = $('input.non-empty');
	protected $searchForm = $('input#rl');
	protected $searchFormName = 'clinicaltrials_basic';

	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	protected initialize():void {

		// Create $init variable to use 'this' within jQuery on events
		let $init = this;

		// Draw or remove error message for zip fields
		this.$zipSelector
			.data('error-message',this.$zipSelector.attr('error-msg'))
			.on('blur.error',function(){
				var $this = $(this);

				//validate zip format

				//If there is a string and it is a zip code, show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
                if (!$init.isNull($this.val()) && $init.validateZip($this.val())) {
                    $init.toggleError(true,$this,null);
                } else {
                    $init.toggleError(false,$this,null);
                }
			})
		;

		// Draw or remove error message for age fields	
		this.$ageSelector
			.data('error-message',this.$ageSelector.attr('error-msg'))
			.on('blur.error',function(){
				var $this = $(this);

				//If there is a string and it is a valid age,
				//show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
				if (!$init.isNull($this.val()) && !$init.validateAge($this.val())) {
					$init.toggleError(false,$this,null);
				} else {
					$init.toggleError(true,$this,null);
				}
			})
		;

		// Draw or remove error message for the hospital field
		this.$hosSelector
			.on('blur.error',function(){
				var $this = $(this);

				$this.data('error-message',$this.attr('error-msg'));

				if ($init.isNull($this.val()) && $init.isParentChecked($this)) {
					$init.toggleError(false,$this,null);
				} else {
					$init.toggleError(true,$this,null);
				}
			})
		;

		/// Commenting this out for now and just doing per-field validation. We can revisit 
		/// the shared nonEmpty attribute later
		// Draw or remove error message for fields that should not be empty 
		// if the parent radio button selected, e.g. hospital or zip code.
		// this.$nonEmptySelector
		// 	//.data('error-message',this.$nonEmptySelector.attr('error-msg'))
		// 	.on('blur.error',function(){
		// 		var $this = $(this);

		// 		$this.data('error-message',$this.attr('error-msg'));

		// 		if ($init.isNull($this.val()) && $init.isParentChecked($this)) {
		// 			$init.toggleError(false,$this,null);
		// 		} else {
		// 			$init.toggleError(true,$this,null);
		// 		}
		// 	})
		// ;

		if(this.$searchForm.val() == 2)
		{
			this.$searchFormName = 'clinicaltrials_advanced';
		}


		// Wire up analytics & prevent submission if we have any active error fields
		(<any>$(".clinical-trials-search-form")).basicctsformtrack({
			formName: this.$searchFormName
		}).submit(function(e) {

			var $this = $(this);

			if(!$this.data('valid')){

				//Fire off analytics for completd event and submit form
				function analyticsAndSubmit() {
					try {
						(<any>$this).basicctsformtrack("completed");
					} catch (e) {
						window.console && console.log(e);
					}
					// clear sessionStorage before going to results page

					sessionStorage.removeItem('totalChecked');
					sessionStorage.removeItem('checkedPages');
					sessionStorage.removeItem('hasSelectAll');

					$this.data('valid', true).submit();
				}

				//VALIDATE FIELDS!!!
				e.preventDefault();

				//trigger input blur event
                $(this).find('fieldset:not(.fieldset-disabled) input[type=text]:visible:enabled').trigger('blur');

				//check for inputs that have errors
				var fieldsAreValid = $(this).find('input.error').length === 0;

				//fields are not required
				//var fieldsAreValid = true;

				if (fieldsAreValid)
				{
					analyticsAndSubmit();
				} else {
					//Log an Analytics message that someone tried to submit the form
					//with active error messages showing.
					(<any>$(this)).basicctsformtrack("errors", [{
						field: 'submit',
						message: 'attempted form submit with errors'
					}]);

					$(this).find('input.error:first').focus();

					return false;
				}

			}

		});

	}

	/**
	 * Verify format of zip code input
     * @param {any} val
	 */
	private validateZip(val){
		// This expression matches three different formats of postal codes: 5 digit US ZIP code, 5 digit US ZIP
		// code + 4, and 6 digit alphanumeric Canadian Postal Code. The first one must be 5 numeric digits. The
		// ZIP+4 must be 5 numeric digits, a hyphen, and then 4 numeric digits. The Canadian postal code must be
		// of the form ANA NAN where A is any uppercase alphabetic character and N is a numeric digit from 0 to 9.
		//^\d{5}-\d{4}|^\d{5}$|[A-Z]\d[A-Z] \d[A-Z]\d$
		//var pattern = /^\d{5}-\d{4}|^\d{5}$|[A-Z]\d[A-Z] \d[A-Z]\d$/;

		// 5 numeric digits
		var pattern = /^\d{5}$/;
		return val.match(pattern)?true:false;
	}

	/**
	 * Validate age input
	 * @param {any} val
	 */
	private validateAge(val){
		// match 1-9 or 10-99 or 100-119
		// numbers only, no dashes or dots allowed
		var pattern = /^[1-9]$|^[1-9][0-9]$|^1[0-1][0-9]|^120$/;
		return val.match(pattern);
	}

	/**
	 * Verify that an input is not null
	 * @param {any} val
	 */
	private isNull(val){
		return val.length === 0;
	}

	/**
	 * Check if the field is within a checked radio input
	 * @param val 
	 */
	private isParentChecked($val) {
		var $checked = $('fieldset.fieldset-enabled'); 
		return $val.closest($checked).length > 0;
	}

	/**
	 * Draw or clear an error message for a form element
	 * @param {any} valid
	 * @param {any} el
	 * @param {any} skipTrue
	 */
	private toggleError(valid,el,skipTrue){

		if(valid && !skipTrue){
			el.removeClass("error");
			el.next('.error-msg').css('visibility','hidden');
		}
		if(!valid){
			el.addClass("error");
            if(el.next().is('.error-msg')){
                el.next().css('visibility','visible');
            } else {
				el.after('<div class="error-msg">' + el.data("error-message") + '</div>');

				//Log Error Message Here.  It would be nice to have an instance of this...
				(<any>$(".clinical-trials-search-form")).basicctsformtrack("errors", [{
					field: el.attr('id'),
					message: el.data("error-message")
				}]);
			}
		}
	}

}
