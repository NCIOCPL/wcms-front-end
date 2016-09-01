define(function(require) {

	var config = require('generated/configuration');

	var $ = require('jquery');
	require('Common/Plugins/Widgets/jquery.ui.autocompleteselector');
	require('BasicCTSSearch/Plugins/jquery.basicctsformtrack');
	var NCI = require('Common/Enhancements/NCI');
	var AdobeAnalytics = require('Patches/AdobeAnalytics');

	//Move this to a utility file.
	/**
	 * Calculates the Levenshtein distance between two words
	 * https://en.wikipedia.org/wiki/Levenshtein_distance
	 */
	String.prototype.levenshtein = function(string) {
		var a = this, b = string + "", m = [], i, j, min = Math.min;

		if (!(a && b)) return (b || a).length;

		for (i = 0; i <= b.length; m[i] = [i++]);
		for (j = 0; j <= a.length; m[0][j] = j++);

		for (i = 1; i <= b.length; i++) {
			for (j = 1; j <= a.length; j++) {
				m[i][j] = b.charAt(i - 1) == a.charAt(j - 1)
					? m[i - 1][j - 1]
					: m[i][j] = min(
						m[i - 1][j - 1] + 1, 
						min(m[i][j - 1] + 1, m[i - 1 ][j] + 1))
			}
		}

		return m[b.length][a.length];
	}


	var messages = {
		ctError:'Please select a cancer type from the list.',
		zipError:'Please enter a valid 5 digit ZIP code',
		ageError:'Please enter a number between 1 and 120'
	};

	var APISERVER = config.clinicaltrialsearch.apiServer + ':' + config.clinicaltrialsearch.apiPort + '/' + config.clinicaltrialsearch.apiBasePath;

	function _getAPIURL() {
		return 'https://' + APISERVER + '/terms';
	}

	function _showCancerType() {
		$("#fieldset-type").show()
			.find('input').val('').prop("disabled", false).removeClass("error").focus()
			.prev(".error-msg").css('visibility','hidden');
		$("#fieldset-keyword").hide()
			.find('input').val('').prop("disabled", true);
	}

	function _showKeyword() {
		$("#fieldset-type").hide()
			.find('input').val('').prop("disabled", true).removeClass("error")
			.prev(".error-msg").css('visibility','hidden');
		$("#fieldset-keyword").show()
			.find('input').val('').prop("disabled", false).focus();
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
	// to reset the search form on browser back
	$(document).ready(function($){	
		$('form').each(function() {
			this.reset();
		});
	});	

	/**
	 * Tracks the analytics for the Cancer Type/Keyword toggle
	 * @param  {[type]} sender   The element that raised the event
	 * @param  {[type]} proptext The text to track (clinicaltrial_search_by_keyword or clinicaltrial_search_by_cancer_type)
	 */
	function _trackTypePhraseToggleAnalytics(sender, proptext) {
		var pageName = sender.ownerDocument.location.hostname + sender.ownerDocument.location.pathname;
		var s = AdobeAnalytics.getSObject();

		clickParams = new NCIAnalytics.ClickParams(sender, 'nciglobal', 'o', 'TypeKeywordToggle');

		clickParams.Props = {
				5: proptext + "|" + s.pageName
		};
		clickParams.LogToOmniture();
	}

	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	function _initialize() {

		//Add click handlers to the toggle
		$('.basiccts-cancertype-toggle').click(function(){
			_showCancerType();
			_trackTypePhraseToggleAnalytics(this, "clinicaltrial_search_by_cancer_type");

			return false;
		});

		$('.basiccts-keyword-toggle').click(function(){
			_showKeyword();
			_trackTypePhraseToggleAnalytics(this, "clinicaltrial_search_by_keyword");
			return false;
		});

		_showCancerType(); //Start by hiding the keyword input.

		$('#ct')
			.autocompleteselector({
				fetchSrc: '/BasicCTS.Service/v1/CancerTypeAutoSuggest',
				queryParam: 'q'
			})
			.data('error-message',messages.ctError)
			.on('blur.null',function(){
				var $this = $(this);

				//If there is a string and we have not picked a cancer type,
				//show the error.
				//We must ensure that we only toggle the error if there IS
				//an error for analytics purposes.
				if (_validateNotNull($this.val()) && !_validateLocked($this)) {
					_toggleError(false,$this);
					//clear value if invalid - must select from list
					//$this.val('');
				} else {
					_toggleError(true,$this);
				}
			})
		;
		
		$('.basic-cts-v2 #q')
			.autocompleteselector({
				fetchSrc: function(term) {
					//https://clinicaltrialsapi.cancer.gov/terms?term=breast&term_type=_diseases&size=10
					dataQuery = {
							'term': term,
							'term_type': '_diseases',
							'size': 10
					};

					return $.ajax({
						//url: 'nci-ocdev09-v.nci.nih.gov:3000/terms',
						url: _getAPIURL(),
						data: dataQuery,
						dataType: 'json'
					}).pipe(function(res){
						var items = {
							result: []
						};

						if (res.terms) {
							res.terms.forEach(function(term) {
								//A term from the API can have multiple keys
								var key = term.codes.join(",");
								key += "|" + term.term_key;
								items.result.push({
									term: term.term,
									id: key
								})
							})
						}
						return items;
					})
				}
			})
		;

		$("#legend-zip").next().find('input')
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

		$('#legend-age').next().find('input')
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

		//Wire Up Web Analytics
		$(".clinical-trials-search-form").basicctsformtrack({
			formName: 'clinicaltrials_basic'
		}).submit(function(e) {
			
			var $this = $(this);

			if(!$this.data('valid')){

				function analyticsAndSubmit(hasKeywordMatch) {
					try {
						$this.basicctsformtrack("completed", hasKeywordMatch);
					} catch (e) {
						window.console && console.log(e);
					}
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

				if (fieldsAreValid) {

					//if fields are valid, then let's see if they selected
					//an exact autosuggestion item.

					var $queryField = $('.basic-cts-v2 #q');
					var $hasKeywordMatch = false;
					
					if ($queryField && ($queryField.length > 0) && !$queryField.prop("disabled")) {
				
						var searchTerm = $queryField.val();

                        dataQuery = {
                                'term': searchTerm,
                                'term_type': '_diseases',
                                'size': 10
                        };

						//Lookup term, then 
                        $.ajax({
                            //url: 'nci-ocdev09-v.nci.nih.gov:3000/terms',
                            url: _getAPIURL(), 
                            data: dataQuery,
                            dataType: 'json'
                        }).done(function(res){

							if (res.terms && res.terms.length > 0) {
								var term = res.terms[0];

								//If the distance between the two terms is 0,
								//then the user probably wanted to select that
								//term and hit enter instead.
								var st = searchTerm.toLowerCase();
								var tt = term.term.toLowerCase();

								if (st.levenshtein(tt) == 0) {
									var key = term.codes.join(",");
										key += "|" + term.term_key;
									//if it matches, then set the autosuggest
									$queryField.autocompleteselector("setSelection", key);
									//Set $hasKeywordMatch flag to true in order to track term instead of keyword
									$hasKeywordMatch = true;
								}
							}

							analyticsAndSubmit($hasKeywordMatch);
						});
					} else {
						analyticsAndSubmit($hasKeywordMatch);
					}


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
