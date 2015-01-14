// write the mobile menu
$(document).ready(function() {
	var $sectionNav = $('#section-nav');
	writeSectionLevel(theLevel, 0, 3).appendTo($sectionNav);
	styleSectionNav();
	functionSectionNav();

	// Determine the page language
	if(!lang) {
		var lang = $('html').attr('lang');
	}
});
/* TODO: Make this load the menu asyncronously. !important */
if(!json) {
	// Load the file
	var x = new XMLHttpRequest();

	//json file name here
	x.open("GET","includes/menu.json",false);
	try {
		x.send();
	} catch(e) {
		console.log("Can't open \"menu.json\".");
		exit();
	}
	var file = x.responseText;

	// De-JSON the menu
	var json = JSON.parse(file);
	console.log(json);
}

// Get the name of the page you are on
var mysplit = window.location.pathname.split("/");
var pagename = mysplit[mysplit.length-1];

var sectionNavName;
var theLevel;


switch (pagename){
	// About Cancer
	case "aboutcancer-causes.shtml":
	case "aboutcancer-prevention-p.shtml":
	case "aboutcancer-prevention-hp.shtml":
		sectionNavName = 'aboutcancer-causes.shtml';
		theLevel = json.menu[0].children[0].children[1];
		break;
	case "aboutcancer-what.shtml":
	case "aboutcancer-ccc.shtml":
		sectionNavName = 'aboutcancer-what.shtml';
		theLevel = json.menu[0].children[0].children[0];
		break;
	case "aboutcancer-treatment.shtml":
		sectionNavName = 'aboutcancer-treatment.shtml';
		theLevel = json.menu[0].children[0].children[4];
		break;

	// Cancer Types
	case "cancertypes-location.shtml":
		sectionNavName = 'cancertypes-location.shtml';
		theLevel = json.menu[0].children[1].children[0];
		break;
	case "cancertypes-childhood.shtml":
		sectionNavName = 'cancertypes-childhood.shtml';
		theLevel = json.menu[0].children[1].children[1];
		break;
	case "cancertypes-aya.shtml":
		sectionNavName = 'cancertypes-aya.shtml';
		theLevel = json.menu[0].children[1].children[2];
		break;

	// Cancer Types - Colorectal Cancer
	case "cancertypes-colorectal.shtml":
	case "cancertypes-colorectal-hp.shtml":
	case "cancertypes-colorectal-research.shtml":
	case "cancertypes-colorectal-pdq-patient.shtml":
	case "cancertypes-colorectal-pdq-patient-es.shtml":
	case "cancertypes-colorectal-pdq-hp.shtml":
	case "cancertypes-colorectal-other-resources.shtml":
	case "cancertypes-colorectal-tests.shtml":
		sectionNavName = 'cancertypes-location.shtml';
		theLevel = json.menu[0].children[1].children[3];
		break;
	// Cancer Types - Lung Cancer
	case "cancertypes-lung.shtml":
	case "cancertypes-lung-hp.shtml":
	case "cancertypes-lung-research.shtml":
	case "cancertypes-nsclc-pdq-patient.shtml":
	case "cancertypes-nsclc-pdq-patient-es.shtml":
	case "cancertypes-nsclc-pdq-hp.shtml":
	case "cancertypes-other-resources.shtml":
	case "cancertypes-secondhand-smoke.shtml":
		sectionNavName = 'cancertypes-location.shtml';
		theLevel = json.menu[0].children[1].children[4];
		break;

	// Research
	case "research-priorities.shtml":
		sectionNavName = 'research-priorities.shtml';
		theLevel = json.menu[0].children[2].children[0];
		break;
	case "research-how.shtml":
		sectionNavName = 'research-how.shtml';
		theLevel = json.menu[0].children[2].children[2];
		break;
	case "research-areas.shtml":
	case "research-areas-ct.shtml":
	case "content-template.shtml":
		sectionNavName = 'research-areas.shtml';
		theLevel = json.menu[0].children[2].children[3];
		break;

	// Grants & Training
	case "grants-process.shtml":
		sectionNavName = 'grants-process.shtml';
		theLevel = json.menu[0].children[3].children[1];
		break;
	case "grants-research.shtml":
	case "grants-research-funding.shtml":
		sectionNavName = 'grants-research.shtml';
		theLevel = json.menu[0].children[3].children[0];
		break;
	case "grants-training.shtml":
		sectionNavName = 'grants-training.shtml';
		theLevel = json.menu[0].children[3].children[3];
		break;

	// News & Events
	case "news-pr.shtml":
	case "news-pr-2014.shtml":
	case "news-pr-lung-map.shtml":
		sectionNavName = 'news-pr.shtml';
		theLevel = json.menu[0].children[4].children[0];
		break;
	case "news-media.shtml":
	case "news-media-broll.shtml":
	case "news-media-multicultural.shtml":
	case "news-media-multicultural-lifelines.shtml":
	case "news-media-multicultural-lifelines-breast.shtml":
	case "news-media-multicultural-lifelines-cervical.shtml":
	case "news-media-multicultural-webinar.shtml":
		sectionNavName = 'news-media.shtml';
		theLevel = json.menu[0].children[4].children[1];
		break;
	case "news-events.shtml":
		sectionNavName = 'news-events.shtml';
		theLevel = json.menu[0].children[4].children[2];
		break;
	case "news-blog.shtml":
		sectionNavName = 'news-blog.shtml';
		theLevel = json.menu[0].children[4].children[3];
		break;
	case "news-contacts.shtml":
		sectionNavName = 'news-contacts.shtml';
		theLevel = json.menu[0].children[4].children[4];
		break;

	// About NCI
	case "aboutnci-ov.shtml":
		sectionNavName = 'aboutnci-ov.shtml';
		theLevel = json.menu[0].children[5].children[0];
		break;
	case "aboutnci-org.shtml":
		sectionNavName = 'aboutnci-org.shtml';
		theLevel = json.menu[0].children[5].children[2];
		break;
	case "aboutnci-org-oar.shtml":
		sectionNavName = 'aboutnci-org.shtml';
		theLevel = json.menu[0].children[5].children[8];
		break;

	// Resources For
	case "resources.shtml":
		sectionNavName = 'resources.shtml';
		theLevel = json.menu[0].children[6].children[0];
		break;
	case "resources-advocates-policymakers.shtml":
	case "resources-health-professionals.shtml":
		sectionNavName = 'resources-advocates-policymakers.shtml';
		theLevel = json.menu[0].children[6].children[0];
		break;

	default:
		break;
}

