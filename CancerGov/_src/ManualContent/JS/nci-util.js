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
        var width = window.innerWidth || $(window).width();
        if (anchor.indexOf("#") === 0) {
            anchor = anchor.substring(1, anchor.length);
        }
        var isSection = anchor.match(/^section\//i);
        anchor = "#" + anchor.replace(/^.+\//, "").replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, "\\$1");
        var $anchor = $(anchor), $accordionPanel = isSection ? $anchor.children(".ui-accordion-content") : $anchor.closest(".ui-accordion-content"), $accordion = $accordionPanel.closest(".ui-accordion"), accordionIndex;
        if ($accordion.length > 0) {
            accordionIndex = $accordion.data("ui-accordion").headers.index($accordionPanel.prev(".ui-accordion-header"));
        }
        function doTheScroll() {
            var headerHeight = $(".fixedtotop").outerHeight(), anchorTop = window.scrollY + headerHeight, willFreeze = true;
            if (width > NCI.Breakpoints.large && isSection) {
                anchorTop = 0;
                willFreeze = false;
            } else {
                if ($anchor.length > 0) {
                    anchorTop = $anchor.offset().top;
                }
            }
            if (willFreeze) {
                $(".headroom-area").addClass("frozen");
            }
            window.scrollTo(0, anchorTop - headerHeight);
            if (willFreeze) {
                setTimeout(function() {
                    $(".headroom-area").removeClass("frozen");
                }, 50);
            }
            $accordion.off("accordionactivate");
        }
        if ($accordion.length > 0) {
            $accordion.on("accordionactivate", function(e) {
                doTheScroll();
            });
            if (!$accordionPanel.hasClass("accordion-content-active")) {
                $accordion.accordion("option", "active", accordionIndex);
            } else {
                doTheScroll();
            }
        } else {
            doTheScroll();
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
        var $otp = $("#cgvBody [data-otp-selector]");
        $otpItems = $otp.find($otp.attr("data-otp-selector") || "h2").not('[data-otp="false"]');
        if ($otpItems.length > 0) {
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
                otpItem = $otpItems[i];
                $("<li>").append($("<a>").attr("href", "#" + (otpItem.id || otpItem.parentElement.id)).text(otpItem.textContent.trim())).appendTo(otpList);
            }
            otpList.appendTo(otp);
            otp.prependTo("#cgvBody > .slot-item:first");
        }
    },
    doAccordion: function(target, opts) {
        var $target = $(target);
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
                    currContent.slideUp(function() {
                        $target.trigger("accordionactivate", ui);
                    });
                } else {
                    currContent.slideDown(function() {
                        $target.trigger("accordionactivate", ui);
                    });
                }
                return false;
            },
            icons: {
                header: "toggle",
                activeHeader: "toggle"
            }
        };
        var options = $.extend({}, defaultOptions, opts);
        if ($target.length > 0) {
            $target.accordion(options);
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
    makeAllAccordions: function() {
        var targets = {
            ".accordion": "h2",
            "#nvcgRelatedResourcesArea": "h6",
            "#cgvCitationSl": "h6",
            ".cthp-content": "h3"
        };
        var targetsSelector = Object.keys(targets).join(", ");
        var targetsBuiltAccordion = [], targetsHeader = [], accordion;
        for (var target in targets) {
            if (targets.hasOwnProperty(target)) {
                targetsBuiltAccordion.push(target + ".ui-accordion");
                targetsHeader.push(target + " " + targets[target]);
            }
        }
        var targetsBuiltAccordionSelector = targetsBuiltAccordion.join(", ");
        var targetsHeaderSelector = targetsHeader.join(", ");
        function accordionize() {
            var width = window.innerWidth || $(window).width(), accordion;
            if (width <= 640 && $(targetsBuiltAccordionSelector).length === 0) {
                $(targetsHeaderSelector).each(function() {
                    var $this = $(this);
                    if ($this.nextAll().length > 1 || $this.next().is("ul, ol")) {
                        $this.nextUntil($(targetsHeaderSelector)).wrapAll('<div class="clearfix"></div>');
                    }
                });
                for (accordion in targets) {
                    if (targets.hasOwnProperty(accordion)) {
                        NCI.doAccordion(accordion, {
                            header: targets[accordion]
                        });
                    }
                }
                var builtAccordionHeaders = $(".ui-accordion-header");
                for (var i = 1; i <= builtAccordionHeaders.length; i++) {
                    if (i % 2 === 0) {
                        builtAccordionHeaders.get(i - 1).className += " " + "even";
                    } else {
                        builtAccordionHeaders.get(i - 1).className += " " + "odd";
                    }
                }
            } else if (width > 640) {
                for (accordion in targets) {
                    if (targets.hasOwnProperty(accordion)) {
                        NCI.undoAccordion(accordion, {
                            header: targets[accordion]
                        });
                    }
                }
            }
        }
        $(window).on("resize", function() {
            accordionize();
        });
        accordionize();
    },
    doAutocomplete: function(target, url, contains, queryParam, queryString, opts) {
        var appendTo = null, $target = $(target);
        if (target !== "#swKeyword") {
            appendTo = $target.parent();
        }
        var queryParameter = queryParam || "term", regexIsContains = contains || false, defaultOptions = {
            appendTo: appendTo,
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
                sib_uls.not(".section-nav .contains-current > ul").slideUp("slow", Function.prototype);
                sib_uls.filter(".section-nav .contains-current > ul").css("display", "none");
            }
            $this.attr(aria, yes).children("span").text(t._innerText[t.lang][yes]);
            ul.slideDown("slow", Function.prototype);
            break;
        }
    }
};

