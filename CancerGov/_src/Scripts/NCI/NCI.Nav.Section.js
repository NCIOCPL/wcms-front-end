NCI.Nav.Section = {
	sel: '.section-nav',
	selWithChildren: '.section-nav .has-children',
	idOpenerButton: 'section-menu-button',

	$section: $(),
	$withChildren: $(),
	$openerButton: $(),

	init: function() {
		var _s = NCI.Nav.Section,
			toggle = NCI.Buttons.toggle;

		_s.$section = $(_s.sel);

		if(_s.$section.length > 0) {
			// make the button to open the section nav
			_s.$openerButton = $('<a>')
				.attr('id', _s.idOpenerButton)
				.attr('href', '#')
				.text('Section Menu')
				.on('click', _s.onOpenerClick)
				.insertAfter('.fixedtotop');
			// add margin to prevent the button from overlaying the page header
			$('.contentzone').addClass('has-section-nav');

			_s.$withChildren = $(_s.selWithChildren + '> div');

			// add +/- buttons to section nav
			toggle.createFor(_s.$withChildren.not('.level-0 > div')).on('click', toggle.clickSection);

			_s.$withChildren.parent('li').find("div.current-page > " + toggle.sel + ", .contains-current > div > " + toggle.sel)
				.attr("aria-expanded", "true").children('span').text(toggle._innerText[toggle.lang]['true']);


			/* showing/hiding the section navigation when switching between desktop and mobile */
			var curWidth = window.innerWidth || $(window).width(),
			oldWidth = curWidth;

			$(window).resize(function() {
				curWidth = window.innerWidth || $(window).width();
				if(oldWidth > 1024 && curWidth <= 1024) {
					/* if we've gone from desktop to mobile */
					// hide the setion navigation
					_s.$section.hide();
				} else if (oldWidth <= 1024 && curWidth > 1024) {
					/* if we're at a desktop resolution */
					// remove the overlay
					$('#overlay').remove();
					// show the section navigation
					_s.$section.show();
					// remove some mobile-only classes
					_s.$section.removeClass('open');
					_s.$openerButton.removeClass('open');
				}
				oldWidth = curWidth;
			}).trigger('resize');
		}
	},

	onOpenerClick: function(e) {
		e.stopPropagation();
		e.preventDefault();

		var _s = NCI.Nav.Section;

		// slide up section nav
		_s.$section.slideToggle(200, function() {
			// remove open class from button
			_s.$openerButton.toggleClass('open', $(this).is(':visible'));
			_s.$section.toggleClass('open', $(this).is(':visible'));
			if(_s.$section.is(':visible')) {
				/* section nav is OPEN */
				// append overlay div to content area for grey page overlay
				$('#content').append('<div id="overlay"></div>');
				// enable clicking outside the section-menu to close
				$('#overlay').click(_s.onOpenerClick);
			} else {
				/* section nav is CLOSED */
				// remove grey overlay div
				$('#overlay').remove();
			}
		});
	}
};
