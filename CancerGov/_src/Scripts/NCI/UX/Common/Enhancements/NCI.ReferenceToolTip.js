define(function(require) {
	var $ = require('jquery');

	// Plugins
	require('jquery-ui');
	require("NCI/UX.Common/Plugins/Widgets/jquery.ui.customtooltip"); //This is the custom tooltip jQUeryUI widget.	


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
	}


	// Enhancement global vars:
	var timerLength = 1000;


	function _initialize() {

		$('a[href^="#cit"], a[href^="#r"]')		
			.filter(function () {
				// filter to verify ONLY citations are selected, otherwise this will match things like a[href="references"]
				return /^#r\d+$|^#cit\/section_\d+.\d+$/.test(this.getAttribute('href'));
			})
			.each(function () {
				var tooltipNode, hideTimer, showTimer, checkFlip;


				// Enable a mouse enter event on the tool tip link
				$(this).on('mouseenter.NCI.tooltip', function (e) {
					var that = this;

					//If there is a hide timer or show timer, then clear them.
					hideTimer && clearTimeout(hideTimer);
					showTimer && clearTimeout(showTimer);

					//Set a new time for showing the tooltip.
					showTimer = setTimeout(_hoverHandler, timerLength);
				}).on('mouseleave.NCI_tooltip', function () {
					clearTimeout(showTimer);
					_hide(this);
				}).on('click.NCI_tooltip', function () {
					var $this = $(this);
					$this.closest('figure.table.ui-dialog-content').dialog('close');
					$this.trigger('mouseleave.NCI.tooltip');
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

		var refID = link.getAttribute('href')
			.replace(/^#cit\//, '#')
			.replace(/^#/, '');

		refelem = $('li' + refID).get();

		return refelem == undefined ? false : refelem;
	}


	function _show() {
		if (!tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11) {
			document.body.appendChild(tooltipNode);
			checkFlip = true;
		}
		$(tooltipNode).stop().animate({
			opacity: 1
		}, 100);
		clearTimeout(hideTimer);
	}

	function _hide() {
		if (tooltipNode && tooltipNode.parentNode == document.body) {
			hideTimer = setTimeout(function () {
				$(tooltipNode).animate({
					opacity: 0
				}, 100, function () {
					document.body.removeChild(tooltipNode);
				});
			}, 100);
		}
	}

	function _hoverHandler() {

		// Don't show on smartphone
		var width = window.innerWidth || $(window).width();
		if (width <= NCI.Breakpoints.medium) {
			return;
		}

		//Get the reference content
		var refElem = findRef(that);

		//If the reference content does not exist, then return
		if (!refElem) {
			return;
		}


		//create an empty node for the tool tip.  It does not eneed to be attached to the document...
		var $content_elem = $("<div></div>", {
			'class': 'referencetooltip'
		});

		//Create a copy of the reference and place it into a UL element
		$content_elem.appendChild(
			$('<ul></ul')
			.appendChild(
				refElem.cloneNode(true)
			)
		);

		//Attach handlers to make sure we keep showing the element if the mouse moves in, and we
		//hide when the mouse moves out.
		$content_elem.on('mouseenter.NCI_tooltip', _show).on('mouseleave.NCI_tooltip', _hide);

		//Show this thing
		_show();
	}

});