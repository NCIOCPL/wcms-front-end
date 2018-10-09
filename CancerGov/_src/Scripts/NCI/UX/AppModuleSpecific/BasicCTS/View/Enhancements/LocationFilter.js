import $ from 'jquery';
import 'jquery-ui';

/**
 * Builds a structure for accessing the country and states of the locations.
 * @param  {[type]} $locationsContainer [description]
 * @return {[type]}                     [description]
 */
function _getCountryStates($locationsContainer) {
	var countrystates = [];

	//Fetch 
	$locationsContainer
		.find('div[data-basiccts-countrygroup]')
		.each(function(index, element) {
			var $el = $(element);
			var country = $el.data("basiccts-countrygroup");
			var states = []
			$el.find('div[data-basiccts-psunitgroup]')
				.each(function(stindex, stelement){
					var $stel = $(stelement);
					states.push({
						name: $stel.data("basiccts-psunitgroup"),
						$el: $stel
					})
			});

			countrystates.push({
				name: country,
				states: states,
				$el: $el
			})
		});
	return countrystates;		
}

/**
 * Renders the State Drop Down Selector and wires up the change events
 * @param  {[type]} $locationContainer [description]
 * @return {[type]}                    [description]
 */
function _renderStateSelectors($locationContainer, $selectContainer) {
	var countrystates = $locationContainer.data("basiccts-countrystates");		
	var countryusa = countrystates[0];

	var $stateDropDown = 
		$('<select>', {	id: 'state-selector', class: 'fullwidth'})
		.change(function(){

			var ddvalue = this.value;

			if (ddvalue == 'All') {
				//make sure all are shown
				$.each(countryusa.states, function(index, state) {
					state.$el.show();
				});
			} else {
				$.each(countryusa.states, function(index, state) {
					if (state.name == ddvalue)
						state.$el.show();
					else
						state.$el.hide();
				});						
			}
		});

	$stateDropDown.append(
		$('<option>', {
			text: 'All',
			value: 'All'
		})
	);			

	//Create States Dropdown
	$.each(countrystates[0].states, function(index, state) {
		$stateDropDown.append(
			$('<option>', {
				text: state.name,
				value: state.name
			})
		);
	});

	var $label = $(
		'<label>', 
		{
			'for': 'state-selector',
			text: 'State: '
		}
	);

	var $stateddholder = $('<div class="medium-6 column">');
	$stateddholder.append($label);
	$stateddholder.append($stateDropDown);

	$selectContainer.prepend($stateddholder);
	$locationContainer.data('basiccts-state-selector', $stateddholder); //Add it so we can hide for country dropdown changes to non-usa

	//This must be done AFTER it is added to the main document dom
	$stateDropDown.selectmenu({
		change: function(event, ui) {
			// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
			ui.item.element.change();
		},
		width: $stateDropDown.hasClass('fullwidth') ? '100%' : null
	}).selectmenu('menuWidget').addClass('scrollable-y');

}

/**
 * Renders the Country Selectors and wires up the change events
 * @param  {[type]} $locationContainer [description]
 * @return {[type]}                    [description]
 */
function _renderCountrySelectors($locationContainer, $selectContainer) {
	var countrystates = $locationContainer.data("basiccts-countrystates");		

	var $countryDropDown = 
		$('<select>', {	id: 'country-selector', class: 'fullwidth'})
		.change(function(){

			var ddvalue = this.value;
			var $stateselector = $locationContainer.data('basiccts-state-selector');

			$.each(countrystates, function(index, country) {
				if (ddvalue == country.name) {
					country.$el.show()
				} else {
					country.$el.hide()
				}
			});

			if (ddvalue == 'U.S.A.') {
				if ($stateselector)
					$stateselector.show();
			} else {
				if ($stateselector)
					$stateselector.hide();
			}
		});

	$.each(countrystates, function(index, country) {
		$countryDropDown.append(
			$('<option>', {
				text: country.name,
				value: country.name
			})
		);
	});

	var $label = $(
		'<label>', 
		{
			'for': 'country-selector',
			text: 'Country: '
		}
	);

	var $countryddholder = $('<div class="medium-6 column">');
	$countryddholder.append($label);
	$countryddholder.append($countryDropDown);

	$selectContainer.prepend($countryddholder);
	$locationContainer.data('basiccts-country-selector', $countryddholder); //Add it so we can hide for country dropdown changes to non-usa
	$locationContainer.data('basiccts-country-dropdown', $countryDropDown);

	//This must be done AFTER it is added to the main document dom
	$countryDropDown.selectmenu({
		change: function(event, ui) {
			// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
			ui.item.element.change();
		},
		width: $countryDropDown.hasClass('fullwidth') ? '100%' : null
	}).selectmenu('menuWidget').addClass('scrollable-y');

}

/**
 * Renders the selectors onto the page
 * @param  {[type]} $locationContainer [description]
 * @return {[type]}                    [description]
 */
function _renderSelectors($locationContainer) {

	var countrystates = $locationContainer.data("basiccts-countrystates");
	
	if(countrystates == null) {
		return;
	}

	var hasMultipleCountries = countrystates.length > 1;
	var hasMultipleUSStates = (countrystates.length > 0 && countrystates[0].name == 'U.S.A.' && countrystates[0].states.length > 1);
	
	var addSelectContainer = false;
	var $selectContainer = $('<div class="row location-filter">');

	if (hasMultipleUSStates) {
		_renderStateSelectors($locationContainer, $selectContainer);
		addSelectContainer = true;
	}

	if (hasMultipleCountries || hasMultipleUSStates) {
		_renderCountrySelectors($locationContainer, $selectContainer);
		addSelectContainer = true;

	}
	
	if(addSelectContainer) {
		$locationContainer.prepend($selectContainer);
	}

	//initialize the location display to only the first country visible
	for (var i in countrystates) {
		if (i == 0)
			countrystates[i].$el.show();
		else
			countrystates[i].$el.hide();
	}

}

/**
 * Initialize this enhancement; Assume it is called from dom ready.
 * @return {[type]} Initialize Object
 */
function _initialize() {
	
	//Get the container of the sites.  We will add the filters here
	var $locationsContainer = $("#filterable-trialslist");

	//Extract the Country and State containers
	$locationsContainer.data("basiccts-countrystates", _getCountryStates($locationsContainer));		

	//Build the filters
	_renderSelectors($locationsContainer);

}

let initialized = false;
export default {
	init: function() {
		if (initialized) {
			return;
		}
		
		initialized = true;
		_initialize();
	}
}