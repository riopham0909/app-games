(() => {
    "use strict";
    var __webpack_modules__ = {
            1075: e => {
                var t = Object.prototype.hasOwnProperty,
                    n = "~";

                function a() {}

                function r(e, t, n) {
                    this.fn = e, this.context = t, this.once = n || !1
                }

                function i(e, t, a, i, s) {
                    if ("function" != typeof a) throw new TypeError("The listener must be a function");
                    var o = new r(a, i || e, s),
                        l = n ? n + t : t;
                    return e._events[l] ? e._events[l].fn ? e._events[l] = [e._events[l], o] : e._events[l].push(o) : (e._events[l] = o, e._eventsCount++), e
                }

                function s(e, t) {
                    0 == --e._eventsCount ? e._events = new a : delete e._events[t]
                }

                function o() {
                    this._events = new a, this._eventsCount = 0
                }
                Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (n = !1)), o.prototype.eventNames = function() {
                    var e, a, r = [];
                    if (0 === this._eventsCount) return r;
                    for (a in e = this._events) t.call(e, a) && r.push(n ? a.slice(1) : a);
                    return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
                }, o.prototype.listeners = function(e) {
                    var t = n ? n + e : e,
                        a = this._events[t];
                    if (!a) return [];
                    if (a.fn) return [a.fn];
                    for (var r = 0, i = a.length, s = new Array(i); r < i; r++) s[r] = a[r].fn;
                    return s
                }, o.prototype.listenerCount = function(e) {
                    var t = n ? n + e : e,
                        a = this._events[t];
                    return a ? a.fn ? 1 : a.length : 0
                }, o.prototype.emit = function(e, t, a, r, i, s) {
                    var o = n ? n + e : e;
                    if (!this._events[o]) return !1;
                    var l, d, c = this._events[o],
                        u = arguments.length;
                    if (c.fn) {
                        switch (c.once && this.removeListener(e, c.fn, void 0, !0), u) {
                            case 1:
                                return c.fn.call(c.context), !0;
                            case 2:
                                return c.fn.call(c.context, t), !0;
                            case 3:
                                return c.fn.call(c.context, t, a), !0;
                            case 4:
                                return c.fn.call(c.context, t, a, r), !0;
                            case 5:
                                return c.fn.call(c.context, t, a, r, i), !0;
                            case 6:
                                return c.fn.call(c.context, t, a, r, i, s), !0
                        }
                        for (d = 1, l = new Array(u - 1); d < u; d++) l[d - 1] = arguments[d];
                        c.fn.apply(c.context, l)
                    } else {
                        var f, g = c.length;
                        for (d = 0; d < g; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), u) {
                            case 1:
                                c[d].fn.call(c[d].context);
                                break;
                            case 2:
                                c[d].fn.call(c[d].context, t);
                                break;
                            case 3:
                                c[d].fn.call(c[d].context, t, a);
                                break;
                            case 4:
                                c[d].fn.call(c[d].context, t, a, r);
                                break;
                            default:
                                if (!l)
                                    for (f = 1, l = new Array(u - 1); f < u; f++) l[f - 1] = arguments[f];
                                c[d].fn.apply(c[d].context, l)
                        }
                    }
                    return !0
                }, o.prototype.on = function(e, t, n) {
                    return i(this, e, t, n, !1)
                }, o.prototype.once = function(e, t, n) {
                    return i(this, e, t, n, !0)
                }, o.prototype.removeListener = function(e, t, a, r) {
                    var i = n ? n + e : e;
                    if (!this._events[i]) return this;
                    if (!t) return s(this, i), this;
                    var o = this._events[i];
                    if (o.fn) o.fn !== t || r && !o.once || a && o.context !== a || s(this, i);
                    else {
                        for (var l = 0, d = [], c = o.length; l < c; l++)(o[l].fn !== t || r && !o[l].once || a && o[l].context !== a) && d.push(o[l]);
                        d.length ? this._events[i] = 1 === d.length ? d[0] : d : s(this, i)
                    }
                    return this
                }, o.prototype.removeAllListeners = function(e) {
                    var t;
                    return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new a, this._eventsCount = 0), this
                }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = n, o.EventEmitter = o, e.exports = o
            },
            5215: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.isIpad = t.isIphone = t.isFireFoxOnAndroid = t.isSamsungInternetOnAndroidTab = t.isSamsungInternetOnAndroidMobile = t.isAndroidTab = t.isAndroidMobile = t.isAndroidDevice = t.isMobileOrTab = t.nulOrUnd = void 0, t.nulOrUnd = function(e) {
                    return null == e
                }, t.isMobileOrTab = function() {
                    return [/webOS/i, /iPod/i, /BlackBerry/i, /Windows Phone/i].some((e => window.navigator.userAgent.match(e))) || this.isAndroidDevice() || this.isIphone() || this.isIpad()
                }, t.isAndroidDevice = function() {
                    return [/Android/i, /SamsungBrowser/i].some((e => window.navigator.userAgent.match(e)))
                }, t.isAndroidMobile = function() {
                    return [/Mobile/i].every((e => window.navigator.userAgent.match(e))) && this.isAndroidDevice()
                }, t.isAndroidTab = function() {
                    return ![/Mobile/i].every((e => navigator.userAgent.match(e))) && this.isAndroidDevice()
                }, t.isSamsungInternetOnAndroidMobile = function() {
                    return [/Mobile/i, /SamsungBrowser/i].every((e => window.navigator.userAgent.match(e)))
                }, t.isSamsungInternetOnAndroidTab = function() {
                    return [/SamsungBrowser/i].every((e => window.navigator.userAgent.match(e))) && this.isAndroidTab()
                }, t.isFireFoxOnAndroid = function() {
                    return [/Android/i, /Mobile/i, /FireFox/i].every((e => window.navigator.userAgent.match(e)))
                }, t.isIphone = function() {
                    return [/iPhone/i].some((e => window.navigator.userAgent.match(e))) && window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1
                }, t.isIpad = function() {
                    return [/iPad/i, /Macintosh/i].some((e => window.navigator.userAgent.match(e))) && window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1
                }
            },
            8744: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075)),
                    i = n(4853),
                    s = a(n(347)),
                    o = n(9251),
                    l = a(n(6430)),
                    d = a(n(2673)),
                    c = a(n(694)),
                    u = a(n(9916)),
                    f = a(n(5797)),
                    g = a(n(1840)),
                    p = a(n(2915)),
                    h = a(n(240)),
                    _ = a(n(5038));
                class m extends r.default {
                    static get instance() {
                        return void 0 === m._instance ? m._instance = new m : m._instance
                    }
                    constructor() {
                        super(), this.isReady = !1, this.gameStarted = !1, this.interface = new r.default, s.default.setupUIStyle()
                    }
                    static isPlatformSupported() {
                        return m.commsManager.isPlatformSupported
                    }
                    getPlayerID() {
                        return m.commsManager.playerID
                    }
                    async init(e) {
                        this.config = e, this.logBuild(e), this.applyWrapperOptions();
                        let {
                            err: t
                        } = await this.commsManager.initialize();
                        return m.commsManager.checkPlatformSupport(t), await this.storageManager.initialize(this.config), this.createInterface(e.interface), await this.initAds(), this.config.inAppPurchase && await this.initIAP(), window.sgWrapper = this, this.createUI(e), this.initOnceAllReady(), Promise.resolve()
                    }
                    initOnceAllReady() {
                        let e = !1;
                        const t = () => {
                            e || (e = !0, this.checkForRemoteJS(), window.onWrapperReady && window.onWrapperReady(), this.emit(l.default.READY), this.isReady = !0)
                        };
                        "complete" === document.readyState ? setTimeout((() => {
                            t()
                        }), 200) : window.addEventListener("load", (() => {
                            const e = setInterval((() => {
                                "complete" === document.readyState && (setTimeout((() => {
                                    t()
                                }), 200), clearInterval(e))
                            }), 200)
                        }))
                    }
                    checkForRemoteJS() {
                        for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++)
                            if (console.log(e[t].getAttribute("data-consolejs-channel")), null !== e[t].getAttribute("data-consolejs-channel")) {
                                alert("THIS GAME CONTAINS A REMOTEJS INSTANCE. REMOVE IT BEFORE GOING LIVE");
                                break
                            }
                    }
                    onStart() {
                        this.SGPreloader && this.SGPreloader.show()
                    }
                    showSupportPopup() {
                        _.default.show()
                    }
                    createUI(e) {
                        document.addEventListener("DOMContentLoaded", (function(t) {
                            document.head.title = e.gameTitle
                        })), this.countdownTag = new g.default, this.adLoadBg = new p.default
                    }
                    async initAds() {
                        return await this.adManager.initialize()
                    }
                    async initIAP() {
                        await this.iapManager.initialize()
                    }
                    hookUpInterface() {
                        this.interface.once(o.InterfaceEvent.LOADED, (() => {})), this.interface.once(o.InterfaceEvent.LOADED, (() => {
                            this.onStartGame()
                        })), this.interface.on(o.InterfaceEvent.LOAD_PROGRESS, (e => {
                            this.commsManager.setLoadingProgress(e.progress)
                        }))
                    }
                    async onStartGame() {
                        this.gameStarted = !0, this.emit(l.default.GAME_START);
                        const {
                            err: e
                        } = await this.commsManager.startGame();
                        e && (console.log(e), this.commsManager.checkPlatformSupport(e))
                    }
                    createInterface(e) {
                        switch (e) {
                            case i.InterfaceType.SGSDK:
                                new f.default(this.interface);
                                break;
                            case i.InterfaceType.SG_HOOKS:
                                new u.default(this.interface);
                                break;
                            case i.InterfaceType.FBInstant:
                                new d.default(this.interface), new c.default(this.interface);
                                break;
                            default:
                                console.warn("Interface not initialized: type not recognized.")
                        }
                        this.hookUpInterface()
                    }
                    applyWrapperOptions() {
                        if (void 0 !== this.config.options) {
                            const e = window.navigator.userAgent.includes("Android");
                            this.config.options.reloadOnFold && e && new h.default
                        }
                    }
                    logBuild(e) {
                        console.log("*******************************"), console.log(e.gameTitle + " v" + e.gameBuild), console.log(e), console.log("*******************************")
                    }
                    static get placementIDs() {
                        return m.instance.placementIDs
                    }
                    static get commsManager() {
                        return m.instance.commsManager
                    }
                    static get adManager() {
                        return m.instance.adManager
                    }
                    static get iapManager() {
                        return m.instance.iapManager
                    }
                    static get interface() {
                        return m.instance.interface
                    }
                    static get config() {
                        return m.instance.config
                    }
                    static get storageManager() {
                        return m.instance.storageManager
                    }
                    static get leaderboards() {
                        return m.instance.leaderboards
                    }
                    static get sdkHandler() {
                        return m.instance.sdkHandler
                    }
                    static set sdkHandler(e) {
                        m.instance.sdkHandler = e
                    }
                }
                t.default = m
            },
            6043: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Default = void 0;
                class n {}
                t.Default = n, n.LANG = "en"
            },
            4853: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.InterfaceType = void 0,
                    function(e) {
                        e.SG_HOOKS = "SG_Hooks", e.SGSDK = "sgSdk", e.FBInstant = "FBInstant"
                    }(t.InterfaceType || (t.InterfaceType = {}))
            },
            388: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                class n {}
                t.default = n, n.platformConfig = "platform-config.json", n.ratingImage = "lib/assets/grac_kr_rating_all.png", n.softgamesLogo = "lib/assets/softgames_logo.png", n.supportPopupBG = "lib/assets/support_popup.png", n.supportPopupTextFrame = "lib/assets/support_text_frame.png", n.supportPopupCloseBtn = "lib/assets/support_close_button.png", n.firebaseConfig = "firebaseConfig.json"
            },
            5028: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.PlatformType = void 0,
                    function(e) {
                        e.SAMSUNG_INSTANT = "samsung", e.AZERION = "azerion", e.WEB = "web"
                    }(t.PlatformType || (t.PlatformType = {}))
            },
            4186: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.LinksKR = t.Links = void 0,
                    function(e) {
                        e.TOS = "https://www.softgames.com/terms-of-use/", e.PRIVACYPOLICY = "https://www.softgames.de/privacy/"
                    }(t.Links || (t.Links = {})),
                    function(e) {
                        e.TOS = "https://www.softgames.com/terms-of-use-kr/", e.PRIVACYPOLICY = "https://www.softgames.com/privacy-kr/"
                    }(t.LinksKR || (t.LinksKR = {}))
            },
            347: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(2801));
                class i {
                    static setupUIStyle() {
                        const e = document.createElement("style");
                        e.setAttribute("id", i.UI_STYLES_ELEMENT_ID), e.innerHTML = i.UI_STYLE, document.body.appendChild(e)
                    }
                }
                t.default = i, i.UI_STYLES_ELEMENT_ID = "ui-styles", i.UI_STYLE = `\n\n    @font-face {\n      font-family: Lobster;\n      src: url(lib/assets/Lobster.ttf);\n    }\n\n    a:link { text-decoration: none; color: inherit; }\n    a:visited { text-decoration: none; color: inherit; }\n    a:hover { text-decoration: none; color: inherit;}\n    a:active { text-decoration: none; color: inherit;}\n\n    .wrapper-ui {\n      color: white;\n      font-family: sans-serif;\n      text-align: center;\n      z-index: ${r.default.UI_ELEMENT_Z_INDEX};\n    }\n  \n    #${r.default.RATING_CONTAINER_ID}{\n      position: absolute;\n      right: 0;\n      top: 10px;\n      width: 20%;\n      max-width: 80px; \n      z-index: ${r.default.RATING_CONTAINER_Z_INDEX}\n    }\n  \n    .loading-screen {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background-color: black;\n      z-index: inherit;\n    }\n  \n    .splash-screen {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      display: flex;\n      flex-direction: column;\n      background-color: white;\n      align-items: center;\n      justify-content: space-around;\n      z-index: 9999;\n    }\n  \n    .game-logo {\n      position: absolute;\n      top: calc(25vh - 30px);\n      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n      max-height: 20%;\n      width: auto;\n      border-radius: 16%;\n    }\n\n    .supportPopupContainer {\n      position: absolute;\n      width:320px;\n      height:251px;\n      left:0;\n      right:0;\n      top:0;\n      bottom:0;\n      margin:auto;\n      z-index: 9999;\n    }\n\n    .supportPopup {\n      display:block;\n      background-size: contain;\n      background-repeat: norepeat;\n      width:-webkit-fill-available;\n      height:-webkit-fill-available; \n      z-index: 9999; \n    }\n\n    .fullBG {\n      background-color:black;\n      width:100vw;\n      height:100vh;\n      margin:0;\n      padding:0;\n      position:absolute;\n      opacity:0.5;\n    }\n\n    .supportPopupCloseBtn {\n      position:absolute;\n      top:5px;\n      right:3px;\n      width:55px;\n      height:55px;\n    }\n\n    .termsAndConditionsBg {\n      position:absolute;\n      width:290px;\n      height:53px;\n      top:75px;\n      right:15px;\n      right:0;\n      left:0;\n      margin:auto;\n    }\n\n    .privacyPolicyBg {\n      position:absolute;\n      width:290px;\n      height:53px;\n      top:130px;\n      right:15px;\n      right:0;\n      left:0;\n      margin:auto;\n    }\n\n    .termsAndConditionsLinkText {\n      position:absolute;\n      top:85px;\n      right:0;\n      left:0;\n      margin:auto;\n      font-weight:200;\n      font-size:24px;\n      user-select:none;\n      color: #FFFFFF;\n      font-family: "Lobster";\n    }\n\n    .privacyPolicyLinkText {\n      position:absolute;\n      top:140px;\n      font-weight:200;\n      font-size:24px;\n      right:0;\n      left:0;\n      margin:auto;\n      user-select:none;\n      color: #FFFFFF;\n      font-family: "Lobster";\n    }\n\n    .playerIdText {\n      position:absolute;\n      top:195px;\n      right:0;\n      left:0;\n      margin:auto;\n      color:black;\n      font-weight:bold;\n      font-size:23px;\n      color: #875A2B;\n    }\n\n    .IAPGiftMessage {\n      position:absolute;\n      top:90px;\n      right:0;\n      left:0;\n      margin:auto;\n      color:#875A2B;\n      font-family: "Lobster";\n      font-weight:bold;\n      font-size:23px;\n    }\n\n    .IAPGiftMessage {\n      position:absolute;\n      top:100px;\n      right:0;\n      left:0;\n      margin:auto;\n      color:black;\n      font-family: "Marker Felt;\n      font-weight:bold;\n      font-size:23px;\n      user-select:none;\n      max-width:200px;\n    }\n\n    .play-button {\n      position: absolute;\n      font-style: bold;\n      font-family: Arial;\n      top: calc(60vh);\n      max-height: 20%;\n      padding: 10px;\n      padding-left: 20px;\n      padding-right: 20px;\n      text-align:center;\n      font-size: 28px;\n      color: #FFFFFF;\n      background-color: #ff8c00;\n      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n    }\n\n    .play-button-bg {\n      position:relative;\n      display:block;\n      top:20px;\n    }\n\n    .play-text {\n      font-size: 24px;\n      font-color: white;\n      user-select: none;\n    }\n\n    .game-logo-azerion {\n      position: absolute;\n      top: calc(25vh - 30px);\n      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n      max-height: 20%;\n      width: auto;\n      border-radius: 16%;\n    }\n\n    .background-image {\n        width:100vw;\n        height:100vh;\n        filter: blur(40px);\n    }\n\n    .progressringaz {\n      position: absolute;\n      top: calc(45vh);\n      width: ${2*r.default.SPLASH_SPINNER_SIZE_AZ}px;\n      height: ${2*r.default.SPLASH_SPINNER_SIZE_AZ}px;\n    }\n\n    .progressringaz-circle {\n      stroke: #f1672b;\n      fill: transparent;\n      transform: rotate(-90deg);\n      transition: stroke-dashoffset 0.35s;\n      transform-origin: 50% 50%;\n    }\n  \n    .progress-ring {\n      position: absolute;\n      top: calc(50vh);\n      width: ${2*r.default.SPLASH_SPINNER_SIZE}px;\n      height: ${2*r.default.SPLASH_SPINNER_SIZE}px;\n    }\n  \n    /* https://css-tricks.com/building-progress-ring-quickly/ */\n    .background-circle {\n      stroke: #f3f3f3;\n      fill: transparent;\n    }\n  \n    .progress-ring-circle {\n      stroke: #f1672b;\n      fill: transparent;\n      transform: rotate(-90deg);\n      transition: stroke-dashoffset 0.35s;\n      transform-origin: 50% 50%;\n    }\n  \n    .softgames-logo {\n      position:absolute;\n      max-height: 5%;\n      max-width: 60%;\n      bottom: 0;\n    }\n\n    .sg-logo-azerion {\n      position:absolute;\n      max-height: 5%;\n      max-width: 60%;\n      bottom: 30%;\n    }\n\n    .sg-logo-azerion-fadeOut {\n      opacity: 0;\n      transition: opacity 600ms;\n    }\n\n    .sg-logo-azerion-fadeIn {\n      opacity: 1;\n      transition: opacity 600ms;\n    }\n  \n    @media (orientation: landscape) and (max-device-height: 640px) {\n      .progress-ring {\n        transform: scale(0.8);\n      }\n  \n      .game-logo {\n        max-height: 30%;\n      }\n  \n      .softgames-logo {\n        max-height: 10%;\n      }\n    }\n  \n    \n    /* ref: https://www.w3schools.com/howto/howto_css_loader.asp */\n    .spinner {\n      position: absolute;\n      top: calc(50vh - 30px);\n      left: calc(50vw - 30px);\n  \n      border: 4px solid #f3f3f3;\n      border-top: 4px solid black;\n      border-radius: 50%;\n      width: 60px;\n      height: 60px;\n      animation: spin 1s linear infinite;\n    }\n  \n    @keyframes spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n  \n    .countdown-tag {\n      pointer-events: none;\n      position: absolute;\n      right: 0;\n      bottom: 80px;\n      padding: 0 20px;\n      width: 90px;\n      background-color: black;\n      opacity: 0;\n      z-index: inherit;\n    }\n  \n    /* ref: https://css-tricks.com/snippets/css/toggle-visibility-when-hiding-elements/ */\n    .countdown-tag-fadeIn {\n      opacity: 1;\n      transition: opacity 300ms;\n    }\n  \n    .countdown-tag-label {\n      font-size: 16px;\n      padding: 0 10px;\n    }\n  `
            },
            2801: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                class n {}
                t.default = n, n.SAMSUNG_SPLASH_DURATION_MS = 3e3, n.SHOW_RATING_DURATION_MS = 3e3, n.RATING_CONTAINER_Z_INDEX = 1e3, n.RATING_CONTAINER_ID = "rating_container", n.SPLASH_SPINNER_SIZE = 36, n.SPLASH_SPINNER_SIZE_AZ = 18, n.SPLASH_SPINNER_STROKE = 5, n.UI_ELEMENT_Z_INDEX = 9e3, n.ADS_CONTAINER_Z_INDEX = 1e4, n.ADS_CONTAINER_ID = "ads_container", n.LOGGER_CONTAINER_Z_INDEX = 2e3, n.LOGGER_CONTAINER_ID = "debug_logger", n.DEBUG_MENU_Z_INDEX = 3e4
            },
            2665: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AdManagerEvent = void 0,
                    function(e) {
                        e.AD_ERROR = "AD_ERROR", e.AD_LOADED = "AD_LOADED", e.AD_START = "AD_START", e.AD_SKIP = "AD_SKIP", e.AD_COMPLETE = "AD_COMPLETE", e.AD_CLOSE = "AD_CLOSE", e.INTERSTITIAL_AD_REQUESTED = "INTERSTITIAL_AD_REQUESTED", e.REWARDED_AD_REQUESTED = "REWARDED_AD_REQUESTED", e.AD_REQUESTED = "AD_REQUESTED", e.FREE_REWARD_AWARDED = "FREE_REWARD_AWARDED"
                    }(t.AdManagerEvent || (t.AdManagerEvent = {}))
            },
            7540: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AdTimerEvent = void 0,
                    function(e) {
                        e.COOLDOWN_START = "COOLDOWN_START", e.COOLDOWN_END = "COOLDOWN_END", e.LONGPLAY_TRIGGER = "LONGPLAY_TRIGGER", e.LONGPLAY_TICKER_START = "LONGPLAY_TICKER_START", e.LONGPLAY_TICKER_STOP = "LONGPLAY_TICKER_STOP", e.LONGPLAY_TICK = "LONGPLAY_TICK", e.LONGPLAY_WARN_TICK = "LONGPLAY_WARN_TICK", e.LONGPLAY_WARN = "LONGPLAY_WARN"
                    }(t.AdTimerEvent || (t.AdTimerEvent = {}))
            },
            4989: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.GameEvent = void 0,
                    function(e) {
                        e.LEVEL_START = "LEVEL_START", e.LEVEL_FINISH = "LEVEL_FINISH", e.GAME_START = "GAME_START", e.GAME_OVER = "GAME_OVER"
                    }(t.GameEvent || (t.GameEvent = {}))
            },
            9250: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.IAPEvents = void 0,
                    function(e) {
                        e.IAP_READY = "onIAPReady"
                    }(t.IAPEvents || (t.IAPEvents = {}))
            },
            9251: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.InterfaceEvent = void 0,
                    function(e) {
                        e.LOADED = "GAME_LOADED", e.LOAD_PROGRESS = "LOAD_PROGRESS"
                    }(t.InterfaceEvent || (t.InterfaceEvent = {}))
            },
            6430: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                class n {}
                t.default = n, n.SDK_INIT = "SDK_INIT", n.SPLASH_HIDDEN = "SPLASH_HIDDEN", n.REQUEST_AD = "REQUEST_AD", n.GAME_START = "GAME_START", n.GAME_PAUSE = "GAME_PAUSE", n.GAME_RESUME = "GAME_RESUME", n.READY = "WRAPPER_READY"
            },
            973: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getConfigOption = void 0;
                const r = a(n(8744));
                t.getConfigOption = function(e) {
                    return r.default.config.options && r.default.config.options[e] || !1
                }
            },
            9284: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(5028),
                    i = n(5499),
                    s = a(n(5207)),
                    o = a(n(6631)),
                    l = a(n(1662)),
                    d = a(n(8745)),
                    c = a(n(5577)),
                    u = a(n(8744)),
                    f = a(n(6722));
                class g extends f.default {
                    async createWrapper(e) {
                        u.default.instance.config = e, e.platform = r.PlatformType.AZERION, u.default.instance.storageManager = new d.default, u.default.instance.commsManager = new o.default, u.default.instance.adManager = new s.default, u.default.instance.placementIDs = {
                            rewarded: u.default.config.gameID,
                            interstitial: u.default.config.gameID
                        }, u.default.instance.iapManager = new l.default, u.default.instance.SGPreloader = new c.default(!1), u.default.instance.init(e), !0 === e.leaderboardSupport && (u.default.instance.leaderboards = await this.getLeaderboardHandler(i.LeaderboardTypes.FIREBASE)), u.default.instance.onStart()
                    }
                }
                t.default = g, new g
            },
            6722: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(388)),
                    i = a(n(8744));
                t.default = class {
                    constructor() {
                        this.loadConfig(r.default.platformConfig)
                    }
                    async loadConfig(e) {
                        new Promise(function (resolve, reject) {
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    resolve(xhttp.response);
                                // Typical action to be performed when the document is ready:
                                }
                            };
                            xhttp.responseType = "json";
                            xhttp.open("GET", e, true);
                            xhttp.send();
                        }).then((response) => {
                            this.createWrapper(response)
                        })
                    }
                    async createWrapper(e) {}
                    async getLeaderboardHandler(e) {
                        let t;
                        return new Promise(((e, n) => {
                            t = window.setInterval((() => {
                                (() => {
                                    if (window.sgLeaderboards) {
                                        window.clearInterval(t);
                                        const n = window.sgLeaderboards.getHandler(i.default.config);
                                        e(n)
                                    }
                                })()
                            }), 100)
                        }))
                    }
                    async getIAPDBHandler() {
                        let e;
                        return new Promise(((t, n) => {
                            e = window.setInterval((() => {
                                (() => {
                                    if (window.sgIAP) {
                                        window.clearInterval(e);
                                        const n = window.sgIAP.getHandler(i.default.config);
                                        t(n)
                                    }
                                })()
                            }), 100)
                        }))
                    }
                }
            },
            2673: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(9251),
                    i = n(973),
                    s = a(n(8744)),
                    o = a(n(1547)),
                    l = a(n(4599)),
                    d = a(n(2596)),
                    c = a(n(4663)),
                    u = a(n(9912));
                class f extends o.default {
                    constructor(e) {
                        super(e), this.player = new c.default, this.payments = new d.default, this.tournament = new u.default, this.context = new l.default, window.FBInstant = this
                    }
                    initializeAsync() {
                        return s.default.instance.supportedLanguages = ["en"], Promise.resolve()
                    }
                    startGameAsync() {
                        return this.interfaceRef.emit(r.InterfaceEvent.LOAD_PROGRESS, {
                            progress: 101
                        }), s.default.commsManager.startGame(), Promise.resolve()
                    }
                    setLoadingProgress(e) {
                        const t = e || 0;
                        s.default.commsManager.setLoadingProgress(t), e >= 100 && this.interfaceRef.emit(r.InterfaceEvent.LOADED)
                    }
                    onPause(e) {}
                    getLocale() {
                        return s.default.commsManager.getLanguage()
                    }
                    getPlatform() {
                        return null
                    }
                    getSDKVersion() {
                        return ""
                    }
                    logEvent(e, t, n) {
                        return null
                    }
                    quit() {}
                    async getInterstitialAdAsync(e) {
                        return Promise.resolve({
                            loadAsync: () => Promise.resolve(),
                            showAsync: () => s.default.adManager.showInterstitialAd(),
                            getPlacementID: () => s.default.placementIDs.interstitial
                        })
                    }
                    async getRewardedVideoAsync(e) {
                        return Promise.resolve({
                            loadAsync: () => Promise.resolve(),
                            showAsync: () => new Promise((async (e, t) => {
                                await s.default.adManager.showRewardedAd() ? e(!0) : (0, i.getConfigOption)("rejectFailedRewarded") ? t() : e(!1)
                            })),
                            getPlacementID: () => s.default.placementIDs.rewarded
                        })
                    }
                    async getLeaderboardAsync(e) {}
                    canCreateShortcutAsync() {
                        return Promise.resolve(!1)
                    }
                    checkCanPlayerMatchAsync() {
                        return Promise.resolve(!1)
                    }
                    createShortcutAsync() {
                        return Promise.resolve(void 0)
                    }
                    getEntryPointAsync() {
                        return Promise.resolve("")
                    }
                    getEntryPointData() {
                        return null
                    }
                    getSupportedAPIs() {
                        let e = ["getRewardedVideoAsync", "getInterstitialAdAsync", "startGameAsync"];
                        return s.default.instance.iapManager.hasIAPSupport() && (e = e.concat(["payments.purchaseAsync", "payments.getCatalogAsync", "payments.onReady"])), e
                    }
                    matchPlayerAsync(e, t, n) {
                        return Promise.resolve(void 0)
                    }
                    postSessionScore(e) {}
                    setSessionData(e) {}
                    shareAsync(e) {
                        return Promise.resolve(void 0)
                    }
                    switchGameAsync(e, t) {
                        return Promise.resolve(void 0)
                    }
                    updateAsync(e) {
                        return Promise.resolve(void 0)
                    }
                }
                t.default = f
            },
            4599: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(8744));
                t.default = class {
                    getID() {
                        return r.default.config.platform
                    }
                    getType() {
                        return "SOLO"
                    }
                    isSizeBetween(e, t) {
                        return null
                    }
                    switchAsync(e) {
                        return Promise.resolve()
                    }
                    chooseAsync(e) {
                        return Promise.resolve()
                    }
                    createAsync(e) {
                        return Promise.resolve()
                    }
                    getPlayersAsync() {
                        return Promise.resolve([])
                    }
                }
            },
            2596: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(9250),
                    i = a(n(8744));
                t.default = class {
                    async getCatalogAsync() {
                        return await i.default.iapManager.getCatalogAsync()
                    }
                    async purchaseAsync(e) {
                        return await i.default.iapManager.purchaseAsync(e)
                    }
                    async getPurchasesAsync() {
                        return await i.default.iapManager.getPurchasesAsync()
                    }
                    async consumePurchaseAsync(e) {
                        return await i.default.iapManager.consumePurchaseAsync(e)
                    }
                    onReady(e) {
                        if (i.default.iapManager.ready) return e();
                        i.default.iapManager.on(r.IAPEvents.IAP_READY, (() => {
                            e && e()
                        }))
                    }
                    hasIAPSupport() {
                        return i.default.iapManager.hasIAPSupport()
                    }
                }
            },
            4663: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(8744));
                t.default = class {
                    getID() {}
                    getSignedPlayerInfoAsync(e) {
                        return Promise.resolve({
                            getPlayerID: () => "id",
                            getSignature: () => ""
                        })
                    }
                    canSubscribeBotAsync() {
                        return Promise.resolve(!1)
                    }
                    subscribeBotAsync() {
                        return Promise.resolve(void 0)
                    }
                    getName() {
                        return ""
                    }
                    getPhoto() {
                        return ""
                    }
                    async getDataAsync(e) {
                        return await r.default.storageManager.getItem()
                    }
                    setDataAsync(e) {
                        return new Promise(((t, n) => {
                            try {
                                const n = Object.entries(e);
                                for (const [e, t] of n) r.default.storageManager.setItem(e, t);
                                t()
                            } catch (e) {
                                n(e)
                            }
                        }))
                    }
                    flushDataAsync() {
                        return Promise.resolve(void 0)
                    }
                    getStatsAsync(e) {
                        return Promise.resolve(null)
                    }
                    setStatsAsync(e) {
                        return Promise.resolve(void 0)
                    }
                    incrementStatsAsync(e) {
                        return Promise.resolve(null)
                    }
                    getConnectedPlayersAsync() {
                        return Promise.resolve([{
                            getID: () => "id",
                            getPhoto: () => "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                            getName: () => "Name"
                        }])
                    }
                }
            },
            9912: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = class {
                    async postScoreAsync() {}
                    async createAsync() {
                        return {
                            getID: () => 0,
                            getContextID: () => 0,
                            getEndTime: () => 0,
                            getTitle: () => "",
                            getPayload: () => ""
                        }
                    }
                    async getTournamentsAsync() {
                        return []
                    }
                    async joinAsync(e) {}
                    async shareAsync() {}
                }
            },
            694: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(4989),
                    i = n(9251),
                    s = a(n(8744)),
                    o = a(n(1547)),
                    l = a(n(6408)),
                    d = a(n(9854));
                class c extends o.default {
                    constructor(e) {
                        super(e), this.storage = {
                            getStorageValue: this.getStorageValue.bind(this),
                            getStorageData: this.getStorageData.bind(this),
                            isGameBotRateLimited: this.isGameBotRateLimited.bind(this),
                            save: this.save.bind(this)
                        }, this.loading = {
                            finished: this.finished.bind(this)
                        }, this.tracking = {
                            isFirstTimeUser: this.isFirstTimeUser.bind(this),
                            getGameBotSubscribed: this.getGameBotSubscribed.bind(this),
                            isGameBotRateLimited: this.isGameBotRateLimited.bind(this),
                            getRegistrationDate: this.getRegistrationDate.bind(this)
                        }, this.utils = {
                            createShortcut: this.createShortcut.bind(this),
                            waitForGBCBeingLive: this.waitForGBCBeingLive.bind(this)
                        }, this.backend = new l.default, this.xpromo = new d.default, this.sgModules = {
                            backend: this.backend,
                            xpromo: this.xpromo
                        }, window.GBCXPromo = this
                    }
                    getGameConfig() {
                        return null
                    }
                    init(e, t) {
                        return Promise.resolve()
                    }
                    getLocale() {
                        return console.log("'getLocale' has an implemented logic."), s.default.commsManager.getLanguage()
                    }
                    setLocale(e) {
                        return ""
                    }
                    prepareText(e, t) {
                        return ""
                    }
                    getLocalizableContent(e, t) {
                        return {
                            default: "",
                            localizations: {}
                        }
                    }
                    setProgress(e) {
                        const t = e || 0;
                        s.default.commsManager.setLoadingProgress(t)
                    }
                    finished(e) {
                        return this.interfaceRef.emit(i.InterfaceEvent.LOADED), this.interfaceRef.emit(i.InterfaceEvent.LOAD_PROGRESS, {
                            progress: 101
                        }), Promise.resolve()
                    }
                    async showRewardedAd(e) {
                        return console.log("'showRewardedAd' has an implemented logic."), await s.default.adManager.showRewardedAd()
                    }
                    async showInterstitialAd(e) {
                        return console.log("'showInterstitialAd' has an implemented logic."), await s.default.adManager.showInterstitialAd()
                    }
                    areRewardedAdsSupported() {
                        return s.default.config.adsConfig.rewarded
                    }
                    areInterstitialAdsSupported() {
                        return !0
                    }
                    gameStart() {
                        this.interfaceRef.emit(r.GameEvent.GAME_START)
                    }
                    gameOver(e, t) {
                        this.interfaceRef.emit(r.GameEvent.GAME_OVER, {
                            level: e,
                            score: t
                        }), this.trackScore(e, t)
                    }
                    subscribeToBot() {
                        return Promise.resolve()
                    }
                    isFirstTimeUser() {
                        return !1
                    }
                    getUserLifetime() {
                        return -1
                    }
                    getSessionOfDay() {
                        return -1
                    }
                    getGameBotSubscribed() {
                        return !1
                    }
                    isGameBotRateLimited() {
                        return !1
                    }
                    getRegistrationDate() {
                        return -1
                    }
                    isChallengeAvailable() {
                        return !1
                    }
                    initChallenge(e) {}
                    startChallengeAsync(e) {
                        return Promise.resolve()
                    }
                    updateScore(e) {}
                    getStorageValue(e, t) {
                        let n;
                        try {
                            if (n = s.default.storageManager.getItem(e), null != n) return n
                        } catch (e) {
                            console.log(`Could not restore data - ${e}`)
                        }
                        return t
                    }
                    save(e, t) {
                        return new Promise(((t, n) => {
                            try {
                                const n = Object.entries(e);
                                for (const [e, t] of n) s.default.storageManager.setItem(e, t);
                                t()
                            } catch (e) {
                                n(e)
                            }
                        }))
                    }
                    load(e) {
                        return s.default.storageManager.getItem(e)
                    }
                    getStorageData() {
                        return Object()
                    }
                    getLocalStorageKey() {
                        return ""
                    }
                    waitForGBCBeingLive(e) {
                        return Promise.resolve()
                    }
                    createShortcut() {
                        return Promise.resolve()
                    }
                }
                t.default = c
            },
            6408: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = class {
                    isConnected() {
                        return Promise.resolve(!1)
                    }
                    getUserProfile() {
                        return Promise.resolve(void 0)
                    }
                    getServerTimestamp() {
                        return Promise.resolve(-1)
                    }
                    setUserProfile({
                        handle: e,
                        locale: t
                    }) {
                        return Promise.resolve()
                    }
                    syncFriendListByPlatformPlayerId({
                        friendList: e
                    }) {
                        return Promise.resolve()
                    }
                    getFriendsScores({
                        leaderboardName: e,
                        instanceId: t
                    }) {
                        return Promise.resolve(null)
                    }
                    postScore({
                        leaderboardName: e,
                        instanceId: t,
                        score: n
                    }) {
                        return Promise.resolve()
                    }
                    executeRuntimeScript({
                        route: e,
                        args: t
                    }) {
                        return Promise.resolve(null)
                    }
                }
            },
            9854: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = class {
                    getXPromo({
                        userData: e,
                        serverTime: t
                    }) {
                        return Promise.resolve([])
                    }
                    switchGame(e) {
                        return Promise.resolve()
                    }
                    initialize({
                        gameId: e,
                        playerId: t,
                        switchFunc: n,
                        trackingFunc: a,
                        payload: r,
                        userData: i
                    }) {
                        return () => {}
                    }
                }
            },
            8471: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.SGHooksActionType = void 0,
                    function(e) {
                        e.RUN = "runGame", e.PAUSE = "pauseGame", e.UNPAUSE = "unpauseGame"
                    }(t.SGHooksActionType || (t.SGHooksActionType = {}))
            },
            9916: function(__unused_webpack_module, exports, __webpack_require__) {
                var __importDefault = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(exports, "__esModule", {
                    value: !0
                });
                const GameEvent_1 = __webpack_require__(4989),
                    InterfaceEvent_1 = __webpack_require__(9251),
                    WrapperEvent_1 = __importDefault(__webpack_require__(6430)),
                    html_1 = __webpack_require__(6456),
                    Wrapper_1 = __importDefault(__webpack_require__(8744)),
                    InterfaceBase_1 = __importDefault(__webpack_require__(1547)),
                    SGHooksActionType_1 = __webpack_require__(8471);
                class SGHooksInterface extends InterfaceBase_1.default {
                    constructor(e) {
                        super(e), Wrapper_1.default.instance.supportedLanguages = window.gameLangs, this.loadGameScripts(), window.SG_Hooks = this, window.SG = {
                            lang: Wrapper_1.default.commsManager.getLanguage()
                        }
                    }
                    start() {
                        this.interfaceRef.emit(InterfaceEvent_1.InterfaceEvent.LOAD_PROGRESS, {
                            progress: 101
                        }), Wrapper_1.default.commsManager.startGame()
                    }
                    triggerMoreGames() {}
                    getLanguage(e) {
                        return Wrapper_1.default.commsManager.getLanguage(e)
                    }
                    registerObserver(e) {
                        this.observer = e
                    }
                    setPauseHandler(e) {
                        Wrapper_1.default.commsManager.setPauseCallback(e), void 0 !== this.observer && this.observer({
                            action: SGHooksActionType_1.SGHooksActionType.PAUSE
                        })
                    }
                    setUnpauseHandler(e) {
                        Wrapper_1.default.commsManager.setResumeCallback(e), void 0 !== this.observer && this.observer({
                            action: SGHooksActionType_1.SGHooksActionType.UNPAUSE
                        })
                    }
                    setOrientationHandler(e) {
                        window.addEventListener("orientationchange", (() => {
                            e()
                        }))
                    }
                    setResizeHandler(e) {
                        window.addEventListener("resize", (() => {
                            e()
                        }))
                    }
                    async loaded() {
                        this.interfaceRef.emit(InterfaceEvent_1.InterfaceEvent.LOADED), this.interfaceRef.emit(InterfaceEvent_1.InterfaceEvent.LOAD_PROGRESS, {
                            progress: 101
                        }), void 0 !== this.observer && this.observer({
                            action: SGHooksActionType_1.SGHooksActionType.RUN
                        })
                    }
                    async triggerIncentivise(e) {
                        const t = await Wrapper_1.default.adManager.showRewardedAd();
                        e && e(t)
                    }
                    async beforePlayButtonDisplay(e) {
                        Wrapper_1.default.config.adsConfig.supportsAdPlayButton = !0;
                        const t = await Wrapper_1.default.adManager.showInterstitialAd();
                        e && e(t)
                    }
                    async playButtonPressed(e) {
                        e && e()
                    }
                    isEnabledIncentiviseButton() {
                        return !0
                    }
                    levelStarted(e, t) {
                        this.interfaceRef.emit(GameEvent_1.GameEvent.LEVEL_START, {
                            level: e
                        }), t && t()
                    }
                    levelFinished(e, t, n) {
                        this.interfaceRef.emit(GameEvent_1.GameEvent.LEVEL_FINISH, {
                            level: e
                        }), this.trackScore(e, t), n && n()
                    }
                    gameStart(e) {
                        this.interfaceRef.emit(GameEvent_1.GameEvent.GAME_START), e && e()
                    }
                    gameOver(e, t, n) {
                        this.interfaceRef.emit(GameEvent_1.GameEvent.GAME_OVER, {
                            level: e,
                            score: t
                        }), this.trackScore(e, t), n && n()
                    }
                    levelUp(e, t, n) {
                        n && n()
                    }
                    addBooster() {}
                    setStorageItem(e, t) {
                        Wrapper_1.default.storageManager.setItem(e, t)
                    }
                    getStorageItem(e) {
                        return Wrapper_1.default.storageManager.getItem(e)
                    }
                    setCloseCallback(e) {
                        Wrapper_1.default.commsManager.setResumeCallback(e)
                    }
                    async loadGameScripts() {
                        if (window.gameJS) {
                            for (const e of window.gameJS) await (0, html_1.createHTMLElement)({
                                src: e,
                                tag: "script"
                            });
                            this.initGame()
                        } else this.initGame()
                    }
                    initGame() {
                        try {
                            Wrapper_1.default.instance.isReady ? eval(window.gameOnLoadScript) : Wrapper_1.default.instance.once(WrapperEvent_1.default.READY, (() => {
                                eval(window.gameOnLoadScript)
                            }))
                        } catch (e) {}
                    }
                }
                exports.default = SGHooksInterface
            },
            5797: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(4989),
                    i = n(9251),
                    s = a(n(6430)),
                    o = a(n(8744)),
                    l = a(n(1547)),
                    d = n(1010);
                class c extends l.default {
                    constructor(e) {
                        super(e), window.sgSdk = this
                    }
                    initialize(e, t, n) {
                        this.initData = t, o.default.instance.supportedLanguages = t.supportedLanguages;
                        let a = {
                            commands: {
                                supportedLanguages: t.supportedLanguages
                            },
                            config: {
                                env: {
                                    locale: o.default.commsManager.getLanguage()
                                },
                                rewarded: {
                                    enabled: !0
                                }
                            }
                        };
                        o.default.commsManager.setPauseCallback((() => {
                            this.initData.freezeGame()
                        })), o.default.commsManager.setResumeCallback((() => {
                            this.initData.unfreezeGame()
                        })), o.default.instance.on(s.default.GAME_PAUSE, (() => {
                            this.initData.freezeGame()
                        })), o.default.instance.on(s.default.GAME_RESUME, (() => {
                            this.initData.unfreezeGame()
                        })), o.default.instance.supportedLanguages = t.supportedLanguages, n && n(null, a, window.sgSdk)
                    }
                    getLocale() {
                        return o.default.commsManager.getLanguage()
                    }
                    async trigger(e, t) {
                        switch (e) {
                            case d.SGSDKTriggers.START:
                                this.interfaceRef.emit(i.InterfaceEvent.LOAD_PROGRESS, {
                                    progress: 101
                                }), o.default.commsManager.startGame();
                                break;
                            case d.SGSDKTriggers.LOADING_COMPLETED:
                                this.interfaceRef.emit(i.InterfaceEvent.LOAD_PROGRESS, {
                                    progress: 101
                                }), this.interfaceRef.emit(i.InterfaceEvent.LOADED), this.initData.runGame();
                                break;
                            case d.SGSDKTriggers.LOADING_UPDATE:
                                this.interfaceRef.emit(i.InterfaceEvent.LOAD_PROGRESS, {
                                    progress: t.progressPercentage
                                }), t.progressPercentage >= 100 && this.interfaceRef.emit(i.InterfaceEvent.LOADED);
                                break;
                            case d.SGSDKTriggers.SAVE:
                                if (o.default.storageManager.setItem(t.key, t.value), t.callback) return void t.callback();
                                break;
                            case d.SGSDKTriggers.RESTORE:
                                const n = o.default.storageManager.getItem(t.key);
                                if (t.callback) return void t.callback(null, n);
                                break;
                            case d.SGSDKTriggers.REWARDED_AD:
                                const a = await o.default.adManager.showRewardedAd();
                                if (t.callback) return void t.callback(a);
                                break;
                            case d.SGSDKTriggers.BEFORE_PLAY_BUTTON_DISPLAY:
                                const s = await o.default.adManager.showInterstitialAd();
                                if (t.callback) return void t.callback(s);
                                break;
                            case d.SGSDKTriggers.LEVEL_START:
                                if (this.interfaceRef.emit(r.GameEvent.LEVEL_START, {
                                        level: t.level
                                    }), t.callback) return void t.callback();
                                break;
                            case d.SGSDKTriggers.LEVEL_FINISH:
                                if (this.interfaceRef.emit(r.GameEvent.LEVEL_FINISH, {
                                        level: t.level
                                    }), this.trackScore(t.level, t.score), t.callback) return void t.callback();
                                break;
                            case d.SGSDKTriggers.GAME_START:
                                this.interfaceRef.emit(r.GameEvent.GAME_START);
                                break;
                            case d.SGSDKTriggers.GAME_OVER:
                                if (this.interfaceRef.emit(r.GameEvent.GAME_OVER, t), this.trackScore(null, t.score), t.callback) return void t.callback();
                                break;
                            case d.SGSDKTriggers.PLAY_BUTTON_PRESSED:
                                if (t.callback) return void t.callback(!0);
                                break;
                            case d.SGSDKTriggers.MORE_GAMES || d.SGSDKTriggers.GAME_TRACKING || d.SGSDKTriggers.PAGE_DISPLAY:
                                break;
                            default:
                                console.log("Unrecognized sgsdk command :: " + e)
                        }
                    }
                }
                t.default = c
            },
            1010: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.SGSDKTriggers = void 0,
                    function(e) {
                        e.START = "start", e.LOADING_COMPLETED = "loading.completed", e.LOADING_UPDATE = "loading.update", e.SAVE = "save", e.RESTORE = "restore", e.REWARDED_AD = "rewardedAd", e.BEFORE_PLAY_BUTTON_DISPLAY = "beforePlayButtonDisplay", e.PLAY_BUTTON_PRESSED = "playButtonPressed", e.MORE_GAMES = "moreGames", e.GAME_TRACKING = "gameTracking", e.PAGE_DISPLAY = "pageDisplay", e.LEVEL_START = "levelStart", e.LEVEL_FINISH = "levelFinish", e.GAME_START = "gameStart", e.GAME_OVER = "gameOver"
                    }(t.SGSDKTriggers || (t.SGSDKTriggers = {}))
            },
            1547: function(e, t, n) {
                var a = this && this.__createBinding || (Object.create ? function(e, t, n, a) {
                        void 0 === a && (a = n);
                        var r = Object.getOwnPropertyDescriptor(t, n);
                        r && !("get" in r ? !t.__esModule : r.writable || r.configurable) || (r = {
                            enumerable: !0,
                            get: function() {
                                return t[n]
                            }
                        }), Object.defineProperty(e, a, r)
                    } : function(e, t, n, a) {
                        void 0 === a && (a = n), e[a] = t[n]
                    }),
                    r = this && this.__setModuleDefault || (Object.create ? function(e, t) {
                        Object.defineProperty(e, "default", {
                            enumerable: !0,
                            value: t
                        })
                    } : function(e, t) {
                        e.default = t
                    }),
                    i = this && this.__importStar || function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && a(t, e, n);
                        return r(t, e), t
                    },
                    s = this && this.__importDefault || function(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = n(2665),
                    l = i(n(5215)),
                    d = s(n(8744));
                t.default = class {
                    constructor(e) {
                        this.interfaceRef = e
                    }
                    getConfig() {
                        return d.default.instance.config
                    }
                    getPlayerID() {
                        return d.default.instance.getPlayerID()
                    }
                    setPauseHandler(e) {
                        d.default.commsManager.setPauseCallback(e)
                    }
                    setUnpauseHandler(e) {
                        d.default.commsManager.setResumeCallback(e)
                    }
                    setAdClosedCallback(e) {
                        d.default.adManager.on(o.AdManagerEvent.AD_CLOSE, (() => {
                            e && e()
                        }))
                    }
                    startLongPlayAdTimer() {
                        d.default.adManager.forceLongPlayStart(!0)
                    }
                    stopLongPlayAdTimer() {
                        d.default.adManager.forceLongPlayStart(!1)
                    }
                    getWrapper() {
                        return d.default.instance
                    }
                    isIAP() {
                        return d.default.instance.iapManager.hasIAPSupport()
                    }
                    deviceDectorFunctions() {
                        return l
                    }
                    showSupportPopup() {
                        d.default.instance.showSupportPopup()
                    }
                    trackScore(e, t) {
                        l.nulOrUnd(e) ? l.nulOrUnd(t) || d.default.commsManager.setScore(t) : d.default.commsManager.setScore(e)
                    }
                    setIAPGiftCallback(e) {
                        d.default.instance.iapTracker.giftManager.setIAPGiftCallback(e)
                    }
                    clearUserData() {
                        d.default.instance.storageManager.clearAllData()
                    }
                }
            },
            5499: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.LeaderboardTypes = void 0,
                    function(e) {
                        e[e.FIREBASE = 0] = "FIREBASE", e[e.SAMSUNG = 1] = "SAMSUNG"
                    }(t.LeaderboardTypes || (t.LeaderboardTypes = {}))
            },
            5207: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(2665),
                    i = a(n(8744)),
                    s = a(n(9167)),
                    o = a(n(1932)),
                    l = a(n(9101)),
                    d = n(2436),
                    c = n(660),
                    u = n(6557);
                class f extends s.default {
                    async initialize() {
                        super.initialize(), this.sdkRef = i.default.sdkHandler, l.default.i.on(u.AzerionMetaEvents.CONTENT_PAUSE_REQUESTED, (() => {
                            this.emit(r.AdManagerEvent.AD_START)
                        }));
                        const e = [c.AzerionEvent.SDK_REWARDED_WATCH_COMPLETE, c.AzerionEvent.SDK_SKIPPED, c.AzerionEvent.CONTENT_RESUME_REQUESTED, c.AzerionEvent.SDK_GAME_START];
                        for (let t in e) l.default.i.on(e[t], (() => {
                            this.emit(r.AdManagerEvent.AD_CLOSE)
                        }));
                        return i.default.config.adsConfig.rewarded && this.preloadNextRewarded(), this.showPrerollAD = e => {
                            this.showInterstitialAd(), window.removeEventListener("pointerdown", this.showPrerollAD), e.preventDefault()
                        }, window.addEventListener("pointerdown", this.showPrerollAD), Promise.resolve()
                    }
                    async showInterstitialAd() {
                        this.emit(r.AdManagerEvent.AD_REQUESTED), this.adTimer.ready && (super.showInterstitialAd(), this.sdkRef.showAd())
                    }
                    async showRewardedAd() {
                        super.showRewardedAd(), this.emit(r.AdManagerEvent.AD_REQUESTED);
                        const e = new Promise((async (e, t) => {
                            const n = () => {
                                    i(), this.emit(r.AdManagerEvent.AD_COMPLETE), this.emit(r.AdManagerEvent.AD_CLOSE), e(!0)
                                },
                                a = () => {
                                    i(), this.emit(r.AdManagerEvent.AD_ERROR), this.emit(r.AdManagerEvent.AD_CLOSE), e(!1)
                                },
                                i = () => {
                                    l.default.i.removeListener(c.AzerionEvent.SDK_REWARDED_WATCH_COMPLETE, n), l.default.i.removeListener(c.AzerionEvent.SDK_SKIPPED, a), l.default.i.removeListener(c.AzerionEvent.CONTENT_RESUME_REQUESTED, a), l.default.i.removeListener(c.AzerionEvent.SDK_GAME_START, a)
                                };
                            l.default.i.on(c.AzerionEvent.SDK_REWARDED_WATCH_COMPLETE, n), l.default.i.on(c.AzerionEvent.SDK_SKIPPED, a), l.default.i.on(c.AzerionEvent.CONTENT_RESUME_REQUESTED, a), l.default.i.on(c.AzerionEvent.SDK_GAME_START, a), this.sdkRef.showAd(d.AzerionAdType.REWARDED)
                        }));
                        return this.preloadNextRewarded(), e
                    }
                    setupTimer() {
                        this.adTimer = new o.default, super.setupTimer()
                    }
                    async preloadNextRewarded() {
                        let {
                            err: e
                        } = await this.sdkRef.preloadAd(d.AzerionAdType.REWARDED);
                        e ? console.log("ADManager : Rewarded Ad could not be preloaded.") : console.log("ADManager : Rewarded Ad loaded succesfully.")
                    }
                }
                t.default = f
            },
            1932: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(5522)),
                    i = a(n(4267));
                class s extends r.default {
                    constructor() {
                        super(), this.initialize(i.default.get())
                    }
                }
                t.default = s
            },
            6631: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(6043),
                    i = a(n(6430)),
                    s = n(6456),
                    o = a(n(8744)),
                    l = a(n(9977)),
                    d = a(n(9101)),
                    c = n(660);
                class u extends l.default {
                    constructor() {
                        super(...arguments), this.hasPaused = !1
                    }
                    async initialize() {
                        window.GD_OPTIONS = {
                            gameId: o.default.config.gameID,
                            prefix: "sg_",
                            onEvent: function(e) {
                                console.log("event :: " + e.name), d.default.i.emit(e.name, e)
                            },
                            advertisementSettings: {
                                debug: !1,
                                autoplay: !1,
                                locale: "en"
                            }
                        };
                        const e = new Promise((async (e, t) => {
                            d.default.i.once(c.AzerionEvent.SDK_READY, (() => {
                                if (window.gdsdk) o.default.sdkHandler = window.gdsdk, this.sdkRef = o.default.sdkHandler, e(!0);
                                else {
                                    const t = setInterval((() => {
                                        window.gdsdk && (clearInterval(t), o.default.sdkHandler = window.gdsdk, this.sdkRef = o.default.sdkHandler, e(!0))
                                    }), 10)
                                }
                            }))
                        }));
                        return function(e, t, n) {
                            let a, r = e.getElementsByTagName(t)[0];
                            e.getElementById(n) || (a = e.createElement(t), a.id = n, a.src = "main.min.js", r.parentNode.insertBefore(a, r))
                        }(document, "script", "gamedistribution-jssdk"), d.default.i.on(c.AzerionEvent.SDK_GAME_PAUSE, (() => {
                            this.hasPaused = !0, o.default.instance.emit(i.default.GAME_PAUSE)
                        })), d.default.i.on(c.AzerionEvent.SDK_GAME_START, (() => {
                            this.hasPaused && o.default.instance.emit(i.default.GAME_RESUME), this.hasPaused = !1
                        })), e
                    }
                    async startGame() {
                        return Promise.resolve({
                            err: null
                        })
                    }
                    getLanguage(e = []) {
                        return (0, s.getParameterByName)("lang") || r.Default.LANG
                    }
                    setLoadingProgress(e) {}
                    setPauseCallback(e) {
                        d.default.i.on(c.AzerionEvent.SDK_GAME_PAUSE, (() => {
                            e && e()
                        }))
                    }
                    setResumeCallback(e) {
                        d.default.i.on(c.AzerionEvent.SDK_GAME_START, (() => {
                            e && e()
                        }))
                    }
                    setCloseCallback(e) {}
                    checkPlatformSupport(e) {
                        return !0
                    }
                    setScore(e) {}
                }
                t.default = u
            },
            9101: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075));
                class i extends r.default {
                    static get i() {
                        return i._i ? i._i : i._i = new i
                    }
                }
                t.default = i
            },
            1662: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(4171));
                class i extends r.default {
                    hasIAPSupport() {
                        return !1
                    }
                }
                t.default = i
            },
            8745: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(247));
                class i extends r.default {
                    async setCloudData(e, t) {}
                    async getCloudData(e) {
                        return null
                    }
                }
                t.default = i
            },
            4267: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                class n {
                    constructor() {
                        this.adCooldownDuration = 1e3, this.adWarningDuration = 5e3, this.startOnCooldown = !1, this.maxLongPlayAdTimerRollover = 2e3, this.prerollAd = !0
                    }
                    static get() {
                        return new n
                    }
                }
                t.default = n
            },
            2436: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AzerionAdType = void 0,
                    function(e) {
                        e.REWARDED = "rewarded"
                    }(t.AzerionAdType || (t.AzerionAdType = {}))
            },
            660: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AzerionEvent = void 0,
                    function(e) {
                        e.SDK_GAME_START = "SDK_GAME_START", e.CONTENT_RESUME_REQUESTED = "CONTENT_RESUME_REQUESTED ", e.SDK_GAME_PAUSE = "CONTENT_PAUSE_REQUESTED", e.SDK_GDPR_TRACKING = "SDK_GDPR_TRACKING", e.SDK_REWARDED_WATCH_COMPLETE = "SDK_REWARDED_WATCH_COMPLETE", e.SDK_SKIPPED = "SKIPPED", e.SDK_COMPLETE = "COMPLETE", e.SDK_READY = "SDK_READY", e.SDK_STARTED = "STARTED", e.AD_ERROR = "AD_ERROR", e.AD_IS_ALREADY_RUNNING = "AD_IS_ALREADY_RUNNING"
                    }(t.AzerionEvent || (t.AzerionEvent = {}))
            },
            6557: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.AzerionMetaEvents = void 0,
                    function(e) {
                        e.AD_ERROR = "AD_ERROR", e.AD_BREAK_READY = "AD_BREAK_READY", e.AD_METADATA = "AD_METADATA", e.ALL_ADS_COMPLETED = "ALL_ADS_COMPLETED", e.CLICK = "CLICK", e.COMPLETE = "COMPLETE", e.CONTENT_PAUSE_REQUESTED = "CONTENT_PAUSE_REQUESTED", e.CONTENT_RESUME_REQUESTED = "CONTENT_RESUME_REQUESTED", e.DURATION_CHANGE = "DURATION_CHANGE", e.FIRST_QUARTILE = "FIRST_QUARTILE", e.IMPRESSION = "IMPRESSION", e.INTERACTION = "INTERACTION", e.LINEAR_CHANGED = "LINEAR_CHANGED", e.LOADED = "LOADED", e.LOG = "LOG", e.MIDPOINT = "MIDPOINT", e.PAUSED = "PAUSED", e.RESUMED = "RESUMED", e.SKIPPABLE_STATE_CHANGED = "SKIPPABLE_STATE_CHANGED", e.THIRD_QUARTILE = "THIRD_QUARTILE", e.USER_CLOSE = "USER_CLOSE", e.VOLUME_CHANGED = "VOLUME_CHANGED", e.VOLUME_MUTED = "VOLUME_MUTED", e.GDPR_TARGETING = "SDK_GDPR_TARGETING", e.SDK_GDPR_THIRD_PARTY = "SDK_GDPR_THIRD_PARTY"
                    }(t.AzerionMetaEvents || (t.AzerionMetaEvents = {}))
            },
            5577: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(2801)),
                    i = a(n(1790));
                class s extends i.default {
                    constructor(e = !0) {
                        super(e)
                    }
                    build() {
                        super.build(), this.spinner.classList.remove("progress-ring"), this.spinner.setAttribute("class", "progressringaz"), this.circle.setAttribute("r", "" + (r.default.SPLASH_SPINNER_SIZE_AZ - r.default.SPLASH_SPINNER_STROKE / 2)), this.circle.setAttribute("cx", `${r.default.SPLASH_SPINNER_SIZE_AZ}`), this.circle.setAttribute("cy", `${r.default.SPLASH_SPINNER_SIZE_AZ}`), this.circle.setAttribute("stroke-width", `${r.default.SPLASH_SPINNER_STROKE}`), this.background.setAttribute("class", "background-circle"), this.background.setAttribute("r", "" + (r.default.SPLASH_SPINNER_SIZE_AZ - r.default.SPLASH_SPINNER_STROKE / 2)), this.background.setAttribute("cx", `${r.default.SPLASH_SPINNER_SIZE_AZ}`), this.background.setAttribute("cy", `${r.default.SPLASH_SPINNER_SIZE_AZ}`), this.background.setAttribute("stroke-width", `${r.default.SPLASH_SPINNER_STROKE}`)
                    }
                    show() {
                        super.show(), window.setTimeout((() => {
                            this.hide()
                        }), 3e3)
                    }
                    hide() {
                        super.hide()
                    }
                    updateProgress(e) {
                        super.updateProgress(e)
                    }
                    timeLeftMS() {
                        return super.timeLeftMS()
                    }
                    destroy() {
                        super.destroy()
                    }
                    onLogoShown() {
                        this.softgamesLogo.setAttribute("class", "sg-logo-azerion")
                    }
                }
                t.default = s
            },
            9167: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075)),
                    i = n(2665),
                    s = n(7540),
                    o = n(4989),
                    l = n(5215),
                    d = a(n(8744));
                class c extends r.default {
                    constructor() {
                        super(), this.levelsPlayedSinceLastAd = 0
                    }
                    async initialize() {
                        this.setupTimer(), d.default.interface.on(o.GameEvent.GAME_OVER, (e => {
                            this.onGameOver(e)
                        })), d.default.interface.on(o.GameEvent.LEVEL_FINISH, (e => {
                            this.onGameOver(e)
                        }))
                    }
                    forceLongPlayStart(e) {
                        e ? this.adTimer.startLongPlayAdTimer() : this.adTimer.stopLongPlayAdTimer()
                    }
                    get longPlayTimeLeft() {
                        return this.adTimer.longPlayTimeLeft
                    }
                    showInterstitialAd() {
                        d.default.config.options && !0 === d.default.config.options.disableAllAds || (d.default.adManager.once(i.AdManagerEvent.AD_CLOSE, (() => {
                            d.default.config.adsConfig.enableLongGameplayAds && this.adTimer.startLongPlayAdTimer()
                        })), this.adTimer.stopLongPlayAdTimer(), this.emit(i.AdManagerEvent.INTERSTITIAL_AD_REQUESTED))
                    }
                    showRewardedAd() {
                        d.default.config.options && !0 === d.default.config.options.disableAllAds || this.emit(i.AdManagerEvent.REWARDED_AD_REQUESTED)
                    }
                    setupTimer() {
                        this.adTimer.on(s.AdTimerEvent.LONGPLAY_TRIGGER, (() => {
                            this.showInterstitialAd()
                        }))
                    }
                    onGameOver(e) {
                        this.shouldAdPlayOnGameEnd(e.level, e.score) && this.showInterstitialAd()
                    }
                    shouldAdPlayOnGameEnd(e, t) {
                        this.levelsPlayedSinceLastAd++;
                        const n = !d.default.config.adsConfig.supportsAdPlayButton && (e >= d.default.config.adsConfig.adFreeInitialLevels || (0, l.nulOrUnd)(e)) && this.levelsPlayedSinceLastAd > d.default.config.adsConfig.interstitialCooldownLevel;
                        return n && (this.levelsPlayedSinceLastAd = 0), n
                    }
                }
                t.default = c
            },
            5522: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075)),
                    i = a(n(8744)),
                    s = n(4989),
                    o = n(2665),
                    l = n(7540),
                    d = a(n(6430));
                class c extends r.default {
                    constructor() {
                        super(...arguments), this._longPlayTimeLeft = -1, this.isGameOrLevelPlaying = !1
                    }
                    get ready() {
                        return this._ready
                    }
                    get freeRewardedReady() {
                        return this._freeRewardedReady
                    }
                    get longPlayTimeLeft() {
                        return this._longPlayTimeLeft
                    }
                    initialize(e) {
                        if (this.adRules = e, this.isLongPlayTimerRunning = !1, i.default.config.adsConfig.enableLongGameplayAds) {
                            const e = () => {
                                    this.isGameOrLevelPlaying = !0, this.startLongPlayAdTimer()
                                },
                                t = () => {
                                    this.isGameOrLevelPlaying = !1, this.stopLongPlayAdTimer()
                                };
                            i.default.interface.on(s.GameEvent.GAME_START, (() => {
                                e()
                            })), i.default.interface.on(s.GameEvent.LEVEL_START, (() => {
                                e()
                            })), i.default.interface.on(s.GameEvent.GAME_OVER, (() => {
                                t()
                            })), i.default.interface.on(s.GameEvent.LEVEL_FINISH, (() => {
                                t()
                            }))
                        }
                        this._ready = !e.startOnCooldown, e.startOnCooldown && (i.default.instance.gameStarted ? this.startAdCoolDownTimer() : i.default.instance.once(d.default.GAME_START, (() => {
                            this.startAdCoolDownTimer()
                        }))), this.handleFreeRewardedTimer(), i.default.adManager.on(o.AdManagerEvent.AD_SKIP, (() => {
                            this.onAdPlayed()
                        })), i.default.adManager.on(o.AdManagerEvent.AD_ERROR, (() => {
                            this.onAdFail()
                        }))
                    }
                    startLongPlayAdTimer() {
                        !this.isLongPlayTimerRunning && this.isGameOrLevelPlaying && (console.log("LONG PLAY TIMER STARTED"), this.isLongPlayTimerRunning = !0, this.longPlayTimerID && window.clearInterval(this.longPlayTimerID), this._longPlayTimeLeft = i.default.config.adsConfig.longGameplayCooldownMS, this.longPlayTimerID = window.setInterval((() => {
                            this._longPlayTimeLeft -= 1e3, this.emit(l.AdTimerEvent.LONGPLAY_TICK), this._longPlayTimeLeft <= 0 ? (window.clearInterval(this.longPlayTimerID), this.onLongPlayTimerEnd()) : this._longPlayTimeLeft <= this.adRules.adWarningDuration && (this._longPlayTimeLeft == this.adRules.adWarningDuration && this.emit(l.AdTimerEvent.LONGPLAY_WARN), console.log("warning :: " + this._longPlayTimeLeft), this.emit(l.AdTimerEvent.LONGPLAY_WARN_TICK))
                        }), 1e3), this.emit(l.AdTimerEvent.LONGPLAY_TICKER_START))
                    }
                    stopLongPlayAdTimer() {
                        console.log("LONG PLAY TIMER STOPPED"), window.clearTimeout(this.longPlayTimerID), this.isLongPlayTimerRunning = !1, this.emit(l.AdTimerEvent.LONGPLAY_TICKER_STOP)
                    }
                    startAdCoolDownTimer() {
                        console.log("AD IS ON COOLDOWN FOR THE NEXT " + this.adRules.adCooldownDuration / 1e3 + "SECONDS."), this.adCooldownTimerID = window.setTimeout((() => {
                            this.onAdCoolDownTimerEnd()
                        }), this.adRules.adCooldownDuration), this.emit(l.AdTimerEvent.COOLDOWN_START)
                    }
                    stopAdCoolDownTimer() {
                        console.log("AD COOLDOWN ENDED."), window.clearTimeout(this.adCooldownTimerID)
                    }
                    handleFreeRewardedTimer() {
                        this._freeRewardedReady = !0, i.default.adManager.on(o.AdManagerEvent.FREE_REWARD_AWARDED, (() => {
                            this._freeRewardedReady = !1, window.setTimeout((() => {
                                this._freeRewardedReady = !0
                            }), i.default.config.adsConfig.freeRewardedCooldown)
                        }))
                    }
                    onAdPlayed() {
                        this._ready = !1, this._longPlayTimeLeft = i.default.config.adsConfig.longGameplayCooldownMS, this.startAdCoolDownTimer()
                    }
                    onAdFail() {}
                    onAdCoolDownTimerEnd() {
                        this._ready = !0, this.emit(l.AdTimerEvent.COOLDOWN_END)
                    }
                    onLongPlayTimerEnd() {
                        this._longPlayTimeLeft = i.default.config.adsConfig.longGameplayCooldownMS, i.default.adManager.once(o.AdManagerEvent.AD_CLOSE, (() => {
                            i.default.config.adsConfig.enableLongGameplayAds && (this.stopLongPlayAdTimer(), this.startLongPlayAdTimer())
                        })), this.emit(l.AdTimerEvent.LONGPLAY_TRIGGER), console.log("LONG PLAY AD TRIGERRED"), this.isLongPlayTimerRunning = !1
                    }
                }
                t.default = c
            },
            9977: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075));
                class i extends r.default {
                    constructor() {
                        super(...arguments), this.isPlatformSupported = !0, this._playerID = ""
                    }
                    checkPlatformSupport(e) {
                        return this.isPlatformSupported
                    }
                    get playerID() {
                        return null
                    }
                }
                t.default = i
            },
            4171: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(1075)),
                    i = a(n(8744));
                class s extends r.default {
                    constructor() {
                        super(...arguments), this.isInit = !1
                    }
                    initialize() {
                        return Promise.resolve(!0)
                    }
                    getCatalogAsync() {
                        return Promise.resolve([])
                    }
                    purchaseAsync(e) {
                        return Promise.resolve(null)
                    }
                    getPurchasesAsync() {
                        return Promise.resolve([])
                    }
                    consumePurchaseAsync(e) {
                        return Promise.resolve()
                    }
                    onReady(e) {
                        e && e()
                    }
                    hasIAPSupport() {
                        return i.default.config.inAppPurchase
                    }
                    getSupportedAPIs() {
                        return []
                    }
                    get ready() {
                        return this.isInit
                    }
                }
                t.default = s
            },
            247: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(9233),
                    i = n(5215),
                    s = a(n(8744));
                t.default = class {
                    constructor() {
                        this.store = {
                            _lastUpdate: 0
                        }
                    }
                    async initialize(e) {
                        const t = () => {
                            const t = e.gameSlug.replace(/-/g, "_").toUpperCase();
                            this.storageKey = (0, r.v5)(`${t}_STORAGE`, "28c78f71-1c31-4331-a9ca-e51e9221b3fa")
                        };
                        s.default.config.options ? (0, i.nulOrUnd)(s.default.config.options.forceKey) ? t() : this.storageKey = s.default.config.options.forceKey : t();
                        const n = this.getLocalData(this.storageKey),
                            a = await this.getCloudData(this.storageKey);
                        this.store = a || n, console.log(`user data loaded from '${a?"cloudStorage":"localStorage"}'.`), console.log(`data: ${JSON.stringify(this.store)}`)
                    }
                    setItem(e, t) {
                        const n = Date.now();
                        return this.store = Object.assign(Object.assign({}, this.store), {
                            [e]: t,
                            _lastUpdate: n
                        }), this.save()
                    }
                    getItem(e) {
                        return null === this.store ? null : void 0 === e ? this.store : null != this.store[e] ? this.store[e] : null
                    }
                    getDataForKeys(e) {
                        let t = [];
                        return e.forEach((e => {
                            t.push({
                                name: e,
                                value: this.getItem(e)
                            })
                        })), t
                    }
                    clearAllData() {
                        this.store = {
                            _lastUpdate: 0
                        }, this.save()
                    }
                    async save() {
                        return this.saveLocalData(this.storageKey, this.store), (() => this.setCloudData(this.storageKey, this.store))()
                    }
                    saveLocalData(e, t) {
                        const n = JSON.stringify(t);
                        localStorage.setItem(e, n)
                    }
                    getLocalData(e) {
                        const t = localStorage.getItem(e);
                        return t && JSON.parse(t)
                    }
                    async setCloudData(e, t) {}
                    async getCloudData(e) {
                        return null
                    }
                }
            },
            1840: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(2665),
                    i = n(7540),
                    s = a(n(8744)),
                    o = n(7345);
                t.default = class {
                    constructor() {
                        const e = (0, o.getUIRoot)();
                        this.tag = document.createElement("div"), this.tag.setAttribute("class", "countdown-tag"), e.appendChild(this.tag), this.textfield = document.createElement("h4"), this.textfield.setAttribute("class", "countdown-tag-label"), this.tag.appendChild(this.textfield), s.default.adManager.adTimer.on(i.AdTimerEvent.LONGPLAY_WARN, (() => {
                            this.show()
                        })), s.default.adManager.adTimer.on(i.AdTimerEvent.LONGPLAY_WARN_TICK, (() => {
                            this.update(s.default.adManager.adTimer.longPlayTimeLeft / 1e3)
                        })), s.default.adManager.on(r.AdManagerEvent.AD_START, (() => {
                            this.hide()
                        }))
                    }
                    show() {
                        this.tag.classList.toggle("countdown-tag-fadeIn", !0)
                    }
                    update(e) {
                        this.textfield.textContent = `Ad in ${e}s`, 1 === e ? window.setTimeout((() => {
                            this.hide()
                        }), 1e3) : e < 0 && this.hide()
                    }
                    hide() {
                        this.tag.classList.toggle("countdown-tag-fadeIn", !1)
                    }
                }
            },
            5038: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = a(n(388)),
                    i = n(6618),
                    s = a(n(8744)),
                    o = n(7345),
                    l = n(4186),
                    d = n(5215);
                class c {
                    constructor() {
                        this.isBuilt = !1
                    }
                    static show() {
                        null == c._instance && (c._instance = new c), c._instance.show()
                    }
                    build() {
                        this.isBuilt = !0, this.container = document.createElement("div"), this.container.setAttribute("class", "supportPopupContainer"), this.fullBG = document.createElement("div"), this.fullBG.setAttribute("class", "fullBG");
                        const e = document.createElement("div");
                        e.setAttribute("class", "supportPopup"), this.container.appendChild(e), e.style.backgroundImage = "url(./" + r.default.supportPopupBG + ")";
                        const t = document.createElement("img");
                        t.src = r.default.supportPopupCloseBtn, t.setAttribute("class", "supportPopupCloseBtn"), t.onclick = () => {
                            this.hide()
                        }, this.container.appendChild(t);
                        const n = document.createElement("img");
                        n.src = r.default.supportPopupTextFrame, n.setAttribute("class", "termsAndConditionsBg");
                        const a = document.createElement("img");
                        a.src = r.default.supportPopupTextFrame, a.setAttribute("class", "privacyPolicyBg");
                        const o = document.createElement("div"),
                            d = document.createElement("div");
                        let c = s.default.commsManager.getLanguage();
                        i.wrapperLanguages.includes(c) || (c = "en");
                        let u = "kr" == c ? l.LinksKR.TOS : l.Links.TOS,
                            f = "kr" == c ? l.LinksKR.PRIVACYPOLICY : l.Links.PRIVACYPOLICY;
                        o.setAttribute("class", "termsAndConditionsLinkText"), o.innerHTML = "<a target='_blank' href='" + u + "'>" + i.TEXTS[c].tos + "</a>", d.setAttribute("class", "privacyPolicyLinkText"), d.innerHTML = "<a target='_blank' href='" + f + "'>" + i.TEXTS[c].privacy + "</a>", this.playerIdText = document.createElement("div"), this.playerIdText.setAttribute("class", "playerIdText"), this.container.appendChild(n), this.container.appendChild(a), this.container.appendChild(o), this.container.appendChild(d), this.container.appendChild(this.playerIdText)
                    }
                    show() {
                        this.isBuilt || this.build();
                        const e = (0, o.getUIRoot)();
                        e.appendChild(this.fullBG), e.appendChild(this.container);
                        const t = s.default.instance.getPlayerID();
                        this.playerIdText.innerHTML = (0, d.nulOrUnd)(t) ? "" : "ID: " + t
                    }
                    hide() {
                        const e = (0, o.getUIRoot)();
                        e.contains(this.container) && e.removeChild(this.container), e.contains(this.fullBG) && e.removeChild(this.fullBG)
                    }
                }
                t.default = c, c._instance = null
            },
            6456: (e, t) => {
                function n(e) {
                    return new Promise((t => {
                        document.addEventListener(e, t)
                    }))
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getParameterByName = t.DOMEventToPromise = t.createHTMLElement = void 0, t.createHTMLElement = async function({
                    tag: e,
                    id: t,
                    src: a,
                    style: r,
                    optParent: i
                }) {
                    document.body || await n("DOMContentLoaded");
                    const s = document.createElement(e);
                    if (t && (s.id = t), r && s.setAttribute("style", r), (i || document.body).appendChild(s), a) {
                        const e = function(e) {
                            return new Promise((t => {
                                e.onload = () => {
                                    t()
                                }
                            }))
                        }(s);
                        s.setAttribute("src", a), await e
                    }
                    return s
                }, t.DOMEventToPromise = n, t.getParameterByName = function(e, t = window.location.href) {
                    e = e.replace(/[\[\]]/g, "\\$&");
                    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
                    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
                }
            },
            7345: (e, t) => {
                function n() {
                    const e = document.createElement("div");
                    return e.setAttribute("id", t.UI_ROOT_ELEMENT_ID), e.setAttribute("class", "wrapper-ui"), document.body.appendChild(e), e
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getUIRoot = t.createUIRoot = t.UI_ROOT_ELEMENT_ID = void 0, t.UI_ROOT_ELEMENT_ID = "ui-root", t.createUIRoot = n, t.getUIRoot = function() {
                    return document.getElementById(t.UI_ROOT_ELEMENT_ID) || n()
                }
            },
            2915: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(2665),
                    i = a(n(8744)),
                    s = n(7345);
                t.default = class {
                    constructor() {
                        this.root = (0, s.getUIRoot)(), this.bg = document.createElement("div"), this.bg.setAttribute("class", "loading-screen");
                        const e = document.createElement("div");
                        e.setAttribute("class", "spinner"), this.bg.appendChild(e), i.default.adManager.on(r.AdManagerEvent.AD_REQUESTED, (() => {
                            this.show()
                        })), i.default.adManager.on(r.AdManagerEvent.AD_START, (() => {
                            this.hide()
                        })), i.default.adManager.on(r.AdManagerEvent.AD_CLOSE, (() => {
                            this.hide()
                        }))
                    }
                    show() {
                        this.root.appendChild(this.bg), window.setTimeout((() => {
                            this.hide()
                        }), 5e3)
                    }
                    hide() {
                        this.root.contains(this.bg) && this.root.removeChild(this.bg)
                    }
                }
            },
            1790: function(e, t, n) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = n(7345),
                    i = a(n(2801)),
                    s = n(6456),
                    o = a(n(388)),
                    l = n(9251),
                    d = a(n(8744));
                t.default = class {
                    constructor(e = !0) {
                        this.showRating = e, this.hideCalled = !1, this.root = (0, r.createUIRoot)(), this.build(), d.default.interface.once(l.InterfaceEvent.LOADED, (() => {
                            this.isLoaded = !0, this.canHide && this.hide()
                        }))
                    }
                    build() {
                        this.hideTimer = window.setTimeout((() => {
                            this.canHide = !0, this.isLoaded && this.hide()
                        }), 5e3), this.bg = document.createElement("div"), this.bg.setAttribute("class", "splash-screen");
                        const e = document.createElement("img");
                        e.setAttribute("src", "./Icon_512x512.png"), e.setAttribute("class", "background-image"), this.bg.appendChild(e);
                        const t = document.createElement("img");
                        t.setAttribute("src", "./Icon_512x512.png"), t.setAttribute("class", "game-logo"), this.bg.appendChild(t), this.spinner = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.spinner.setAttribute("class", "progress-ring"), this.background = document.createElementNS("http://www.w3.org/2000/svg", "circle"), this.background.setAttribute("class", "background-circle"), this.background.setAttribute("r", "" + (i.default.SPLASH_SPINNER_SIZE - i.default.SPLASH_SPINNER_STROKE / 2)), this.background.setAttribute("cx", `${i.default.SPLASH_SPINNER_SIZE}`), this.background.setAttribute("cy", `${i.default.SPLASH_SPINNER_SIZE}`), this.background.setAttribute("stroke-width", `${i.default.SPLASH_SPINNER_STROKE}`), this.spinner.appendChild(this.background), this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"), this.circle.classList.add("progress-ring-circle"), this.circle.setAttribute("r", "" + (i.default.SPLASH_SPINNER_SIZE - i.default.SPLASH_SPINNER_STROKE / 2)), this.circle.setAttribute("cx", `${i.default.SPLASH_SPINNER_SIZE}`), this.circle.setAttribute("cy", `${i.default.SPLASH_SPINNER_SIZE}`), this.circle.setAttribute("stroke-width", `${i.default.SPLASH_SPINNER_STROKE}`), this.circle.style.animation = "spin 2s linear infinite", this.spinner.appendChild(this.circle), this.bg.appendChild(this.spinner), (0, s.createHTMLElement)({
                            tag: "img"
                        }).then((async e => {
                            e.src = o.default.softgamesLogo, e.setAttribute("class", "softgames-logo"), this.softgamesLogo = e, this.bg.append(e), this.onLogoShown()
                        })), this.showRating && (0, s.createHTMLElement)({
                            tag: "img",
                            id: i.default.RATING_CONTAINER_ID
                        }).then((async e => {
                            e.src = o.default.ratingImage, this.bg.append(e)
                        })), this.createdAt = new Date, this.circumference = 2 * (i.default.SPLASH_SPINNER_SIZE - i.default.SPLASH_SPINNER_STROKE / 2) * Math.PI, this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`, this.circle.style.strokeDashoffset = "" + (this.circumference - 1 / 3 * this.circumference)
                    }
                    show() {
                        this.hideCalled && window.setTimeout((() => {
                            this.hide()
                        }), 3e3), this.root.appendChild(this.bg)
                    }
                    hide() {
                        this.root.contains(this.bg) && this.root.removeChild(this.bg)
                    }
                    updateProgress(e) {
                        this.circle.style.animation = "", e = Math.max(e, 30), e = Math.min(e, 100);
                        const t = this.circumference - e / 100 * this.circumference;
                        this.circle.style.strokeDashoffset = t
                    }
                    timeLeftMS() {
                        return Math.max(0, i.default.SHOW_RATING_DURATION_MS + i.default.SAMSUNG_SPLASH_DURATION_MS - ((new Date).getTime() - this.createdAt.getTime()))
                    }
                    destroy() {
                        this.hide()
                    }
                    onLogoShown() {}
                }
            },
            240: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = class {
                    constructor() {
                        this.oldO = window.orientation, this.oldW = window.innerWidth, this.oldH = window.innerHeight, window.addEventListener("resize", (() => {
                            window.setTimeout((() => {
                                const e = this.oldW !== window.innerWidth || this.oldH !== window.innerHeight,
                                    t = this.oldW / this.oldH == window.innerWidth / window.innerHeight;
                                this.oldW = window.innerWidth, this.oldH = window.innerHeight;
                                const n = this.oldO !== window.orientation;
                                this.oldO = window.orientation, !e || n || t || location.reload()
                            }), 500)
                        }))
                    }
                }
            },
            6618: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.wrapperLanguages = t.TEXTS = void 0, t.TEXTS = [], t.TEXTS.fr = {
                    play: "JOUER",
                    tos: "Conditions d'utilisation",
                    privacy: "Politique de confidentialité"
                }, t.TEXTS.de = {
                    play: "SPIELEN",
                    tos: "Geschäftsbedingungen",
                    privacy: "Datenschutzerklärung"
                }, t.TEXTS.en = {
                    play: "PLAY",
                    tos: "Terms & Conditions",
                    privacy: "Privacy Policy"
                }, t.TEXTS.es = {
                    play: "JUEGA",
                    tos: "Términos y condiciones",
                    privacy: "Política de privacidad"
                }, t.TEXTS.it = {
                    play: "GIOCA",
                    tos: "Termini e Condizioni",
                    privacy: "Informativa sulla privacy"
                }, t.TEXTS.pt = {
                    play: "JOGAR",
                    tos: "Termos e condições",
                    privacy: "Política de privacidade"
                }, t.TEXTS.ru = {
                    play: "Играть",
                    tos: "Условия",
                    privacy: "Политика конфиденциальн"
                }, t.TEXTS.tr = {
                    play: "OYNA",
                    tos: "Şart ve Koşullar",
                    privacy: "Gizlilik Politikası"
                }, t.TEXTS.nl = {
                    play: "SPEEL",
                    tos: "Voorwaarden",
                    privacy: "Privacybeleid"
                }, t.TEXTS.pl = {
                    play: "GRAJ",
                    tos: "Zasady i warunki",
                    privacy: "Polityka prywatności"
                }, t.TEXTS.hi = {
                    play: "खेलें",
                    tos: "Terms & Conditions",
                    privacy: "Privacy Policy"
                }, t.TEXTS.vi = {
                    play: "Chơi",
                    tos: "Điều khoản & Điều kiện",
                    privacy: "Chính sách Quyền riêng tư"
                }, t.TEXTS.th = {
                    play: "เล่น",
                    tos: "Terms & Conditions",
                    privacy: "Privacy Policy"
                }, t.TEXTS.ja = {
                    play: "プレイ",
                    tos: "利用規約",
                    privacy: "プライバシーポリシー"
                }, t.TEXTS.kr = {
                    play: "놀다",
                    tos: "이용 약관",
                    privacy: "개인정보 보호 정책"
                }, t.TEXTS.ar = {
                    play: "لعب",
                    tos: "Terms & Conditions",
                    privacy: "Privacy Policy"
                }, t.wrapperLanguages = ["en", "fr", "de", "es", "it", "pt", "ru", "tr", "nl", "pl", "hi", "vi", "th", "ja", "kr", "ar"]
            },
            9233: (e, t, n) => {
                var a;
                n.r(t), n.d(t, {
                    NIL: () => L,
                    parse: () => _,
                    stringify: () => c,
                    v1: () => h,
                    v3: () => w,
                    v4: () => R,
                    v5: () => I,
                    validate: () => o,
                    version: () => O
                });
                var r = new Uint8Array(16);

                function i() {
                    if (!a && !(a = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return a(r)
                }
                const s = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
                    o = function(e) {
                        return "string" == typeof e && s.test(e)
                    };
                for (var l = [], d = 0; d < 256; ++d) l.push((d + 256).toString(16).substr(1));
                const c = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = (l[e[t + 0]] + l[e[t + 1]] + l[e[t + 2]] + l[e[t + 3]] + "-" + l[e[t + 4]] + l[e[t + 5]] + "-" + l[e[t + 6]] + l[e[t + 7]] + "-" + l[e[t + 8]] + l[e[t + 9]] + "-" + l[e[t + 10]] + l[e[t + 11]] + l[e[t + 12]] + l[e[t + 13]] + l[e[t + 14]] + l[e[t + 15]]).toLowerCase();
                    if (!o(n)) throw TypeError("Stringified UUID is invalid");
                    return n
                };
                var u, f, g = 0,
                    p = 0;
                const h = function(e, t, n) {
                        var a = t && n || 0,
                            r = t || new Array(16),
                            s = (e = e || {}).node || u,
                            o = void 0 !== e.clockseq ? e.clockseq : f;
                        if (null == s || null == o) {
                            var l = e.random || (e.rng || i)();
                            null == s && (s = u = [1 | l[0], l[1], l[2], l[3], l[4], l[5]]), null == o && (o = f = 16383 & (l[6] << 8 | l[7]))
                        }
                        var d = void 0 !== e.msecs ? e.msecs : Date.now(),
                            h = void 0 !== e.nsecs ? e.nsecs : p + 1,
                            _ = d - g + (h - p) / 1e4;
                        if (_ < 0 && void 0 === e.clockseq && (o = o + 1 & 16383), (_ < 0 || d > g) && void 0 === e.nsecs && (h = 0), h >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                        g = d, p = h, f = o;
                        var m = (1e4 * (268435455 & (d += 122192928e5)) + h) % 4294967296;
                        r[a++] = m >>> 24 & 255, r[a++] = m >>> 16 & 255, r[a++] = m >>> 8 & 255, r[a++] = 255 & m;
                        var A = d / 4294967296 * 1e4 & 268435455;
                        r[a++] = A >>> 8 & 255, r[a++] = 255 & A, r[a++] = A >>> 24 & 15 | 16, r[a++] = A >>> 16 & 255, r[a++] = o >>> 8 | 128, r[a++] = 255 & o;
                        for (var E = 0; E < 6; ++E) r[a + E] = s[E];
                        return t || c(r)
                    },
                    _ = function(e) {
                        if (!o(e)) throw TypeError("Invalid UUID");
                        var t, n = new Uint8Array(16);
                        return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = 255 & t, n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, n[5] = 255 & t, n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, n[7] = 255 & t, n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, n[9] = 255 & t, n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = t / 4294967296 & 255, n[12] = t >>> 24 & 255, n[13] = t >>> 16 & 255, n[14] = t >>> 8 & 255, n[15] = 255 & t, n
                    };

                function m(e, t, n) {
                    function a(e, a, r, i) {
                        if ("string" == typeof e && (e = function(e) {
                                e = unescape(encodeURIComponent(e));
                                for (var t = [], n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
                                return t
                            }(e)), "string" == typeof a && (a = _(a)), 16 !== a.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                        var s = new Uint8Array(16 + e.length);
                        if (s.set(a), s.set(e, a.length), (s = n(s))[6] = 15 & s[6] | t, s[8] = 63 & s[8] | 128, r) {
                            i = i || 0;
                            for (var o = 0; o < 16; ++o) r[i + o] = s[o];
                            return r
                        }
                        return c(s)
                    }
                    try {
                        a.name = e
                    } catch (e) {}
                    return a.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", a.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", a
                }

                function A(e) {
                    return 14 + (e + 64 >>> 9 << 4) + 1
                }

                function E(e, t) {
                    var n = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                }

                function v(e, t, n, a, r, i) {
                    return E((s = E(E(t, e), E(a, i))) << (o = r) | s >>> 32 - o, n);
                    var s, o
                }

                function S(e, t, n, a, r, i, s) {
                    return v(t & n | ~t & a, e, t, r, i, s)
                }

                function T(e, t, n, a, r, i, s) {
                    return v(t & a | n & ~a, e, t, r, i, s)
                }

                function y(e, t, n, a, r, i, s) {
                    return v(t ^ n ^ a, e, t, r, i, s)
                }

                function P(e, t, n, a, r, i, s) {
                    return v(n ^ (t | ~a), e, t, r, i, s)
                }
                const w = m("v3", 48, (function(e) {
                        if ("string" == typeof e) {
                            var t = unescape(encodeURIComponent(e));
                            e = new Uint8Array(t.length);
                            for (var n = 0; n < t.length; ++n) e[n] = t.charCodeAt(n)
                        }
                        return function(e) {
                            for (var t = [], n = 32 * e.length, a = "0123456789abcdef", r = 0; r < n; r += 8) {
                                var i = e[r >> 5] >>> r % 32 & 255,
                                    s = parseInt(a.charAt(i >>> 4 & 15) + a.charAt(15 & i), 16);
                                t.push(s)
                            }
                            return t
                        }(function(e, t) {
                            e[t >> 5] |= 128 << t % 32, e[A(t) - 1] = t;
                            for (var n = 1732584193, a = -271733879, r = -1732584194, i = 271733878, s = 0; s < e.length; s += 16) {
                                var o = n,
                                    l = a,
                                    d = r,
                                    c = i;
                                n = S(n, a, r, i, e[s], 7, -680876936), i = S(i, n, a, r, e[s + 1], 12, -389564586), r = S(r, i, n, a, e[s + 2], 17, 606105819), a = S(a, r, i, n, e[s + 3], 22, -1044525330), n = S(n, a, r, i, e[s + 4], 7, -176418897), i = S(i, n, a, r, e[s + 5], 12, 1200080426), r = S(r, i, n, a, e[s + 6], 17, -1473231341), a = S(a, r, i, n, e[s + 7], 22, -45705983), n = S(n, a, r, i, e[s + 8], 7, 1770035416), i = S(i, n, a, r, e[s + 9], 12, -1958414417), r = S(r, i, n, a, e[s + 10], 17, -42063), a = S(a, r, i, n, e[s + 11], 22, -1990404162), n = S(n, a, r, i, e[s + 12], 7, 1804603682), i = S(i, n, a, r, e[s + 13], 12, -40341101), r = S(r, i, n, a, e[s + 14], 17, -1502002290), n = T(n, a = S(a, r, i, n, e[s + 15], 22, 1236535329), r, i, e[s + 1], 5, -165796510), i = T(i, n, a, r, e[s + 6], 9, -1069501632), r = T(r, i, n, a, e[s + 11], 14, 643717713), a = T(a, r, i, n, e[s], 20, -373897302), n = T(n, a, r, i, e[s + 5], 5, -701558691), i = T(i, n, a, r, e[s + 10], 9, 38016083), r = T(r, i, n, a, e[s + 15], 14, -660478335), a = T(a, r, i, n, e[s + 4], 20, -405537848), n = T(n, a, r, i, e[s + 9], 5, 568446438), i = T(i, n, a, r, e[s + 14], 9, -1019803690), r = T(r, i, n, a, e[s + 3], 14, -187363961), a = T(a, r, i, n, e[s + 8], 20, 1163531501), n = T(n, a, r, i, e[s + 13], 5, -1444681467), i = T(i, n, a, r, e[s + 2], 9, -51403784), r = T(r, i, n, a, e[s + 7], 14, 1735328473), n = y(n, a = T(a, r, i, n, e[s + 12], 20, -1926607734), r, i, e[s + 5], 4, -378558), i = y(i, n, a, r, e[s + 8], 11, -2022574463), r = y(r, i, n, a, e[s + 11], 16, 1839030562), a = y(a, r, i, n, e[s + 14], 23, -35309556), n = y(n, a, r, i, e[s + 1], 4, -1530992060), i = y(i, n, a, r, e[s + 4], 11, 1272893353), r = y(r, i, n, a, e[s + 7], 16, -155497632), a = y(a, r, i, n, e[s + 10], 23, -1094730640), n = y(n, a, r, i, e[s + 13], 4, 681279174), i = y(i, n, a, r, e[s], 11, -358537222), r = y(r, i, n, a, e[s + 3], 16, -722521979), a = y(a, r, i, n, e[s + 6], 23, 76029189), n = y(n, a, r, i, e[s + 9], 4, -640364487), i = y(i, n, a, r, e[s + 12], 11, -421815835), r = y(r, i, n, a, e[s + 15], 16, 530742520), n = P(n, a = y(a, r, i, n, e[s + 2], 23, -995338651), r, i, e[s], 6, -198630844), i = P(i, n, a, r, e[s + 7], 10, 1126891415), r = P(r, i, n, a, e[s + 14], 15, -1416354905), a = P(a, r, i, n, e[s + 5], 21, -57434055), n = P(n, a, r, i, e[s + 12], 6, 1700485571), i = P(i, n, a, r, e[s + 3], 10, -1894986606), r = P(r, i, n, a, e[s + 10], 15, -1051523), a = P(a, r, i, n, e[s + 1], 21, -2054922799), n = P(n, a, r, i, e[s + 8], 6, 1873313359), i = P(i, n, a, r, e[s + 15], 10, -30611744), r = P(r, i, n, a, e[s + 6], 15, -1560198380), a = P(a, r, i, n, e[s + 13], 21, 1309151649), n = P(n, a, r, i, e[s + 4], 6, -145523070), i = P(i, n, a, r, e[s + 11], 10, -1120210379), r = P(r, i, n, a, e[s + 2], 15, 718787259), a = P(a, r, i, n, e[s + 9], 21, -343485551), n = E(n, o), a = E(a, l), r = E(r, d), i = E(i, c)
                            }
                            return [n, a, r, i]
                        }(function(e) {
                            if (0 === e.length) return [];
                            for (var t = 8 * e.length, n = new Uint32Array(A(t)), a = 0; a < t; a += 8) n[a >> 5] |= (255 & e[a / 8]) << a % 32;
                            return n
                        }(e), 8 * e.length))
                    })),
                    R = function(e, t, n) {
                        var a = (e = e || {}).random || (e.rng || i)();
                        if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, t) {
                            n = n || 0;
                            for (var r = 0; r < 16; ++r) t[n + r] = a[r];
                            return t
                        }
                        return c(a)
                    };

                function D(e, t, n, a) {
                    switch (e) {
                        case 0:
                            return t & n ^ ~t & a;
                        case 1:
                        case 3:
                            return t ^ n ^ a;
                        case 2:
                            return t & n ^ t & a ^ n & a
                    }
                }

                function b(e, t) {
                    return e << t | e >>> 32 - t
                }
                const I = m("v5", 80, (function(e) {
                        var t = [1518500249, 1859775393, 2400959708, 3395469782],
                            n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                        if ("string" == typeof e) {
                            var a = unescape(encodeURIComponent(e));
                            e = [];
                            for (var r = 0; r < a.length; ++r) e.push(a.charCodeAt(r))
                        } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
                        e.push(128);
                        for (var i = e.length / 4 + 2, s = Math.ceil(i / 16), o = new Array(s), l = 0; l < s; ++l) {
                            for (var d = new Uint32Array(16), c = 0; c < 16; ++c) d[c] = e[64 * l + 4 * c] << 24 | e[64 * l + 4 * c + 1] << 16 | e[64 * l + 4 * c + 2] << 8 | e[64 * l + 4 * c + 3];
                            o[l] = d
                        }
                        o[s - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32), o[s - 1][14] = Math.floor(o[s - 1][14]), o[s - 1][15] = 8 * (e.length - 1) & 4294967295;
                        for (var u = 0; u < s; ++u) {
                            for (var f = new Uint32Array(80), g = 0; g < 16; ++g) f[g] = o[u][g];
                            for (var p = 16; p < 80; ++p) f[p] = b(f[p - 3] ^ f[p - 8] ^ f[p - 14] ^ f[p - 16], 1);
                            for (var h = n[0], _ = n[1], m = n[2], A = n[3], E = n[4], v = 0; v < 80; ++v) {
                                var S = Math.floor(v / 20),
                                    T = b(h, 5) + D(S, _, m, A) + E + t[S] + f[v] >>> 0;
                                E = A, A = m, m = b(_, 30) >>> 0, _ = h, h = T
                            }
                            n[0] = n[0] + h >>> 0, n[1] = n[1] + _ >>> 0, n[2] = n[2] + m >>> 0, n[3] = n[3] + A >>> 0, n[4] = n[4] + E >>> 0
                        }
                        return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, 255 & n[0], n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, 255 & n[1], n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, 255 & n[2], n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, 255 & n[3], n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, 255 & n[4]]
                    })),
                    L = "00000000-0000-0000-0000-000000000000",
                    O = function(e) {
                        if (!o(e)) throw TypeError("Invalid UUID");
                        return parseInt(e.substr(14, 1), 16)
                    }
            }
        },
        __webpack_module_cache__ = {};

    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t) return t.exports;
        var n = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e].call(n.exports, n, n.exports, __webpack_require__), n.exports
    }
    __webpack_require__.d = (e, t) => {
        for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    };
    var __webpack_exports__ = __webpack_require__(9284)
})();