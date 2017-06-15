define(function (require) {

	var $ = require('jquery');

	var _initialized = false;

	function _initialize() {
			$.ui.selectmenu.prototype._buttonEvents.keydown = function (event) {
				var preventDefault = true;
				switch (event.keyCode) {
					case $.ui.keyCode.TAB:
					case $.ui.keyCode.ESCAPE:
						this.close(event);
						preventDefault = false;
						break;
					case $.ui.keyCode.ENTER:
						if (this.isOpen) {
							this._selectFocusedItem(event);
						}
						break;
					case $.ui.keyCode.UP:
						if (event.altKey) {
							this._toggle(event);
						} else {
							this._move("prev", event);
						}
						break;
					case $.ui.keyCode.DOWN:
						if (event.altKey) {
							this._toggle(event);
						} else {
							this._move("next", event);
						}
						break;
					case $.ui.keyCode.SPACE:
						if (this.isOpen) {
							this.menu.trigger(event);
						} else {
							this._toggle(event);
						}
						break;
					case $.ui.keyCode.LEFT:
						this._move("prev", event);
						break;
					case $.ui.keyCode.RIGHT:
						this._move("next", event);
						break;
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.PAGE_UP:
						this._move("first", event);
						break;
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_DOWN:
						this._move("last", event);
						break;
					default:
						this.menu.trigger(event);
						preventDefault = false;
				}

				if (preventDefault) {
					event.preventDefault();
				}
			};
			$.ui.menu.prototype._keydown = function (event) {
				var match, prev, character, skip,
					preventDefault = true;

				switch (event.keyCode) {
					case $.ui.keyCode.PAGE_UP:
						this.previousPage(event);
						break;
					case $.ui.keyCode.PAGE_DOWN:
						this.nextPage(event);
						break;
					case $.ui.keyCode.HOME:
						this._move("first", "first", event);
						break;
					case $.ui.keyCode.END:
						this._move("last", "last", event);
						break;
					case $.ui.keyCode.UP:
						this.previous(event);
						break;
					case $.ui.keyCode.DOWN:
						this.next(event);
						break;
					case $.ui.keyCode.LEFT:
						this.collapse(event);
						break;
					case $.ui.keyCode.RIGHT:
						if (this.active && !this.active.is(".ui-state-disabled")) {
							this.expand(event);
						}
						break;
					case $.ui.keyCode.ESCAPE:
						this.collapse(event);
						break;
					case $.ui.keyCode.ENTER:
						this._activate(event);
						break;
					default:
						preventDefault = false;
						prev = this.previousFilter || "";
						character = String.fromCharCode(event.keyCode);
						skip = false;

						clearTimeout(this.filterTimer);

						if (character === prev) {
							skip = true;
						} else {
							character = prev + character;
						}

						match = this._filterMenuItems(character);
						match = skip && match.index(this.active.next()) !== -1 ?
							this.active.nextAll(".ui-menu-item") :
							match;

						// If no matches on the current filter, reset to the last character pressed
						// to move down the menu to the first item that starts with that character
						if (!match.length) {
							character = String.fromCharCode(event.keyCode);
							match = this._filterMenuItems(character);
						}

						if (match.length) {
							this.focus(event, match);
							this.previousFilter = character;
							this.filterTimer = this._delay(function () {
								delete this.previousFilter;
							}, 1000);
						} else {
							delete this.previousFilter;
						}
				}

				if (preventDefault) {
					event.preventDefault();
				}
			};
			$.ui.selectmenu.prototype._setAria = function (item) {
				var id = this.menuItems.eq(item.index).attr("id");

				this.button.attr({
					"aria-activedescendant": id
				});
				this.menu.attr("aria-activedescendant", id);
			};
			$('select:not([multiple])').each(function () {
				var $this = $(this);

				$this.selectmenu({
					change: function (event, ui) {
						// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
						ui.item.element.change();
					},
					width: $this.hasClass('fullwidth') ? '100%' : null
				}).selectmenu('menuWidget').addClass('scrollable-y');
			});
	}

	/**
	 * Exposed functions of this module.
	 */
	return {
		init: function () {
			if (!_initialized) {
				_initialize();
			}
		}
	};

});
