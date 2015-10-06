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


	function _initialize() {
		var timerLength = 1000;

		$('a[href^="#cit"], a[href^="#r"]')		
			.filter(function () {
				// filter to verify ONLY citations are selected, otherwise this will match things like a[href="references"]
				return /^#r\d+$|^#cit\/section_\d+.\d+$/.test(this.getAttribute('href'));
			})
			.each(function () {
				var tooltipNode, hideTimer, showTimer, checkFlip = false;

				//Why is this defined here????
				function findRef(h) {
					h = document.getElementById(
						h.getAttribute('href')
						.replace(/^#cit\//, '#')
						.replace(/^#/, '')
					);
					h = h && h.nodeName == "LI" && h;

					return h;
				}

				//Why is this here too???
				function hide(refLink) {
					if (tooltipNode && tooltipNode.parentNode == document.body) {
						hideTimer = setTimeout(function () {
							$(tooltipNode).animate({
								opacity: 0
							}, 100, function () {
								document.body.removeChild(tooltipNode);
							});
						}, 100);
					}
					//$(findRef(refLink)).removeClass('RTTarget');
				}

				// Ugg this will need to go.
				function show() {
					if (!tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11) {
						document.body.appendChild(tooltipNode);
						checkFlip = true;
					}
					$(tooltipNode).stop().animate({
						opacity: 1
					}, 100);
					clearTimeout(hideTimer);
				}


				// Enable a mouse enter event on the tool tip link
				$(this).on('mouseenter.NCI.tooltip', function (e) {
					var that = this;

					//If there is a hide timer or show timer, then clear them.
					hideTimer && clearTimeout(hideTimer);
					showTimer && clearTimeout(showTimer);

					//Set a new time for showing the tooltip.
					showTimer = setTimeout(hoverHandler, timerLength);

					function hoverHandler() {

						// Don't show on smartphone
						var width = window.innerWidth || $(window).width();
						if (width <= NCI.Breakpoints.medium) {
							return;
						}

						//Get the reference content
						var h = findRef(that);

						if (!h) {
							return;
						}


						/*if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + $(window).height() > $(h).offset().top + h.offsetHeight) {
							$(h).addClass('RTTarget');
							//return;
						}*/

						if (!tooltipNode) {
							tooltipNode = document.createElement('ul');
							tooltipNode.className = "referencetooltip";
							var c = tooltipNode.appendChild(h.cloneNode(true));
							tooltipNode.appendChild(document.createElement('li'));
							$(tooltipNode).on('mouseenter.NCI.tooltip', show).on('mouseleave.NCI.tooltip', hide);
						}
						show();
						var offset = $(that).offset(),
							offsetHeight = tooltipNode.offsetHeight;
						$(tooltipNode).css({
							top: offset.top - offsetHeight,
							left: offset.left - 7
						});
						if (tooltipNode.offsetHeight > offsetHeight) { // is it squished against the right side of the page?
							$(tooltipNode).css({
								left: 'auto',
								right: 0
							});
							tooltipNode.lastChild.style.marginLeft = (offset.left - tooltipNode.offsetLeft) + "px";
						}
						if (checkFlip) {
							if (offset.top < tooltipNode.offsetHeight + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + $(".fixedtotop").outerHeight()) { // is part of it above the top of the screen?
								$(tooltipNode).addClass("RTflipped").css({
									top: offset.top + 12
								});
							} else if (tooltipNode.className === "referencetooltip RTflipped") { // cancel previous
								$(tooltipNode).removeClass("RTflipped");
							}
							checkFlip = false;
						}
					}
				}).on('mouseleave.NCI.tooltip', function () {
					clearTimeout(showTimer);
					hide(this);
				}).on('click.NCI.tooltip', function () {
					var $this = $(this);
					$this.closest('figure.table.ui-dialog-content').dialog('close');
					$this.trigger('mouseleave.NCI.tooltip');
				});



			});

	}

});