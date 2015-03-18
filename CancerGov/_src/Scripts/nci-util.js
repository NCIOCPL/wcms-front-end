var NCI = NCI || { // << this format enforces a Singleton pattern
    /*======================================================================================================
     * function linkToEmpty
     *
     *  will display an alert if a user clicks on a page that hasn't been created,
     *  and focus the user onto the search box
     *
     * trigger: onclick events (hardcoded in the mega menu)
     * returns: null
     * paramenters:
     *  event[]    (event)    The click event triggering this script
     *
     * TODO: remove this script after the usability prototype (it probably won't be useful in Devon Rex)
     *====================================================================================================*/
    linkToEmpty: function(event) {
        event.preventDefault();
        event.stopPropagation();

        var lang = document.documentElement.lang;
        var alertText = {
            'en': "The page you have requested does not yet exist on the prototype.",
            'es': "La página que ha solicitado no existe todavía en el prototipo. (to be translated)"
        };
        alert(alertText[lang] || alertText['en']);
        document.getElementById('swKeyword').focus();
    },

    /*======================================================================================================
     * function scrollTo
     *
     *  will scroll to an anchor almost anyhwere on the page WITHOUT causing the navbar to lay over the anchor
     *
     * returns: null
     * parameters:
     *  anchor[]    (string)(jQuery selector)    Selector of the anchor to be scrolled to.
     *
     * TODO: move JS from inside "js/pdq-linking.js" to here
     * TODO: make this script freeze Headroom?
     * TODO: make this script work for mobile accordions
     * TODO: make this script work for PDQ deeplinks
     *====================================================================================================*/
    scrollTo: function(anchor) {
        if(anchor.indexOf('#') < 0) {
            anchor = '#' + anchor;
        }

        // PDQ CIS
        if(anchor === "#section/all") {
            anchor = "#pdq-toc-article";
        }
        anchor = anchor.replace(/#.+\//, '#');

        // get the anchor's jQuery element
        var $anchor = $(anchor);
        // get the sticky nav jQuery element
        var $header = $('.fixedtotop');
        // get the sticky nav's height
        var headerHeight = $header.outerHeight();

        $('.headroom-area').addClass('frozen');
        window.scrollTo(0, $anchor.offset().top - headerHeight);
        setTimeout(function() {
            $('.headroom-area').removeClass('frozen');
        }, 1);
    },

    /*======================================================================================================
     * function buildTOC
     *
     *  will build the TOC for nearly any page. Just feed it the proper elements and it will build links to IDs and grab their contents.
     *
     * returns: null
     * parameters:
     *  toc_selector[".on-this-page"]     (string)(jQuery selector)    Selector of the div or aside to hold the Table of Contents.
     *                                                                 This will also probably be linked to the styling. Should contain a <ul>.
     *  content_selector["#accordion"]    (string)(jQuery selector)    Selector of content sections Container.
     *  section_selector["section"]       (string)(jQuery selector)    Selector of the section elements, relative to content_selector.
     *  title_selector["h2"]              (string)(jQuery selector)    Selector of the title of each section, relative to section.
     *  list_type["ul"]                   (string)(jQuery selector)    Selector that identifies the list, relative to the toc_selector.
     *
     * Tips: It may be possible to overload the selectors with any valid jQuery selector.
     *====================================================================================================*/
    buildTOC: function (toc_selector, content_selector, section_selector, title_selector, list_type) {
        var toc = (toc_selector || ".on-this-page"),
            content = (content_selector || "#accordion"),
            section = (section_selector || "section"),
            h_tag = (title_selector || "h2"),
            lt = (list_type || "ul"),
            sections = $(content + " " + section),
            $toc_ul = $(toc + " ul").empty(); // simultaneously clear the TOC

        for (i = 0; i < sections.length; i++) { // iterate through the section tags
            var s = sections[i]; // shorthand for the current section element
            var $s = $(s); // jQuery object shorthand
            if (s.id) { // Make sure we have an ID...
                var s_name = $s.children("h2").html(); // we don't need this unless we're making an <LI>
                $toc_ul.append("<li><a href='#" + s.id + "'>" + s_name + "</a></li>");
            }
        }
    },
	
	/*======================================================================================================
	 * function buildOTP
	 *
	 * This function can be used to create an "On This Page" section on any content with a raw HTML or Ephox
	 * body field. 
	 *
	 * returns: null
	 * parameters:
	 *  target["h2"]		(string)(jQuery selector)		Selector that identifies element used to create the
	 *														"on this page" block
	 *====================================================================================================*/
	buildOTP: function(target) {	
		// Get items inside div where id="cgvBody" and type equals value of 'target' (h2 by default).
		var $otpItems = $('#cgvBody ' + (target || 'h2'));
		
		// Create the 'On This Page' element		
		var otpTitle;
		if ($('html').attr("lang") === "es") {  
			otpTitle = 'En Este Página';
		} else {
			otpTitle = 'On This Page';
		}
		var otp = $('<nav>').addClass('on-this-page'); // Create nav 
		otp.append($('<h6>').text(otpTitle)); // Add titles as <h6>
		
		// Create a list out of the items found by $otpItems
		var otpList = $('<ul>'); 
		var otpItem; 
		for(var i = 0; i < $otpItems.length; i++) { 
			otpItem = $otpItems.get(i); // Get each item found by $otpItems
			// Add each to the OTP list; use header text for link text; link to the ID of the target header or parent
			$('<li>').append( 
				$('<a>').attr('href', ('#' + (otpItem.id || otpItem.parentElement.id))).text(otpItem.textContent.trim()) 
			).appendTo(otpList); 
		} 
		otpList.appendTo(otp); // Add list to 'On This Page' nav element
		otp.prependTo('#cgvBody > .slot-item:first'); // Add nav element inside "cgvBody" div
	},
	
    /*======================================================================================================
    * function doAccordion
    *
    *  will generate an accordion using jQuery UI
    *
    * returns: null
    * paramenters:
    *  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
    *  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
    *
    *====================================================================================================*/
    doAccordion: function(target, opts) {
        var defaultOptions = {
            heightStyle: "content",
            header: "h2",
            collapsible: true,
            active: false,
            /* override default functionality of accordion that only allows for a single pane to be open
            * source: http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once */
            beforeActivate: function (event, ui) {
                var icons = $(this).accordion('option', 'icons');
                // The accordion believes a panel is being opened
                var currHeader;
                if (ui.newHeader[0]) {
                    currHeader = ui.newHeader;
                    // The accordion believes a panel is being closed
                } else {
                    currHeader = ui.oldHeader;
                }
                var currContent = currHeader.next('.ui-accordion-content');
                // Since we've changed the default behavior, this detects the actual status
                var isPanelSelected = currHeader.attr('aria-selected') == 'true';

                // Toggle the panel's header
                currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', (!isPanelSelected).toString()).attr('aria-expanded', (!isPanelSelected).toString());

                // Toggle the panel's icon if the active and inactive icons are different
                if(icons.header !== icons.activeHeader) {
                    currHeader.children('.ui-icon').toggleClass(icons.header, isPanelSelected).toggleClass(icons.activeHeader, !isPanelSelected);
                }

                // Toggle the panel's content
                currContent.toggleClass('accordion-content-active', !isPanelSelected);
                if (isPanelSelected) {
                    currContent.slideUp();
                } else {
                    currContent.slideDown();
                }

                return false; // Cancels the default action
            },
            icons: {
                "header": "toggle",
                "activeHeader": "toggle"
            }
        };
        var options = $.extend({}, defaultOptions, opts || {});

        var $target = $(target);
        if($target.length > 0) {
            $(target).accordion(options);
        }
    },

    /*======================================================================================================
    * function undoAccordion
    *
    *  will destroy an accordion using jQuery UI
    *
    * returns: null
    * paramenters:
    *  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
    *  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
    *
    *====================================================================================================*/
    undoAccordion: function(target) {
        var $target = $(target);
        if($target.length > 0) {
            /* destroy the accordion if it's already been initialized */
            $(target).each(function() {
                if (typeof $(this).data("ui-accordion") != "undefined") {
                    $(this).accordion("destroy");
                }
            });
        }
    },

    /*======================================================================================================
    * function doAutocomplete
    *
    *  will generate an autocomplete box for an <input type="text"> element, using jQuery UI
    *
    * returns: null
    * paramenters:
    *  !target[]            (string)(jQuery selector)    Specific(!) selector of the input to be autocompleted.
    *  !url[]               (string)                     URL of the autocomplete service.
    *  contains[false]      (boolean)                    Boolean variable describing whether the autocomplete is for "starts with" (false) or "contains" (true).
    *  queryParam["term"]   (string)                     Primary search querystring parameter.
    *  queryString{}        (object)                     Additional parts of the querystring to pass to the autocomplete service.
    *  opts{}               (object)                     Other options to pass to jQuery UI's autocomplete function.
    *
    *====================================================================================================*/
    doAutocomplete: function(target, url, contains, queryParam, queryString, opts) {
        var $target = $(target);
        var queryParameter = queryParam || "term";
        var regexIsContains = contains || false;
        var defaultOptions = {
            // Set AJAX service source
            source: (function() {
                var xhr;

                return function( request, response ) {
                    var dataQuery = $.extend({}, queryString || {});
                    dataQuery[queryParameter] = request.term;

                    if ( xhr ) {
                        xhr.abort();
                    }
                    xhr = $.ajax({
                        url: url,
                        data: dataQuery,
                        dataType: "json",
                        success: function( data ) {
                            response( data );
                        },
                        error: function() {
                            response([]);
                        }
                    });
                };
            })(),

            // Start autocomplete only after three characters are typed
            minLength: 3,

            focus: function(event, ui) {
                event.preventDefault();
                event.stopPropagation();
                $target.val(ui.item.item);
            },
            select: function(event, ui) {
                event.preventDefault();
                event.stopPropagation();
                $target.val(ui.item.item);
            }
        };

        var options = $.extend({}, defaultOptions, opts || {});

        $target.autocomplete(options)
            .data('ui-autocomplete')._renderItem = function(ul, item) {
                //Escape bad characters
                var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, '\$&');
                var regexBold = new RegExp();

                if (regexIsContains) {
                    // highlight autocomplete item if it appears anywhere
                    regexBold = new RegExp('(' + lterm + ')', 'i');
                } else {
                    // highlight autocomplete item if it appears at the beginning
                    regexBold = new RegExp('(^' + lterm + '|\\s+' + lterm + ')', 'i');
                }
                var word = item.item.replace(regexBold, "<strong>$&</strong>");

                return $("<li></li>")
                    .data('ui-autocomplete-item', item)
                    .append(word)
                    .appendTo(ul);
            };
    },

    Search: {
        classname: "searching",
        init: function() {
            $(".nav-search").click(NCI.Search.mobile.show);

        },
        mobile: {
            clear: function() {
                $("#swKeyword").val("");
            },
            show: function(e) {
                var menu_btn = $(".open-panel"),
					s = NCI.Search;
                $("#nvcgSlMainNav").addClass(s.classname);
                if (!$("#searchclear").length) {
                    $("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
                }
                menu_btn.unbind("click").click( NCI.Search.mobile.hide );
            },
            hide: function(e) {
                $("#nvcgSlMainNav").removeClass( NCI.Search.classname );
                NCI.Nav.$openPanelBtn.unbind("click").click( NCI.Nav.open );
            }
        }
    },

    
    Nav: {
        openClass: "openNav",
        openPanelClass: "open-panel",
        mobile: "#mega-nav > .nav-menu",
        /* visible only on mobile, this is the menu bar itself, with hamburger & search buttons */
        mega: "#mega-nav",
        /* Mega Nav is the huge RawHTML content block on desktop, but becomes the menu tree on mobile */
		hasChildren: ".has-children",
        $mobile: $(), // This will hold a ref to the jQuery object, saving us a lookup.
        $mega: $(), // This will hold a ref to the jQuery object, saving us a lookup.
        $openPanelBtn: $(),
		$hasChildren: $(),
        init: function() {
            var n = NCI.Nav;
            // Since we can't guarantee that our doc is ready when this script is loaded,
            // we'll need to initialize on document.ready() in all.js

			// init our jquery object references
            n.$mobile = $(n.mobile);
            n.$mega = $(n.mega);
            n.$openPanelBtn = $("."+n.openPanelClass);
            n.$openPanelBtn.click(n.toggleMobileMenu);
			n.$hasChildren = $(n.hasChildren);

			// wire up our resize function
            $(window).on('load resize', n.resize);

			// wire up the "close button" (anything that's outside the mobile menu)
            $("#content, header, footer, .headroom-area").click(n.close);

			// wire up the scroll event for the mobile menu positioning
            $(window).scroll(function(e){
                if(NCI.Nav.isOpen()){
                    NCI.Nav.$mega.offset({
                        "top": $(".fixedtotop").offset().top,
                        "left": "0px"
                    });
                }
            });

            // insert the +/- buttons into the menu
            var btn = $('<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>');
            n.$mega.find(".has-children > div")
				.append(btn)
			// wire up +/- button click events
				.find(".toggle").click(n.toggleClick);

			// expand all children of the current page or contains-current
			n.$mega.find(".current-page > div > .toggle, .contains-current > div > .toggle")
				.attr("aria-expanded","true");

        },
        isOpen: function () { return $("html").hasClass(NCI.Nav.openClass); },
        open: function () {
            var n = NCI.Nav;
            if (!n.isOpen()) {
                $("html").addClass(NCI.Nav.openClass);
                NCI.Nav.$mobile.attr('aria-hidden', 'false');
                $('.fixedtotop.scroll-to-fixed-fixed').css('left', "80%");
                $("."+NCI.Nav.openClass+" "+NCI.Nav.mega).offset({
                    "top": $(".fixedtotop").offset().top, 
                    "left": "0px"
                });

                // Enable swiping to close
                $("#page").swipe({
                    swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
                        this.close()
                    }.bind(n),
                    threshold: 10 // default is 75 (for 75px)
                });
            }
        },
        close: function() {
            var n = NCI.Nav;
            if (n.isOpen()) {
                $("html").removeClass(n.openClass);
                $('.fixedtotop.scroll-to-fixed-fixed').css('left', "0px");
                n.$mobile.attr('aria-hidden', 'true');

                // We do a timeout here, because we have no way of knowing when
                // the CSS animation of the menu is done. We have to remove the
                // style in case the browser is made to be dekstop width, at which
                // point the applied style would affect the mega menu display
                setTimeout(function() { 
                    this.$mega.removeAttr("style"); 
                }.bind(n), 1000);

                // Disable swiping to close
                $("#page").swipe("destroy");
            }
        },
        toggleMobileMenu: function() {
            var n = NCI.Nav;
            if (n.isOpen()) { n.close(); } 
            else { n.open(); }
        },
		toggleClick: function(e) {
			// Business Logic:
			// * there is no active state, and no highlight state anymore. Current Page is highlighted always
			// * Cannot collapse the current page.
			e.stopPropagation();
            var $this = $(this),
				yes = 'true',
				no = 'false',
				aria = "aria-expanded",
				item = ".mobile-item",
				expanded = "["+aria+"='"+yes+"']",
				closed = "["+aria+"='"+no+"']",
				li = $this.closest(".has-children"),
				isExpanded = $this.attr(aria);

			switch (isExpanded) {
				case yes: // CLOSING
					li.find(expanded).attr(aria, no); // set the button state 
					// hide the child menu-item of the parent li of the button we clicked
					li.children(".menu-item").slideToggle("slow",Function.prototype);
					break;
				case no: // EXPANDING
					// First we need to close all the expanded things
					$("#mega-nav "+expanded).attr(aria, no)
						.closest(".has-children").children(item).slideToggle("slow", Function.prototype);
					// Open the menu-item that is the child of the li that is the parent of the clicked button
					$this.attr(aria, yes); // set the button state
					li.find(".mobile-item li").show();
					
					break;
				default:
					return e;
			}
			/*
            if (aria_expanded == 'true' ) {
                closest.find("button[aria-expanded='true']").closest("li").children("ul").slideToggle("slow", function() {
                    //Animation complete
                });
                closest.find(".toggle").attr('aria-expanded','false');
                // Stop processing
                return;
            }
            else if (aria_expanded == 'false' ) { // If the toggle is closed, do this
                // close any open siblings and their children...
                closest.siblings().children("div").children("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
                    //Animation complete
                });
                // ...and add proper ARIA to indicate those siblings and children are closed
                closest.siblings().children("div").children("button").attr('aria-expanded','false');
                // slide open list of nav elements for selected button
                closest.children("ul").slideToggle( "slow", function() {
                    // Animation complete.
                });
                // add ARIA to indicate this section has been opened
                t.attr('aria-expanded','true');
                return;
            }
			*/

		},
        resize: function() {
			if (NCI.Nav.isOpen()) {
				//NCI.Nav.$mobile.css('height', $(window).height());
			}
        }
    },
	breakpoints: {
		small: 480,
		medium: 640,
		large: 1024,
		xlarge: 1280,
		init: function() {
			// Create the #breakpoints element
			// read the content from it into the vars
			// Destroy the #breakpoints element
		}
	}
};

