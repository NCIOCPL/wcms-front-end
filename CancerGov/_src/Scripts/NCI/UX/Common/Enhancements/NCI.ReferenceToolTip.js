define(function(require) {
	var $ = require('jquery');

	// Plugins
	require('jquery-ui');
	require("UX/Common/Plugins/Widgets/jquery.ui.customtooltip"); //This is the custom tooltip jQUeryUI widget.	


	// Enhancement global vars:
	var timerLength = 1000;

	//Setup some global vars for showing and hiding the tooltips.
	//var hideTimer, showTimer;


	function _initialize() {

		$('a[href^="#cit"], a[href^="#r"]')		
			.filter(function () {
				// filter to verify ONLY citations are selected, otherwise this will match things like a[href="references"]
				return /^#r\d+$|^#cit\/section_\d+.\d+$/.test(this.getAttribute('href'));
			})
			.each(function () {

				var $el = $(this);

				$el.data("nci-reftooltip-timhide", false);
				$el.data("nci-reftooltip-timshow", false);

				// Enable a mouse enter event on the tool tip link
				$el.on('mouseenter.NCIEvt.referencetooltip', function (e) {

					//If there is a hide timer or show timer, then clear them.
					$el.data("nci-reftooltip-timhide") && clearTimeout($el.data("nci-reftooltip-timhide"));
					$el.data("nci-reftooltip-timshow") && clearTimeout($el.data("nci-reftooltip-timshow"));

					//Set a new timeout for showing the tooltip.
					$el.data(
						"nci-reftooltip-timshow",
						setTimeout(_hoverHandler, timerLength, $el)
					);					

				}).on('mouseleave.NCIEvt.referencetooltip', function () {
					//We are stoping hovering over the reference link, so we need to hide the 
					//tooltip.  
					clearTimeout($el.data("nci-reftooltip-timshow"));
					_hide($el);
				}).on('click.NCIEvt.referencetooltip', function () {
					//If we click on the anchor link, then we should jump to the reference on the
					//page.  If a Table Enlarge dialog is open, then we should close it.
					var $this = $(this);
					$this.closest('figure.table.ui-dialog-content').dialog('close');
					$this.trigger('mouseleave.NCIEvt.referencetooltip');
				});

			});
	}

	/*	
	  ----------------------------------
	  -----  INTERNAL FUNCTIONS  -------
	  ----------------------------------
	*/

	/**
	 * Finds the contents of the reference a link (a) is pointing to. 
	 * @param  {[type]} link The link (a) element that points to the reference
	 * @return {[type]}      The reference HTML element - only if it exists and is an LI element
	 */
	function _findRefContent(link) {

		var refID = link.attr('href')
			.replace(/^#cit\//, '#')
			.replace(/^#/, '')
			.replace(/\./, '\\.'); //Need to escape .

		var refelem = $('li#' + refID);

		return (typeof refelem === 'undefined') ? false : refelem;
	}

	/**
	 * Internal function to show a tool tip popup
	 * @param  {[type]} $toolTipLink A jquery wrapped <a> element with an href pointing to the reference anchor	 
	 */
	function _show($toolTipLink) {

		var tooltipNode = $toolTipLink.data("nci-reftooltip");
		var tooltipPopup = $toolTipLink.data("nci-reftooltip-popup");

		if (tooltipPopup) {
			clearTimeout($toolTipLink.data("nci-reftooltip-timhide"));
			return;
		}

		if (tooltipNode) {			

			$toolTipLink.data(
				"nci-reftooltip-popup",			
				tooltipNode.customtooltip({
					displayClose: false,
					autoOpen: true,
					dialogClass: "nci-ui-arrow_box",
					show: {
						duration: 100,
						easing: "swing"
					},
		            position: {
		                my: "left bottom-12",
		                at: "left top",
		                collision: "flipfit flip",
		                of: $toolTipLink,	                
		                using: function (position, feedback) {
		                    $(this).css(position);

							var arrow = $( "<div>" )
		                        .addClass( "arrow" )
		                        .addClass( feedback.horizontal );

		                    //The box is appearing above the link.
		                    if (feedback.vertical == "bottom") {
		                    	//Add the arrow below the box
		                    	arrow.addClass("under-bottom");
	                    		arrow.appendTo( this );
		                    } else {
		                    	//Assume that it is showing below		                    	
		                    	arrow.addClass("on-top");
		                    	$(this).prepend(arrow);
		                    }
		                        
		                    //Position the arrow either right or left.
		                    if (feedback.horizontal == "left") {
		                        arrow.css({
		                            "margin-left": "8px"
		                        });
		                    } else {
		                        arrow.css({
		                            "margin-right": "8px"
		                        });
		                    }
		                }
		            },	        
				})
			);
		} else {
			console.log("_show : There is no tooltip node.");
		}

/*
		if (!tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11) {
			document.body.appendChild(tooltipNode);
			checkFlip = true;
		}
		$(tooltipNode).stop().animate({
			opacity: 1
		}, 100);
*/
		
		clearTimeout($toolTipLink.data("nci-reftooltip-timhide"));
	}

	function _hide($toolTipLink) {		

		var tooltipNode = $toolTipLink.data("nci-reftooltip");
		
		if (tooltipNode) {

			//Set the hide timout
			$toolTipLink.data(
				"nci-reftooltip-timhide",
				setTimeout(
					function () {

						var tooltipPopup = $toolTipLink.data("nci-reftooltip-popup");

						if (tooltipPopup) { 
							tooltipPopup.customtooltip("close");							
							$toolTipLink.data("nci-reftooltip-popup", false);
						}						

						tooltipNode.remove();
						$toolTipLink.data("nci-reftooltip", false);

						/*
						$(tooltipNode).animate(
							{ opacity: 0 }, 
							100,
							function () {
								tooltipNode.remove();
								$toolTipLink.data("nci-reftooltip", false);
								$toolTipLink.data("nci-reftooltip", false);
							}
						);
						*/
					}, 
					100
				)
			);
		}				
	}

	function _hoverHandler($toolTipLink) {

		// Don't show on smartphone
		var width = window.innerWidth || $(window).width();
		if (width <= NCI.Breakpoints.medium) {
			return;
		}

		//Get the reference content
		var refElem = _findRefContent($toolTipLink);

		//If the reference content does not exist, then return
		if (!refElem) {
			return;
		}

		//create an empty node for the tool tip.  It does not eneed to be attached to the document...
		var $content_elem = $("<div></div>", {
			'class': 'referencetooltip'
		});

		//Create a copy of the reference and place it into a UL element
		$content_elem.append(			
			refElem.clone(true).html()
		);

		var dataelem = $toolTipLink.data('nci-reftooltip');

		if (typeof dataelem === "undefined" || dataelem === false) {			
			$toolTipLink.data('nci-reftooltip', $content_elem);
		} else {
			console.log("Tooltip Node Has a Tooltip");
		}

		//Attach handlers to make sure we keep showing the element if the mouse moves in, and we
		//hide when the mouse moves out.
		$content_elem
			.on('mouseenter.NCIEvt.referencetooltip', function() {
				_show($toolTipLink);
			})
			.on('mouseleave.NCIEvt.referencetooltip', function(){
				_hide($toolTipLink);
			});

	
		//Show this thing
		_show($toolTipLink);
	}

	/**
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();

			initialized = true;
		}
	};


});