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
    var strViewAll = "";
    if ($('meta[name="content-language"]').attr('content') == 'es') {
       defaults.stocTitle = '<h3>' + defaults.tocTitleEs + '</h3>';
       strViewAll = "Ver todas las secciones";
    }
    else {
       defaults.stocTitle = '<h3>' + defaults.tocTitleEn + '</h3>';
       strViewAll = "View All Sections";
    };

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
        appHTML = appHTML + "<li class='viewall'>"
                          + "<span>"
                          + strViewAll
                          + "</span>"
                          + "</li>";
		//corrects our last item, because it may have some opened ul's
		while(tagNumber != options.start && tagNumber > 0) {
			appHTML = appHTML + "</" + options.listType +">";
			tagNumber--;
		}
		//append our html to our object
		appHTML = options.stocTitle + "<"+ options.listType + ">" + appHTML + "</" + options.listType + ">";
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


  // JQuery Function: showSection()
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
                    // Need to display the article level TOC
                    $("#pdq-toc-article").removeClass("hide")
                                            .addClass("show");
                    // ... and hide the section level TOC
                    $("div.pdq-on-this-page").addClass("hide");
                    // ... and hide the Previous/Next navigation links
                    $("div.next-link").addClass("hide");
                    $("div.previous-link").addClass("hide");
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
                    $("#pdq-toc-article").removeClass("show")
                                            .addClass("hide");
                    // ... and hide the section level TOC
                    $("div.pdq-on-this-page").removeClass("hide");
                    // ... and show the Previous/Next navigation links
                    $("div.next-link").removeClass("hide");
                    $("div.previous-link").removeClass("hide");

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


  // JQuery Function: previousNext()
  // This function selects the H2 elements from the "article" container
  // element and creates a one-level table of content 
  // ------------------------------------------------------------------
  // Function to create the Previous/Next Navigation
  // ------------------------------------------------------------------
  $.fn.previousNext = function( options ) {
    //alert("In previousNext Start");
    var defaults = {
        footer:   "Prev Next"
    };

	//let's extend our plugin with default or user options when defined
	var options = $.extend(defaults, options);

    // Select the language tag to pick the proper text for headings
    // TBD:  Are KeyPoints H3 or H4???
    // ------------------------------------------------------------
    var strPrev = "";
    var strNext = "";
    if ($('meta[name="content-language"]').attr('content') == 'es') {
       strPrev = "Secci&#243;n anterior";
       strNext = "Siguiente secci&#243;n";
    }
    else {
       strPrev = "Previous section";
       strNext = "Next section";
    };

    $(this).children("section").each(function(index, elem) {

       // Add the Previous/Next navigation to the bottom of each section
       var pnDivL = "<div class='row show-for-large-up ";
       pnDivL = pnDivL + "previous-next-links collapse'>";
       var pDivL = "<div class='large-6 columns previous-link'>";
       var pLinkL = "<a href='#";
       var pLinkR = "'>&lt; " + strPrev + "</a>";
       var pTitleL = "<br><em>";
       var pTitleR = "</em>";
       var pDivR = "</div>";
       var nDivL = "<div class='large-6 columns next-link'>";
       var nLinkL = "<a href='#";
       var nLinkR = "'>" + strNext + " &gt;</a>";
       var nTitleL = "<br><em>";
       var nTitleR = "</em>";
       var nDivR = "</div>";
       var pnDivR = "</div>";

       // Extract the section ID and section title of previous/next section
       var prevTitle = $(this).prev("section").children("h2").text();
       var prevId    = $(this).prev("section").attr("id");
       var nextTitle = $(this).next("section").children("h2").text();
       var nextId    = $(this).next("section").attr("id");

       // Concatenate everything
       var pnFooter = ""
       pnFooter = pnFooter + pnDivL + pDivL
       if ( prevId ) {
           pnFooter = pnFooter + pLinkL + prevId + pLinkR;
           pnFooter = pnFooter + pTitleL + prevTitle + pTitleR;
       }
       pnFooter = pnFooter + pDivR + nDivL
       if ( nextId ) {
           pnFooter = pnFooter + nLinkL + nextId + nLinkR;
           pnFooter = pnFooter + nTitleL + nextTitle + nTitleR;
       }
       pnFooter = pnFooter + nDivR + pnDivR

       // Add the footer to the section
       $(this).append(pnFooter);
    });

    //alert("In previousNext End");
    };


  // JQuery Function: stoc()
  // This function creates the table of contents for the article and
  // for the individual sections.
  // The TOC starts on H-level 3 and goes 2 levels deep.
  // ------------------------------------------------------------------
  // Function to create the TOC (Table Of Contents)
  // ------------------------------------------------------------------
 $.fn.stoc = function(options) {
    //console.log("In stoc start");
    //Our default options
    var defaults = {
        search: "body",        //where we will search for titles
        depth: 6,              //how many hN should we search
        start: 1,              //which hN will be the first (and after it we
                               //go just deeper)
        stocTitle: "Contents", //what to display before our box
        listType: "ul",        //could be ul or ol
        tocTitleEn: "Table of content for this section",
        tocTitleEs: "Tabla de contenidos para esta secci&#243;n",
        beforeText: "", // can add <span class="text-class">
        afterText: "", // can add </span> to match beforeText
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

    // Need to identify if this is a HP or patient summary.  If it's a
    // patient summary we'll create KeyPoint boxes.
    // KeyPoint titles are H-tags with a type='keypoint' attribute
    if ( $("h3[type='keypoint']").length
           + $("h4[type='keypoint']").length > 0 ) {
        var kp = 1;
    }
    else {
        kp = 0;
    }


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

        // Turn off the KeyPoint header (coming from the TOC box) (VE)
        if (kp == 1)
            options.stocTitle = ""

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
            // using html() instead of text() since there could be markup
            txt = cacheHN.html();

            // Suppressing certain headings from TOC
            // The KeyPoint headings are only displayed in the KeyPoint
            // boxes (section level TOC) but not in the document
            // level TOC.  That means we'll have to suppress the KP
            // headings when searching on the body or article level but
            // need to include them at the section level.
            // Note:
            //   The prototype is using a different section-level
            //   structure.  A top-level section acts like an article
            //   and the search needs to be adjusted.
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
            if (txt != 'References' 
                    && txt.substring(0, 14) != 'Key Points for'
                    && txt.substring(0, 10) != 'Bibliograf'
                    && txt.substring(0, 14) != 'Puntos importa'
                    && hAttr != 'keypoint'
                    && txt != 'Sections') {
                switch(true) {                //with switch(true) we can do
                                              //comparisons in each case
                case (tagNumber > previous) : //it means that we went down
                                              //one level (e.g. from h2 to h3)
                        appHTML = appHTML + "<" + options.listType + ">"
                                          + "<li>"
                                          + beforeTxt
                                          + "<a href=\"#"+ id + "\">"
                                          + txt
                                          + "</a>";
                        previous = tagNumber;
                    break;
                case (tagNumber == previous) : //it means that stay on the
                                               //same level (e.g. h3 and
                                               //stay on it)
                        appHTML = appHTML + "</li>"
                                          + "<li>"
                                          + beforeTxt
                                          + "<a href=\"#" + id + "\">"
                                          + txt
                                          + "</a>";
                    break;
                case (tagNumber < previous) : //it means that we went up but
                                              //we don't know how much levels
                                              //(e.g. from h3 to h2)
                        while(tagNumber != previous) {
                            appHTML = appHTML + "</" + options.listType +">"
                                              + "</li>";
                            previous--;
                        }
                        appHTML = appHTML + "<li>"
                                          + beforeTxt
                                          + "<a href=\"#" + id + "\">"
                                          + txt
                                          + "</a>";
                    break;
                }
            }
            i++;
        });
        //corrects our last item, because it may have some opened ul's
        while(tagNumber != options.start && tagNumber > 0) {
            appHTML = appHTML + "</" + options.listType +">";
            tagNumber--;
        }

        // Clean up our Percussion workaround entry
        // We had to include text within the empty container div to prevent
        // Percussion from messing up the divs.  Setting text to blank now
        // ----------------------------------------------------------------
        //if ( $("div.#pdq-toc-article").length == 1
        //                         && $("div.keyPoints").length == 0 ) {
        //    $("div.#_toc_section").text("");
        //    }

        //append our html to our object
        appHTML = options.stocTitle
                  + "<"+ options.listType + ">"
                  + appHTML
                  + "</" + options.listType + ">";

        // In the special case when we encounter a patient summary that
        // does contain citations (citations are only contained in HP
        // summaries except for one CAM summary) we need to suppress
        // the display of the TOC header without list items.
        emptyHTML = options.stocTitle
                  + "<"+ options.listType + ">"
                  + "</" + options.listType + ">";
        if ( appHTML != emptyHTML ) {
            obj.append(appHTML);
        }

        // SMOOTH SCROLL ------------------------------------------------
        // our pretty smooth scrolling here
        // acctually I've just compressed the code so you guys will think
        // that I'm the man.
        // Source: http://css-tricks.com/snippets/jquery/smooth-scrolling/
        if (options.smoothScroll == 1) {
            $(window).load(function(){
                function filterPath(string){return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'')}var locationPath=filterPath(location.pathname);var scrollElem=scrollableElement('html','body');obj.find('a[href*=#]').each(function(){var thisPath=filterPath(this.pathname)||locationPath;if(locationPath==thisPath&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,'')){var $target=$(this.hash),target=this.hash;if(target){var targetOffset=$target.offset().top;$(this).click(function(event){event.preventDefault();$(scrollElem).animate({scrollTop:targetOffset},400,function(){location.hash=target})})}}});function scrollableElement(els){for(var i=0,argLength=arguments.length;i<argLength;i++){var el=arguments[i],$scrollElement=$(el);if($scrollElement.scrollTop()>0){return el}else{$scrollElement.scrollTop(1);var isScrollable=$scrollElement.scrollTop()>0;$scrollElement.scrollTop(0);if(isScrollable){return el}}}return[]}
            });
        }
    });
    //console.log("In stoc End");
 };



