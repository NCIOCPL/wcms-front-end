(function($) {
	// Get the name of the page you are on
	var mysplit = window.location.pathname.split("/");
	var pagename = mysplit[mysplit.length-1];
	var hideLanguageName;
	var showLanguageName;
	var langURL;

	/* LANGUAGE TOGGLE:
	* Show/hide language that isn't the page language
	*/
	if(pagename === "home-es.shtml" || pagename === "cancertypes-nsclc-pdq-patient-es.shtml") {
		hideLanguageName = 'espanol';
		showLanguageName = 'english';

		//remove the -es
		langURL = pagename.replace("-es.shtml", ".shtml");
	}
	else if(pagename === "home.shtml" || pagename === "cancertypes-nsclc-pdq-patient.shtml") {
		hideLanguageName = 'english';
		showLanguageName = 'espanol';

		//add the -es
		langURL = pagename.replace(".shtml", "-es.shtml");
	}
	else {
		hideLanguageName = 'english';
		showLanguageName = 'espanol';
		langURL = "home-es.shtml";
	}
	$("#" + hideLanguageName + "").addClass("hide");
	$("#" + showLanguageName + "").attr("href", langURL);
})(jQuery);
