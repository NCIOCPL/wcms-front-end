NCI.Search = {
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
			s.$form.add(n.$openPanelBtn).on('focusout.NCI.Search', function(event) {
				s.mobile.focusOutHandler(event);
			});
		},
		hide: function(e) {
			var s = NCI.Search,
				n = NCI.Nav;
			// Disable focusing out to close, before changing the focus
			s.$form.add(n.$openPanelBtn).off('focusout.NCI.Search');

			// set tabindex back to what it was before opening
			$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
				var $el = $(el);
				$el.attr('tabindex', $el.data('NCI-search-originaltabindex'));
			});

			s.$searchBtn.focus();
			$("#nvcgSlMainNav").removeClass(s.classname);
			n.$openPanelBtn.unbind("click").click(n.toggleMobileMenu);
		},
		focusOutHandler: function (event) {
			var n = NCI.Nav,
				s = NCI.Search;

			setTimeout(function() {
				if (s.$form.has(document.activeElement).length > 0 || n.$openPanelBtn.is(document.activeElement)) {
					return;
				}
				if(window.scrollX > 0) { window.scrollTo(0, window.scrollY); }
				s.mobile.hide();
			}, 0);
		}
	}
};
