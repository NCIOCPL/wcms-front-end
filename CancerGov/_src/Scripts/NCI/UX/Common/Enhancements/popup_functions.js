import $ from 'jquery';
import dictionary from 'Data/DictionaryService';
import queryString from 'query-string';
import imageCarousel from './image-carousel';

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
	var _getDefinition = (term) => {
		return dictionary.search('term', term, longLang, 'exact');
	};
	// get the full definition from the dictionary service
	var _getTerm = (lookup,id) => {
		return dictionary.getTerm(lookup, id, longLang);
	};

	const popWindow = (type, urlargs) => {
		let url = '';
		if (type === "privacy") {
			url = '/common/popUps/popPrivacy.aspx';
			
		} else if (type === "livehelp") {
			url = '/common/popUps/popLiveHelp.aspx';
			
		} else if (type === "definition") {
			let term = urlargs.replace(/\s/g, '+');
			$.when(_getDefinition(term)).done(function (termObject) {
				console.log(termObject);
				// if (termObject.result.length > 0) {
				// 	console.log(termObject);
				// 	// _render(termObject.result[0].term);
				// }
			});
			
		} else if (type === "defbyid") {
			let params = queryString.parse(urlargs);
			// id's are prefixed with "CDR0000" in the html but the backend service errors out if included in request
			let id = Object.keys(params)[0].replace("CDR0000",''); 
			console.log("params",params);
			let lookup = params.dictionary === 'Cancer.gov' ? 'term' : params.dictionary;

			$.when(_getTerm(lookup,id)).done(function (termObject) {
				//TODO: error returns 404 html page, not an error object
				if (termObject.term) {
					console.log("term",termObject.term);

					triggerModal(termObject.term);
				}
			});
			
		} else {
			window.open(urlargs, '', 'scrollbars=yes,resizable=yes,width=550,height=550');
		}

		// currently on the href
		//popWindow('defbyid','CDR0000045333&version=patient&language=English&dictionary=Cancer.gov'); - this would be a getTerm request
		//popWindow('definition','malignant') - this would be an search request with an exact match option

		// using the dictionary service - from bestbets.js
		//https://www.cancer.gov/Dictionary.Service/v1/search?dictionary=term&searchText=prostate&language=English&searchType=exact&offset=0&maxResuts=0

		//  search: function(dictionary, searchText, language, searchType, offset, maxResults) {
		// getTerm: function(dictionary, termID, language) {
	}

	const triggerModal = (term) => {
		var modalId = 'definition' + term.id;

		if ($("#modal_definition")[0]) {
			$("#modal_definition").html(renderTerm(term)).dialog("open");
		} else {
			// create a new modal window
			$('<div id="modal_definition"></div>')
				.dialog({
					title: 'Dictionary',
					minWidth: 620,
					minHeight: 530
				})
				.html(renderTerm(term));
		}
	}

	const renderTerm = (term) => {
		// Term -- audio player pronunciation -- phonetic pronunciation || Patient Information = related.drug_summary as a button
		// definition
			// aliases -- reduce matching 'type' keys. e.g.: All "Synonym" types are listed in one row. See also: https://www.cancer.gov/Dictionary.Service/v1/getTerm?dictionary=drug&termId=42657&language=English https://www.cancer.gov/publications/dictionaries/cancer-drug/def/isotretinoin
			// More Information = external links
			// Images
			// Videos

		const renderAliasesTable = (alias) => {
			let aliasMap = {};
			alias.map(item => {
				//console.log(item)
				if(aliasMap.hasOwnProperty(item.type) > 0){
					aliasMap[item.type].push(item.name);
				} else {
					aliasMap[item.type] = [item.name];
				}
			});

			let table = `<figure class="table"><table width="100%">
				${Object.keys(aliasMap).map(item => {
					return `<tr><th scope="row">${item}</th><td>${aliasMap[item].join("<br>")}</td></tr>`
				}).join('')}
				</table></figure>
			`;
			return table;
		}

		const renderMoreInfo = (items) => {
			//TODO: spanish language support for text
			let template = `
				<div class="related-resources">
					<h6>More Information</h6>
					<ul class="no-bullets">
						${items.map(item => `<li><a href="${item.url}">${item.text}</a></li>`)}
					</ul>
				</div>
			`;
			return template;
		}

		const renderImages = (images) => {
			//TODO: render as a carousel if more than two images?
			let template = `
				${images.map(item => `<figure><img src="${item.ref}" alt="${item.alt}" /><figcaption><div class="caption-container">${item.caption}</div></figcaption></figure>`)}
			`;
			return template
		}

		//TODO: render videos

		let template = `
			<dl>
				<dt class="term"><dfn>${term.term}</dfn></dt>
				${term.pronunciation ? `<dd class="pronunciation"><a href="${term.pronunciation.audio}" class="CDR_audiofile"><span class="hidden">listen</span></a> ${term.pronunciation.key}</dd>` : ''}
				${!!term.related.drug_summary.length ? `<dd class="info-summary"><a href="${term.related.drug_summary[0].url}"><img src="/images/btn-patient-info.gif" alt="Patient Information" title="Patient Information" width="139" height="20" hspace="12" border="0" align="absmiddle"></a></dd>` : ''}
				${term.definition.html ? `<dd class="definition">${term.definition.html}</dd>` : ''}
				${!!term.alias.length ? renderAliasesTable(term.alias) : ''}
				${!!term.related.external && !!term.related.external.length ? renderMoreInfo(term.related.external) : ''}
				${!!term.images && !!term.images.length ? renderImages(term.images) : ''}
			</dl>
		`;
		// this is to pull out newline characters which have been found to interfere with the period + blank space method for identifying end of first sentence, ie in "tumor" definition.
		//definition = definition.replace(/(\r\n|\n|\r)/gm," ");
		
		//linkAudioPlayer("#best-bet-definition .CDR_audiofile");

		return template;
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

// const carousel = () => {`<div`}

// `
// ${image.title && `<h1>${thing.title}</h1>`}
// ${ images && images.length > 1 ? buildCarousel(images) : imageTemplate(image)}

// `

// const imageTemplate = image => `<img src="${ image.src }"/>`