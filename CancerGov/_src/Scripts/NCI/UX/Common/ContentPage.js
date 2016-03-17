define(function(require) {
	require('routie');
	require('Common/Enhancements/popup_functions');
	var jQuery = require('jquery');
	require('jquery/jplayer');
	require('Common/Enhancements/analytics');
	require('jquery/scrolltofixed');
	var NCI = require('Common/Enhancements/NCI');
	require('Common/Plugins/Enlarge');
	require('jquery/megamenu');
	require('placeholders');

	jQuery(document).ready(function(jQuery) {
		/*** BEGIN scrollToFixed init ***/
		(function($) {
			var headerHeight = $('.fixedtotop').outerHeight();
			$('.fixedtotop').scrollToFixed({
				spacerClass: 'fixedtotop-spacer',
				fixed: function() {
					$('.fixedtotop-spacer').height(headerHeight);
				}
			});
		})(jQuery);
		/*** END scrollToFixed init ***/

		/*** BEGIN Mega Menu init
		 *** (initialize a selector as an accessibleMegaMenu)
		 ***/
		(function($) {

			Modernizr.addTest('windows', navigator.platform.indexOf("Win")!=-1);
			Modernizr.addTest('mac', navigator.platform.indexOf("Mac")!=-1);
			Modernizr.addTest('linux', navigator.platform.indexOf("Linux")!=-1);
			Modernizr.addTest('iphone', navigator.platform.indexOf("iPhone")!=-1);
			Modernizr.addTest('ipad', navigator.platform.indexOf("iPad")!=-1);
			Modernizr.addTest('android', navigator.platform.indexOf("Android")!=-1);

			$("#mega-nav").accessibleMegaMenu({
				/* prefix for generated unique id attributes, which are
				 * required to indicate aria-owns, aria-controls and aria-labelledby
				 */
				uuidPrefix: "accessible-megamenu",

				/* css class used to define the megamenu styling */
				menuClass: "nav-menu",

				/* css class for a top-level navigation item in the megamenu */
				topNavItemClass: "nav-item",

				/* css class for a megamenu panel */
				panelClass: "sub-nav-mega",

				/* css class for a group of items within a megamenu panel */
				panelGroupClass: "sub-nav-group",

				/* css class for the hover state */
				hoverClass: "hover",

				/* css class for the focus state */
				focusClass: "focus",

				/* css class for the open state */
				openClass: "open"
			});
			$("#mega-nav .sub-nav-group-wrapper").bind("mouseleave",function(e){
				if($(e.relatedTarget).is('.sub-nav-mega')){
					$(this).closest(".nav-menu").trigger("mouseout");
				}
			}).each(function(){
				var $this = $(this);
				if ($this.outerHeight() > 300) {
					$this.parent().addClass("mega-menu-scroll");
				}
			});

			//megamenu animations for IE9 which does not support CSS3 transitions
			if($('html').is(".no-csstransitions")) {
				//capture initial menu height, save it as a data attribute, then set height to 0
				$("#mega-nav .sub-nav-mega").each(function () {
					var subNav = $(this);
					subNav.data("initHeight", subNav[0].scrollHeight).height(0);
				});

				$("#mega-nav").on("mouseenter", "li.nav-item", function () {
					var subNav = $(this).find(".sub-nav-mega");
					var height = subNav.data("initHeight");
					subNav.stop(true, true).delay(500).animate({opacity: 1, height: height}, 500);

				}).on("mouseleave", "li.nav-item", function () {
					var subNav = $(this).find(".sub-nav-mega");
					subNav.stop(true, true).delay(100).animate({opacity: 0, height: 0}, 250);
				});
			}



			/* Note: this causes menu to overflow on large screens since mega menu is confined to a max-height of 300px; scroll should always be auto
			// Determine the height of the viewport on page load and whenever the viewport changes sizes.
			// If the viewport is under a certain height, add a class to the mega menu (to limit its height).
			var viewportHeight = function() {
				// Get the height of the viewport
				var height = $(window).height();

				// add class to mega menu if less than specified height.
				if (height < 800) {
					$('.sub-nav-mega').addClass("mega-menu-scroll");
				}
				// otherwise remove the class
				else {
					$('.sub-nav-mega').removeClass("mega-menu-scroll");
				}
			};

			// page load
			$(document).ready(viewportHeight);
			// viewport size changes
			$(window).resize(viewportHeight);
*/
		})(jQuery);
		/*** END Mega Menu init ***/

		/*** BEGIN Mega Menu empty class creation
		 *** create a class for mega menu items that have no actual content, so we can unformat them  ***/
		jQuery(document).ready(function(jQuery) {
			$(".sub-nav-mega").each(function(){
				if (!$(this).text().trim().length) {
					$(this).addClass("empty-mega");
				}
			})
		});
		/*** END Mega Menu empty class creation

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
		(function($) {
			// set the pixel value (from the top of the page) of where the arrow should begin to appear
			var offset = 600;
			// set the duration of the fade in effect of the back to top arrow and text
			var duration = 500;
			jQuery(window).scroll(function () {
				if (jQuery(this).scrollTop() > offset) {
					jQuery('.back-to-top').fadeIn(duration);
				} else {
					jQuery('.back-to-top').fadeOut(duration);
				}
			});

			$('.back-to-top').click(function (e) {
				e.preventDefault();
				// freeze Headroom
				$('.headroom-area').addClass('frozen');
				// animate to top
				$('html, body').animate({
					scrollTop: 0
				}, 400, function () {
					// animation complete; unfreeze Headroom
					$('.headroom-area').removeClass('frozen');
				});
			});
		})(jQuery);
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

		/*** BEGIN Headroom initializer
		 * (use this if we do the scroll off/on for the blue bar)
		 ***/
		(function($) {
			require('jquery/headroom');

			$('.headroom-area').headroom({
				offset: 205,
				classes: {
					initial: "slide",
					pinned: "slide--reset",
					unpinned: "slide--up"
				}
			});
		})(jQuery);
		/*** END Headroom initializer ***/

		/*** BEGIN deeplinking fix
		 * This script fixes the scroll position for deeplinking.
		 ***/
		(function($) {
			var BrowserDetect = {
				init: function () {
					this.browser = this.searchString(this.dataBrowser) || "Other";
					this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
				},
				searchString: function (data) {
					for (var i = 0; i < data.length; i++) {
						var dataString = data[i].string;
						this.versionSearchString = data[i].subString;

						if (dataString.indexOf(data[i].subString) !== -1) {
							return data[i].identity;
						}
					}
				},
				searchVersion: function (dataString) {
					var index = dataString.indexOf(this.versionSearchString);
					if (index === -1) {
						return;
					}

					var rv = dataString.indexOf("rv:");
					if (this.versionSearchString === "Trident" && rv !== -1) {
						return parseFloat(dataString.substring(rv + 3));
					} else {
						return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
					}
				},

				dataBrowser: [
					{string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
					{string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
					{string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
					{string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
					{string: navigator.userAgent, subString: "Opera", identity: "Opera"},
					{string: navigator.userAgent, subString: "OPR", identity: "Opera"},
					{string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
					{string: navigator.userAgent, subString: "Safari", identity: "Safari"}
				]
			};

			BrowserDetect.init();
			//console.log("You are using: " + BrowserDetect.browser + " with version: " + BrowserDetect.version);

			var doScroll = function(event) {
				if(location.hash !== '') {
					NCI.scrollTo(location.hash, event.type);
				}
				//else if ($(".summary-sections .ui-accordion")[0]){
				//	window.scrollTo(0, 0);
				//}
			};

			$(window).on('load hashchange', function(event) {

				// IE has the issue where anchor links and previous scroll states are not scrolled to until after the load event has completed
				// the doScroll method needs to be delayed until after the initial page scroll event so that the scrollTop position can be calculated properly within doScroll
				// also, the initial page scroll (downward) causes headroom to collapse down to it's smallest state so we want to freeze it before the initial scroll
				if(BrowserDetect.browser == "Explorer" && event.type === "load"){
					$('.headroom-area').addClass('frozen');
					$(window).on("scroll.pageLoad",function(e){
						//console.log("page scrolled!");
						$('.headroom-area').removeClass('frozen');
						doScroll(e);
						$(window).off("scroll.pageLoad");
					});
				} else {
					doScroll(event);
				}
			});


			//redundant check to see if anchor is same as current hash
			//if it is the same then trigger doScroll since a hashchange will not be triggered
			$("a[href*=#]").click(function(e) {
				var anchor = this.attributes.href.value;
				if(anchor === location.hash){
					doScroll(e);
				}
			});

		})(jQuery);
		/*** END deeplinking fix ***/

		/*** BEGIN Exit Disclaimer
		 * This script looks for URLs where the href points to websites not in the federal domain (.gov) and if it finds one, it appends an image to the link. The image itself links to the exit disclaimer page.
		 ***/
		(function($) {
			var lang = $('html').attr('lang') || 'en',
				path,
				altText;

			switch(lang) {
				case 'es':
					path = $('meta[name="espanol-linking-policy"]').prop('content');
					altText ='Notificaci\u00F3n de salida';
					break;
				default:
					path = $('meta[name="english-linking-policy"]').prop('content');
					altText ='Exit Disclaimer';
					break;
			}
			$("a[href]").filter(function() {
				return /^https?\:\/\/([a-zA-Z0-9\-]+\.)+/i.test(this.href) && !/^https?\:\/\/([a-zA-Z0-9\-]+\.)+gov/i.test(this.href) && this.href !== "" && this.href.indexOf(location.protocol + '//' + location.hostname) !== 0 && !$(this).hasClass('add_this_btn') && !$(this).hasClass('no-exit-notification');
			}).after($(
				'<a class="icon-exit-notification" title="' + altText + '" href="' + path + '">' +
					'<span class="hidden">' + altText + '</span>' +
				'</a>'
			));
		})(jQuery);
		/*** END Exit Disclaimer ***/

		/*** BEGIN Site-Wide Search
		 * This initializes jQuery UI Autocomplete on the site-wide search widget.
		 ***/
		(function($) {
			require('jquery-ui');

			var newWidth = window.innerWidth || $(window).width(),
				oldWidth = newWidth;

			var language = "English";
			if ($('html').attr("lang") === "es") {
				language = "Spanish";
			}

			var keywordElem = "#swKeyword";
			if ($(keywordElem).length === 0) {
				return;
			}
			var svcUrl = "/AutoSuggestSearch.svc/SearchJSON/" + language;


			var setAutocompleteOptions = function(element) {
				var windowWidth = window.innerWidth || $(window).width(),
					position,
					resizeMenu;

				if(windowWidth <= NCI.Breakpoints.large) {
					// if mobile, make the autocomplete list full-width
					position = {
						my: "left top",
						at: "left bottom",
						of: "#nvcgSlMainNav"
					};

					resizeMenu = function() {
						this.menu.element.outerWidth("100%");
					};
				} else {
					// if desktop, make the autocomplete list work as default
					position = $.ui.autocomplete.prototype.options.position;
					resizeMenu = $.ui.autocomplete.prototype._resizeMenu;
				}

				$(element).autocomplete('option', 'position', position)
					.data('ui-autocomplete')._resizeMenu = resizeMenu;
			};

			NCI.doAutocomplete(keywordElem, svcUrl, false, "term");
			setAutocompleteOptions(keywordElem);

			$(window).on('resize.NCI.search', function() {
				setAutocompleteOptions(keywordElem);

				$(keywordElem).autocomplete('close');
			});
		})(jQuery);
		/*** END Site-Wide Search ***/

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
			$('[data-toggletables-section]').each(function () {
				// dynamically apply the tablenumber data attribute, hide the caption if needed, and hide the other tables
				$(this).children('table').each(function (i) {
					// hide the captions if needed (specified by 'data-hidden-on-js' on the <caption> element)
					$(this).children('caption[data-hidden-on-js]').addClass('hidden');
					// apply the data-table-filternum attribute to ALL tables
					$(this).attr('data-toggletables-tablenumber', i);
					if (i === 0) {
						// show the tables that are first (default is already shown, but this makes it explicit)
						$(this).addClass('show');
					} else {
						// hide the tables that aren't first
						$(this).addClass('hide');
					}
				});

				// make the first filter link active
				$(this).find('dl > dd').first().addClass('active');

				// bind the filter links
				$(this).find('dl > dd').on('click', function () {
					// get jQuery object of this term
					var $this = $(this);
					// get the index of this term (0-base!)
					var index = $this.index() - 1;

					// get the parent (list of filters), to activate later
					var $filterList = $this.parent('dl');
					// get the table that's been selected, to show later
					var $selectedTable = $this.closest('[data-toggletables-section]').children('[data-toggletables-tablenumber=' + index + ']');

					// show the selected table
					$selectedTable.removeClass('hide').addClass('show');
					// hide the other tables
					$selectedTable.siblings('table').removeClass('show').addClass('hide');

					// remove the active class from the other filter terms
					$this.siblings('dd').removeClass('active');
					// add the active class to the selected filter term
					$this.addClass('active');
				});
			});
		})(jQuery);
		/*** END table toggling ***/

		/*** BEGIN video embedding
		 * This enables the embedding of YouTube videos and playlists as iframes.
		 ***/
		(function($) {
			$('.flex-video').each(function() {
				var $this = $(this);
				var lang = $('html').attr('lang') || 'en';
				var contentLanguage = document.documentElement.lang;
				var hl = '&hl=en';
				if(contentLanguage.indexOf('es') > -1){
					hl = '&hl=es';
				}

				var videoSrc = '//www.youtube-nocookie.com/embed/',
					videoLinkSrc = 'https://www.youtube.com/',
					videoId = '',
					videoTitle = '',
					videoOptions = '?wmode=opaque&rel=0' + hl,
					videoType = '';

				if($this.hasClass('playlist')) {
					videoType = 'playlist';
					videoTitle = $this.attr('data-playlist-title');
					videoId = 'videoseries';
					videoOptions = videoOptions +
						'&list=' + $this.attr('data-playlist-id');
					videoLinkSrc = videoLinkSrc + 'playlist?list=' + videoId;
				} else {
					videoType = 'video';
					videoTitle = $this.attr('data-video-title');
					videoId = $this.attr('data-video-id');
					videoOptions = videoOptions +
						'';
					videoLinkSrc = videoLinkSrc + 'watch?v=' + videoId;
				}
				videoSrc = videoSrc + videoId + videoOptions;
				var videoText = {
					video: {
						en: 'Youtube embedded video: ' + videoLinkSrc,
						es: 'Video insertado desde YouTube: ' + videoLinkSrc
					},
					playlist: {
						en: 'Youtube embedded video playlist: ' + videoLinkSrc,
						es: 'Lista de reproducci&oacute;n insertada desde YouTube: ' + videoLinkSrc
					}
				};
				$this.append(
					$(document.createElement('iframe'))
						.attr('width', '560')
						.attr('height', '315')
						.attr('src', videoSrc)
						.attr('frameborder', '0')
						.attr('allowFullScreen', '')
						.attr('title', videoTitle)
						.attr('alt', videoTitle)
						.text(videoText[videoType][lang])
				);
			});
		})(jQuery);
		/*** END video embedding ***/

		/*** BEGIN form controls ***/
		(function($) {
			require('jquery-ui');

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
					create: function(event, ui) {
						// this sets the label's 'for' attribute to point to the <select> element, assigns the label a unique id, and sets the selectmenu widget's 'aria-labelledby' attribute to that unique id
						$this.selectmenu('widget').attr('aria-labelledby', $this.data('ui-selectmenu').label.attr('for', this.id).uniqueId().attr('id'));
					},
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
			NCI.makeAllAccordions();
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
