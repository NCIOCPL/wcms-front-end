NCI.Nav.Section = {
sel: "#nvcgSlSectionNav .has-children > div",
$section: $(),

init: function() {
    var _s = NCI.Nav.Section,
        toggle = NCI.Buttons.toggle;

    _s.$section = $(_s.sel);

    // add +/- buttons to section nav
    toggle.createFor(_s.$section);

    _s.$section.find(".current-page > div > "+toggle.sel+", .contains-current > div > "+toggle.sel)
        .attr("aria-expanded","true").children('span').text(toggle._innerText[toggle.lang]['true']);
},

};