// utility function used to check if an item is contained by a node
function isValueInChild(needle, haystack, strict) {
	if(typeof strict === "undefined") {
		strict = false;
	}
	for(var item in haystack) {
		if ((strict ? haystack[item] === needle : haystack[item] == needle) || ((typeof haystack[item] === "object") && isValueInChild(needle, haystack[item], strict))) {
			return true;
		}
	}
	return false;
}
// utility function used to check for children
function hasChildren(object) {
	return (('children' in object) && (object.children.length > 0));
}

// write section nav
function writeSectionLevel (sublevel, currentLevel, maxLevel) {
	// if this node should be ignored, break and don't print it or its children
	if(typeof sublevel.ignoreIn !== "undefined" && sublevel.ignoreIn.indexOf("section") > -1) {
		return;
	}
	if(typeof sublevel.title[lang] === "undefined") {
		return;
	}

	// evaluate optional parameters 'currentLevel' and 'maxLevel'
	currentLevel = (typeof currentLevel === "undefined") ? 0 : currentLevel;
	maxLevel = (typeof maxLevel === "undefined") ? 0 : maxLevel;

	var liChildrenHidden = (sublevel.hidechildren || sublevel.hidechildren === "true" || sublevel.hidechildren==="yes");

	var liIsCurrent = (pagename===sublevel.url[lang]);
	var currentWithinChildren = isValueInChild(pagename, sublevel);

	// start printing the current node
	var li = $('<li class="' +
							'level-' + currentLevel +
							(hasChildren(sublevel) ? ' has-children' : '') +
							(liChildrenHidden ? ' hidden-children' : '') +
							(currentWithinChildren ? ' contains-current' : '') +
						'">');
	var div = $('<div' +
								(liIsCurrent ? ' class="current-page"' : '') +
							'>');
	var a = $('<a href="' + (sublevel.url[lang]) + '">' +
							(sublevel.title[lang]) +
						'</a>');
	a.appendTo(div);
	// if this node has children, increment the level and prepare to print them
	if(hasChildren(sublevel) && !liChildrenHidden) {
		if(currentLevel < maxLevel || maxLevel === 0) {
			// print the toggle button (if this is not a level-0 node)
			if(currentLevel !== 0) {
				var button = $('<button aria-expanded="false" class="toggle" type="button">' +
												'<p class="hidden">Open child elements</p>' +
											'</button>');
				button.appendTo(div);
			}
			div.appendTo(li);

			// start the list of children
			var ul = $('<ul>');

			currentLevel++;
			// iterate through each child and print them (and any children they may have)
			for (var i = 0; i < sublevel.children.length; i++) {
				var liChild = writeSectionLevel(sublevel.children[i], currentLevel, maxLevel);
				liChild.appendTo(ul);
			}

			// end the list of children
			ul.appendTo(li);
		}
	} else {
		div.appendTo(li);
	}
	// end the current node
	return li;
}

