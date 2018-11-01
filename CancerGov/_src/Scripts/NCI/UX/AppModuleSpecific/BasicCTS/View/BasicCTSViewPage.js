import LocationFilter from 'BasicCTSView/Enhancements/LocationFilter';
import accordionEnhancements from 'BasicCTSView/Enhancements/accordionEnhancements';
import ctsViewAnalytics from 'BasicCTSView/Enhancements/ctsViewAnalytics';
import Delighters from 'BasicCTSCommon/Enhancements/Delighters';
import ctsCommonAnalytics from 'BasicCTSCommon/Enhancements/ctsCommonAnalytics';
import criteriaToggle from 'BasicCTS/Results/Enhancements/criteriaToggle';
import 'StyleSheets/AppModuleSpecific/cts/index.scss';
import 'StyleSheets/vendor/select2/core.scss';

const onDOMContentLoaded = () => {
	LocationFilter.init();
	accordionEnhancements.init();
	ctsViewAnalytics.init();
	Delighters.init();
	ctsCommonAnalytics.init();
	criteriaToggle.init();

	// print button functionality
	// NOTE: if this functionality needs to be extended further, PLEASE pull out into a new enhancement!
	$(".cts-share a.print").click( function(e) {
		e.preventDefault();
		window.print();
	});
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
