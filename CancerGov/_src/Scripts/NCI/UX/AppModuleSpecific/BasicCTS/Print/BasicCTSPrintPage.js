
import printResultsAnalytics from 'UX/AppModuleSpecific/BasicCTS/Print/Enhancements/printResultsAnalytics';
import './BasicCTSPrintPage.scss';

const onDOMContentLoaded = () => {
	printResultsAnalytics.init();
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);