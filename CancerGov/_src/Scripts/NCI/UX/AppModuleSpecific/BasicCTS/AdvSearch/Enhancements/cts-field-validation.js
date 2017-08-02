/*
* TODO:
* Convert to .ts
* Move error messages onto HTML elements to be validated
* 
*/

define(function(require) {

	var config = require('Generated/configuration');

	var $ = require('jquery');
	require('Common/Plugins/Widgets/jquery.ui.autocompleteselector');
	require('BasicCTSSearch/Plugins/jquery.basicctsformtrack');
	var NCI = require('Common/Enhancements/NCI');
	var AdobeAnalytics = require('Patches/AdobeAnalytics');


	var messages = {
		zipError:'Please enter a valid 5 digit ZIP code.',
		ageError:'Please enter a number between 1 and 120.',
		hospitalError:'"Please select a Hospital/Institution.'
	};


	function _validateZip(val){
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

	function _validateAge(val){
		// match 1-9 or 10-99 or 100-119
		// numbers only, no dashes or dots allowed
		var pattern = /^[1-9]$|^[1-9][0-9]$|^1[0-1][0-9]|^120$/;
		return val.match(pattern);
	}

	function _validateNotNull(val){
		return val.length !== 0;
	}

	function _validateLocked(el){
		if(!el.prop('disabled')) {
			//el.val("");
		}
		return el.prop('disabled');
	}

	function _toggleError(valid,el,skipTrue){

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
				$(".clinical-trials-search-form").basicctsformtrack("errors", [{
					field: el.attr('id'),
					message: el.data("error-message")
				}]);
			}
		}
	} 



	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	function _initialize() {

		$('input#z')
			.data('error-message',messages.zipError)
			.on('blur.error',function(){
				var $this = $(this);

				//validate zip format

				//If there is a string and it is a zip code, show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
				if (_validateNotNull($this.val()) && !_validateZip($this.val())) {
					_toggleError(false,$this);
				} else {
					_toggleError(true,$this);
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
				if (_validateNotNull($this.val()) && !_validateAge($this.val())) {
					_toggleError(false,$this);
				} else {
					_toggleError(true,$this);
				}
			})
		;

		// Wire up analytics & prevent submission if we have any active error fields
		$(".clinical-trials-search-form").basicctsformtrack({
			formName: 'clinicaltrials_advanced'
		}).submit(function(e) {
			
			var $this = $(this);

			if(!$this.data('valid')){

				// 
				function analyticsAndSubmit() {
					try {
						$this.basicctsformtrack("completed");
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
					$(this).basicctsformtrack("errors", [{
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
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();

			initialized = true;
		}
	};

});
