define(function(require) {
    require('Common/Enhancements/equal_heights');
    require('Common/Enhancements/carousel');
    require('Home/Enhancements/clinicalTrialsDelighter');
    $(function() {
        require('Home/Enhancements/espanolHome').init();
    });
});
