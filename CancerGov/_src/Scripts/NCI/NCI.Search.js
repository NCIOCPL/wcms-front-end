NCI.Search = {
	classname: "searching",
	init: function() {
		$(".nav-search").click(NCI.Search.mobile.show);

	},
	mobile: {
		clear: function() {
			$("#swKeyword").val("");
		},
		show: function(e) {
			var menu_btn = $(".open-panel"),
				s = NCI.Search;
			$("#nvcgSlMainNav").addClass(s.classname);
			if (!$("#searchclear").length) {
				$("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
			}
			menu_btn.unbind("click").click( NCI.Search.mobile.hide );
		},
		hide: function(e) {
			$("#nvcgSlMainNav").removeClass( NCI.Search.classname );
			NCI.Nav.$openPanelBtn.unbind("click").click( NCI.Nav.open );
		}
	}
};


