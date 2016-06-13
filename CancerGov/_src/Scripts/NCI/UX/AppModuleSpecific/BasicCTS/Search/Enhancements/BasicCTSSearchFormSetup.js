define(function(require) {
	var $ = require('jquery');
	require('Common/Plugins/Widgets/jquery.ui.autocompleteselector');
	require('BasicCTSSearch/Plugins/jquery.basicctsformtrack');
	var NCI = require('Common/Enhancements/NCI');


	function _showCancerType() {
		$("#fieldset-type").show()
			.find('input').prop("disabled", false).removeClass("error").prev(".error-msg").hide();
		$("#fieldset-keyword").hide()
			.find('input').prop("disabled", true);
	}

	function _showKeyword() {
		$("#fieldset-type").hide()
			.find('input').prop("disabled", true).removeClass("error").prev(".error-msg").hide();
		$("#fieldset-keyword").show()
			.find('input').prop("disabled", false);
	}

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
		var pattern = /^[1-9]$|^[1-9][0-9]$|^1[0-1][0-9]$/;
		return val.match(pattern);
	}

	function _validateNotNull(val){
		return val.length !== 0;
	}

	function _validateLocked(el){
		if(!el.prop('disabled')) {
			el.val("");
		}
		return el.prop('disabled');
	}

	function _toggleError(valid,el,skipTrue){
		if(valid && !skipTrue){
			el.removeClass("error");
			el.prev('.error-msg').hide();
		}
		if(!valid){
			el.addClass("error");
			if(el.prev('.error-msg')[0]){
				el.prev('.error-msg').show();
			} else {
				el.before('<div class="error-msg">' + el.data("error-message") + '</div>');
			}
		}
	}




	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	function _initialize() {
		//Add click handlers to the toggle
		$('.basiccts-cancertype-toggle').click(function(){_showCancerType(); return false;});
		$('.basiccts-keyword-toggle').click(function(){_showKeyword(); return false;});
		_showCancerType(); //Start by hiding the keyword input.

		$('#ct')
			.autocompleteselector({
				fetchSrc: '/BasicCTS.Service/v1/CancerTypeAutoSuggest',
				queryParam: 'q'
			})
			.data('error-message','Please select a cancer type from the list.')
			.on('blur.null',function(){
				var $this = $(this);
				_toggleError(_validateNotNull($this.val()),$this,true);
				_toggleError(_validateLocked($this),$this,true);
			})
		;

		$("#legend-keyword").next().find('input')
			.prop('placeholder','Enter a keyword')
		;


		$("#legend-zip").next().find('input')
			.data('error-message','Please enter a valid 5 digit ZIP code')
			.on('blur.error',function(){
				var $this = $(this);

				//validate zip format
				_toggleError(_validateZip($this.val()),$this);
			})
		;

		$('#legend-age').next().find('input')
			.data('error-message','Please enter a number between 1 and 120')
			.on('blur.error',function(){
				var $this = $(this);

				//validate age format
				_toggleError(_validateAge($this.val()),$this);
			})
		;

		//Wire Up Web Analytics
		$(".clinical-trials-search-form").basicctsformtrack({
			formName: 'clinicaltrials_basic'
		}).submit(function(e) {
			var $this = $(this);
			if(!$this.data('valid')){
				//VALIDATE FIELDS!!!
				e.preventDefault();

				//trigger input blur event
				//$(this).find('input[type=text]:visible').trigger('blur');

				//check for errors again
				//var fieldsAreValid = $(this).find('input.error').length === 0;

				//fields are not required
				var fieldsAreValid = true;

				if (fieldsAreValid) {

					try {

						$(this).basicctsformtrack("completed");
					} catch (e) {
						console.log(e);
					}
					$(this).data('valid', true).submit();
				} else {
					// IF NOT VALID, call $(this).basicctsformtrack().errorMessages([
					// 	{
					// 		fieldid,
					// 		errormessage
					// 	}
					// ]);
					$(this).find('input.error:first').focus();

					return false;
				}
			}
			// for testing
			// else {
			// 	e.preventDefault();
			// 	console.log("submitting form");
			// 	$(this).data('valid', false);
			// }
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