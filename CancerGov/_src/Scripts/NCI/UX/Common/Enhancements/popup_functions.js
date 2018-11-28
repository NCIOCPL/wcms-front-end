import $ from 'jquery';
import dictionary from 'Data/DictionaryService';
import queryString from 'query-string';

var lang = $('html').attr('lang') || 'en';
// Set the language for finding the dictionary term/definition
var longLang = 'English'; 
if (lang === 'es') {
	longLang = 'Spanish';
}

const popupFunctions = () => {
	//creates appropriate pop-up window
	function popWindowOld(type, urlargs){
		if (type == "privacy") {
			window.open('/common/popUps/popPrivacy.aspx','','scrollbars=no,resizable=yes,width=300,height=300');
		} else if (type == "livehelp") {
			window.open('/common/popUps/popLiveHelp.aspx','LiveHelp','scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes,location=yes,width=425,height=500');
		} else if (type == "definition") {
			urlargs = urlargs.replace(/\s/g, '+');
			window.open('/common/popUps/popDefinition.aspx?term=' + urlargs,'','scrollbars=yes,resizable=yes,width=350,height=450');
		} else if (type == "defbyid") {
			window.open('/common/popUps/popDefinition.aspx?id=' + urlargs,'','scrollbars=yes,resizable=yes,width=350,height=450');
		} else if (type == "file") {
			window.open(urlargs, '', 'scrollbars=yes,resizable=yes,width=550,height=550');
		} else if (type == "fullbrowser") {
			window.open(urlargs, '', 'menubar=yes,location=yes,status=yes,toolbar=yes,titlebar=yes,scrollbars=yes,resizable=yes,width=675,height=510');
		} else if (type == "small") {
			window.open(urlargs, '', 'scrollbars=no,resizable=no,menubar=no,status=no,toolbar=no,titlebar=no,width=200,height=100,left=400,screenX=400,top=300,screenY=300');
		}
	} 

	// get the full definition from the dictionary service
	var _getDefinition = function (term) {
		return dictionary.search('term', term, longLang, 'exact');
	};
	// get the full definition from the dictionary service
	var _getTerm = function (id) {
		return dictionary.getTerm('term', id, longLang);
	};

	function popWindow(type, urlargs){
		let url = '';
		if (type == "privacy") {
			url = '/common/popUps/popPrivacy.aspx';
			
		} else if (type == "livehelp") {
			url = '/common/popUps/popLiveHelp.aspx';
			
		} else if (type == "definition") {
			let term = urlargs.replace(/\s/g, '+');
			$.when(_getDefinition(term)).done(function (termObject) {
				console.log(termObject);
				// if (termObject.result.length > 0) {
				// 	console.log(termObject);
				// 	// _render(termObject.result[0].term);
				// }
			});
			
		} else if (type == "defbyid") {
			let params = queryString.parse(urlargs);
			// id's are prefixed with "CDR0000" in the html but the backend service errors out if included in request
			let id = Object.keys(params)[0].replace("CDR0000",''); 
			console.log("params",params);

			$.when(_getTerm(id)).done(function (termObject) {
				//TODO: error returns 404 html page, not an error object
				if (termObject.term) {
					console.log(termObject.term);
					//TODO: render term to dialog
					// _render(termObject.result[0].term);
				}
			});
			
		} else {
			window.open(urlargs, '', 'scrollbars=yes,resizable=yes,width=550,height=550');
		}

		//console.log(params);



		// currently on the href
		//popWindow('defbyid','CDR0000045333&version=patient&language=English&dictionary=Cancer.gov'); - this would be a getTerm request
		//popWindow('definition','malignant') - this would be an search request with an exact match option

		// using the dictionary service - from bestbets.js
		//https://www.cancer.gov/Dictionary.Service/v1/search?dictionary=term&searchText=prostate&language=English&searchType=exact&offset=0&maxResuts=0

		//  search: function(dictionary, searchText, language, searchType, offset, maxResults) {
		// getTerm: function(dictionary, termID, language) {
	}

	window.popWindow = popWindow;

	function dynPopWindow(url, name, windowAttributes){
		var options = '';
		var optWidth = 'width=500';
		var optHeight = 'height=500';
		var optScrollbar = 'scrollbars=yes';
		var optResizable = 'resizable=yes';
		var optMenubar = 'menubar=yes';
		var optLocation = 'location=yes';
		var optStatus = 'status=yes';
		var optToolbar = 'toolbar=yes';

		var windowOptions = windowAttributes.split(',');

		for(i = 0; i < windowOptions.length; i++){
			var attribute = windowOptions[i].substring(0, windowOptions[i].indexOf('=')).toLowerCase();

			if(attribute == 'width'){
				optWidth = windowOptions[i];
			} else if(attribute == 'height'){
				optHeight = windowOptions[i];
			} else if(attribute == 'scrollbars'){
				optScrollbar = windowOptions[i];
			} else if(attribute == 'resizable'){
				optResizable = windowOptions[i];
			} else if(attribute == 'menubar'){
				optMenubar = windowOptions[i];
			} else if(attribute == 'location'){
				optLocation = windowOptions[i];
			} else if(attribute == 'status'){
				optStatus = windowOptions[i];
			} else if(attribute == 'toolbar'){
				optToolbar = windowOptions[i];
			}
		}

		options = optWidth + ',' + optHeight + ',' + optScrollbar + ',' + optResizable + ',' + optMenubar + ',' + optLocation + ',' + optStatus + ',' + optToolbar;

		window.open(url, name, options);

	}
	window.dynPopWindow = dynPopWindow;
}

export default popupFunctions;