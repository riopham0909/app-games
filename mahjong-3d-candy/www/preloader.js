PROJECT.PRELOADER = new function () {//здесь мы реализуем прелоадер
    var here = this;

    function init() {//инициализация. как правило не используем.
    }

    here.finish = function () {//конец загрузки прелоадера. как правило не используем.
    }

    here.on_resize = function () {//постоянно вызывается на апдэйт
        var sx = (PROJECT.DAT.width + 2 * here.app.dx) / here.main_back.p_w;
        var sy = PROJECT.DAT.height / here.main_back.p_h;

        if (sx < sy)
            sx = sy;
        here.main_back.sx = sx;
        here.main_back.sy = sy;

        here.main_back.x = (PROJECT.DAT.width - here.main_back.p_w * sx) / 2;
        here.main_back.y = 0;

        here.left.x = -here.app.dx;
        here.right.x = PROJECT.DAT.width + here.app.dx - here.right.p_w * here.right.sx;

    }

    here.show = function (app) {//загрузили ресурсы прелоадера и стартуем
        here.app = app;
        here.app.add_shadow(PROJECT.DAT.shadow);
        here.right = here.app.get_sprite("right");
        here.left = here.app.get_sprite("left");
        here.main_back = here.app.get_sprite("main_back");
        here.right.p_w = 442;
        here.main_back.p_w = 1366;
        here.main_back.p_h = 768;

        if (PROJECT.STR.lng == "ja")
            here.main = here.app.get_sprite("main_ja");
        else here.main = here.app.get_sprite("main");
        here.left.y = here.right.y = 299;
        here.main.x = -166;
        here.main.y = 155;
        here.back = here.app.get_sprite("back");
        here.bar = here.app.get_sprite("bar");
        here.app.preloader_gfx.addChild(here.main_back);
        here.app.preloader_gfx.addChild(here.right);
        here.app.preloader_gfx.addChild(here.left);
        here.app.preloader_gfx.addChild(here.main);
        here.app.preloader_gfx.addChild(here.back);
        here.back.addChild(here.bar);
        here.back.x = 240;
        here.back.y = PROJECT.DAT.height - 100;
        here.bar.sx = 0.2;

        here.app.on_resize_functions.push(here.on_resize);
        here.on_resize();
    }

    here.hide_bar = function () {
        here.bar.destroy();
        here.back.destroy();
        here.back = null;
        here.bar = null;
    }

    here.hide = function (on_hided) {//скрываем прелоадер
        here.app.preloader_gfx.removeChild(here.main_back);
        here.app.preloader_gfx.removeChild(here.left);
        here.app.preloader_gfx.removeChild(here.right);
        here.app.preloader_gfx.removeChild(here.main);
        here.app.remove_from_resize_functions(here.on_resize);

        //here.main.destroy();
        //here.main=null;

        if (on_hided)
            on_hided();
    }

    here.set_progress = function (progress) {//передаем параметры прогресса
        if (here.bar) {
            here.bar.sx = progress;
            PROJECT.sdkHandler.trigger('loading.update', { progressPercentage: Math.floor(100 * progress) }, this);
        }
    }

    init();
}