define(function(require) {
	var $ = require('jquery'),
		equalHeights;

	equalHeights = function() {
		$('[data-match-height]').each(function() {
			// initialize isStacked to false; this is the default behavior
			var isStacked = false;
			// get the '.equalheight' items to equalize them
			var items = $(this).find('.equalheight');
			if(items.length === 0) return;
			// get the top-offset of the first item, to check for stacking
			var firstTopOffset = items.first().offset().top;

			items.height('inherit');

			/* iterate through the items to:
			 * 1) check if they're stacked, and
			 * 2) get the heights of the elements
			 *
			 * for the heights, we could also use the following map
			 * (outside of the each loop) but it DOESN'T WORK IN IE8:
			 * items.map(function() { return $(this).height() });
			 */
			var heights = [];
			items.each(function() {
				var el = $(this);
				if (el.offset().top !== firstTopOffset) {
					isStacked = true;
					return;
				}
				heights.push(el.height());
			});
			// if they are stacked, we don't need to worry about making them the same height
			if (isStacked) return;
			// get the maximum height (from the previously-calculated heights)
			var maxHeight = Math.max.apply(null, heights);

			// get the width of the whole row
			var rowWidth = $(this).width();

			// define a function to set the height of an element
			function setHeight(item, height, maxWidth) {
				if((rowWidth - item.width()) > maxWidth)
					item.height(height);
			}
			// call that function for every 'item' in the 'items' array
			setHeight.call(null, items, maxHeight, 40);
		});
	};

	/* run the above function */
	$(window).on('load resize', function() {
		equalHeights();
	});

	/* return function so it can be used by other modules */
	return equalHeights;
});
