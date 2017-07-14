define(function(require) {
	var $ = require('jquery');
	var NCI = require('Common/Enhancements/NCI');
	require('Common/Plugins/Widgets/jquery.ui.autocompleteselector');
	require('Common/Plugins/Widgets/jquery.ui.highlighterautocomplete');
	require('select2/dist/js/select2');
	var menu_path = "/publishedcontent/Files/Configuration/cts_menu";
	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	function _initialize() {
		// Create array of active trial statuses for autosuggest results
		var activeTrialStatuses = [
			'active',
			'approved',
			'enrolling_by_invitation',
			'in_review',
			'temporarily_closed_to_accrual'
		];
		var $primaryCancer = $('.adv-search #ct-select');
		var $subtypeCancer = $('.adv-search #st-multiselect');
		var $stageCancer = $('.adv-search #stg-multiselect');
		var $findings = $('.adv-search #fin-multiselect');
		function populateStage() {
			//Get primaryCancer value & subtypeCancer selected values.
			let primarySelected = $primaryCancer.select2("val"); //Single
			let subTypeSelected = $subtypeCancer.select2("val"); //Array
			var requests = [];
			if (primarySelected) {
				requests.push(getStage(primarySelected));
			}
			if (subTypeSelected.length > 0) {
				subTypeSelected.forEach(function(id) {
					requests.push(getStage(id));
				})
			}
			$.when.apply(undefined, requests).then(function(){
				var stages = [];
				for (var i = 0; i < arguments.length; i++) {
					arguments[i].forEach(function(stg) {
						stages.push(stg);
					});
				}
				$stageCancer.empty();
				$stageCancer.select2({data: stages});
				if(stages.length > 0) {
					$stageCancer.prop("disabled", false);
				} else {
					$stageCancer.prop("disabled", true);
				}
			})
		}
		function populateFindings() {
			//Get primaryCancer value & subtypeCancer selected values.
			let primarySelected = $primaryCancer.select2("val"); //Single
			let subTypeSelected = $subtypeCancer.select2("val"); //Array
			var requests = [];
			if (subTypeSelected.length > 0) {
				subTypeSelected.forEach(function(id) {
					requests.push(getFindings(id));
				})
			} else {
				requests.push(getFindings(primarySelected));
			}
			$.when.apply(undefined, requests).then(function(){
				var findings = [];
				for (var i = 0; i < arguments.length; i++) {
					arguments[i].forEach(function(fin) {
						findings.push(fin);
					});
				}
				$findings.empty();
				$findings.select2({
					data: findings,
					minimumInputLength: 1
				});
				if(findings.length > 0) {
					$findings.prop("disabled", false);
				} else {
					$findings.prop("disabled", true);
				}
			})
		}

		$stageCancer.select2({
			disabled: true,
			placeholder: 'Please select a Cancer type or Sub Type First'
		})
		$findings.select2({
			disabled: true,
			placeholder: 'Please select a Cancer type or Sub Type First'
		})

		$subtypeCancer.select2({
			disabled: true,
			placeholder: 'Please select a Cancer First'
		}).on("select2:select", function(e) {
			//TODO: Handle multiple selections
			populateStage();
			populateFindings();
		}).on("select2:unselect", function(e) {
			populateStage();
			populateFindings();
		});
		getPrimaryCancers().done(function(primaryCancers) {

			$primaryCancer.select2({
            	//theme: "classic",
				//maximumSelectionLength: 1,
            	//placeholder: 'Select your cancer type',
				data: primaryCancers
            }).on("select2:select", function(e) {
				getSubtype(e.target.value)
					.done(function(subtypes) {
						$subtypeCancer.empty();
						$subtypeCancer.select2({
							data: subtypes
						});
						$subtypeCancer.prop("disabled", false);
					});
				/*
				getStage(e.target.value)
					.done(function(stages) {
						$stageCancer.empty();
						$stageCancer.select2({data: stages})
						$stageCancer.prop("disabled", false);
					})
					.fail(function() {
						$stageCancer.empty();
					});
				*/
				populateStage();
				populateFindings();
			}).on("select2:unselect", function(e) {
				$subtypeCancer.select2().val(null).trigger("change");
				$subtypeCancer.prop("disabled", true);
				$stageCancer.select2().val(null).trigger("change");
				$stageCancer.prop("disabled", true);
			});
			//Populate #ct-select
			//countries.forEach(function(item) {
			//	$('#lcnty')
			//		.append($('<option></option>')
			//			.attr('value', item)
			//			.text(item)
			//		);
			//});
		})
		.fail(function() {
			console.log('Error getting primary cancers list');
		});
		// Autosuggest for Hospital/Institution module
		var $hospital = $('.adv-search #hos');
		hAutocomplete($hospital, 'sites.org_name', activeTrialStatuses);
		// Autosuggest for Treatment Type/Intervention module
		var $treatmentType = $('.adv-search #ti');
		sAutocomplete($treatmentType, '_interventions.nondrugs', 'i', activeTrialStatuses);
		// Autosuggest for Drug module
		//var $drug = $('.adv-search #dr');
		//sAutocomplete($drug, '_interventions.drugs', 'd', activeTrialStatuses);
		// Autosuggest for Trial Investigators module
		var $trialInvestigators = $('.adv-search #in');
		hAutocomplete($trialInvestigators, 'principal_investigator', activeTrialStatuses);
		// Autosuggest for Lead Organization module
		var $leadOrg = $('.adv-search #lo');
		hAutocomplete($leadOrg, 'lead_org', activeTrialStatuses);
		// Populate country select element
		getCountries().done(function(countries) {
			countries.forEach(function(item) {
				$('#lcnty')
					.append($('<option></option>')
						.attr('value', item)
						.text(item)
					);
			});
		})
		.fail(function() {
			console.log('Error getting countries list');
		});

		var $trtmntWrap = $('<div class="trtmnt-select-dropdown">');
		$trtmntWrap.appendTo($('body'));
		var $trtmntSelect = $("#ti-multiselect");
		$trtmntSelect.select2({
			dropdownParent: $trtmntWrap,
            theme: "classic",
            placeholder: 'Start typing the treatment/intervention you are looking for',
			//minimumInputLength: 3,
            ajax: {
                url: "https://m-pink-dev.cancer.gov/trial-aggregates",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    var dataQuery = {
                        'agg_field': '_interventions.nondrugs',
                        'agg_term': params.term,
                        'size': 10,
                        'current_trial_status': activeTrialStatuses
                    };
                    return dataQuery;
                },
                processResults: function(data,params){
                    console.log(data);
                    var selectData = data.terms.map(function(val,i){
                        return {id:val.codes, text:val.key, synonyms:val.synonyms, type: val.type}
                    });
                    return {results: selectData}
                }
            },
			minimumInputLength: 3,
			escapeMarkup: function (markup) { return markup; },
			templateResult: function(item) {
				if (item.loading) return item.text;
				var markup = '<div class="trtmnt-item-wrap"><div class="trtmnt-item">';

				//Draw name line
				markup += '<div class="preferred-name">' + item.text;
				if ( item.type == 'agent_category') {
					markup += ' <span class="type">(OTHER TREATMENT)</span> '
				}
				markup += "</div>";
				//End name line

				//Draw synonyms
				if (item.synonyms.length > 0) {
					//same used to retrieve drug synonyms
					var filter_text = $trtmntSelect.data('select2').$container.find("input").val();
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
				}
				//End synonyms
				markup += '</div></div>'
				return markup;
			}
        });
		var $drugWrap = $('<div class="drug-select-dropdown">');
		$drugWrap.appendTo($('body'));
		var $drugSelect = $("#dr-multiselect");
		$drugSelect.select2({
			dropdownParent: $drugWrap,
            theme: "classic",
            placeholder: 'Type the drug you are looking for below',
            ajax: {
                url: "https://m-pink-dev.cancer.gov/trial-aggregates",
                dataType: 'json',
                delay: 350,
                data: function (params) {
                    var dataQuery = {
                        'agg_field': '_interventions.drugs',
                        'agg_term': params.term,
                        'size': 20,
                        'current_trial_status': activeTrialStatuses
                    };
                    return dataQuery;
				},
                processResults: function(data,params){
                    console.log(data);
                    var selectData = data.terms.map(function(val,i){
                        return {
							id:val.codes,
							text:val.key,
							synonyms: val.synonyms,
							type: val.type
						}
                    });
                    return {results: selectData}
                }
            },
			minimumInputLength: 3,
			escapeMarkup: function (markup) { return markup; },
			templateResult: function(item) {
				if (item.loading) return item.text;
				var markup = '<div class="drug-item-wrap"><div class="drug-item">';

				//Draw name line
				markup += '<div class="preferred-name">' + item.text;
				if ( item.type == 'agent_category') {
					markup += ' <span class="type">(DRUG FAMILY)</span> '
				}
				markup += "</div>";
				//End name line

				//Draw synonyms
				if (item.synonyms.length > 0) {
					//This is a bit hacky to get at the words a user is filtering.
					var filter_text = $drugSelect.data('select2').$container.find("input").val();
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
			}/*,
			templateSelection: function(item) {
				console.log(item);
				return item.key;
			}*/
        });
        selectLocFieldset();
    }

    // Enable or disable selection features based on the selected 'Location' radio button.
    function selectLocFieldset() {

        // Gray out unchecked fieldsets on load
        var $checked = $('input[name="loc"]:checked');
        disableLocFieldset($checked.closest('fieldset').siblings());

        // Gray out unchecked fieldsets when a selection is made
        $("input[name='loc']").on("click",function(e){
        	var $this = $(this);
        	var $parent = $this.closest('fieldset');
            enableLocFieldset($parent);
            disableLocFieldset($parent.siblings());
        });
    }
    // Activate the selected fieldset
    function enableLocFieldset($elem) {
        $elem.attr('class','fieldset-enabled');
        $('.fieldset-enabled').find('input[type=text], input[type=checkbox]').removeAttr('disabled');
        $('.fieldset-enabled').find('span[role=combobox]').removeClass('ui-state-disabled');
    }

    // Gray out disabled fieldsets
    function disableLocFieldset($elem) {
        $elem.attr('class','fieldset-disabled');
        $('.fieldset-disabled').find('input[type=text], input[type=checkbox]').attr('disabled','disabled');
        $('.fieldset-disabled').find('span[role=combobox]').addClass('ui-state-disabled');
    }

	function sAutocomplete(module, fieldName, input, trialStatuses) {
		module
		.autocompleteselector({
			fetchSrc: function(term) {
				dataQuery = {
						'agg_field': fieldName,
						'agg_term': term,
						'size': 10,
						'current_trial_status': trialStatuses
				};
				return $.ajax({
					url: 'https://m-pink-dev.cancer.gov/trial-aggregates',
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
							items.result.push({
								term: term.key,
								id: key
							})
						})
					}
					return items;
				})
			},
			inputID: input
		});
	}
	function hAutocomplete(module, fieldName, trialStatuses){
		module
		.highlighterautocomplete({
            fetchSrc: function(term) {
				dataQuery = {
					'agg_field': fieldName,
					'agg_term': term,
					'size': 10,
					'current_trial_status': trialStatuses
				};
				return $.ajax({
					url: 'https://m-pink-dev.cancer.gov/trial-aggregates',
					data: dataQuery,
					dataType: 'json'
				}).pipe(function(res){
					var rtn = res.terms.map(function(item){
						return {'term': item.key};
					});
					return {
						result: rtn
					}
				});
			}
        });
	}
	function getCountries() {
		return $.ajax({
			url: 'https://m-pink-dev.cancer.gov/trial-aggregates',
			data: {'agg_field': "sites.org_country", 'size': 150},
			dataType: 'json',
		}).pipe(function(res){
			return res.terms.map(function(item){
				return item.key;
			})
		});
	}
	function getPrimaryCancers() {
		return $.ajax({
			url: menu_path + "/" + "cancer_root.json",
			dataType: 'json',
		}).pipe(function(res){
			//This should really be res.terms.*
			return res.map(function(item){
				return {id:item.codes,text:item.key}
			})
		});
	}
	function getSubtype(typeID) {
		return $.ajax({
			url: menu_path + "/" + "cancer_" + typeID + ".json",
			dataType: 'json',
		}).pipe(function(res){
			//This should really be res.terms.*
			return res.map(function(item){
				return {id:item.codes,text:item.key}
			})
		});
	}
	function getStage(typeID) {
		return $.ajax({
			url: menu_path + "/" + "stage_" + typeID + ".json",
			dataType: 'json',
		}).then(
			//On success return mapped items
			function(res){
				//This should really be res.terms.*
				return res.map(function(item){
					return {id:item.codes,text:item.key}
				})
			},
			//On Fail return empty array
			function() {
				return [];
			}
		);
	}
	function getFindings(typeID) {
		return $.ajax({
			url: menu_path + "/" + "findings_" + typeID + ".json",
			dataType: 'json',
		}).then(
			//On success return mapped items
			function(res){
				//This should really be res.terms.*
				return res.map(function(item){
					return {id:item.codes,text:item.key}
				})
			},
			//On Fail return empty array
			function() {
				return [];
			}
		);
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
// JavaScript Document
