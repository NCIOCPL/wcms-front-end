// This file is for the PDQ Cancer Information Summary UX functionality
$(function() {
//(function($) {
  //alert("Start");
  
  // Add the container DIV to insert the SectionNav list
  // as the first element of the DIV.summary-sections container
  var topTocDiv = "<div id='pdq-toptoc' class='toptoc'></div>";
  $( ".summary-sections > section:eq( 0 )" ).before(topTocDiv);

  // JQuery Function: topToc()
  // This function selects the H2 elements from the "article" container
  // element and creates a one-level table of content 
  // ------------------------------------------------------------------
  // Function formerly known as TOPTOC.js
  // ------------------------------------------------------------------
  $.fn.topToc = function( options ) {
    //alert("In topToc Start");
	//Our default options
	var defaults = {
		search:    "body",     //where we will search for titles
		depth:     1,          //how many hN should we search
		start:     2,          //which hN will be the first (and after it we 
                               //go just deeper)
		stocTitle: "Contents", //what to display before our box
		listType: "ul",        //could be ul or ol
        tocTitleEn: "Sections",
        tocTitleEs: "Secciones",
        beforeText: "",        // can add <span class="text-class">
        afterText: "",         // can add </span> to match beforeText
		smoothScroll: 1
	};

	//let's extend our plugin with default or user options when defined
	var options = $.extend(defaults, options);

    // Select the language tag to pick the proper text for headings
    // TBD:  Are KeyPoints H3 or H4???
    // ------------------------------------------------------------
    if ($('meta[name="content-language"]').attr('content') == 'es')
       defaults.stocTitle = '<h3>' + defaults.tocTitleEs + '</h3>';
    else
       defaults.stocTitle = '<h3>' + defaults.tocTitleEn + '</h3>';


    return this.each(function() {
		//"cache" our target and search objects
		obj = $(this); //target
		src = $(options.search); //search

        // if container is not found.
        if (!src || 0 === src.length) {
            return;
        } 

		//let's declare some variables. We need this var declaration to 
        //create them as local variables (not global)
		var appHTML = "", 
            tagNumber = 0, 
            txt = "", 
            id = "", 
            beforeTxt = options.beforeText, 
            afterTxt = options.afterText, 
            previous = options.start, 
            start = options.start, 
            depth = options.depth, 
            i = 0, 
            srcTags = "h" + options.start, 
            cacheHN = "";
        //    kp = options.kp;

        //// Turn off the KeyPoint header (coming from the TOC box) (VE)
        //if (kp == 1)
        //    options.stocTitle = ""

		//which tags we will search
		while ( depth > 1) {
			start++; //we will just get our start level and numbers higher than it
			srcTags = srcTags + ", h" + start;
			depth--; //since went one level up, our depth will go one level down
		}
        // if the target is not found
        var found = src.find(srcTags);
        if (!found || 0 === found.length) {
            return;
        }

        found.each(function() { 
			//we will cache our current H element
			cacheHN = $(this);
			//if we are on h1, 2, 3...
			tagNumber = ( cacheHN.get(0).tagName ).substr(1);

			//sets the needed id to the element
            //if it doesn't have one, of course
            // --------------------------------------------------
			id = cacheHN.attr('id');
            if (id == "" || typeof id === "undefined") { 
				id = "stoc_h" + tagNumber + "_" + i;
				cacheHN.attr('id', id);
			}
			//our current text
			txt = cacheHN.text();

            // Suppressing certain sections from TOC
            // The KeyPoint headings are only displayed in the KeyPoint
            // boxes (section level TOC) but not in the document 
            // level TOC.  That means we'll have to suppress the KP
            // headings when searching on the body or article level but
            // need to include them at the section level.
            // --------------------------------------------------------
            if (options.search == 'body' || options.search == 'article') {
                hAttr = cacheHN.attr("type");
            }
            else {
                hAttr = '';
            }

            // We also suppress headings for Reference sections and the
            // heading for the KP box itself.
            // ---------------------------------------------------------
            //if (txt == 'References' || txt == 'Key Points for This Section' 
            //                        || hAttr == 'keypoint') {
            //    txt = '';
            // }
            if (txt != 'References' && txt != 'Key Points for This Section' 
                                    && hAttr != 'keypoint') {

			switch(true) {                    //with switch(true) we can do 
                                              //comparisons in each case
				case (tagNumber > previous) : //it means that we went down 
                                              //one level (e.g. from h2 to h3)
						appHTML = appHTML + "<" + options.listType +"><li>"
                                          + beforeTxt +"<a href=\"#"
                                          + id + "\">" + txt 
                                          + "</a>";
						previous = tagNumber;
					break;
				case (tagNumber == previous) : //it means that stay on the 
                                               //same level (e.g. h3 and 
                                               //stay on it)
						appHTML = appHTML + "</li><li>"+ beforeTxt 
                                          + "<span show=\""
                                          + id + "\">" + txt 
                                          + "</span>";
					break;
				case (tagNumber < previous) : //it means that we went up but 
                                              //we don't know how much levels  
                                              //(e.g. from h3 to h2)
						while(tagNumber != previous) {
							appHTML = appHTML + "</" + options.listType 
                                       +"></li>";
							previous--;
						}
						appHTML = appHTML + "<li>"+ beforeTxt 
                                          + "<a href=\"#"
                                          + id + "\">" + txt 
                                          + "</a>";
					break;
			}
            }
			i++;
		});
        appHTML = appHTML + "<li class='viewall'>View Entire Summary</li>"
		//corrects our last item, because it may have some opened ul's
		while(tagNumber != options.start && tagNumber > 0) {
			appHTML = appHTML + "</" + options.listType +">";
			tagNumber--;
		}
		//append our html to our object
		appHTML = options.stocTitle + "<"+ options.listType + ">" + appHTML + "</" + options.listType + ">";
		//$('#_toc_article').append(appHTML);
		obj.append(appHTML); // orig

		//our pretty smooth scrolling here
		// acctually I've just compressed the code so you guys will think that I'm the man . Source: http://css-tricks.com/snippets/jquery/smooth-scrolling/
		if (options.smoothScroll == 1) {
			$(window).load(function(){
				function filterPath(string){return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'')}var locationPath=filterPath(location.pathname);var scrollElem=scrollableElement('html','body');obj.find('a[href*=#]').each(function(){var thisPath=filterPath(this.pathname)||locationPath;if(locationPath==thisPath&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,'')){var $target=$(this.hash),target=this.hash;if(target){var targetOffset=$target.offset().top;$(this).click(function(event){event.preventDefault();$(scrollElem).animate({scrollTop:targetOffset},400,function(){location.hash=target})})}}});function scrollableElement(els){for(var i=0,argLength=arguments.length;i<argLength;i++){var el=arguments[i],$scrollElement=$(el);if($scrollElement.scrollTop()>0){return el}else{$scrollElement.scrollTop(1);var isScrollable=$scrollElement.scrollTop()>0;$scrollElement.scrollTop(0);if(isScrollable){return el}}}return[]}
			});
		}
    });
    //alert("In topToc End");
  }


  // JQuery Function: topToc()
  // This function selects the H2 elements from the "article" container
  // element and creates a one-level table of content 
  // ------------------------------------------------------------------
  // Function formerly known as InThisSummary.js
  // ------------------------------------------------------------------
  $.fn.showSection = function( options ) {
     //alert("In showSection Start");
        // Adding some default settings
        var settings = $.extend({
            text: "Default Text",
            color: null
        }, options); 


        return this.each( function() {
            //alert("SS Dada");
			// hide all sections
            $( ".summary-sections > section").addClass("hide");
			// ... and then show the first section of the page
            $( ".summary-sections > section:eq( 0 )").removeClass("hide")
                                                     .addClass("show");
            // Also need to "select" the item for CSS to be applied
            $( "#pdq-toptoc > ul > li:eq( 0 )").addClass("selected");

            // If any of the section Nav items are pressed do the following
            // ------------------------------------------------------------
            $("#pdq-toptoc li").click(function() {
                //alert("its - Volker");
                $(document).scrollTop(0);
                // Do nothing if the highlighted section is pressed again
                if ( $( this ).hasClass("selected")) {
                    x = 'do_nothing';
                }
                else if ( $( this ).hasClass("viewall")) {
                    $( ".selected").removeClass("selected");
                    $( this ).addClass("selected");
                    $("section.hide").removeClass("hide")
                                     .addClass("show");
                }
                else {
                    // Highlighting of the TOC elements
                    $( ".selected").removeClass("selected");
                    $( this ).addClass("selected");

                    // Display of SummarySections
                    var jumpTo = $( this ).find("span")
                                          .attr("show");
                    $( "section.show").removeClass("show")
                                      .addClass("hide");
                    //jumpTo = "_section" + jumpTo.substring(0, jumpTo.length - 4);
                    openSection = "#" + jumpTo;
                    //alert(openSection);
                    $(openSection).parent()
                                  .removeClass("hide")
                                  .addClass("show");
                }
            });
        });
    //alert("In showSection End");
    };


  // JQuery Function: topToc()
  // This function selects the H2 elements from the "article" container
  // element and creates a one-level table of content 
  // ------------------------------------------------------------------
  // Function formerly known as InThisSummary.js
  // ------------------------------------------------------------------
  $.fn.previousNext = function( options ) {
    //alert("In previousNext Start");
    var defaults = {
        footer:   "Prev Next"
    };

	//let's extend our plugin with default or user options when defined
	var options = $.extend(defaults, options);

  // Add the Previous/Next navigation to the bottom of the page
  var pnNav = ""
  pnNav = pnNav + "<div class='row show-for-large-up "
  pnNav = pnNav + "previous-next-links collapse'>";
  pnNav = pnNav + "<div class='large-6 columns previous-link'>";
  pnNav = pnNav + "<a>&lt; Previous section</a>";
  pnNav = pnNav + "<br><em data-role='previous'></em></div>";
  pnNav = pnNav + "<div class='large-6 columns next-link'>";
  pnNav = pnNav + "<a>Next section &gt;</a>";
  pnNav = pnNav + "<br><em data-role='next'></em></div>";
  pnNav = pnNav + "</div>";

    defaults.footer = pnNav;
    //alert(defaults.footer);

    $(this).children("section").append(pnNav);

    //return  $( "div.summary-sections > section").each( function() {
    //        obj = $(this);
    //    $( "div.summary-sections > section em" ).addClass("DADA");
    //    
    //    //$( "div.summary-sections > section" ).each( function() {
//
    //        var pSecId    = obj.prev("section").attr("id");
    //        var pSecTitle = obj.prev("section").children("h2").text();
    //        alert(pSecTitle);
    //        var nSecId    = obj.next("section").attr("id");
    //        var nSecTitle = obj.next("section").children("h2").text();
//
    //        // Add the title of the prev/next sections
    //        $( "em[data-role='previous']" ).append(pSecTitle);
    //        $( "em[data-role='next']" ).append(nSecTitle);
    //        
    //        // Add the links of the prev/next sections
    //        $( "em[data-role='previous']" ).attr("href", pSecId);
    //        $( "em[data-role='next']" ).attr("href", nSecId);
        //})

    //});
    //alert("In previousNext End");
    };



  // Creating the Section Nav in the pdq-toptoc DIV
  // All content within the article tag is used
  // ------------------------------------------------------------
  $("#pdq-toptoc").topToc({ search: "article" });

  // Preparing the sections with the show/hide attributes
  // ------------------------------------------------------------
  $("#pdq-toptoc ul").showSection( { } );

  // Adding the previous/next navigation
  // ------------------------------------------------------------
  $("div.summary-sections").previousNext( { footer: "dada" } );

  //alert("End");
//})(jQuery);
});

