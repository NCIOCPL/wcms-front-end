import ctsCommonAnalytics from 'BasicCTSCommon/Enhancements/ctsCommonAnalytics';
import ctListingAnalytics from 'BasicCTS/Listing/Enhancements/ctListingAnalytics';

const onDOMContentLoaded = () => {
	ctsCommonAnalytics.init();
	ctListingAnalytics.init();
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);