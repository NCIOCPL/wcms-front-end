define(function(require) {
    var $ = require('jquery');
    //document ready
    $(function() {
        var form = $("#resultForm");
        var paginationLinks = form.find(".pagination a");

        if(paginationLinks[0]) {
            paginationLinks.each(function(el,i){
                var $this = $(this);
                var href= $this.attr('href');
                if(href.match("javascript")){
                    $this.attr('href','#');
                    var index = href.replace("javascript:page('","").replace("');","");

                    $this.click(function(e){
                        e.preventDefault();
                        document.searchParamForm.selectedPage.value=index;
                        document.searchParamForm.action='/about-cancer/causes-prevention/genetics/directory/results';
                        document.searchParamForm.submit();
                    })
                }
            });
        }
    });
});