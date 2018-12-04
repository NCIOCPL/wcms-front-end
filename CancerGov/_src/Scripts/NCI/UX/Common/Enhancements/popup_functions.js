import $ from 'jquery';
import dictionary from 'Data/DictionaryService';
import queryString from 'query-string';
import * as config from 'Modules/NCI.config';
import linkAudioPlayer from 'Modules/linkAudioPlayer/linkAudioPlayer';
import flexVideo from 'Modules/videoPlayer/flexVideo';
// import imageCarousel from './image-carousel';

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
			// parse querystring so we can get definition id and dictionary
			let params = queryString.parse(urlargs);
			// id's are prefixed with "CDR0000" in the html but the backend service errors out if included in request
			let id = Object.keys(params)[0].replace("CDR0000",''); 
			console.log("params",params);
			// Cancer.gov is not defined as a dictionary in DictionaryService so we assign it 'term'
			let lookup = params.dictionary === 'Cancer.gov' ? 'term' : params.dictionary;

			// fetch the term data from the service using ajax
			$.when(_getTerm(lookup,id)).done(function (termObject) {
				//TODO: error returns 404 html page, not an error object
				if (termObject.term) {
					console.log("term",termObject.term);
					// if we have a term in our return JSON, trigger the modal which will render the JSON data
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

		// check if modal exists already, else create it and kick off render
		if ($("#modal_definition")[0]) {
			$("#modal_definition").html(renderTerm(term)).dialog("open");
		} else {
			// create a new modal window
			$('<div id="modal_definition"></div>')
				.dialog({
					title: config.lang.Definition_Title[lang],
					minWidth: 620,
					maxHeight: 800,
					modal: true,
					position: {
						my: "top",
						at: "top+10%",
						of: window
					},
					resizable: false,
					show: { effect: "fade", duration: 250 },
					hide: { effect: "fade", duration: 250 },
					open: function(){
						$('.ui-widget-overlay').addClass('clickable').on('click', function (evt) {
							$('#modal_definition').dialog("close");
						});
					}
				})
				.html(renderTerm(term));
		}

		// After the template has been rendered, initialize JS modules
		// initialize audio player
		if(!!term.pronunciation) {
			linkAudioPlayer("#modal_definition .CDR_audiofile");
		}

		// initialize video player
		if(!!term.videos && term.videos.length) {
			flexVideo();
		}
	}

	const renderTerm = (term) => {
		// Term -- audio player pronunciation -- phonetic pronunciation || Patient Information = related.drug_summary as a button
		// definition
			// aliases -- reduce matching 'type' keys. e.g.: All "Synonym" types are listed in one row. See also: https://www.cancer.gov/Dictionary.Service/v1/getTerm?dictionary=drug&termId=42657&language=English https://www.cancer.gov/publications/dictionaries/cancer-drug/def/isotretinoin
			// More Information = external links
			// Images
			// Videos

		// render aliases, often seen in drug definitions.
		const renderAliasesTable = (alias) => {
			// transform the data into something easier to render
			// [{alias:'abc',name:1},{alias:'abc',name:2},{alias:'abc',name:3}] => {alias: [1,2,3]}
			let aliasMap = {};
			alias.map(item => {
				if(aliasMap.hasOwnProperty(item.type) > 0){
					aliasMap[item.type].push(item.name);
				} else {
					aliasMap[item.type] = [item.name];
				}
			});

			// create and return the table with all the aliases
			let table = `<figure class="table"><table width="100%">
				${Object.keys(aliasMap).map(item => {
					return `<tr><th scope="row">${item}</th><td>${aliasMap[item].join("<br>")}</td></tr>`
				}).join('')}
				</table></figure>
			`;
			return table;
		}

		// render and data in the term.related.external object which are external links in a list
		//TODO: items.term seems to refer to dictionary pages, which will no longer exist post migration. Should these links refresh a definition modal following an api call? Should there be a way to navigate back?
		const renderMoreInfo = (items) => {
			let template = `
				<div class="related-resources">
					<h5>${config.lang.More_Information[lang]}</h5>
					<ul class="no-bullets">
						${items.external.map(item => `<li><a href="${item.url}">${item.text}</a></li>`).join('')}
						${items.summary.map(item => `<li><a href="${item.url}">${item.text}</a></li>`).join('')}
						${items.term.map(item => `<li>Definition of: <a href="/Common/PopUps/popDefinition.aspx?id=${item.id}&amp;version=healthprofessional&amp;language=English&amp;dictionary=${item.dictionary.toLowerCase()}"
						onclick="javascript:popWindow('defbyid','CDR0000${item.id}&amp;version=healthprofessional&amp;language=English&amp;dictionary=${item.dictionary.toLowerCase()}'); return(false);">${item.text}</a></li>`).join('')}
					</ul>
				</div>
			`;
			return template;
		}

		// render any images
		const renderImages = (images) => {
			//TODO: render as a carousel if more than two images?
			let template = `
				${images.map(item => `<figure style="width: 75%; margin: 0 auto"><img src="${item.ref}" alt="${item.alt}" /><figcaption><div class="caption-container">${item.caption}</div></figcaption></figure>`).join('')}
			`;
			return template
		}

		// render any videos
		const renderVideos = (videos) => {
			//TODO: render as a carousel if more than two images?
			//TODO: combine images and videos into a multimedia carousel?
			let template = `
				${videos.map(item => `<figure class="video center size75">
					<div class="flex-video widescreen"
							data-video-id="${item.unique_id}"
							data-video-title="${item.title}">
						<noscript><p><a href="https://www.youtube.com/watch?v=${item.unique_id}" target="_blank">${config.lang.View_On_Youtube[lang]}</a></p></noscript>
					</div>
					<figcaption class="caption-container no-resize">${item.caption}</figcaption>
				</figure>`).join('')}
			`;
			return template
		}

		// this is the complete template that will be rendered to the dialog popup. It will conditionally check for data values before attempting to render anything. This way we can avoid property undefined errors and empty DOM nodes.
		//TODO: still no info on what term.related.summary and term.related.term are used for, what their data structure is, and if they're ever populated by the service
		let hasMoreInfo = !!term.related.external && !!term.related.external.length || !!term.related.summary && !!term.related.summary.length || !!term.related.term && !!term.related.term.length;

		console.log(hasMoreInfo)
		let template = `
			<dl>
				<dt class="term"><dfn><h4>${term.term}</h4></dfn></dt>
				${term.pronunciation ? `<dd class="pronunciation"><a href="${term.pronunciation.audio}" class="CDR_audiofile"><span class="hidden">listen</span></a> ${term.pronunciation.key}</dd>` : ''}
				${!!term.related.drug_summary.length ? `<dd class="info-summary"><a href="${term.related.drug_summary[0].url}"><img src="/images/btn-patient-info.gif" alt="Patient Information" title="Patient Information" width="139" height="20" hspace="12" border="0" align="absmiddle"></a></dd>` : ''}
				${term.definition.html ? `<dd class="definition">${term.definition.html}</dd>` : ''}
				${!!term.alias.length ? renderAliasesTable(term.alias) : ''}
				${hasMoreInfo ? renderMoreInfo(term.related) : ''}
				${!!term.images && !!term.images.length ? renderImages(term.images) : ''}
				${!!term.videos && term.videos.length ? renderVideos(term.videos) : ''}
			</dl>
		`;

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