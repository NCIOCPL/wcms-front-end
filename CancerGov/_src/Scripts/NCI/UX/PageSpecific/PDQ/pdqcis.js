import { lang } from 'Modules/NCI.config';
import * as Page from 'Common/Enhancements/NCI.page';
import { wrapAll, createEl, getData } from 'Utilities/domManipulation';
import { makeAllAccordions } from 'Modules/accordion/accordion';
import 'Common/polyfills/prepend';


const onDOMContentLoaded = () => {
	// Fetch the article outline that was created in Common.js
	const outline = getData(document.querySelector('article'),'nci-outline');

	buildOnThisPage(outline.sections[0]);

	// Secondly creating all of the section-level TOCs
	// Note: This will only be used for TOC, not if Keypoints exist for the section
	buildInThisSection(outline.sections[0]);

	// Wrapping the summary sections in a DIV to create the accordion for the mobile layout
	wrapAll('.summary-sections > section','div',{class:'accordion'});

	makeAllAccordions();

	// fix citation anchor links
	// if you see console errors that say something like: '#section_1.3 h2' is not a valid selector, they're coming from analytics.
	document.getElementById('cgvBody').addEventListener('click',(e)=>{
		if(e.target.hash && e.target.hash.match("#cit/")){
			e.preventDefault();
			const anchor = e.target.hash.replace("#cit/","");
			window.location.hash = anchor;
		}
	});
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

const ignoreList = {
	heading: ['h6', '[do-not-show="toc"]'],
	node: ['aside']
};

// Create the table of contents for the article.
// Levels 1
const buildOnThisPage = (outline) => {
	let $nav = createEl('nav',{class:'on-this-page',role:'navigation'});
	$nav.innerHTML = `<h6>${lang.OnThisPage[Page.lang]}</h6>`;
	const $list = Page.parseOutline(outline, 1, 1, ignoreList);

	// check for list before inserting
	if($list){
		$nav.appendChild($list[0]);
		document.querySelector('.summary-sections').prepend($nav);
	}
};

// Create the table of contents for the individual sections.
// Levels: 2, 3
const buildInThisSection = (outline) => {
	outline.sections.map((section,i) => {
		let $nav = createEl('nav',{class:'onthispage in-this-section',role:'navigation'});
		$nav.innerHTML = `<h6>${lang.InThisSection[Page.lang]}</h6>`;
		const $list = Page.parseOutline(section, 2, 3, ignoreList);

		// check for list before inserting
		if($list) {
			$nav.appendChild($list[0]);
			document.querySelectorAll('.pdq-sections')[i].prepend($nav);
			//document.querySelectorAll('.pdq-sections > section:first-of-type')[i].prepend($nav);
		}
	});
};