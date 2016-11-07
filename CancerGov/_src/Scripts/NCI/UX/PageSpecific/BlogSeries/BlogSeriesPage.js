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
		$('.blog-archive-accordion').on("click", function(){
			this.classList.toggle("active");
        	this.nextElementSibling.classList.toggle("show");
			var element = $(this).find( ".archive-accordion-expand" )[0];
			if($(element).text() == "+"){
				$(element).text("-");
			}
			else{
				$(element).text("+");
			}
		});

		$('.blog-archive-accordion-panel').find("a[href='" + location.pathname + location.search +"']").parent().addClass("current-archive-link");
		$('.right-rail').find("a[href='" + location.pathname + location.search +"']").closest('li').addClass("current-categories-link");
    });
});
