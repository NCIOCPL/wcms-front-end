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
 * Move error messages onto HTML elements to be validated
 * Add null location field validation
 */
export class CTSFieldValidator extends NCIBaseEnhancement{

	/**
	 * Execute the constructor function on the base enhancement class
	 */
	constructor() { 
		super();
	}

	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	protected initialize():void {

		let messages = {
			zipError:'Please enter a valid 5 digit ZIP code.',
			ageError:'Please enter a number between 1 and 120.',
			hospitalError:'"Please select a Hospital/Institution.'
		};
		let $init = this;

		$('input#z')
			.data('error-message',messages.zipError)
			.on('blur.error',function(){
				var $this = $(this);

				//validate zip format

				//If there is a string and it is a zip code, show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
				if ($init.validateNotNull($this.val()) && !$init.validateZip($this.val())) {
					$init.toggleError(false,$this,null);
				} else {
					$init.toggleError(true,$this,null);
				}
			})
		;

		$('input#a')
			.data('error-message',messages.ageError)
			.on('blur.error',function(){
				var $this = $(this);

				//If there is a string and it is a valid age,
				//show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
				if ($init.validateNotNull($this.val()) && !$init.validateAge($this.val())) {
					$init.toggleError(false,$this,null);
				} else {
					$init.toggleError(true,$this,null);
				}
			})
		;

		// Wire up analytics & prevent submission if we have any active error fields
		(<any>$(".clinical-trials-search-form")).basicctsformtrack({
			formName: 'clinicaltrials_advanced'
		}).submit(function(e) {
			
			var $this = $(this);

			if(!$this.data('valid')){

				// 
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
				$(this).find('input[type=text]:visible').trigger('blur');

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
	private validateNotNull(val){
		return val.length !== 0;
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
			el.prev('.error-msg').css('visibility','hidden');
		}
		if(!valid){
			el.addClass("error");
			if(el.prev('.error-msg')[0]){
				el.prev('.error-msg').css('visibility','visible');
			} else {
				el.before('<div class="error-msg">' + el.data("error-message") + '</div>');

				//Log Error Message Here.  It would be nice to have an instance of
				//this...
				(<any>$(".clinical-trials-search-form")).basicctsformtrack("errors", [{
					field: el.attr('id'),
					message: el.data("error-message")
				}]);
			}
		}
	} 

}