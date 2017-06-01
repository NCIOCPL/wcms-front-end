define(function(require) {
	var $script = require('scriptjs');
    require('Common/Enhancements/popup_functions');
	//require('scrolltofixed');
	var NCI = require('Common/Enhancements/NCI');
	//var search = require('Modules/search/search.js');
	var exitDisclaimer = require('Common/Enhancements/exitDisclaimer');
	var backToTop = require('Modules/backToTop/backToTop');
	var NCIAccordion = require('Modules/accordion/accordion');
	var tableToggle = require('Modules/tableToggle/tableToggle');
	var flexVideo = require('Modules/videoPlayer/flexVideo');


	//require('Modules/autocomplete/autocomplete');
	require('Common/Plugins/Enlarge');
	require('Plugins/jquery.nci.prevent_enter');
	//require('fork-placeholders.js');


	jQuery(document).ready(function(jQuery) {

		/*** BEGIN dictionary toggle ***/
		(function($) {
			var dictionaryToggle = function() {
				$("#utility-dropdown").slideToggle(0, function () {
					$("#utility-dictionary").toggleClass('active');
				});
			}
		})(jQuery);
		/*** END dictionary togle ***/

		/*** BEGIN back-to-top ***/
		(function() {
			backToTop.init();
		})();
		/*** END back-to-top ***/

		/*** BEGIN mobile nav ("off-canvas flyout functionality") ***/
		(function($) {
			// OCEPROJECT-3098 HACK to fix the Spanish mega menu on the Spanish homepage
			if(/^\/espanol\/?$/.test(location.pathname)) {
				$('#mega-nav .contains-current').removeClass('contains-current');
			}

			NCI.Nav.init();

			NCI.Search.init();
		})(jQuery);
		/*** END mobile nav ***/

		/*** BEGIN Exit Disclaimer
		 * This script looks for URLs where the href points to websites not in the federal domain (.gov) and if it finds one, it appends an image to the link. The image itself links to the exit disclaimer page.
		 ***/
		(function() {
			exitDisclaimer.init();
		})();
		/*** END Exit Disclaimer ***/

		/*** BEGIN Page Options
		 * This functions the font resizer.
		 ***/
		 // MOVED TO NCI.PageOptions.FontResizer.js
		(function($) {
			NCI.PageOptions.init();
		})(jQuery);
		/*** END Page Options **/

		/*** BEGIN table toggling
		 * This allows for toggling between tables.
		 * An example can be seen on grants-research-funding.shtml,
		 * as of the first commit with this code.
		 ***/
		(function($) {
			// for each toggleable section...
			tableToggle.init();
		})(jQuery);
		/*** END table toggling ***/

		/*** BEGIN video embedding
		 * This enables the embedding of YouTube videos and playlists as iframes.
		 ***/
		(function($) {
			flexVideo.init();
		})(jQuery);
		/*** END video embedding ***/

		/*** BEGIN form controls ***/
		(function($) {

			$.ui.selectmenu.prototype._buttonEvents.keydown = function( event ) {
				var preventDefault = true;
				switch ( event.keyCode ) {
					case $.ui.keyCode.TAB:
					case $.ui.keyCode.ESCAPE:
						this.close( event );
						preventDefault = false;
						break;
					case $.ui.keyCode.ENTER:
						if ( this.isOpen ) {
							this._selectFocusedItem( event );
						}
						break;
					case $.ui.keyCode.UP:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "prev", event );
						}
						break;
					case $.ui.keyCode.DOWN:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "next", event );
						}
						break;
					case $.ui.keyCode.SPACE:
						if ( this.isOpen ) {
							this.menu.trigger( event );
						} else {
							this._toggle( event );
						}
						break;
					case $.ui.keyCode.LEFT:
						this._move( "prev", event );
						break;
					case $.ui.keyCode.RIGHT:
						this._move( "next", event );
						break;
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.PAGE_UP:
						this._move( "first", event );
						break;
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_DOWN:
						this._move( "last", event );
						break;
					default:
						this.menu.trigger( event );
						preventDefault = false;
				}

				if ( preventDefault ) {
					event.preventDefault();
				}
			};
			$.ui.menu.prototype._keydown = function( event ) {
				var match, prev, character, skip,
					preventDefault = true;

				switch ( event.keyCode ) {
					case $.ui.keyCode.PAGE_UP:
						this.previousPage( event );
						break;
					case $.ui.keyCode.PAGE_DOWN:
						this.nextPage( event );
						break;
					case $.ui.keyCode.HOME:
						this._move( "first", "first", event );
						break;
					case $.ui.keyCode.END:
						this._move( "last", "last", event );
						break;
					case $.ui.keyCode.UP:
						this.previous( event );
						break;
					case $.ui.keyCode.DOWN:
						this.next( event );
						break;
					case $.ui.keyCode.LEFT:
						this.collapse( event );
						break;
					case $.ui.keyCode.RIGHT:
						if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
							this.expand( event );
						}
						break;
					case $.ui.keyCode.ESCAPE:
						this.collapse( event );
						break;
					case $.ui.keyCode.ENTER:
						this._activate( event );
						break;
					default:
						preventDefault = false;
						prev = this.previousFilter || "";
						character = String.fromCharCode( event.keyCode );
						skip = false;

						clearTimeout( this.filterTimer );

						if ( character === prev ) {
							skip = true;
						} else {
							character = prev + character;
						}

						match = this._filterMenuItems( character );
						match = skip && match.index( this.active.next() ) !== -1 ?
							this.active.nextAll( ".ui-menu-item" ) :
							match;

						// If no matches on the current filter, reset to the last character pressed
						// to move down the menu to the first item that starts with that character
						if ( !match.length ) {
							character = String.fromCharCode( event.keyCode );
							match = this._filterMenuItems( character );
						}

						if ( match.length ) {
							this.focus( event, match );
							this.previousFilter = character;
							this.filterTimer = this._delay(function() {
								delete this.previousFilter;
							}, 1000 );
						} else {
							delete this.previousFilter;
						}
				}

				if ( preventDefault ) {
					event.preventDefault();
				}
			};
			$.ui.selectmenu.prototype._setAria = function( item ) {
				var id = this.menuItems.eq( item.index ).attr( "id" );

				this.button.attr( {
					"aria-activedescendant": id
				} );
				this.menu.attr( "aria-activedescendant", id );
			};
			$('select:not([multiple])').each(function() {
				var $this = $(this);

				$this.selectmenu({
					change: function(event, ui) {
						// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
						ui.item.element.change();
					},
					width: $this.hasClass('fullwidth') ? '100%' : null
				}).selectmenu('menuWidget').addClass('scrollable-y');
			});
		})(jQuery);
		/*** END form controls ***/

		/*** BEGIN accordionizer ***/
		(function($) {
			NCIAccordion.makeAllAccordions();
		})(jQuery);
		/*** END accordionizer ***/

		/*** BEGIN page outlining ***/
		(function($) {
			// generate the page outline -- this is used for all page-/document-level navigation
			// set up outlines
			$('article').each(function() {
				var $this = $(this);

				// check if there already is a built outline for this article
				if ($this.data('nci-outline')) {
					return;
				}

				// otherwise, build and set the outline
				var outline = NCI.page.makeOutline(this);
				$this.data('nci-outline', outline);
			});

			if ($('article').length > 0) {
				NCI.buildOTP();
			}
		})(jQuery);
		/*** END page outlining ***/

		/*** BEGIN blog comment policy ***/
		(function($) {
			if ($('#cgvCommentsSl').length) {
				if( $('.intense-debate-comments').length < 1) {
					$('.blog-comment-policy').show();
				}
			}
		})(jQuery);
		/*** END blog comment policy ***/

		/*** BEGIN HACK for Blog Series titles
		* TODO: remove when Blog Dynamic List Percussion template is updated
		* with class name for <h3> ***/
		(function($) {
			$('div.blog-post').each(function () {
				if ($(this).find('a.comment-count').length < 1) {
					($(this).find('div.post-title h3').addClass('no-comments'))
				}
			});
		})(jQuery);
		/*** END HACK for Blog Series titles ***/

		// For the new reference tool tip handling uncomment the following:
		//require("Common/Enhancements/NCI.ReferenceToolTip").init();

		//Then uncomment the reference tooltips function below:
		// reference tooltips
		(function ($) {
			var timerLength = 1000;

			$('a[href^="#cit"], a[href^="#r"]')
				.filter(function () {
					// filter to verify ONLY citations are selected, otherwise this will match things like a[href="references"]
					return /^#r\d+$|^#cit\/section_\d+.\d+$/.test(this.getAttribute('href'));
				})
				.each(function () {
					var tooltipNode, hideTimer, showTimer, checkFlip = false;

					function findRef(h) {
						h = document.getElementById(
							h.getAttribute('href')
							.replace(/^#cit\//, '#')
							.replace(/^#/, '')
						);
						h = h && h.nodeName == "LI" && h;

						return h;
					}

					function hide(refLink) {
						if (tooltipNode && tooltipNode.parentNode == document.body) {
							hideTimer = setTimeout(function () {
								$(tooltipNode).animate({
									opacity: 0
								}, 100, function () {
									document.body.removeChild(tooltipNode);
								});
							}, 100);
						}
						//$(findRef(refLink)).removeClass('RTTarget');
					}

					function show() {
						if (!tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11) {
							document.body.appendChild(tooltipNode);
							checkFlip = true;
						}
						$(tooltipNode).stop().animate({
							opacity: 1
						}, 100);
						clearTimeout(hideTimer);
					}

					$(this).on('mouseenter.NCI.tooltip', function (e) {
						var that = this;

						hideTimer && clearTimeout(hideTimer);
						showTimer && clearTimeout(showTimer);

						showTimer = setTimeout(hoverHandler, timerLength);

						function hoverHandler() {
							var h = findRef(that);
							if (!h) {
								return;
							}

							// Don't show on smartphone
							var width = window.innerWidth || $(window).width();
							if (width <= NCI.Breakpoints.medium) {
								return;
							}

							/*if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + $(window).height() > $(h).offset().top + h.offsetHeight) {
								$(h).addClass('RTTarget');
								//return;
							}*/

							if (!tooltipNode) {
								tooltipNode = document.createElement('ul');
								tooltipNode.className = "referencetooltip";
								var c = tooltipNode.appendChild(h.cloneNode(true));
								tooltipNode.appendChild(document.createElement('li'));
								$(tooltipNode).on('mouseenter.NCI.tooltip', show).on('mouseleave.NCI.tooltip', hide);
							}
							show();
							var offset = $(that).offset(),
								offsetHeight = tooltipNode.offsetHeight;
							$(tooltipNode).css({
								top: offset.top - offsetHeight,
								left: offset.left - 7
							});
							if (tooltipNode.offsetHeight > offsetHeight) { // is it squished against the right side of the page?
								$(tooltipNode).css({
									left: 'auto',
									right: 0
								});
								tooltipNode.lastChild.style.marginLeft = (offset.left - tooltipNode.offsetLeft) + "px";
							}
							if (checkFlip) {
								if (offset.top < tooltipNode.offsetHeight + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + $(".fixedtotop").outerHeight()) { // is part of it above the top of the screen?
									$(tooltipNode).addClass("RTflipped").css({
										top: offset.top + 12
									});
								} else if (tooltipNode.className === "referencetooltip RTflipped") { // cancel previous
									$(tooltipNode).removeClass("RTflipped");
								}
								checkFlip = false;
							}
						}
					}).on('mouseleave.NCI.tooltip', function () {
						clearTimeout(showTimer);
						hide(this);
					}).on('click.NCI.tooltip', function () {
						var $this = $(this);
						$this.closest('figure.table.ui-dialog-content').dialog('close');
						$this.trigger('mouseleave.NCI.tooltip');
					});
				});
		})(jQuery);
		//END REFERENCE TOOL TIPS

		// initialize the prevent-enter enhancement
		(function ($) {
			$('[data-prevent-enter="true"]').NCI_prevent_enter();
		})(jQuery);


		// Proactive Live Help for CTS
		var ProactiveLiveHelp = require("Modules/proactiveLiveHelp/proactiveLiveHelp");

		var ProactiveLiveHelpforCTS = new ProactiveLiveHelp();
		var ProactiveLiveHelpforColorectal = new ProactiveLiveHelp();

		//console.log(ProactiveLiveHelp);

		ProactiveLiveHelpforCTS.initialize({
			urls: [
				"/about-cancer/treatment/clinical-trials/search",
				"/about-cancer/treatment/clinical-trials/basic",
				"/about-cancer/treatment/clinical-trials/search/r",
				"/about-cancer/treatment/clinical-trials/search/v",
				"/about-cancer/treatment/clinical-trials/advanced-search",
				"/about-cancer/treatment/clinical-trials/search/results",
				"/about-cancer/treatment/clinical-trials/search/view"
			],
			popupID: 'ProactiveLiveHelpForCTSPrompt',
			popupTitle: "Questions about Clinical Trials?",
			optOutDurationDays: 30,
			popupDelaySeconds: 90
		});
		// END Clinical Trial Search Setup

		// Proactive Live Help for Colo-rectal Cancer Type Pages
		ProactiveLiveHelpforColorectal.initialize({
			urls: [
				'/types/colorectal',
				'/types/colorectal/patient/colon-treatment-pdq',
				'/types/colorectal/patient/rectal-treatment-pdq',
				'/types/colorectal/patient/colorectal-prevention-pdq',
				'/types/colorectal/patient/colorectal-screening-pdq',
				'/types/colorectal/hp',
				'/types/colorectal/hp/colon-treatment-pdq',
				'/types/colorectal/hp/rectal-treatment-pdq',
				'/types/colorectal/hp/colorectal-prevention-pdq',
				'/types/colorectal/hp/colorectal-genetics-pdq',
				'/types/colorectal/hp/colorectal-screening-pdq',
				'/types/colorectal/research',
				'/types/colorectal/screening-fact-sheet',
				'/types/colorectal/did-you-know-colorectal-cancer-screening-video',
				'/types/colorectal/research/cetuximab-chemo-no-benefit',
				'/types/colorectal/research/colonoscopy-reduces-deaths',
				'/types/colorectal/research/eflornithine-sulindac',
				'/types/colorectal/research/folfox-celecoxib',
				'/types/colorectal/research/preop-treatment',
				'/types/colorectal/research/screening-sigmoidoscopy',
				'/types/colorectal/research/aspirin-reduces-risk',
				'/types/colorectal/research/TAS-102-overall-survival',
				'/types/colorectal/research/bevacizumab-severe-side-effects',
				'/types/colorectal/research/virtual-colonoscopy-results-qa',
				'/types/colorectal/research/polyp-fiber-prevention-qa',
				'/about-cancer/treatment/drugs/colorectal'
			],
			popupID: 'PLH-colorectal',
			popupTitle: 'Questions about Colorectal Cancer?',
			optOutDurationDays: 14,
			popupDelaySeconds: 30,
            start:'03/01/2017',
			endDate:'04/01/2017'
		});


		// Blue Ribbon Panel - Page Specific
		require("Common/Enhancements/NCI.Video").init();


	});

	// BEGIN Table Resizing
	jQuery(window).on('load', function () {
		//Table enlarging & scrollbar adding.
		//This marks all tables as scrollable, but only adds a shadow to the right side if it is scrolling.
		//Inspired by http://www.456bereastreet.com/archive/201309/responsive_scrollable_tables/
		(function ($) {
			$("#content table").overflowEnlarge();
		})(jQuery);
	});
	// END Table Resizing

	// BEGIN Spanish Analytics tracking
	$('html[lang="es"]').find('a.news-govdelivery, a.blogRSS').on('click', function() {
	    s.linkTrackVars = 'prop4,prop5';
	    s.prop4 = 'GovDeliveryEsp';
	    s.prop5 = 'www.cancer.gov' + location.pathname.toLowerCase();
	    s.tl(this, 'o', 'GovDeliveryEsp');
	});
	// END Spanish Analytics Tracking
});
