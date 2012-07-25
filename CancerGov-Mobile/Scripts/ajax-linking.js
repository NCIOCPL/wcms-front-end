/*$(document).ready(function() {
  // disable ajax nav
  $.mobile.ajaxLinksEnabled = false;
 });*/
 
 $(document).bind("mobileinit", function(){
 
    $.mobile.ajaxEnabled = false;

});

// wrap a div with overflow: auto around all tables in the body
$(document).ready(function() {
	$('div#cgvMobileBody table').wrap('<div style="overflow: auto;"></div>');
});