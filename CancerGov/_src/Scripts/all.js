jQuery(document).ready(function(jQuery) {
	/*** BEGIN scrollToFixed init ***/
	(function($) {
		var headerHeight = $('.fixedtotop').height();
		$('.fixedtotop').scrollToFixed({
			spacerClass: 'fixedtotop-spacer',
			fixed: function() {
				$('.fixedtotop-spacer').height(headerHeight);
			}
		});

		/* OCEPROJECT-2920, reposition when focus is under the sticky nav */
		$('#content')
			.on('focusin.NCI.scrollTo', ':focusable', function(event) {
				// reposition on focusing a child item, if needed
				var rect = this.getBoundingClientRect(),
					header = document.querySelector('.fixedtotop'),
					headerBottom = header && header.getBoundingClientRect().bottom,
					topShown = rect.top >= headerBottom,
					isTall = $(this).height() >= $(window).height();

				if(!topShown && !isTall) {
					NCI.scrollTo(event.target, event.type);
				}
			});
	})(jQuery);
	/*** END scrollToFixed init ***/

	/*** BEGIN Mega Menu init
	 *** (initialize a selector as an accessibleMegaMenu)
	 ***/
	(function($) {
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
	})(jQuery);
	/*** END Mega Menu init ***/

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
		$('.headroom-area').headroom({
			tolerance: 0,
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
		var doScroll = function(event) {
			if(location.hash !== '') {
				NCI.scrollTo(location.hash, event.type);
			}
		};

		NCI.window.oldHash = location.hash;
		/*
		if(NCI.window.oldHash !== "") {
			$('a[href=' + NCI.window.newHash + ']').on('click.NCI.scrollTo', function() { doScroll({type: "load"}); });
		}
		*/

		$(window).on('load hashchange', function(event) {
			NCI.window.newHash = location.hash;

			doScroll(event);

			/*
			if(NCI.window.oldHash !== "") {
				$('a[href=' + NCI.window.oldHash + ']').off('click.NCI.scrollTo');
			}
			if(NCI.window.newHash !== "") {
				$('a[href=' + NCI.window.newHash + ']').on('click.NCI.scrollTo', function() { doScroll(event); });
			}
			*/

			NCI.window.oldHash = NCI.window.newHash;
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

			var videoSrc = '//www.youtube-nocookie.com/embed/',
				videoLinkSrc = 'https://www.youtube.com/',
				videoId = '',
				videoTitle = '',
				videoOptions = '?wmode=opaque&rel=0',
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

	// Run this script to dynamically generate an "On This Page" block at the top of the page if it's specified the HTML
	// TODO: move this to a different location when cleaning up the JavaScript for a future release.
	NCI.buildOTP();

	/*** BEGIN Spanish blog label HACK ***/
	(function($) {
		$('html[lang="es"]')
			.find('.blog-post > .post-info > p').each(function(i, el) {
				$(el).html(el.innerHTML.replace("Continue Reading", "Siga leyendo"));
			}).end()
			.find('.blog-pager')
				.children('.older').each(function(i, el) {
					$(el).html(el.innerHTML.replace("Older Posts", "Artículos anteriores"));
				}).end()
				.children('.newer').each(function(i, el) {
					$(el).html(el.innerHTML.replace("Newer Posts", "Artículos siguientes"));
				}).end()
			.end()
			.find('.blog-post-older').each(function(i, el) {
				$(el).html(el.innerHTML.replace("Older Post", "Artículo anterior"));
			}).end()
			.find('.blog-post-newer').each(function(i, el) {
				$(el).html(el.innerHTML.replace("Newer Post", "Artículo siguiente"));
			});
	})(jQuery);
	/*** END Spanish blog label HACK ***/

	/*** BEGIN blog comment policy ***/
	(function($) {
		if ($('#cgvCommentsSl').length) {
			$('.blog-comment-policy').show();
		}
	})(jQuery);
	/*** END blog comment policy ***/
	
	/*** BEGIN NCI-Match HACK ***/
	(function($) {
		if (/\/?about-cancer\/treatment\/clinical-trials\/search\/view/gi.test(location.pathname) && /\bcdrid=773118\b/gi.test(location.search)) {
			$('table:eq(0)')
			.find('tr:eq(0)')
				.append($('<th>').text('Status'))
			.end().find('tr:eq(1)')
				.append($('<td>').text('Temporarily Closed'));
		}
	})(jQuery);
	/*** END NCI-Match HACK ***/
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
