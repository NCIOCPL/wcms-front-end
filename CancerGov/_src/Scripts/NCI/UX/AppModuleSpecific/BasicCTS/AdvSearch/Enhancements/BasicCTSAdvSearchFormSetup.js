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

        // Create jQuery selector vars for
		var $primaryCancer = $('.adv-search #ct-select');
		var $subtypeCancer = $('.adv-search #st-multiselect');
		var $stageCancer = $('.adv-search #stg-multiselect');
		var $findings = $('.adv-search #fin-multiselect');


        // Disable subtype/stage/findings
		$subtypeCancer.select2({
			disabled: true,
			placeholder: 'In development - subtypes cannot be selected'
		})
		$stageCancer.select2({
			disabled: true,
			placeholder: 'In development - stages cannot be selected'
		})
		$findings.select2({
			disabled: true,
			placeholder: 'In development - findings cannot be selected'
		})


		// Disable autosuggest for Hospital/Institution module
		var $hospital = $('.adv-search #hos');
		hAutocomplete($hospital, 'sites.org_name', activeTrialStatuses);

		// Disable autosuggest for Treatment Type/Intervention module
		var $treatmentType = $('.adv-search #ti');
		sAutocomplete($treatmentType, '_interventions.nondrugs', 'i', activeTrialStatuses);

		// Disable autosuggest for Trial Investigators module
		var $trialInvestigators = $('.adv-search #in');
		hAutocomplete($trialInvestigators, 'principal_investigator', activeTrialStatuses);

		// Disable autosuggest for Lead Organization module
		var $leadOrg = $('.adv-search #lo');
		hAutocomplete($leadOrg, 'lead_org', activeTrialStatuses);

        // Select2 for drugs
		var $drugWrap = $('<div class="drug-select-dropdown">');
		$drugWrap.appendTo($('body'));
		var $drugSelect = $("#dr-multiselect");
		$drugSelect.select2({
			dropdownParent: $drugWrap,
            theme: "classic",
            placeholder: 'In development - drug autosuggest turned off'
        });

        // Select2 for other treatment
		var $trtmntWrap = $('<div class="trtmnt-select-dropdown">');
		$trtmntWrap.appendTo($('body'));
		var $trtmntSelect = $("#ti-multiselect");
		$trtmntSelect.select2({
			dropdownParent: $trtmntWrap,
            theme: "classic",
            placeholder: 'In development - treatment autosuggest turned off'
        });

        // Activate / deactivate location fields
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
        // Do nothing
	}
	function hAutocomplete(module, fieldName, trialStatuses){
        // Do nothing
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
