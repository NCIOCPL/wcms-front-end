import $ from 'jquery';
import AdobeAnalytics from 'Patches/AdobeAnalytics';

function _initialize() {
	var pageName = 'www.cancer.gov/';
	var s = AdobeAnalytics.getSObject();
	if(typeof(s) !== 'undefined') {
		pageName = s.pageName;
	}

	/* Snippet to track clicks on accordion controls */
	$('.accordion-controls').on('click.analytics', 'a', function (e) {
		var $this = $(this);
		var id = $this.closest('.accordion-controls').attr('id')
		var action = $this.attr('class');
		NCIAnalytics.AccordionClick($this, id, 'none', 'none', action);
	});

	
	/* Fire off analytics for print share click */
	$('.cts-share a.print').on('click.analytics', function (e) {
		var $this = $(this);
		NCIAnalytics.PrintLink($this)
		NCIAnalytics.SimpleCTSLink($this, 'print', pageName);
	});
	
	/* Fire off analytics for Email share click */
	$('.cts-share a.email').on('click.analytics', function (e) {
		var $this = $(this);
		var $href = $this.attr('href');
		NCIAnalytics.eMailLink($this)
		NCIAnalytics.SimpleCTSLink($this, 'email', pageName);
		// Open email-share popup
		if($href) {
			dynPopWindow($this.attr('href'), 'emailPopUp', 'height=525,width=492'); 
		}
		return false;
	});

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
