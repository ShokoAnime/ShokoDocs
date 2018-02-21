/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? {
                top: 0,
                left: 0
            } : f ? null : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.7", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+actionscript+aspnet+bash+basic+c+csharp+cpp+coffeescript+ruby+css-extras+fsharp+git+go+groovy+haml+haskell+http+ini+jade+java+json+latex+less+makefile+markdown+matlab+objectivec+pascal+perl+php+php-extras+prolog+python+r+jsx+sass+scss+scala+scheme+smalltalk+sql+swift+typescript+wiki+yaml&plugins=line-highlight+line-numbers+show-language */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function() {
        var e = /\blang(?:uage)?-(\w+)\b/i,
            t = 0,
            n = _self.Prism = {
                util: {
                    encode: function(e) {
                        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function(e) {
                        var t = n.util.type(e);
                        switch (t) {
                            case "Object":
                                var a = {};
                                for (var r in e) e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                                return a;
                            case "Array":
                                return e.map && e.map(function(e) {
                                    return n.util.clone(e)
                                })
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var a = n.util.clone(n.languages[e]);
                        for (var r in t) a[r] = t[r];
                        return a
                    },
                    insertBefore: function(e, t, a, r) {
                        r = r || n.languages;
                        var i = r[e];
                        if (2 == arguments.length) {
                            a = arguments[1];
                            for (var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
                            return i
                        }
                        var o = {};
                        for (var s in i)
                            if (i.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var l in a) a.hasOwnProperty(l) && (o[l] = a[l]);
                                o[s] = i[s]
                            }
                        return n.languages.DFS(n.languages, function(t, n) {
                            n === r[e] && t != e && (this[t] = o)
                        }), r[e] = o
                    },
                    DFS: function(e, t, a, r) {
                        r = r || {};
                        for (var i in e) e.hasOwnProperty(i) && (t.call(e, i, e[i], a || i), "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])] ? "Array" !== n.util.type(e[i]) || r[n.util.objId(e[i])] || (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, i, r)) : (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, null, r)))
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    var a = {
                        callback: t,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var r, i = a.elements || document.querySelectorAll(a.selector), l = 0; r = i[l++];) n.highlightElement(r, e === !0, a.callback)
                },
                highlightElement: function(t, a, r) {
                    for (var i, l, o = t; o && !e.test(o.className);) o = o.parentNode;
                    o && (i = (o.className.match(e) || [, ""])[1].toLowerCase(), l = n.languages[i]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i);
                    var s = t.textContent,
                        u = {
                            element: t,
                            language: i,
                            grammar: l,
                            code: s
                        };
                    if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return n.hooks.run("complete", u), void 0;
                    if (n.hooks.run("before-highlight", u), a && _self.Worker) {
                        var c = new Worker(n.filename);
                        c.onmessage = function(e) {
                            u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                        }, c.postMessage(JSON.stringify({
                            language: u.language,
                            code: u.code,
                            immediateClose: !0
                        }))
                    } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                },
                highlight: function(e, t, r) {
                    var i = n.tokenize(e, t);
                    return a.stringify(n.util.encode(i), r)
                },
                tokenize: function(e, t) {
                    var a = n.Token,
                        r = [e],
                        i = t.rest;
                    if (i) {
                        for (var l in i) t[l] = i[l];
                        delete t.rest
                    }
                    e: for (var l in t)
                        if (t.hasOwnProperty(l) && t[l]) {
                            var o = t[l];
                            o = "Array" === n.util.type(o) ? o : [o];
                            for (var s = 0; s < o.length; ++s) {
                                var u = o[s],
                                    c = u.inside,
                                    g = !!u.lookbehind,
                                    h = !!u.greedy,
                                    f = 0,
                                    d = u.alias;
                                if (h && !u.pattern.global) {
                                    var p = u.pattern.toString().match(/[imuy]*$/)[0];
                                    u.pattern = RegExp(u.pattern.source, p + "g")
                                }
                                u = u.pattern || u;
                                for (var m = 0, y = 0; m < r.length; y += (r[m].matchedStr || r[m]).length, ++m) {
                                    var v = r[m];
                                    if (r.length > e.length) break e;
                                    if (!(v instanceof a)) {
                                        u.lastIndex = 0;
                                        var b = u.exec(v),
                                            k = 1;
                                        if (!b && h && m != r.length - 1) {
                                            if (u.lastIndex = y, b = u.exec(e), !b) break;
                                            for (var w = b.index + (g ? b[1].length : 0), _ = b.index + b[0].length, A = m, S = y, P = r.length; P > A && _ > S; ++A) S += (r[A].matchedStr || r[A]).length, w >= S && (++m, y = S);
                                            if (r[m] instanceof a || r[A - 1].greedy) continue;
                                            k = A - m, v = e.slice(y, S), b.index -= y
                                        }
                                        if (b) {
                                            g && (f = b[1].length);
                                            var w = b.index + f,
                                                b = b[0].slice(f),
                                                _ = w + b.length,
                                                x = v.slice(0, w),
                                                O = v.slice(_),
                                                j = [m, k];
                                            x && j.push(x);
                                            var N = new a(l, c ? n.tokenize(b, c) : b, d, b, h);
                                            j.push(N), O && j.push(O), Array.prototype.splice.apply(r, j)
                                        }
                                    }
                                }
                            }
                        }
                    return r
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var a = n.hooks.all;
                        a[e] = a[e] || [], a[e].push(t)
                    },
                    run: function(e, t) {
                        var a = n.hooks.all[e];
                        if (a && a.length)
                            for (var r, i = 0; r = a[i++];) r(t)
                    }
                }
            },
            a = n.Token = function(e, t, n, a, r) {
                this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r
            };
        if (a.stringify = function(e, t, r) {
                if ("string" == typeof e) return e;
                if ("Array" === n.util.type(e)) return e.map(function(n) {
                    return a.stringify(n, t, e)
                }).join("");
                var i = {
                    type: e.type,
                    content: a.stringify(e.content, t, r),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: r
                };
                if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
                    var l = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(i.classes, l)
                }
                n.hooks.run("wrap", i);
                var o = "";
                for (var s in i.attributes) o += (o ? " " : "") + s + '="' + (i.attributes[s] || "") + '"';
                return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + i.content + "</" + i.tag + ">"
            }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data),
                a = t.language,
                r = t.code,
                i = t.immediateClose;
            _self.postMessage(n.highlight(r, n.languages[a], a)), i && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css"
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: {
        pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    }
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\\\|\\?[^\\])*?`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript"
    }
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.actionscript = Prism.languages.extend("javascript", {
    keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
    operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
}), Prism.languages.actionscript["class-name"].alias = "function", Prism.languages.markup && Prism.languages.insertBefore("actionscript", "string", {
    xml: {
        pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\\1|\\?(?!\1)[\w\W])*\2)*\s*\/?>/,
        lookbehind: !0,
        inside: {
            rest: Prism.languages.markup
        }
    }
});
Prism.languages.aspnet = Prism.languages.extend("markup", {
    "page-directive tag": {
        pattern: /<%\s*@.*%>/i,
        inside: {
            "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
            rest: Prism.languages.markup.tag.inside
        }
    },
    "directive tag": {
        pattern: /<%.*%>/i,
        inside: {
            "directive tag": /<%\s*?[$=%#:]{0,2}|%>/i,
            rest: Prism.languages.csharp
        }
    }
}), Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i, Prism.languages.insertBefore("inside", "punctuation", {
    "directive tag": Prism.languages.aspnet["directive tag"]
}, Prism.languages.aspnet.tag.inside["attr-value"]), Prism.languages.insertBefore("aspnet", "comment", {
    "asp comment": /<%--[\w\W]*?--%>/
}), Prism.languages.insertBefore("aspnet", Prism.languages.javascript ? "script" : "tag", {
    "asp script": {
        pattern: /(<script(?=.*runat=['"]?server['"]?)[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.csharp || {}
    }
});
! function(e) {
    var t = {
        variable: [{
            pattern: /\$?\(\([\w\W]+?\)\)/,
            inside: {
                variable: [{
                    pattern: /(^\$\(\([\w\W]+)\)\)/,
                    lookbehind: !0
                }, /^\$\(\(/],
                number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/
            }
        }, {
            pattern: /\$\([^)]+\)|`[^`]+`/,
            inside: {
                variable: /^\$\(|^`|\)$|`$/
            }
        }, /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]
    };
    e.languages.bash = {
        shebang: {
            pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
            alias: "important"
        },
        comment: {
            pattern: /(^|[^"{\\])#.*/,
            lookbehind: !0
        },
        string: [{
            pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
            lookbehind: !0,
            greedy: !0,
            inside: t
        }, {
            pattern: /(["'])(?:\\\\|\\?[^\\])*?\1/g,
            greedy: !0,
            inside: t
        }],
        variable: t.variable,
        "function": {
            pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
            lookbehind: !0
        },
        "boolean": {
            pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
            lookbehind: !0
        },
        operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
    };
    var a = t.variable[1].inside;
    a["function"] = e.languages.bash["function"], a.keyword = e.languages.bash.keyword, a.boolean = e.languages.bash.boolean, a.operator = e.languages.bash.operator, a.punctuation = e.languages.bash.punctuation
}(Prism);
Prism.languages.basic = {
    string: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
    comment: {
        pattern: /(?:!|REM\b).+/i,
        inside: {
            keyword: /^REM/i
        }
    },
    number: /(?:\b|\B[.-])(?:\d+\.?\d*)(?:E[+-]?\d+)?/i,
    keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
    "function": /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
    operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
    punctuation: /[,;:()]/
};
Prism.languages.c = Prism.languages.extend("clike", {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
}), Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
        lookbehind: !0,
        alias: "property",
        inside: {
            string: {
                pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
                lookbehind: !0
            },
            directive: {
                pattern: /(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    },
    constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
Prism.languages.csharp = Prism.languages.extend("clike", {
    keyword: /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
    string: [/@("|')(\1\1|\\\1|\\?(?!\1)[\s\S])*\1/, /("|')(\\?.)*?\1/],
    number: /\b-?(0x[\da-f]+|\d*\.?\d+f?)\b/i
}), Prism.languages.insertBefore("csharp", "keyword", {
    "generic-method": {
        pattern: /[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,
        alias: "function",
        inside: {
            keyword: Prism.languages.csharp.keyword,
            punctuation: /[<>(),.:]/
        }
    },
    preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
            directive: {
                pattern: /(\s*#)\b(define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    }
});
Prism.languages.cpp = Prism.languages.extend("c", {
    keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    "boolean": /\b(true|false)\b/,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
}), Prism.languages.insertBefore("cpp", "keyword", {
    "class-name": {
        pattern: /(class\s+)[a-z0-9_]+/i,
        lookbehind: !0
    }
});
! function(e) {
    var t = /#(?!\{).+/,
        n = {
            pattern: /#\{[^}]+\}/,
            alias: "variable"
        };
    e.languages.coffeescript = e.languages.extend("javascript", {
        comment: t,
        string: [{
            pattern: /'(?:\\?[^\\])*?'/,
            greedy: !0
        }, {
            pattern: /"(?:\\?[^\\])*?"/,
            greedy: !0,
            inside: {
                interpolation: n
            }
        }],
        keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
        "class-member": {
            pattern: /@(?!\d)\w+/,
            alias: "variable"
        }
    }), e.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": {
            pattern: /###[\s\S]+?###/,
            alias: "comment"
        },
        "block-regex": {
            pattern: /\/{3}[\s\S]*?\/{3}/,
            alias: "regex",
            inside: {
                comment: t,
                interpolation: n
            }
        }
    }), e.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
            pattern: /`(?:\\?[\s\S])*?`/,
            inside: {
                delimiter: {
                    pattern: /^`|`$/,
                    alias: "punctuation"
                },
                rest: e.languages.javascript
            }
        },
        "multiline-string": [{
            pattern: /'''[\s\S]*?'''/,
            greedy: !0,
            alias: "string"
        }, {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: "string",
            inside: {
                interpolation: n
            }
        }]
    }), e.languages.insertBefore("coffeescript", "keyword", {
        property: /(?!\d)\w+(?=\s*:(?!:))/
    }), delete e.languages.coffeescript["template-string"]
}(Prism);
! function(e) {
    e.languages.ruby = e.languages.extend("clike", {
        comment: /#(?!\{[^\r\n]*?\}).*/,
        keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
    });
    var n = {
        pattern: /#\{[^}]+\}/,
        inside: {
            delimiter: {
                pattern: /^#\{|\}$/,
                alias: "tag"
            },
            rest: e.util.clone(e.languages.ruby)
        }
    };
    e.languages.insertBefore("ruby", "keyword", {
        regex: [{
            pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
            lookbehind: !0
        }],
        variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
        symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
    }), e.languages.insertBefore("ruby", "number", {
        builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
        constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
    }), e.languages.ruby.string = [{
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
        inside: {
            interpolation: n
        }
    }]
}(Prism);
Prism.languages.css.selector = {
    pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/,
        "class": /\.[-:\.\w]+/,
        id: /#[-:\.\w]+/,
        attribute: /\[[^\]]+\]/
    }
}, Prism.languages.insertBefore("css", "function", {
    hexcode: /#[\da-f]{3,6}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%\.]+/
});
Prism.languages.fsharp = Prism.languages.extend("clike", {
    comment: [{
        pattern: /(^|[^\\])\(\*[\w\W]*?\*\)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
    string: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|("|')(?:\\\1|\\?(?!\1)[\s\S])*\1)B?/,
    number: [/\b-?0x[\da-fA-F]+(un|lf|LF)?\b/, /\b-?0b[01]+(y|uy)?\b/, /\b-?(\d*\.?\d+|\d+\.)([fFmM]|[eE][+-]?\d+)?\b/, /\b-?\d+(y|uy|s|us|l|u|ul|L|UL|I)?\b/]
}), Prism.languages.insertBefore("fsharp", "keyword", {
    preprocessor: {
        pattern: /^[^\r\n\S]*#.*/m,
        alias: "property",
        inside: {
            directive: {
                pattern: /(\s*#)\b(else|endif|if|light|line|nowarn)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    }
});
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(\\?.)*?\1/m,
    command: {
        pattern: /^.*\$ git .*$/m,
        inside: {
            parameter: /\s(--|-)\w+/m
        }
    },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
};
Prism.languages.go = Prism.languages.extend("clike", {
    keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/,
    "boolean": /\b(_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
    string: /("|'|`)(\\?.|\r|\n)*?\1/
}), delete Prism.languages.go["class-name"];
Prism.languages.groovy = Prism.languages.extend("clike", {
    keyword: /\b(as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    string: [{
        pattern: /("""|''')[\W\w]*?\1|(\$\/)(\$\/\$|[\W\w])*?\/\$/,
        greedy: !0
    }, {
        pattern: /("|'|\/)(?:\\?.)*?\1/,
        greedy: !0
    }],
    number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
    operator: {
        pattern: /(^|[^.])(~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.{1,2}(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
        lookbehind: !0
    },
    punctuation: /\.+|[{}[\];(),:$]/
}), Prism.languages.insertBefore("groovy", "string", {
    shebang: {
        pattern: /#!.+/,
        alias: "comment"
    }
}), Prism.languages.insertBefore("groovy", "punctuation", {
    "spock-block": /\b(setup|given|when|then|and|cleanup|expect|where):/
}), Prism.languages.insertBefore("groovy", "function", {
    annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0
    }
}), Prism.hooks.add("wrap", function(e) {
    if ("groovy" === e.language && "string" === e.type) {
        var t = e.content[0];
        if ("'" != t) {
            var n = /([^\\])(\$(\{.*?\}|[\w\.]+))/;
            "$" === t && (n = /([^\$])(\$(\{.*?\}|[\w\.]+))/), e.content = e.content.replace(/&amp;/g, "&").replace(/&lt;/g, "<"), e.content = Prism.highlight(e.content, {
                expression: {
                    pattern: n,
                    lookbehind: !0,
                    inside: Prism.languages.groovy
                }
            }), e.classes.push("/" === t ? "regex" : "gstring")
        }
    }
});
! function(e) {
    e.languages.haml = {
        "multiline-comment": {
            pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*((?:\r?\n|\r)\2[\t ]+.+)*/,
            lookbehind: !0,
            alias: "comment"
        },
        "multiline-code": [{
            pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*((?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*((?:\r?\n|\r)\2[\t ]+.+)/,
            lookbehind: !0,
            inside: {
                rest: e.languages.ruby
            }
        }, {
            pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*((?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
            lookbehind: !0,
            inside: {
                rest: e.languages.ruby
            }
        }],
        filter: {
            pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+((?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
            lookbehind: !0,
            inside: {
                "filter-name": {
                    pattern: /^:[\w-]+/,
                    alias: "variable"
                }
            }
        },
        markup: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
            lookbehind: !0,
            inside: {
                rest: e.languages.markup
            }
        },
        doctype: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
            lookbehind: !0
        },
        tag: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
            lookbehind: !0,
            inside: {
                attributes: [{
                    pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
                    lookbehind: !0,
                    inside: {
                        rest: e.languages.ruby
                    }
                }, {
                    pattern: /\([^)]+\)/,
                    inside: {
                        "attr-value": {
                            pattern: /(=\s*)(?:"(?:\\?.)*?"|[^)\s]+)/,
                            lookbehind: !0
                        },
                        "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                        punctuation: /[=(),]/
                    }
                }, {
                    pattern: /\[[^\]]+\]/,
                    inside: {
                        rest: e.languages.ruby
                    }
                }],
                punctuation: /[<>]/
            }
        },
        code: {
            pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
            lookbehind: !0,
            inside: {
                rest: e.languages.ruby
            }
        },
        interpolation: {
            pattern: /#\{[^}]+\}/,
            inside: {
                delimiter: {
                    pattern: /^#\{|\}$/,
                    alias: "punctuation"
                },
                rest: e.languages.ruby
            }
        },
        punctuation: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
            lookbehind: !0
        }
    };
    for (var t = "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}((?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+", r = ["css", {
        filter: "coffee",
        language: "coffeescript"
    }, "erb", "javascript", "less", "markdown", "ruby", "scss", "textile"], n = {}, a = 0, i = r.length; i > a; a++) {
        var l = r[a];
        l = "string" == typeof l ? {
            filter: l,
            language: l
        } : l, e.languages[l.language] && (n["filter-" + l.filter] = {
            pattern: RegExp(t.replace("{{filter_name}}", l.filter)),
            lookbehind: !0,
            inside: {
                "filter-name": {
                    pattern: /^:[\w-]+/,
                    alias: "variable"
                },
                rest: e.languages[l.language]
            }
        })
    }
    e.languages.insertBefore("haml", "filter", n)
}(Prism);
Prism.languages.haskell = {
    comment: {
        pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\w\W]*?-})/m,
        lookbehind: !0
    },
    "char": /'([^\\']|\\([abfnrtv\\"'&]|\^[A-Z@[\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
    string: {
        pattern: /"([^\\"]|\\([abfnrtv\\"'&]|\^[A-Z@[\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
        greedy: !0
    },
    keyword: /\b(case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    import_statement: {
        pattern: /(\r?\n|\r|^)\s*import\s+(qualified\s+)?([A-Z][_a-zA-Z0-9']*)(\.[A-Z][_a-zA-Z0-9']*)*(\s+as\s+([A-Z][_a-zA-Z0-9']*)(\.[A-Z][_a-zA-Z0-9']*)*)?(\s+hiding\b)?/m,
        inside: {
            keyword: /\b(import|qualified|as|hiding)\b/
        }
    },
    builtin: /\b(abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(\d+(\.\d+)?(e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][_a-zA-Z0-9']*\.)*[_a-z][_a-zA-Z0-9']*`/,
    hvariable: /\b([A-Z][_a-zA-Z0-9']*\.)*[_a-z][_a-zA-Z0-9']*\b/,
    constant: /\b([A-Z][_a-zA-Z0-9']*\.)*[A-Z][_a-zA-Z0-9']*\b/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.http = {
    "request-line": {
        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
        inside: {
            property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
            "attr-name": /:\w+/
        }
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] [0-9]+.*/m,
        inside: {
            property: {
                pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
                lookbehind: !0
            }
        }
    },
    "header-name": {
        pattern: /^[\w-]+:(?=.)/m,
        alias: "keyword"
    }
};
var httpLanguages = {
    "application/json": Prism.languages.javascript,
    "application/xml": Prism.languages.markup,
    "text/xml": Prism.languages.markup,
    "text/html": Prism.languages.markup
};
for (var contentType in httpLanguages)
    if (httpLanguages[contentType]) {
        var options = {};
        options[contentType] = {
            pattern: new RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
            lookbehind: !0,
            inside: {
                rest: httpLanguages[contentType]
            }
        }, Prism.languages.insertBefore("http", "header-name", options)
    };
Prism.languages.ini = {
    comment: /^[ \t]*;.*$/m,
    important: /\[.*?\]/,
    constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
    "attr-value": {
        pattern: /=.*/,
        inside: {
            punctuation: /^[=]/
        }
    }
};
! function(e) {
    e.languages.jade = {
        comment: {
            pattern: /(^([\t ]*))\/\/.*((?:\r?\n|\r)\2[\t ]+.+)*/m,
            lookbehind: !0
        },
        "multiline-script": {
            pattern: /(^([\t ]*)script\b.*\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: {
                rest: e.languages.javascript
            }
        },
        filter: {
            pattern: /(^([\t ]*)):.+((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: {
                "filter-name": {
                    pattern: /^:[\w-]+/,
                    alias: "variable"
                }
            }
        },
        "multiline-plain-text": {
            pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0
        },
        markup: {
            pattern: /(^[\t ]*)<.+/m,
            lookbehind: !0,
            inside: {
                rest: e.languages.markup
            }
        },
        doctype: {
            pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
            lookbehind: !0
        },
        "flow-control": {
            pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
            lookbehind: !0,
            inside: {
                each: {
                    pattern: /^each .+? in\b/,
                    inside: {
                        keyword: /\b(?:each|in)\b/,
                        punctuation: /,/
                    }
                },
                branch: {
                    pattern: /^(?:if|unless|else|case|when|default|while)\b/,
                    alias: "keyword"
                },
                rest: e.languages.javascript
            }
        },
        keyword: {
            pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
            lookbehind: !0
        },
        mixin: [{
            pattern: /(^[\t ]*)mixin .+/m,
            lookbehind: !0,
            inside: {
                keyword: /^mixin/,
                "function": /\w+(?=\s*\(|\s*$)/,
                punctuation: /[(),.]/
            }
        }, {
            pattern: /(^[\t ]*)\+.+/m,
            lookbehind: !0,
            inside: {
                name: {
                    pattern: /^\+\w+/,
                    alias: "function"
                },
                rest: e.languages.javascript
            }
        }],
        script: {
            pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
            lookbehind: !0,
            inside: {
                rest: e.languages.javascript
            }
        },
        "plain-text": {
            pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
            lookbehind: !0
        },
        tag: {
            pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
            lookbehind: !0,
            inside: {
                attributes: [{
                    pattern: /&[^(]+\([^)]+\)/,
                    inside: {
                        rest: e.languages.javascript
                    }
                }, {
                    pattern: /\([^)]+\)/,
                    inside: {
                        "attr-value": {
                            pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                            lookbehind: !0,
                            inside: {
                                rest: e.languages.javascript
                            }
                        },
                        "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                        punctuation: /[!=(),]+/
                    }
                }],
                punctuation: /:/
            }
        },
        code: [{
            pattern: /(^[\t ]*(?:-|!?=)).+/m,
            lookbehind: !0,
            inside: {
                rest: e.languages.javascript
            }
        }],
        punctuation: /[.\-!=|]+/
    };
    for (var t = "(^([\\t ]*)):{{filter_name}}((?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+", n = [{
        filter: "atpl",
        language: "twig"
    }, {
        filter: "coffee",
        language: "coffeescript"
    }, "ejs", "handlebars", "hogan", "less", "livescript", "markdown", "mustache", "plates", {
        filter: "sass",
        language: "scss"
    }, "stylus", "swig"], a = {}, i = 0, r = n.length; r > i; i++) {
        var s = n[i];
        s = "string" == typeof s ? {
            filter: s,
            language: s
        } : s, e.languages[s.language] && (a["filter-" + s.filter] = {
            pattern: RegExp(t.replace("{{filter_name}}", s.filter), "m"),
            lookbehind: !0,
            inside: {
                "filter-name": {
                    pattern: /^:[\w-]+/,
                    alias: "variable"
                },
                rest: e.languages[s.language]
            }
        })
    }
    e.languages.insertBefore("jade", "filter", a)
}(Prism);
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
    operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
        lookbehind: !0
    }
}), Prism.languages.insertBefore("java", "function", {
    annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0
    }
});
Prism.languages.json = {
    property: /".*?"(?=\s*:)/gi,
    string: /"(?!:)(\\?[^"])*?"(?!:)/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    punctuation: /[{}[\]);,]/g,
    operator: /:/g,
    "boolean": /\b(true|false)\b/gi,
    "null": /\bnull\b/gi
}, Prism.languages.jsonp = Prism.languages.json;
! function(a) {
    var e = /\\([^a-z()[\]]|[a-z\*]+)/i,
        n = {
            "equation-command": {
                pattern: e,
                alias: "regex"
            }
        };
    a.languages.latex = {
        comment: /%.*/m,
        cdata: {
            pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,
            lookbehind: !0
        },
        equation: [{
            pattern: /\$(?:\\?[\w\W])*?\$|\\\((?:\\?[\w\W])*?\\\)|\\\[(?:\\?[\w\W])*?\\\]/,
            inside: n,
            alias: "string"
        }, {
            pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,
            lookbehind: !0,
            inside: n,
            alias: "string"
        }],
        keyword: {
            pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
            lookbehind: !0
        },
        url: {
            pattern: /(\\url\{)[^}]+(?=\})/,
            lookbehind: !0
        },
        headline: {
            pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
            lookbehind: !0,
            alias: "class-name"
        },
        "function": {
            pattern: e,
            alias: "selector"
        },
        punctuation: /[[\]{}&]/
    }
}(Prism);
Prism.languages.less = Prism.languages.extend("css", {
    comment: [/\/\*[\w\W]*?\*\//, {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: !0
    }],
    atrule: {
        pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
        inside: {
            punctuation: /[:()]/
        }
    },
    selector: {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
        inside: {
            variable: /@+[\w-]+/
        }
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    punctuation: /[{}();:,]/,
    operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", {
    "function": Prism.languages.less.function
}), Prism.languages.insertBefore("less", "property", {
    variable: [{
        pattern: /@[\w-]+\s*:/,
        inside: {
            punctuation: /:/
        }
    }, /@@?[\w-]+/],
    "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
        lookbehind: !0,
        alias: "function"
    }
});
Prism.languages.makefile = {
    comment: {
        pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|.)*/,
        lookbehind: !0
    },
    string: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    symbol: {
        pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
        inside: {
            variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/
        }
    },
    variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    keyword: [/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, {
        pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
        lookbehind: !0
    }],
    operator: /(?:::|[?:+!])?=|[|@]/,
    punctuation: /[:;(){}]/
};
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {
        pattern: /^>(?:[\t ]*>)*/m,
        alias: "punctuation"
    },
    code: [{
        pattern: /^(?: {4}|\t).+/m,
        alias: "keyword"
    }, {
        pattern: /``.+?``|`[^`\n]+`/,
        alias: "keyword"
    }],
    title: [{
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: {
            punctuation: /==+$|--+$/
        }
    }, {
        pattern: /(^\s*)#+.+/m,
        lookbehind: !0,
        alias: "important",
        inside: {
            punctuation: /^#+|#+$/
        }
    }],
    hr: {
        pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: !0,
        alias: "punctuation"
    },
    list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: "punctuation"
    },
    "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: {
                pattern: /^(!?\[)[^\]]+/,
                lookbehind: !0
            },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {
            punctuation: /^\*\*|^__|\*\*$|__$/
        }
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {
            punctuation: /^[*_]|[*_]$/
        }
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: {
                pattern: /(!?\[)[^\]]+(?=\]$)/,
                lookbehind: !0
            },
            string: {
                pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
            }
        }
    }
}), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.matlab = {
    string: /\B'(?:''|[^'\n])*'/,
    comment: [/%\{[\s\S]*?\}%/, /%.+/],
    number: /\b-?(?:\d*\.?\d+(?:[eE][+-]?\d+)?(?:[ij])?|[ij])\b/,
    keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    "function": /(?!\d)\w+(?=\s*\()/,
    operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
    punctuation: /\.{3}|[.,;\[\](){}!]/
};
Prism.languages.objectivec = Prism.languages.extend("c", {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    string: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
Prism.languages.pascal = {
    comment: [/\(\*[\s\S]+?\*\)/, /\{[\s\S]+?\}/, /\/\/.*/],
    string: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
    keyword: [{
        pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
        lookbehind: !0
    }, {
        pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
        lookbehind: !0
    }],
    number: [/[+-]?(?:[&%]\d+|\$[a-f\d]+)/i, /([+-]|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?/i],
    operator: [/\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i, {
        pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
        lookbehind: !0
    }],
    punctuation: /\(\.|\.\)|[()\[\]:;,.]/
};
Prism.languages.perl = {
    comment: [{
        pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\$])#.*/,
        lookbehind: !0
    }],
    string: [/\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/, /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\1/, /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, /("|`)(?:[^\\]|\\[\s\S])*?\1/, /'(?:[^'\\\r\n]|\\.)*'/],
    regex: [/\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[msixpodualngc]*/, /\b(?:m|qr)\s+([a-zA-Z0-9])(?:[^\\]|\\.)*?\1[msixpodualngc]*/, /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/, /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/, /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/, /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
        lookbehind: !0
    }, {
        pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
        lookbehind: !0
    }, /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/],
    variable: [/[&*$@%]\{\^[A-Z]+\}/, /[&*$@%]\^[A-Z_]/, /[&*$@%]#?(?=\{)/, /[&*$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i, /[&*$@%]\d+/, /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
    filehandle: {
        pattern: /<(?![<=])\S*>|\b_\b/,
        alias: "symbol"
    },
    vstring: {
        pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
        alias: "string"
    },
    "function": {
        pattern: /sub [a-z0-9_]+/i,
        inside: {
            keyword: /sub/
        }
    },
    keyword: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number: /\b-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)\b/,
    operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    punctuation: /[{}[\];(),:]/
};
Prism.languages.php = Prism.languages.extend("clike", {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
        lookbehind: !0,
        greedy: !0
    }
}), Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        alias: "comment"
    }
}), Prism.languages.insertBefore("php", "keyword", {
    delimiter: /\?>|<\?(?:php)?/i,
    variable: /\$\w+\b/i,
    "package": {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
        lookbehind: !0,
        inside: {
            punctuation: /\\/
        }
    }
}), Prism.languages.insertBefore("php", "operator", {
    property: {
        pattern: /(->)[\w]+/,
        lookbehind: !0
    }
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
    "php" === e.language && (e.tokenStack = [], e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(n) {
        return e.tokenStack.push(n), "{{{PHP" + e.tokenStack.length + "}}}"
    }))
}), Prism.hooks.add("after-highlight", function(e) {
    if ("php" === e.language) {
        for (var n, a = 0; n = e.tokenStack[a]; a++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php").replace(/\$/g, "$$$$"));
        e.element.innerHTML = e.highlightedCode
    }
}), Prism.hooks.add("wrap", function(e) {
    "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}), Prism.languages.insertBefore("php", "comment", {
    markup: {
        pattern: /<[^?]\/?(.*?)>/,
        inside: Prism.languages.markup
    },
    php: /\{\{\{PHP[0-9]+\}\}\}/
}));
Prism.languages.insertBefore("php", "variable", {
    "this": /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
    scope: {
        pattern: /\b[\w\\]+::/,
        inside: {
            keyword: /(static|self|parent)/,
            punctuation: /(::|\\)/
        }
    }
});
Prism.languages.prolog = {
    comment: [/%.+/, /\/\*[\s\S]*?\*\//],
    string: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
    variable: /\b[A-Z_]\w*/,
    "function": /\b[a-z]\w*(?:(?=\()|\/\d+)/,
    number: /\b\d+\.?\d*/,
    operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
    punctuation: /[(){}\[\],]/
};
Prism.languages.python = {
    "triple-quoted-string": {
        pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
        alias: "string"
    },
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(?:\\\\|\\?[^\\\r\n])*?\1/,
        greedy: !0
    },
    "function": {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
        lookbehind: !0
    },
    "class-name": {
        pattern: /(\bclass\s+)[a-z0-9_]+/i,
        lookbehind: !0
    },
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
    "boolean": /\b(?:True|False)\b/,
    number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.r = {
    comment: /#.*/,
    string: /(['"])(?:\\?.)*?\1/,
    "percent-operator": {
        pattern: /%[^%\s]*%/,
        alias: "operator"
    },
    "boolean": /\b(?:TRUE|FALSE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [/\b(?:NaN|Inf)\b/, /\b(?:0x[\dA-Fa-f]+(?:\.\d*)?|\d*\.?\d+)(?:[EePp][+-]?\d+)?[iL]?\b/],
    keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
    punctuation: /[(){}\[\],;]/
};
! function(a) {
    var e = a.util.clone(a.languages.javascript);
    a.languages.jsx = a.languages.extend("markup", e), a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;
    var s = a.util.clone(a.languages.jsx);
    delete s.punctuation, s = a.languages.insertBefore("jsx", "operator", {
        punctuation: /=(?={)|[{}[\];(),.:]/
    }, {
        jsx: s
    }), a.languages.insertBefore("inside", "attr-value", {
        script: {
            pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
            inside: s,
            alias: "language-javascript"
        }
    }, a.languages.jsx.tag)
}(Prism);
! function(e) {
    e.languages.sass = e.languages.extend("css", {
        comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
            lookbehind: !0
        }
    }), e.languages.insertBefore("sass", "atrule", {
        "atrule-line": {
            pattern: /^(?:[ \t]*)[@+=].+/m,
            inside: {
                atrule: /(?:@[\w-]+|[+=])/m
            }
        }
    }), delete e.languages.sass.atrule;
    var a = /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,
        t = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
            pattern: /(\s+)-(?=\s)/,
            lookbehind: !0
        }];
    e.languages.insertBefore("sass", "property", {
        "variable-line": {
            pattern: /^[ \t]*\$.+/m,
            inside: {
                punctuation: /:/,
                variable: a,
                operator: t
            }
        },
        "property-line": {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
            inside: {
                property: [/[^:\s]+(?=\s*:)/, {
                    pattern: /(:)[^:\s]+/,
                    lookbehind: !0
                }],
                punctuation: /:/,
                variable: a,
                operator: t,
                important: e.languages.sass.important
            }
        }
    }), delete e.languages.sass.property, delete e.languages.sass.important, delete e.languages.sass.selector, e.languages.insertBefore("sass", "punctuation", {
        selector: {
            pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
            lookbehind: !0
        }
    })
}(Prism);
Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
        lookbehind: !0
    },
    atrule: {
        pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /(?:[-a-z]+-)*url(?=\()/i,
    selector: {
        pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
        inside: {
            parent: {
                pattern: /&/,
                alias: "important"
            },
            placeholder: /%[-_\w]+/,
            variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
        }
    }
}), Prism.languages.insertBefore("scss", "atrule", {
    keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
        pattern: /( +)(?:from|through)(?= )/,
        lookbehind: !0
    }]
}), Prism.languages.scss.property = {
    pattern: /(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,
    inside: {
        variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
    }
}, Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
    placeholder: {
        pattern: /%[-_\w]+/,
        alias: "selector"
    },
    statement: {
        pattern: /\B!(?:default|optional)\b/i,
        alias: "keyword"
    },
    "boolean": /\b(?:true|false)\b/,
    "null": /\bnull\b/,
    operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: !0
    }
}), Prism.languages.scss.atrule.inside.rest = Prism.util.clone(Prism.languages.scss);
Prism.languages.scala = Prism.languages.extend("java", {
    keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
    string: [{
        pattern: /"""[\W\w]*?"""/,
        greedy: !0
    }, {
        pattern: /("|')(?:\\\\|\\?[^\\\r\n])*?\1/,
        greedy: !0
    }],
    builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
    number: /\b(?:0x[\da-f]*\.?[\da-f]+|\d*\.?\d+e?\d*[dfl]?)\b/i,
    symbol: /'[^\d\s\\]\w*/
}), delete Prism.languages.scala["class-name"], delete Prism.languages.scala["function"];
Prism.languages.scheme = {
    comment: /;.*/,
    string: /"(?:[^"\\\r\n]|\\.)*?"|'[^('\s]*/,
    keyword: {
        pattern: /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)/,
        lookbehind: !0
    },
    builtin: {
        pattern: /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)/,
        lookbehind: !0
    },
    number: {
        pattern: /(\s|\))[-+]?[0-9]*\.?[0-9]+(?:\s*[-+]\s*[0-9]*\.?[0-9]+i)?\b/,
        lookbehind: !0
    },
    "boolean": /#[tf]/,
    operator: {
        pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)/,
        lookbehind: !0
    },
    "function": {
        pattern: /(\()[^\s()]*(?=\s)/,
        lookbehind: !0
    },
    punctuation: /[()]/
};
Prism.languages.smalltalk = {
    comment: /"(?:""|[^"])+"/,
    string: /'(?:''|[^'])+'/,
    symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
    "block-arguments": {
        pattern: /(\[\s*):[^\[|]*?\|/,
        lookbehind: !0,
        inside: {
            variable: /:[\da-z]+/i,
            punctuation: /\|/
        }
    },
    "temporary-variables": {
        pattern: /\|[^|]+\|/,
        inside: {
            variable: /[\da-z]+/i,
            punctuation: /\|/
        }
    },
    keyword: /\b(?:nil|true|false|self|super|new)\b/,
    character: {
        pattern: /\$./,
        alias: "string"
    },
    number: [/\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/, /(?:\B-|\b)\d+(?:\.\d+)?(?:e-?\d+)?/],
    operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
    punctuation: /[.;:?\[\](){}]/
};
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    string: {
        pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
        lookbehind: !0
    },
    variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
    "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
    operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
Prism.languages.swift = Prism.languages.extend("clike", {
    string: {
        pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
                inside: {
                    delimiter: {
                        pattern: /^\\\(|\)$/,
                        alias: "variable"
                    }
                }
            }
        }
    },
    keyword: /\b(as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
    number: /\b([\d_]+(\.[\de_]+)?|0x[a-f0-9_]+(\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    constant: /\b(nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    atrule: /@\b(IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
    builtin: /\b([A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
}), Prism.languages.swift.string.inside.interpolation.inside.rest = Prism.util.clone(Prism.languages.swift);
Prism.languages.typescript = Prism.languages.extend("javascript", {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/
});
Prism.languages.wiki = Prism.languages.extend("markup", {
    "block-comment": {
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0,
        alias: "comment"
    },
    heading: {
        pattern: /^(=+).+?\1/m,
        inside: {
            punctuation: /^=+|=+$/,
            important: /.+/
        }
    },
    emphasis: {
        pattern: /('{2,5}).+?\1/,
        inside: {
            "bold italic": {
                pattern: /(''''').+?(?=\1)/,
                lookbehind: !0
            },
            bold: {
                pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
                lookbehind: !0
            },
            italic: {
                pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
                lookbehind: !0
            },
            punctuation: /^''+|''+$/
        }
    },
    hr: {
        pattern: /^-{4,}/m,
        alias: "punctuation"
    },
    url: [/ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:RFC|PMID) +\d+/i, /\[\[.+?\]\]|\[.+?\]/],
    variable: [/__[A-Z]+__/, /\{{3}.+?\}{3}/, /\{\{.+?}}/],
    symbol: [/^#redirect/im, /~{3,5}/],
    "table-tag": {
        pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
        lookbehind: !0,
        inside: {
            "table-bar": {
                pattern: /\|$/,
                alias: "punctuation"
            },
            rest: Prism.languages.markup.tag.inside
        }
    },
    punctuation: /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
}), Prism.languages.insertBefore("wiki", "tag", {
    nowiki: {
        pattern: /<(nowiki|pre|source)\b[\w\W]*?>[\w\W]*?<\/\1>/i,
        inside: {
            tag: {
                pattern: /<(?:nowiki|pre|source)\b[\w\W]*?>|<\/(?:nowiki|pre|source)>/i,
                inside: Prism.languages.markup.tag.inside
            }
        }
    }
});
Prism.languages.yaml = {
    scalar: {
        pattern: /([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,
        lookbehind: !0,
        alias: "string"
    },
    comment: /#.*/,
    key: {
        pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
        lookbehind: !0,
        alias: "atrule"
    },
    directive: {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: !0,
        alias: "important"
    },
    datetime: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*($|,|]|}))/m,
        lookbehind: !0,
        alias: "number"
    },
    "boolean": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: "important"
    },
    "null": {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: "important"
    },
    string: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')(?=[ \t]*($|,|]|}))/m,
        lookbehind: !0
    },
    number: {
        pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\da-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0
    },
    tag: /![^\s]+/,
    important: /[&*][\w]+/,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
};
! function() {
    function e(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }

    function t(e, t) {
        return t = " " + t + " ", (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    }

    function n(e, n, i) {
        for (var o, a = n.replace(/\s+/g, "").split(","), l = +e.getAttribute("data-line-offset") || 0, d = r() ? parseInt : parseFloat, c = d(getComputedStyle(e).lineHeight), s = 0; o = a[s++];) {
            o = o.split("-");
            var u = +o[0],
                m = +o[1] || u,
                h = document.createElement("div");
            h.textContent = Array(m - u + 2).join(" \n"), h.setAttribute("aria-hidden", "true"), h.className = (i || "") + " line-highlight", t(e, "line-numbers") || (h.setAttribute("data-start", u), m > u && h.setAttribute("data-end", m)), h.style.top = (u - l - 1) * c + "px", t(e, "line-numbers") ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h)
        }
    }

    function i() {
        var t = location.hash.slice(1);
        e(".temporary.line-highlight").forEach(function(e) {
            e.parentNode.removeChild(e)
        });
        var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
        if (i && !document.getElementById(t)) {
            var r = t.slice(0, t.lastIndexOf(".")),
                o = document.getElementById(r);
            o && (o.hasAttribute("data-line") || o.setAttribute("data-line", ""), n(o, i, "temporary "), document.querySelector(".temporary.line-highlight").scrollIntoView())
        }
    }
    if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
        var r = function() {
                var e;
                return function() {
                    if ("undefined" == typeof e) {
                        var t = document.createElement("div");
                        t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = 0, t.style.border = 0, t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t)
                    }
                    return e
                }
            }(),
            o = 0;
        Prism.hooks.add("complete", function(t) {
            var r = t.element.parentNode,
                a = r && r.getAttribute("data-line");
            r && a && /pre/i.test(r.nodeName) && (clearTimeout(o), e(".line-highlight", r).forEach(function(e) {
                e.parentNode.removeChild(e)
            }), n(r, a), o = setTimeout(i, 1))
        }), window.addEventListener && window.addEventListener("hashchange", i)
    }
}();
! function() {
    "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("complete", function(e) {
        if (e.code) {
            var t = e.element.parentNode,
                s = /\s*\bline-numbers\b\s*/;
            if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
                s.test(e.element.className) && (e.element.className = e.element.className.replace(s, "")), s.test(t.className) || (t.className += " line-numbers");
                var n, a = e.code.match(/\n(?!$)/g),
                    l = a ? a.length + 1 : 1,
                    r = new Array(l + 1);
                r = r.join("<span></span>"), n = document.createElement("span"), n.setAttribute("aria-hidden", "true"), n.className = "line-numbers-rows", n.innerHTML = r, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), e.element.appendChild(n)
            }
        }
    })
}();
! function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var e = {
            html: "HTML",
            xml: "XML",
            svg: "SVG",
            mathml: "MathML",
            css: "CSS",
            clike: "C-like",
            javascript: "JavaScript",
            abap: "ABAP",
            actionscript: "ActionScript",
            apacheconf: "Apache Configuration",
            apl: "APL",
            applescript: "AppleScript",
            asciidoc: "AsciiDoc",
            aspnet: "ASP.NET (C#)",
            autoit: "AutoIt",
            autohotkey: "AutoHotkey",
            basic: "BASIC",
            csharp: "C#",
            cpp: "C++",
            coffeescript: "CoffeeScript",
            "css-extras": "CSS Extras",
            fsharp: "F#",
            glsl: "GLSL",
            graphql: "GraphQL",
            http: "HTTP",
            inform7: "Inform 7",
            json: "JSON",
            latex: "LaTeX",
            livescript: "LiveScript",
            lolcode: "LOLCODE",
            matlab: "MATLAB",
            mel: "MEL",
            nasm: "NASM",
            nginx: "nginx",
            nsis: "NSIS",
            objectivec: "Objective-C",
            ocaml: "OCaml",
            parigp: "PARI/GP",
            php: "PHP",
            "php-extras": "PHP Extras",
            powershell: "PowerShell",
            properties: ".properties",
            protobuf: "Protocol Buffers",
            jsx: "React JSX",
            rest: "reST (reStructuredText)",
            sas: "SAS",
            sass: "Sass (Sass)",
            scss: "Sass (Scss)",
            sql: "SQL",
            typescript: "TypeScript",
            vhdl: "VHDL",
            vim: "vim",
            wiki: "Wiki markup",
            xojo: "Xojo (REALbasic)",
            yaml: "YAML"
        };
        Prism.hooks.add("before-highlight", function(s) {
            var a = s.element.parentNode;
            if (a && /pre/i.test(a.nodeName)) {
                var t, i, r = a.getAttribute("data-language") || e[s.language] || s.language.substring(0, 1).toUpperCase() + s.language.substring(1),
                    p = a.previousSibling;
                p && /\s*\bprism-show-language\b\s*/.test(p.className) && p.firstChild && /\s*\bprism-show-language-label\b\s*/.test(p.firstChild.className) ? i = p.firstChild : (t = document.createElement("div"), i = document.createElement("div"), i.className = "prism-show-language-label", t.className = "prism-show-language", t.appendChild(i), a.parentNode.insertBefore(t, a)), i.innerHTML = r
            }
        })
    }
}();

/* perfect-scrollbar v0.7.1 */
! function t(e, n, r) {
    function o(i, s) {
        if (!n[i]) {
            if (!e[i]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (l) return l(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[i] = {
                exports: {}
            };
            e[i][0].call(u.exports, function(t) {
                var n = e[i][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[i].exports
    }
    for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) o(r[i]);
    return o
}({
    1: [function(t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function(t) {
                return this.each(function() {
                    if ("object" == typeof t || "undefined" == typeof t) {
                        var e = t;
                        l.get(this) || o.initialize(this, e)
                    } else {
                        var n = t;
                        "update" === n ? o.update(this) : "destroy" === n && o.destroy(this)
                    }
                })
            }
        }
        var o = t("../main"),
            l = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r);
        else {
            var i = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof i && r(i)
        }
        e.exports = r
    }, {
        "../main": 7,
        "../plugin/instances": 18
    }],
    2: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" "),
                r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }
        n.add = function(t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function(t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function(t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
        }
    }, {}],
    3: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function l(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }
        var i = {};
        i.e = function(t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, i.appendTo = function(t, e) {
            return e.appendChild(t), t
        }, i.css = function(t, e, n) {
            return "object" == typeof e ? l(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, i.matches = function(t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, i.remove = function(t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, i.queryChildren = function(t, e) {
            return Array.prototype.filter.call(t.childNodes, function(t) {
                return i.matches(t, e)
            })
        }, e.exports = i
    }, {}],
    4: [function(t, e, n) {
        "use strict";
        var r = function(t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function(t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function(t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function(r) {
                return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function() {
            for (var t in this.events) this.unbind(t)
        };
        var o = function() {
            this.eventElements = []
        };
        o.prototype.eventElement = function(t) {
            var e = this.eventElements.filter(function(e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function(t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function(t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function() {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function(t, e, n) {
            var r = this.eventElement(t),
                o = function(t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = o
    }, {}],
    5: [function(t, e, n) {
        "use strict";
        e.exports = function() {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function() {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}],
    6: [function(t, e, n) {
        "use strict";

        function r(t) {
            return function(e, n) {
                t(e, "ps--in-scrolling"), "undefined" != typeof n ? t(e, "ps--" + n) : (t(e, "ps--x"), t(e, "ps--y"))
            }
        }
        var o = t("./class"),
            l = t("./dom"),
            i = n.toInt = function(t) {
                return parseInt(t, 10) || 0
            },
            s = n.clone = function(t) {
                if (t) {
                    if (Array.isArray(t)) return t.map(s);
                    if ("object" == typeof t) {
                        var e = {};
                        for (var n in t) e[n] = s(t[n]);
                        return e
                    }
                    return t
                }
                return null
            };
        n.extend = function(t, e) {
            var n = s(t);
            for (var r in e) n[r] = s(e[r]);
            return n
        }, n.isEditable = function(t) {
            return l.matches(t, "input,[contenteditable]") || l.matches(t, "select,[contenteditable]") || l.matches(t, "textarea,[contenteditable]") || l.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function(t) {
            for (var e = o.list(t), n = 0; n < e.length; n++) {
                var r = e[n];
                0 === r.indexOf("ps-") && o.remove(t, r)
            }
        }, n.outerWidth = function(t) {
            return i(l.css(t, "width")) + i(l.css(t, "paddingLeft")) + i(l.css(t, "paddingRight")) + i(l.css(t, "borderLeftWidth")) + i(l.css(t, "borderRightWidth"))
        }, n.startScrolling = r(o.add), n.stopScrolling = r(o.remove), n.env = {
            isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: "undefined" != typeof window && null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"),
            o = t("./plugin/initialize"),
            l = t("./plugin/update");
        e.exports = {
            initialize: o,
            update: l,
            destroy: r
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(t, e, n) {
        "use strict";
        e.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            swipeEasing: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }
            var r = function(t) {
                t.stopPropagation()
            };
            e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function(r) {
                var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top,
                    s = o > e.scrollbarYTop ? 1 : -1;
                i(t, "top", t.scrollTop + s * e.containerHeight), l(t), r.stopPropagation()
            }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function(r) {
                var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left,
                    s = o > e.scrollbarXLeft ? 1 : -1;
                i(t, "left", t.scrollLeft + s * e.containerWidth), l(t), r.stopPropagation()
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio,
                    i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                o < 0 ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarX, "mousedown", function(n) {
                o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio,
                    i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                o < 0 ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarY, "mousedown", function(n) {
                o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }
        var l = t("../../lib/helper"),
            i = t("../../lib/dom"),
            s = t("../instances"),
            a = t("../update-geometry"),
            c = t("../update-scroll");
        e.exports = function(t) {
            var e = s.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }
            var r = !1;
            e.event.bind(t, "mouseenter", function() {
                r = !0
            }), e.event.bind(t, "mouseleave", function() {
                r = !1
            });
            var i = !1;
            e.event.bind(e.ownerDocument, "keydown", function(c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");
                    if (r || u) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement;
                            else
                                for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                            if (o.isEditable(d)) return
                        }
                        var p = 0,
                            f = 0;
                        switch (c.which) {
                            case 37:
                                p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                                break;
                            case 38:
                                f = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                                break;
                            case 39:
                                p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                                break;
                            case 40:
                                f = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = c.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                f = -90;
                                break;
                            case 35:
                                f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                break;
                            case 36:
                                f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return
                        }
                        a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), i = n(p, f), i && c.preventDefault()
                    }
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../../lib/dom"),
            i = t("../instances"),
            s = t("../update-geometry"),
            a = t("../update-scroll");
        e.exports = function(t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX,
                    n = -1 * t.deltaY;
                return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
            }

            function o(e, n) {
                var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (r) {
                    var o = window.getComputedStyle(r),
                        l = [o.overflow, o.overflowX, o.overflowY].join("");
                    if (!l.match(/(scroll|auto)/)) return !1;
                    var i = r.scrollHeight - r.clientHeight;
                    if (i > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === i && n < 0)) return !0;
                    var s = r.scrollLeft - r.clientWidth;
                    if (s > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === s && e > 0)) return !0
                }
                return !1
            }

            function s(s) {
                var c = r(s),
                    u = c[0],
                    d = c[1];
                o(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? i(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : i(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : i(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), l(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
            }
            var a = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function() {
                l(t)
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function() {
                    return l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void i(t)) : void clearInterval(c)
                }, 50))
            }

            function a() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }
            var c = null,
                u = {
                    top: 0,
                    left: 0
                },
                d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function() {
                t.contains(n()) ? d = !0 : (d = !1, a())
            }), e.event.bind(window, "mouseup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "keyup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "mousemove", function(e) {
                if (d) {
                    var n = {
                            x: e.pageX,
                            y: e.pageY
                        },
                        l = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < l.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > l.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < l.top + 3 ? (l.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > l.bottom - 3 ? (n.y - l.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r()
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function o(n, r) {
                var o = t.scrollTop,
                    l = t.scrollLeft,
                    i = Math.abs(n),
                    s = Math.abs(r);
                if (s > i) {
                    if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                } else if (i > s && (n < 0 && l === e.contentWidth - e.containerWidth || n > 0 && 0 === l)) return !e.settings.swipePropagation;
                return !0
            }

            function a(e, n) {
                s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t)
            }

            function c() {
                w = !0
            }

            function u() {
                w = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
            }

            function f(t) {
                if (p(t)) {
                    Y = !0;
                    var e = d(t);
                    g.pageX = e.pageX, g.pageY = e.pageY, v = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!Y && e.settings.swipePropagation && f(t), !w && Y && p(t)) {
                    var n = d(t),
                        r = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        },
                        l = r.pageX - g.pageX,
                        i = r.pageY - g.pageY;
                    a(l, i), g = r;
                    var s = (new Date).getTime(),
                        c = s - v;
                    c > 0 && (m.x = l / c, m.y = i / c, v = s), o(l, i) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function b() {
                !w && Y && (Y = !1, e.settings.swipeEasing && (clearInterval(y), y = setInterval(function() {
                    return l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void(m.y *= .8)) : void clearInterval(y)
                }, 10)))
            }
            var g = {},
                v = 0,
                m = {},
                y = null,
                w = !1,
                Y = !1;
            n ? (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)) : r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)))
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            if (o.env.supportsTouch || o.env.supportsIePointer) {
                var e = l.get(t);
                r(t, e, o.env.supportsTouch, o.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/class"),
            l = t("./instances"),
            i = t("./update-geometry"),
            s = {
                "click-rail": t("./handler/click-rail"),
                "drag-scrollbar": t("./handler/drag-scrollbar"),
                keyboard: t("./handler/keyboard"),
                wheel: t("./handler/mouse-wheel"),
                touch: t("./handler/touch"),
                selection: t("./handler/selection")
            },
            a = t("./handler/native-scroll");
        e.exports = function(t, e) {
            e = "object" == typeof e ? e : {}, o.add(t, "ps");
            var n = l.add(t);
            n.settings = r.extend(n.settings, e), o.add(t, "ps--theme_" + n.settings.theme), n.settings.handlers.forEach(function(e) {
                s[e](t)
            }), a(t), i(t)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(t, e, n) {
        "use strict";

        function r(t) {
            function e() {
                a.add(t, "ps--focus")
            }

            function n() {
                a.remove(t, "ps--focus")
            }
            var r = this;
            r.settings = s.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function() {
                var e = t.scrollLeft,
                    n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.event = new d, r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps__scrollbar-x-rail"), t), r.scrollbarX = u.appendTo(u.e("div", "ps__scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = s.toInt(u.css(r.scrollbarXRail, "bottom")), r.isScrollbarXUsingBottom = r.scrollbarXBottom === r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : s.toInt(u.css(r.scrollbarXRail, "top")), r.railBorderXWidth = s.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = s.toInt(u.css(r.scrollbarXRail, "marginLeft")) + s.toInt(u.css(r.scrollbarXRail, "marginRight")), u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, r.scrollbarYRail = u.appendTo(u.e("div", "ps__scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps__scrollbar-y"), r.scrollbarYRail), r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, r.scrollbarYTop = null, r.scrollbarYRight = s.toInt(u.css(r.scrollbarYRail, "right")), r.isScrollbarYUsingRight = r.scrollbarYRight === r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : s.toInt(u.css(r.scrollbarYRail, "left")), r.scrollbarYOuterWidth = r.isRtl ? s.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = s.toInt(u.css(r.scrollbarYRail, "marginTop")) + s.toInt(u.css(r.scrollbarYRail, "marginBottom")), u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null
        }

        function o(t) {
            return t.getAttribute("data-ps-id")
        }

        function l(t, e) {
            t.setAttribute("data-ps-id", e)
        }

        function i(t) {
            t.removeAttribute("data-ps-id")
        }
        var s = t("../lib/helper"),
            a = t("../lib/class"),
            c = t("./default-setting"),
            u = t("../lib/dom"),
            d = t("../lib/event-manager"),
            p = t("../lib/guid"),
            f = {};
        n.add = function(t) {
            var e = p();
            return l(t, e), f[e] = new r(t), f[e]
        }, n.remove = function(t) {
            delete f[o(t)], i(t)
        }, n.get = function(t) {
            return f[o(t)]
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {
                width: e.railXWidth
            };
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop,
                height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, r), s.css(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }), s.css(e.scrollbarY, {
                top: e.scrollbarYTop,
                height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }
        var l = t("../lib/helper"),
            i = t("../lib/class"),
            s = t("../lib/dom"),
            a = t("./instances"),
            c = t("./update-scroll");
        e.exports = function(t) {
            var e = a.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = s.queryChildren(t, ".ps__scrollbar-x-rail"), n.length > 0 && n.forEach(function(t) {
                s.remove(t)
            }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = s.queryChildren(t, ".ps__scrollbar-y-rail"), n.length > 0 && n.forEach(function(t) {
                s.remove(t)
            }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? i.add(t, "ps--active-x") : (i.remove(t, "ps--active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? i.add(t, "ps--active-y") : (i.remove(t, "ps--active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0))
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(t, e, n) {
        "use strict";
        var r = t("./instances"),
            o = function(t) {
                var e = document.createEvent("Event");
                return e.initEvent(t, !0, !0), e
            };
        e.exports = function(t, e, n) {
            if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
            "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(o("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(o("ps-x-reach-start")));
            var l = r.get(t);
            "top" === e && n >= l.contentHeight - l.containerHeight && (n = l.contentHeight - l.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(o("ps-y-reach-end"))), "left" === e && n >= l.contentWidth - l.containerWidth && (n = l.contentWidth - l.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(o("ps-x-reach-end"))), void 0 === l.lastTop && (l.lastTop = t.scrollTop), void 0 === l.lastLeft && (l.lastLeft = t.scrollLeft), "top" === e && n < l.lastTop && t.dispatchEvent(o("ps-scroll-up")), "top" === e && n > l.lastTop && t.dispatchEvent(o("ps-scroll-down")), "left" === e && n < l.lastLeft && t.dispatchEvent(o("ps-scroll-left")), "left" === e && n > l.lastLeft && t.dispatchEvent(o("ps-scroll-right")), "top" === e && n !== l.lastTop && (t.scrollTop = l.lastTop = n, t.dispatchEvent(o("ps-scroll-y"))), "left" === e && n !== l.lastLeft && (t.scrollLeft = l.lastLeft = n, t.dispatchEvent(o("ps-scroll-x")))
        }
    }, {
        "./instances": 18
    }],
    21: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances"),
            i = t("./update-geometry"),
            s = t("./update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]);
/*!
 * clipboard.js v1.6.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Clipboard = e()
    }
}(function() {
    var e, t, n;
    return function e(t, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!c && l) return l(a, !0);
                    if (r) return r(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var s = n[a] = {
                    exports: {}
                };
                t[a][0].call(s.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n ? n : e)
                }, s, s.exports, e, t, n, o)
            }
            return n[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
        return i
    }({
        1: [function(e, t, n) {
            function o(e, t) {
                for (; e && e.nodeType !== i;) {
                    if (e.matches(t)) return e;
                    e = e.parentNode
                }
            }
            var i = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
            }
            t.exports = o
        }, {}],
        2: [function(e, t, n) {
            function o(e, t, n, o, r) {
                var a = i.apply(this, arguments);
                return e.addEventListener(n, a, r), {
                    destroy: function() {
                        e.removeEventListener(n, a, r)
                    }
                }
            }

            function i(e, t, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, t), n.delegateTarget && o.call(e, n)
                }
            }
            var r = e("./closest");
            t.exports = o
        }, {
            "./closest": 1
        }],
        3: [function(e, t, n) {
            n.node = function(e) {
                return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
            }, n.nodeList = function(e) {
                var t = Object.prototype.toString.call(e);
                return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
            }, n.string = function(e) {
                return "string" == typeof e || e instanceof String
            }, n.fn = function(e) {
                var t = Object.prototype.toString.call(e);
                return "[object Function]" === t
            }
        }, {}],
        4: [function(e, t, n) {
            function o(e, t, n) {
                if (!e && !t && !n) throw new Error("Missing required arguments");
                if (!c.string(t)) throw new TypeError("Second argument must be a String");
                if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
                if (c.node(e)) return i(e, t, n);
                if (c.nodeList(e)) return r(e, t, n);
                if (c.string(e)) return a(e, t, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(e, t, n) {
                return e.addEventListener(t, n), {
                    destroy: function() {
                        e.removeEventListener(t, n)
                    }
                }
            }

            function r(e, t, n) {
                return Array.prototype.forEach.call(e, function(e) {
                    e.addEventListener(t, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(e, function(e) {
                            e.removeEventListener(t, n)
                        })
                    }
                }
            }

            function a(e, t, n) {
                return l(document.body, e, t, n)
            }
            var c = e("./is"),
                l = e("delegate");
            t.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(e, t, n) {
            function o(e) {
                var t;
                if ("SELECT" === e.nodeName) e.focus(), t = e.value;
                else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                    var n = e.hasAttribute("readonly");
                    n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
                } else {
                    e.hasAttribute("contenteditable") && e.focus();
                    var o = window.getSelection(),
                        i = document.createRange();
                    i.selectNodeContents(e), o.removeAllRanges(), o.addRange(i), t = o.toString()
                }
                return t
            }
            t.exports = o
        }, {}],
        6: [function(e, t, n) {
            function o() {}
            o.prototype = {
                on: function(e, t, n) {
                    var o = this.e || (this.e = {});
                    return (o[e] || (o[e] = [])).push({
                        fn: t,
                        ctx: n
                    }), this
                },
                once: function(e, t, n) {
                    function o() {
                        i.off(e, o), t.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = t, this.on(e, o, n)
                },
                emit: function(e) {
                    var t = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[e] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; o < i; o++) n[o].fn.apply(n[o].ctx, t);
                    return this
                },
                off: function(e, t) {
                    var n = this.e || (this.e = {}),
                        o = n[e],
                        i = [];
                    if (o && t)
                        for (var r = 0, a = o.length; r < a; r++) o[r].fn !== t && o[r].fn._ !== t && i.push(o[r]);
                    return i.length ? n[e] = i : delete n[e], this
                }
            }, t.exports = o
        }, {}],
        7: [function(t, n, o) {
            ! function(i, r) {
                if ("function" == typeof e && e.amd) e(["module", "select"], r);
                else if ("undefined" != typeof o) r(n, t("select"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.select), i.clipboardAction = a.exports
                }
            }(this, function(e, t) {
                "use strict";

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function o(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                var i = n(t),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    },
                    a = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var o = t[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                            }
                        }
                        return function(t, n, o) {
                            return n && e(t.prototype, n), o && e(t, o), t
                        }
                    }(),
                    c = function() {
                        function e(t) {
                            o(this, e), this.resolveOptions(t), this.initSelection()
                        }
                        return a(e, [{
                            key: "resolveOptions",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = t.action, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                            }
                        }, {
                            key: "initSelection",
                            value: function e() {
                                this.text ? this.selectFake() : this.target && this.selectTarget()
                            }
                        }, {
                            key: "selectFake",
                            value: function e() {
                                var t = this,
                                    n = "rtl" == document.documentElement.getAttribute("dir");
                                this.removeFake(), this.fakeHandlerCallback = function() {
                                    return t.removeFake()
                                }, this.fakeHandler = document.body.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                                var o = window.pageYOffset || document.documentElement.scrollTop;
                                this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                            }
                        }, {
                            key: "removeFake",
                            value: function e() {
                                this.fakeHandler && (document.body.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                            }
                        }, {
                            key: "selectTarget",
                            value: function e() {
                                this.selectedText = (0, i.default)(this.target), this.copyText()
                            }
                        }, {
                            key: "copyText",
                            value: function e() {
                                var t = void 0;
                                try {
                                    t = document.execCommand(this.action)
                                } catch (e) {
                                    t = !1
                                }
                                this.handleResult(t)
                            }
                        }, {
                            key: "handleResult",
                            value: function e(t) {
                                this.emitter.emit(t ? "success" : "error", {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                })
                            }
                        }, {
                            key: "clearSelection",
                            value: function e() {
                                this.target && this.target.blur(), window.getSelection().removeAllRanges()
                            }
                        }, {
                            key: "destroy",
                            value: function e() {
                                this.removeFake()
                            }
                        }, {
                            key: "action",
                            set: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function e() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function e(t) {
                                if (void 0 !== t) {
                                    if (!t || "object" !== ("undefined" == typeof t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = t
                                }
                            },
                            get: function e() {
                                return this._target
                            }
                        }]), e
                    }();
                e.exports = c
            })
        }, {
            select: 5
        }],
        8: [function(t, n, o) {
            ! function(i, r) {
                if ("function" == typeof e && e.amd) e(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o) r(n, t("./clipboard-action"), t("tiny-emitter"), t("good-listener"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
                }
            }(this, function(e, t, n, o) {
                "use strict";

                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function a(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }

                function c(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }

                function l(e, t) {
                    var n = "data-clipboard-" + e;
                    if (t.hasAttribute(n)) return t.getAttribute(n)
                }
                var u = i(t),
                    s = i(n),
                    f = i(o),
                    d = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var o = t[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                            }
                        }
                        return function(t, n, o) {
                            return n && e(t.prototype, n), o && e(t, o), t
                        }
                    }(),
                    h = function(e) {
                        function t(e, n) {
                            r(this, t);
                            var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                            return o.resolveOptions(n), o.listenClick(e), o
                        }
                        return c(t, e), d(t, [{
                            key: "resolveOptions",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText
                            }
                        }, {
                            key: "listenClick",
                            value: function e(t) {
                                var n = this;
                                this.listener = (0, f.default)(t, "click", function(e) {
                                    return n.onClick(e)
                                })
                            }
                        }, {
                            key: "onClick",
                            value: function e(t) {
                                var n = t.delegateTarget || t.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new u.default({
                                    action: this.action(n),
                                    target: this.target(n),
                                    text: this.text(n),
                                    trigger: n,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction",
                            value: function e(t) {
                                return l("action", t)
                            }
                        }, {
                            key: "defaultTarget",
                            value: function e(t) {
                                var n = l("target", t);
                                if (n) return document.querySelector(n)
                            }
                        }, {
                            key: "defaultText",
                            value: function e(t) {
                                return l("text", t)
                            }
                        }, {
                            key: "destroy",
                            value: function e() {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported",
                            value: function e() {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                    n = "string" == typeof t ? [t] : t,
                                    o = !!document.queryCommandSupported;
                                return n.forEach(function(e) {
                                    o = o && !!document.queryCommandSupported(e)
                                }), o
                            }
                        }]), t
                    }(s.default);
                e.exports = h
            })
        }, {
            "./clipboard-action": 7,
            "good-listener": 4,
            "tiny-emitter": 6
        }]
    }, {}, [8])(8)
});
/*! Lity - v2.2.2 - 2016-12-14
 * http://sorgalla.com/lity/
 * Copyright (c) 2015-2016 Jan Sorgalla; Licensed MIT */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = b(a, require("jquery")) : a.lity = b(a, a.jQuery || a.Zepto)
}("undefined" != typeof window ? window : this, function(a, b) {
    "use strict";

    function c(a) {
        var b = B();
        return N && a.length ? (a.one(N, b.resolve), setTimeout(b.resolve, 500)) : b.resolve(), b.promise()
    }

    function d(a, c, d) {
        if (1 === arguments.length) return b.extend({}, a);
        if ("string" == typeof c) {
            if ("undefined" == typeof d) return "undefined" == typeof a[c] ? null : a[c];
            a[c] = d
        } else b.extend(a, c);
        return this
    }

    function e(a) {
        for (var b, c = decodeURI(a.split("#")[0]).split("&"), d = {}, e = 0, f = c.length; e < f; e++) c[e] && (b = c[e].split("="), d[b[0]] = b[1]);
        return d
    }

    function f(a, c) {
        return a + (a.indexOf("?") > -1 ? "&" : "?") + b.param(c)
    }

    function g(a, b) {
        var c = a.indexOf("#");
        return -1 === c ? b : (c > 0 && (a = a.substr(c)), b + a)
    }

    function h(a) {
        return b('<span class="lity-error"/>').append(a)
    }

    function i(a, c) {
        var d = c.opener() && c.opener().data("lity-desc") || "Image with no description",
            e = b('<img src="' + a + '" alt="' + d + '"/>'),
            f = B(),
            g = function() {
                f.reject(h("Failed loading image"))
            };
        return e.on("load", function() {
            return 0 === this.naturalWidth ? g() : void f.resolve(e)
        }).on("error", g), f.promise()
    }

    function j(a, c) {
        var d, e, f;
        try {
            d = b(a)
        } catch (a) {
            return !1
        }
        return !!d.length && (e = b('<i style="display:none !important"/>'), f = d.hasClass("lity-hide"), c.element().one("lity:remove", function() {
            e.before(d).remove(), f && !d.closest(".lity-content").length && d.addClass("lity-hide")
        }), d.removeClass("lity-hide").after(e))
    }

    function k(a) {
        var c = J.exec(a);
        return !!c && o(g(a, f("https://www.youtube" + (c[2] || "") + ".com/embed/" + c[4], b.extend({
            autoplay: 1
        }, e(c[5] || "")))))
    }

    function l(a) {
        var c = K.exec(a);
        return !!c && o(g(a, f("https://player.vimeo.com/video/" + c[3], b.extend({
            autoplay: 1
        }, e(c[4] || "")))))
    }

    function m(a) {
        var c = M.exec(a);
        return !!c && (0 !== a.indexOf("http") && (a = "https:" + a), o(g(a, f("https://www.facebook.com/plugins/video.php?href=" + a, b.extend({
            autoplay: 1
        }, e(c[4] || ""))))))
    }

    function n(a) {
        var b = L.exec(a);
        return !!b && o(g(a, f("https://www.google." + b[3] + "/maps?" + b[6], {
            output: b[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
        })))
    }

    function o(a) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + a + '"/></div>'
    }

    function p() {
        return z.documentElement.clientHeight ? z.documentElement.clientHeight : Math.round(A.height())
    }

    function q(a) {
        var b = v();
        b && (27 === a.keyCode && b.close(), 9 === a.keyCode && r(a, b))
    }

    function r(a, b) {
        var c = b.element().find(G),
            d = c.index(z.activeElement);
        a.shiftKey && d <= 0 ? (c.get(c.length - 1).focus(), a.preventDefault()) : a.shiftKey || d !== c.length - 1 || (c.get(0).focus(), a.preventDefault())
    }

    function s() {
        b.each(D, function(a, b) {
            b.resize()
        })
    }

    function t(a) {
        1 === D.unshift(a) && (C.addClass("lity-active"), A.on({
            resize: s,
            keydown: q
        })), b("body > *").not(a.element()).addClass("lity-hidden").each(function() {
            var a = b(this);
            void 0 === a.data(F) && a.data(F, a.attr(E) || null)
        }).attr(E, "true")
    }

    function u(a) {
        var c;
        a.element().attr(E, "true"), 1 === D.length && (C.removeClass("lity-active"), A.off({
            resize: s,
            keydown: q
        })), D = b.grep(D, function(b) {
            return a !== b
        }), c = D.length ? D[0].element() : b(".lity-hidden"), c.removeClass("lity-hidden").each(function() {
            var a = b(this),
                c = a.data(F);
            c ? a.attr(E, c) : a.removeAttr(E), a.removeData(F)
        })
    }

    function v() {
        return 0 === D.length ? null : D[0]
    }

    function w(a, c, d, e) {
        var f, g = "inline",
            h = b.extend({}, d);
        return e && h[e] ? (f = h[e](a, c), g = e) : (b.each(["inline", "iframe"], function(a, b) {
            delete h[b], h[b] = d[b]
        }), b.each(h, function(b, d) {
            return !d || (!(!d.test || d.test(a, c)) || (f = d(a, c), !1 !== f ? (g = b, !1) : void 0))
        })), {
            handler: g,
            content: f || ""
        }
    }

    function x(a, e, f, g) {
        function h(a) {
            k = b(a).css("max-height", p() + "px"), j.find(".lity-loader").each(function() {
                var a = b(this);
                c(a).always(function() {
                    a.remove()
                })
            }), j.removeClass("lity-loading").find(".lity-content").empty().append(k), m = !0, k.trigger("lity:ready", [l])
        }
        var i, j, k, l = this,
            m = !1,
            n = !1;
        e = b.extend({}, H, e), j = b(e.template), l.element = function() {
            return j
        }, l.opener = function() {
            return f
        }, l.options = b.proxy(d, l, e), l.handlers = b.proxy(d, l, e.handlers), l.resize = function() {
            m && !n && k.css("max-height", p() + "px").trigger("lity:resize", [l])
        }, l.close = function() {
            if (m && !n) {
                n = !0, u(l);
                var a = B();
                if (g && (z.activeElement === j[0] || b.contains(j[0], z.activeElement))) try {
                    g.focus()
                } catch (a) {}
                return k.trigger("lity:close", [l]), j.removeClass("lity-opened").addClass("lity-closed"), c(k.add(j)).always(function() {
                    k.trigger("lity:remove", [l]), j.remove(), j = void 0, a.resolve()
                }), a.promise()
            }
        }, i = w(a, l, e.handlers, e.handler), j.attr(E, "false").addClass("lity-loading lity-opened lity-" + i.handler).appendTo("body").focus().on("click", "[data-lity-close]", function(a) {
            b(a.target).is("[data-lity-close]") && l.close()
        }).trigger("lity:open", [l]), t(l), b.when(i.content).always(h)
    }

    function y(a, c, d) {
        a.preventDefault ? (a.preventDefault(), d = b(this), a = d.data("lity-target") || d.attr("href") || d.attr("src")) : d = b(d);
        var e = new x(a, b.extend({}, d.data("lity-options") || d.data("lity"), c), d, z.activeElement);
        if (!a.preventDefault) return e
    }
    var z = a.document,
        A = b(a),
        B = b.Deferred,
        C = b("html"),
        D = [],
        E = "aria-hidden",
        F = "lity-" + E,
        G = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
        H = {
            handler: null,
            handlers: {
                image: i,
                inline: j,
                youtube: k,
                vimeo: l,
                googlemaps: n,
                facebookvideo: m,
                iframe: o
            },
            template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
        },
        I = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        J = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        K = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        L = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        M = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
        N = function() {
            var a = z.createElement("div"),
                b = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var c in b)
                if (void 0 !== a.style[c]) return b[c];
            return !1
        }();
    return i.test = function(a) {
        return I.test(a)
    }, y.version = "2.2.2", y.options = b.proxy(d, y, H), y.handlers = b.proxy(d, y, H.handlers), y.current = v, b(z).on("click.lity", "[data-lity]", y), y
});
/*global jQuery */
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
! function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                d = document.createElement("div");
            d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", r.appendChild(d.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = ".fitvidsignore";
            i.ignore && (r = r + ", " + i.ignore);
            var a = t(this).find(e.join(","));
            a = a.not("object object"), a = a.not(r), a.each(function() {
                var e = t(this);
                if (!(e.parents(r).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                        a = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                        d = i / a;
                    if (!e.attr("id")) {
                        var o = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", o)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * d + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);
/**
 * jquery.matchHeight-min.js master
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
(function(c) {
    var n = -1,
        f = -1,
        g = function(a) {
            return parseFloat(a) || 0
        },
        r = function(a) {
            var b = null,
                d = [];
            c(a).each(function() {
                var a = c(this),
                    k = a.offset().top - g(a.css("margin-top")),
                    l = 0 < d.length ? d[d.length - 1] : null;
                null === l ? d.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? d[d.length - 1] = l.add(a) : d.push(a);
                b = k
            });
            return d
        },
        p = function(a) {
            var b = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            if ("object" === typeof a) return c.extend(b, a);
            "boolean" === typeof a ? b.byRow = a : "remove" === a && (b.remove = !0);
            return b
        },
        b = c.fn.matchHeight =
            function(a) {
                a = p(a);
                if (a.remove) {
                    var e = this;
                    this.css(a.property, "");
                    c.each(b._groups, function(a, b) {
                        b.elements = b.elements.not(e)
                    });
                    return this
                }
                if (1 >= this.length && !a.target) return this;
                b._groups.push({
                    elements: this,
                    options: a
                });
                b._apply(this, a);
                return this
            };
    b._groups = [];
    b._throttle = 80;
    b._maintainScroll = !1;
    b._beforeUpdate = null;
    b._afterUpdate = null;
    b._apply = function(a, e) {
        var d = p(e),
            h = c(a),
            k = [h],
            l = c(window).scrollTop(),
            f = c("html").outerHeight(!0),
            m = h.parents().filter(":hidden");
        m.each(function() {
            var a = c(this);
            a.data("style-cache", a.attr("style"))
        });
        m.css("display", "block");
        d.byRow && !d.target && (h.each(function() {
            var a = c(this),
                b = a.css("display");
            "inline-block" !== b && "inline-flex" !== b && (b = "block");
            a.data("style-cache", a.attr("style"));
            a.css({
                display: b,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px"
            })
        }), k = r(h), h.each(function() {
            var a = c(this);
            a.attr("style", a.data("style-cache") || "")
        }));
        c.each(k, function(a, b) {
            var e = c(b),
                f = 0;
            if (d.target) f = d.target.outerHeight(!1);
            else {
                if (d.byRow && 1 >= e.length) {
                    e.css(d.property, "");
                    return
                }
                e.each(function() {
                    var a = c(this),
                        b = a.css("display");
                    "inline-block" !== b && "inline-flex" !== b && (b = "block");
                    b = {
                        display: b
                    };
                    b[d.property] = "";
                    a.css(b);
                    a.outerHeight(!1) > f && (f = a.outerHeight(!1));
                    a.css("display", "")
                })
            }
            e.each(function() {
                var a = c(this),
                    b = 0;
                d.target && a.is(d.target) || ("border-box" !== a.css("box-sizing") && (b += g(a.css("border-top-width")) + g(a.css("border-bottom-width")), b += g(a.css("padding-top")) + g(a.css("padding-bottom"))),
                    a.css(d.property, f - b + "px"))
            })
        });
        m.each(function() {
            var a = c(this);
            a.attr("style", a.data("style-cache") || null)
        });
        b._maintainScroll && c(window).scrollTop(l / f * c("html").outerHeight(!0));
        return this
    };
    b._applyDataApi = function() {
        var a = {};
        c("[data-match-height], [data-mh]").each(function() {
            var b = c(this),
                d = b.attr("data-mh") || b.attr("data-match-height");
            a[d] = d in a ? a[d].add(b) : b
        });
        c.each(a, function() {
            this.matchHeight(!0)
        })
    };
    var q = function(a) {
        b._beforeUpdate && b._beforeUpdate(a, b._groups);
        c.each(b._groups, function() {
            b._apply(this.elements,
                this.options)
        });
        b._afterUpdate && b._afterUpdate(a, b._groups)
    };
    b._update = function(a, e) {
        if (e && "resize" === e.type) {
            var d = c(window).width();
            if (d === n) return;
            n = d
        }
        a ? -1 === f && (f = setTimeout(function() {
            q(e);
            f = -1
        }, b._throttle)) : q(e)
    };
    c(b._applyDataApi);
    c(window).bind("load", function(a) {
        b._update(!1, a)
    });
    c(window).bind("resize orientationchange", function(a) {
        b._update(!0, a)
    })
})(jQuery);
