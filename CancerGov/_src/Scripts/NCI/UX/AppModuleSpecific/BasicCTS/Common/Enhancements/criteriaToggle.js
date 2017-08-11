$(document).ready(function(){
$(".toggle_container").hide();
$("button.ctscb").click(function(){
    $(this).toggleClass("active").parent().next('.toggle_container').slideToggle("fast");

    if ($.trim($(this).text()) === 'Show Search Criteria') {
        $(this).text('Hide Search Criteria');
    } else {
        $(this).text('Show Search Criteria');
    }

    return false;
});
 $("a[href='" + window.location.hash + "']").parent(".ctscb").click();
});
