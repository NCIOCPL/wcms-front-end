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
    });
});


