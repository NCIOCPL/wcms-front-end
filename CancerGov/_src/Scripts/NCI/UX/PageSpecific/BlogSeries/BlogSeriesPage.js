define(function(require) {
	require('Common/Enhancements/sharecomponent');
	$(function() {
		require('Common/Enhancements/analytics.After').init();
	});

	// Ensure the .contentzone is given a width of 75% making room for the right rail when present
	var setContentWidth = function(){
		if($('#nvcgSlListBlogRTRail').length){
			if ($(window).width() >= 1025){
            	$('.contentzone').css('width', '75%');
                $("#PageOptionsControl1").appendTo("#blogPageOptionsOuterContainer");
			}
			else{
				$('.contentzone').css('width', '100%');
                $("#PageOptionsControl1").appendTo("#blogPageOptionsInnerContainer");
			}
        }
	};
	$(window).resize(function(){
		setContentWidth();
	});
    $( document ).ready(function() {
        setContentWidth();

		// Make accordions work
		NCI.doAccordion($("#blog-archive-accordion"), {header: "h3"});
        NCI.doAccordion($('#blog-archive-accordion-year'), {header: "h4"});

		// This little blurb is searching for the parent accordion elements of the currently selected archive link and expanding the 
		// accordion to that element. This keeps the accordion collapsed on the elements not currently being viewed.
		var selectedArchiveLink = $('#blog-archive-accordion').find("a[href='" + location.pathname + location.search +"']").parent();
		if(selectedArchiveLink.length > 0){
			selectedArchiveLink.addClass("current-archive-link");
			var indexOfLink = selectedArchiveLink.parent().prev().index() / 2;
			$('#blog-archive-accordion-year').accordion('option', 'active', indexOfLink);
			$('#blog-archive-accordion').accordion('option', 'active', 0);
		}

		$('.right-rail').find("a[href='" + location.pathname + location.search +"']").closest('li').addClass("current-categories-link");
    });
});


