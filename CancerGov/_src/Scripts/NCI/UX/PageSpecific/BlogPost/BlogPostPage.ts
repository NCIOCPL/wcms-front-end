import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'UX/Common/Enhancements/sharecomponent';
import * as NCIAccordion from 'Modules/accordion/accordion';
import * as VideoCarousel from 'UX/Common/Enhancements/video-carousel';
import * as AnalyticsAfter from 'UX/Common/Enhancements/analytics.After';

/**
 * Class representing CancerGov blog post pages.
 * 
 * @export
 * @abstract
 * @class BlogPostPage
 */
class BlogPostPage extends NCIBasePage {
    /**
    * Gets the running CDEConfiguration for this environment.
    * @protected
    * @type {CDEConfiguration}
    */
    protected Config: CDEConfiguration;
	
	/**
	* Creates an instance of BlogPostPage.
	* @param {string} apiHost 
	*/
	constructor() { 
		super();
		let configSvc:CDERuntimeConfig = new CDERuntimeConfig();
		this.Config = configSvc.getConfiguration();
	}
	
	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof BlogPostPage
	 */
	onReady():void {
        (<any>VideoCarousel).apiInit(this.Config.GoogleAPIKey);		
		(<any>AnalyticsAfter).init();

		// Ensure the PageOptionsControl is placed correctly according to page size
		var setPageOptions = function(){
			if ($(window).width() >= 1025){;
				$("#PageOptionsControl1").appendTo("#blogPageOptionsOuterContainer");
			}
			else{
				$("#PageOptionsControl1").appendTo("#blogPageOptionsInnerContainer");
			}
			
		};
		$(window).resize(function(){
			setPageOptions();
		});

		$( document ).ready(function() {
			// Place page options
			setPageOptions();

			// Make accordions work 
			var $target = $("#blog-archive-accordion");
			(<any>NCIAccordion).doAccordion($target, 
				{header: "h3", 
				//Override the beforeActivate just to add Analytics tracking for blog archive accordion
				beforeActivate: function (event, ui) {

							var icons = (<any>$(this)).accordion('option', 'icons');
							// The accordion believes a panel is being opened
							var currHeader;
							if (ui.newHeader[0]) {
								currHeader = ui.newHeader;
								// The accordion believes a panel is being closed
							} else {
								currHeader = ui.oldHeader;
							}
							var currContent = currHeader.next('.ui-accordion-content');
							// Since we've changed the default behavior, this detects the actual status
							var isPanelSelected = currHeader.attr('aria-selected') == 'true';

							// Toggle the panel's header
							currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', (!isPanelSelected).toString()).attr('aria-expanded', (!isPanelSelected).toString());

							// Toggle the panel's icon if the active and inactive icons are different
							if(icons.header !== icons.activeHeader) {
								currHeader.children('.ui-icon').toggleClass(icons.header, isPanelSelected).toggleClass(icons.activeHeader, !isPanelSelected);
							}

							// Toggle the panel's content
							currContent.toggleClass('accordion-content-active', !isPanelSelected);
							if (isPanelSelected) {
								currContent.slideUp(function() {
									$target.trigger('accordionactivate', ui);
								});
							} else {
								currContent.slideDown(function() {
									$target.trigger('accordionactivate', ui);
								});
							}

							return false; // Cancels the default action
						}
			});
			(<any>NCIAccordion).doAccordion($('#blog-archive-accordion-year'), {header: "h4"});

			/*** BEGIN blog comment policy ***/
			(function() {
				if ($('#cgvCommentsSl').length) {
					if( $('.intense-debate-comments').length < 1) {
						$('.blog-comment-policy').show();
					}
				}
			})();
			/*** END blog comment policy ***/

			// This little blurb is searching for the parent accordion elements of the currently selected archive link and expanding the 
			// accordion to that element. This keeps the accordion collapsed on the elements not currently being viewed.
			var selectedArchiveLink = $('#blog-archive-accordion').find("a[href='" + location.pathname + location.search +"']").parent();
			if(selectedArchiveLink.length > 0){
				selectedArchiveLink.addClass("current-archive-link");
				var indexOfLink = selectedArchiveLink.parent().prev().index() / 2;
				(<any>$('#blog-archive-accordion-year')).accordion('option', 'active', indexOfLink);
				(<any>$('#blog-archive-accordion')).accordion('option', 'active', 0);
			}

			$('.right-rail').find("a[href='" + location.pathname + location.search +"']").closest('li').addClass("current-categories-link");
		}); // end document.ready
	}
}

/**
 * Initialize BlogPostPage
 */
(function() { //encapsulation
	let blogPostPage:BlogPostPage = new BlogPostPage();
	blogPostPage.init();
})();