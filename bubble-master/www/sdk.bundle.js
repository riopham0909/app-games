"use strict";(self.webpackChunkgame_core=self.webpackChunkgame_core||[]).push([[630],{506:function(n,t,e){var r=e(2),o=e(0),s=e(3),i=e.n(s),c=e(29),u=e.n(c),a=function(){function n(){this.player=void 0,this.context=void 0,this.graphApi=void 0,this.tournament=void 0,this.payments=void 0}var t=n.prototype;return t.getLocale=function(){return null},t.getPlatform=function(){return null},t.getSDKVersion=function(){return"0.0"},t.getSupportedAPIs=function(){return[]},t.getEntryPointData=function(){return null},t.getEntryPointAsync=function(){return new(u())((function(n){n("")}))},t.canCreateShortcutAsync=function(){return new(u())((function(n,t){t(new Error("Not implemented"))}))},t.quit=function(){},t.performHapticFeedbackAsync=function(){return u().resolve()},n}(),d=function(){function n(){}var t=n.prototype;return t.getID=function(){return null},t.getType=function(){return"SOLO"},n}(),l=function(n){function t(t){var e;return(e=n.call(this)||this).sdk=void 0,e.sdk=t,e}(0,o.Z)(t,n);var e=t.prototype;return e.getID=function(){return this.sdk.getID()},e.getType=function(){return this.sdk.getType()},e.isSizeBetween=function(n,t){return this.sdk.isSizeBetween(n,t)},e.switchAsync=function(n){return this.sdk.switchAsync(n)},e.chooseAsync=function(n){return this.sdk.chooseAsync(n)},e.createAsync=function(n){return this.sdk.createAsync(n)},e.getPlayersAsync=function(){return this.sdk.getPlayersAsync()},t}(d),y=l,p=function(){},f=function(n){function t(t){var e;return(e=n.call(this)||this).sdk=void 0,e.sdk=t,e}(0,o.Z)(t,n);var e=t.prototype;return e.getID=function(){return this.sdk.getID()},e.getASIDAsync=function(){return this.sdk.getASIDAsync()},e.getSignedASIDAsync=function(){return this.sdk.getSignedASIDAsync()},e.getName=function(){return this.sdk.getName()},e.getPhoto=function(){return this.sdk.getPhoto()},e.getDataAsync=function(n){return this.sdk.getDataAsync(n)},e.setDataAsync=function(n){return this.sdk.setDataAsync(n)},e.flushDataAsync=function(){return this.sdk.flushDataAsync()},e.getSignedPlayerInfoAsync=function(n){return this.sdk.getSignedPlayerInfoAsync(n)},e.canSubscribeBotAsync=function(){return this.sdk.canSubscribeBotAsync()},e.subscribeBotAsync=function(){return this.sdk.subscribeBotAsync()},e.getConnectedPlayersAsync=function(){return this.sdk.getConnectedPlayersAsync()},e.isGuest=function(){return!1},t}(p),h=f,A=function(n){function t(t){var e;return(e=n.call(this)||this).sdk=void 0,e.player=void 0,e.context=void 0,e.graphApi=void 0,e.tournament=void 0,e.sdk=t,e.player=new h(t.player),e.context=new y(t.context),e}(0,o.Z)(t,n);var e=t.prototype;return e.getLocale=function(){return this.sdk.getLocale()},e.getPlatform=function(){return this.sdk.getPlatform()},e.getSDKVersion=function(){return this.sdk.getSDKVersion()},e.initializeAsync=function(){return this.sdk.initializeAsync()},e.setLoadingProgress=function(n){this.sdk.setLoadingProgress(n)},e.getSupportedAPIs=function(){return this.sdk.getSupportedAPIs()},e.getEntryPointData=function(){return this.sdk.getEntryPointData()},e.getEntryPointAsync=function(){return this.sdk.getEntryPointAsync()},e.setSessionData=function(n){this.sdk.setSessionData(n)},e.startGameAsync=function(){return this.sdk.startGameAsync()},e.shareAsync=function(n){return this.sdk.shareAsync(n)},e.updateAsync=function(n){return this.sdk.updateAsync(n)},e.switchGameAsync=function(n,t){return this.sdk.switchGameAsync(n,t)},e.canCreateShortcutAsync=function(){return this.sdk.canCreateShortcutAsync()},e.createShortcutAsync=function(){return this.sdk.createShortcutAsync()},e.quit=function(){this.sdk.quit()},e.logEvent=function(n,t,e){return this.sdk.logEvent(n,t,e)},e.onPause=function(n){this.sdk.onPause(n)},e.getInterstitialAdAsync=function(n){return this.sdk.getInterstitialAdAsync(n)},e.getRewardedVideoAsync=function(n){return this.sdk.getRewardedVideoAsync(n)},e.matchPlayerAsync=function(n,t,e){return this.sdk.matchPlayerAsync(n,t,e)},e.checkCanPlayerMatchAsync=function(){return this.sdk.checkCanPlayerMatchAsync()},e.getLeaderboardAsync=function(n){return this.sdk.getLeaderboardAsync(n)},e.postSessionScoreAsync=function(n){return this.sdk.postSessionScoreAsync(n)},e.loadBannerAdAsync=function(n){return this.sdk.loadBannerAdAsync(n)},e.hideBannerAdAsync=function(){return this.sdk.hideBannerAdAsync()},e.showGameRating=function(){var n=(0,r.Z)(i().mark((function n(){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",u().reject(new Error("CLIENT_UNSUPPORTED_OPERATION")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),e.getTournamentAsync=function(){return this.sdk.getTournamentAsync()},e.inviteAsync=function(n){return this.sdk.inviteAsync(n)},e.shareLinkAsync=function(n){return this.sdk.shareLinkAsync(n)},t}(a),g=A,v=e(38),w=e.n(v),m=function(n){this.sdk=void 0,this.sdk=n},k={createAsync:function(){return u().reject(new Error("Unsupported"))},shareAsync:function(){return u().reject(new Error("Unsupported"))},joinAsync:function(){return u().reject(new Error("Unsupported"))},postScoreAsync:function(){return u().reject(new Error("Unsupported"))},getTournamentsAsync:function(){return u().reject(new Error("Unsupported"))}},S=function(n){function t(){return n.call(this,k)||this}(0,o.Z)(t,n);var e=t.prototype;return e.createAsync=function(n){return u().reject(new Error("Unsupported"))},e.shareAsync=function(n){return u().reject(new Error("Unsupported"))},e.joinAsync=function(n){return u().reject(new Error("Unsupported"))},e.postScoreAsync=function(n){return u().reject(new Error("Unsupported"))},e.getTournamentsAsync=function(){return u().reject(new Error("Unsupported"))},t}(m),I=function(n){function t(){return n.call(this)||this}(0,o.Z)(t,n);var e=t.prototype;return e.getID=function(){return null},e.getType=function(){return"SOLO"},e.isSizeBetween=function(n,t){return null},e.switchAsync=function(n){return u().reject(new Error("Unsupported"))},e.chooseAsync=function(){return u().reject(new Error("Unsupported"))},e.createAsync=function(n){return u().reject(new Error("Unsupported"))},e.getPlayersAsync=function(){return u().reject(new Error("Unsupported"))},t}(d),P=e(15),E=e.n(P),D=e(39),b=e.n(D),U=e(52),j=e.n(U),T=e(23),B=e.n(T),C=e(520);function L(n,t){var e="undefined"!==typeof b()&&j()(n)||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(n,t){var e;if(!n)return;if("string"===typeof n)return x(n,t);var r=E()(e=Object.prototype.toString.call(n)).call(e,8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return w()(n);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return x(n,t)}(n))||t&&n&&"number"===typeof n.length){e&&(n=e);var r=0;return function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function x(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var G="playerInfo",M="playerData",N=function(n){function t(){var t;return(t=n.call(this)||this).randomMockId=void 0,t.randomMockId=Math.random().toString(36).substring(7),t}(0,o.Z)(t,n);var e=t.prototype;return e.initPlayerAsync=function(){var n=(0,C.Th)(G)||{},t=(""+Math.floor(99999999*Math.random()+1e8)).substring(0,8),e="Guest_"+this.randomMockId,r="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";n.playerId&&"string"===typeof n.playerId&&(t=n.playerId),n.playerName&&"string"===typeof n.playerName&&(e=n.playerName),n.playerPhoto&&"string"===typeof n.playerPhoto&&(r=n.playerPhoto);var o={playerId:t,playerName:e,playerPhoto:r};return(0,C.vk)(G,o),u().resolve()},e.getID=function(){var n=(0,C.Th)(G)||{};return n.playerId&&"string"===typeof n.playerId?n.playerId:"12345678"},e.getASIDAsync=function(){return u().resolve(this.getID())},e.getSignedASIDAsync=function(){var n=this;return u().resolve({getASID:function(){var t;return null!=(t=n.getID())?t:""},getSignature:function(){return"default_token"}})},e.getName=function(){var n=(0,C.Th)(G)||{};return n.playerName&&"string"===typeof n.playerName?n.playerName:null},e.getPhoto=function(){var n=(0,C.Th)(G)||{};return n.playerPhoto&&"string"===typeof n.playerPhoto?n.playerPhoto:null},e.getDataAsync=function(n){for(var t,e=(0,C.Th)(M)||{},r={},o=L(n);!(t=o()).done;){var s=t.value;s!=M?e[s]&&(r[s]=e[s]):r[s]=e}return u().resolve(r)},e.setDataAsync=function(n){return(0,C.vk)(M,n),u().resolve()},e.flushDataAsync=function(){return u().resolve()},e.getSignedPlayerInfoAsync=function(n){var t=this,e={getPlayerID:function(){return t.getID()},getSignature:function(){return"default_token"}};return u().resolve(e)},e.canSubscribeBotAsync=function(){return u().resolve(!1)},e.subscribeBotAsync=function(){return u().reject(new Error("Unsupported"))},e.getStatsAsync=function(n){return u().reject(new Error("Unsupported"))},e.setStatsAsync=function(n){return u().reject(new Error("Unsupported"))},e.incrementStatsAsync=function(n){var t=this,e=B()(n),r={};try{this.getStatsAsync(e).then((function(o){for(var s,i=L(e);!(s=i()).done;){var c=s.value;o[c]||(o[c]=n[c]);var u=n[c];r[c]=o[c]+u}t.setStatsAsync(r)}))}catch(o){return u().reject(o)}return u().resolve(r)},e.getConnectedPlayersAsync=function(){return u().reject(new Error("Unsupported"))},e.isGuest=function(){return!0},t}(p),R=function(n){function t(t,e){var r;return(r=n.call(this)||this).sdk=void 0,r.type=void 0,r.sdk=e,r.type=t,r}(0,o.Z)(t,n);var e=t.prototype;return e.getPlacementID=function(){return this.type},e.loadAsync=function(){var n=this;return new(u())((function(t,e){"mid-roll"===n.type?n.sdk.preloadAd(n.sdk.AdType.Midroll).then(t).catch(e):"pre-roll"===n.type?n.sdk.preloadAd(n.sdk.AdType.Preroll).then(t).catch(e):"rewarded"===n.type?n.sdk.preloadAd(n.sdk.AdType.Rewarded).then(t).catch(e):e(new Error("Unknown ad type"))}))},e.showAsync=function(){var n=this;return new(u())((function(t,e){if("mid-roll"===n.type)n.sdk.showAd(n.sdk.AdType.Midroll).then(t).catch(e);else if("pre-roll"===n.type)n.sdk.showAd(n.sdk.AdType.Preroll).then(t).catch(e);else if("rewarded"===n.type){var r=!1;window.rewardedWatchCompleted=function(){r=!0},n.sdk.showAd(n.sdk.AdType.Rewarded).then((function(){r?t():e({code:"USER_INPUT"})})).catch(e)}else e(new Error("Unknown ad type"))}))},t}((function(){})),O=R,Z=function(n){function t(){return n.apply(this,arguments)||this}(0,o.Z)(t,n);var e=t.prototype;return e.requestAsync=function(){var n=(0,r.Z)(i().mark((function n(t,e,r){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",u().reject(new Error("Unsupported")));case 1:case"end":return n.stop()}}),n)})));return function(t,e,r){return n.apply(this,arguments)}}(),e.initPlatformAsync=function(){var n=(0,r.Z)(i().mark((function n(){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",u().reject(new Error("Unsupported")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),e.getPlayerASIDAsync=function(){var n=(0,r.Z)(i().mark((function n(){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",u().reject(new Error("Unsupported")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),t}((function(){})),V=Z,_=function(n){function t(t){var e;return(e=n.call(this)||this).sdk=void 0,e.player=void 0,e.context=void 0,e.graphApi=void 0,e.tournament=void 0,e.midAdInstance=void 0,e.preRollAdInstance=void 0,e.rewardedAdInstance=void 0,e.currentPercentLoading=0,e.initSDKAsync=function(){return new(u())((function(n){e.player=new N,e.context=new I,e.graphApi=new V,e.tournament=new S,e.midAdInstance=new O("mid-roll",e.sdk),e.preRollAdInstance=new O("pre-roll",e.sdk),e.rewardedAdInstance=new O("rewarded",e.sdk),e.player.initPlayerAsync().finally(n)}))},e.sdk=t,e}(0,o.Z)(t,n);var e=t.prototype;return e.getLocale=function(){return"en"},e.getSDKVersion=function(){return"1.29.77"},e.getSupportedAPIs=function(){return["getLocale","getSDKVersion","initializeAsync","startGameAsync","setLoadingProgress","getInterstitialAdAsync","getRewardedVideoAsync","getPlatform"]},e.initializeAsync=function(){var n=this;return new(u())((function(t,e){var r=document.getElementById("lds-content");if(r)r.hidden=!1;else{var o='<div id="lds-content"><div id="lds-dual-ring"></div><div id="lds-text"><span id="lds-percent">0</span>% loaded</div></div>';"complete"===document.readyState?n.appendHtml(document.body,o):window.addEventListener("load",(function(){n.appendHtml(document.body,o)}))}n.initSDKAsync().then(t).catch(e)}))},e.startGameAsync=function(){var n;return this.setLoadingProgress(100),null==(n=document.getElementById("lds-content"))||n.remove(),u().resolve()},e.setLoadingProgress=function(n){var t=document.getElementById("lds-percent");t&&(this.currentPercentLoading=Math.round(Math.max(Math.min(n,100),this.currentPercentLoading)),t.innerHTML=""+this.currentPercentLoading,this.currentPercentLoading=n)},e.setSessionData=function(n){},e.shareAsync=function(n){return u().reject(new Error("Unsupported"))},e.updateAsync=function(n){return u().reject(new Error("Unsupported"))},e.switchGameAsync=function(n){return u().reject(new Error("Unsupported"))},e.canCreateShortcutAsync=function(){return u().reject(!1)},e.createShortcutAsync=function(){return u().reject(new Error("Unsupported"))},e.logEvent=function(n){return this.sdk.sendEvent(n),null},e.onPause=function(n){},e.getInterstitialAdAsync=function(n){var t=this;return new(u())((function(e){"mid-roll"===n?e(t.midAdInstance):"pre-roll"===n&&e(t.preRollAdInstance)}))},e.getRewardedVideoAsync=function(n){var t=this;return new(u())((function(n){n(t.rewardedAdInstance)}))},e.matchPlayerAsync=function(n){return u().reject(new Error("Unsupported"))},e.checkCanPlayerMatchAsync=function(){return new(u())((function(n,t){t(!1)}))},e.getLeaderboardAsync=function(n){return u().reject(new Error("Unsupported"))},e.postSessionScore=function(n){return u().reject(new Error("Unsupported"))},e.postSessionScoreAsync=function(n){return u().reject(new Error("Unsupported"))},e.appendHtml=function(n,t){var e=document.createElement("div");for(e.innerHTML=t;e.children.length>0;)n.appendChild(e.children[0])},e.getPlatform=function(){var n=navigator.userAgent||navigator.vendor;return/android/i.test(n)?"ANDROID":/iPad|iPhone|iPod/.test(n)&&!window.MSStream?"IOS":"WEB"},e.inviteAsync=function(n){return u().reject(new Error("Unsupported"))},e.getTournamentAsync=function(){return u().reject(new Error("Unsupported"))},e.shareLinkAsync=function(n){return u().reject(new Error("Unsupported"))},e.loadBannerAdAsync=function(n,t){var e=this;return new(u())((function(r,o){n?(e.createBannerAdElement(t),e.sdk.showAd(e.sdk.AdType.Display,{containerId:n}).finally((function(){r()}))):o(new Error("Placement ID is required"))}))},e.createBannerAdElement=function(n){var t=n.placementId,e=n.position,r=n.bannerWidth,o=n.bannerHeight;if(t){var s=document.getElementById(t);switch(s||((s=document.createElement("div")).id=t,s.style.display="flex",s.style.position="fixed",s.style.alignItems="center",s.style.justifyContent="center",s.style.zIndex="100",s.style.position="fixed",s.style.overflow="hidden",document.body.appendChild(s)),s.style.top="auto",s.style.left="auto",s.style.right="auto",s.style.bottom="auto",s.style.width=r+"px",s.style.height=o+"px",e){case"top":s.style.top="0px",s.style.width="100%";break;case"left":s.style.left="0px",s.style.height="100%";break;case"right":s.style.right="0px",s.style.height="100%";break;case"bottom":s.style.bottom="0px",s.style.width="100%"}}},e.hideBannerAdAsync=function(){return new(u())((function(n){for(var t=w()(document.getElementsByClassName("GameDistributions_banner")),e=0;e<t.length;e++)t[e].style.display="none";n()}))},e.happyTime=function(){},e.showGameRating=function(){return u().reject(new Error("Unsupported"))},t}(a),K=_;"FBInstant"in window&&(window.GameSDK=new g(window.FBInstant)),"gdsdk"in window&&(window.GameSDK=new K(window.gdsdk)),window.FBInstant=window.GameSDK},520:function(n,t,e){e.d(t,{Th:function(){return s},vk:function(){return i}});var r=e(519),o="Bubble Master",s=function(n,t){void 0===t&&(t=!0);try{var e=t?o+"_"+n:n,r=localStorage.getItem(e);return null===r?null:GameCore.Utils.Json.decode(r)}catch(s){return null}},i=function(n,t){try{var e=o+"_"+n,i=s(e,!1),c={};GameCore.Utils.Valid.isObject(i)&&(c=i);var u=GameCore.Utils.Json.clone(t);if(!GameCore.Utils.Valid.isObject(u))return!1;var a=GameCore.Utils.Object.clear(u),d=(0,r.TS)(c,a),l=GameCore.Utils.Json.encode(d);return localStorage.setItem(e,l),!0}catch(y){return!1}}}}]);