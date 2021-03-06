(function(n, t) {
    var i = {},
    r = function(n, t) {
        var r, u, i;
        if (typeof n == "string") return f(n);
        for (r = [], u = n.length, i = 0; i < u; i++) r.push(f(n[i]));
        return t.apply(null, r)
    },
    o = function(n, t, i) {
        arguments.length === 2 && (i = t, t = null);
        r(t || [],
        function() {
            s(n, i, arguments)
        })
    },
    s = function(n, t, u) {
        var f = {
            exports: t
        },
        e;
        typeof t == "function" && (u.length || (u = [r, f.exports, f]), e = t.apply(null, u), e !== undefined && (f.exports = e));
        i[n] = f.exports
    },
    f = function(t) {
        var r = i[t] || n[t];
        if (!r) throw new Error("`" + t + "` is undefined");
        return r
    },
    h = function(n) {
        var r, t, f, u, e, o = function(n) {
            return n && n.charAt(0).toUpperCase() + n.substr(1)
        };
        for (r in i) if (t = n, i.hasOwnProperty(r)) {
            for (f = r.split("/"), e = o(f.pop()); u = o(f.shift());) t[u] = t[u] || {},
            t = t[u];
            t[e] = i[r]
        }
        return n
    },
    u = function(i) {
        return n.__dollar = i,
        h(t(n, o, r))
    },
    e;
    typeof module == "object" && typeof module.exports == "object" ? module.exports = u() : typeof define == "function" && define.amd ? define(["jquery"], u) : (e = n.WebUploader, n.WebUploader = u(), n.WebUploader.noConflict = function() {
        n.WebUploader = e
    })
})(window,
function(n, t, i) {
    return t("dollar-third", [],
    function() {
        var t = n.__dollar || n.jQuery || n.Zepto;
        if (!t) throw new Error("jQuery or Zepto not found!");
        return t
    }),
    t("dollar", ["dollar-third"],
    function(n) {
        return n
    }),
    t("promise-third", ["dollar"],
    function(n) {
        return {
            Deferred: n.Deferred,
            when: n.when,
            isPromise: function(n) {
                return n && typeof n.then == "function"
            }
        }
    }),
    t("promise", ["promise-third"],
    function(n) {
        return n
    }),
    t("base", ["dollar", "promise"],
    function(t, i) {
        function e(n) {
            return function() {
                return f.apply(n, arguments)
            }
        }
        function u(n, t) {
            return function() {
                return n.apply(t, arguments)
            }
        }
        function o(n) {
            var t;
            return Object.create ? Object.create(n) : (t = function() {},
            t.prototype = n, new t)
        }
        var r = function() {},
        f = Function.call;
        return {
            version: "0.1.5",
            $: t,
            Deferred: i.Deferred,
            isPromise: i.isPromise,
            when: i.when,
            browser: function(n) {
                var t = {},
                i = n.match(/WebKit\/([\d.]+)/),
                r = n.match(/Chrome\/([\d.]+)/) || n.match(/CriOS\/([\d.]+)/),
                u = n.match(/MSIE\s([\d\.]+)/) || n.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                f = n.match(/Firefox\/([\d.]+)/),
                e = n.match(/Safari\/([\d.]+)/),
                o = n.match(/OPR\/([\d.]+)/);
                return i && (t.webkit = parseFloat(i[1])),
                r && (t.chrome = parseFloat(r[1])),
                u && (t.ie = parseFloat(u[1])),
                f && (t.firefox = parseFloat(f[1])),
                e && (t.safari = parseFloat(e[1])),
                o && (t.opera = parseFloat(o[1])),
                t
            } (navigator.userAgent),
            os: function(n) {
                var t = {},
                i = n.match(/(?:Android);?[\s\/]+([\d.]+)?/),
                r = n.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
                return i && (t.android = parseFloat(i[1])),
                r && (t.ios = parseFloat(r[1].replace(/_/g, "."))),
                t
            } (navigator.userAgent),
            inherits: function(n, i, r) {
                var u;
                return typeof i == "function" ? (u = i, i = null) : u = i && i.hasOwnProperty("constructor") ? i.constructor: function() {
                    return n.apply(this, arguments)
                },
                t.extend(!0, u, n, r || {}),
                u.__super__ = n.prototype,
                u.prototype = o(n.prototype),
                i && t.extend(!0, u.prototype, i),
                u
            },
            noop: r,
            bindFn: u,
            log: function() {
                return n.console ? u(console.log, console) : r
            } (),
            nextTick: function() {
                return function(n) {
                    setTimeout(n, 1)
                }
            } (),
            slice: e([].slice),
            guid: function() {
                var n = 0;
                return function(t) {
                    for (var i = ( + new Date).toString(32), r = 0; r < 5; r++) i += Math.floor(Math.random() * 65535).toString(32);
                    return (t || "wu_") + i + (n++).toString(32)
                }
            } (),
            formatSize: function(n, t, i) {
                var r;
                for (i = i || ["B", "K", "M", "G", "TB"]; (r = i.shift()) && n > 1024;) n = n / 1024;
                return (r === "B" ? n: n.toFixed(t || 2)) + r
            }
        }
    }),
    t("mediator", ["base"],
    function(n) {
        function r(n, i, r, u) {
            return t.grep(n,
            function(n) {
                return n && (!i || n.e === i) && (!r || n.cb === r || n.cb._cb === r) && (!u || n.ctx === u)
            })
        }
        function u(n, i, r) {
            t.each((n || "").split(o),
            function(n, t) {
                r(t, i)
            })
        }
        function f(n, t) {
            for (var r = !1,
            u = -1,
            f = n.length,
            i; ++u < f;) if (i = n[u], i.cb.apply(i.ctx2, t) === !1) {
                r = !0;
                break
            }
            return ! r
        }
        var t = n.$,
        e = [].slice,
        o = /\s+/,
        i;
        return i = {
            on: function(n, t, i) {
                var f = this,
                r;
                return t ? (r = this._events || (this._events = []), u(n, t,
                function(n, t) {
                    var u = {
                        e: n
                    };
                    u.cb = t;
                    u.ctx = i;
                    u.ctx2 = i || f;
                    u.id = r.length;
                    r.push(u)
                }), this) : this
            },
            once: function(n, t, i) {
                var r = this;
                return t ? (u(n, t,
                function(n, t) {
                    var u = function() {
                        return r.off(n, u),
                        t.apply(i || r, arguments)
                    };
                    u._cb = t;
                    r.on(n, u, i)
                }), r) : r
            },
            off: function(n, i, f) {
                var e = this._events;
                return e ? !n && !i && !f ? (this._events = [], this) : (u(n, i,
                function(n, i) {
                    t.each(r(e, n, i, f),
                    function() {
                        delete e[this.id]
                    })
                }), this) : this
            },
            trigger: function(n) {
                var t, i, u;
                return ! this._events || !n ? this: (t = e.call(arguments, 1), i = r(this._events, n), u = r(this._events, "all"), f(i, t) && f(u, arguments))
            }
        },
        t.extend({
            installTo: function(n) {
                return t.extend(n, i)
            }
        },
        i)
    }),
    t("uploader", ["base", "mediator"],
    function(n, t) {
        function i(n) {
            this.options = r.extend(!0, {},
            i.options, n);
            this._init(this.options)
        }
        var r = n.$;
        return i.options = {},
        t.installTo(i.prototype),
        r.each({
            upload: "start-upload",
            stop: "stop-upload",
            getFile: "get-file",
            getFiles: "get-files",
            addFile: "add-file",
            addFiles: "add-file",
            sort: "sort-files",
            removeFile: "remove-file",
            cancelFile: "cancel-file",
            skipFile: "skip-file",
            retry: "retry",
            isInProgress: "is-in-progress",
            makeThumb: "make-thumb",
            md5File: "md5-file",
            getDimension: "get-dimension",
            addButton: "add-btn",
            predictRuntimeType: "predict-runtime-type",
            refresh: "refresh",
            disable: "disable",
            enable: "enable",
            reset: "reset"
        },
        function(n, t) {
            i.prototype[n] = function() {
                return this.request(t, arguments)
            }
        }),
        r.extend(i.prototype, {
            state: "pending",
            _init: function(n) {
                var t = this;
                t.request("init", n,
                function() {
                    t.state = "ready";
                    t.trigger("ready")
                })
            },
            option: function(n, t) {
                var i = this.options;
                if (arguments.length > 1) r.isPlainObject(t) && r.isPlainObject(i[n]) ? r.extend(i[n], t) : i[n] = t;
                else return n ? i[n] : i
            },
            getStats: function() {
                var n = this.request("get-stats");
                return n ? {
                    successNum: n.numOfSuccess,
                    progressNum: n.numOfProgress,
                    cancelNum: n.numOfCancel,
                    invalidNum: n.numOfInvalid,
                    uploadFailNum: n.numOfUploadFailed,
                    queueNum: n.numOfQueue,
                    interruptNum: n.numofInterrupt
                }: {}
            },
            trigger: function(n) {
                var u = [].slice.call(arguments, 1),
                f = this.options,
                i = "on" + n.substring(0, 1).toUpperCase() + n.substring(1);
                return t.trigger.apply(this, arguments) === !1 || r.isFunction(f[i]) && f[i].apply(this, u) === !1 || r.isFunction(this[i]) && this[i].apply(this, u) === !1 || t.trigger.apply(t, [this, n].concat(u)) === !1 ? !1 : !0
            },
            destroy: function() {
                this.request("destroy", arguments);
                this.off()
            },
            request: n.noop
        }),
        n.create = i.create = function(n) {
            return new i(n)
        },
        n.Uploader = i,
        i
    }),
    t("runtime/runtime", ["base", "mediator"],
    function(n, t) {
        function i(t) {
            this.options = u.extend({
                container: document.body
            },
            t);
            this.uid = n.guid("rt_")
        }
        var u = n.$,
        r = {},
        f = function(n) {
            for (var t in n) if (n.hasOwnProperty(t)) return t;
            return null
        };
        return u.extend(i.prototype, {
            getContainer: function() {
                var i = this.options,
                t, n;
                return this._container ? this._container: (t = u(i.container || document.body), n = u(document.createElement("div")), n.attr("id", "rt_" + this.uid), n.css({
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden"
                }), t.append(n), t.addClass("webuploader-container"), this._container = n, this._parent = t, n)
            },
            init: n.noop,
            exec: n.noop,
            destroy: function() {
                this._container && this._container.remove();
                this._parent && this._parent.removeClass("webuploader-container");
                this.off()
            }
        }),
        i.orders = "html5,flash",
        i.addRuntime = function(n, t) {
            r[n] = t
        },
        i.hasRuntime = function(n) {
            return !! (n ? r[n] : f(r))
        },
        i.create = function(n, t) {
            var e;
            if (t = t || i.orders, u.each(t.split(/\s*,\s*/g),
            function() {
                if (r[this]) return e = this,
                !1
            }), e = e || f(r), !e) throw new Error("Runtime Error");
            return new r[e](n)
        },
        t.installTo(i.prototype),
        i
    }),
    t("runtime/client", ["base", "mediator", "runtime/runtime"],
    function(n, t, i) {
        function u(t, u) {
            var e = n.Deferred(),
            f;
            this.uid = n.guid("client_");
            this.runtimeReady = function(n) {
                return e.done(n)
            };
            this.connectRuntime = function(t, o) {
                if (f) throw new Error("already connected!");
                if (e.done(o), typeof t == "string" && r.get(t) && (f = r.get(t)), f = f || r.get(null, u), f) n.$.extend(f.options, t),
                f.__promise.then(e.resolve),
                f.__client++;
                else {
                    f = i.create(t, t.runtimeOrder);
                    f.__promise = e.promise();
                    f.once("ready", e.resolve);
                    f.init();
                    r.add(f);
                    f.__client = 1
                }
                return u && (f.__standalone = u),
                f
            };
            this.getRuntime = function() {
                return f
            };
            this.disconnectRuntime = function() {
                f && (f.__client--, f.__client <= 0 && (r.remove(f), delete f.__promise, f.destroy()), f = null)
            };
            this.exec = function() {
                if (f) {
                    var i = n.slice(arguments);
                    return t && i.unshift(t),
                    f.exec.apply(this, i)
                }
            };
            this.getRuid = function() {
                return f && f.uid
            };
            this.destroy = function(n) {
                return function() {
                    n && n.apply(this, arguments);
                    this.trigger("destroy");
                    this.off();
                    this.exec("destroy");
                    this.disconnectRuntime()
                }
            } (this.destroy)
        }
        var r;
        return r = function() {
            var n = {};
            return {
                add: function(t) {
                    n[t.uid] = t
                },
                get: function(t, i) {
                    var r;
                    if (t) return n[t];
                    for (r in n) if (!i || !n[r].__standalone) return n[r];
                    return null
                },
                remove: function(t) {
                    delete n[t.uid]
                }
            }
        } (),
        t.installTo(u.prototype),
        u
    }),
    t("lib/dnd", ["base", "mediator", "runtime/client"],
    function(n, t, i) {
        function r(n) { (n = this.options = u.extend({},
            r.options, n), n.container = u(n.container), n.container.length) && i.call(this, "DragAndDrop")
        }
        var u = n.$;
        return r.options = {
            accept: null,
            disableGlobalDnd: !1
        },
        n.inherits(i, {
            constructor: r,
            init: function() {
                var n = this;
                n.connectRuntime(n.options,
                function() {
                    n.exec("init");
                    n.trigger("ready")
                })
            }
        }),
        t.installTo(r.prototype),
        r
    }),
    t("widgets/widget", ["base", "uploader"],
    function(n, t) {
        function s(n) {
            if (!n) return ! 1;
            var t = n.length,
            r = i.type(n);
            return n.nodeType === 1 && t ? !0 : r === "array" || r !== "function" && r !== "string" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in n)
        }
        function u(n) {
            this.owner = n;
            this.options = n.options
        }
        var i = n.$,
        e = t.prototype._init,
        o = t.prototype.destroy,
        f = {},
        r = [];
        return i.extend(u.prototype, {
            init: n.noop,
            invoke: function(n, t) {
                var r = this.responseMap;
                return ! r || !(n in r) || !(r[n] in this) || !i.isFunction(this[r[n]]) ? f: this[r[n]].apply(this, t)
            },
            request: function() {
                return this.owner.request.apply(this.owner, arguments)
            }
        }),
        i.extend(t.prototype, {
            _init: function() {
                var n = this,
                u = n._widgets = [],
                t = n.options.disableWidgets || "";
                return i.each(r,
                function(i, r) {
                    t && ~t.indexOf(r._name) || u.push(new r(n))
                }),
                e.apply(n, arguments)
            },
            request: function(t, i, r) {
                var e = 0,
                o = this._widgets,
                y = o && o.length,
                a = [],
                h = [],
                v,
                u,
                c,
                l;
                for (i = s(i) ? i: [i]; e < y; e++) v = o[e],
                u = v.invoke(t, i),
                u !== f && (n.isPromise(u) ? h.push(u) : a.push(u));
                return r || h.length ? (c = n.when.apply(n, h), l = c.pipe ? "pipe": "then", c[l](function() {
                    var i = n.Deferred(),
                    t = arguments;
                    return t.length === 1 && (t = t[0]),
                    setTimeout(function() {
                        i.resolve(t)
                    },
                    1),
                    i.promise()
                })[r ? l: "done"](r || n.noop)) : a[0]
            },
            destroy: function() {
                o.apply(this, arguments);
                this._widgets = null
            }
        }),
        t.register = u.register = function(t, f) {
            var e = {
                init: "init",
                destroy: "destroy",
                name: "anonymous"
            },
            o;
            return arguments.length === 1 ? (f = t, i.each(f,
            function(n) {
                if (n[0] === "_" || n === "name") {
                    n === "name" && (e.name = f.name);
                    return
                }
                e[n.replace(/[A-Z]/g, "-$&").toLowerCase()] = n
            })) : e = i.extend(e, t),
            f.responseMap = e,
            o = n.inherits(u, f),
            o._name = e.name,
            r.push(o),
            o
        },
        t.unRegister = u.unRegister = function(n) {
            if (n && n !== "anonymous") for (var t = r.length; t--;) r[t]._name === n && r.splice(t, 1)
        },
        u
    }),
    t("widgets/filednd", ["base", "uploader", "lib/dnd", "widgets/widget"],
    function(n, t, i) {
        var r = n.$;
        return t.options.dnd = "",
        t.register({
            name: "dnd",
            init: function(t) {
                if (t.dnd && this.request("predict-runtime-type") === "html5") {
                    var f = this,
                    e = n.Deferred(),
                    o = r.extend({},
                    {
                        disableGlobalDnd: t.disableGlobalDnd,
                        container: t.dnd,
                        accept: t.accept
                    }),
                    u;
                    this.dnd = u = new i(o);
                    u.once("ready", e.resolve);
                    u.on("drop",
                    function(n) {
                        f.request("add-file", [n])
                    });
                    u.on("accept",
                    function(n) {
                        return f.owner.trigger("dndAccept", n)
                    });
                    return u.init(),
                    e.promise()
                }
            },
            destroy: function() {
                this.dnd && this.dnd.destroy()
            }
        })
    }),
    t("lib/filepaste", ["base", "mediator", "runtime/client"],
    function(n, t, i) {
        function r(n) {
            n = this.options = u.extend({},
            n);
            n.container = u(n.container || document.body);
            i.call(this, "FilePaste")
        }
        var u = n.$;
        return n.inherits(i, {
            constructor: r,
            init: function() {
                var n = this;
                n.connectRuntime(n.options,
                function() {
                    n.exec("init");
                    n.trigger("ready")
                })
            }
        }),
        t.installTo(r.prototype),
        r
    }),
    t("widgets/filepaste", ["base", "uploader", "lib/filepaste", "widgets/widget"],
    function(n, t, i) {
        var r = n.$;
        return t.register({
            name: "paste",
            init: function(t) {
                if (t.paste && this.request("predict-runtime-type") === "html5") {
                    var e = this,
                    f = n.Deferred(),
                    o = r.extend({},
                    {
                        container: t.paste,
                        accept: t.accept
                    }),
                    u;
                    this.paste = u = new i(o);
                    u.once("ready", f.resolve);
                    u.on("paste",
                    function(n) {
                        e.owner.request("add-file", [n])
                    });
                    return u.init(),
                    f.promise()
                }
            },
            destroy: function() {
                this.paste && this.paste.destroy()
            }
        })
    }),
    t("lib/blob", ["base", "runtime/client"],
    function(n, t) {
        function i(n, i) {
            var r = this;
            r.source = i;
            r.ruid = n;
            this.size = i.size || 0;
            this.type = !i.type && this.ext && ~"jpg,jpeg,png,gif,bmp".indexOf(this.ext) ? "image/" + (this.ext === "jpg" ? "jpeg": this.ext) : i.type || "application/octet-stream";
            t.call(r, "Blob");
            this.uid = i.uid || this.uid;
            n && r.connectRuntime(n)
        }
        return n.inherits(t, {
            constructor: i,
            slice: function(n, t) {
                return this.exec("slice", n, t)
            },
            getSource: function() {
                return this.source
            }
        }),
        i
    }),
    t("lib/file", ["base", "lib/blob"],
    function(n, t) {
        function u(n, u) {
            var f;
            this.name = u.name || "untitled" + i++;
            f = r.exec(u.name) ? RegExp.$1.toLowerCase() : ""; ! f && u.type && (f = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(u.type) ? RegExp.$1.toLowerCase() : "", this.name += "." + f);
            this.ext = f;
            this.lastModifiedDate = u.lastModifiedDate || (new Date).toLocaleString();
            t.apply(this, arguments)
        }
        var i = 1,
        r = /\.([^.]+)$/;
        return n.inherits(t, u)
    }),
    t("lib/filepicker", ["base", "runtime/client", "lib/file"],
    function(t, i, r) {
        function f(n) {
            if (n = this.options = u.extend({},
            f.options, n), n.container = u(n.id), !n.container.length) throw new Error("按钮指定错误");
            n.innerHTML = n.innerHTML || n.label || n.container.html() || "";
            n.button = u(n.button || document.createElement("div"));
            n.button.html(n.innerHTML);
            n.container.html(n.button);
            i.call(this, "FilePicker", !0)
        }
        var u = t.$;
        return f.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: !0,
            accept: null,
            name: "file"
        },
        t.inherits(i, {
            constructor: f,
            init: function() {
                var i = this,
                f = i.options,
                e = f.button;
                e.addClass("webuploader-pick");
                i.on("all",
                function(n) {
                    var t;
                    switch (n) {
                    case "mouseenter":
                        e.addClass("webuploader-pick-hover");
                        break;
                    case "mouseleave":
                        e.removeClass("webuploader-pick-hover");
                        break;
                    case "change":
                        t = i.exec("getFiles");
                        i.trigger("select", u.map(t,
                        function(n) {
                            return n = new r(i.getRuid(), n),
                            n._refer = f.container,
                            n
                        }), f.container)
                    }
                });
                i.connectRuntime(f,
                function() {
                    i.refresh();
                    i.exec("init", f);
                    i.trigger("ready")
                });
                this._resizeHandler = t.bindFn(this.refresh, this);
                u(n).on("resize", this._resizeHandler)
            },
            refresh: function() {
                var r = this.getRuntime().getContainer(),
                n = this.options.button,
                t = n.outerWidth ? n.outerWidth() : n.width(),
                i = n.outerHeight ? n.outerHeight() : n.height(),
                u = n.offset();
                t && i && r.css({
                    bottom: "auto",
                    right: "auto",
                    width: t + "px",
                    height: i + "px"
                }).offset(u)
            },
            enable: function() {
                var n = this.options.button;
                n.removeClass("webuploader-pick-disable");
                this.refresh()
            },
            disable: function() {
                var n = this.options.button;
                this.getRuntime().getContainer().css({
                    top: "-99999px"
                });
                n.addClass("webuploader-pick-disable")
            },
            destroy: function() {
                var t = this.options.button;
                u(n).off("resize", this._resizeHandler);
                t.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick")
            }
        }),
        f
    }),
    t("widgets/filepicker", ["base", "uploader", "lib/filepicker", "widgets/widget"],
    function(n, t, i) {
        var r = n.$;
        return r.extend(t.options, {
            pick: null,
            accept: null
        }),
        t.register({
            name: "picker",
            init: function(n) {
                return this.pickers = [],
                n.pick && this.addBtn(n.pick)
            },
            refresh: function() {
                r.each(this.pickers,
                function() {
                    this.refresh()
                })
            },
            addBtn: function(t) {
                var u = this,
                f = u.options,
                e = f.accept,
                o = [];
                if (t) return r.isPlainObject(t) || (t = {
                    id: t
                }),
                r(t.id).each(function() {
                    var c, s, h;
                    h = n.Deferred();
                    c = r.extend({},
                    t, {
                        accept: r.isPlainObject(e) ? [e] : e,
                        swf: f.swf,
                        runtimeOrder: f.runtimeOrder,
                        id: this
                    });
                    s = new i(c);
                    s.once("ready", h.resolve);
                    s.on("select",
                    function(n) {
                        u.owner.request("add-file", [n])
                    });
                    s.init();
                    u.pickers.push(s);
                    o.push(h.promise())
                }),
                n.when.apply(n, o)
            },
            disable: function() {
                r.each(this.pickers,
                function() {
                    this.disable()
                })
            },
            enable: function() {
                r.each(this.pickers,
                function() {
                    this.enable()
                })
            },
            destroy: function() {
                r.each(this.pickers,
                function() {
                    this.destroy()
                });
                this.pickers = null
            }
        })
    }),
    t("lib/image", ["base", "runtime/client", "lib/blob"],
    function(n, t, i) {
        function r(n) {
            this.options = u.extend({},
            r.options, n);
            t.call(this, "Image");
            this.on("load",
            function() {
                this._info = this.exec("info");
                this._meta = this.exec("meta")
            })
        }
        var u = n.$;
        return r.options = {
            quality: 90,
            crop: !1,
            preserveHeaders: !1,
            allowMagnify: !1
        },
        n.inherits(t, {
            constructor: r,
            info: function(n) {
                return n ? (this._info = n, this) : this._info
            },
            meta: function(n) {
                return n ? (this._meta = n, this) : this._meta
            },
            loadFromBlob: function(n) {
                var t = this,
                i = n.getRuid();
                this.connectRuntime(i,
                function() {
                    t.exec("init", t.options);
                    t.exec("loadFromBlob", n)
                })
            },
            resize: function() {
                var t = n.slice(arguments);
                return this.exec.apply(this, ["resize"].concat(t))
            },
            crop: function() {
                var t = n.slice(arguments);
                return this.exec.apply(this, ["crop"].concat(t))
            },
            getAsDataUrl: function(n) {
                return this.exec("getAsDataUrl", n)
            },
            getAsBlob: function(n) {
                var t = this.exec("getAsBlob", n);
                return new i(this.getRuid(), t)
            }
        }),
        r
    }),
    t("widgets/image", ["base", "uploader", "lib/image", "widgets/widget"],
    function(n, t, i) {
        var r = n.$,
        u;
        return u = function(n) {
            var t = 0,
            i = [],
            r = function() {
                for (var r; i.length && t < n;) r = i.shift(),
                t += r[0],
                r[1]()
            };
            return function(n, u, f) {
                i.push([u, f]);
                n.once("destroy",
                function() {
                    t -= u;
                    setTimeout(r, 1)
                });
                setTimeout(r, 1)
            }
        } (5242880),
        r.extend(t.options, {
            thumb: {
                width: 110,
                height: 110,
                quality: 70,
                allowMagnify: !0,
                crop: !0,
                preserveHeaders: !1,
                type: "image/jpeg"
            },
            compress: {
                width: 1600,
                height: 1600,
                quality: 90,
                allowMagnify: !1,
                crop: !1,
                preserveHeaders: !0
            }
        }),
        t.register({
            name: "image",
            makeThumb: function(n, t, f, e) {
                var s, o;
                if (n = this.request("get-file", n), !n.type.match(/^image/)) {
                    t(!0);
                    return
                }
                s = r.extend({},
                this.options.thumb);
                r.isPlainObject(f) && (s = r.extend(s, f), f = null);
                f = f || s.width;
                e = e || s.height;
                o = new i(s);
                o.once("load",
                function() {
                    n._info = n._info || o.info();
                    n._meta = n._meta || o.meta();
                    f <= 1 && f > 0 && (f = n._info.width * f);
                    e <= 1 && e > 0 && (e = n._info.height * e);
                    o.resize(f, e)
                });
                o.once("complete",
                function() {
                    t(!1, o.getAsDataUrl(s.type));
                    o.destroy()
                });
                o.once("error",
                function(n) {
                    t(n || !0);
                    o.destroy()
                });
                u(o, n.source.size,
                function() {
                    n._info && o.info(n._info);
                    n._meta && o.meta(n._meta);
                    o.loadFromBlob(n.source)
                })
            },
            beforeSendFile: function(t) {
                var f = this.options.compress || this.options.resize,
                o = f && f.compressSize || 0,
                s = f && f.noCompressIfLarger || !1,
                u, e;
                if (t = this.request("get-file", t), f && ~"image/jpeg,image/jpg".indexOf(t.type) && !(t.size < o) && !t._compressed) {
                    f = r.extend({},
                    f);
                    e = n.Deferred();
                    u = new i(f);
                    e.always(function() {
                        u.destroy();
                        u = null
                    });
                    u.once("error", e.reject);
                    u.once("load",
                    function() {
                        var n = f.width,
                        i = f.height;
                        t._info = t._info || u.info();
                        t._meta = t._meta || u.meta();
                        n <= 1 && n > 0 && (n = t._info.width * n);
                        i <= 1 && i > 0 && (i = t._info.height * i);
                        u.resize(n, i)
                    });
                    u.once("complete",
                    function() {
                        var n, i;
                        try {
                            n = u.getAsBlob(f.type);
                            i = t.size; (!s || n.size < i) && (t.source = n, t.size = n.size, t.trigger("resize", n.size, i));
                            t._compressed = !0;
                            e.resolve()
                        } catch(r) {
                            e.resolve()
                        }
                    });
                    return t._info && u.info(t._info),
                    t._meta && u.meta(t._meta),
                    u.loadFromBlob(t.source),
                    e.promise()
                }
            }
        })
    }),
    t("file", ["base", "mediator"],
    function(n, t) {
        function s() {
            return f + e++
        }
        function i(n) {
            this.name = n.name || "Untitled";
            this.size = n.size || 0;
            this.type = n.type || "application/octet-stream";
            this.lastModifiedDate = n.lastModifiedDate || new Date * 1;
            this.id = s();
            this.ext = o.exec(this.name) ? RegExp.$1: "";
            this.statusText = "";
            r[this.id] = i.Status.INITED;
            this.source = n;
            this.loaded = 0;
            this.on("error",
            function(n) {
                this.setStatus(i.Status.ERROR, n)
            })
        }
        var u = n.$,
        f = "WU_FILE_",
        e = 0,
        o = /\.([^.]+)$/,
        r = {};
        return u.extend(i.prototype, {
            setStatus: function(n, t) {
                var i = r[this.id];
                typeof t != "undefined" && (this.statusText = t);
                n !== i && (r[this.id] = n, this.trigger("statuschange", n, i))
            },
            getStatus: function() {
                return r[this.id]
            },
            getSource: function() {
                return this.source
            },
            destroy: function() {
                this.off();
                delete r[this.id]
            }
        }),
        t.installTo(i.prototype),
        i.Status = {
            INITED: "inited",
            QUEUED: "queued",
            PROGRESS: "progress",
            ERROR: "error",
            COMPLETE: "complete",
            CANCELLED: "cancelled",
            INTERRUPT: "interrupt",
            INVALID: "invalid"
        },
        i
    }),
    t("queue", ["base", "mediator", "file"],
    function(n, t, i) {
        function u() {
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0,
                numofDeleted: 0,
                numofInterrupt: 0
            };
            this._queue = [];
            this._map = {}
        }
        var f = n.$,
        r = i.Status;
        return f.extend(u.prototype, {
            append: function(n) {
                return this._queue.push(n),
                this._fileAdded(n),
                this
            },
            prepend: function(n) {
                return this._queue.unshift(n),
                this._fileAdded(n),
                this
            },
            getFile: function(n) {
                return typeof n != "string" ? n: this._map[n]
            },
            fetch: function(n) {
                var u = this._queue.length,
                t, i;
                for (n = n || r.QUEUED, t = 0; t < u; t++) if (i = this._queue[t], n === i.getStatus()) return i;
                return null
            },
            sort: function(n) {
                typeof n == "function" && this._queue.sort(n)
            },
            getFiles: function() {
                for (var i = [].slice.call(arguments, 0), r = [], n = 0, u = this._queue.length, t; n < u; n++)(t = this._queue[n], !i.length || ~f.inArray(t.getStatus(), i)) && r.push(t);
                return r
            },
            removeFile: function(n) {
                var i = this,
                t = this._map[n.id];
                t && (delete this._map[n.id], n.destroy(), this.stats.numofDeleted++)
            },
            _fileAdded: function(n) {
                var t = this,
                i = this._map[n.id];
                if (!i) {
                    this._map[n.id] = n;
                    n.on("statuschange",
                    function(n, i) {
                        t._onFileStatusChange(n, i)
                    })
                }
            },
            _onFileStatusChange: function(n, t) {
                var i = this.stats;
                switch (t) {
                case r.PROGRESS:
                    i.numOfProgress--;
                    break;
                case r.QUEUED:
                    i.numOfQueue--;
                    break;
                case r.ERROR:
                    i.numOfUploadFailed--;
                    break;
                case r.INVALID:
                    i.numOfInvalid--;
                    break;
                case r.INTERRUPT:
                    i.numofInterrupt--
                }
                switch (n) {
                case r.QUEUED:
                    i.numOfQueue++;
                    break;
                case r.PROGRESS:
                    i.numOfProgress++;
                    break;
                case r.ERROR:
                    i.numOfUploadFailed++;
                    break;
                case r.COMPLETE:
                    i.numOfSuccess++;
                    break;
                case r.CANCELLED:
                    i.numOfCancel++;
                    break;
                case r.INVALID:
                    i.numOfInvalid++;
                    break;
                case r.INTERRUPT:
                    i.numofInterrupt++
                }
            }
        }),
        t.installTo(u.prototype),
        u
    }),
    t("widgets/queue", ["base", "uploader", "queue", "file", "lib/file", "runtime/client", "widgets/widget"],
    function(n, t, i, r, u, f) {
        var o = n.$,
        s = /\.\w+$/,
        e = r.Status;
        return t.register({
            name: "queue",
            init: function(t) {
                var r = this,
                s, l, u, h, e, a, c;
                if (o.isPlainObject(t.accept) && (t.accept = [t.accept]), t.accept) {
                    for (e = [], u = 0, l = t.accept.length; u < l; u++) h = t.accept[u].extensions,
                    h && e.push(h);
                    e.length && (a = "\\." + e.join(",").replace(/,/g, "$|\\.").replace(/\*/g, ".*") + "$");
                    r.accept = new RegExp(a, "i")
                }
                if (r.queue = new i, r.stats = r.queue.stats, this.request("predict-runtime-type") === "html5") return s = n.Deferred(),
                this.placeholder = c = new f("Placeholder"),
                c.connectRuntime({
                    runtimeOrder: "html5"
                },
                function() {
                    r._ruid = c.getRuid();
                    s.resolve()
                }),
                s.promise()
            },
            _wrapFile: function(n) {
                if (! (n instanceof r)) {
                    if (! (n instanceof u)) {
                        if (!this._ruid) throw new Error("Can't add external files.");
                        n = new u(this._ruid, n)
                    }
                    n = new r(n)
                }
                return n
            },
            acceptFile: function(n) {
                var t = !n || !n.size || this.accept && s.exec(n.name) && !this.accept.test(n.name);
                return ! t
            },
            _addFile: function(n) {
                var t = this;
                if (n = t._wrapFile(n), t.owner.trigger("beforeFileQueued", n)) {
                    if (!t.acceptFile(n)) {
                        t.owner.trigger("error", "Q_TYPE_DENIED", n);
                        return
                    }
                    return t.queue.append(n),
                    t.owner.trigger("fileQueued", n),
                    n
                }
            },
            getFile: function(n) {
                return this.queue.getFile(n)
            },
            addFile: function(n) {
                var t = this;
                n.length || (n = [n]);
                n = o.map(n,
                function(n) {
                    return t._addFile(n)
                });
                t.owner.trigger("filesQueued", n);
                t.options.auto && setTimeout(function() {
                    t.request("start-upload")
                },
                20)
            },
            getStats: function() {
                return this.stats
            },
            removeFile: function(n, t) {
                var i = this;
                n = n.id ? n: i.queue.getFile(n);
                this.request("cancel-file", n);
                t && this.queue.removeFile(n)
            },
            getFiles: function() {
                return this.queue.getFiles.apply(this.queue, arguments)
            },
            fetchFile: function() {
                return this.queue.fetch.apply(this.queue, arguments)
            },
            retry: function(n, t) {
                var i = this,
                u, r, f;
                if (n) {
                    n = n.id ? n: i.queue.getFile(n);
                    n.setStatus(e.QUEUED);
                    t || i.request("start-upload");
                    return
                }
                for (u = i.queue.getFiles(e.ERROR), r = 0, f = u.length; r < f; r++) n = u[r],
                n.setStatus(e.QUEUED);
                i.request("start-upload")
            },
            sortFiles: function() {
                return this.queue.sort.apply(this.queue, arguments)
            },
            reset: function() {
                this.owner.trigger("reset");
                this.queue = new i;
                this.stats = this.queue.stats
            },
            destroy: function() {
                this.reset();
                this.placeholder && this.placeholder.destroy()
            }
        })
    }),
    t("widgets/runtime", ["uploader", "runtime/runtime", "widgets/widget"],
    function(n, t) {
        return n.support = function() {
            return t.hasRuntime.apply(t, arguments)
        },
        n.register({
            name: "runtime",
            init: function() {
                if (!this.predictRuntimeType()) throw Error("Runtime Error");
            },
            predictRuntimeType: function() {
                var n = this.options.runtimeOrder || t.orders,
                r = this.type,
                i, u;
                if (!r) for (n = n.split(/\s*,\s*/g), i = 0, u = n.length; i < u; i++) if (t.hasRuntime(n[i])) {
                    this.type = r = n[i];
                    break
                }
                return r
            }
        })
    }),
    t("lib/transport", ["base", "runtime/client", "mediator"],
    function(n, t, i) {
        function r(n) {
            var i = this;
            n = i.options = u.extend(!0, {},
            r.options, n || {});
            t.call(this, "Transport");
            this._blob = null;
            this._formData = n.formData || {};
            this._headers = n.headers || {};
            this.on("progress", this._timeout);
            this.on("load error",
            function() {
                i.trigger("progress", 1);
                clearTimeout(i._timer)
            })
        }
        var u = n.$;
        return r.options = {
            server: "",
            method: "POST",
            withCredentials: !1,
            fileVal: "file",
            timeout: 12e4,
            formData: {},
            headers: {},
            sendAsBinary: !1
        },
        u.extend(r.prototype, {
            appendBlob: function(n, t, i) {
                var r = this,
                u = r.options;
                r.getRuid() && r.disconnectRuntime();
                r.connectRuntime(t.ruid,
                function() {
                    r.exec("init")
                });
                r._blob = t;
                u.fileVal = n || u.fileVal;
                u.filename = i || u.filename
            },
            append: function(n, t) {
                typeof n == "object" ? u.extend(this._formData, n) : this._formData[n] = t
            },
            setRequestHeader: function(n, t) {
                typeof n == "object" ? u.extend(this._headers, n) : this._headers[n] = t
            },
            send: function(n) {
                this.exec("send", n);
                this._timeout()
            },
            abort: function() {
                return clearTimeout(this._timer),
                this.exec("abort")
            },
            destroy: function() {
                this.trigger("destroy");
                this.off();
                this.exec("destroy");
                this.disconnectRuntime()
            },
            getResponse: function() {
                return this.exec("getResponse")
            },
            getResponseAsJson: function() {
                return this.exec("getResponseAsJson")
            },
            getStatus: function() {
                return this.exec("getStatus")
            },
            _timeout: function() {
                var n = this,
                t = n.options.timeout;
                t && (clearTimeout(n._timer), n._timer = setTimeout(function() {
                    n.abort();
                    n.trigger("error", "timeout")
                },
                t))
            }
        }),
        i.installTo(r.prototype),
        r
    }),
    t("widgets/upload", ["base", "uploader", "file", "lib/transport", "widgets/widget"],
    function(n, t, i, r) {
        function o(n, t) {
            for (var i = [], h = n.source, r = h.size, o = t ? Math.ceil(r / t) : 1, u = 0, s = 0, f, e = {
                file: n,
                has: function() {
                    return !! i.length
                },
                shift: function() {
                    return i.shift()
                },
                unshift: function(n) {
                    i.unshift(n)
                }
            }; s < o;) f = Math.min(t, r - u),
            i.push({
                file: n,
                start: u,
                end: t ? u + f: r,
                total: r,
                chunks: o,
                chunk: s++,
                cuted: e
            }),
            u += f;
            return n.blocks = i.concat(),
            n.remaning = i.length,
            e
        }
        var f = n.$,
        e = n.isPromise,
        u = i.Status;
        f.extend(t.options, {
            prepareNextFile: !1,
            chunked: !1,
            chunkSize: 5242880,
            chunkRetry: 2,
            threads: 3,
            formData: {}
        });
        t.register({
            name: "upload",
            init: function() {
                var t = this.owner,
                i = this;
                this.runing = !1;
                this.progress = !1;
                t.on("startUpload",
                function() {
                    i.progress = !0
                }).on("uploadFinished",
                function() {
                    i.progress = !1
                });
                this.pool = [];
                this.stack = [];
                this.pending = [];
                this.remaning = 0;
                this.__tick = n.bindFn(this._tick, this);
                t.on("uploadComplete",
                function(n) {
                    n.blocks && f.each(n.blocks,
                    function(n, t) {
                        t.transport && (t.transport.abort(), t.transport.destroy());
                        delete t.transport
                    });
                    delete n.blocks;
                    delete n.remaning
                })
            },
            reset: function() {
                this.request("stop-upload", !0);
                this.runing = !1;
                this.pool = [];
                this.stack = [];
                this.pending = [];
                this.remaning = 0;
                this._trigged = !1;
                this._promise = null
            },
            startUpload: function(t) {
                var i = this,
                r, t;
                if (f.each(i.request("get-files", u.INVALID),
                function() {
                    i.request("remove-file", this)
                }), t) if (t = t.id ? t: i.request("get-file", t), t.getStatus() === u.INTERRUPT) f.each(i.pool,
                function(n, i) {
                    i.file === t && i.transport && i.transport.send()
                }),
                t.setStatus(u.QUEUED);
                else {
                    if (t.getStatus() === u.PROGRESS) return;
                    t.setStatus(u.QUEUED)
                } else f.each(i.request("get-files", [u.INITED]),
                function() {
                    this.setStatus(u.QUEUED)
                });
                if (!i.runing) {
                    for (i.runing = !0, r = [], f.each(i.pool,
                    function(n, t) {
                        var f = t.file;
                        f.getStatus() === u.INTERRUPT && (r.push(f), i._trigged = !1, t.transport && t.transport.send())
                    }); t = r.shift();) t.setStatus(u.PROGRESS);
                    t || f.each(i.request("get-files", u.INTERRUPT),
                    function() {
                        this.setStatus(u.PROGRESS)
                    });
                    i._trigged = !1;
                    n.nextTick(i.__tick);
                    i.owner.trigger("startUpload")
                }
            },
            stopUpload: function(t, i) {
                var r = this;
                if (t === !0 && (i = t, t = null), r.runing !== !1) {
                    if (t) return (t = t.id ? t: r.request("get-file", t), t.getStatus() !== u.PROGRESS && t.getStatus() !== u.QUEUED) ? void 0 : (t.setStatus(u.INTERRUPT), f.each(r.pool,
                    function(n, i) {
                        i.file === t && (i.transport && i.transport.abort(), r._putback(i), r._popBlock(i))
                    }), n.nextTick(r.__tick));
                    r.runing = !1;
                    this._promise && this._promise.file && this._promise.file.setStatus(u.INTERRUPT);
                    i && f.each(r.pool,
                    function(n, t) {
                        t.transport && t.transport.abort();
                        t.file.setStatus(u.INTERRUPT)
                    });
                    r.owner.trigger("stopUpload")
                }
            },
            cancelFile: function(n) {
                n = n.id ? n: this.request("get-file", n);
                n.blocks && f.each(n.blocks,
                function(n, t) {
                    var i = t.transport;
                    i && (i.abort(), i.destroy(), delete t.transport)
                });
                n.setStatus(u.CANCELLED);
                this.owner.trigger("fileDequeued", n)
            },
            isInProgress: function() {
                return !! this.progress
            },
            _getStats: function() {
                return this.request("get-stats")
            },
            skipFile: function(n, t) {
                n = n.id ? n: this.request("get-file", n);
                n.setStatus(t || u.COMPLETE);
                n.skipped = !0;
                n.blocks && f.each(n.blocks,
                function(n, t) {
                    var i = t.transport;
                    i && (i.abort(), i.destroy(), delete t.transport)
                });
                this.owner.trigger("uploadSkip", n)
            },
            _tick: function() {
                var t = this,
                u = t.options,
                r, i;
                if (t._promise) return t._promise.always(t.__tick);
                t.pool.length < u.threads && (i = t._nextBlock()) ? (t._trigged = !1, r = function(i) {
                    t._promise = null;
                    i && i.file && t._startSend(i);
                    n.nextTick(t.__tick)
                },
                t._promise = e(i) ? i.always(r) : r(i)) : t.remaning || t._getStats().numOfQueue || t._getStats().numofInterrupt || (t.runing = !1, t._trigged || n.nextTick(function() {
                    t.owner.trigger("uploadFinished")
                }), t._trigged = !0)
            },
            _putback: function(n) {
                var t;
                n.cuted.unshift(n);
                t = this.stack.indexOf(n.cuted);~t || this.stack.unshift(n.cuted)
            },
            _getStack: function() {
                for (var t = 0,
                n; n = this.stack[t++];) {
                    if (n.has() && n.file.getStatus() === u.PROGRESS) return n;
                    n.has() && (n.file.getStatus() === u.PROGRESS || n.file.getStatus() === u.INTERRUPT) || this.stack.splice(--t, 1)
                }
                return null
            },
            _nextBlock: function() {
                var n = this,
                r = n.options,
                i, t, u, f;
                return (i = this._getStack()) ? (r.prepareNextFile && !n.pending.length && n._prepareNextFile(), i.shift()) : n.runing ? (!n.pending.length && n._getStats().numOfQueue && n._prepareNextFile(), t = n.pending.shift(), u = function(t) {
                    return t ? (i = o(t, r.chunked ? r.chunkSize: 0), n.stack.push(i), i.shift()) : null
                },
                e(t)) ? (f = t.file, t = t[t.pipe ? "pipe": "then"](u), t.file = f, t) : u(t) : void 0
            },
            _prepareNextFile: function() {
                var t = this,
                n = t.request("fetch-file"),
                r = t.pending,
                i;
                n && (i = t.request("before-send-file", n,
                function() {
                    return n.getStatus() === u.PROGRESS || n.getStatus() === u.INTERRUPT ? n: t._finishFile(n)
                }), t.owner.trigger("uploadStart", n), n.setStatus(u.PROGRESS), i.file = n, i.done(function() {
                    var t = f.inArray(i, r);~t && r.splice(t, 1, n)
                }), i.fail(function(i) {
                    n.setStatus(u.ERROR, i);
                    t.owner.trigger("uploadError", n, i);
                    t.owner.trigger("uploadComplete", n)
                }), r.push(i))
            },
            _popBlock: function(n) {
                var t = f.inArray(n, this.pool);
                this.pool.splice(t, 1);
                n.file.remaning--;
                this.remaning--
            },
            _startSend: function(t) {
                var i = this,
                r = t.file,
                f;
                if (r.getStatus() !== u.PROGRESS) {
                    r.getStatus() === u.INTERRUPT && i._putback(t);
                    return
                }
                i.pool.push(t);
                i.remaning++;
                t.blob = t.chunks === 1 ? r.source: r.source.slice(t.start, t.end);
                f = i.request("before-send", t,
                function() {
                    r.getStatus() === u.PROGRESS ? i._doSend(t) : (i._popBlock(t), n.nextTick(i.__tick))
                });
                f.fail(function() {
                    r.remaning === 1 ? i._finishFile(r).always(function() {
                        t.percentage = 1;
                        i._popBlock(t);
                        i.owner.trigger("uploadComplete", r);
                        n.nextTick(i.__tick)
                    }) : (t.percentage = 1, i.updateFileProgress(r), i._popBlock(t), n.nextTick(i.__tick))
                })
            },
            _doSend: function(t) {
                var o = this,
                c = o.owner,
                s = o.options,
                e = t.file,
                i = new r(s),
                h = f.extend({},
                s.formData),
                v = f.extend({},
                s.headers),
                a,
                l;
                t.transport = i;
                i.on("destroy",
                function() {
                    delete t.transport;
                    o._popBlock(t);
                    n.nextTick(o.__tick)
                });
                i.on("progress",
                function(n) {
                    t.percentage = n;
                    o.updateFileProgress(e)
                });
                a = function(n) {
                    var r;
                    return l = i.getResponseAsJson() || {},
                    l._raw = i.getResponse(),
                    r = function(t) {
                        n = t
                    },
                    c.trigger("uploadAccept", t, l, r) || (n = n || "server"),
                    n
                };
                i.on("error",
                function(n, r) {
                    t.retried = t.retried || 0;
                    t.chunks > 1 && ~"http,abort".indexOf(n) && t.retried < s.chunkRetry ? (t.retried++, i.send()) : (r || n !== "server" || (n = a(n)), e.setStatus(u.ERROR, n), c.trigger("uploadError", e, n), c.trigger("uploadComplete", e))
                });
                i.on("load",
                function() {
                    var n;
                    if (n = a()) {
                        i.trigger("error", n, !0);
                        return
                    }
                    e.remaning === 1 ? o._finishFile(e, l) : i.destroy()
                });
                h = f.extend(h, {
                    id: e.id,
                    name: e.name,
                    type: e.type,
                    lastModifiedDate: e.lastModifiedDate,
                    size: e.size
                });
                t.chunks > 1 && f.extend(h, {
                    chunks: t.chunks,
                    chunk: t.chunk
                });
                c.trigger("uploadBeforeSend", t, h, v);
                i.appendBlob(s.fileVal, t.blob, e.name);
                i.append(h);
                i.setRequestHeader(v);
                i.send()
            },
            _finishFile: function(n, t, i) {
                var r = this.owner;
                return r.request("after-send-file", arguments,
                function() {
                    n.setStatus(u.COMPLETE);
                    r.trigger("uploadSuccess", n, t, i)
                }).fail(function(t) {
                    n.getStatus() === u.PROGRESS && n.setStatus(u.ERROR, t);
                    r.trigger("uploadError", n, t)
                }).always(function() {
                    r.trigger("uploadComplete", n)
                })
            },
            updateFileProgress: function(n) {
                var t = 0,
                i = 0;
                n.blocks && (f.each(n.blocks,
                function(n, t) {
                    i += (t.percentage || 0) * (t.end - t.start)
                }), t = i / n.size, this.owner.trigger("uploadProgress", n, t || 0))
            }
        })
    }),
    t("widgets/validator", ["base", "uploader", "file", "widgets/widget"],
    function(n, t, i) {
        var f = n.$,
        u = {},
        r;
        return r = {
            addValidator: function(n, t) {
                u[n] = t
            },
            removeValidator: function(n) {
                delete u[n]
            }
        },
        t.register({
            name: "validator",
            init: function() {
                var t = this;
                n.nextTick(function() {
                    f.each(u,
                    function() {
                        this.call(t.owner)
                    })
                })
            }
        }),
        r.addValidator("fileNumLimit",
        function() {
            var n = this,
            u = n.options,
            t = 0,
            i = parseInt(u.fileNumLimit, 10),
            r = !0;
            if (i) {
                n.on("beforeFileQueued",
                function(n) {
                    return t >= i && r && (r = !1, this.trigger("error", "Q_EXCEED_NUM_LIMIT", i, n), setTimeout(function() {
                        r = !0
                    },
                    1)),
                    t >= i ? !1 : !0
                });
                n.on("fileQueued",
                function() {
                    t++
                });
                n.on("fileDequeued",
                function() {
                    t--
                });
                n.on("reset",
                function() {
                    t = 0
                })
            }
        }),
        r.addValidator("fileSizeLimit",
        function() {
            var n = this,
            u = n.options,
            t = 0,
            i = parseInt(u.fileSizeLimit, 10),
            r = !0;
            if (i) {
                n.on("beforeFileQueued",
                function(n) {
                    var u = t + n.size > i;
                    return u && r && (r = !1, this.trigger("error", "Q_EXCEED_SIZE_LIMIT", i, n), setTimeout(function() {
                        r = !0
                    },
                    1)),
                    u ? !1 : !0
                });
                n.on("fileQueued",
                function(n) {
                    t += n.size
                });
                n.on("fileDequeued",
                function(n) {
                    t -= n.size
                });
                n.on("reset",
                function() {
                    t = 0
                })
            }
        }),
        r.addValidator("fileSingleSizeLimit",
        function() {
            var t = this,
            r = t.options,
            n = r.fileSingleSizeLimit;
            if (n) t.on("beforeFileQueued",
            function(t) {
                if (t.size > n) return t.setStatus(i.Status.INVALID, "exceed_size"),
                this.trigger("error", "F_EXCEED_SIZE", n, t),
                !1
            })
        }),
        r.addValidator("duplicate",
        function() {
            function r(n) {
                for (var t = 0,
                i = 0,
                u = n.length,
                r; i < u; i++) r = n.charCodeAt(i),
                t = r + (t << 6) + (t << 16) - t;
                return t
            }
            var n = this,
            i = n.options,
            t = {};
            if (!i.duplicate) {
                n.on("beforeFileQueued",
                function(n) {
                    var i = n.__hash || (n.__hash = r(n.name + n.size + n.lastModifiedDate));
                    if (t[i]) return this.trigger("error", "F_DUPLICATE", n),
                    !1
                });
                n.on("fileQueued",
                function(n) {
                    var i = n.__hash;
                    i && (t[i] = !0)
                });
                n.on("fileDequeued",
                function(n) {
                    var i = n.__hash;
                    i && delete t[i]
                });
                n.on("reset",
                function() {
                    t = {}
                })
            }
        }),
        r
    }),
    t("lib/md5", ["runtime/client", "mediator"],
    function(n, t) {
        function i() {
            n.call(this, "Md5")
        }
        return t.installTo(i.prototype),
        i.prototype.loadFromBlob = function(n) {
            var t = this;
            t.getRuid() && t.disconnectRuntime();
            t.connectRuntime(n.ruid,
            function() {
                t.exec("init");
                t.exec("loadFromBlob", n)
            })
        },
        i.prototype.getResult = function() {
            return this.exec("getResult")
        },
        i
    }),
    t("widgets/md5", ["base", "uploader", "lib/md5", "lib/blob", "widgets/widget"],
    function(n, t, i, r) {
        return t.register({
            name: "md5",
            md5File: function(t, u, f) {
                var o = new i,
                s = n.Deferred(),
                e = t instanceof r ? t: this.request("get-file", t).source;
                o.on("progress load",
                function(n) {
                    n = n || {};
                    s.notify(n.total ? n.loaded / n.total: 1)
                });
                o.on("complete",
                function() {
                    s.resolve(o.getResult())
                });
                o.on("error",
                function(n) {
                    s.reject(n)
                });
                return arguments.length > 1 && (u = u || 0, f = f || 0, u < 0 && (u = e.size + u), f < 0 && (f = e.size + f), f = Math.min(f, e.size), e = e.slice(u, f)),
                o.loadFromBlob(e),
                s.promise()
            }
        })
    }),
    t("runtime/compbase", [],
    function() {
        function n(n, t) {
            this.owner = n;
            this.options = n.options;
            this.getRuntime = function() {
                return t
            };
            this.getRuid = function() {
                return t.uid
            };
            this.trigger = function() {
                return n.trigger.apply(n, arguments)
            }
        }
        return n
    }),
    t("runtime/html5/runtime", ["base", "runtime/runtime", "runtime/compbase"],
    function(t, i, r) {
        function u() {
            var r = {},
            n = this,
            u = this.destroy;
            i.apply(n, arguments);
            n.type = e;
            n.exec = function(i, u) {
                var o = this,
                s = o.uid,
                h = t.slice(arguments, 2),
                e;
                if (f[i] && (e = r[s] = r[s] || new f[i](o, n), e[u])) return e[u].apply(e, h)
            };
            n.destroy = function() {
                return u && u.apply(this, arguments)
            }
        }
        var e = "html5",
        f = {};
        return t.inherits(i, {
            constructor: u,
            init: function() {
                var n = this;
                setTimeout(function() {
                    n.trigger("ready")
                },
                1)
            }
        }),
        u.register = function(n, i) {
            return f[n] = t.inherits(r, i)
        },
        n.Blob && n.FileReader && n.DataView && i.addRuntime(e, u),
        u
    }),
    t("runtime/html5/blob", ["runtime/html5/runtime", "lib/blob"],
    function(n, t) {
        return n.register("Blob", {
            slice: function(n, i) {
                var r = this.owner.source,
                u = r.slice || r.webkitSlice || r.mozSlice;
                return r = u.call(r, n, i),
                new t(this.getRuid(), r)
            }
        })
    }),
    t("runtime/html5/dnd", ["base", "runtime/html5/runtime", "lib/file"],
    function(n, t, i) {
        var r = n.$,
        u = "webuploader-dnd-";
        return t.register("DragAndDrop", {
            init: function() {
                var t = this.elem = this.options.container;
                this.dragEnterHandler = n.bindFn(this._dragEnterHandler, this);
                this.dragOverHandler = n.bindFn(this._dragOverHandler, this);
                this.dragLeaveHandler = n.bindFn(this._dragLeaveHandler, this);
                this.dropHandler = n.bindFn(this._dropHandler, this);
                this.dndOver = !1;
                t.on("dragenter", this.dragEnterHandler);
                t.on("dragover", this.dragOverHandler);
                t.on("dragleave", this.dragLeaveHandler);
                t.on("drop", this.dropHandler);
                if (this.options.disableGlobalDnd) {
                    r(document).on("dragover", this.dragOverHandler);
                    r(document).on("drop", this.dropHandler)
                }
            },
            _dragEnterHandler: function(n) {
                var t = this,
                r = t._denied || !1,
                i;
                return n = n.originalEvent || n,
                t.dndOver || (t.dndOver = !0, i = n.dataTransfer.items, i && i.length && (t._denied = r = !t.trigger("accept", i)), t.elem.addClass(u + "over"), t.elem[r ? "addClass": "removeClass"](u + "denied")),
                n.dataTransfer.dropEffect = r ? "none": "copy",
                !1
            },
            _dragOverHandler: function(n) {
                var t = this.elem.parent().get(0);
                return t && !r.contains(t, n.currentTarget) ? !1 : (clearTimeout(this._leaveTimer), this._dragEnterHandler.call(this, n), !1)
            },
            _dragLeaveHandler: function() {
                var n = this,
                t;
                return t = function() {
                    n.dndOver = !1;
                    n.elem.removeClass(u + "over " + u + "denied")
                },
                clearTimeout(n._leaveTimer),
                n._leaveTimer = setTimeout(t, 100),
                !1
            },
            _dropHandler: function(n) {
                var t = this,
                s = t.getRuid(),
                e = t.elem.parent().get(0),
                f,
                o;
                if (e && !r.contains(e, n.currentTarget)) return ! 1;
                n = n.originalEvent || n;
                f = n.dataTransfer;
                try {
                    o = f.getData("text/html")
                } catch(h) {}
                if (!o) return t._getTansferFiles(f,
                function(n) {
                    t.trigger("drop", r.map(n,
                    function(n) {
                        return new i(s, n)
                    }))
                }),
                t.dndOver = !1,
                t.elem.removeClass(u + "over"),
                !1
            },
            _getTansferFiles: function(t, i) {
                var f = [],
                s = [],
                r,
                e,
                h,
                o,
                u,
                c,
                l;
                for (r = t.items, e = t.files, l = !!(r && r[0].webkitGetAsEntry), u = 0, c = e.length; u < c; u++) h = e[u],
                o = r && r[u],
                l && o.webkitGetAsEntry().isDirectory ? s.push(this._traverseDirectoryTree(o.webkitGetAsEntry(), f)) : f.push(h);
                n.when.apply(n, s).done(function() {
                    f.length && i(f)
                })
            },
            _traverseDirectoryTree: function(t, i) {
                var r = n.Deferred(),
                u = this;
                return t.isFile ? t.file(function(n) {
                    i.push(n);
                    r.resolve()
                }) : t.isDirectory && t.createReader().readEntries(function(t) {
                    for (var s = t.length,
                    e = [], o = [], f = 0; f < s; f++) e.push(u._traverseDirectoryTree(t[f], o));
                    n.when.apply(n, e).then(function() {
                        i.push.apply(i, o);
                        r.resolve()
                    },
                    r.reject)
                }),
                r.promise()
            },
            destroy: function() {
                var n = this.elem;
                n && (n.off("dragenter", this.dragEnterHandler), n.off("dragover", this.dragOverHandler), n.off("dragleave", this.dragLeaveHandler), n.off("drop", this.dropHandler), this.options.disableGlobalDnd && (r(document).off("dragover", this.dragOverHandler), r(document).off("drop", this.dropHandler)))
            }
        })
    }),
    t("runtime/html5/filepaste", ["base", "runtime/html5/runtime", "lib/file"],
    function(n, t, i) {
        return t.register("FilePaste", {
            init: function() {
                var i = this.options,
                o = this.elem = i.container,
                t = ".*",
                r, u, e, f;
                if (i.accept) {
                    for (r = [], u = 0, e = i.accept.length; u < e; u++) f = i.accept[u].mimeTypes,
                    f && r.push(f);
                    r.length && (t = r.join(","), t = t.replace(/,/g, "|").replace(/\*/g, ".*"))
                }
                this.accept = t = new RegExp(t, "i");
                this.hander = n.bindFn(this._pasteHander, this);
                o.on("paste", this.hander)
            },
            _pasteHander: function(n) {
                var r = [],
                s = this.getRuid(),
                u,
                f,
                e,
                t,
                o;
                for (n = n.originalEvent || n, u = n.clipboardData.items, t = 0, o = u.length; t < o; t++)(f = u[t], f.kind === "file" && (e = f.getAsFile())) && r.push(new i(s, e));
                r.length && (n.preventDefault(), n.stopPropagation(), this.trigger("paste", r))
            },
            destroy: function() {
                this.elem.off("paste", this.hander)
            }
        })
    }),
    t("runtime/html5/filepicker", ["base", "runtime/html5/runtime"],
    function(n, t) {
        var i = n.$;
        return t.register("FilePicker", {
            init: function() {
                var s = this.getRuntime().getContainer(),
                f = this,
                h = f.owner,
                t = f.options,
                r = this.label = i(document.createElement("label")),
                n = this.input = i(document.createElement("input")),
                e,
                u,
                c,
                o;
                n.attr("type", "file");
                n.attr("name", t.name);
                n.addClass("webuploader-element-invisible");
                r.on("click",
                function() {
                    n.trigger("click")
                });
                if (r.css({
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    cursor: "pointer",
                    background: "#ffffff"
                }), t.multiple && n.attr("multiple", "multiple"), t.accept && t.accept.length > 0) {
                    for (e = [], u = 0, c = t.accept.length; u < c; u++) e.push(t.accept[u].mimeTypes);
                    n.attr("accept", e.join(","))
                }
                s.append(n);
                s.append(r);
                o = function(n) {
                    h.trigger(n.type)
                };
                n.on("change",
                function(t) {
                    var u = arguments.callee,
                    r;
                    f.files = t.target.files;
                    r = this.cloneNode(!0);
                    r.value = null;
                    this.parentNode.replaceChild(r, this);
                    n.off();
                    n = i(r).on("change", u).on("mouseenter mouseleave", o);
                    h.trigger("change")
                });
                r.on("mouseenter mouseleave", o)
            },
            getFiles: function() {
                return this.files
            },
            destroy: function() {
                this.input.off();
                this.label.off()
            }
        })
    }),
    t("runtime/html5/util", ["base"],
    function(t) {
        var i = n.createObjectURL && n || n.URL && URL.revokeObjectURL && URL || n.webkitURL,
        r = t.noop,
        u = r;
        return i && (r = function() {
            return i.createObjectURL.apply(i, arguments)
        },
        u = function() {
            return i.revokeObjectURL.apply(i, arguments)
        }),
        {
            createObjectURL: r,
            revokeObjectURL: u,
            dataURL2Blob: function(n) {
                var r, f, u, t, e, i;
                for (i = n.split(","), r = ~i[0].indexOf("base64") ? atob(i[1]) : decodeURIComponent(i[1]), u = new ArrayBuffer(r.length), f = new Uint8Array(u), t = 0; t < r.length; t++) f[t] = r.charCodeAt(t);
                return e = i[0].split(":")[1].split(";")[0],
                this.arrayBufferToBlob(u, e)
            },
            dataURL2ArrayBuffer: function(n) {
                var i, u, t, r;
                for (r = n.split(","), i = ~r[0].indexOf("base64") ? atob(r[1]) : decodeURIComponent(r[1]), u = new Uint8Array(i.length), t = 0; t < i.length; t++) u[t] = i.charCodeAt(t);
                return u.buffer
            },
            arrayBufferToBlob: function(t, i) {
                var u = n.BlobBuilder || n.WebKitBlobBuilder,
                r;
                return u ? (r = new u, r.append(t), r.getBlob(i)) : new Blob([t], i ? {
                    type: i
                }: {})
            },
            canvasToDataUrl: function(n, t, i) {
                return n.toDataURL(t, i / 100)
            },
            parseMeta: function(n, t) {
                t(!1, {})
            },
            updateImageHead: function(n) {
                return n
            }
        }
    }),
    t("runtime/html5/imagemeta", ["runtime/html5/util"],
    function(n) {
        var t;
        return t = {
            parsers: {
                65505 : []
            },
            maxMetaDataSize: 262144,
            parse: function(n, t) {
                var r = this,
                i = new FileReader;
                i.onload = function() {
                    t(!1, r._parse(this.result));
                    i = i.onload = i.onerror = null
                };
                i.onerror = function(n) {
                    t(n.message);
                    i = i.onload = i.onerror = null
                };
                n = n.slice(0, r.maxMetaDataSize);
                i.readAsArrayBuffer(n.getSource())
            },
            _parse: function(n, i) {
                if (! (n.byteLength < 6)) {
                    var u = new DataView(n),
                    r = 2,
                    l = u.byteLength - 4,
                    e = r,
                    c = {},
                    f,
                    o,
                    s,
                    h;
                    if (u.getUint16(0) === 65496) {
                        while (r < l) if (f = u.getUint16(r), f >= 65504 && f <= 65519 || f === 65534) {
                            if (o = u.getUint16(r + 2) + 2, r + o > u.byteLength) break;
                            if (s = t.parsers[f], !i && s) for (h = 0; h < s.length; h += 1) s[h].call(t, u, r, o, c);
                            r += o;
                            e = r
                        } else break;
                        e > 6 && (c.imageHead = n.slice ? n.slice(2, e) : new Uint8Array(n).subarray(2, e))
                    }
                    return c
                }
            },
            updateImageHead: function(n, t) {
                var f = this._parse(n, !0),
                i,
                u,
                r;
                return r = 2,
                f.imageHead && (r = 2 + f.imageHead.byteLength),
                u = n.slice ? n.slice(r) : new Uint8Array(n).subarray(r),
                i = new Uint8Array(t.byteLength + 2 + u.byteLength),
                i[0] = 255,
                i[1] = 216,
                i.set(new Uint8Array(t), 2),
                i.set(new Uint8Array(u), t.byteLength + 2),
                i.buffer
            }
        },
        n.parseMeta = function() {
            return t.parse.apply(t, arguments)
        },
        n.updateImageHead = function() {
            return t.updateImageHead.apply(t, arguments)
        },
        t
    }),
    t("runtime/html5/imagemeta/exif", ["base", "runtime/html5/imagemeta"],
    function(n, t) {
        var i = {};
        return i.ExifMap = function() {
            return this
        },
        i.ExifMap.prototype.map = {
            Orientation: 274
        },
        i.ExifMap.prototype.get = function(n) {
            return this[n] || this[this.map[n]]
        },
        i.exifTagTypes = {
            1 : {
                getValue: function(n, t) {
                    return n.getUint8(t)
                },
                size: 1
            },
            2 : {
                getValue: function(n, t) {
                    return String.fromCharCode(n.getUint8(t))
                },
                size: 1,
                ascii: !0
            },
            3 : {
                getValue: function(n, t, i) {
                    return n.getUint16(t, i)
                },
                size: 2
            },
            4 : {
                getValue: function(n, t, i) {
                    return n.getUint32(t, i)
                },
                size: 4
            },
            5 : {
                getValue: function(n, t, i) {
                    return n.getUint32(t, i) / n.getUint32(t + 4, i)
                },
                size: 8
            },
            9 : {
                getValue: function(n, t, i) {
                    return n.getInt32(t, i)
                },
                size: 4
            },
            10 : {
                getValue: function(n, t, i) {
                    return n.getInt32(t, i) / n.getInt32(t + 4, i)
                },
                size: 8
            }
        },
        i.exifTagTypes[7] = i.exifTagTypes[1],
        i.getExifValue = function(t, r, u, f, e, o) {
            var h = i.exifTagTypes[f],
            a,
            l,
            c,
            s,
            v,
            y;
            if (!h) {
                n.log("Invalid Exif data: Invalid tag type.");
                return
            }
            if (a = h.size * e, l = a > 4 ? r + t.getUint32(u + 8, o) : u + 8, l + a > t.byteLength) {
                n.log("Invalid Exif data: Invalid data offset.");
                return
            }
            if (e === 1) return h.getValue(t, l, o);
            for (c = [], s = 0; s < e; s += 1) c[s] = h.getValue(t, l + s * h.size, o);
            if (h.ascii) {
                for (v = "", s = 0; s < c.length; s += 1) {
                    if (y = c[s], y === "\x00") break;
                    v += y
                }
                return v
            }
            return c
        },
        i.parseExifTag = function(n, t, r, u, f) {
            var e = n.getUint16(r, u);
            f.exif[e] = i.getExifValue(n, t, r, n.getUint16(r + 2, u), n.getUint32(r + 4, u), u)
        },
        i.parseExifTags = function(t, i, r, u, f) {
            var o, s, e;
            if (r + 6 > t.byteLength) {
                n.log("Invalid Exif data: Invalid directory offset.");
                return
            }
            if (o = t.getUint16(r, u), s = r + 2 + 12 * o, s + 4 > t.byteLength) {
                n.log("Invalid Exif data: Invalid directory size.");
                return
            }
            for (e = 0; e < o; e += 1) this.parseExifTag(t, i, r + 2 + 12 * e, u, f);
            return t.getUint32(s, u)
        },
        i.parseExifData = function(t, r, u, f) {
            var e = r + 10,
            o, s;
            if (t.getUint32(r + 4) === 1165519206) {
                if (e + 8 > t.byteLength) {
                    n.log("Invalid Exif data: Invalid segment size.");
                    return
                }
                if (t.getUint16(r + 8) !== 0) {
                    n.log("Invalid Exif data: Missing byte alignment offset.");
                    return
                }
                switch (t.getUint16(e)) {
                case 18761:
                    o = !0;
                    break;
                case 19789:
                    o = !1;
                    break;
                default:
                    n.log("Invalid Exif data: Invalid byte alignment marker.");
                    return
                }
                if (t.getUint16(e + 2, o) !== 42) {
                    n.log("Invalid Exif data: Missing TIFF marker.");
                    return
                }
                s = t.getUint32(e + 4, o);
                f.exif = new i.ExifMap;
                s = i.parseExifTags(t, e, e + s, o, f)
            }
        },
        t.parsers[65505].push(i.parseExifData),
        i
    }),
    t("runtime/html5/jpegencoder", [],
    function() {
        function n(n) {
            function bt(n) {
                for (var l = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], t, c, f, i, e, r, o, s, u = 0; u < 64; u++) t = d((l[u] * n + 50) / 100),
                t < 1 ? t = 1 : t > 255 && (t = 255),
                v[h[u]] = t;
                for (c = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], f = 0; f < 64; f++) i = d((c[f] * n + 50) / 100),
                i < 1 ? i = 1 : i > 255 && (i = 255),
                y[h[f]] = i;
                for (e = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], r = 0, o = 0; o < 8; o++) for (s = 0; s < 8; s++) g[r] = 1 / (v[h[r]] * e[o] * e[s] * 8),
                p[r] = 1 / (y[h[r]] * e[o] * e[s] * 8),
                r++
            }
            function a(n, t) {
                for (var f = 0,
                r = 0,
                u = [], e, i = 1; i <= 16; i++) {
                    for (e = 1; e <= n[i]; e++) u[t[r]] = [],
                    u[t[r]][0] = f,
                    u[t[r]][1] = i,
                    r++,
                    f++;
                    f *= 2
                }
                return u
            }
            function kt() {
                nt = a(st, ht);
                w = a(at, vt);
                tt = a(ct, lt);
                b = a(yt, pt)
            }
            function dt() {
                for (var u = 1,
                r = 2,
                n, t, i = 1; i <= 15; i++) {
                    for (n = u; n < r; n++) c[32767 + n] = i,
                    e[32767 + n] = [],
                    e[32767 + n][1] = i,
                    e[32767 + n][0] = n;
                    for (t = -(r - 1); t <= -u; t++) c[32767 + t] = i,
                    e[32767 + t] = [],
                    e[32767 + t][1] = i,
                    e[32767 + t][0] = r - 1 + t;
                    u <<= 1;
                    r <<= 1
                }
            }
            function gt() {
                for (var n = 0; n < 256; n++) i[n] = 19595 * n,
                i[n + 256 >> 0] = 38470 * n,
                i[n + 512 >> 0] = 7471 * n + 32768,
                i[n + 768 >> 0] = -11059 * n,
                i[n + 1024 >> 0] = -21709 * n,
                i[n + 1280 >> 0] = 32768 * n + 8421375,
                i[n + 1536 >> 0] = -27439 * n,
                i[n + 1792 >> 0] = -5329 * n
            }
            function f(n) {
                for (var r = n[0], i = n[1] - 1; i >= 0;) r & 1 << i && (s |= 1 << u),
                i--,
                u--,
                u < 0 && (s == 255 ? (t(255), t(0)) : t(s), u = 7, s = 0)
            }
            function t(n) {
                l.push(et[n])
            }
            function r(n) {
                t(n >> 8 & 255);
                t(n & 255)
            }
            function ni(n, t) {
                for (var u, f, e, o, s, h, c, l, i = 0,
                ft = 8,
                nt, ut, k, r = 0; r < ft; ++r) {
                    u = n[i];
                    f = n[i + 1];
                    e = n[i + 2];
                    o = n[i + 3];
                    s = n[i + 4];
                    h = n[i + 5];
                    c = n[i + 6];
                    l = n[i + 7];
                    var et = u + l,
                    d = u - l,
                    ot = f + c,
                    st = f - c,
                    ht = e + h,
                    ct = e - h,
                    lt = o + s,
                    hi = o - s,
                    a = et + lt,
                    g = et - lt,
                    y = ot + ht,
                    p = ot - ht;
                    n[i] = a + y;
                    n[i + 4] = a - y;
                    nt = (p + g) * .707106781;
                    n[i + 2] = g + nt;
                    n[i + 6] = g - nt;
                    a = hi + ct;
                    y = ct + st;
                    p = st + d;
                    var at = (a - p) * .382683433,
                    vt = .5411961 * a + at,
                    yt = 1.306562965 * p + at,
                    pt = y * .707106781,
                    wt = d + pt,
                    bt = d - pt;
                    n[i + 5] = bt + vt;
                    n[i + 3] = bt - vt;
                    n[i + 1] = wt + yt;
                    n[i + 7] = wt - yt;
                    i += 8
                }
                for (i = 0, r = 0; r < ft; ++r) {
                    u = n[i];
                    f = n[i + 8];
                    e = n[i + 16];
                    o = n[i + 24];
                    s = n[i + 32];
                    h = n[i + 40];
                    c = n[i + 48];
                    l = n[i + 56];
                    var kt = u + l,
                    tt = u - l,
                    dt = f + c,
                    gt = f - c,
                    ni = e + h,
                    ti = e - h,
                    ii = o + s,
                    ci = o - s,
                    v = kt + ii,
                    rt = kt - ii,
                    w = dt + ni,
                    b = dt - ni;
                    n[i] = v + w;
                    n[i + 32] = v - w;
                    ut = (b + rt) * .707106781;
                    n[i + 16] = rt + ut;
                    n[i + 48] = rt - ut;
                    v = ci + ti;
                    w = ti + gt;
                    b = gt + tt;
                    var ri = (v - b) * .382683433,
                    ui = .5411961 * v + ri,
                    fi = 1.306562965 * b + ri,
                    ei = w * .707106781,
                    oi = tt + ei,
                    si = tt - ei;
                    n[i + 40] = si + ui;
                    n[i + 24] = si - ui;
                    n[i + 8] = oi + fi;
                    n[i + 56] = oi - fi;
                    i++
                }
                for (r = 0; r < 64; ++r) k = n[r] * t[r],
                it[r] = k > 0 ? k + .5 | 0 : k - .5 | 0;
                return it
            }
            function ti() {
                r(65504);
                r(16);
                t(74);
                t(70);
                t(73);
                t(70);
                t(0);
                t(1);
                t(1);
                t(0);
                r(1);
                r(1);
                t(0);
                t(0)
            }
            function ii(n, i) {
                r(65472);
                r(17);
                t(8);
                r(i);
                r(n);
                t(3);
                t(1);
                t(17);
                t(0);
                t(2);
                t(17);
                t(1);
                t(3);
                t(17);
                t(1)
            }
            function ri() {
                var n, i;
                for (r(65499), r(132), t(0), n = 0; n < 64; n++) t(v[n]);
                for (t(1), i = 0; i < 64; i++) t(y[i])
            }
            function ui() {
                var n, i, u, f, e, o, s, h;
                for (r(65476), r(418), t(0), n = 0; n < 16; n++) t(st[n + 1]);
                for (i = 0; i <= 11; i++) t(ht[i]);
                for (t(16), u = 0; u < 16; u++) t(ct[u + 1]);
                for (f = 0; f <= 161; f++) t(lt[f]);
                for (t(1), e = 0; e < 16; e++) t(at[e + 1]);
                for (o = 0; o <= 11; o++) t(vt[o]);
                for (t(17), s = 0; s < 16; s++) t(yt[s + 1]);
                for (h = 0; h <= 161; h++) t(pt[h])
            }
            function fi() {
                r(65498);
                r(12);
                t(3);
                t(1);
                t(0);
                t(2);
                t(17);
                t(3);
                t(17);
                t(0);
                t(63);
                t(0)
            }
            function k(n, t, i, r, u) {
                for (var b = u[0], g = u[240], a, nt = ni(n, t), p, l, s, k, d, v, w, y = 0; y < 64; ++y) o[h[y]] = nt[y];
                for (p = o[0] - i, i = o[0], p == 0 ? f(r[0]) : (a = 32767 + p, f(r[c[a]]), f(e[a])), l = 63; l > 0 && o[l] == 0; l--);
                if (l == 0) return f(b),
                i;
                for (s = 1; s <= l;) {
                    for (d = s; o[s] == 0 && s <= l; ++s);
                    if (v = s - d, v >= 16) {
                        for (k = v >> 4, w = 1; w <= k; ++w) f(g);
                        v = v & 15
                    }
                    a = 32767 + o[s];
                    f(u[(v << 4) + c[a]]);
                    f(e[a]);
                    s++
                }
                return l != 63 && f(b),
                i
            }
            function ei() {
                for (var t = String.fromCharCode,
                n = 0; n < 256; n++) et[n] = t(n)
            }
            function wt(n) {
                if (n <= 0 && (n = 1), n > 100 && (n = 100), ot != n) {
                    var t = 0;
                    t = n < 50 ? Math.floor(5e3 / n) : Math.floor(200 - n * 2);
                    bt(t);
                    ot = n
                }
            }
            function oi() {
                n || (n = 50);
                ei();
                kt();
                dt();
                gt();
                wt(n)
            }
            var si = this,
            hi = Math.round,
            d = Math.floor,
            v = new Array(64),
            y = new Array(64),
            g = new Array(64),
            p = new Array(64),
            nt,
            w,
            tt,
            b,
            e = new Array(65535),
            c = new Array(65535),
            it = new Array(64),
            o = new Array(64),
            l = [],
            s = 0,
            u = 7,
            rt = new Array(64),
            ut = new Array(64),
            ft = new Array(64),
            et = new Array(256),
            i = new Array(2048),
            ot,
            h = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
            st = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            ht = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ct = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
            lt = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
            at = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            vt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            yt = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
            pt = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
            this.encode = function(n, t) {
                var ot, pt;
                t && wt(t);
                l = [];
                s = 0;
                u = 7;
                r(65496);
                ti();
                ri();
                ii(n.width, n.height);
                ui();
                fi();
                var lt = 0,
                at = 0,
                vt = 0;
                s = 0;
                u = 7;
                this.encode.displayName = "_encode_";
                for (var st = n.data,
                yt = n.width,
                ht = n.height,
                h = yt * 4,
                bt = yt * 3,
                c, a = 0,
                d, it, et, ct, o, v, y, e; a < ht;) {
                    for (c = 0; c < h;) {
                        for (ct = h * a + c, o = ct, v = -1, y = 0, e = 0; e < 64; e++) y = e >> 3,
                        v = (e & 7) * 4,
                        o = ct + y * h + v,
                        a + y >= ht && (o -= h * (a + 1 + y - ht)),
                        c + v >= h && (o -= c + v - h + 4),
                        d = st[o++],
                        it = st[o++],
                        et = st[o++],
                        rt[e] = (i[d] + i[it + 256 >> 0] + i[et + 512 >> 0] >> 16) - 128,
                        ut[e] = (i[d + 768 >> 0] + i[it + 1024 >> 0] + i[et + 1280 >> 0] >> 16) - 128,
                        ft[e] = (i[d + 1280 >> 0] + i[it + 1536 >> 0] + i[et + 1792 >> 0] >> 16) - 128;
                        lt = k(rt, g, lt, nt, tt);
                        at = k(ut, p, at, w, b);
                        vt = k(ft, p, vt, w, b);
                        c += 32
                    }
                    a += 8
                }
                return u >= 0 && (ot = [], ot[1] = u + 1, ot[0] = (1 << u + 1) - 1, f(ot)),
                r(65497),
                pt = "data:image/jpeg;base64," + btoa(l.join("")),
                l = [],
                pt
            };
            oi()
        }
        return n.encode = function(t, i) {
            var r = new n(i);
            return r.encode(t)
        },
        n
    }),
    t("runtime/html5/androidpatch", ["runtime/html5/util", "runtime/html5/jpegencoder", "base"],
    function(n, t, i) {
        var r = n.canvasToDataUrl,
        u;
        n.canvasToDataUrl = function(n, f, e) {
            var h, c, l, o, s;
            return i.os.android ? (f === "image/jpeg" && typeof u == "undefined" && (o = r.apply(null, arguments), s = o.split(","), o = ~s[0].indexOf("base64") ? atob(s[1]) : decodeURIComponent(s[1]), o = o.substring(0, 2), u = o.charCodeAt(0) === 255 && o.charCodeAt(1) === 216), f === "image/jpeg" && !u) ? (c = n.width, l = n.height, h = n.getContext("2d"), t.encode(h.getImageData(0, 0, c, l), e)) : r.apply(null, arguments) : r.apply(null, arguments)
        }
    }),
    t("runtime/html5/image", ["base", "runtime/html5/runtime", "runtime/html5/util"],
    function(n, t, i) {
        var r = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
        return t.register("Image", {
            modified: !1,
            init: function() {
                var n = this,
                t = new Image;
                t.onload = function() {
                    n._info = {
                        type: n.type,
                        width: this.width,
                        height: this.height
                    };
                    n._metas || "image/jpeg" !== n.type ? n.owner.trigger("load") : i.parseMeta(n._blob,
                    function(t, i) {
                        n._metas = i;
                        n.owner.trigger("load")
                    })
                };
                t.onerror = function() {
                    n.owner.trigger("error")
                };
                n._img = t
            },
            loadFromBlob: function(n) {
                var t = this,
                r = t._img;
                t._blob = n;
                t.type = n.type;
                r.src = i.createObjectURL(n.getSource());
                t.owner.once("load",
                function() {
                    i.revokeObjectURL(r.src)
                })
            },
            resize: function(n, t) {
                var i = this._canvas || (this._canvas = document.createElement("canvas"));
                this._resize(this._img, i, n, t);
                this._blob = null;
                this.modified = !0;
                this.owner.trigger("complete", "resize")
            },
            crop: function(n, t, i, r, u) {
                var f = this._canvas || (this._canvas = document.createElement("canvas")),
                o = this.options,
                e = this._img,
                s = e.naturalWidth,
                h = e.naturalHeight,
                c = this.getOrientation();
                u = u || 1;
                f.width = i;
                f.height = r;
                o.preserveHeaders || this._rotate2Orientaion(f, c);
                this._renderImageToCanvas(f, e, -n, -t, s * u, h * u);
                this._blob = null;
                this.modified = !0;
                this.owner.trigger("complete", "crop")
            },
            getAsBlob: function(n) {
                var t = this._blob,
                u = this.options,
                r;
                if (n = n || this.type, this.modified || this.type !== n) {
                    if (r = this._canvas, n === "image/jpeg") {
                        if (t = i.canvasToDataUrl(r, n, u.quality), u.preserveHeaders && this._metas && this._metas.imageHead) return t = i.dataURL2ArrayBuffer(t),
                        t = i.updateImageHead(t, this._metas.imageHead),
                        i.arrayBufferToBlob(t, n)
                    } else t = i.canvasToDataUrl(r, n);
                    t = i.dataURL2Blob(t)
                }
                return t
            },
            getAsDataUrl: function(n) {
                var t = this.options;
                return n = n || this.type,
                n === "image/jpeg" ? i.canvasToDataUrl(this._canvas, n, t.quality) : this._canvas.toDataURL(n)
            },
            getOrientation: function() {
                return this._metas && this._metas.exif && this._metas.exif.get("Orientation") || 1
            },
            info: function(n) {
                return n ? (this._info = n, this) : this._info
            },
            meta: function(n) {
                return n ? (this._meta = n, this) : this._meta
            },
            destroy: function() {
                var n = this._canvas;
                this._img.onload = null;
                n && (n.getContext("2d").clearRect(0, 0, n.width, n.height), n.width = n.height = 0, this._canvas = null);
                this._img.src = r;
                this._img = this._blob = null
            },
            _resize: function(n, t, i, r) {
                var f = this.options,
                s = n.width,
                h = n.height,
                c = this.getOrientation(),
                u,
                e,
                o,
                l,
                a;~ [5, 6, 7, 8].indexOf(c) && (i ^= r, r ^= i, i ^= r);
                u = Math[f.crop ? "max": "min"](i / s, r / h);
                f.allowMagnify || (u = Math.min(1, u));
                e = s * u;
                o = h * u;
                f.crop ? (t.width = i, t.height = r) : (t.width = e, t.height = o);
                l = (t.width - e) / 2;
                a = (t.height - o) / 2;
                f.preserveHeaders || this._rotate2Orientaion(t, c);
                this._renderImageToCanvas(t, n, l, a, e, o)
            },
            _rotate2Orientaion: function(n, t) {
                var r = n.width,
                u = n.height,
                i = n.getContext("2d");
                switch (t) {
                case 5:
                case 6:
                case 7:
                case 8:
                    n.width = u;
                    n.height = r
                }
                switch (t) {
                case 2:
                    i.translate(r, 0);
                    i.scale( - 1, 1);
                    break;
                case 3:
                    i.translate(r, u);
                    i.rotate(Math.PI);
                    break;
                case 4:
                    i.translate(0, u);
                    i.scale(1, -1);
                    break;
                case 5:
                    i.rotate(.5 * Math.PI);
                    i.scale(1, -1);
                    break;
                case 6:
                    i.rotate(.5 * Math.PI);
                    i.translate(0, -u);
                    break;
                case 7:
                    i.rotate(.5 * Math.PI);
                    i.translate(r, -u);
                    i.scale( - 1, 1);
                    break;
                case 8:
                    i.rotate( - .5 * Math.PI);
                    i.translate( - r, 0)
                }
            },
            _renderImageToCanvas: function() {
                function t(n, t, i) {
                    var u = document.createElement("canvas"),
                    o = u.getContext("2d"),
                    f = 0,
                    s = i,
                    r = i,
                    h,
                    c,
                    e;
                    for (u.width = 1, u.height = i, o.drawImage(n, 0, 0), h = o.getImageData(0, 0, 1, i).data; r > f;) c = h[(r - 1) * 4 + 3],
                    c === 0 ? s = r: f = r,
                    r = s + f >> 1;
                    return e = r / i,
                    e === 0 ? 1 : e
                }
                function i(n) {
                    var r = n.naturalWidth,
                    u = n.naturalHeight,
                    t, i;
                    return r * u > 1048576 ? (t = document.createElement("canvas"), t.width = t.height = 1, i = t.getContext("2d"), i.drawImage(n, -r + 1, 0), i.getImageData(0, 0, 1, 1).data[3] === 0) : !1
                }
                return n.os.ios ? n.os.ios >= 7 ?
                function(n, i, r, u, f, e) {
                    var o = i.naturalWidth,
                    s = i.naturalHeight,
                    h = t(i, o, s);
                    return n.getContext("2d").drawImage(i, 0, 0, o * h, s * h, r, u, f, e)
                }: function(n, r, u, f, e, o) {
                    var c = r.naturalWidth,
                    l = r.naturalHeight,
                    y = n.getContext("2d"),
                    nt = i(r),
                    tt = this.type === "image/jpeg",
                    s = 1024,
                    p = 0,
                    d = 0,
                    h,
                    a,
                    g,
                    w,
                    b,
                    v,
                    k;
                    for (nt && (c /= 2, l /= 2), y.save(), h = document.createElement("canvas"), h.width = h.height = s, a = h.getContext("2d"), g = tt ? t(r, c, l) : 1, w = Math.ceil(s * e / c), b = Math.ceil(s * o / l / g); p < l;) {
                        for (v = 0, k = 0; v < c;) a.clearRect(0, 0, s, s),
                        a.drawImage(r, -v, -p),
                        y.drawImage(h, 0, 0, s, s, u + k, f + d, w, b),
                        v += s,
                        k += w;
                        p += s;
                        d += b
                    }
                    y.restore();
                    h = a = null
                }: function(t) {
                    var r = n.slice(arguments, 1),
                    i = t.getContext("2d");
                    i.drawImage.apply(i, r)
                }
            } ()
        })
    }),
    t("runtime/html5/transport", ["base", "runtime/html5/runtime"],
    function(n, t) {
        var i = n.noop,
        r = n.$;
        return t.register("Transport", {
            init: function() {
                this._status = 0;
                this._response = null
            },
            send: function() {
                var f = this.owner,
                i = this.options,
                t = this._initAjax(),
                h = f._blob,
                e = i.server,
                o,
                s,
                u;
                i.sendAsBinary ? (e += (/\?/.test(e) ? "&": "?") + r.param(f._formData), s = h.getSource()) : (o = new FormData, r.each(f._formData,
                function(n, t) {
                    o.append(n, t)
                }), o.append(i.fileVal, h.getSource(), i.filename || f._formData.name || ""));
                i.withCredentials && "withCredentials" in t ? (t.open(i.method, e, !0), t.withCredentials = !0) : t.open(i.method, e);
                this._setRequestHeader(t, i.headers);
                s ? (t.overrideMimeType && t.overrideMimeType("application/octet-stream"), n.os.android ? (u = new FileReader, u.onload = function() {
                    t.send(this.result);
                    u = u.onload = null
                },
                u.readAsArrayBuffer(s)) : t.send(s)) : t.send(o)
            },
            getResponse: function() {
                return this._response
            },
            getResponseAsJson: function() {
                return this._parseJson(this._response)
            },
            getStatus: function() {
                return this._status
            },
            abort: function() {
                var n = this._xhr;
                n && (n.upload.onprogress = i, n.onreadystatechange = i, n.abort(), this._xhr = n = null)
            },
            destroy: function() {
                this.abort()
            },
            _initAjax: function() {
                var t = this,
                n = new XMLHttpRequest,
                r = this.options;
                return ! r.withCredentials || "withCredentials" in n || typeof XDomainRequest == "undefined" || (n = new XDomainRequest),
                n.upload.onprogress = function(n) {
                    var i = 0;
                    return n.lengthComputable && (i = n.loaded / n.total),
                    t.trigger("progress", i)
                },
                n.onreadystatechange = function() {
                    if (n.readyState === 4) return (n.upload.onprogress = i, n.onreadystatechange = i, t._xhr = null, t._status = n.status, n.status >= 200 && n.status < 300) ? (t._response = n.responseText, t.trigger("load")) : n.status >= 500 && n.status < 600 ? (t._response = n.responseText, t.trigger("error", "server")) : t.trigger("error", t._status ? "http": "abort")
                },
                t._xhr = n,
                n
            },
            _setRequestHeader: function(n, t) {
                r.each(t,
                function(t, i) {
                    n.setRequestHeader(t, i)
                })
            },
            _parseJson: function(n) {
                var t;
                try {
                    t = JSON.parse(n)
                } catch(i) {
                    t = {}
                }
                return t
            }
        })
    }),
    t("runtime/html5/md5", ["runtime/html5/runtime"],
    function(n) {
        var o = function(n, t) {
            return n + t & 4294967295
        },
        h = function(n, t, i, r, u, f) {
            return t = o(o(t, n), o(r, f)),
            o(t << u | t >>> 32 - u, i)
        },
        i = function(n, t, i, r, u, f, e) {
            return h(t & i | ~t & r, n, t, u, f, e)
        },
        r = function(n, t, i, r, u, f, e) {
            return h(t & r | i & ~r, n, t, u, f, e)
        },
        u = function(n, t, i, r, u, f, e) {
            return h(t ^ i ^ r, n, t, u, f, e)
        },
        f = function(n, t, i, r, u, f, e) {
            return h(i ^ (t | ~r), n, t, u, f, e)
        },
        e = function(n, t) {
            var e = n[0],
            s = n[1],
            h = n[2],
            c = n[3];
            e = i(e, s, h, c, t[0], 7, -680876936);
            c = i(c, e, s, h, t[1], 12, -389564586);
            h = i(h, c, e, s, t[2], 17, 606105819);
            s = i(s, h, c, e, t[3], 22, -1044525330);
            e = i(e, s, h, c, t[4], 7, -176418897);
            c = i(c, e, s, h, t[5], 12, 1200080426);
            h = i(h, c, e, s, t[6], 17, -1473231341);
            s = i(s, h, c, e, t[7], 22, -45705983);
            e = i(e, s, h, c, t[8], 7, 1770035416);
            c = i(c, e, s, h, t[9], 12, -1958414417);
            h = i(h, c, e, s, t[10], 17, -42063);
            s = i(s, h, c, e, t[11], 22, -1990404162);
            e = i(e, s, h, c, t[12], 7, 1804603682);
            c = i(c, e, s, h, t[13], 12, -40341101);
            h = i(h, c, e, s, t[14], 17, -1502002290);
            s = i(s, h, c, e, t[15], 22, 1236535329);
            e = r(e, s, h, c, t[1], 5, -165796510);
            c = r(c, e, s, h, t[6], 9, -1069501632);
            h = r(h, c, e, s, t[11], 14, 643717713);
            s = r(s, h, c, e, t[0], 20, -373897302);
            e = r(e, s, h, c, t[5], 5, -701558691);
            c = r(c, e, s, h, t[10], 9, 38016083);
            h = r(h, c, e, s, t[15], 14, -660478335);
            s = r(s, h, c, e, t[4], 20, -405537848);
            e = r(e, s, h, c, t[9], 5, 568446438);
            c = r(c, e, s, h, t[14], 9, -1019803690);
            h = r(h, c, e, s, t[3], 14, -187363961);
            s = r(s, h, c, e, t[8], 20, 1163531501);
            e = r(e, s, h, c, t[13], 5, -1444681467);
            c = r(c, e, s, h, t[2], 9, -51403784);
            h = r(h, c, e, s, t[7], 14, 1735328473);
            s = r(s, h, c, e, t[12], 20, -1926607734);
            e = u(e, s, h, c, t[5], 4, -378558);
            c = u(c, e, s, h, t[8], 11, -2022574463);
            h = u(h, c, e, s, t[11], 16, 1839030562);
            s = u(s, h, c, e, t[14], 23, -35309556);
            e = u(e, s, h, c, t[1], 4, -1530992060);
            c = u(c, e, s, h, t[4], 11, 1272893353);
            h = u(h, c, e, s, t[7], 16, -155497632);
            s = u(s, h, c, e, t[10], 23, -1094730640);
            e = u(e, s, h, c, t[13], 4, 681279174);
            c = u(c, e, s, h, t[0], 11, -358537222);
            h = u(h, c, e, s, t[3], 16, -722521979);
            s = u(s, h, c, e, t[6], 23, 76029189);
            e = u(e, s, h, c, t[9], 4, -640364487);
            c = u(c, e, s, h, t[12], 11, -421815835);
            h = u(h, c, e, s, t[15], 16, 530742520);
            s = u(s, h, c, e, t[2], 23, -995338651);
            e = f(e, s, h, c, t[0], 6, -198630844);
            c = f(c, e, s, h, t[7], 10, 1126891415);
            h = f(h, c, e, s, t[14], 15, -1416354905);
            s = f(s, h, c, e, t[5], 21, -57434055);
            e = f(e, s, h, c, t[12], 6, 1700485571);
            c = f(c, e, s, h, t[3], 10, -1894986606);
            h = f(h, c, e, s, t[10], 15, -1051523);
            s = f(s, h, c, e, t[1], 21, -2054922799);
            e = f(e, s, h, c, t[8], 6, 1873313359);
            c = f(c, e, s, h, t[15], 10, -30611744);
            h = f(h, c, e, s, t[6], 15, -1560198380);
            s = f(s, h, c, e, t[13], 21, 1309151649);
            e = f(e, s, h, c, t[4], 6, -145523070);
            c = f(c, e, s, h, t[11], 10, -1120210379);
            h = f(h, c, e, s, t[2], 15, 718787259);
            s = f(s, h, c, e, t[9], 21, -343485551);
            n[0] = o(e, n[0]);
            n[1] = o(s, n[1]);
            n[2] = o(h, n[2]);
            n[3] = o(c, n[3])
        },
        l = function(n) {
            for (var i = [], t = 0; t < 64; t += 4) i[t >> 2] = n.charCodeAt(t) + (n.charCodeAt(t + 1) << 8) + (n.charCodeAt(t + 2) << 16) + (n.charCodeAt(t + 3) << 24);
            return i
        },
        a = function(n) {
            for (var i = [], t = 0; t < 64; t += 4) i[t >> 2] = n[t] + (n[t + 1] << 8) + (n[t + 2] << 16) + (n[t + 3] << 24);
            return i
        },
        c = function(n) {
            for (var f = n.length,
            u = [1732584193, -271733879, -1732584194, 271733878], o, i, r, s, h, t = 64; t <= f; t += 64) e(u, l(n.substring(t - 64, t)));
            for (n = n.substring(t - 64), o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < o; t += 1) i[t >> 2] |= n.charCodeAt(t) << (t % 4 << 3);
            if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55) for (e(u, i), t = 0; t < 16; t += 1) i[t] = 0;
            return r = f * 8,
            r = r.toString(16).match(/(.*?)(.{0,8})$/),
            s = parseInt(r[2], 16),
            h = parseInt(r[1], 16) || 0,
            i[14] = s,
            i[15] = h,
            e(u, i),
            u
        },
        y = function(n) {
            for (var f = n.length,
            u = [1732584193, -271733879, -1732584194, 271733878], o, i, r, s, h, t = 64; t <= f; t += 64) e(u, a(n.subarray(t - 64, t)));
            for (n = t - 64 < f ? n.subarray(t - 64) : new Uint8Array(0), o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < o; t += 1) i[t >> 2] |= n[t] << (t % 4 << 3);
            if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55) for (e(u, i), t = 0; t < 16; t += 1) i[t] = 0;
            return r = f * 8,
            r = r.toString(16).match(/(.*?)(.{0,8})$/),
            s = parseInt(r[2], 16),
            h = parseInt(r[1], 16) || 0,
            i[14] = s,
            i[15] = h,
            e(u, i),
            u
        },
        v = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
        p = function(n) {
            for (var i = "",
            t = 0; t < 4; t += 1) i += v[n >> t * 8 + 4 & 15] + v[n >> t * 8 & 15];
            return i
        },
        s = function(n) {
            for (var t = 0; t < n.length; t += 1) n[t] = p(n[t]);
            return n.join("")
        },
        w = function(n) {
            return s(c(n))
        },
        t = function() {
            this.reset()
        };
        return w("hello") !== "5d41402abc4b2a76b9719d911017c592" && (o = function(n, t) {
            var i = (n & 65535) + (t & 65535),
            r = (n >> 16) + (t >> 16) + (i >> 16);
            return r << 16 | i & 65535
        }),
        t.prototype.append = function(n) {
            return /[\u0080-\uFFFF]/.test(n) && (n = unescape(encodeURIComponent(n))),
            this.appendBinary(n),
            this
        },
        t.prototype.appendBinary = function(n) {
            this._buff += n;
            this._length += n.length;
            for (var i = this._buff.length,
            t = 64; t <= i; t += 64) e(this._state, l(this._buff.substring(t - 64, t)));
            return this._buff = this._buff.substr(t - 64),
            this
        },
        t.prototype.end = function(n) {
            for (var i = this._buff,
            r = i.length,
            u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], f, t = 0; t < r; t += 1) u[t >> 2] |= i.charCodeAt(t) << (t % 4 << 3);
            return this._finish(u, r),
            f = !n ? s(this._state) : this._state,
            this.reset(),
            f
        },
        t.prototype._finish = function(n, t) {
            var i = t,
            r, u, f;
            if (n[i >> 2] |= 128 << (i % 4 << 3), i > 55) for (e(this._state, n), i = 0; i < 16; i += 1) n[i] = 0;
            r = this._length * 8;
            r = r.toString(16).match(/(.*?)(.{0,8})$/);
            u = parseInt(r[2], 16);
            f = parseInt(r[1], 16) || 0;
            n[14] = u;
            n[15] = f;
            e(this._state, n)
        },
        t.prototype.reset = function() {
            return this._buff = "",
            this._length = 0,
            this._state = [1732584193, -271733879, -1732584194, 271733878],
            this
        },
        t.prototype.destroy = function() {
            delete this._state;
            delete this._buff;
            delete this._length
        },
        t.hash = function(n, t) { / [\u0080 - \uFFFF] / .test(n) && (n = unescape(encodeURIComponent(n)));
            var i = c(n);
            return ! t ? s(i) : i
        },
        t.hashBinary = function(n, t) {
            var i = c(n);
            return ! t ? s(i) : i
        },
        t.ArrayBuffer = function() {
            this.reset()
        },
        t.ArrayBuffer.prototype.append = function(n) {
            var i = this._concatArrayBuffer(this._buff, n),
            r = i.length,
            t;
            for (this._length += n.byteLength, t = 64; t <= r; t += 64) e(this._state, a(i.subarray(t - 64, t)));
            return this._buff = t - 64 < r ? i.subarray(t - 64) : new Uint8Array(0),
            this
        },
        t.ArrayBuffer.prototype.end = function(n) {
            for (var i = this._buff,
            r = i.length,
            u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], f, t = 0; t < r; t += 1) u[t >> 2] |= i[t] << (t % 4 << 3);
            return this._finish(u, r),
            f = !n ? s(this._state) : this._state,
            this.reset(),
            f
        },
        t.ArrayBuffer.prototype._finish = t.prototype._finish,
        t.ArrayBuffer.prototype.reset = function() {
            return this._buff = new Uint8Array(0),
            this._length = 0,
            this._state = [1732584193, -271733879, -1732584194, 271733878],
            this
        },
        t.ArrayBuffer.prototype.destroy = t.prototype.destroy,
        t.ArrayBuffer.prototype._concatArrayBuffer = function(n, t) {
            var r = n.length,
            i = new Uint8Array(r + t.byteLength);
            return i.set(n),
            i.set(new Uint8Array(t), r),
            i
        },
        t.ArrayBuffer.hash = function(n, t) {
            var i = y(new Uint8Array(n));
            return ! t ? s(i) : i
        },
        n.register("Md5", {
            init: function() {},
            loadFromBlob: function(n) {
                var i = n.getSource(),
                f = 2097152,
                h = Math.ceil(i.size / f),
                s = 0,
                e = this.owner,
                o = new t.ArrayBuffer,
                c = this,
                l = i.mozSlice || i.webkitSlice || i.slice,
                u,
                r;
                r = new FileReader;
                u = function() {
                    var t, a;
                    t = s * f;
                    a = Math.min(t + f, i.size);
                    r.onload = function(t) {
                        o.append(t.target.result);
                        e.trigger("progress", {
                            total: n.size,
                            loaded: a
                        })
                    };
                    r.onloadend = function() {
                        r.onloadend = r.onload = null; ++s < h ? setTimeout(u, 1) : setTimeout(function() {
                            e.trigger("load");
                            c.result = o.end();
                            u = n = i = o = null;
                            e.trigger("complete")
                        },
                        50)
                    };
                    r.readAsArrayBuffer(l.call(i, t, a))
                };
                u()
            },
            getResult: function() {
                return this.result
            }
        })
    }),
    t("runtime/flash/runtime", ["base", "runtime/runtime", "runtime/compbase"],
    function(t, i, r) {
        function s() {
            var n;
            try {
                n = navigator.plugins["Shockwave Flash"];
                n = n.description
            } catch(t) {
                try {
                    n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                } catch(i) {
                    n = "0.0"
                }
            }
            return n = n.match(/\d+/g),
            parseFloat(n[0] + "." + n[1], 10)
        }
        function u() {
            function c(n, t) {
                var i = n.type || n,
                f, u;
                f = i.split("::");
                u = f[0];
                i = f[1];
                i === "Ready" && u === r.uid ? r.trigger("ready") : e[u] && e[u].trigger(i.toLowerCase(), n, t)
            }
            var u = {},
            e = {},
            s = this.destroy,
            r = this,
            h = t.guid("webuploader_");
            i.apply(r, arguments);
            r.type = o;
            r.exec = function(n, i) {
                var o = this,
                s = o.uid,
                c = t.slice(arguments, 2),
                h;
                return (e[s] = o, f[n] && (u[s] || (u[s] = new f[n](o, r)), h = u[s], h[i])) ? h[i].apply(h, c) : r.flashExec.apply(o, arguments)
            };
            n[h] = function() {
                var n = arguments;
                setTimeout(function() {
                    c.apply(null, n)
                },
                1)
            };
            this.jsreciver = h;
            this.destroy = function() {
                return s && s.apply(this, arguments)
            };
            this.flashExec = function(n, i) {
                var u = r.getFlash(),
                f = t.slice(arguments, 2);
                return u.exec(this.uid, n, i, f)
            }
        }
        var e = t.$,
        o = "flash",
        f = {};
        return t.inherits(i, {
            constructor: u,
            init: function() {
                var i = this.getContainer(),
                r = this.options,
                n;
                i.css({
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    width: "9px",
                    height: "9px",
                    overflow: "hidden"
                });
                n = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + r.swf + '" ';
                t.browser.ie && (n += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
                n += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + r.swf + '" /><param name="flashvars" value="uid=' + this.uid + "&jsreciver=" + this.jsreciver + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /><\/object>';
                i.html(n)
            },
            getFlash: function() {
                return this._flash ? this._flash: (this._flash = e("#" + this.uid).get(0), this._flash)
            }
        }),
        u.register = function(n, i) {
            return f[n] = t.inherits(r, e.extend({
                flashExec: function() {
                    var n = this.owner,
                    t = this.getRuntime();
                    return t.flashExec.apply(n, arguments)
                }
            },
            i))
        },
        s() >= 11.4 && i.addRuntime(o, u),
        u
    }),
    t("runtime/flash/filepicker", ["base", "runtime/flash/runtime"],
    function(n, t) {
        var i = n.$;
        return t.register("FilePicker", {
            init: function(n) {
                for (var t = i.extend({},
                n), u = t.accept && t.accept.length, r = 0; r < u; r++) t.accept[r].title || (t.accept[r].title = "Files");
                delete t.button;
                delete t.id;
                delete t.container;
                this.flashExec("FilePicker", "init", t)
            },
            destroy: function() {
                this.flashExec("FilePicker", "destroy")
            }
        })
    }),
    t("runtime/flash/image", ["runtime/flash/runtime"],
    function(n) {
        return n.register("Image", {
            loadFromBlob: function(n) {
                var t = this.owner;
                t.info() && this.flashExec("Image", "info", t.info());
                t.meta() && this.flashExec("Image", "meta", t.meta());
                this.flashExec("Image", "loadFromBlob", n.uid)
            }
        })
    }),
    t("runtime/flash/transport", ["base", "runtime/flash/runtime", "runtime/client"],
    function(t, i, r) {
        var u = t.$;
        return i.register("Transport", {
            init: function() {
                this._status = 0;
                this._response = null;
                this._responseJson = null
            },
            send: function() {
                var i = this.owner,
                n = this.options,
                t = this._initAjax(),
                r = i._blob,
                f = n.server,
                e;
                t.connectRuntime(r.ruid);
                n.sendAsBinary ? (f += (/\?/.test(f) ? "&": "?") + u.param(i._formData), e = r.uid) : (u.each(i._formData,
                function(n, i) {
                    t.exec("append", n, i)
                }), t.exec("appendBlob", n.fileVal, r.uid, n.filename || i._formData.name || ""));
                this._setRequestHeader(t, n.headers);
                t.exec("send", {
                    method: n.method,
                    url: f,
                    forceURLStream: n.forceURLStream,
                    mimeType: "application/octet-stream"
                },
                e)
            },
            getStatus: function() {
                return this._status
            },
            getResponse: function() {
                return this._response || ""
            },
            getResponseAsJson: function() {
                return this._responseJson
            },
            abort: function() {
                var n = this._xhr;
                n && (n.exec("abort"), n.destroy(), this._xhr = n = null)
            },
            destroy: function() {
                this.abort()
            },
            _initAjax: function() {
                var t = this,
                i = new r("XMLHttpRequest");
                i.on("uploadprogress progress",
                function(n) {
                    var i = n.loaded / n.total;
                    return i = Math.min(1, Math.max(0, i)),
                    t.trigger("progress", i)
                });
                i.on("load",
                function() {
                    var r = i.exec("getStatus"),
                    f = !1,
                    u = "",
                    e;
                    return i.off(),
                    t._xhr = null,
                    r >= 200 && r < 300 ? f = !0 : r >= 500 && r < 600 ? (f = !0, u = "server") : u = "http",
                    f && (t._response = i.exec("getResponse"), t._response = decodeURIComponent(t._response), e = n.JSON && n.JSON.parse ||
                    function(n) {
                        try {
                            return new Function("return " + n).call()
                        } catch(t) {
                            return {}
                        }
                    },
                    t._responseJson = t._response ? e(t._response) : {}),
                    i.destroy(),
                    i = null,
                    u ? t.trigger("error", u) : t.trigger("load")
                });
                i.on("error",
                function() {
                    i.off();
                    t._xhr = null;
                    t.trigger("error", "http")
                });
                return t._xhr = i,
                i
            },
            _setRequestHeader: function(n, t) {
                u.each(t,
                function(t, i) {
                    n.exec("setRequestHeader", t, i)
                })
            }
        })
    }),
    t("runtime/flash/blob", ["runtime/flash/runtime", "lib/blob"],
    function(n, t) {
        return n.register("Blob", {
            slice: function(n, i) {
                var r = this.flashExec("Blob", "slice", n, i);
                return new t(r.uid, r)
            }
        })
    }),
    t("runtime/flash/md5", ["runtime/flash/runtime"],
    function(n) {
        return n.register("Md5", {
            init: function() {},
            loadFromBlob: function(n) {
                return this.flashExec("Md5", "loadFromBlob", n.uid)
            }
        })
    }),
    t("preset/all", ["base", "widgets/filednd", "widgets/filepaste", "widgets/filepicker", "widgets/image", "widgets/queue", "widgets/runtime", "widgets/upload", "widgets/validator", "widgets/md5", "runtime/html5/blob", "runtime/html5/dnd", "runtime/html5/filepaste", "runtime/html5/filepicker", "runtime/html5/imagemeta/exif", "runtime/html5/androidpatch", "runtime/html5/image", "runtime/html5/transport", "runtime/html5/md5", "runtime/flash/filepicker", "runtime/flash/image", "runtime/flash/transport", "runtime/flash/blob", "runtime/flash/md5"],
    function(n) {
        return n
    }),
    t("webuploader", ["preset/all"],
    function(n) {
        return n
    }),
    i("webuploader")
});
var swfobject = function() {
    function v() {
        var i, r, n;
        if (!c) {
            try {
                i = t.getElementsByTagName("body")[0].appendChild(h("span"));
                i.parentNode.removeChild(i)
            } catch(u) {
                return
            }
            for (c = !0, r = w.length, n = 0; n < r; n++) w[n]()
        }
    }
    function yt(n) {
        c ? n() : w[w.length] = n
    }
    function pt(n) {
        if (typeof r.addEventListener != i) r.addEventListener("load", n, !1);
        else if (typeof t.addEventListener != i) t.addEventListener("load", n, !1);
        else if (typeof r.attachEvent != i) ui(r, "onload", n);
        else if (typeof r.onload == "function") {
            var u = r.onload;
            r.onload = function() {
                u();
                n()
            }
        } else r.onload = n
    }
    function gt() {
        lt ? ni() : it()
    }
    function ni() {
        var o = t.getElementsByTagName("body")[0],
        u = h(f),
        r,
        e;
        u.setAttribute("type", p);
        r = o.appendChild(u);
        r ? (e = 0,
        function() {
            if (typeof r.GetVariable != i) {
                var t = r.GetVariable("$version");
                t && (t = t.split(" ")[1].split(","), n.pv = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)])
            } else if (e < 10) {
                e++;
                setTimeout(arguments.callee, 10);
                return
            }
            o.removeChild(u);
            r = null;
            it()
        } ()) : it()
    }
    function it() {
        var y = s.length,
        r, t, h, c, v;
        if (y > 0) for (r = 0; r < y; r++) {
            var f = s[r].id,
            e = s[r].callbackFn,
            o = {
                success: !1,
                id: f
            };
            if (n.pv[0] > 0) {
                if (t = u(f), t) if (!g(s[r].swfVersion) || n.wk && n.wk < 312) if (s[r].expressInstall && ut()) {
                    h = {};
                    h.data = s[r].expressInstall;
                    h.width = t.getAttribute("width") || "0";
                    h.height = t.getAttribute("height") || "0";
                    t.getAttribute("class") && (h.styleclass = t.getAttribute("class"));
                    t.getAttribute("align") && (h.align = t.getAttribute("align"));
                    var p = {},
                    a = t.getElementsByTagName("param"),
                    w = a.length;
                    for (c = 0; c < w; c++) a[c].getAttribute("name").toLowerCase() != "movie" && (p[a[c].getAttribute("name")] = a[c].getAttribute("value"));
                    ft(h, p, f, e)
                } else ti(t),
                e && e(o);
                else l(f, !0),
                e && (o.success = !0, o.ref = rt(f), e(o))
            } else l(f, !0),
            e && (v = rt(f), v && typeof v.SetVariable != i && (o.success = !0, o.ref = v), e(o))
        }
    }
    function rt(n) {
        var r = null,
        t = u(n),
        e;
        return t && t.nodeName == "OBJECT" && (typeof t.SetVariable != i ? r = t: (e = t.getElementsByTagName(f)[0], e && (r = e))),
        r
    }
    function ut() {
        return ! d && g("6.0.65") && (n.win || n.mac) && !(n.wk && n.wk < 312)
    }
    function ft(f, e, o, s) {
        var c, v, l, a;
        d = !0;
        nt = s || null;
        at = {
            success: !1,
            id: o
        };
        c = u(o);
        c && (c.nodeName == "OBJECT" ? (y = et(c), k = null) : (y = c, k = o), f.id = ht, (typeof f.width == i || !/%$/.test(f.width) && parseInt(f.width, 10) < 310) && (f.width = "310"), (typeof f.height == i || !/%$/.test(f.height) && parseInt(f.height, 10) < 137) && (f.height = "137"), t.title = t.title.slice(0, 47) + " - Flash Player Installation", v = n.ie && n.win ? "ActiveX": "PlugIn", l = "MMredirectURL=" + r.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + v + "&MMdoctitle=" + t.title, typeof e.flashvars != i ? e.flashvars += "&" + l: e.flashvars = l, n.ie && n.win && c.readyState != 4 && (a = h("div"), o += "SWFObjectNew", a.setAttribute("id", o), c.parentNode.insertBefore(a, c), c.style.display = "none",
        function() {
            c.readyState == 4 ? c.parentNode.removeChild(c) : setTimeout(arguments.callee, 10)
        } ()), ot(f, e, o))
    }
    function ti(t) {
        if (n.ie && n.win && t.readyState != 4) {
            var i = h("div");
            t.parentNode.insertBefore(i, t);
            i.parentNode.replaceChild(et(t), i);
            t.style.display = "none",
            function() {
                t.readyState == 4 ? t.parentNode.removeChild(t) : setTimeout(arguments.callee, 10)
            } ()
        } else t.parentNode.replaceChild(et(t), t)
    }
    function et(t) {
        var u = h("div"),
        e,
        i,
        o,
        r;
        if (n.win && n.ie) u.innerHTML = t.innerHTML;
        else if (e = t.getElementsByTagName(f)[0], e && (i = e.childNodes, i)) for (o = i.length, r = 0; r < o; r++) i[r].nodeType == 1 && i[r].nodeName == "PARAM" || i[r].nodeType == 8 || u.appendChild(i[r].cloneNode(!0));
        return u
    }
    function ot(t, r, e) {
        var v, y = u(e),
        w,
        o,
        k,
        a,
        c,
        s,
        l;
        if (n.wk && n.wk < 312) return v;
        if (y) if (typeof t.id == i && (t.id = e), n.ie && n.win) {
            w = "";
            for (o in t) t[o] != Object.prototype[o] && (o.toLowerCase() == "data" ? r.movie = t[o] : o.toLowerCase() == "styleclass" ? w += ' class="' + t[o] + '"': o.toLowerCase() != "classid" && (w += " " + o + '="' + t[o] + '"'));
            k = "";
            for (a in r) r[a] != Object.prototype[a] && (k += '<param name="' + a + '" value="' + r[a] + '" />');
            y.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + w + ">" + k + "<\/object>";
            b[b.length] = t.id;
            v = u(t.id)
        } else {
            c = h(f);
            c.setAttribute("type", p);
            for (s in t) t[s] != Object.prototype[s] && (s.toLowerCase() == "styleclass" ? c.setAttribute("class", t[s]) : s.toLowerCase() != "classid" && c.setAttribute(s, t[s]));
            for (l in r) r[l] != Object.prototype[l] && l.toLowerCase() != "movie" && ii(c, l, r[l]);
            y.parentNode.replaceChild(c, y);
            v = c
        }
        return v
    }
    function ii(n, t, i) {
        var r = h("param");
        r.setAttribute("name", t);
        r.setAttribute("value", i);
        n.appendChild(r)
    }
    function wt(t) {
        var i = u(t);
        i && i.nodeName == "OBJECT" && (n.ie && n.win ? (i.style.display = "none",
        function() {
            i.readyState == 4 ? ri(t) : setTimeout(arguments.callee, 10)
        } ()) : i.parentNode.removeChild(i))
    }
    function ri(n) {
        var t = u(n),
        i;
        if (t) {
            for (i in t) typeof t[i] == "function" && (t[i] = null);
            t.parentNode.removeChild(t)
        }
    }
    function u(n) {
        var i = null;
        try {
            i = t.getElementById(n)
        } catch(r) {}
        return i
    }
    function h(n) {
        return t.createElement(n)
    }
    function ui(n, t, i) {
        n.attachEvent(t, i);
        a[a.length] = [n, t, i]
    }
    function g(t) {
        var r = n.pv,
        i = t.split(".");
        return i[0] = parseInt(i[0], 10),
        i[1] = parseInt(i[1], 10) || 0,
        i[2] = parseInt(i[2], 10) || 0,
        r[0] > i[0] || r[0] == i[0] && r[1] > i[1] || r[0] == i[0] && r[1] == i[1] && r[2] >= i[2] ? !0 : !1
    }
    function bt(r, u, o, s) {
        var a, c, l;
        n.ie && n.mac || (a = t.getElementsByTagName("head")[0], a) && (c = o && typeof o == "string" ? o: "screen", s && (e = null, tt = null), e && tt == c || (l = h("style"), l.setAttribute("type", "text/css"), l.setAttribute("media", c), e = a.appendChild(l), n.ie && n.win && typeof t.styleSheets != i && t.styleSheets.length > 0 && (e = t.styleSheets[t.styleSheets.length - 1]), tt = c), n.ie && n.win ? e && typeof e.addRule == f && e.addRule(r, u) : e && typeof t.createTextNode != i && e.appendChild(t.createTextNode(r + " {" + u + "}")))
    }
    function l(n, t) {
        if (vt) {
            var i = t ? "visible": "hidden";
            c && u(n) ? u(n).style.visibility = i: bt("#" + n, "visibility:" + i)
        }
    }
    function kt(n) {
        var t = /[\\\"<>\.;]/.exec(n) != null;
        return t && typeof encodeURIComponent != i ? encodeURIComponent(n) : n
    }
    var i = "undefined",
    f = "object",
    st = "Shockwave Flash",
    dt = "ShockwaveFlash.ShockwaveFlash",
    p = "application/x-shockwave-flash",
    ht = "SWFObjectExprInst",
    ct = "onreadystatechange",
    r = window,
    t = document,
    o = navigator,
    lt = !1,
    w = [gt],
    s = [],
    b = [],
    a = [],
    y,
    k,
    nt,
    at,
    c = !1,
    d = !1,
    e,
    tt,
    vt = !0,
    n = function() {
        var l = typeof t.getElementById != i && typeof t.getElementsByTagName != i && typeof t.createElement != i,
        e = o.userAgent.toLowerCase(),
        s = o.platform.toLowerCase(),
        a = s ? /win/.test(s) : /win/.test(e),
        v = s ? /mac/.test(s) : /mac/.test(e),
        y = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
        h = !+"\v1",
        u = [0, 0, 0],
        n = null,
        c;
        if (typeof o.plugins != i && typeof o.plugins[st] == f) n = o.plugins[st].description,
        !n || typeof o.mimeTypes != i && o.mimeTypes[p] && !o.mimeTypes[p].enabledPlugin || (lt = !0, h = !1, n = n.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), u[0] = parseInt(n.replace(/^(.*)\..*$/, "$1"), 10), u[1] = parseInt(n.replace(/^.*\.(.*)\s.*$/, "$1"), 10), u[2] = /[a-zA-Z]/.test(n) ? parseInt(n.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
        else if (typeof r.ActiveXObject != i) try {
            c = new ActiveXObject(dt);
            c && (n = c.GetVariable("$version"), n && (h = !0, n = n.split(" ")[1].split(","), u = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)]))
        } catch(w) {}
        return {
            w3: l,
            pv: u,
            wk: y,
            ie: h,
            win: a,
            mac: v
        }
    } (),
    fi = function() {
        n.w3 && ((typeof t.readyState != i && t.readyState == "complete" || typeof t.readyState == i && (t.getElementsByTagName("body")[0] || t.body)) && v(), c || (typeof t.addEventListener != i && t.addEventListener("DOMContentLoaded", v, !1), n.ie && n.win && (t.attachEvent(ct,
        function() {
            t.readyState == "complete" && (t.detachEvent(ct, arguments.callee), v())
        }), r == top &&
        function() {
            if (!c) {
                try {
                    t.documentElement.doScroll("left")
                } catch(n) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                v()
            }
        } ()), n.wk &&
        function() {
            if (!c) {
                if (!/loaded|complete/.test(t.readyState)) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                v()
            }
        } (), pt(v)))
    } (),
    ei = function() {
        n.ie && n.win && window.attachEvent("onunload",
        function() {
            for (var e = a.length,
            r, i, u, f, t = 0; t < e; t++) a[t][0].detachEvent(a[t][1], a[t][2]);
            for (r = b.length, i = 0; i < r; i++) wt(b[i]);
            for (u in n) n[u] = null;
            n = null;
            for (f in swfobject) swfobject[f] = null;
            swfobject = null
        })
    } ();
    return {
        registerObject: function(t, i, r, u) {
            if (n.w3 && t && i) {
                var f = {};
                f.id = t;
                f.swfVersion = i;
                f.expressInstall = r;
                f.callbackFn = u;
                s[s.length] = f;
                l(t, !1)
            } else u && u({
                success: !1,
                id: t
            })
        },
        getObjectById: function(t) {
            if (n.w3) return rt(t)
        },
        embedSWF: function(t, r, u, e, o, s, h, c, a, v) {
            var y = {
                success: !1,
                id: r
            };
            n.w3 && !(n.wk && n.wk < 312) && t && r && u && e && o ? (l(r, !1), yt(function() {
                var n, b, p, k, w, d;
                if (u += "", e += "", n = {},
                a && typeof a === f) for (b in a) n[b] = a[b];
                if (n.data = t, n.width = u, n.height = e, p = {},
                c && typeof c === f) for (k in c) p[k] = c[k];
                if (h && typeof h === f) for (w in h) typeof p.flashvars != i ? p.flashvars += "&" + w + "=" + h[w] : p.flashvars = w + "=" + h[w];
                if (g(o)) d = ot(n, p, r),
                n.id == r && l(r, !0),
                y.success = !0,
                y.ref = d;
                else {
                    if (s && ut()) {
                        n.data = s;
                        ft(n, p, r, v);
                        return
                    }
                    l(r, !0)
                }
                v && v(y)
            })) : v && v(y)
        },
        switchOffAutoHideShow: function() {
            vt = !1
        },
        ua: n,
        getFlashPlayerVersion: function() {
            return {
                major: n.pv[0],
                minor: n.pv[1],
                release: n.pv[2]
            }
        },
        hasFlashPlayerVersion: g,
        createSWF: function(t, i, r) {
            return n.w3 ? ot(t, i, r) : undefined
        },
        showExpressInstall: function(t, i, r, u) {
            n.w3 && ut() && ft(t, i, r, u)
        },
        removeSWF: function(t) {
            n.w3 && wt(t)
        },
        createCSS: function(t, i, r, u) {
            n.w3 && bt(t, i, r, u)
        },
        addDomLoadEvent: yt,
        addLoadEvent: pt,
        getQueryParamValue: function(n) {
            var r = t.location.search || t.location.hash,
            u, i;
            if (r) {
                if (/\?/.test(r) && (r = r.split("?")[1]), n == null) return kt(r);
                for (u = r.split("&"), i = 0; i < u.length; i++) if (u[i].substring(0, u[i].indexOf("=")) == n) return kt(u[i].substring(u[i].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (d) {
                var t = u(ht);
                t && y && (t.parentNode.replaceChild(y, t), k && (l(k, !0), n.ie && n.win && (y.style.display = "block")), nt && nt(at));
                d = !1
            }
        }
    }
} (),
SWFUpload;
SWFUpload == undefined && (SWFUpload = function(n) {
    this.initSWFUpload(n)
});
SWFUpload.prototype.initSWFUpload = function(n) {
    try {
        this.customSettings = {};
        this.settings = n;
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo()
    } catch(t) {
        delete SWFUpload.instances[this.movieName];
        throw t;
    }
};
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 2009-03-25";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290
};
SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};
SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120
};
SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};
SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};
SWFUpload.completeURL = function(n) {
    if (typeof n != "string" || n.match(/^https?:\/\//i) || n.match(/^\//)) return n;
    var i = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: ""),
    t = window.location.pathname.lastIndexOf("/");
    return path = t <= 0 ? "/": window.location.pathname.substr(0, t) + "/",
    path + n
};
SWFUpload.prototype.initSettings = function() {
    this.ensureDefault = function(n, t) {
        this.settings[n] = this.settings[n] == undefined ? t: this.settings[n]
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", !1);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", !1);
    this.ensureDefault("requeue_on_error", !1);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", !0);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", !1);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", !1);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings; ! this.settings.prevent_swf_caching || (this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?": "&") + "preventswfcaching=" + (new Date).getTime());
    this.settings.preserve_relative_urls || (this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url));
    delete this.ensureDefault
};
SWFUpload.prototype.loadFlash = function() {
    var n, t;
    if (document.getElementById(this.movieName) !== null) throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
    if (n = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, n == undefined) throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
    t = document.createElement("div");
    t.innerHTML = this.getFlashHTML();
    n.parentNode.replaceChild(t.firstChild, n);
    window[this.movieName] == undefined && (window[this.movieName] = this.getMovieElement())
};
SWFUpload.prototype.getFlashHTML = function() {
    return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "<\/object>"].join("")
};
SWFUpload.prototype.getFlashVars = function() {
    var n = this.buildParamString(),
    t = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(t), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(n), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
};
SWFUpload.prototype.getMovieElement = function() {
    if (this.movieElement == undefined && (this.movieElement = document.getElementById(this.movieName)), this.movieElement === null) throw "Could not find Flash element";
    return this.movieElement
};
SWFUpload.prototype.buildParamString = function() {
    var n = this.settings.post_params,
    i = [],
    t;
    if (typeof n == "object") for (t in n) n.hasOwnProperty(t) && i.push(encodeURIComponent(t.toString()) + "=" + encodeURIComponent(n[t].toString()));
    return i.join("&amp;")
};
SWFUpload.prototype.destroy = function() {
    var n, t;
    try {
        if (this.cancelUpload(null, !1), n = null, n = this.getMovieElement(), n && typeof n.CallFunction == "unknown") {
            for (t in n) try {
                typeof n[t] == "function" && (n[t] = null)
            } catch(i) {}
            try {
                n.parentNode.removeChild(n)
            } catch(r) {}
        }
        return window[this.movieName] = null,
        SWFUpload.instances[this.movieName] = null,
        delete SWFUpload.instances[this.movieName],
        this.movieElement = null,
        this.settings = null,
        this.customSettings = null,
        this.eventQueue = null,
        this.movieName = null,
        !0
    } catch(u) {
        return ! 1
    }
};
SWFUpload.prototype.displayDebugInfo = function() {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", this.settings.button_placeholder ? "Set": "Not Set", "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler == "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler == "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler == "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler == "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler == "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler == "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler == "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler == "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler == "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler == "function").toString(), "\n"].join(""))
};
SWFUpload.prototype.addSetting = function(n, t, i) {
    return this.settings[n] = t == undefined ? i: t
};
SWFUpload.prototype.getSetting = function(n) {
    return this.settings[n] != undefined ? this.settings[n] : ""
};
SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement(),
    returnValue,
    returnString;
    try {
        returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "<\/invoke>");
        returnValue = eval(returnString)
    } catch(ex) {
        throw "Call to " + functionName + " failed";
    }
    return returnValue != undefined && typeof returnValue.post == "object" && (returnValue = this.unescapeFilePostParams(returnValue)),
    returnValue
};
SWFUpload.prototype.selectFile = function() {
    this.callFlash("SelectFile")
};
SWFUpload.prototype.selectFiles = function() {
    this.callFlash("SelectFiles")
};
SWFUpload.prototype.startUpload = function(n) {
    this.callFlash("StartUpload", [n])
};
SWFUpload.prototype.cancelUpload = function(n, t) {
    t !== !1 && (t = !0);
    this.callFlash("CancelUpload", [n, t])
};
SWFUpload.prototype.stopUpload = function() {
    this.callFlash("StopUpload")
};
SWFUpload.prototype.getStats = function() {
    return this.callFlash("GetStats")
};
SWFUpload.prototype.setStats = function(n) {
    this.callFlash("SetStats", [n])
};
SWFUpload.prototype.getFile = function(n) {
    return typeof n == "number" ? this.callFlash("GetFileByIndex", [n]) : this.callFlash("GetFile", [n])
};
SWFUpload.prototype.addFileParam = function(n, t, i) {
    return this.callFlash("AddFileParam", [n, t, i])
};
SWFUpload.prototype.removeFileParam = function(n, t) {
    this.callFlash("RemoveFileParam", [n, t])
};
SWFUpload.prototype.setUploadURL = function(n) {
    this.settings.upload_url = n.toString();
    this.callFlash("SetUploadURL", [n])
};
SWFUpload.prototype.setPostParams = function(n) {
    this.settings.post_params = n;
    this.callFlash("SetPostParams", [n])
};
SWFUpload.prototype.addPostParam = function(n, t) {
    this.settings.post_params[n] = t;
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.removePostParam = function(n) {
    delete this.settings.post_params[n];
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.setFileTypes = function(n, t) {
    this.settings.file_types = n;
    this.settings.file_types_description = t;
    this.callFlash("SetFileTypes", [n, t])
};
SWFUpload.prototype.setFileSizeLimit = function(n) {
    this.settings.file_size_limit = n;
    this.callFlash("SetFileSizeLimit", [n])
};
SWFUpload.prototype.setFileUploadLimit = function(n) {
    this.settings.file_upload_limit = n;
    this.callFlash("SetFileUploadLimit", [n])
};
SWFUpload.prototype.setFileQueueLimit = function(n) {
    this.settings.file_queue_limit = n;
    this.callFlash("SetFileQueueLimit", [n])
};
SWFUpload.prototype.setFilePostName = function(n) {
    this.settings.file_post_name = n;
    this.callFlash("SetFilePostName", [n])
};
SWFUpload.prototype.setUseQueryString = function(n) {
    this.settings.use_query_string = n;
    this.callFlash("SetUseQueryString", [n])
};
SWFUpload.prototype.setRequeueOnError = function(n) {
    this.settings.requeue_on_error = n;
    this.callFlash("SetRequeueOnError", [n])
};
SWFUpload.prototype.setHTTPSuccess = function(n) {
    typeof n == "string" && (n = n.replace(" ", "").split(","));
    this.settings.http_success = n;
    this.callFlash("SetHTTPSuccess", [n])
};
SWFUpload.prototype.setAssumeSuccessTimeout = function(n) {
    this.settings.assume_success_timeout = n;
    this.callFlash("SetAssumeSuccessTimeout", [n])
};
SWFUpload.prototype.setDebugEnabled = function(n) {
    this.settings.debug_enabled = n;
    this.callFlash("SetDebugEnabled", [n])
};
SWFUpload.prototype.setButtonImageURL = function(n) {
    n == undefined && (n = "");
    this.settings.button_image_url = n;
    this.callFlash("SetButtonImageURL", [n])
};
SWFUpload.prototype.setButtonDimensions = function(n, t) {
    this.settings.button_width = n;
    this.settings.button_height = t;
    var i = this.getMovieElement();
    i != undefined && (i.style.width = n + "px", i.style.height = t + "px");
    this.callFlash("SetButtonDimensions", [n, t])
};
SWFUpload.prototype.setButtonText = function(n) {
    this.settings.button_text = n;
    this.callFlash("SetButtonText", [n])
};
SWFUpload.prototype.setButtonTextPadding = function(n, t) {
    this.settings.button_text_top_padding = t;
    this.settings.button_text_left_padding = n;
    this.callFlash("SetButtonTextPadding", [n, t])
};
SWFUpload.prototype.setButtonTextStyle = function(n) {
    this.settings.button_text_style = n;
    this.callFlash("SetButtonTextStyle", [n])
};
SWFUpload.prototype.setButtonDisabled = function(n) {
    this.settings.button_disabled = n;
    this.callFlash("SetButtonDisabled", [n])
};
SWFUpload.prototype.setButtonAction = function(n) {
    this.settings.button_action = n;
    this.callFlash("SetButtonAction", [n])
};
SWFUpload.prototype.setButtonCursor = function(n) {
    this.settings.button_cursor = n;
    this.callFlash("SetButtonCursor", [n])
};
SWFUpload.prototype.queueEvent = function(n, t) {
    t == undefined ? t = [] : t instanceof Array || (t = [t]);
    var i = this;
    if (typeof this.settings[n] == "function") this.eventQueue.push(function() {
        this.settings[n].apply(this, t)
    }),
    setTimeout(function() {
        i.executeNextEvent()
    },
    0);
    else if (this.settings[n] !== null) throw "Event handler " + n + " is unknown or is not a function";
};
SWFUpload.prototype.executeNextEvent = function() {
    var n = this.eventQueue ? this.eventQueue.shift() : null;
    typeof n == "function" && n.apply(this)
};
SWFUpload.prototype.unescapeFilePostParams = function(n) {
    var u = {},
    t, i, r;
    if (n != undefined) {
        for (i in n.post) if (n.post.hasOwnProperty(i)) {
            for (t = i; (r = /[$]([0-9a-f]{4})/i.exec(t)) !== null;) t = t.replace(r[0], String.fromCharCode(parseInt("0x" + r[1], 16)));
            u[t] = n.post[i]
        }
        n.post = u
    }
    return n
};
SWFUpload.prototype.testExternalInterface = function() {
    try {
        return this.callFlash("TestExternalInterface")
    } catch(n) {
        return ! 1
    }
};
SWFUpload.prototype.flashReady = function() {
    var n = this.getMovieElement();
    if (!n) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return
    }
    this.cleanUp(n);
    this.queueEvent("swfupload_loaded_handler")
};
SWFUpload.prototype.cleanUp = function(n) {
    try {
        if (this.movieElement && typeof n.CallFunction == "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (var t in n) try {
                typeof n[t] == "function" && (n[t] = null)
            } catch(i) {}
        }
    } catch(r) {}
    window.__flash__removeCallback = function(n, t) {
        try {
            n && (n[t] = null)
        } catch(i) {}
    }
};
SWFUpload.prototype.fileDialogStart = function() {
    this.queueEvent("file_dialog_start_handler")
};
SWFUpload.prototype.fileQueued = function(n) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("file_queued_handler", n)
};
SWFUpload.prototype.fileQueueError = function(n, t, i) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("file_queue_error_handler", [n, t, i])
};
SWFUpload.prototype.fileDialogComplete = function(n, t, i) {
    this.queueEvent("file_dialog_complete_handler", [n, t, i])
};
SWFUpload.prototype.uploadStart = function(n) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("return_upload_start_handler", n)
};
SWFUpload.prototype.returnUploadStart = function(n) {
    var t;
    if (typeof this.settings.upload_start_handler == "function") n = this.unescapeFilePostParams(n),
    t = this.settings.upload_start_handler.call(this, n);
    else if (this.settings.upload_start_handler != undefined) throw "upload_start_handler must be a function";
    t === undefined && (t = !0);
    t = !!t;
    this.callFlash("ReturnUploadStart", [t])
};
SWFUpload.prototype.uploadProgress = function(n, t, i) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("upload_progress_handler", [n, t, i])
};
SWFUpload.prototype.uploadError = function(n, t, i) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("upload_error_handler", [n, t, i])
};
SWFUpload.prototype.uploadSuccess = function(n, t, i) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("upload_success_handler", [n, t, i])
};
SWFUpload.prototype.uploadComplete = function(n) {
    n = this.unescapeFilePostParams(n);
    this.queueEvent("upload_complete_handler", n)
};
SWFUpload.prototype.debug = function(n) {
    this.queueEvent("debug_handler", n)
};
SWFUpload.prototype.debugMessage = function(n) {
    var i, t, r;
    if (this.settings.debug) if (t = [], typeof n == "object" && typeof n.name == "string" && typeof n.message == "string") {
        for (r in n) n.hasOwnProperty(r) && t.push(r + ": " + n[r]);
        i = t.join("\n") || "";
        t = i.split("\n");
        i = "EXCEPTION: " + t.join("\nEXCEPTION: ");
        SWFUpload.Console.writeLine(i)
    } else SWFUpload.Console.writeLine(n)
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function(n) {
    var t, i;
    try {
        t = document.getElementById("SWFUpload_Console");
        t || (i = document.createElement("form"), document.getElementsByTagName("body")[0].appendChild(i), t = document.createElement("textarea"), t.id = "SWFUpload_Console", t.style.fontFamily = "monospace", t.setAttribute("wrap", "off"), t.wrap = "off", t.style.overflow = "auto", t.style.width = "700px", t.style.height = "350px", t.style.margin = "5px", i.appendChild(t));
        t.value += n + "\n";
        t.scrollTop = t.scrollHeight - t.clientHeight
    } catch(r) {
        alert("Exception: " + r.name + " Message: " + r.message)
    }
},
function(n) {
    var i = {
        init: function(i, r) {
            return this.each(function() {
                var o = n(this),
                v = o.clone(),
                u = n.extend({
                    id: o.attr("id"),
                    swf: "uploadify.swf",
                    uploader: "uploadify.php",
                    auto: !0,
                    buttonClass: "",
                    buttonCursor: "hand",
                    buttonImage: null,
                    buttonText: "SELECT FILES",
                    checkExisting: !1,
                    debug: !1,
                    fileObjName: "Filedata",
                    fileSizeLimit: 0,
                    fileTypeDesc: "All Files",
                    fileTypeExts: "*.*",
                    height: 30,
                    itemTemplate: !1,
                    method: "post",
                    multi: !0,
                    formData: {},
                    preventCaching: !0,
                    progressData: "percentage",
                    queueID: !1,
                    queueSizeLimit: 999,
                    removeCompleted: !0,
                    removeTimeout: 3,
                    requeueErrors: !1,
                    successTimeout: 30,
                    uploadLimit: 0,
                    width: 120,
                    overrideEvents: []
                },
                i),
                s = {
                    assume_success_timeout: u.successTimeout,
                    button_placeholder_id: u.id,
                    button_width: u.width,
                    button_height: u.height,
                    button_text: null,
                    button_text_style: null,
                    button_text_top_padding: 0,
                    button_text_left_padding: 0,
                    button_action: u.multi ? SWFUpload.BUTTON_ACTION.SELECT_FILES: SWFUpload.BUTTON_ACTION.SELECT_FILE,
                    button_disabled: !1,
                    button_cursor: u.buttonCursor == "arrow" ? SWFUpload.CURSOR.ARROW: SWFUpload.CURSOR.HAND,
                    button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                    debug: u.debug,
                    requeue_on_error: u.requeueErrors,
                    file_post_name: u.fileObjName,
                    file_size_limit: u.fileSizeLimit,
                    file_types: u.fileTypeExts,
                    file_types_description: u.fileTypeDesc,
                    file_queue_limit: u.queueSizeLimit,
                    file_upload_limit: u.uploadLimit,
                    flash_url: u.swf,
                    prevent_swf_caching: u.preventCaching,
                    post_params: u.formData,
                    upload_url: u.uploader,
                    use_query_string: u.method == "get",
                    file_dialog_complete_handler: t.onDialogClose,
                    file_dialog_start_handler: t.onDialogOpen,
                    file_queued_handler: t.onSelect,
                    file_queue_error_handler: t.onSelectError,
                    swfupload_loaded_handler: u.onSWFReady,
                    upload_complete_handler: t.onUploadComplete,
                    upload_error_handler: t.onUploadError,
                    upload_progress_handler: t.onUploadProgress,
                    upload_start_handler: t.onUploadStart,
                    upload_success_handler: t.onUploadSuccess
                },
                l,
                a,
                f,
                e,
                h,
                c;
                r && (s = n.extend(s, r));
                s = n.extend(s, u);
                l = swfobject.getFlashPlayerVersion();
                a = l.major >= 9;
                a ? (window["uploadify_" + u.id] = new SWFUpload(s), f = window["uploadify_" + u.id], o.data("uploadify", f), e = n("<div />", {
                    id: u.id,
                    "class": "uploadify",
                    css: {
                        height: u.height + "px",
                        width: u.width + "px"
                    }
                }), n("#" + f.movieName).wrap(e), e = n("#" + u.id), e.data("uploadify", f), h = n("<div />", {
                    id: u.id + "-button",
                    "class": "uploadify-button " + u.buttonClass
                }), u.buttonImage && h.css({
                    "background-image": "url('" + u.buttonImage + "')",
                    "text-indent": "-9999px"
                }), h.html('<span class="uploadify-button-text">' + u.buttonText + "<\/span>").css({
                    height: u.height + "px",
                    "line-height": u.height + "px",
                    width: u.width + "px"
                }), e.append(h), n("#" + f.movieName).css({
                    position: "absolute",
                    "z-index": 1
                }), u.queueID || (c = n("<div />", {
                    id: u.id + "-queue",
                    "class": "uploadify-queue"
                }), e.after(c), f.settings.queueID = u.id + "-queue", f.settings.defaultQueue = !0), f.queueData = {
                    files: {},
                    filesSelected: 0,
                    filesQueued: 0,
                    filesReplaced: 0,
                    filesCancelled: 0,
                    filesErrored: 0,
                    uploadsSuccessful: 0,
                    uploadsErrored: 0,
                    averageSpeed: 0,
                    queueLength: 0,
                    queueSize: 0,
                    uploadSize: 0,
                    queueBytesUploaded: 0,
                    uploadQueue: [],
                    errorMsg: "Some files were not added to the queue:"
                },
                f.original = v, f.wrapper = e, f.button = h, f.queue = c, u.onInit && u.onInit.call(o, f)) : u.onFallback && u.onFallback.call(o)
            })
        },
        cancel: function() {
            var t = arguments;
            this.each(function() {
                var f = n(this),
                i = f.data("uploadify"),
                u = i.settings,
                e = -1,
                o,
                r,
                s;
                if (t[0]) if (t[0] == "*") o = i.queueData.queueLength,
                n("#" + u.queueID).find(".uploadify-queue-item").each(function() {
                    e++;
                    t[1] === !0 ? i.cancelUpload(n(this).attr("id"), !1) : i.cancelUpload(n(this).attr("id"));
                    n(this).find(".data").removeClass("data").html(" - Cancelled");
                    n(this).find(".uploadify-progress-bar").remove();
                    n(this).delay(1e3 + 100 * e).fadeOut(500,
                    function() {
                        n(this).remove()
                    })
                }),
                i.queueData.queueSize = 0,
                i.queueData.queueLength = 0,
                u.onClearQueue && u.onClearQueue.call(f, o);
                else for (r = 0; r < t.length; r++) i.cancelUpload(t[r]),
                n("#" + t[r]).find(".data").removeClass("data").html(" - Cancelled"),
                n("#" + t[r]).find(".uploadify-progress-bar").remove(),
                n("#" + t[r]).delay(1e3 + 100 * r).fadeOut(500,
                function() {
                    n(this).remove()
                });
                else s = n("#" + u.queueID).find(".uploadify-queue-item").get(0),
                $item = n(s),
                i.cancelUpload($item.attr("id")),
                $item.find(".data").removeClass("data").html(" - Cancelled"),
                $item.find(".uploadify-progress-bar").remove(),
                $item.delay(1e3).fadeOut(500,
                function() {
                    n(this).remove()
                })
            })
        },
        destroy: function() {
            this.each(function() {
                var r = n(this),
                i = r.data("uploadify"),
                t = i.settings;
                i.destroy();
                t.defaultQueue && n("#" + t.queueID).remove();
                n("#" + t.id).replaceWith(i.original);
                t.onDestroy && t.onDestroy.call(this);
                delete i
            })
        },
        disable: function(t) {
            this.each(function() {
                var u = n(this),
                i = u.data("uploadify"),
                r = i.settings;
                t ? (i.button.addClass("disabled"), r.onDisable && r.onDisable.call(this)) : (i.button.removeClass("disabled"), r.onEnable && r.onEnable.call(this));
                i.setButtonDisabled(t)
            })
        },
        settings: function(t, i, r) {
            var u = arguments,
            f = i;
            return this.each(function() {
                var h = n(this),
                e = h.data("uploadify"),
                o = e.settings,
                s;
                if (typeof u[0] == "object") for (s in i) setData(s, i[s]);
                if (u.length === 1) f = o[t];
                else {
                    switch (t) {
                    case "uploader":
                        e.setUploadURL(i);
                        break;
                    case "formData":
                        r || (i = n.extend(o.formData, i));
                        e.setPostParams(o.formData);
                        break;
                    case "method":
                        i == "get" ? e.setUseQueryString(!0) : e.setUseQueryString(!1);
                        break;
                    case "fileObjName":
                        e.setFilePostName(i);
                        break;
                    case "fileTypeExts":
                        e.setFileTypes(i, o.fileTypeDesc);
                        break;
                    case "fileTypeDesc":
                        e.setFileTypes(o.fileTypeExts, i);
                        break;
                    case "fileSizeLimit":
                        e.setFileSizeLimit(i);
                        break;
                    case "uploadLimit":
                        e.setFileUploadLimit(i);
                        break;
                    case "queueSizeLimit":
                        e.setFileQueueLimit(i);
                        break;
                    case "buttonImage":
                        e.button.css("background-image", settingValue);
                        break;
                    case "buttonCursor":
                        i == "arrow" ? e.setButtonCursor(SWFUpload.CURSOR.ARROW) : e.setButtonCursor(SWFUpload.CURSOR.HAND);
                        break;
                    case "buttonText":
                        n("#" + o.id + "-button").find(".uploadify-button-text").html(i);
                        break;
                    case "width":
                        e.setButtonDimensions(i, o.height);
                        break;
                    case "height":
                        e.setButtonDimensions(o.width, i);
                        break;
                    case "multi":
                        i ? e.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILES) : e.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILE)
                    }
                    o[t] = i
                }
            }),
            u.length === 1 ? f: void 0
        },
        stop: function() {
            this.each(function() {
                var i = n(this),
                t = i.data("uploadify");
                t.queueData.averageSpeed = 0;
                t.queueData.uploadSize = 0;
                t.queueData.bytesUploaded = 0;
                t.queueData.uploadQueue = [];
                t.stopUpload()
            })
        },
        upload: function() {
            var t = arguments;
            this.each(function() {
                var u = n(this),
                i = u.data("uploadify"),
                r;
                if (i.queueData.averageSpeed = 0, i.queueData.uploadSize = 0, i.queueData.bytesUploaded = 0, i.queueData.uploadQueue = [], t[0]) if (t[0] == "*") i.queueData.uploadSize = i.queueData.queueSize,
                i.queueData.uploadQueue.push("*"),
                i.startUpload();
                else {
                    for (r = 0; r < t.length; r++) i.queueData.uploadSize += i.queueData.files[t[r]].size,
                    i.queueData.uploadQueue.push(t[r]);
                    i.startUpload(i.queueData.uploadQueue.shift())
                } else i.startUpload()
            })
        }
    },
    t = {
        onDialogOpen: function() {
            var n = this.settings;
            this.queueData.errorMsg = "Some files were not added to the queue:";
            this.queueData.filesReplaced = 0;
            this.queueData.filesCancelled = 0;
            n.onDialogOpen && n.onDialogOpen.call(this)
        },
        onDialogClose: function(t, i, r) {
            var u = this.settings;
            this.queueData.filesErrored = t - i;
            this.queueData.filesSelected = t;
            this.queueData.filesQueued = i - this.queueData.filesCancelled;
            this.queueData.queueLength = r;
            n.inArray("onDialogClose", u.overrideEvents) < 0 && this.queueData.filesErrored > 0 && alert(this.queueData.errorMsg);
            u.onDialogClose && u.onDialogClose.call(this, this.queueData);
            u.auto && n("#" + u.id).uploadify("upload", "*")
        },
        onSelect: function(t) {
            var r = this.settings,
            u = {},
            h, c, i, o, e, f, s;
            for (h in this.queueData.files) if (u = this.queueData.files[h], u.uploaded != !0 && u.name == t.name) if (c = confirm('The file named "' + t.name + '" is already in the queue.\nDo you want to replace the existing item in the queue?'), c) n("#" + u.id).remove(),
            this.cancelUpload(u.id),
            this.queueData.filesReplaced++;
            else return this.cancelUpload(t.id),
            this.queueData.filesCancelled++,
            !1;
            if (i = Math.round(t.size / 1024), o = "KB", i > 1e3 && (i = Math.round(i / 1e3), o = "MB"), e = i.toString().split("."), i = e[0], e.length > 1 && (i += "." + e[1].substr(0, 2)), i += o, f = t.name, f.length > 25 && (f = f.substr(0, 25) + "..."), itemData = {
                fileID: t.id,
                instanceID: r.id,
                fileName: f,
                fileSize: i
            },
            r.itemTemplate == !1 && (r.itemTemplate = '<div id="${fileID}" class="uploadify-queue-item">\t\t\t\t\t<div class="cancel">\t\t\t\t\t\t<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X<\/a>\t\t\t\t\t<\/div>\t\t\t\t\t<span class="fileName">${fileName} (${fileSize})<\/span><span class="data"><\/span>\t\t\t\t\t<div class="uploadify-progress">\t\t\t\t\t\t<div class="uploadify-progress-bar"><!--Progress Bar--><\/div>\t\t\t\t\t<\/div>\t\t\t\t<\/div>'), n.inArray("onSelect", r.overrideEvents) < 0) {
                itemHTML = r.itemTemplate;
                for (s in itemData) itemHTML = itemHTML.replace(new RegExp("\\$\\{" + s + "\\}", "g"), itemData[s]);
                n("#" + r.queueID).append(itemHTML)
            }
            this.queueData.queueSize += t.size;
            this.queueData.files[t.id] = t;
            r.onSelect && r.onSelect.apply(this, arguments)
        },
        onSelectError: function(t, i, r) {
            var u = this.settings;
            if (n.inArray("onSelectError", u.overrideEvents) < 0) switch (i) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                this.queueData.errorMsg += u.queueSizeLimit > r ? "\nThe number of files selected exceeds the remaining upload limit (" + r + ").": "\nThe number of files selected exceeds the queue size limit (" + u.queueSizeLimit + ").";
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                this.queueData.errorMsg += '\nThe file "' + t.name + '" exceeds the size limit (' + u.fileSizeLimit + ").";
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                this.queueData.errorMsg += '\nThe file "' + t.name + '" is empty.';
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                this.queueData.errorMsg += '\nThe file "' + t.name + '" is not an accepted file type (' + u.fileTypeDesc + ")."
            }
            i != SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED && delete this.queueData.files[t.id];
            u.onSelectError && u.onSelectError.apply(this, arguments)
        },
        onQueueComplete: function() {
            this.settings.onQueueComplete && this.settings.onQueueComplete.call(this, this.settings.queueData)
        },
        onUploadComplete: function(t) {
            var i = this.settings,
            r = this,
            u = this.getStats();
            if (this.queueData.queueLength = u.files_queued, this.queueData.uploadQueue[0] == "*" ? this.queueData.queueLength > 0 ? this.startUpload() : (this.queueData.uploadQueue = [], i.onQueueComplete && i.onQueueComplete.call(this, this.queueData)) : this.queueData.uploadQueue.length > 0 ? this.startUpload(this.queueData.uploadQueue.shift()) : (this.queueData.uploadQueue = [], i.onQueueComplete && i.onQueueComplete.call(this, this.queueData)), n.inArray("onUploadComplete", i.overrideEvents) < 0) if (i.removeCompleted) switch (t.filestatus) {
            case SWFUpload.FILE_STATUS.COMPLETE:
                setTimeout(function() {
                    n("#" + t.id) && (r.queueData.queueSize -= t.size, r.queueData.queueLength -= 1, delete r.queueData.files[t.id], n("#" + t.id).fadeOut(500,
                    function() {
                        n(this).remove()
                    }))
                },
                i.removeTimeout * 1e3);
                break;
            case SWFUpload.FILE_STATUS.ERROR:
                i.requeueErrors || setTimeout(function() {
                    n("#" + t.id) && (r.queueData.queueSize -= t.size, r.queueData.queueLength -= 1, delete r.queueData.files[t.id], n("#" + t.id).fadeOut(500,
                    function() {
                        n(this).remove()
                    }))
                },
                i.removeTimeout * 1e3)
            } else t.uploaded = !0;
            i.onUploadComplete && i.onUploadComplete.call(this, t)
        },
        onUploadError: function(t, i, r) {
            var f = this.settings,
            u = "Error",
            e;
            switch (i) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                u = "HTTP Error (" + r + ")";
                break;
            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                u = "Missing Upload URL";
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                u = "IO Error";
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                u = "Security Error";
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                alert("The upload limit has been reached (" + r + ").");
                u = "Exceeds Upload Limit";
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                u = "Failed";
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                u = "Validation Error";
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                u = "Cancelled";
                this.queueData.queueSize -= t.size;
                this.queueData.queueLength -= 1; (t.status == SWFUpload.FILE_STATUS.IN_PROGRESS || n.inArray(t.id, this.queueData.uploadQueue) >= 0) && (this.queueData.uploadSize -= t.size);
                f.onCancel && f.onCancel.call(this, t);
                delete this.queueData.files[t.id];
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                u = "Stopped"
            }
            n.inArray("onUploadError", f.overrideEvents) < 0 && (i != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED && i != SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED && n("#" + t.id).addClass("uploadify-error"), n("#" + t.id).find(".uploadify-progress-bar").css("width", "1px"), i != SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND && t.status != SWFUpload.FILE_STATUS.COMPLETE && n("#" + t.id).find(".data").html(" - " + u));
            e = this.getStats();
            this.queueData.uploadsErrored = e.upload_errors;
            f.onUploadError && f.onUploadError.call(this, t, i, r, u)
        },
        onUploadProgress: function(t, i, r) {
            var f = this.settings,
            a = new Date,
            o = a.getTime(),
            e = o - this.timer,
            s;
            e > 500 && (this.timer = o);
            s = i - this.bytesLoaded;
            this.bytesLoaded = i;
            var v = this.queueData.queueBytesUploaded + i,
            h = Math.round(i / r * 100),
            c = "KB/s",
            l = 0,
            u = s / 1024 / (e / 1e3);
            u = Math.floor(u * 10) / 10;
            this.queueData.averageSpeed = this.queueData.averageSpeed > 0 ? Math.floor((this.queueData.averageSpeed + u) / 2) : Math.floor(u);
            u > 1e3 && (l = u * .001, this.queueData.averageSpeed = Math.floor(l), c = "MB/s");
            n.inArray("onUploadProgress", f.overrideEvents) < 0 && (f.progressData == "percentage" ? n("#" + t.id).find(".data").html(" - " + h + "%") : f.progressData == "speed" && e > 500 && n("#" + t.id).find(".data").html(" - " + this.queueData.averageSpeed + c), n("#" + t.id).find(".uploadify-progress-bar").css("width", h + "%"));
            f.onUploadProgress && f.onUploadProgress.call(this, t, i, r, v, this.queueData.uploadSize)
        },
        onUploadStart: function(t) {
            var i = this.settings,
            r = new Date;
            this.timer = r.getTime();
            this.bytesLoaded = 0;
            this.queueData.uploadQueue.length == 0 && (this.queueData.uploadSize = t.size);
            i.checkExisting && n.ajax({
                type: "POST",
                async: !1,
                url: i.checkExisting,
                data: {
                    filename: t.name
                },
                success: function(i) {
                    if (i == 1) {
                        var r = confirm('A file with the name "' + t.name + '" already exists on the server.\nWould you like to replace the existing file?');
                        r || (this.cancelUpload(t.id), n("#" + t.id).remove(), this.queueData.uploadQueue.length > 0 && this.queueData.queueLength > 0 && (this.queueData.uploadQueue[0] == "*" ? this.startUpload() : this.startUpload(this.queueData.uploadQueue.shift())))
                    }
                }
            });
            i.onUploadStart && i.onUploadStart.call(this, t)
        },
        onUploadSuccess: function(t, i, r) {
            var u = this.settings,
            f = this.getStats();
            this.queueData.uploadsSuccessful = f.successful_uploads;
            this.queueData.queueBytesUploaded += t.size;
            n.inArray("onUploadSuccess", u.overrideEvents) < 0 && n("#" + t.id).find(".data").html(" - Complete");
            u.onUploadSuccess && u.onUploadSuccess.call(this, t, i, r)
        }
    };
    n.fn.uploadify = function(t) {
        if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t != "object" && t) n.error("The method " + t + " does not exist in $.uploadify");
        else return i.init.apply(this, arguments)
    }
} ($)