NCI.Nav = {
    movingClass: "nav-moving",
    movingTimeout: setTimeout(function() {}),
    openClass: "nav-open",
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
            clearTimeout(n.movingTimeout);
            n.$mobile.attr("aria-hidden", "false");
            $("html").addClass(n.movingClass).addClass(n.openClass);
            n.$mobile.find(":tabbable:first").focus();
            n.$mega.offset({
                top: $(".fixedtotop").offset().top,
                left: "0px"
            });
            $(".fixedtotop.scroll-to-fixed-fixed").css("left", "80%");
            n.movingTimeout = setTimeout(function() {
                $("html").removeClass(n.movingClass);
            }, 500);
            $("#page").swipe({
                swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
                    this.close();
                }.bind(n),
                threshold: 10
            });
            n.$mega.on("focusout.NCI.Nav", function(event) {
                n.focusOutHandler(event);
            });
        }
    },
    close: function() {
        var n = NCI.Nav;
        if (n.isOpen()) {
            clearTimeout(n.movingTimeout);
            n.$mega.off("focusout.NCI.Nav");
            n.$mobile.attr("aria-hidden", "true");
            $("html").addClass(n.movingClass).removeClass(n.openClass);
            n.$openPanelBtn.focus();
            $(".fixedtotop.scroll-to-fixed-fixed").css("left", "0px");
            n.movingTimeout = setTimeout(function() {
                $("html").removeClass(n.movingClass);
                n.$mega.removeAttr("style");
            }, 500);
            $("#page").swipe("destroy");
        }
    },
    focusOutHandler: function(event) {
        var n = NCI.Nav;
        setTimeout(function() {
            if (n.$mega.has(document.activeElement).length > 0) {
                return;
            }
            if (window.scrollX > 0) {
                window.scrollTo(0, window.scrollY);
            }
            n.close();
        }, 0);
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

NCI.PageOptions = {
    init: function() {
        this.FontResizer.init();
        this.Print.init();
    },
    Print: {
        init: function() {
            $(".po-print a").click(this.click);
        },
        click: function(e) {
            e.preventDefault();
            window.print();
        }
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

NCI.PageOptions.FontResizer = {
    selector: ".po-font-resize a",
    $content: $(),
    originalSize: 0,
    currentSize: 0,
    multiplier: 1.2,
    init: function() {
        this.originalSize = parseFloat($("body").css("font-size"), 10);
        $(this.selector).click(this.click);
        this.$content = $(".resize-content");
    },
    click: function(e) {
        var self = NCI.PageOptions.FontResizer;
        e.preventDefault();
        self.setCurrentFontSize();
        var newSize = self.currentSize * self.multiplier;
        newSize = newSize > 30 ? self.originalSize : newSize;
        $content.css("font-size", newSize + "px");
        if (typeof equalHeights === typeof Function.prototype) {
            equalHeights();
        }
        return false;
    },
    setCurrentFontSize: function() {
        $content = $(".resize-content");
        this.currentSize = parseFloat($content.css("font-size"), 10);
    }
};

NCI.Search = {
    classname: "searching",
    searchBtnClass: "nav-search",
    $form: $(),
    $input: $(),
    $searchBtn: $(),
    init: function() {
        var s = NCI.Search;
        s.$form = $("#siteSearchForm");
        s.$input = $("#swKeyword");
        s.$searchBtn = $("." + s.searchBtnClass);
        s.$searchBtn.click(s.mobile.show);
    },
    mobile: {
        clear: function() {
            NCI.Search.$input.val("");
        },
        show: function(e) {
            var s = NCI.Search, n = NCI.Nav;
            $("#nvcgSlMainNav").addClass(s.classname);
            s.$input.focus();
            if ($("#searchclear").length === 0) {
                $("#sitesearch").after("<button id='searchclear' onclick='NCI.Search.mobile.clear();' type='reset'></button>");
            }
            n.$openPanelBtn.unbind("click").click(s.mobile.hide);
            $(".mobile-menu-bar").children().not(n.$openPanelBtn).each(function(i, el) {
                var $el = $(el);
                $el.data("NCI-search-originaltabindex", el.tabIndex || null);
                $el.prop("tabindex", -1);
            });
            s.$form.add(n.$openPanelBtn).on("focusout.NCI.Search", function(event) {
                s.mobile.focusOutHandler(event);
            });
        },
        hide: function(e) {
            var s = NCI.Search, n = NCI.Nav;
            s.$form.add(n.$openPanelBtn).off("focusout.NCI.Search");
            $(".mobile-menu-bar").children().not(n.$openPanelBtn).each(function(i, el) {
                var $el = $(el);
                $el.attr("tabindex", $el.data("NCI-search-originaltabindex"));
            });
            s.$searchBtn.focus();
            $("#nvcgSlMainNav").removeClass(s.classname);
            n.$openPanelBtn.unbind("click").click(n.toggleMobileMenu);
        },
        focusOutHandler: function(event) {
            var n = NCI.Nav, s = NCI.Search;
            if (s.$form.has(event.relatedTarget).length > 0 || event.relatedTarget === n.$openPanelBtn.get(0)) {
                return;
            }
            s.mobile.hide();
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