﻿(function (n, t, i) {
    function v(t, i) {
        var u, f;
        if (n.isArray(t)) {
            for (u = t.length - 1; u >= 0; u--) f = t[u],
            n.type(f) === "string" && r.transports[f] || (i.log("Invalid transport: " + f + ", removing it from the transports list."), t.splice(u, 1));
            t.length === 0 && (i.log("No transports remain within the specified transport array."), t = null)
        } else if (r.transports[t] || t === "auto") {
            if (t === "auto" && r._.ieVersion <= 8) return ["longPolling"]
        } else i.log("Invalid transport: " + t.toString() + "."),
        t = null;
        return t
    }
    function y(n) {
        return n === "http:" ? 80 : n === "https:" ? 443 : void 0
    }
    function h(n, t) {
        return t.match(/:\d+$/) ? t : t + ":" + y(n)
    }
    function p(t, i) {
        var u = this,
        r = [];
        u.tryBuffer = function (i) {
            return t.state === n.signalR.connectionState.connecting ? (r.push(i), !0) : !1
        };
        u.drain = function () {
            if (t.state === n.signalR.connectionState.connected) while (r.length > 0) i(r.shift())
        };
        u.clear = function () {
            r = []
        }
    }
    var f = {
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
        noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
        errorOnNegotiate: "Error during negotiation request.",
        stoppedWhileLoading: "The connection was stopped during page load.",
        stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
        errorParsingNegotiateResponse: "Error parsing negotiate response.",
        errorDuringStartRequest: "Error during start request. Stopping the connection.",
        stoppedDuringStartRequest: "The connection was stopped during the start request.",
        errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
        invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
        protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
        sendFailed: "Send failed.",
        parseFailed: "Failed at parsing response: {0}",
        longPollFailed: "Long polling request failed.",
        eventSourceFailedToConnect: "EventSource failed to connect.",
        eventSourceError: "Error raised by EventSource",
        webSocketClosed: "WebSocket closed.",
        pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
        pingServerFailed: "Failed to ping server.",
        pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
        pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
        noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
        webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
        reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
        reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
    };
    if (typeof n != "function") throw new Error(f.nojQuery);
    var r, c, s = t.document.readyState === "complete",
    e = n(t),
    l = "__Negotiate Aborted__",
    u = {
        onStart: "onStart",
        onStarting: "onStarting",
        onReceived: "onReceived",
        onError: "onError",
        onConnectionSlow: "onConnectionSlow",
        onReconnecting: "onReconnecting",
        onReconnect: "onReconnect",
        onStateChanged: "onStateChanged",
        onDisconnect: "onDisconnect"
    },
    w = function (n, i) {
        if (i !== !1) {
            var r;
            typeof t.console != "undefined" && (r = "[" + (new Date).toTimeString() + "] SignalR: " + n, t.console.debug ? t.console.debug(r) : t.console.log && t.console.log(r))
        }
    },
    o = function (t, i, r) {
        return i === t.state ? (t.state = r, n(t).triggerHandler(u.onStateChanged, [{
            oldState: i,
            newState: r
        }]), !0) : !1
    },
    b = function (n) {
        return n.state === r.connectionState.disconnected
    },
    a = function (n) {
        return n._.keepAliveData.activated && n.transport.supportsKeepAlive(n)
    },
    k = function (i) {
        var f, e;
        i._.configuredStopReconnectingTimeout || (e = function (t) {
            var i = r._.format(r.resources.reconnectTimeout, t.disconnectTimeout);
            t.log(i);
            n(t).triggerHandler(u.onError, [r._.error(i, "TimeoutException")]);
            t.stop(!1, !1)
        },
        i.reconnecting(function () {
            var n = this;
            n.state === r.connectionState.reconnecting && (f = t.setTimeout(function () {
                e(n)
            },
            n.disconnectTimeout))
        }), i.stateChanged(function (n) {
            n.oldState === r.connectionState.reconnecting && t.clearTimeout(f)
        }), i._.configuredStopReconnectingTimeout = !0)
    };
    r = function (n, t, i) {
        return new r.fn.init(n, t, i)
    };
    r._ = {
        defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",
        ieVersion: function () {
            var i, n;
            return t.navigator.appName === "Microsoft Internet Explorer" && (n = /MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent), n && (i = t.parseFloat(n[1]))),
            i
        }(),
        error: function (n, t, i) {
            var r = new Error(n);
            return r.source = t,
            typeof i != "undefined" && (r.context = i),
            r
        },
        transportError: function (n, t, r, u) {
            var f = this.error(n, r, u);
            return f.transport = t ? t.name : i,
            f
        },
        format: function () {
            for (var t = arguments[0], n = 0; n < arguments.length - 1; n++) t = t.replace("{" + n + "}", arguments[n + 1]);
            return t
        },
        firefoxMajorVersion: function (n) {
            var t = n.match(/Firefox\/(\d+)/);
            return !t || !t.length || t.length < 2 ? 0 : parseInt(t[1], 10)
        },
        configurePingInterval: function (i) {
            var f = i._.config,
            e = function (t) {
                n(i).triggerHandler(u.onError, [t])
            };
            f && !i._.pingIntervalId && f.pingInterval && (i._.pingIntervalId = t.setInterval(function () {
                r.transports._logic.pingServer(i).fail(e)
            },
            f.pingInterval))
        }
    };
    r.events = u;
    r.resources = f;
    r.ajaxDefaults = {
        processData: !0,
        timeout: null,
        async: !0,
        global: !1,
        cache: !1
    };
    r.changeState = o;
    r.isDisconnecting = b;
    r.connectionState = {
        connecting: 0,
        connected: 1,
        reconnecting: 2,
        disconnected: 4
    };
    r.hub = {
        start: function () {
            throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.");
        }
    };
    e.load(function () {
        s = !0
    });
    r.fn = r.prototype = {
        init: function (t, i, r) {
            var f = n(this);
            this.url = t;
            this.qs = i;
            this.lastError = null;
            this._ = {
                keepAliveData: {},
                connectingMessageBuffer: new p(this,
                function (n) {
                    f.triggerHandler(u.onReceived, [n])
                }),
                lastMessageAt: (new Date).getTime(),
                lastActiveAt: (new Date).getTime(),
                beatInterval: 5e3,
                beatHandle: null,
                totalTransportConnectTimeout: 0
            };
            typeof r == "boolean" && (this.logging = r)
        },
        _parseResponse: function (n) {
            var t = this;
            return n ? typeof n == "string" ? t.json.parse(n) : n : n
        },
        _originalJson: t.JSON,
        json: t.JSON,
        isCrossDomain: function (i, r) {
            var u;
            return (i = n.trim(i), r = r || t.location, i.indexOf("http") !== 0) ? !1 : (u = t.document.createElement("a"), u.href = i, u.protocol + h(u.protocol, u.host) !== r.protocol + h(r.protocol, r.host))
        },
        ajaxDataType: "text",
        contentType: "application/json; charset=UTF-8",
        logging: !1,
        state: r.connectionState.disconnected,
        clientProtocol: "1.5",
        reconnectDelay: 2e3,
        transportConnectTimeout: 0,
        disconnectTimeout: 3e4,
        reconnectWindow: 3e4,
        keepAliveWarnAt: 2 / 3,
        start: function (i, h) {
            var c = this,
            y = {
                pingInterval: 3e5,
                waitForPageLoad: !0,
                transport: "auto",
                jsonp: !1
            },
            d,
            p = c._deferral || n.Deferred(),
            w = t.document.createElement("a"),
            b,
            g;
            if (c.lastError = null, c._deferral = p, !c.json) throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
            if (n.type(i) === "function" ? h = i : n.type(i) === "object" && (n.extend(y, i), n.type(y.callback) === "function" && (h = y.callback)), y.transport = v(y.transport, c), !y.transport) throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
            return (c._.config = y, !s && y.waitForPageLoad === !0) ? (c._.deferredStartHandler = function () {
                c.start(i, h)
            },
            e.bind("load", c._.deferredStartHandler), p.promise()) : c.state === r.connectionState.connecting ? p.promise() : o(c, r.connectionState.disconnected, r.connectionState.connecting) === !1 ? (p.resolve(c), p.promise()) : (k(c), w.href = c.url, w.protocol && w.protocol !== ":" ? (c.protocol = w.protocol, c.host = w.host) : (c.protocol = t.document.location.protocol, c.host = w.host || t.document.location.host), c.baseUrl = c.protocol + "//" + c.host, c.wsProtocol = c.protocol === "https:" ? "wss://" : "ws://", y.transport === "auto" && y.jsonp === !0 && (y.transport = "longPolling"), c.url.indexOf("//") === 0 && (c.url = t.location.protocol + c.url, c.log("Protocol relative URL detected, normalizing it to '" + c.url + "'.")), this.isCrossDomain(c.url) && (c.log("Auto detected cross domain url."), y.transport === "auto" && (y.transport = ["webSockets", "serverSentEvents", "longPolling"]), typeof y.withCredentials == "undefined" && (y.withCredentials = !0), y.jsonp || (y.jsonp = !n.support.cors, y.jsonp && c.log("Using jsonp because this browser doesn't support CORS.")), c.contentType = r._.defaultContentType), c.withCredentials = y.withCredentials, c.ajaxDataType = y.jsonp ? "jsonp" : "text", n(c).bind(u.onStart,
            function () {
                n.type(h) === "function" && h.call(c);
                p.resolve(c)
            }), c._.initHandler = r.transports._logic.initHandler(c), d = function (i, s) {
                var l = r._.error(f.noTransportOnInit);
                if (s = s || 0, s >= i.length) {
                    s === 0 ? c.log("No transports supported by the server were selected.") : s === 1 ? c.log("No fallback transports were selected.") : c.log("Fallback transports exhausted.");
                    n(c).triggerHandler(u.onError, [l]);
                    p.reject(l);
                    c.stop();
                    return
                }
                if (c.state !== r.connectionState.disconnected) {
                    var y = i[s],
                    h = r.transports[y],
                    v = function () {
                        d(i, s + 1)
                    };
                    c.transport = h;
                    try {
                        c._.initHandler.start(h,
                        function () {
                            var i = r._.firefoxMajorVersion(t.navigator.userAgent) >= 11,
                            f = !!c.withCredentials && i;
                            c.log("The start request succeeded. Transitioning to the connected state.");
                            a(c) && r.transports._logic.monitorKeepAlive(c);
                            r.transports._logic.startHeartbeat(c);
                            r._.configurePingInterval(c);
                            o(c, r.connectionState.connecting, r.connectionState.connected) || c.log("WARNING! The connection was not in the connecting state.");
                            c._.connectingMessageBuffer.drain();
                            n(c).triggerHandler(u.onStart);
                            e.bind("unload",
                            function () {
                                c.log("Window unloading, stopping the connection.");
                                c.stop(f)
                            });
                            i && e.bind("beforeunload",
                            function () {
                                t.setTimeout(function () {
                                    c.stop(f)
                                },
                                0)
                            })
                        },
                        v)
                    } catch (w) {
                        c.log(h.name + " transport threw '" + w.message + "' when attempting to start.");
                        v()
                    }
                }
            },
            b = c.url + "/negotiate", g = function (t, i) {
                var e = r._.error(f.errorOnNegotiate, t, i._.negotiateRequest);
                n(i).triggerHandler(u.onError, e);
                p.reject(e);
                i.stop()
            },
            n(c).triggerHandler(u.onStarting), b = r.transports._logic.prepareQueryString(c, b), c.log("Negotiating with '" + b + "'."), c._.negotiateRequest = r.transports._logic.ajax(c, {
                url: b,
                error: function (n, t) {
                    t !== l ? g(n, c) : p.reject(r._.error(f.stoppedWhileNegotiating, null, c._.negotiateRequest))
                },
                success: function (t) {
                    var i, e, h, o = [],
                    s = [];
                    try {
                        i = c._parseResponse(t)
                    } catch (l) {
                        g(r._.error(f.errorParsingNegotiateResponse, l), c);
                        return
                    }
                    if (e = c._.keepAliveData, c.appRelativeUrl = i.Url, c.id = i.ConnectionId, c.token = i.ConnectionToken, c.webSocketServerUrl = i.WebSocketServerUrl, c._.pollTimeout = i.ConnectionTimeout * 1e3 + 1e4, c.disconnectTimeout = i.DisconnectTimeout * 1e3, c._.totalTransportConnectTimeout = c.transportConnectTimeout + i.TransportConnectTimeout * 1e3, i.KeepAliveTimeout ? (e.activated = !0, e.timeout = i.KeepAliveTimeout * 1e3, e.timeoutWarning = e.timeout * c.keepAliveWarnAt, c._.beatInterval = (e.timeout - e.timeoutWarning) / 3) : e.activated = !1, c.reconnectWindow = c.disconnectTimeout + (e.timeout || 0), !i.ProtocolVersion || i.ProtocolVersion !== c.clientProtocol) {
                        h = r._.error(r._.format(f.protocolIncompatible, c.clientProtocol, i.ProtocolVersion));
                        n(c).triggerHandler(u.onError, [h]);
                        p.reject(h);
                        return
                    }
                    n.each(r.transports,
                    function (n) {
                        if (n.indexOf("_") === 0 || n === "webSockets" && !i.TryWebSockets) return !0;
                        s.push(n)
                    });
                    n.isArray(y.transport) ? n.each(y.transport,
                    function (t, i) {
                        n.inArray(i, s) >= 0 && o.push(i)
                    }) : y.transport === "auto" ? o = s : n.inArray(y.transport, s) >= 0 && o.push(y.transport);
                    d(o)
                }
            }), p.promise())
        },
        starting: function (t) {
            var i = this;
            return n(i).bind(u.onStarting,
            function () {
                t.call(i)
            }),
            i
        },
        send: function (n) {
            var t = this;
            if (t.state === r.connectionState.disconnected) throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
            if (t.state === r.connectionState.connecting) throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
            return t.transport.send(t, n),
            t
        },
        received: function (t) {
            var i = this;
            return n(i).bind(u.onReceived,
            function (n, r) {
                t.call(i, r)
            }),
            i
        },
        stateChanged: function (t) {
            var i = this;
            return n(i).bind(u.onStateChanged,
            function (n, r) {
                t.call(i, r)
            }),
            i
        },
        error: function (t) {
            var i = this;
            return n(i).bind(u.onError,
            function (n, r, u) {
                i.lastError = r;
                t.call(i, r, u)
            }),
            i
        },
        disconnected: function (t) {
            var i = this;
            return n(i).bind(u.onDisconnect,
            function () {
                t.call(i)
            }),
            i
        },
        connectionSlow: function (t) {
            var i = this;
            return n(i).bind(u.onConnectionSlow,
            function () {
                t.call(i)
            }),
            i
        },
        reconnecting: function (t) {
            var i = this;
            return n(i).bind(u.onReconnecting,
            function () {
                t.call(i)
            }),
            i
        },
        reconnected: function (t) {
            var i = this;
            return n(i).bind(u.onReconnect,
            function () {
                t.call(i)
            }),
            i
        },
        stop: function (i, h) {
            var c = this,
            v = c._deferral;
            if (c._.deferredStartHandler && e.unbind("load", c._.deferredStartHandler), delete c._.config, delete c._.deferredStartHandler, !s && (!c._.config || c._.config.waitForPageLoad === !0)) {
                c.log("Stopping connection prior to negotiate.");
                v && v.reject(r._.error(f.stoppedWhileLoading));
                return
            }
            if (c.state !== r.connectionState.disconnected) return c.log("Stopping connection."),
            o(c, c.state, r.connectionState.disconnected),
            t.clearTimeout(c._.beatHandle),
            t.clearInterval(c._.pingIntervalId),
            c.transport && (c.transport.stop(c), h !== !1 && c.transport.abort(c, i), a(c) && r.transports._logic.stopMonitoringKeepAlive(c), c.transport = null),
            c._.negotiateRequest && (c._.negotiateRequest.abort(l), delete c._.negotiateRequest),
            c._.initHandler && c._.initHandler.stop(),
            n(c).triggerHandler(u.onDisconnect),
            delete c._deferral,
            delete c.messageId,
            delete c.groupsToken,
            delete c.id,
            delete c._.pingIntervalId,
            delete c._.lastMessageAt,
            delete c._.lastActiveAt,
            c._.connectingMessageBuffer.clear(),
            c
        },
        log: function (n) {
            w(n, this.logging)
        }
    };
    r.fn.init.prototype = r.fn;
    r.noConflict = function () {
        return n.connection === r && (n.connection = c),
        r
    };
    n.connection && (c = n.connection);
    n.connection = n.signalR = r
})(window.jQuery, window),
function (n, t, i) {
    function o(n) {
        n._.keepAliveData.monitoring && c(n);
        u.markActive(n) && (n._.beatHandle = t.setTimeout(function () {
            o(n)
        },
        n._.beatInterval))
    }
    function c(t) {
        var i = t._.keepAliveData,
        u;
        t.state === r.connectionState.connected && (u = (new Date).getTime() - t._.lastMessageAt, u >= i.timeout ? (t.log("Keep alive timed out.  Notifying transport that connection has been lost."), t.transport.lostConnection(t)) : u >= i.timeoutWarning ? i.userNotified || (t.log("Keep alive has been missed, connection may be dead/slow."), n(t).triggerHandler(f.onConnectionSlow), i.userNotified = !0) : i.userNotified = !1)
    }
    function e(n, t) {
        var i = n.url + t;
        return n.transport && (i += "?transport=" + n.transport.name),
        u.prepareQueryString(n, i)
    }
    function s(n) {
        this.connection = n;
        this.startRequested = !1;
        this.startCompleted = !1;
        this.connectionStopped = !1
    }
    var r = n.signalR,
    f = n.signalR.events,
    l = n.signalR.changeState,
    h = "__Start Aborted__",
    u;
    r.transports = {};
    s.prototype = {
        start: function (n, r, u) {
            var f = this,
            e = f.connection,
            o = !1;
            if (f.startRequested || f.connectionStopped) {
                e.log("WARNING! " + n.name + " transport cannot be started. Initialization ongoing or completed.");
                return
            }
            e.log(n.name + " transport starting.");
            f.transportTimeoutHandle = t.setTimeout(function () {
                o || (o = !0, e.log(n.name + " transport timed out when trying to connect."), f.transportFailed(n, i, u))
            },
            e._.totalTransportConnectTimeout);
            n.start(e,
            function () {
                o || f.initReceived(n, r)
            },
            function (t) {
                return o || (o = !0, f.transportFailed(n, t, u)),
                !f.startCompleted || f.connectionStopped
            })
        },
        stop: function () {
            this.connectionStopped = !0;
            t.clearTimeout(this.transportTimeoutHandle);
            r.transports._logic.tryAbortStartRequest(this.connection)
        },
        initReceived: function (n, i) {
            var u = this,
            f = u.connection;
            if (u.startRequested) {
                f.log("WARNING! The client received multiple init messages.");
                return
            }
            u.connectionStopped || (u.startRequested = !0, t.clearTimeout(u.transportTimeoutHandle), f.log(n.name + " transport connected. Initiating start request."), r.transports._logic.ajaxStart(f,
            function () {
                u.startCompleted = !0;
                i()
            }))
        },
        transportFailed: function (i, u, e) {
            var o = this.connection,
            h = o._deferral,
            s;
            this.connectionStopped || (t.clearTimeout(this.transportTimeoutHandle), this.startRequested ? this.startCompleted || (s = r._.error(r.resources.errorDuringStartRequest, u), o.log(i.name + " transport failed during the start request. Stopping the connection."), n(o).triggerHandler(f.onError, [s]), h && h.reject(s), o.stop()) : (i.stop(o), o.log(i.name + " transport failed to connect. Attempting to fall back."), e()))
        }
    };
    u = r.transports._logic = {
        ajax: function (t, i) {
            return n.ajax(n.extend(!0, {},
            n.signalR.ajaxDefaults, {
                type: "GET",
                data: {},
                xhrFields: {
                    withCredentials: t.withCredentials
                },
                contentType: t.contentType,
                dataType: t.ajaxDataType
            },
            i))
        },
        pingServer: function (t) {
            var e, f, i = n.Deferred();
            return t.transport ? (e = t.url + "/ping", e = u.addQs(e, t.qs), f = u.ajax(t, {
                url: e,
                success: function (n) {
                    var u;
                    try {
                        u = t._parseResponse(n)
                    } catch (e) {
                        i.reject(r._.transportError(r.resources.pingServerFailedParse, t.transport, e, f));
                        t.stop();
                        return
                    }
                    u.Response === "pong" ? i.resolve() : i.reject(r._.transportError(r._.format(r.resources.pingServerFailedInvalidResponse, n), t.transport, null, f))
                },
                error: function (n) {
                    n.status === 401 || n.status === 403 ? (i.reject(r._.transportError(r._.format(r.resources.pingServerFailedStatusCode, n.status), t.transport, n, f)), t.stop()) : i.reject(r._.transportError(r.resources.pingServerFailed, t.transport, n, f))
                }
            })) : i.reject(r._.transportError(r.resources.noConnectionTransport, t.transport)),
            i.promise()
        },
        prepareQueryString: function (n, i) {
            var r;
            return r = u.addQs(i, "clientProtocol=" + n.clientProtocol),
            r = u.addQs(r, n.qs),
            n.token && (r += "&connectionToken=" + t.encodeURIComponent(n.token)),
            n.data && (r += "&connectionData=" + t.encodeURIComponent(n.data)),
            r
        },
        addQs: function (t, i) {
            var r = t.indexOf("?") !== -1 ? "&" : "?",
            u;
            if (!i) return t;
            if (typeof i == "object") return t + r + n.param(i);
            if (typeof i == "string") return u = i.charAt(0),
            (u === "?" || u === "&") && (r = ""),
            t + r + i;
            throw new Error("Query string property must be either a string or object.");
        },
        getUrl: function (n, i, r, f, e) {
            var h = i === "webSockets" ? "" : n.baseUrl,
            o = h + n.appRelativeUrl,
            s = "transport=" + i;
            return !e && n.groupsToken && (s += "&groupsToken=" + t.encodeURIComponent(n.groupsToken)),
            r ? (o += f ? "/poll" : "/reconnect", !e && n.messageId && (s += "&messageId=" + t.encodeURIComponent(n.messageId))) : o += "/connect",
            o += "?" + s,
            o = u.prepareQueryString(n, o),
            e || (o += "&tid=" + Math.floor(Math.random() * 11)),
            o
        },
        maximizePersistentResponse: function (n) {
            return {
                MessageId: n.C,
                Messages: n.M,
                Initialized: typeof n.S != "undefined" ? !0 : !1,
                ShouldReconnect: typeof n.T != "undefined" ? !0 : !1,
                LongPollDelay: n.L,
                GroupsToken: n.G
            }
        },
        updateGroups: function (n, t) {
            t && (n.groupsToken = t)
        },
        stringifySend: function (n, t) {
            return typeof t == "string" || typeof t == "undefined" || t === null ? t : n.json.stringify(t)
        },
        ajaxSend: function (t, i) {
            var h = u.stringifySend(t, i),
            c = e(t, "/send"),
            o,
            s = function (t, u) {
                n(u).triggerHandler(f.onError, [r._.transportError(r.resources.sendFailed, u.transport, t, o), i])
            };
            return o = u.ajax(t, {
                url: c,
                type: t.ajaxDataType === "jsonp" ? "GET" : "POST",
                contentType: r._.defaultContentType,
                data: {
                    data: h
                },
                success: function (n) {
                    var i;
                    if (n) {
                        try {
                            i = t._parseResponse(n)
                        } catch (r) {
                            s(r, t);
                            t.stop();
                            return
                        }
                        u.triggerReceived(t, i)
                    }
                },
                error: function (n, i) {
                    i !== "abort" && i !== "parsererror" && s(n, t)
                }
            })
        },
        ajaxAbort: function (n, t) {
            if (typeof n.transport != "undefined") {
                t = typeof t == "undefined" ? !0 : t;
                var i = e(n, "/abort");
                u.ajax(n, {
                    url: i,
                    async: t,
                    timeout: 1e3,
                    type: "POST"
                });
                n.log("Fired ajax abort async = " + t + ".")
            }
        },
        ajaxStart: function (t, i) {
            var s = function (n) {
                var i = t._deferral;
                i && i.reject(n)
            },
            o = function (i) {
                t.log("The start request failed. Stopping the connection.");
                n(t).triggerHandler(f.onError, [i]);
                s(i);
                t.stop()
            };
            t._.startRequest = u.ajax(t, {
                url: e(t, "/start"),
                success: function (n, u, f) {
                    var e;
                    try {
                        e = t._parseResponse(n)
                    } catch (s) {
                        o(r._.error(r._.format(r.resources.errorParsingStartResponse, n), s, f));
                        return
                    }
                    e.Response === "started" ? i() : o(r._.error(r._.format(r.resources.invalidStartResponse, n), null, f))
                },
                error: function (n, i, u) {
                    i !== h ? o(r._.error(r.resources.errorDuringStartRequest, u, n)) : (t.log("The start request aborted because connection.stop() was called."), s(r._.error(r.resources.stoppedDuringStartRequest, null, n)))
                }
            })
        },
        tryAbortStartRequest: function (n) {
            n._.startRequest && (n._.startRequest.abort(h), delete n._.startRequest)
        },
        tryInitialize: function (n, t) {
            n.Initialized && t()
        },
        triggerReceived: function (t, i) {
            t._.connectingMessageBuffer.tryBuffer(i) || n(t).triggerHandler(f.onReceived, [i])
        },
        processMessages: function (t, i, r) {
            var f;
            u.markLastMessage(t);
            i && (f = u.maximizePersistentResponse(i), u.updateGroups(t, f.GroupsToken), f.MessageId && (t.messageId = f.MessageId), f.Messages && (n.each(f.Messages,
            function (n, i) {
                u.triggerReceived(t, i)
            }), u.tryInitialize(f, r)))
        },
        monitorKeepAlive: function (t) {
            var i = t._.keepAliveData;
            i.monitoring ? t.log("Tried to monitor keep alive but it's already being monitored.") : (i.monitoring = !0, u.markLastMessage(t), t._.keepAliveData.reconnectKeepAliveUpdate = function () {
                u.markLastMessage(t)
            },
            n(t).bind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t.log("Now monitoring keep alive with a warning timeout of " + i.timeoutWarning + ", keep alive timeout of " + i.timeout + " and disconnecting timeout of " + t.disconnectTimeout))
        },
        stopMonitoringKeepAlive: function (t) {
            var i = t._.keepAliveData;
            i.monitoring && (i.monitoring = !1, n(t).unbind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t._.keepAliveData = {},
            t.log("Stopping the monitoring of the keep alive."))
        },
        startHeartbeat: function (n) {
            n._.lastActiveAt = (new Date).getTime();
            o(n)
        },
        markLastMessage: function (n) {
            n._.lastMessageAt = (new Date).getTime()
        },
        markActive: function (n) {
            return u.verifyLastActive(n) ? (n._.lastActiveAt = (new Date).getTime(), !0) : !1
        },
        isConnectedOrReconnecting: function (n) {
            return n.state === r.connectionState.connected || n.state === r.connectionState.reconnecting
        },
        ensureReconnectingState: function (t) {
            return l(t, r.connectionState.connected, r.connectionState.reconnecting) === !0 && n(t).triggerHandler(f.onReconnecting),
            t.state === r.connectionState.reconnecting
        },
        clearReconnectTimeout: function (n) {
            n && n._.reconnectTimeout && (t.clearTimeout(n._.reconnectTimeout), delete n._.reconnectTimeout)
        },
        verifyLastActive: function (t) {
            if ((new Date).getTime() - t._.lastActiveAt >= t.reconnectWindow) {
                var i = r._.format(r.resources.reconnectWindowTimeout, new Date(t._.lastActiveAt), t.reconnectWindow);
                return t.log(i),
                n(t).triggerHandler(f.onError, [r._.error(i, "TimeoutException")]),
                t.stop(!1, !1),
                !1
            }
            return !0
        },
        reconnect: function (n, i) {
            var f = r.transports[i];
            if (u.isConnectedOrReconnecting(n) && !n._.reconnectTimeout) {
                if (!u.verifyLastActive(n)) return;
                n._.reconnectTimeout = t.setTimeout(function () {
                    u.verifyLastActive(n) && (f.stop(n), u.ensureReconnectingState(n) && (n.log(i + " reconnecting."), f.start(n)))
                },
                n.reconnectDelay)
            }
        },
        handleParseFailure: function (t, i, u, e, o) {
            var s = r._.transportError(r._.format(r.resources.parseFailed, i), t.transport, u, o);
            e && e(s) ? t.log("Failed to parse server response while attempting to connect.") : (n(t).triggerHandler(f.onError, [s]), t.stop())
        },
        initHandler: function (n) {
            return new s(n)
        },
        foreverFrame: {
            count: 0,
            connections: {}
        }
    }
}(window.jQuery, window),
function (n, t) {
    var r = n.signalR,
    u = n.signalR.events,
    f = n.signalR.changeState,
    i = r.transports._logic;
    r.transports.webSockets = {
        name: "webSockets",
        supportsKeepAlive: function () {
            return !0
        },
        send: function (t, f) {
            var e = i.stringifySend(t, f);
            try {
                t.socket.send(e)
            } catch (o) {
                n(t).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketsInvalidState, t.transport, o, t.socket), f])
            }
        },
        start: function (e, o, s) {
            var h, c = !1,
            l = this,
            a = !o,
            v = n(e);
            if (!t.WebSocket) {
                s();
                return
            }
            e.socket || (h = e.webSocketServerUrl ? e.webSocketServerUrl : e.wsProtocol + e.host, h += i.getUrl(e, this.name, a), e.log("Connecting to websocket endpoint '" + h + "'."), e.socket = new t.WebSocket(h), e.socket.onopen = function () {
                c = !0;
                e.log("Websocket opened.");
                i.clearReconnectTimeout(e);
                f(e, r.connectionState.reconnecting, r.connectionState.connected) === !0 && v.triggerHandler(u.onReconnect)
            },
            e.socket.onclose = function (t) {
                var i;
                this === e.socket && (c && typeof t.wasClean != "undefined" && t.wasClean === !1 ? (i = r._.transportError(r.resources.webSocketClosed, e.transport, t), e.log("Unclean disconnect from websocket: " + (t.reason || "[no reason given]."))) : e.log("Websocket closed."), s && s(i) || (i && n(e).triggerHandler(u.onError, [i]), l.reconnect(e)))
            },
            e.socket.onmessage = function (t) {
                var r;
                try {
                    r = e._parseResponse(t.data)
                } catch (u) {
                    i.handleParseFailure(e, t.data, u, s, t);
                    return
                }
                r && (n.isEmptyObject(r) || r.M ? i.processMessages(e, r, o) : i.triggerReceived(e, r))
            })
        },
        reconnect: function (n) {
            i.reconnect(n, this.name)
        },
        lostConnection: function (n) {
            this.reconnect(n)
        },
        stop: function (n) {
            i.clearReconnectTimeout(n);
            n.socket && (n.log("Closing the Websocket."), n.socket.close(), n.socket = null)
        },
        abort: function (n, t) {
            i.ajaxAbort(n, t)
        }
    }
}(window.jQuery, window),
function (n, t) {
    var i = n.signalR,
    u = n.signalR.events,
    e = n.signalR.changeState,
    r = i.transports._logic,
    f = function (n) {
        t.clearTimeout(n._.reconnectAttemptTimeoutHandle);
        delete n._.reconnectAttemptTimeoutHandle
    };
    i.transports.serverSentEvents = {
        name: "serverSentEvents",
        supportsKeepAlive: function () {
            return !0
        },
        timeOut: 3e3,
        start: function (o, s, h) {
            var c = this,
            l = !1,
            a = n(o),
            v = !s,
            y;
            if (o.eventSource && (o.log("The connection already has an event source. Stopping it."), o.stop()), !t.EventSource) {
                h && (o.log("This browser doesn't support SSE."), h());
                return
            }
            y = r.getUrl(o, this.name, v);
            try {
                o.log("Attempting to connect to SSE endpoint '" + y + "'.");
                o.eventSource = new t.EventSource(y, {
                    withCredentials: o.withCredentials
                })
            } catch (p) {
                o.log("EventSource failed trying to connect with error " + p.Message + ".");
                h ? h() : (a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceFailedToConnect, o.transport, p)]), v && c.reconnect(o));
                return
            }
            v && (o._.reconnectAttemptTimeoutHandle = t.setTimeout(function () {
                l === !1 && o.eventSource.readyState !== t.EventSource.OPEN && c.reconnect(o)
            },
            c.timeOut));
            o.eventSource.addEventListener("open",
            function () {
                o.log("EventSource connected.");
                f(o);
                r.clearReconnectTimeout(o);
                l === !1 && (l = !0, e(o, i.connectionState.reconnecting, i.connectionState.connected) === !0 && a.triggerHandler(u.onReconnect))
            },
            !1);
            o.eventSource.addEventListener("message",
            function (n) {
                var t;
                if (n.data !== "initialized") {
                    try {
                        t = o._parseResponse(n.data)
                    } catch (i) {
                        r.handleParseFailure(o, n.data, i, h, n);
                        return
                    }
                    r.processMessages(o, t, s)
                }
            },
            !1);
            o.eventSource.addEventListener("error",
            function (n) {
                var r = i._.transportError(i.resources.eventSourceError, o.transport, n);
                this === o.eventSource && (h && h(r) || (o.log("EventSource readyState: " + o.eventSource.readyState + "."), n.eventPhase === t.EventSource.CLOSED ? (o.log("EventSource reconnecting due to the server connection ending."), c.reconnect(o)) : (o.log("EventSource error."), a.triggerHandler(u.onError, [r]))))
            },
            !1)
        },
        reconnect: function (n) {
            r.reconnect(n, this.name)
        },
        lostConnection: function (n) {
            this.reconnect(n)
        },
        send: function (n, t) {
            r.ajaxSend(n, t)
        },
        stop: function (n) {
            f(n);
            r.clearReconnectTimeout(n);
            n && n.eventSource && (n.log("EventSource calling close()."), n.eventSource.close(), n.eventSource = null, delete n.eventSource)
        },
        abort: function (n, t) {
            r.ajaxAbort(n, t)
        }
    }
}(window.jQuery, window),
function (n, t) {
    var r = n.signalR,
    e = n.signalR.events,
    o = n.signalR.changeState,
    i = r.transports._logic,
    u = function () {
        var n = t.document.createElement("iframe");
        return n.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"),
        n
    },
    f = function () {
        var i = null,
        f = 1e3,
        n = 0;
        return {
            prevent: function () {
                r._.ieVersion <= 8 && (n === 0 && (i = t.setInterval(function () {
                    var n = u();
                    t.document.body.appendChild(n);
                    t.document.body.removeChild(n);
                    n = null
                },
                f)), n++)
            },
            cancel: function () {
                n === 1 && t.clearInterval(i);
                n > 0 && n--
            }
        }
    }();
    r.transports.foreverFrame = {
        name: "foreverFrame",
        supportsKeepAlive: function () {
            return !0
        },
        iframeClearThreshold: 50,
        start: function (n, r, e) {
            var l = this,
            s = i.foreverFrame.count += 1,
            h, o = u(),
            c = function () {
                n.log("Forever frame iframe finished loading and is no longer receiving messages.");
                e && e() || l.reconnect(n)
            };
            if (t.EventSource) {
                e && (n.log("Forever Frame is not supported by SignalR on browsers with SSE support."), e());
                return
            }
            o.setAttribute("data-signalr-connection-id", n.id);
            f.prevent();
            h = i.getUrl(n, this.name);
            h += "&frameId=" + s;
            t.document.documentElement.appendChild(o);
            n.log("Binding to iframe's load event.");
            o.addEventListener ? o.addEventListener("load", c, !1) : o.attachEvent && o.attachEvent("onload", c);
            o.src = h;
            i.foreverFrame.connections[s] = n;
            n.frame = o;
            n.frameId = s;
            r && (n.onSuccess = function () {
                n.log("Iframe transport started.");
                r()
            })
        },
        reconnect: function (n) {
            var r = this;
            i.isConnectedOrReconnecting(n) && i.verifyLastActive(n) && t.setTimeout(function () {
                if (i.verifyLastActive(n) && n.frame && i.ensureReconnectingState(n)) {
                    var u = n.frame,
                    t = i.getUrl(n, r.name, !0) + "&frameId=" + n.frameId;
                    n.log("Updating iframe src to '" + t + "'.");
                    u.src = t
                }
            },
            n.reconnectDelay)
        },
        lostConnection: function (n) {
            this.reconnect(n)
        },
        send: function (n, t) {
            i.ajaxSend(n, t)
        },
        receive: function (t, u) {
            var f, e, o;
            if (t.json !== t._originalJson && (u = t._originalJson.stringify(u)), o = t._parseResponse(u), i.processMessages(t, o, t.onSuccess), t.state === n.signalR.connectionState.connected && (t.frameMessageCount = (t.frameMessageCount || 0) + 1, t.frameMessageCount > r.transports.foreverFrame.iframeClearThreshold && (t.frameMessageCount = 0, f = t.frame.contentWindow || t.frame.contentDocument, f && f.document && f.document.body))) for (e = f.document.body; e.firstChild;) e.removeChild(e.firstChild)
        },
        stop: function (n) {
            var r = null;
            if (f.cancel(), n.frame) {
                if (n.frame.stop) n.frame.stop();
                else try {
                    r = n.frame.contentWindow || n.frame.contentDocument;
                    r.document && r.document.execCommand && r.document.execCommand("Stop")
                } catch (u) {
                    n.log("Error occured when stopping foreverFrame transport. Message = " + u.message + ".")
                }
                n.frame.parentNode === t.document.body && t.document.body.removeChild(n.frame);
                delete i.foreverFrame.connections[n.frameId];
                n.frame = null;
                n.frameId = null;
                delete n.frame;
                delete n.frameId;
                delete n.onSuccess;
                delete n.frameMessageCount;
                n.log("Stopping forever frame.")
            }
        },
        abort: function (n, t) {
            i.ajaxAbort(n, t)
        },
        getConnection: function (n) {
            return i.foreverFrame.connections[n]
        },
        started: function (t) {
            o(t, r.connectionState.reconnecting, r.connectionState.connected) === !0 && n(t).triggerHandler(e.onReconnect)
        }
    }
}(window.jQuery, window),
function (n, t) {
    var r = n.signalR,
    u = n.signalR.events,
    e = n.signalR.changeState,
    f = n.signalR.isDisconnecting,
    i = r.transports._logic;
    r.transports.longPolling = {
        name: "longPolling",
        supportsKeepAlive: function () {
            return !1
        },
        reconnectDelay: 3e3,
        start: function (o, s, h) {
            var a = this,
            v = function () {
                v = n.noop;
                o.log("LongPolling connected.");
                s()
            },
            y = function (n) {
                return h(n) ? (o.log("LongPolling failed to connect."), !0) : !1
            },
            c = o._,
            l = 0,
            p = function (i) {
                t.clearTimeout(c.reconnectTimeoutId);
                c.reconnectTimeoutId = null;
                e(i, r.connectionState.reconnecting, r.connectionState.connected) === !0 && (i.log("Raising the reconnect event"), n(i).triggerHandler(u.onReconnect))
            },
            w = 36e5;
            o.pollXhr && (o.log("Polling xhr requests already exists, aborting."), o.stop());
            o.messageId = null;
            c.reconnectTimeoutId = null;
            c.pollTimeoutId = t.setTimeout(function () {
                (function e(s, h) {
                    var g = s.messageId,
                    nt = g === null,
                    k = !nt,
                    tt = !h,
                    d = i.getUrl(s, a.name, k, tt, !0),
                    b = {}; (s.messageId && (b.messageId = s.messageId), s.groupsToken && (b.groupsToken = s.groupsToken), f(s) !== !0) && (o.log("Opening long polling request to '" + d + "'."), s.pollXhr = i.ajax(o, {
                        xhrFields: {
                            onprogress: function () {
                                i.markLastMessage(o)
                            }
                        },
                        url: d,
                        type: "POST",
                        contentType: r._.defaultContentType,
                        data: b,
                        timeout: o._.pollTimeout,
                        success: function (r) {
                            var h, w = 0,
                            u, a;
                            o.log("Long poll complete.");
                            l = 0;
                            try {
                                h = o._parseResponse(r)
                            } catch (b) {
                                i.handleParseFailure(s, r, b, y, s.pollXhr);
                                return
                            } (c.reconnectTimeoutId !== null && p(s), h && (u = i.maximizePersistentResponse(h)), i.processMessages(s, h, v), u && n.type(u.LongPollDelay) === "number" && (w = u.LongPollDelay), f(s) !== !0) && (a = u && u.ShouldReconnect, !a || i.ensureReconnectingState(s)) && (w > 0 ? c.pollTimeoutId = t.setTimeout(function () {
                                e(s, a)
                            },
                            w) : e(s, a))
                        },
                        error: function (f, h) {
                            var v = r._.transportError(r.resources.longPollFailed, o.transport, f, s.pollXhr);
                            if (t.clearTimeout(c.reconnectTimeoutId), c.reconnectTimeoutId = null, h === "abort") {
                                o.log("Aborted xhr request.");
                                return
                            }
                            if (!y(v)) {
                                if (l++, o.state !== r.connectionState.reconnecting && (o.log("An error occurred using longPolling. Status = " + h + ".  Response = " + f.responseText + "."), n(s).triggerHandler(u.onError, [v])), (o.state === r.connectionState.connected || o.state === r.connectionState.reconnecting) && !i.verifyLastActive(o)) return;
                                if (!i.ensureReconnectingState(s)) return;
                                c.pollTimeoutId = t.setTimeout(function () {
                                    e(s, !0)
                                },
                                a.reconnectDelay)
                            }
                        }
                    }), k && h === !0 && (c.reconnectTimeoutId = t.setTimeout(function () {
                        p(s)
                    },
                    Math.min(1e3 * (Math.pow(2, l) - 1), w))))
                })(o)
            },
            250)
        },
        lostConnection: function (n) {
            n.pollXhr && n.pollXhr.abort("lostConnection")
        },
        send: function (n, t) {
            i.ajaxSend(n, t)
        },
        stop: function (n) {
            t.clearTimeout(n._.pollTimeoutId);
            t.clearTimeout(n._.reconnectTimeoutId);
            delete n._.pollTimeoutId;
            delete n._.reconnectTimeoutId;
            n.pollXhr && (n.pollXhr.abort(), n.pollXhr = null, delete n.pollXhr)
        },
        abort: function (n, t) {
            i.ajaxAbort(n, t)
        }
    }
}(window.jQuery, window),
function (n) {
    function r(n) {
        return n + s
    }
    function e(n, t, i) {
        for (var f = n.length,
        u = [], r = 0; r < f; r += 1) n.hasOwnProperty(r) && (u[r] = t.call(i, n[r], r, n));
        return u
    }
    function o(t) {
        return n.isFunction(t) ? null : n.type(t) === "undefined" ? null : t
    }
    function u(n) {
        for (var t in n) if (n.hasOwnProperty(t)) return !0;
        return !1
    }
    function f(n, t) {
        var i = n._.invocationCallbacks,
        r, f;
        u(i) && n.log("Clearing hub invocation callbacks with error: " + t + ".");
        n._.invocationCallbackId = 0;
        delete n._.invocationCallbacks;
        n._.invocationCallbacks = {};
        for (f in i) r = i[f],
        r.method.call(r.scope, {
            E: t
        })
    }
    function i(n, t) {
        return new i.fn.init(n, t)
    }
    function t(i, r) {
        var u = {
            qs: null,
            logging: !1,
            useDefaultPath: !0
        };
        return n.extend(u, r),
        (!i || u.useDefaultPath) && (i = (i || "") + "/signalr"),
        new t.fn.init(i, u)
    }
    var s = ".hubProxy",
    h = n.signalR;
    i.fn = i.prototype = {
        init: function (n, t) {
            this.state = {};
            this.connection = n;
            this.hubName = t;
            this._ = {
                callbackMap: {}
            }
        },
        constructor: i,
        hasSubscriptions: function () {
            return u(this._.callbackMap)
        },
        on: function (t, i) {
            var u = this,
            f = u._.callbackMap;
            return t = t.toLowerCase(),
            f[t] || (f[t] = {}),
            f[t][i] = function (n, t) {
                i.apply(u, t)
            },
            n(u).bind(r(t), f[t][i]),
            u
        },
        off: function (t, i) {
            var e = this,
            o = e._.callbackMap,
            f;
            return t = t.toLowerCase(),
            f = o[t],
            f && (f[i] ? (n(e).unbind(r(t), f[i]), delete f[i], u(f) || delete o[t]) : i || (n(e).unbind(r(t)), delete o[t])),
            e
        },
        invoke: function (t) {
            var i = this,
            r = i.connection,
            s = n.makeArray(arguments).slice(1),
            c = e(s, o),
            f = {
                H: i.hubName,
                M: t,
                A: c,
                I: r._.invocationCallbackId
            },
            u = n.Deferred(),
            l = function (f) {
                var e = i._maximizeHubResponse(f),
                s,
                o;
                n.extend(i.state, e.State);
                e.Progress ? u.notifyWith ? u.notifyWith(i, [e.Progress.Data]) : r._.progressjQueryVersionLogged || (r.log("A hub method invocation progress update was received but the version of jQuery in use (" + n.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."), r._.progressjQueryVersionLogged = !0) : e.Error ? (e.StackTrace && r.log(e.Error + "\n" + e.StackTrace + "."), s = e.IsHubException ? "HubException" : "Exception", o = h._.error(e.Error, s), o.data = e.ErrorData, r.log(i.hubName + "." + t + " failed to execute. Error: " + o.message), u.rejectWith(i, [o])) : (r.log("Invoked " + i.hubName + "." + t), u.resolveWith(i, [e.Result]))
            };
            return r._.invocationCallbacks[r._.invocationCallbackId.toString()] = {
                scope: i,
                method: l
            },
            r._.invocationCallbackId += 1,
            n.isEmptyObject(i.state) || (f.S = i.state),
            r.log("Invoking " + i.hubName + "." + t),
            r.send(f),
            u.promise()
        },
        _maximizeHubResponse: function (n) {
            return {
                State: n.S,
                Result: n.R,
                Progress: n.P ? {
                    Id: n.P.I,
                    Data: n.P.D
                } : null,
                Id: n.I,
                IsHubException: n.H,
                Error: n.E,
                StackTrace: n.T,
                ErrorData: n.D
            }
        }
    };
    i.fn.init.prototype = i.fn;
    t.fn = t.prototype = n.connection();
    t.fn.init = function (t, i) {
        var e = {
            qs: null,
            logging: !1,
            useDefaultPath: !0
        },
        u = this;
        n.extend(e, i);
        n.signalR.fn.init.call(u, t, e.qs, e.logging);
        u.proxies = {};
        u._.invocationCallbackId = 0;
        u._.invocationCallbacks = {};
        u.received(function (t) {
            var f, o, e, i, s, h;
            t && (typeof t.P != "undefined" ? (e = t.P.I.toString(), i = u._.invocationCallbacks[e], i && i.method.call(i.scope, t)) : typeof t.I != "undefined" ? (e = t.I.toString(), i = u._.invocationCallbacks[e], i && (u._.invocationCallbacks[e] = null, delete u._.invocationCallbacks[e], i.method.call(i.scope, t))) : (f = this._maximizeClientHubInvocation(t), u.log("Triggering client hub event '" + f.Method + "' on hub '" + f.Hub + "'."), s = f.Hub.toLowerCase(), h = f.Method.toLowerCase(), o = this.proxies[s], n.extend(o.state, f.State), n(o).triggerHandler(r(h), [f.Args])))
        });
        u.error(function (n, t) {
            var i, r;
            t && (i = t.I, r = u._.invocationCallbacks[i], r && (u._.invocationCallbacks[i] = null, delete u._.invocationCallbacks[i], r.method.call(r.scope, {
                E: n
            })))
        });
        u.reconnecting(function () {
            u.transport && u.transport.name === "webSockets" && f(u, "Connection started reconnecting before invocation result was received.")
        });
        u.disconnected(function () {
            f(u, "Connection was disconnected before invocation result was received.")
        })
    };
    t.fn._maximizeClientHubInvocation = function (n) {
        return {
            Hub: n.H,
            Method: n.M,
            Args: n.A,
            State: n.S
        }
    };
    t.fn._registerSubscribedHubs = function () {
        var t = this;
        t._subscribedToHubs || (t._subscribedToHubs = !0, t.starting(function () {
            var i = [];
            n.each(t.proxies,
            function (n) {
                this.hasSubscriptions() && (i.push({
                    name: n
                }), t.log("Client subscribed to hub '" + n + "'."))
            });
            i.length === 0 && t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
            t.data = t.json.stringify(i)
        }))
    };
    t.fn.createHubProxy = function (n) {
        n = n.toLowerCase();
        var t = this.proxies[n];
        return t || (t = i(this, n), this.proxies[n] = t),
        this._registerSubscribedHubs(),
        t
    };
    t.fn.init.prototype = t.fn;
    n.hubConnection = t
}(window.jQuery, window),
function (n) {
    n.signalR.version = "2.2.0"
}(window.jQuery),
function () {
    "use strict";
    var i, n = function (n) {
        var t = $("#icon_message");
        n == 1 ? ($("body").find("embed").length == 0 ? $("body").append('<embed src="' + top.contentPath + '/Content/images/video/5103.wav">') : ($("embed").remove(), $("body").append('<embed src="' + top.contentPath + '/Content/images/video/5103.wav">')), i = setInterval(function () {
            t.hasClass("_ok") ? (t.removeClass("_ok"), t.show()) : (t.addClass("_ok"), t.hide())
        },
        400)) : (t.removeClass("_ok"), t.show(), clearInterval(i))
    },
    t = function () {
        var n = $("#btn_message"),
        t = $(".message-wrap");
        n.remove();
        t.remove();
        top.learun.dialogTop({
            msg: "消息服务器连接不上",
            type: "error"
        })
    },
    r = function (n) {
        var n = $.extend({
            url: "",
            userId: "",
            updateUserList: function () { },
            updateLastUser: function () { },
            updateUserStatus: function () { },
            revMessage: function () { },
            revGroupMessage: function () { },
            afterLinkSuccess: function () { },
            disconnected: function () { }
        },
        n),
        r = {
            IMCreateGroup: function () { },
            IMUpdateGroupName: function () { },
            IMAddGroupUserId: function () { },
            IMRemoveGroupUserId: function () { },
            IMSendToOne: function () { },
            IMSendGroup: function () { },
            IMUpdateMessageStatus: function () { },
            IMGetMsgList: function () { },
            IMGetUnReadMsgNumList: function () { },
            IMUpdateLastUserByClient: function () { },
            userAllList: {}
        },
        i = {
            chat: !1,
            init: function () {
                i.loadJs(function () {
                    $.connection.hub.url = n.url;
                    $.connection.hub.qs = {
                        userId: n.userId
                    };
                    i.chat = $.connection.ChatsHub;
                    i.registerClient();
                    $.connection.hub.start().done(function () {
                        i.registerServer();
                        n.afterLinkSuccess(r)
                    });
                    $.connection.hub.disconnected(function () {
                        n.disconnected()
                    })
                })
            },
            loadJs: function (t) {
                $.ajax({
                    url: n.url + "/hubs",
                    type: "get",
                    dataType: "text",
                    success: function (data) {
                        eval(data);
                        t()
                    }
                })
            },
            registerClient: function () {
                i.chat && (i.chat.client.IMUpdateUserList = function (t, i) {
                    var u = {};
                    r.userAllList = t;
                    $.each(t,
                    function (t, i) {
                        t != n.userId && (u[i.DepartmentId] == undefined ? (u[i.DepartmentId] = {},
                        u[i.DepartmentId].DepartmentName = i.DepartmentId, u[i.DepartmentId].onLineNum = i.UserOnLine == 1 ? 1 : 0, u[i.DepartmentId].UserList = [], u[i.DepartmentId].UserList.push(i)) : (i.UserOnLine == 1 && u[i.DepartmentId].onLineNum++, u[i.DepartmentId].UserList.push(i)))
                    });
                    n.updateUserList(u, i)
                },
                i.chat.client.IMUpdateLastUser = function (t) {
                    n.updateLastUser(t)
                },
                i.chat.client.IMUpdateUserStatus = function (t, i) {
                    r.userAllList[t].UserOnLine = i;
                    n.updateUserStatus(t, i)
                },
                i.chat.client.RevMessage = function (t, i, r) {
                    n.revMessage(t, i, r)
                },
                i.chat.client.RevGroupMessage = function (t, i, r, u) {
                    n.revGroupMessage(t, i, r, u)
                })
            },
            registerServer: function () {
                r.IMCreateGroup = function (n, t) {
                    return i.chat.server.createGroup(n, t)
                };
                r.IMUpdateGroupName = function (n, t) {
                    return i.chat.server.updateGroupName(n, t)
                };
                r.IMAddGroupUserId = function (n, t) {
                    return i.chat.server.addGroupUserId(n, t)
                };
                r.IMRemoveGroupUserId = function (n) {
                    return i.chat.server.removeGroupUserId(n)
                };
                r.IMSendToOne = function (n, t) {
                    i.chat.server.imSendToOne(n, t)
                };
                r.IMSendGroup = function (n, t) {
                    i.chat.server.imSendToGroup(n, t)
                };
                r.IMUpdateMessageStatus = function (n) {
                    return i.chat.server.updateMessageStatus(n)
                };
                r.IMGetMsgList = function (n, t, r, u) {
                    var f = {
                        rows: t,
                        page: n,
                        sidx: "CreateDate",
                        sord: "desc"
                    };
                    i.chat.server.getMsgList(f, r).done(function (n) {
                        for (var i = [], t = n.length - 1; t >= 0; t--) n[t].CreateDate = formatDate(n[t].CreateDate, "yyyy-MM-dd hh:mm"),
                        i.push(n[t]);
                        u(i)
                    })
                };
                r.IMGetUnReadMsgNumList = function (n) {
                    i.chat.server.getMsgNumList("0").done(function (t) {
                        n(t)
                    })
                };
                r.IMUpdateLastUserByClient = function () {
                    i.chat.server.imSendLastUser()
                }
            }
        };
        i.init();
        learun === undefined && t()
    };
    $.imInit = function (i) {
        function a(n) {
            var i = $(".message-group #message-last-list"),
            t = "";
            e.IMGetUnReadMsgNumList(function (n) {
                u.find(".message-count").html(n)
            });
            i.html(t);
            $.each(n,
            function (n, i) {
                var r = e.userAllList[i.OtherId],
                u = "off-line.png";
                r.UserOnLine == 1 && (u = "on-line.png");
                t += "<li>";
                t += '<div class="message-oneface"><img src="' + top.contentPath + "/Content/images/" + u + '" /><\/div>';
                t += '<div data-value="' + r.UserId + '" class="message-onename">' + r.RealName + " <span>[" + r.DepartmentId + "]<\/span><\/div>";
                i.UnReadNum > 0 && (t += '<span class="message-count">' + i.UnReadNum + "<\/span>");
                t += "<\/li>"
            });
            i.append(t);
            i.find("li").hover(function () {
                $(this).find("span").show()
            },
            function () {
                $(this).find("span").hide()
            });
            s();
            h()
        }
        function s() {
            u.find(".message-chatlist li").click(function () {
                f.show();
                var n = $(this).find(".message-onename").attr("data-value"),
                t = $(this).find(".message-onename").text();
                o.toUserId = n;
                o.toUserName = t;
                o.windowId = n;
                f.find(".message-window-header .text").html("与 " + t + " 聊天中");
                f.find(".message-window-chat").scrollTop(f.find(".message-window-chat")[0].scrollHeight);
                f.find(".message-window-chat").find(".message-window-content").html("");
                e.IMGetMsgList(1, 5, n,
                function (t) {
                    e.IMUpdateMessageStatus(n);
                    $.each(t,
                    function (n) {
                        l(t[n].SendId, t[n].Content, t[n].CreateDate, !0)
                    });
                    e.IMGetUnReadMsgNumList(function (n) {
                        u.find(".message-count").html(n)
                    });
                    $(this).find(".message-count").html("")
                })
            })
        }
        function h() {
            f.find(".message-window-header .close").click(function () {
                f.hide();
                o.windowId = ""
            })
        }
        function c() {
            var n = f.find(".message-window-send").find("textarea");
            n.bind("keypress",
            function (n) {
                if (n.keyCode == "13") {
                    var t = $(this).val();
                    t && (e.IMSendToOne(i.toUserId, t), f.find(".message-window-send").html('<textarea autofocus placeholder="按回车发送消息,shift+回车换行"><\/textarea>'), c())
                }
            })
        }
        function l(t, r, o, s) {
            var c, h;
            t != i.userId ? (i.windowId == t && (h = '<div class="left"><div class="author-name">', h += '<img src="/Content/images/on-line.png" />', h += '<small class="chat-text">' + i.toUserName + "<\/small>", h += '<small class="chat-date">' + o + "<\/small>", h += '<\/div><div class="chat-message"><em><\/em>' + r + "<\/div><\/div>", f.find(".message-window-content").append(h), f.find(".message-window-chat").scrollTop(f.find(".message-window-chat")[0].scrollHeight)), s == undefined && (i.windowId != t ? (c = parseInt(u.find(".message-count").html()), c += 1, c > 99 && (c = 99), u.find(".message-count").html(c), n(1)) : e.IMUpdateMessageStatus(t))) : (h = '<div class="right"><div class="author-name">', h += '<small class="chat-date">2015-11-25 11:24<\/small>', h += '<small class="chat-text">' + i.userName + "<\/small>", h += '<img src="/Content/images/on-line.png" />', h += "<\/div>", h += '<div class="chat-message"><em><\/em>' + r + "<\/div><\/div>", f.find(".message-window-content").append(h), f.find(".message-window-chat").scrollTop(f.find(".message-window-chat")[0].scrollHeight))
        }
        var u = $(".message-wrap"),
        f = $(".message-window"),
        e,
        o = {
            userId: "77653de4-d8e7-4903-9f2a-ee47ba3111da",
            userName: "",
            toUserId: "",
            toUserName: "",
            windowId: "",
            revMessage: l,
            afterLinkSuccess: function (t) {
                e = t;
                e.IMGetUnReadMsgNumList(function (t) {
                    u.find(".message-count").html(t);
                    parseInt(t) > 0 && n(1)
                })
            },
            disconnected: function () {
                t()
            },
            updateUserList: function (n) {
                var e = $(".message-group #message-contact-list"),
                t = "",
                r,
                f,
                i;
                for (r in n) f = n[r],
                t += '<li><a><i class="fa fa-caret-right"><\/i><span>' + f.DepartmentName + "<\/span><em> " + f.onLineNum + "/" + f.UserList.length + " <\/em><\/a>",
                i = n[r].UserList.sort(function (n, t) {
                    return n.UserOnLine < t.UserOnLine ? 1 : -1
                }),
                i.length > 0 && (t += '<ul class="message-chatlist">', $.each(i,
                function (u) {
                    var f = "/Content/images/off-line.png";
                    i[u].UserOnLine == 1 && (f = "/Content/images/on-line.png");
                    t += "<li>";
                    t += '<div class="message-oneface"><img src="' + top.contentPath + f + '" /><\/div>';
                    t += '<div data-value="' + i[u].UserId + '" class="message-onename">' + i[u].RealName + " <span>[" + n[r].DepartmentName + "]<\/span><\/div>";
                    t += "<\/li>"
                }), t += "<\/ul>"),
                t += "<\/li>";
                e.html(t);
                u.find(".message-group a").click(function () {
                    $(this).hasClass("active") ? ($(this).removeClass("active"), $(this).next(".message-chatlist").slideUp(200), $(this).find("i").removeClass("fa-caret-down").addClass("fa-caret-right")) : ($(this).addClass("active"), $(this).next(".message-chatlist").slideDown(200), $(this).find("i").removeClass("fa-caret-right").addClass("fa-caret-down"))
                });
                s();
                h();
                $("#btn_message").show()
            },
            updateLastUser: a,
            updateUserStatus: function (n, t) {
                var i = u.find(".message-chatlist li").find("[data-value=" + n + "]")[0],
                f = $(i.parentNode.parentNode.parentNode).find("em"),
                e = f.html().split("/"),
                r = parseInt(e[0].replace(/ /g, "")),
                o = "off-line.png",
                s,
                h;
                t == 1 ? (s = $(i.parentNode).clone(), h = $(i.parentNode.parentNode), h.prepend(s), $(i.parentNode).remove(), o = "on-line.png", r++) : r--;
                u.find(".message-chatlist li").find("[data-value=" + n + "]").prev(".message-oneface").find("img").attr("src", top.contentPath + "/Content/images/" + o + "");
                f.html(" " + r + "/" + e[1])
            }
        },
        i = $.extend(o, i);
        try {
            r(i)
        } catch (v) {
            return t(),
            !1
        }
        $("#btn_message").click(function () {
            $(this).hide();
            u.show()
        });
        u.find(".message-close").click(function () {
            n(0);
            u.hide();
            f.hide();
            $("#btn_message").show()
        });
        u.find(".message-nav li").click(function () {
            var n = $(this).attr("id");
            switch (n) {
                case "nav-contact-tab":
                    u.find("#message-contact-list").show();
                    u.find("#message-group-list").hide();
                    u.find("#message-last-list").hide();
                    $(this).find("span").hide();
                    break;
                case "nav-group-tab":
                    u.find("#message-group-list").show();
                    u.find("#message-contact-list").hide();
                    u.find("#message-last-list").hide();
                    break;
                case "nav-last-tab":
                    u.find("#message-last-list").show();
                    u.find("#message-contact-list").hide();
                    u.find("#message-group-list").hide();
                    $(this).find("span").show()
            }
            $(this).parents("ul").find("li").removeClass("active");
            $(this).addClass("active")
        });
        u.find(".message-body-search").find(".search-text").keyup(function () {
            var n = $("#message-contact-list").find(".message-chatlist"),
            t = $(this).val();
            t != "" ? (n.show(), n.prev("a").hide(), window.setTimeout(function () {
                n.find("li").hide().filter(":contains('" + t + "')").show()
            },
            200), n.find("li").hover(function () {
                $(this).find("span").show()
            },
            function () {
                $(this).find("span").hide()
            })) : (n.hide(), n.find("li").show(), n.prev("a").show(), n.prev("a").hasClass("active") && n.prev("a.active").next("ul").show(), n.find("li").find("span").hide())
        }).keyup();
        c()
    }
}(window.jQuery)