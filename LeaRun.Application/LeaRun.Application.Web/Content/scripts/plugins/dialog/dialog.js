;!
function (n, t) {
    "use strict";
    var r, f, u = {
        getPath: function () {
            var n = document.scripts,
            t = n[n.length - 1],
            i = t.src;
            if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1)
        }(),
        config: {},
        end: {},
        btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
        type: ["dialog", "page", "iframe", "loading", "tips"]
    },
    e,
    i;
    n.layer = {
        v: "1.9.3",
        ie6: !!n.ActiveXObject && !n.XMLHttpRequest,
        index: 0,
        path: u.getPath,
        config: function (n, t) {
            var i = 0;
            return n = n || {},
            layer.cache = u.config = r.extend(u.config, n),
            layer.path = u.config.path || layer.path,
            "string" == typeof n.extend && (n.extend = [n.extend]),
            layer.use("skin/dialog.css", n.extend && n.extend.length > 0 ?
            function f() {
                var r = n.extend;
                layer.use(r[r[i] ? i : i - 1], i < r.length ?
                function () {
                    return ++i,
                    f
                }() : t)
            }() : t),
            this
        },
        use: function (n, t, i) {
            var o = r("head")[0],
            n = n.replace(/\s/g, ""),
            u = /\.css$/.test(n),
            f = document.createElement(u ? "link" : "script"),
            e = "layui_layer_" + n.replace(/\.|\//g, "");
            if (layer.path) return (u && (f.rel = "stylesheet"), f[u ? "href" : "src"] = /^http:\/\//.test(n) ? n : layer.path + n, f.id = e, r("#" + e)[0] || o.appendChild(f),
            function s() {
                (u ? 1989 === parseInt(r("#" + e).css("width")) : layer[i || e]) ?
                    function () {
                        t && t();
                        try {
                            u || o.removeChild(f)
                        } catch (n) { }
                    }() : setTimeout(s, 100)
            }(), this)
        },
        ready: function (n, t) {
            var i = "function" == typeof n;
            return i && (t = n),
            layer.config(r.extend(u.config,
            function () {
                return i ? {} : {
                    path: n
                }
            }()), t),
            this
        },
        alert: function (n, t, i) {
            var u = "function" == typeof t;
            return u && (i = t),
            layer.open(r.extend({
                content: n,
                yes: i
            },
            u ? {} : t))
        },
        confirm: function (n, t, i, f) {
            var e = "function" == typeof t;
            return e && (f = i, i = t),
            layer.open(r.extend({
                content: n,
                btn: u.btn,
                yes: i,
                cancel: f
            },
            e ? {} : t))
        },
        msg: function (n, f, e) {
            var h = "function" == typeof f,
            o = u.config.skin,
            s = (o ? o + " " + o + "-msg" : "") || "layui-layer-msg",
            c = i.anim.length - 1;
            return h && (e = f),
            layer.open(r.extend({
                content: n,
                time: 3e3,
                shade: !1,
                skin: s,
                title: !1,
                closeBtn: !1,
                btn: !1,
                end: e
            },
            h && !u.config.skin ? {
                skin: s + " layui-layer-hui",
                shift: c
            } : function () {
                return f = f || {},
                (-1 === f.icon || f.icon === t && !u.config.skin) && (f.skin = s + " " + (f.skin || "layui-layer-hui")),
                f
            }()))
        },
        load: function (n, t) {
            return layer.open(r.extend({
                type: 3,
                icon: n || 0,
                shade: .01
            },
            t))
        },
        tips: function (n, t, i) {
            return layer.open(r.extend({
                type: 4,
                content: [n, t],
                closeBtn: !1,
                time: 3e3,
                maxWidth: 210
            },
            i))
        }
    };
    e = function (n) {
        var t = this;
        t.index = ++layer.index;
        t.config = r.extend({},
        t.config, u.config, n);
        t.creat()
    };
    e.pt = e.prototype;
    i = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
    i.anim = ["layui-anim", "layui-anim-01", "layui-anim-02", "layui-anim-03", "layui-anim-04", "layui-anim-05", "layui-anim-06"];
    e.pt.config = {
        type: 0,
        shade: .3,
        fix: !0,
        move: i[1],
        title: "",
        offset: "auto",
        area: "auto",
        closeBtn: 1,
        time: 0,
        zIndex: 2900,
        maxWidth: "auto",
        shift: -1,
        icon: -1,
        scrollbar: !0,
        tips: 2
    };
    e.pt.vessel = function (n, t) {
        var e = this,
        f = e.index,
        r = e.config,
        o = r.zIndex + f,
        s = "object" == typeof r.title,
        c = r.maxmin && (1 === r.type || 2 === r.type),
        h = r.title ? '<div class="layui-layer-title" style="' + (s ? r.title[1] : "") + '">' + (s ? r.title[0] : r.title) + "<\/div>" : "",
        l = top.$(".layui-layer-shade").length,
        a = r.shade[0] || r.shade;
        return l > 0,
        r.zIndex = o,
        t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + f + '" times="' + f + '" style="' + ("z-index:" + (o - 1) + "; background-color:" + (r.shade[1] || "#000") + "; opacity:" + a + "; filter:alpha(opacity=" + (100 * r.shade[0] || 100 * r.shade) + ");") + '"><\/div>' : "", '<div class="' + i[0] + " " + (i.anim[r.shift] || "") + (" layui-layer-" + u.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + i[0] + f + '" type="' + u.type[r.type] + '" times="' + f + '" showtime="' + r.time + '" conType="' + (n ? "object" : "string") + '" style="z-index: ' + o + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fix ? "" : ";position:absolute;") + '">' + (n && 2 != r.type ? "" : h) + '<div class="layui-layer-content' + (0 == r.type && -1 !== r.icon ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && -1 !== r.icon ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"><\/i>' : "") + (1 == r.type && n ? "" : r.content || "") + '<\/div><span class="layui-layer-setwin">' +
        function () {
            var n = c ? '<a class="layui-layer-min" href="javascript:;"><cite><\/cite><\/a><a class="layui-layer-ico layui-layer-max" href="javascript:;"><\/a>' : "";
            return r.closeBtn && (n += '<a class="' + i[7] + " " + i[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;">×<\/a>'),
            n
        }() + "<\/span>" + (r.btn ?
        function () {
            var f = "",
            n, e, t;
            for ("string" == typeof r.btn && (r.btn = [r.btn]), n = 0, e = r.btn.length; e > n; n++) f += '<a class="' + i[6] + n + '">' + r.btn[n] + "<\/a>";
            return t = "",
            u.type[r.type] == "iframe" && (t = '<div style="float: left;padding-top:5px;padding-left:15px;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;"><input checked="checked" type="checkbox" id="IsdialogClose" style="vertical-align: middle;margin-bottom:2px;" /><label style=";padding-left:5px;cursor:pointer" for="IsdialogClose">确认并关闭窗口<\/label><\/div>'),
            '<div class="' + i[6] + '">' + f + t + "<\/div>"
        }() : "") + "<\/div>"], h),
        e
    };
    e.pt.creat = function () {
        var t = this,
        n = t.config,
        o = t.index,
        e = n.content,
        s = "object" == typeof e,
        h;
        switch ("string" == typeof n.area && (n.area = "auto" === n.area ? ["", ""] : [n.area, ""]), n.type) {
            case 0:
                n.btn = "btn" in n ? n.btn : u.btn[0];
                layer.closeAll("dialog");
                break;
            case 2:
                e = n.content = s ? n.content : [n.content || "", "auto"];
                h = '<div class="ajax-loader" style="cursor: progress; position: absolute; width: 100%; height: 100%; background: #fff; z-index: 100; overflow: hidden;"><\/div>';
                n.content = h + '<iframe scrolling="' + (n.content[1] || "auto") + '" allowtransparency="true" id="' + n.id + '" name="' + n.id + '"frameborder="0" src="' + n.content[0] + '"><\/iframe>';
                break;
            case 3:
                n.title = !1;
                n.closeBtn = !1; -1 === n.icon && 0 === n.icon;
                layer.closeAll("loading");
                break;
            case 4:
                s || (n.content = [n.content, "body"]);
                n.follow = n.content[1];
                n.content = n.content[0] + '<i class="layui-layer-TipsG"><\/i>';
                n.title = !1;
                n.shade = !1;
                n.fix = !1;
                n.tips = "object" == typeof n.tips ? n.tips : [n.tips, !0];
                n.tipsMore || layer.closeAll("tips")
        }
        t.vessel(s,
        function (u, f) {
            r("body").append(u[0]);
            s ?
            function () {
                2 == n.type || 4 == n.type ?
                function () {
                    r("body").append(u[1])
                }() : function () {
                    e.parents("." + i[0])[0] || (e.show().addClass("layui-layer-wrap").wrap(u[1]), r("#" + i[0] + o).find("." + i[5]).before(f))
                }()
            }() : r("body").append(u[1]);
            t.layero = r("#" + i[0] + o);
            n.scrollbar || i.html.css("overflow", "hidden").attr("layer-full", o)
        }).auto(o);
        2 == n.type && layer.ie6 && t.layero.find("iframe").attr("src", e[0]);
        4 == n.type ? t.tips() : t.offset();
        n.fix && f.on("resize",
        function () {
            t.offset(); (/^\d+%$/.test(n.area[0]) || /^\d+%$/.test(n.area[1])) && t.auto(o);
            4 == n.type && t.tips()
        });
        n.time <= 0 || setTimeout(function () {
            layer.close(t.index)
        },
        n.time);
        t.move().callback()
    };
    e.pt.auto = function (n) {
        function e(n) {
            n = t.find(n);
            n.height(o[1] - h - c - 2 * (0 | parseFloat(n.css("padding"))))
        }
        var s = this,
        u = s.config,
        t = r("#" + i[0] + n);
        "" === u.area[0] && u.maxWidth > 0 && (/MSIE 7/.test(navigator.userAgent) && u.btn && t.width(t.innerWidth()), t.outerWidth() > u.maxWidth && t.width(u.maxWidth));
        var o = [t.innerWidth(), t.innerHeight()],
        h = t.find(i[1]).outerHeight() || 0,
        c = t.find("." + i[6]).outerHeight() || 0;
        switch (u.type) {
            case 2:
                e("iframe");
                break;
            default:
                "" === u.area[1] ? u.fix && o[1] > f.height() && (o[1] = f.height(), e("." + i[5])) : e("." + i[5])
        }
        return s
    };
    e.pt.offset = function () {
        var n = this,
        t = n.config,
        r = n.layero,
        i = [r.outerWidth(), r.outerHeight()],
        u = "object" == typeof t.offset;
        n.offsetTop = (f.height() - i[1]) / 2;
        n.offsetLeft = (f.width() - i[0]) / 2;
        u ? (n.offsetTop = t.offset[0], n.offsetLeft = t.offset[1] || n.offsetLeft) : "auto" !== t.offset && (n.offsetTop = t.offset, "rb" === t.offset && (n.offsetTop = f.height() - i[1], n.offsetLeft = f.width() - i[0]));
        t.fix || (n.offsetTop = /%$/.test(n.offsetTop) ? f.height() * parseFloat(n.offsetTop) / 100 : parseFloat(n.offsetTop), n.offsetLeft = /%$/.test(n.offsetLeft) ? f.width() * parseFloat(n.offsetLeft) / 100 : parseFloat(n.offsetLeft), n.offsetTop += f.scrollTop(), n.offsetLeft += f.scrollLeft());
        r.css({
            top: n.offsetTop,
            left: n.offsetLeft
        })
    };
    e.pt.tips = function () {
        var c = this,
        t = c.config,
        s = c.layero,
        u = [s.outerWidth(), s.outerHeight()],
        e = r(t.follow);
        e[0] || (e = r("body"));
        var n = {
            width: e.outerWidth(),
            height: e.outerHeight(),
            top: e.offset().top,
            left: e.offset().left
        },
        o = s.find(".layui-layer-TipsG"),
        h = t.tips[0];
        t.tips[1] || o.remove();
        n.autoLeft = function () {
            n.left + u[0] - f.width() > 0 ? (n.tipLeft = n.left + n.width - u[0], o.css({
                right: 12,
                left: "auto"
            })) : n.tipLeft = n.left
        };
        n.where = [function () {
            n.autoLeft();
            n.tipTop = n.top - u[1] - 10;
            o.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
        },
        function () {
            n.tipLeft = n.left + n.width + 10;
            n.tipTop = n.top;
            o.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
        },
        function () {
            n.autoLeft();
            n.tipTop = n.top + n.height + 10;
            o.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
        },
        function () {
            n.tipLeft = n.left - u[0] - 10;
            n.tipTop = n.top;
            o.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
        }];
        n.where[h - 1]();
        1 === h ? n.top - (f.scrollTop() + u[1] + 16) < 0 && n.where[2]() : 2 === h ? f.width() - (n.left + n.width + u[0] + 16) > 0 || n.where[3]() : 3 === h ? n.top - f.scrollTop() + n.height + u[1] + 16 - f.height() > 0 && n.where[0]() : 4 === h && u[0] + 16 - n.left > 0 && n.where[1]();
        s.find("." + i[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px" : ""
        });
        s.css({
            left: n.tipLeft,
            top: n.tipTop
        })
    };
    e.pt.move = function () {
        var u = this,
        t = u.config,
        n = {
            setY: 0,
            moveLayer: function () {
                var t = n.layero,
                r = parseInt(t.css("margin-left")),
                i = parseInt(n.move.css("left"));
                0 === r || (i -= r);
                "fixed" !== t.css("position") && (i -= t.parent().offset().left, n.setY = 0);
                t.css({
                    left: i,
                    top: parseInt(n.move.css("top")) - n.setY
                })
            }
        },
        e = u.layero.find(t.move);
        return t.move && e.attr("move", "ok"),
        e.css({
            cursor: t.move ? "move" : "auto"
        }),
        r(t.move).on("mousedown",
        function (u) {
            if (u.preventDefault(), "ok" === r(this).attr("move")) {
                n.ismove = !0;
                n.layero = r(this).parents("." + i[0]);
                var e = n.layero.offset().left,
                o = n.layero.offset().top,
                s = n.layero.outerWidth() - 6,
                h = n.layero.outerHeight() - 6;
                r("#layui-layer-moves")[0] || r("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:' + e + "px; top:" + o + "px; width:" + s + "px; height:" + h + 'px; z-index:2147483584"><\/div>');
                n.move = r("#layui-layer-moves");
                t.moveType && n.move.css({
                    visibility: "hidden"
                });
                n.moveX = u.pageX - n.move.position().left;
                n.moveY = u.pageY - n.move.position().top;
                "fixed" !== n.layero.css("position") || (n.setY = f.scrollTop())
            }
        }),
        r(document).mousemove(function (i) {
            var r, u, e, o;
            n.ismove && (r = i.pageX - n.moveX, u = i.pageY - n.moveY, (i.preventDefault(), t.moveOut) || (n.setY = f.scrollTop(), e = f.width() - n.move.outerWidth(), o = n.setY, 0 > r && (r = 0), r > e && (r = e), o > u && (u = o), u > f.height() - n.move.outerHeight() + n.setY && (u = f.height() - n.move.outerHeight() + n.setY)), n.move.css({
                left: r,
                top: u
            }), t.moveType && n.moveLayer(), r = u = e = o = null)
        }).mouseup(function () {
            try {
                n.ismove && (n.moveLayer(), n.move.remove());
                n.ismove = !1
            } catch (i) {
                n.ismove = !1
            }
            t.moveEnd && t.moveEnd()
        }),
        u
    };
    e.pt.callback = function () {
        function e() {
            var i = n.cancel && n.cancel(t.index);
            i === !1 || layer.close(t.index)
        }
        var t = this,
        f = t.layero,
        n = t.config;
        t.openLayer();
        n.success && (2 == n.type ? f.find("iframe")[0].onload = function () {
            this.className = "";
            n.success(f, t.index)
        } : n.success(f, t.index));
        layer.ie6 && t.IE6(f);
        f.find("." + i[6]).children("a").on("click",
        function () {
            var i = r(this).index();
            0 === i ? n.yes ? n.yes(t.index, f) : layer.close(t.index) : 1 === i ? e() : n["btn" + (i + 1)] ? n["btn" + (i + 1)](t.index, f) : layer.close(t.index)
        });
        f.find("." + i[7]).on("click", e);
        n.shadeClose && r("#layui-layer-shade" + t.index).on("click",
        function () {
            layer.close(t.index)
        });
        f.find(".layui-layer-min").on("click",
        function () {
            layer.min(t.index, n);
            n.min && n.min(f)
        });
        f.find(".layui-layer-max").on("click",
        function () {
            r(this).hasClass("layui-layer-maxmin") ? (layer.restore(t.index), n.restore && n.restore(f)) : (layer.full(t.index, n), n.full && n.full(f))
        });
        n.end && (u.end[t.index] = n.end)
    };
    u.reselect = function () {
        r.each(r("select"),
        function () {
            var n = r(this);
            n.parents("." + i[0])[0] || 1 == n.attr("layer") && r("." + i[0]).length < 1 && n.removeAttr("layer").show();
            n = null
        })
    };
    e.pt.IE6 = function (n) {
        function t() {
            n.css({
                top: e + (u.config.fix ? f.scrollTop() : 0)
            })
        }
        var u = this,
        e = n.offset().top;
        t();
        f.scroll(t);
        r("select").each(function () {
            var n = r(this);
            n.parents("." + i[0])[0] || "none" === n.css("display") || n.attr({
                layer: "1"
            }).hide();
            n = null
        })
    };
    e.pt.openLayer = function () {
        var n = this;
        layer.zIndex = n.config.zIndex;
        layer.setTop = function (n) {
            var t = function () {
                layer.zIndex++;
                n.css("z-index", layer.zIndex + 1)
            };
            return layer.zIndex = parseInt(n[0].style.zIndex),
            n.on("mousedown", t),
            layer.zIndex
        }
    };
    u.record = function (n) {
        var t = [n.outerWidth(), n.outerHeight(), n.position().top, n.position().left + parseFloat(n.css("margin-left"))];
        n.find(".layui-layer-max").addClass("layui-layer-maxmin");
        n.attr({
            area: t
        })
    };
    u.rescollbar = function (n) {
        i.html.attr("layer-full") == n && (i.html[0].style.removeProperty ? i.html[0].style.removeProperty("overflow") : i.html[0].style.removeAttribute("overflow"), i.html.removeAttr("layer-full"))
    };
    layer.getChildFrame = function (n, t) {
        return t = t || r("." + i[4]).attr("times"),
        r("#" + i[0] + t).find("iframe").contents().find(n)
    };
    layer.getFrameIndex = function (n) {
        return r("#" + n).parents("." + i[4]).attr("times")
    };
    layer.iframeAuto = function (n) {
        if (n) {
            var u = layer.getChildFrame("body", n).outerHeight(),
            t = r("#" + i[0] + n),
            f = t.find(i[1]).outerHeight() || 0,
            e = t.find("." + i[6]).outerHeight() || 0;
            t.css({
                height: u + f + e
            });
            t.find("iframe").css({
                height: u
            })
        }
    };
    layer.iframeSrc = function (n, t) {
        r("#" + i[0] + n).find("iframe").attr("src", t)
    };
    layer.style = function (n, t) {
        var f = r("#" + i[0] + n),
        e = f.attr("type"),
        o = f.find(i[1]).outerHeight() || 0,
        s = f.find("." + i[6]).outerHeight() || 0; (e === u.type[1] || e === u.type[2]) && (f.css(t), e === u.type[2] && f.find("iframe").css({
            height: parseFloat(t.height) - o - s
        }))
    };
    layer.min = function (n) {
        var t = r("#" + i[0] + n),
        f = t.find(i[1]).outerHeight() || 0;
        u.record(t);
        layer.style(n, {
            width: 180,
            height: f,
            overflow: "hidden"
        });
        t.find(".layui-layer-min").hide();
        "page" === t.attr("type") && t.find(i[4]).hide();
        u.rescollbar(n)
    };
    layer.restore = function (n) {
        var t = r("#" + i[0] + n),
        f = t.attr("area").split(",");
        t.attr("type");
        layer.style(n, {
            width: parseFloat(f[0]),
            height: parseFloat(f[1]),
            top: parseFloat(f[2]),
            left: parseFloat(f[3]),
            overflow: "visible"
        });
        t.find(".layui-layer-max").removeClass("layui-layer-maxmin");
        t.find(".layui-layer-min").show();
        "page" === t.attr("type") && t.find(i[4]).show();
        u.rescollbar(n)
    };
    layer.full = function (n) {
        var e, t = r("#" + i[0] + n);
        u.record(t);
        i.html.attr("layer-full") || i.html.css("overflow", "hidden").attr("layer-full", n);
        clearTimeout(e);
        e = setTimeout(function () {
            var i = "fixed" === t.css("position");
            layer.style(n, {
                top: i ? 0 : f.scrollTop(),
                left: i ? 0 : f.scrollLeft(),
                width: f.width(),
                height: f.height() - 14
            });
            t.find(".layui-layer-min").hide()
        },
        100)
    };
    layer.title = function (n, t) {
        var u = r("#" + i[0] + (t || layer.index)).find(i[1]);
        u.html(n)
    };
    layer.close = function (n) {
        var t = r("#" + i[0] + n),
        o = t.attr("type"),
        e,
        f;
        if (t[0]) {
            if (o === u.type[1] && "object" === t.attr("conType")) for (t.children(":not(." + i[5] + ")").remove(), e = 0; 2 > e; e++) t.find(".layui-layer-wrap").unwrap().hide();
            else {
                if (o === u.type[2]) try {
                    f = r("#" + i[4] + n)[0];
                    f.contentWindow.document.write("");
                    f.contentWindow.close();
                    t.find("." + i[5])[0].removeChild(f)
                } catch (s) { }
                t[0].innerHTML = "";
                t.remove()
            }
            r("#layui-layer-moves, #layui-layer-shade" + n).remove();
            layer.ie6 && u.reselect();
            u.rescollbar(n);
            "function" == typeof u.end[n] && u.end[n]();
            delete u.end[n]
        }
    };
    layer.closeAll = function (n) {
        r.each(r("." + i[0]),
        function () {
            var t = r(this),
            i = n ? t.attr("type") === n : 1;
            i && layer.close(t.attr("times"));
            i = null
        })
    };
    u.run = function () {
        r = jQuery;
        f = r(n);
        i.html = r("html");
        layer.open = function (n) {
            var t = new e(n);
            return t.index
        }
    };
    "function" == typeof define ? define(function () {
        return u.run(),
        layer
    }) : function () {
        u.run();
        layer.use("dialog.css")
    }()
}(window)