// *** END Functions *** ****************************************


  // Creating the Section Nav in the pdq-toptoc DIV
  // All content within the article tag is used
  // ------------------------------------------------------------
  $("#pdq-toptoc").topToc({ search: "article" });

  // Preparing the sections with the show/hide attributes
  // ------------------------------------------------------------
  $("#pdq-toptoc ul").showSection( { } );

  // Creating the previous/next navigation links
  // ------------------------------------------------------------
  $("div.summary-sections").previousNext( { footer: "dada" } );

  // Showing the previous/next section when the link is clicked
  // ------------------------------------------------------------
  $("div.summary-sections > section > div.row a").click(function() {
      $(document).scrollTop(0);
      $("section.show").removeClass("show").addClass("hide");
      var open = $(this).attr("href");
      var link = open.substr(1, open.length - 1);
      $("section[id="+link+"]").removeClass("hide").addClass("show");

      // Also need to add the attribute 'selected' to the section nav
      var titleId = $("section[id="+link+"]").children("h2").attr("id");
      $("div#pdq-toptoc li.selected").removeClass("selected")
      $("span[show="+titleId+"]").parent("li")
                                 .addClass("selected");
  });

  // Creating the TOC entries by calling the stoc function
  // -----------------------------------------------------------
  // First create the div container for the article TOC
  var tocArticle = "<div id='pdq-toc-article' class='on-this-page hide'>"
                 + "</div>";
  $("div#pdq-toptoc").after(tocArticle);
  // Then insert the list
  $("#pdq-toc-article").stoc( { search: "article", 
                                start: 2, depth: 3,
                                tocTitleEn: "ON THIS PAGE", 
                                tocTitleEs: "En esta p&#225;gina" });

  // Secondly creating the TOC container for sections
  var tocSection = "<div class='pdq-on-this-page'></div>";
  $("section.pdq-sections").prepend(tocSection);
  $("section.pdq-sections").each(function() {
      var sectionId = $(this).attr("id");
      $(this).children("div").attr("id", "_toc" + sectionId);
  });

  // Creating all of the section level TOCs
  // ------------------------------------------------------------
  // Output created:
  //$("#_toc_section_4_1").stoc( { search: "#_4", start: 3, depth: 2,
  //                           tocTitleEn: "",
  //                           tocTitleEs: "" });
  $("div.summary-sections").children("section").each(function() {
      var sectionId = $(this).attr("id");
      var tocId = $(this).children("section.pdq-sections").attr("id");
      var hasKeyPoints = $(this).find("div.key-points");
      if (hasKeyPoints.length === 0) {
          $("#_toc"+tocId).stoc( { search: "#"+sectionId, 
                                   start: 3, depth: 2,
                                   tocTitleEn: "", 
                                   tocTitleEs: "" });
      }
  });

  //alert("End");
//})(jQuery);
});

