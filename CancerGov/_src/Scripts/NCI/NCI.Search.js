NCI.Search = {
	classname: "searching",
	searchBtnClass: "nav-search",
	$input: $(),
	$searchBtn: $(),

	init: function() {
		var s = NCI.Search;
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
			n.$openPanelBtn.unbind("click").click( s.mobile.hide );
		},
		hide: function(e) {
			var s = NCI.Search,
				n = NCI.Nav;
			s.$searchBtn.focus();
			$("#nvcgSlMainNav").removeClass( s.classname );
			n.$openPanelBtn.unbind("click").click( n.toggleMobileMenu );
		}
	}
};
