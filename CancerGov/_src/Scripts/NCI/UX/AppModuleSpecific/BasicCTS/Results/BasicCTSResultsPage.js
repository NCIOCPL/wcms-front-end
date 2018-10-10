import 'StyleSheets/AppModuleSpecific/cts/index.scss';
import 'StyleSheets/vendor/select2/core.scss';
import Delighters from 'BasicCTSCommon/Enhancements/Delighters';
import Print from 'BasicCTS/Results/Enhancements/Print';
import ctsCommonAnalytics from 'BasicCTSCommon/Enhancements/ctsCommonAnalytics';
import ctsResultsAnalytics from 'BasicCTS/Results/Enhancements/ctsResultsAnalytics';
import criteriaToggle from 'BasicCTS/Results/Enhancements/criteriaToggle';

const onDOMContentLoaded = () => {
	Delighters.init();
	Print.init();
	ctsCommonAnalytics.init();
	ctsResultsAnalytics.init();
	criteriaToggle.init();
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
