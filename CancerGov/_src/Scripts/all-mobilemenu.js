// write the mobile menu
$(document).ready(function() {
	var $mobileNav = $('#mobile-nav > .nav-menu');
	writeLevels(json.menu[0], 0, 3).appendTo($mobileNav);
	styleTheNav();
	functionTheNav();
});

// Determine the page language (defaults to 'en')
if(!lang) {
	var lang = $('html').attr('lang');
}
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

// utility function used to check for children
function hasChildren(object) {
	return (('children' in object) && (object.children.length > 0));
}
// write mobile main nav
function writeLevels(sublevel, currentLevel, maxLevel) {
	// if this node should be ignored, break and don't print it or its children
	if(typeof sublevel.ignoreIn !== "undefined" && sublevel.ignoreIn.indexOf("mobile main") > -1) {
		return;
	}
	if(typeof sublevel.title[lang] === "undefined") {
		return;
	}

	// evaluate optional parameters 'currentLevel' and 'maxLevel'
	currentLevel = (typeof currentLevel === "undefined") ? 0 : currentLevel;
	maxLevel = (typeof maxLevel === "undefined") ? 0 : maxLevel;

	// start printing the current node
	var li = $('<li' +
	             ((hasChildren(sublevel)) ? ' class="has-children"' : '') +
	           '>');
	var div = $('<div' +
	              /*(pagename===(sublevel.url[lang]) ? ' class="current-page"' : '') +*/
	            '>');
	var a = $('<a href="' + (sublevel.url[lang]) + '">' +
	            (sublevel.title[lang]) +
	          '</a>');
	a.appendTo(div);
	// if this node has children, increment the level and prepare to print them
	if(hasChildren(sublevel)) {
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
				var liChild = $(writeLevels(sublevel.children[i], currentLevel, maxLevel));
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

// Global mobile nav functionality
function styleTheNav() {
	$('#mobile-nav li li div > .toggle[aria-expanded="false"]').parent('div').parent('li').children('ul').hide();
	// highlight active items
	$("#mobile-nav li li > div > .toggle[aria-expanded='true']").closest("li").addClass("highlight");
	$('#mobile-nav .nav-menu > li').addClass("highlight");

	$('#mobile-nav div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
		$(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
		$(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
	});
}

function functionTheNav() {
	// Add toggle functionality
	$('#mobile-nav .toggle').click(function(event) {
		event.stopPropagation();
		// If the toggle is open, do this
		if ($(this).attr('aria-expanded') == 'true' ) {
			$(this).closest("li").find("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
				//Animation complete
			});
			$(this).closest("li").find(".toggle").attr('aria-expanded','false');
			// remove highlight class
			$(this).closest("li").removeClass("highlight");
			// add highlight back to parent
			$(this).closest('li').parent('ul').parent('li').addClass('highlight');
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
			$(this).closest("#mobile-nav").find("li").removeClass("highlight");
			// add highlight class to this item
			$(this).closest("li").addClass("highlight");
			return;
		}
	});
}
