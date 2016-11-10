define(function(require) {
	var $ = require('jquery');
	require('Patches/Hotfixes/WCMSFEQ-410');

	var Search = {
		classname: "searching",
		searchBtnClass: "nav-search",
		$form: $(),
		$input: $(),
		$searchBtn: $(),

		init: function() {
			var s = NCI.Search;
			s.$form = $('#siteSearchForm');
			s.$input = $('#swKeyword');
			s.$searchBtn = $('.' + s.searchBtnClass);

			s.$searchBtn.click(s.mobile.show);
		},
		mobile: {
			clear: function() {
				NCI.Search.$input.val("");
			},
			show: function(e) {
				var s = NCI.Search,
					n = NCI.Nav;
				$("#nvcgSlMainNav").addClass(s.classname);
				s.$input.focus();
				if ($("#searchclear").length === 0) {
					$("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
				}
				n.$openPanelBtn.unbind("click").click(s.mobile.hide);

				// set tabindex=-1 to items that should be removed from the tab order
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.data('NCI-search-originaltabindex', el.tabIndex || null);
					$el.prop('tabindex', -1);
				});

				// Enable focusing out to close
				s.$form.add(n.$openPanelBtn).on('keydown.NCI.Search', function(event) {
					s.mobile.keyDownHandler(event);
				});
			},
			hide: function(e) {
				var s = NCI.Search,
					n = NCI.Nav;
				// Disable focusing out to close, before changing the focus
				s.$form.add(n.$openPanelBtn).off('keydown.NCI.Search');

				// set tabindex back to what it was before opening
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.attr('tabindex', $el.data('NCI-search-originaltabindex'));
				});

				// focus the search button
				s.$searchBtn.focus();
				$("#nvcgSlMainNav").removeClass(s.classname);
				n.$openPanelBtn.unbind("click").click(n.toggleMobileMenu);
			},
			keyDownHandler: function(event) {
				var n = NCI.Nav,
					s = NCI.Search;

				if(event.keyCode === $.ui.keyCode.ESCAPE || (event.keyCode === $.ui.keyCode.TAB && ( // if the user pressed the ESC or TAB key
					(n.$openPanelBtn.is(event.target) && event.shiftKey) || // if the user pressed SHIFT-TAB on the first tabbable item
					(s.$form.find(':tabbable:last').is(event.target) && !event.shiftKey) // if the user pressed TAB on the last tabbable item
				))) {
					//if(window.scrollX > 0) { window.scrollTo(0, window.scrollY); }
					s.mobile.hide();

					setTimeout(function() {
						// focus the search button
						s.$searchBtn.focus();
					}, 0);
				}
			}
		}
	};

	return Search;
});
