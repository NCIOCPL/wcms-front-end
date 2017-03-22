define(function(require) {
	require('./WCMSFEQ-410');
	var $ = require('jquery');
	var nav = require('Common/Enhancements/NCI.Nav');

	var Search = {
		classname: "searching",
		searchBtnClass: "nav-search",
		$form: $(),
		$input: $(),
		$searchBtn: $(),

		init: function() {
			this.$form = $('#siteSearchForm');
			this.$input = $('#swKeyword');
			this.$searchBtn = $('.' + this.searchBtnClass);

			this.$searchBtn.on('click.NCI.Search',this.mobile.show);
		},
		mobile: {
			clear: function() {
				this.$input.val("");
			},
			show: function(e) {
				var n = nav;
				console.log(this);
				$("#nvcgSlMainNav").addClass(this.classname);
				this.$input.focus();
				if ($("#searchclear").length === 0) {
					$("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
				}
				n.$openPanelBtn.off("click").on('click',this.mobile.hide);

				// set tabindex=-1 to items that should be removed from the tab order
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.data('NCI-search-originaltabindex', el.tabIndex || null);
					$el.prop('tabindex', -1);
				});

				// Enable focusing out to close
				this.$form.add(n.$openPanelBtn).on('keydown.NCI.Search', function(event) {
					this.mobile.keyDownHandler(event);
				});
			},
			hide: function(e) {
				var n = nav;
				// Disable focusing out to close, before changing the focus
				this.$form.add(n.$openPanelBtn).off('keydown.NCI.Search');

				// set tabindex back to what it was before opening
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.attr('tabindex', $el.data('NCI-search-originaltabindex'));
				});

				// focus the search button
				this.$searchBtn.focus();
				$("#nvcgSlMainNav").removeClass(this.classname);
				n.$openPanelBtn.off("click").on('click',n.toggleMobileMenu);
			},
			keyDownHandler: function(event) {
				var n = nav;

				if(event.keyCode === $.ui.keyCode.ESCAPE || (event.keyCode === $.ui.keyCode.TAB && ( // if the user pressed the ESC or TAB key
					(n.$openPanelBtn.is(event.target) && event.shiftKey) || // if the user pressed SHIFT-TAB on the first tabbable item
					(this.$form.find(':tabbable:last').is(event.target) && !event.shiftKey) // if the user pressed TAB on the last tabbable item
				))) {
					//if(window.scrollX > 0) { window.scrollTo(0, window.scrollY); }
					this.mobile.hide();

					setTimeout(function() {
						// focus the search button
						this.$searchBtn.focus();
					}, 0);
				}
			}
		}
	};

	return Search;
});
