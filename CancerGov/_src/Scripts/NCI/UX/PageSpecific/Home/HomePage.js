define(function(require) {
    require('Modules/carousel/carousel');

    $(function() {
        require('Home/Enhancements/espanolHome').init();
        require('Common/Enhancements/clinicalTrialsDelighter').init();
    });
});