function styleSectionNav() {
	// style the parents
	var currentPage = $('.current-page');
	var nextParent = currentPage.parent('li').parent('ul');
	while(!nextParent.is('#section-nav') && nextParent.length > 0) {
		// expand the parent
		nextParent.parent('li').children('div').children('.toggle').attr('aria-expanded','true');
		// go to the next parent in the list
		nextParent = nextParent.parent('li').parent('ul');
	}
	$('#section-nav li > div > .toggle[aria-expanded="false"]').parent('div').parent('li').children('ul').hide();

	$('#section-nav div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
		$(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
		$(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
	});

	// enable the button to show
	$(document).ready(function() {
		// make the section menu button show ONLY for medium down when we're building a section nav
		// (otherwise it's hidden entirely)
		$('#section-menu-button').addClass('show-for-medium-down');
		// add margin to prevent the button from overlaying the page header
		$('.contentzone').addClass('has-section-nav');
	});


}

// section menu functionality
function functionSectionNav() {
	// Add toggle functionality
	$('.section-nav .toggle').click(function(event) {
		// If the toggle is open, do this
		if ($(this).attr('aria-expanded') == 'true' ) {
			$(this).closest("li").find("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
				//Animation complete
			});
			$(this).closest("li").find(".toggle").attr('aria-expanded','false');
			// add highlight back to parent
			$(this).closest("li").removeClass("highlight");
			// Stop processing
			return;
		}

		// If the toggle is closed, do this
		if ($(this).attr('aria-expanded') == 'false' ) {
			// close any open siblings and their children...
			$(this).closest("li").siblings().children("div").children("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
				//Animation complete
			});
			// ...and add proper ARIA to indicate those siblings and children are closed
			$(this).closest("li").siblings().children("div").children("button").attr('aria-expanded','false');
			// slide open list of nav elements for selected button
			$(this).closest("li").children("ul").slideToggle( "slow", function() {
				// Animation complete.
			});
			// add ARIA to indicate this section has been opened
			$(this).attr('aria-expanded','true');
			// remove highlight class from any other items
			$(this).closest("ul").children("li").removeClass("highlight");
			// add highlight class to this item
			$(this).closest("li").addClass("highlight");
			return;
		}
	});

	function clickSectionButton() {
		// slide up section nav
		$('#section-nav').slideToggle(200, function() {
			// remove open class from button
			$('#section-menu-button').toggleClass('open', $(this).is(':visible'));
			$('#section-nav').toggleClass('open', $(this).is(':visible'));
			if($('#section-nav').is(':visible')) {
				/* section nav is OPEN */
				// append overlay div to content area for grey page overlay
				$("#content").append("<div id='overlay'></div>");
				// enable clicking outside the section-menu to close
				$('#overlay').click(clickSectionButton);
			} else {
				/* section nav is CLOSED */
				// remove grey overlay div
				$("#overlay").remove();
			}
		});
	}

	$('#section-menu-button').click(function(e) {
		e.preventDefault();
		clickSectionButton();
	});
}

/* showing/hiding the section navigation */
$(document).ready(function() {
	var curWidth = window.innerWidth || $(window).width(),
	    oldWidth = curWidth;

	$(window).resize(function() {
		curWidth = window.innerWidth || $(window).width();
		if(oldWidth > 1024 && curWidth <= 1024) {
			/* if we've gone from desktop to mobile */
			// hide the setion navigation
			$('#section-nav').hide();
		} else if (oldWidth <= 1024 && curWidth > 1024) {
			/* if we're at a desktop resolution */
			// remove the overlay
			$("#overlay").remove();
			// show the section navigation
			$('#section-nav').show();
			// remove some mobile-only classes
			$('#section-nav').removeClass('open');
			$('#section-menu-button').removeClass('open');
		}
		oldWidth = curWidth;
	}).trigger('resize');
});
