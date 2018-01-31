define(function(require) {
	require('./LandingPage.scss');
	require('Modules/carousel/carousel');

	$(function() {
		require('Modules/floatingDelighter').init();
	});
});
