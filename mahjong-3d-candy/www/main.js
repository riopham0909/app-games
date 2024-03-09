PROJECT.MAIN = function () {//после чтения всего кода js мы вызываем этот конструктор
    var here = this;

    function AVK_REQ() {//запрос
        var loc = this;

        function get_req() {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        }

        function on_complete(data) {
            if (loc.xmlhttp.readyState == 4) {
                if (loc.xmlhttp.status == 200) {
                    var response = loc.xmlhttp.responseText;
                    if (loc.on_back != null)
                        loc.on_back(response);
                    loc.on_back = null;
                    loc.active = false;
                }
            }
        }

        loc.xmlhttp = get_req();
        loc.on_back = null;
        loc.active = false;
        loc.xmlhttp.onreadystatechange = on_complete;

        loc.save = function (php, info, str, on_back) {
            loc.on_back = on_back;
            loc.xmlhttp.open('POST', php, true);
            loc.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            loc.xmlhttp.send("data=" + str + "&info=" + info);
            loc.active = true;
        }

        loc.load = function (path, on_back) {
            loc.active = true;
            loc.on_back = on_back;
            loc.xmlhttp.open('GET', path, true);
            loc.xmlhttp.send(null);
        }
    }

    var requests = [];

    function get_request() {
        for (var i = 0; i < requests.length; i++)
            if (!requests[i].active)
                break;

        if (i < requests.length)
            return requests[i];

        requests.push(new AVK_REQ());
        return requests[i];
    }

    here.save = function (php, info, str, on_back) {
        get_request().save(php, info, str, on_back);
    }

    here.load = function (path, on_back) {
        get_request().load(path, on_back);
    }

    here.pause = 1500;
    function main_update(tk) {
        here.pause -= tk;
        if (here.pause < 0)
            PROJECT.GAME.MAIN.start_game_sdk();
    }

    function start_game() {//реальный старт игры
        here.app.on_update_functions.push(main_update);
        console.log("Start game");
        PROJECT.sdkHandler.trigger('loading.completed',
            {
                callback: (error, user) => {
                    if (error) { /* loading.completed failed, handle error */
                        console.log("Mistake SDK");
                        here.pause = -1;
                    }
                    else { /* loading.completed succeeded, you can use the user object {userId, name, avatar, avatarBase64} */
                        PROJECT.user = user;
                        //PROJECT.GAME.MAIN.before_show();
                        console.log("Start SDK");
                        here.pause = 1500;
                    }
                }
            }, this);
    }

    function on_loaded() {//начинаем работу после загрузки всех ассетов
        PROJECT.GAME.MAIN = new PROJECT.PRT.MAIN(here.app);//создаем все объекты игры
        PROJECT.GAME.MAIN.complete_txt();
        PROJECT.STR.init(start_game);//стартуем
    }

    function init_sdk(fnc) {
        PROJECT.game_paused = false;
        here.fnc_continue = fnc;
        function unfreeze() {
            PROJECT.game_paused = false;
        }

        function freeze() {
            PROJECT.game_paused = true;
        }

        sgSdk.initialize(
            ['basic', 'levelGame', 'scoreGame'],
            {
                id: "mahjong_cube_avk",  //mandatory, a unique identifier for your game (e.g. game name). 
                build: "1.0.0", //mandatory, game version
                supportedLanguages: ['en', 'ru', 'de'],   //mandatory, a list of supported game languages 
                unfreezeGame: function () { unfreeze(); },   //mandatory, unfreeze game and sounds 
                freezeGame: function () { freeze(); }, //mandatory, freeze game and sounds
                runGame: function () { PROJECT.GAME.MAIN.start_game_sdk(); },    ///mandatory, start your game here (e.g. go to main menu) 
                goToLevel: function (level) { PROJECT.GAME.MAIN.start_game(); PROJECT.GAME.MAIN.current_level = level; PROJECT.GAME.MAIN.init_level_after_ads(); PROJECT.GAME.MAIN.on_start(); }, //module:levelGame, a function that takes level number and display this level 
                getScore: function () { return PROJECT.GAME.MAIN.score },   //module:scoreGame, return the current game score (Number)
                startOver: function () { PROJECT.GAME.MAIN.start_over(); }  //module:scoreGame, a function that goes to the actual game play directly 
            }, function (error, settings, sdkHandler) {

                console.log('sdk triggered game callback', arguments)
                if (error) {
                    //error during sdk initialization. log the error object for more details 
                    console.log('error during sdk initialization', error)
                } else {
                    window.sgSettings = settings; //an object contains your commands (settings.commands) and game config (settings.config) 
                    PROJECT.STR.lng = settings.config.env.locale;
                    PROJECT.sdkHandler = sdkHandler; //this is the sdk to be used to call events in the game 
                    //PROJECT.sdkHandler.trigger('start');
                    here.fnc_continue();
                }
            });
    }

    function load_fonts(on_continue) {//загружаем шрифт
        if (/Trident.*rv[ :]*11\./.test(navigator.userAgent)) {
            here.on_continue = on_continue;

            function finish_loaded() {
                here.on_continue();
                here.on_continue = null;
            }
            var fnts = ["Roboto Slab", "Yusei Magic"];
            WebFont.load({
                active: function () {
                    for (var i = 0; i < fnts.length; i++) {
                        var el = document.createElement('tmp_txt_' + i);
                        el.style.fontFamily = fnts[i];
                        el.style.fontSize = "0px";
                        el.style.visibility = "hidden";
                        el.innerHTML = '.1FА';
                        document.body.appendChild(el);
                    }

                    finish_loaded();
                },
                google:
                {
                    families: PROJECT.DAT.fonts
                }
            });
        } else on_continue();
    }

    function sdk_loaded() {
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results == null)
                return "";
            else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        if (getParameterByName("back") != "")
            PROJECT.DAT.room_name = getParameterByName("back");

        function after_fonts() {
            here.app = PROJECT.APP = new PROJECT.APP(on_loaded);
        }

        load_fonts(after_fonts);
    }

    function on_json(data) {
        PROJECT.STR.init_str(JSON.parse(data));
        window.onWrapperReady = () => {
            init_sdk(sdk_loaded);
        }
    }

    here.load("texts.json", on_json);
}