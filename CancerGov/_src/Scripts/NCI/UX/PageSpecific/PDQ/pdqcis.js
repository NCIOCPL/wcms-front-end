define(function(require) {
	var $ = require('jquery');
	var NCI = require('Common/Enhancements/NCI');

	// This file is for the PDQ Cancer Information Summary UX functionality
	$(function() {
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

		var lang = $('html').attr('lang') || 'en';

		// Navigation state variable for handling in page nav events
		var navigationState = 'UNINITIALIZED';

		// Helper function to do insternal redirects (i.e. changing a has from an ID to a specific route)
		function internalRedirect(path) {
			if (navigationState !== 'UNINITIALIZED') {
				navigationState = 'REDIRECT';
			}
			routie(path);
		}

		// Event handler to determine when to fire PDQINPAGENAV event.
		//$(window).on('NCI.PDQ.hashchange', function() {
		$(window).on('hashchange', function() {
			if (navigationState === 'UNINITIALIZED') {
				// This is the hashchange event after the initial load
				navigationState = 'INITIALIZED';
				$(window).trigger("hashchange");
			} else if (navigationState === 'REDIRECT') {
				// This is a hashchange event before a redirect.
				navigationState = 'INITIALIZED';
			} else if (navigationState === 'IN_SECTION') {
				// Navigating within and open page
				navigationState = 'INITIALIZED';
			} else {
				// The page is initialized, so we are doing
				// an inpage navigation
				$(window).trigger('pdqinpagenav');
			}
		});



		// update item hrefs to include '#link/' at the beginning
		function updateLinkHref(i, el) {
			var $this = $(el);
			$this.attr('href', '#link\/' + $this.attr('href').substr(1));
		}

		// This function selects the first-level elements from the document outline and creates a one-level table of contents
		// It also appends a "View All" link to the end
		// Levels: 2
		function buildTopTOC() {
			var options = {
					i18n: {
						title: {
							en: "Sections",
							es: "Secciones"
						},
						viewAll: {
							en: "View All Sections",
							es: "Ver todas las secciones"
						}
					},
					class: 'toptoc no-resize-pdq-section',
					placement: {
						insert: 'insertBefore',
						to: '.summary-sections > section:eq(0)'
					},
					ignore: {
						heading: ['h6', '[do-not-show="toc"]'],
						node: ['aside']
					},
					maxLevel: 1
				},

				$nav = $('<nav>').addClass(options.class).attr('role', 'navigation').attr('id', 'pdq-toptoc')
					.append($('<h3>').text(options.i18n.title[NCI.page.lang || 'en'])),
				articleRoot = $('article').data('nci-outline').sections[0];

			$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

			// append "View All" item
			$nav.children('ul').append(
				$('<li class="viewall"><a href="#all">' + (options.i18n.viewAll[NCI.page.lang || 'en']) + '</a></li>')
			);

			// update item hrefs, fix slash word-breaking
			$nav.find('a').each(function() {
				var $this = $(this);
				$this.attr('href', '#section\/' + $this.attr('href').substr(1))
					.html($this.html().replace(/([^<][\/\\])/g, '$1&#8203;'));
			});

			$nav[options.placement.insert](options.placement.to);

			return $nav;
		}

		// This function creates the table of contents for the individual sections.
		// Levels 2, 3, 4
		function buildFullTOC() {
			var options = {
					i18n: {
						title: {
							en: "On This Page",
							es: "En Este Página"
						}
					},
					class: 'on-this-page',
					placement: {
						insert: 'prependTo',
						to: $('<div id="pdq-toc-article">').insertAfter('#pdq-toptoc')
					},
					ignore: {
						heading: ['h6', '[do-not-show="toc"]'],
						node: ['aside']
					},
					maxLevel: 3
				},

				$nav = $('<nav>').addClass(options.class).attr('role', 'navigation')
					.append($('<h6>').text(options.i18n.title[NCI.page.lang || 'en'])),
				articleRoot = $('article').data('nci-outline').sections[0];

			$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

			// update item hrefs
			$nav.find('a').each(updateLinkHref);

			$nav[options.placement.insert](options.placement.to);

			return $nav;
		}

		// This function creates the table of contents for the individual sections.
		// Levels: 3, 4
		function buildSectionTOC() {
			var options = {
					class: 'on-this-page',
					placement: {
						insert: 'prependTo',
						to: '.pdq-sections'
					},
					ignore: {
						heading: ['h6', '[do-not-show="toc"]'],
						node: ['aside']
					},
					startLevel: 2,
					maxLevel: 3
				},

				articleRoot = $('article').data('nci-outline').sections[0],
				sectionInsertionPoint,
				newRoot;

			for (var i = 0, len = articleRoot.sections.length; i < len; i++) {
				sectionInsertionPoint = options.placement.to + ':eq(' + i + ')';
				newRoot = articleRoot.sections[i];

				// $nav is instantiated inside the loop to avoid changing the previous nav
				var $nav = $('<nav>').addClass(options.class).attr('role', 'navigation');

				$nav.append(NCI.page.parseOutline(newRoot, options.startLevel, options.maxLevel, options.ignore));

				// update item hrefs
				$nav.find('a').each(updateLinkHref);

				if($nav.children().length > 0) {
					$nav[options.placement.insert](sectionInsertionPoint);
				}
			}
		}


		var $allSections = $('.pdq-sections').parent('section');

		// This function opens and closes the top-level sections selected on the section nav bar
		function showSection(section, resetURL) {
			var $section = $(section),
				sectionIdentifier = $section.prop('id'),
				sectionIdx = $allSections.index($section);

			if (section === 'all') {
				$section = $('.pdq-sections').parent('section');
				sectionIdentifier = 'all';
				sectionIdx = -1;
			}

			// initialize variables for setting metatags and email URL
			var urlSuffix = (resetURL ? '' : '#section/' + sectionIdentifier),
				ogUrl = $('link[rel="canonical"]').attr('href') + urlSuffix,
				$emailPage = $('.po-email > a');

			// *** This only works for top-level sections *** //
			if ($allSections.filter($section).length > 0) {
				// hide/show the proper section
				$allSections
					// show the current section
					.filter($section).removeClass('hide').addClass('show')
					// hide the other sections
					.end().not($section).addClass('hide').removeClass('show');

				// show the proper selection
				$('#pdq-toptoc li')
					// select the current section
					.filter(':eq(' + sectionIdx + ')').addClass('selected')
					// unselect the other sections
					.end().not(':eq(' + sectionIdx + ')').removeClass('selected');

				// show/hide the TOC elements
				if (section === 'all') {
					// Hide all the TOCs (section and doc level)
					$('.on-this-page')
						// ... and hide the Previous/Next navigation links
						.add('.previous-link, .next-link')
						.removeClass('show').addClass('hide');
					// ... and then just show the doc level TOC
					$('#pdq-toc-article .on-this-page')
						.removeClass('hide').addClass('show');
				} else {
					// Show all the TOCs (section and doc level)
					$('.on-this-page')
						// ... and show the Previous/Next navigation links
						.add('.previous-link, .next-link')
						.removeClass('hide').addClass('show');
					// ... and then just hide the doc level TOC
					$('#pdq-toc-article .on-this-page')
						.removeClass('show').addClass('hide');
				}
			}

			/* When we're routing to a new section, we're setting the meta-tag for 'og:url' to the
			 * current section so that the social media share buttons - retrieving the URL from this
			 * tag - will grab and display the correct section instead of displaying the default section one
			 */
			$('meta[property="og:url"]').attr('content', ogUrl);

			// Also update the email URL
			if ($emailPage.length > 0) {
				$emailPage.attr('href', $emailPage.attr('href').replace(/docurl=[^&]+(&?)/, 'docurl=' + encodeURIComponent('/' + location.pathname.replace(/^\//, '') + urlSuffix) + '$1'))
					.attr('onclick', $emailPage.attr('href').replace(/docurl=[^&]+(&?)/, 'docurl=' + encodeURIComponent('/' + location.pathname.replace(/^\//, '') + urlSuffix) + '$1'));
			}

			// We're running this trigger to ensure that all
			// large tables receive the Enlarge button, even
			// those that are within hidden sections.
			$(window).trigger('pdqinpagenav');
		}


		// This function creates the links at the bottom to navigate to the previous/next section
		function buildPrevNext() {
			var options = {
					i18n: {
						prev: {
							en: "< Previous section",
							es: "< Sección anterior"
						},
						next: {
							en: "Next section >",
							es: "Siguiente sección >"
						}
					},
					class: {
						container: 'row collapse previous-next-links show-for-large-up',
						prev: 'previous-link',
						next: 'next-link',
						link: 'large-6 columns'
					},
					placement: {
						insert: 'insertAfter',
						to: '.pdq-sections'
					}
				},

				articleRoot = $('article').data('nci-outline').sections[0],
				insertionPoint,
				prevSection,
				nextSection,
				i = 0,
				j,
				numSections = articleRoot.sections.length;

			for (; i < numSections; i++) {
				insertionPoint = options.placement.to + ':eq(' + i + ')';

				// $container is instantiated inside the loop to avoid changing the previous nav
				var $container = $('<div>').addClass(options.class.container),
					$prevContainer = $('<div>').addClass(options.class.link).addClass(options.class.prev)
						.appendTo($container),
					$prevLink,
					$nextContainer = $('<div>').addClass(options.class.link).addClass(options.class.next)
						.appendTo($container),
					$nextLink;

				// add previous link
				for(j = i; j > 0; j--) {
					prevSection = articleRoot.sections[j - 1];
					if(prevSection.node.hasAttribute('data-display-excludedevice') && prevSection.node.getAttribute('data-display-excludedevice').indexOf('screen') !== -1) {
						continue;
					} else {
						$prevLink = $('<div>')
							.append($('<a>')
								.attr('href', '#section/' + prevSection.node.id)
								.text(options.i18n.prev[NCI.page.lang || 'en'])
							)
							.append($('<br><em>' + prevSection.heading.innerHTML + '</em>'))
							.appendTo($prevContainer);

						break;
					}
				}

				// add next link
				for(j = i; j < numSections - 1; j++) {
					nextSection = articleRoot.sections[j + 1];
					if(nextSection.node.hasAttribute('data-display-excludedevice') && nextSection.node.getAttribute('data-display-excludedevice').indexOf('screen') !== -1) {
						continue;
					} else {
						$nextLink = $('<div>')
							.append($('<a>')
								.attr('href', '#section/' + nextSection.node.id)
								.text(options.i18n.next[NCI.page.lang || 'en'])
							)
							.append($('<br><em>' + nextSection.heading.innerHTML + '</em>'))
							.appendTo($nextContainer);

						break;
					}
				}

				$container[options.placement.insert](insertionPoint);
			}
		}

		// *** END Functions *** ****************************************

		// Creating the Section Nav in the pdq-toptoc DIV
		// All content within the article tag is used
		// ------------------------------------------------------------
		buildTopTOC()
			// add analytics
			.on('click.NCI.toptoc', 'a', function(e) {
				if ($(this).parent('li').hasClass('viewall')) {
					NCIAnalytics.RightNavLink(this, 'View All Click');
				} else {
					NCIAnalytics.RightNavLink(this, 'Section Nav Click');
				}
			});

		// Preparing the sections with the show/hide attributes
		// ------------------------------------------------------------
		showSection($('.pdq-sections:eq(0)').parent().closest('section'));

		// Creating the previous/next navigation links
		buildPrevNext();

		// Creating the full-page TOC
		buildFullTOC();

		// Secondly creating all of the section-level TOCs
		// Note: This will only be used for TOC, not if Keypoints exist for the section
		buildSectionTOC();

		// Wrapping the summary sections in a DIV to create the accordion
		// for the mobile layout
		// --------------------------------------------------------------
		$('.summary-sections > section')
			.wrapAll('<div class="accordion"></div>');
		NCI.makeAllAccordions();
		//NCI.scrollTo(location.hash);


		// Section to setup re-routing of URLs
		// We are jumping to the specified link and opening the parent section that contains this link.
		// -------------------------------------------------------------------
		routie({
			'all': function() {
				internalRedirect('section/all');
			},
			// Handling of links clicked in the section navigation
			// ---------------------------------------------------
			'section/:sid': function(sid) {
				var $sid = $('#' + sid.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1'));

				$(document).scrollTop(0);

				if (sid === 'all') {
					// show all the sections
					showSection('all');
				} else {
					// show the section
					showSection($sid);
				}
				$('[tabindex="1"]').removeAttr('tabindex');
				//$sid.attr('tabindex', 1).focus();
				$sid.attr('tabindex', 1);

			},
			// Handling of links clicked in the 'On this page' navigation or within the document
			/* Note: The typical case would be to jump to a location within
			 *       a section and then open the section containing this
			 *       location.  However, if we're jumping to the top-level
			 *       section itself we don't want to open the parent but the
			 *       section.
			 */
			// -------------------------------------------------------------
			'link/:rid': function(rid) {
				var $rid = $('#' + rid.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1'));

				// Hide all open sections unless we are in the 'View all' section
				if ($('#pdq-toptoc li.viewall').hasClass('selected')) {
					navigationState = 'IN_SECTION';
				} else if ($rid.closest('section.show').length > 0) {
					// Do nothing here, we are navigating within the open section
					navigationState = 'IN_SECTION';
				} else if ($allSections.filter($rid).length > 0) {
					internalRedirect('section/' + rid);
				} else {
					// show the parent containing the section ...
					showSection($rid.closest('.pdq-sections').parent().closest('section'));
				}

				// TODO: REMOVE?
				// ... and set the section navigation properly
				$('[tabindex="1"]').removeAttr('tabindex');
				//$rid.attr('tabindex', 1).focus();
				$rid.attr('tabindex', 1);
				// END TODO: REMOVE?
			},
			'cit/:cid': function(cid) {
				var $cid = $('#' + cid.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1'));

				// Hide all open sections unless we are in the 'View all' section
				if ($('#pdq-toptoc li.viewall').hasClass('selected')) {
					navigationState = 'IN_SECTION';
				} else if ($cid.closest('section.show').length > 0) {
					// Do nothing here, we are navigating within the open section
					navigationState = 'IN_SECTION';
				} else {
					// show the containing section
					showSection($cid.closest('.pdq-sections').parent().closest('section'));
				}
				$('[tabindex="1"]').removeAttr('tabindex');
				//$cid.attr('tabindex', 1).focus();
				$cid.attr('tabindex', 1);

			},

			// Check if the supplied ID exists. If it doesn't exist, open the full document.
			// ----------------------------------------------------------
			':lid': function(lid) {
				var $lid = $('#' + lid.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1'));
				// Do not route these
				var doNotRoute = ['print', 'imprimir', 'main'];

				if (doNotRoute.indexOf(lid.toLowerCase()) === -1) {
					if ($lid.length === 0) {
						internalRedirect('section/all');
					} else {
						if (lid.match(/^section_/)) {
							internalRedirect('cit/' + lid);
						} else if ($allSections.filter($lid).length > 0) {
							internalRedirect('section/' + lid);
						} else {
							internalRedirect('link/' + lid);
						}
					}
				}
			},
			// Handle a normal load (show the first section)
			'': function() {
				// Note: a request for <URL> or <URL># will enter this

				// Redirect for <URL> to the first section
				// NOTE: <URL># should not be interally redirected. Since there's no 'location.hash' in this case, fake it.
				if(location.href.replace(location.protocol + '//' + location.host + location.pathname, '') !== "#") {
					// get the ID of the first section -- document.querySelector always returns a single result
					var $sid = $('.summary-sections section:eq(0)');

					// show the first section, but set the OpenGraph URL to the default
					showSection($sid, true);
				}
			}
		});

	});
});
