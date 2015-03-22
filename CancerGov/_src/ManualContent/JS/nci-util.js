var NCI = NCI || {
    linkToEmpty: function(event) {
        event.preventDefault();
        event.stopPropagation();
        var lang = document.documentElement.lang;
        var alertText = {
            en: "The page you have requested does not yet exist on the prototype.",
            es: "La página que ha solicitado no existe todavía en el prototipo. (to be translated)"
        };
        alert(alertText[lang] || alertText["en"]);
        document.getElementById("swKeyword").focus();
    },
    scrollTo: function(anchor) {
        if (anchor.indexOf("#") < 0) {
            anchor = "#" + anchor;
        }
        var anchorTop, willFreeze = true;
        if (anchor.match(/^#section\//i)) {
            anchorTop = 0;
            willFreeze = false;
        } else {
            anchor = anchor.replace(/^#.+\//, "#");
            anchorTop = $(anchor).offset().top;
        }
        var $header = $(".fixedtotop");
        var headerHeight = $header.outerHeight();
        if (willFreeze) {
            $(".headroom-area").addClass("frozen");
        }
        window.scrollTo(0, anchorTop - headerHeight);
        if (willFreeze) {
            setTimeout(function() {
                $(".headroom-area").removeClass("frozen");
            }, 50);
        }
    },
    buildTOC: function(toc_selector, content_selector, section_selector, title_selector, list_type) {
        var toc = toc_selector || ".on-this-page", content = content_selector || "#accordion", section = section_selector || "section", h_tag = title_selector || "h2", lt = list_type || "ul", sections = $(content + " " + section), $toc_ul = $(toc + " ul").empty();
        for (i = 0; i < sections.length; i++) {
            var s = sections[i];
            var $s = $(s);
            if (s.id) {
                var s_name = $s.children("h2").html();
                $toc_ul.append("<li><a href='#" + s.id + "'>" + s_name + "</a></li>");
            }
        }
    },
    buildOTP: function(target) {
        var $otpItems = $("#cgvBody " + (target || "h2"));
        var otpTitle;
        if ($("html").attr("lang") === "es") {
            otpTitle = "En Este Página";
        } else {
            otpTitle = "On This Page";
        }
        var otp = $("<nav>").addClass("on-this-page");
        otp.append($("<h6>").text(otpTitle));
        var otpList = $("<ul>");
        var otpItem;
        for (var i = 0; i < $otpItems.length; i++) {
            otpItem = $otpItems.get(i);
            $("<li>").append($("<a>").attr("href", "#" + (otpItem.id || otpItem.parentElement.id)).text(otpItem.textContent.trim())).appendTo(otpList);
        }
        otpList.appendTo(otp);
        otp.prependTo("#cgvBody > .slot-item:first");
    },
    doAccordion: function(target, opts) {
        var defaultOptions = {
            heightStyle: "content",
            header: "h2",
            collapsible: true,
            active: false,
            beforeActivate: function(event, ui) {
                var icons = $(this).accordion("option", "icons");
                var currHeader;
                if (ui.newHeader[0]) {
                    currHeader = ui.newHeader;
                } else {
                    currHeader = ui.oldHeader;
                }
                var currContent = currHeader.next(".ui-accordion-content");
                var isPanelSelected = currHeader.attr("aria-selected") == "true";
                currHeader.toggleClass("ui-corner-all", isPanelSelected).toggleClass("accordion-header-active ui-state-active ui-corner-top", !isPanelSelected).attr("aria-selected", (!isPanelSelected).toString()).attr("aria-expanded", (!isPanelSelected).toString());
                if (icons.header !== icons.activeHeader) {
                    currHeader.children(".ui-icon").toggleClass(icons.header, isPanelSelected).toggleClass(icons.activeHeader, !isPanelSelected);
                }
                currContent.toggleClass("accordion-content-active", !isPanelSelected);
                if (isPanelSelected) {
                    currContent.slideUp();
                } else {
                    currContent.slideDown();
                }
                return false;
            },
            icons: {
                header: "toggle",
                activeHeader: "toggle"
            }
        };
        var options = $.extend({}, defaultOptions, opts || {});
        var $target = $(target);
        if ($target.length > 0) {
            $(target).accordion(options);
        }
    },
    undoAccordion: function(target) {
        var $target = $(target);
        if ($target.length > 0) {
            $(target).each(function() {
                if (typeof $(this).data("ui-accordion") !== "undefined") {
                    $(this).accordion("destroy");
                    if (typeof equalHeights === "function") {
                        equalHeights();
                    }
                }
            });
        }
    },
    doAutocomplete: function(target, url, contains, queryParam, queryString, opts) {
        var $target = $(target);
        var queryParameter = queryParam || "term";
        var regexIsContains = contains || false;
        var defaultOptions = {
            source: function() {
                var xhr;
                return function(request, response) {
                    var dataQuery = $.extend({}, queryString || {});
                    dataQuery[queryParameter] = request.term;
                    if (xhr) {
                        xhr.abort();
                    }
                    xhr = $.ajax({
                        url: url,
                        data: dataQuery,
                        dataType: "json",
                        success: function(data) {
                            response(data);
                        },
                        error: function() {
                            response([]);
                        }
                    });
                };
            }(),
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
        $target.autocomplete(options).data("ui-autocomplete")._renderItem = function(ul, item) {
            var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, "$&");
            var regexBold = new RegExp();
            if (regexIsContains) {
                regexBold = new RegExp("(" + lterm + ")", "i");
            } else {
                regexBold = new RegExp("(^" + lterm + "|\\s+" + lterm + ")", "i");
            }
            var word = item.item.replace(regexBold, "<strong>$&</strong>");
            return $("<li></li>").data("ui-autocomplete-item", item).append(word).appendTo(ul);
        };
    }
};

NCI.Buttons = {};

NCI.Buttons.toggle = {
    html: '<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>',
    sel: ".toggle",
    lang: $("html").attr("lang") || "en",
    _innerText: {
        en: {
            "true": "Collapse",
            "false": "Expand"
        },
        es: {
            "true": "Reducir",
            "false": "Ampliar"
        }
    },
    createFor: function($target) {
        var t = NCI.Buttons.toggle;
        var $btn = $("<button>").addClass("toggle").attr({
            "aria-expanded": "false",
            type: "button"
        }).append($("<span>").addClass("hidden").text(t._innerText[t.lang]["false"]));
        $btn.appendTo($target);
        return $target.children($btn);
    },
    clickMega: function(e) {
        var t = NCI.Buttons.toggle, n = NCI.Nav;
        e.stopPropagation();
        var yes = "true", no = "false", sel = t.sel, aria = "aria-expanded", expanded = "[" + aria + "='" + yes + "']", collapsed = "[" + aria + "='" + no + "']", $this = $(this), li = $this.closest(".has-children"), ul = li.children("ul"), lvl = 0;
        if (li.hasClass("lvl-1") || li.hasClass("level-1")) {
            lvl = 2;
        }
        if (li.hasClass("lvl-2") || li.hasClass("level-2")) {
            lvl = 3;
        }
        switch ($this.attr(aria)) {
          case yes:
            $this.attr(aria, no).children("span").text(t._innerText[t.lang][no]).parent().find(expanded).attr(aria, no).children("span").text(t._innerText[t.lang][no]);
            ul.slideUp("slow", Function.prototype);
            break;

          case no:
            var siblings = li.siblings(".has-children");
            var sib_titles = siblings.children(".nav-item-title");
            var sib_btns = sib_titles.children("button[aria-expanded='true']");
            var sib_uls = siblings.children("ul");
            sib_btns.attr(aria, no).children("span").text(t._innerText[t.lang][no]);
            sib_uls.slideUp("slow");
            var curr_li = n.$mega.find(".contains-current, .current-page");
            var curr_nit = curr_li.children(".nav-item-title");
            var curr_btn = curr_nit.children("[" + aria + "='" + no + "']");
            curr_btn.attr(aria, yes).children("span").text(t._innerText[t.lang][yes]);
            curr_li.children("ul").slideDown("slow");
            $this.attr(aria, yes).children("span").text(t._innerText[t.lang][yes]);
            li.find(".lvl-" + lvl + ", .level-" + lvl).show();
            ul.slideDown("slow");
            break;
        }
    },
    clickSection: function(e) {
        e.stopPropagation();
        var t = NCI.Buttons.toggle;
        var windowWidth = window.innerWidth || $(window).width();
        var yes = "true", no = "false", sel = t.sel, aria = "aria-expanded", expanded = "[" + aria + "='" + yes + "']", collapsed = "[" + aria + "='" + no + "']", $this = $(this), li = $this.closest(".has-children"), ul = li.children("ul"), lvl = 0;
        if (li.hasClass("lvl-1") || li.hasClass("level-1")) {
            lvl = 2;
        }
        if (li.hasClass("lvl-2") || li.hasClass("level-2")) {
            lvl = 3;
        }
        switch ($this.attr(aria)) {
          case yes:
            $this.attr(aria, no).children("span").text(t._innerText[t.lang][no]).parent().find(expanded).attr(aria, no).children("span").text(t._innerText[t.lang][no]);
            ul.slideUp("slow", Function.prototype);
            break;

          case no:
            var siblings = li.siblings(".has-children");
            var sib_titles = siblings.children("div");
            var sib_btns = sib_titles.children("button[aria-expanded='true']");
            var sib_uls = siblings.children("ul");
            sib_btns.attr(aria, no).children("span").text(t._innerText[t.lang][no]);
            if (windowWidth <= 1024) {
                sib_uls.slideUp("slow", Function.prototype);
            } else {
                sib_urls.not(".section-nav .contains-current > ul").slideUp("slow", Function.prototype);
                sib_urls.filter(".section-nav .contains-current > ul").css("display", "none");
            }
            $this.attr(aria, yes).children("span").text(t._innerText[t.lang][yes]);
            ul.slideDown("slow", Function.prototype);
            break;
        }
    }
};

NCI.Nav = {
    openClass: "openNav",
    openPanelClass: "open-panel",
    mobile: "#mega-nav > .nav-menu",
    mega: "#mega-nav",
    hasChildren: ".has-children",
    $mobile: $(),
    $mega: $(),
    $openPanelBtn: $(),
    $hasChildren: $(),
    init: function() {
        var n = NCI.Nav;
        n.$mobile = $(n.mobile);
        n.$mega = $(n.mega);
        n.$openPanelBtn = $("." + n.openPanelClass);
        n.$openPanelBtn.click(n.toggleMobileMenu);
        n.$hasChildren = $(n.hasChildren);
        $(window).on("load resize", n.resize);
        $("#content, header, footer, .headroom-area").click(n.close);
        $(window).scroll(function(e) {
            if (NCI.Nav.isOpen()) {
                NCI.Nav.$mega.offset({
                    top: $(".fixedtotop").offset().top,
                    left: "0px"
                });
            }
        });
        var toggle = NCI.Buttons.toggle;
        toggle.createFor(n.$mega.find(".has-children > div")).on("click", toggle.clickMega);
        n.$mega.find(".current-page > div > " + toggle.sel + ", .contains-current > div > " + toggle.sel).attr("aria-expanded", "true").children("span").text(toggle._innerText[toggle.lang]["true"]);
        n.Section.init();
    },
    isOpen: function() {
        return $("html").hasClass(NCI.Nav.openClass);
    },
    open: function() {
        var n = NCI.Nav;
        if (!n.isOpen()) {
            $("html").addClass(NCI.Nav.openClass);
            NCI.Nav.$mobile.attr("aria-hidden", "false");
            $(".fixedtotop.scroll-to-fixed-fixed").css("left", "80%");
            $("." + NCI.Nav.openClass + " " + NCI.Nav.mega).offset({
                top: $(".fixedtotop").offset().top,
                left: "0px"
            });
            $("#page").swipe({
                swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
                    this.close();
                }.bind(n),
                threshold: 10
            });
        }
    },
    close: function() {
        var n = NCI.Nav;
        if (n.isOpen()) {
            $("html").removeClass(n.openClass);
            $(".fixedtotop.scroll-to-fixed-fixed").css("left", "0px");
            n.$mobile.attr("aria-hidden", "true");
            setTimeout(function() {
                this.$mega.removeAttr("style");
            }.bind(n), 1e3);
            $("#page").swipe("destroy");
        }
    },
    toggleMobileMenu: function() {
        var n = NCI.Nav;
        if (n.isOpen()) {
            n.close();
        } else {
            n.open();
        }
    },
    resize: function() {
        if (NCI.Nav.isOpen()) {}
    }
};

NCI.Nav.Section = {
    sel: ".section-nav",
    selWithChildren: ".section-nav .has-children",
    idOpenerButton: "section-menu-button",
    $section: $(),
    $withChildren: $(),
    $openerButton: $(),
    init: function() {
        var _s = NCI.Nav.Section, toggle = NCI.Buttons.toggle;
        _s.$section = $(_s.sel);
        if (_s.$section.length > 0) {
            _s.$openerButton = $("<a>").attr("id", _s.idOpenerButton).attr("href", "#").text("Section Menu").on("click", _s.onOpenerClick).insertAfter(".fixedtotop");
            $(".contentzone").addClass("has-section-nav");
            _s.$withChildren = $(_s.selWithChildren + "> div");
            toggle.createFor(_s.$withChildren.not(".level-0 > div")).on("click", toggle.clickSection);
            _s.$withChildren.parent("li").find("div.current-page > " + toggle.sel + ", .contains-current > div > " + toggle.sel).attr("aria-expanded", "true").children("span").text(toggle._innerText[toggle.lang]["true"]);
            var curWidth = window.innerWidth || $(window).width(), oldWidth = curWidth;
            $(window).resize(function() {
                curWidth = window.innerWidth || $(window).width();
                if (oldWidth > 1024 && curWidth <= 1024) {
                    _s.$section.hide();
                } else if (oldWidth <= 1024 && curWidth > 1024) {
                    $("#overlay").remove();
                    _s.$section.show();
                    _s.$section.removeClass("open");
                    _s.$openerButton.removeClass("open");
                }
                oldWidth = curWidth;
            }).trigger("resize");
        }
    },
    onOpenerClick: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var _s = NCI.Nav.Section;
        _s.$section.slideToggle(200, function() {
            _s.$openerButton.toggleClass("open", $(this).is(":visible"));
            _s.$section.toggleClass("open", $(this).is(":visible"));
            if (_s.$section.is(":visible")) {
                $("#content").append('<div id="overlay"></div>');
                $("#overlay").click(_s.onOpenerClick);
            } else {
                $("#overlay").remove();
            }
        });
    }
};

NCI.Search = {
    classname: "searching",
    init: function() {
        $(".nav-search").click(NCI.Search.mobile.show);
    },
    mobile: {
        clear: function() {
            $("#swKeyword").val("");
        },
        show: function(e) {
            var menu_btn = $(".open-panel"), s = NCI.Search;
            $("#nvcgSlMainNav").addClass(s.classname);
            if (!$("#searchclear").length) {
                $("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
            }
            menu_btn.unbind("click").click(NCI.Search.mobile.hide);
        },
        hide: function(e) {
            $("#nvcgSlMainNav").removeClass(NCI.Search.classname);
            NCI.Nav.$openPanelBtn.unbind("click").click(NCI.Nav.open);
        }
    }
};

NCI.Breakpoints = {
    small: 480,
    medium: 640,
    large: 1024,
    xlarge: 1280,
    init: function() {}
};