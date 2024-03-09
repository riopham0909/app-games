PROJECT.PRT.MAIN = function (app) {
    var here = this;
    here.app = app;
    var DIST = 18;
    var MIN_DIST = 8;
    var MAX_DIST = 19;
    var MAX_ANGLE = 300;

    var BONUS_TIME = PROJECT.STR.bonus_time;
    var SCORE = PROJECT.STR.score;
    var BONUS_SCORE = PROJECT.STR.in_game_bonus_score;

    here.old_dist = DIST;
    here.record = 0;
    here.game_state = "";
    here.is_down = false;
    here.is_down1 = false;
    here.mouse_x = 0;
    here.mouse_y = 0;
    here.snd_vol = 0.5;
    here.mus_vol = 0.5;
    here.mouse_sleep_tk = 0;
    here.first_help = true;

    here.quaternion = new THREE.Quaternion();
    here.attention_pos = new THREE.Vector3(0, 0, 0);
    here.vector = new THREE.Vector3(0, 1, 0);
    here.null_vector = new THREE.Vector3(0, 1, 0);
    here.tk = 0;
    here.cnt = 0;
    here.time_in_game = 0;
    here.angle = 0;
    here.is_added = false;

    here.levels = PROJECT.STR.levels;
    here.cube_0 = null;
    here.cube_1 = null;
    here.bonus_cnt = 1;
    here.add_paused = false;

    here.current_level = 0;
    here.map = [];
    here.fall_cube = 0;
    var HINT_COLOR = 0.7;
    var UNSELECT_COLOR = PROJECT.STR.unselect_col;
    var LIGHT_COLOR = PROJECT.STR.light_col;
    var SELECT_COLOR = PROJECT.STR.select_col;

    here.add_text_part = function (wnd, txt, x, y, big) {
        if (big)
            var part = here.wnd.txt_big_part.copy(wnd);
        else var part = here.wnd.txt_part.copy(wnd);
        part.text = txt;
        part.x = x;
        part.y = y;

        if (big)
            part.part = here.wnd.txt_big_part.copy(part);
        else part.part = here.wnd.txt_part.copy(part);

        part.part.text = txt;
        part.part.x = 0;
        part.part.y = -2;

        part.avk.txt.material.color.r = 0;
        part.avk.txt.material.color.g = 0;
        part.avk.txt.material.color.b = 0;


        part.part.avk.txt.material.color.r = 1;
        part.part.avk.txt.material.color.g = 1;
        part.part.avk.txt.material.color.b = 1;

        function on_progress(obj, progress, current_tk, action) {
            obj.y -= 60 * current_tk / 250;
            obj.x += 20 * current_tk / 250;
        }

        function on_finish(obj, action, manual_stop) {
            obj.part.free();
            obj.free();
        }

        here.app.start(part, 0, 1500, null, on_progress, on_finish);

        return part;
    }

    here.on_resize_upd = function () {//постоянно вызывается на апдэйт

        if (window.orientation != undefined) {
            show_rot(window.orientation !== 0);
        } else {
            show_rot(2 * here.app.dx + PROJECT.DAT.width > PROJECT.DAT.height);
        }

        if (here.msg) {
            if (here.msg.btn_options)
                here.msg.btn_options.x = here.msg.btn_options.p_cx - here.app.dx;
            if (here.msg.btn_music)
                here.msg.btn_music.x = here.msg.btn_music.p_cx - here.app.dx;
        }

        if (here.wnd) {
            here.wnd.btn_options.x = here.wnd.btn_options.p_cx - here.app.dx;

            var sx = (PROJECT.DAT.width + 2 * here.app.dx) / PROJECT.PRELOADER.main_back.p_w;
            var sy = PROJECT.DAT.height / PROJECT.PRELOADER.main_back.p_h;

            if (sx < sy) {
                sx = sy;
            } else {

            }

            here.wnd.main_back.sx = sx;
            here.wnd.main_back.sy = sy;
            /*here.wnd.left_back.sx=sy;
            here.wnd.left_back.sy=sy;
            here.wnd.right_back.sx=sy;
            here.wnd.right_back.sy=sy;*/

            here.wnd.main_back.x = (PROJECT.DAT.width - PROJECT.PRELOADER.main_back.p_w * sx) / 2;
            here.wnd.main_back.y = 0;

            here.wnd.left_back.x = -here.app.dx;
            here.wnd.right_back.x = PROJECT.DAT.width + here.app.dx - PROJECT.PRELOADER.right.p_w * here.wnd.right_back.sx;

            here.wnd.bottom_line.x = -here.app.dx - 200;
            here.wnd.btn_left.x = here.wnd.btn_left.p_cx - here.app.dx;
            here.wnd.btn_right.x = here.wnd.btn_right.p_cx + here.app.dx;
            //here.wnd.cub.x=here.wnd.cub.p_x+here.app.dx;

            here.wnd.lev.x = here.wnd.lev.p_x + here.app.dx;
            here.wnd.time.x = here.wnd.time.p_x - here.app.dx;
            here.wnd.score.x = here.wnd.score.p_x + here.app.dx;

            /*var min_x=0;
            for (var i=0;i<here.map.length;i++)
            {
                if (here.map[i])
                {
                    var v=get_screen_pos(here.map[i])
                    if (v.y<here.wnd.cub.y+here.wnd.cub.p_h+here.wnd.cub.p_w*0.7)
                    {
                        if (min_x<v.x)
                            min_x=v.x;
                    }
                }
            }

            here.screen_dx=min_x+here.wnd.cub.p_w*0.7;
            here.wnd.cub.x=here.wnd.cub.p_x;
            if ((here.wnd.cub.x<here.screen_dx)&&(here.fall_cube==0))
            {
                here.wnd.cub.x=here.screen_dx;
                if (here.wnd.cub.x+here.wnd.cub.p_w*1.1>PROJECT.DAT.width+here.app.dx)
                    here.wnd.cub.x=PROJECT.DAT.width+here.app.dx-here.wnd.cub.p_w*1.1;
            }*/

            here.wnd.btn_change.x = here.wnd.btn_change.p_cx - here.app.dx;
            here.wnd.btn_help.x = here.wnd.btn_help.p_cx + here.app.dx;

            here.wnd.cub.x = here.wnd.cub.p_x + here.app.dx;

            here.cube_scene.position.z = 10;
            here.cube_scene.position.x = here.wnd.cub.x + here.wnd.cub.p_w / 2 - here.wnd.cub.p_w * 0.025;//+here.app.dx;
            here.cube_scene.position.y = here.wnd.cub.y + here.wnd.cub.p_h / 2 - here.wnd.cub.p_h * 0.01;
            here.cube_scene.scale.x = here.cube_scene.scale.y = here.cube_scene.scale.z = here.wnd.cub.p_w * 0.62;
            here.cube_scene.rotation.x = Math.PI * 0.182;
            here.wnd.cub.sx = 0.95;
            here.wnd.cub.sy = 0.98;
        }
    }

    here.screen_dx = 0;
    here.on_resize = function () {//постоянно вызывается на апдэйт

        //here.screen_dx
        here.on_resize_upd();
    }

    function save() {
        var dat = { version: PROJECT.DAT.version, record: here.record, snd_vol: here.snd_vol, mus_vol: here.mus_vol, first_help: here.first_help };
        PROJECT.STR.save(dat);
    }

    function load(fnc) {//загружаем прогресс игрока
        PROJECT.STR.load(fnc);
        //fnc();
    }

    function on_swipe(dx, dy) {
        if ((here.game_state == "hint0") || (here.game_state == "hint1")) {
            if (here.hint_step > 1) {
                if (here.hint_step == 3) {
                    here.main_scene.rotation.y = Math.PI * 6 / 4;
                    return;
                }

                here.main_scene.rotation.y -= dx / 100 * 0.5;
                if (here.hint_step > 3)
                    here.pre_main_scene.rotation.x -= dy / 300;
                here.angle += dx / 100 * 10;
                if (here.angle < -MAX_ANGLE)
                    here.angle = -MAX_ANGLE;
                if (here.angle > MAX_ANGLE)
                    here.angle = MAX_ANGLE;

                if (here.pre_main_scene.rotation.x > Math.PI / 16)
                    here.pre_main_scene.rotation.x = Math.PI / 16;

                if (here.pre_main_scene.rotation.x < -Math.PI / 3)
                    here.pre_main_scene.rotation.x = -Math.PI / 3;

                while (here.main_scene.rotation.y > Math.PI * 2)
                    here.main_scene.rotation.y -= Math.PI * 2;

                while (here.main_scene.rotation.y < -Math.PI * 2)
                    here.main_scene.rotation.y += Math.PI * 2;

                if (here.hint_step == 2) {
                    if ((here.main_scene.rotation.y > Math.PI * 6 / 4) || (here.main_scene.rotation.y < -Math.PI * 2 / 4)) {
                        next_hint();
                        here.main_scene.rotation.y = Math.PI * 6 / 4;
                    }
                }
            }
        }


        if (here.game_state != "game")
            return;

        here.main_scene.rotation.y -= dx / 100 * 0.5;
        here.pre_main_scene.rotation.x -= dy / 300
        //here.angle+=dx/100*10;
        if (here.angle < -MAX_ANGLE)
            here.angle = -MAX_ANGLE;
        if (here.angle > MAX_ANGLE)
            here.angle = MAX_ANGLE;

        if (here.pre_main_scene.rotation.x > Math.PI / 16)
            here.pre_main_scene.rotation.x = Math.PI / 16;

        if (here.pre_main_scene.rotation.x < -Math.PI / 3)
            here.pre_main_scene.rotation.x = -Math.PI / 3;

        while (here.main_scene.rotation.y > Math.PI * 2)
            here.main_scene.rotation.y -= Math.PI * 2;

        while (here.main_scene.rotation.y < -Math.PI * 2)
            here.main_scene.rotation.y += Math.PI * 2;
    }

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function coord() {
        var width = PROJECT.DAT.width + here.app.dx * 2;
        var height = PROJECT.DAT.height;

        mouse.x = here.mouse_x + here.app.dx;
        mouse.y = here.mouse_y;

        mouse.x = (mouse.x / width) * 2 - 1;
        mouse.y = - (mouse.y / height) * 2 + 1;
    }

    here.already_started = false;
    here.start_game_sdk = function () {
        if (here.already_started)
            return;

        here.already_started = true;
        PROJECT.GAME.MAIN.before_show();
    }

    here.start_over = function () {
        PROJECT.GAME.MAIN.start_game(); PROJECT.GAME.MAIN.init_level_after_ads(); PROJECT.GAME.MAIN.on_start();
    }

    here.current_pre_level = here.current_level;
    function next_level() {
        here.add_text_part(here.wnd, "+ " + here.app.convert(PROJECT.STR.bonus_score), -PROJECT.DAT.width / 2 + here.wnd.score.x + here.wnd.txt_score.p_w / 2, here.wnd.txt_score.y, false);
        if (PROJECT.STR.add_time > 0);
        here.add_text_part(here.wnd, " + " + PROJECT.STR.add_time + PROJECT.STR.get(5), -PROJECT.DAT.width / 2 + here.wnd.time.x + here.wnd.time.p_w / 2, here.wnd.time.y + here.wnd.txt_part.p_h * 3, false);

        here.current_pre_level++;
        here.score += PROJECT.STR.bonus_score;
        here.wnd.txt_score.text = here.app.convert(here.score);
        here.add_paused = true;
        here.app.MainSound.setMasterVolume(0);
        PROJECT.sdkHandler.trigger('levelFinish', {
            level: (here.current_level + 1),
            score: here.score,
            state: 'win',
            callback: (error) => {/* optional callback to be triggered after levelFinish logic */


                if (here.current_level < here.levels.length - 1) {
                    if (PROJECT.STR.add_time > 0) {
                        here.time += PROJECT.STR.add_time * 1000;
                        play("add_time");

                    }
                    here.current_level++;
                    here.init_level();
                } else {
                    //on_win();
                    if (PROJECT.STR.add_time > 0) {
                        here.time += PROJECT.STR.add_time * 1000;
                        play("add_time");

                    }
                    here.current_level = 0;
                    here.init_level();
                }
                here.current_pre_level = here.current_level;
                here.add_paused = false;
                save();
                //setTimeout(() => {}, 10000);
            }
        }, this);

    }


    function start_particles() {
        for (var i = 0; i < 50; i++) {
            function on_progress_part(obj, progress, current_tk, action) {
                obj.rotation = obj.dr * progress * progress;
                obj.alpha = obj.scale.x = obj.scale.y = Math.sin(Math.PI * progress);
                obj.alpha /= 6;
                obj.y = obj.start_y + obj.dy * progress * progress;
                obj.scale.x = obj.scale.y = obj.scale.y * obj.sc / 4;
            }

            function on_finish_part(obj, action, manual_stop) {
                obj.x = Math.random() * PROJECT.DAT.width;
                obj.start_y = obj.y = Math.random() * PROJECT.DAT.height;

                obj.avk.img[0].center.x = (Math.random() - 0.5) * 10 + 0.5;
                obj.avk.img[0].center.y = (Math.random() - 0.5) * 10 + 0.5;

                obj.alpha = 0;
                obj.sc = obj.scale.x = obj.scale.y = Math.random() + 0.5;
                obj.dy = PROJECT.DAT.height / 10 * (0.1 + Math.random());
                obj.dr = (Math.random() - 0.5) * 2;

                obj.children[0].material.blending = THREE.AdditiveBlending;
                obj.children[0].material.transparent = true;
                here.app.start(obj, 0, 1250 + obj.dy * 50, null, on_progress_part, on_finish_part);
            }

            on_finish_part(PROJECT.WND.MSG.children.part.copy(here.app.render_gfx));
        }
    }

    function new_particles(pos) {
        function on_progress_sk1(obj, progress, current_tk, action) {
            obj.rotation.x = obj.rsx + obj.rx * progress;
            obj.rotation.y = obj.rsy + obj.ry * progress;
            obj.rotation.y = obj.rsz + obj.rz * progress;

            obj.scale.x = obj.scale.y = (1.05 - progress) * obj.dr;
            obj.material.opacity = Math.sin(Math.PI * progress) / 2;
        }

        function on_finish_sk(obj, action, manual_stop) {
            obj.free();
        }

        for (var i = 0; i < 1; i++) {
            var spr = here.app.get_plane("msg_part_" + Math.floor(Math.random() * 5));
            here.level_scene.add(spr);
            spr.position.x = pos.x + (Math.random() - 0.5) * 0.7;
            spr.position.y = pos.y + (Math.random() - 0.5) * 0.7;
            spr.position.z = pos.z + (Math.random() - 0.5) * 0.7;
            spr.dr = Math.random() * 2;
            spr.material.opacity = 0;
            spr.material.depthWrite = false;
            spr.material.depthTest = false;
            spr.material.blending = THREE.AdditiveBlending;
            spr.dr = (1 + Math.random()) / 7;
            spr.rsx = spr.rotation.x = Math.PI * 2 * Math.random();
            spr.rsy = spr.rotation.y = Math.PI * 2 * Math.random();
            spr.rsz = spr.rotation.z = Math.PI * 2 * Math.random();

            spr.rx = Math.random() * 3;
            spr.ry = Math.random() * 3;
            spr.rz = Math.random() * 3;

            here.app.start(spr, 0, 650 + Math.random() * 450, null, on_progress_sk1, on_finish_sk);
        }
    }

    function destroy_particles(obj, react) {
        var pos = obj.getWorldPosition(here.null_vector);
        function on_progress_sk(obj, progress, current_tk, action) {
            obj.scale.x = obj.scale.y = (1 + Math.sin(Math.PI * progress)) * obj.dr;
            obj.material.opacity = (1 - progress * progress) * 0.125;
        }

        function on_progress_sk1(obj, progress, current_tk, action) {
            obj.rotation.x = obj.rsx + obj.rx * progress;
            obj.rotation.y = obj.rsy + obj.ry * progress;
            obj.rotation.y = obj.rsz + obj.rz * progress;

            obj.scale.x = obj.scale.y = (1.05 - progress) * obj.dr;
            obj.material.opacity = Math.sin(Math.PI * progress) * 0.25;
        }

        function on_finish_sk(obj, action, manual_stop) {
            obj.free();
        }

        var spr = here.app.get_plane("msg_dest");
        here.game_scene.add(spr);
        spr.position.x = pos.x;
        spr.position.y = pos.y;
        spr.position.z = pos.z;
        spr.dr = Math.random() * 2;
        spr.rotation.x = Math.PI / 2;
        spr.material.depthWrite = false;
        spr.material.opacity = 0;
        //spr.material.depthTest=false;
        spr.material.blending = THREE.AdditiveBlending;
        spr.dr = 1.4;

        here.app.start(spr, 150, 450, null, on_progress_sk, on_finish_sk);

        var spr = here.app.get_plane("msg_dest");
        here.game_scene.add(spr);
        spr.position.x = pos.x;
        spr.position.y = pos.y;
        spr.position.z = pos.z;
        spr.dr = Math.random() * 2;
        spr.rotation.y = Math.PI / 2;
        spr.material.depthWrite = false;
        spr.material.opacity = 0;
        //spr.material.depthTest=false;
        spr.material.blending = THREE.AdditiveBlending;
        spr.dr = 1.4;

        here.app.start(spr, 200, 450, null, on_progress_sk, on_finish_sk);

        var spr = here.app.get_plane("msg_dest");
        here.game_scene.add(spr);
        spr.position.x = pos.x;
        spr.position.y = pos.y;
        spr.position.z = pos.z;
        spr.dr = Math.random() * 2;
        spr.material.depthWrite = false;
        spr.material.opacity = 0;
        //spr.material.depthTest=false;
        spr.material.blending = THREE.AdditiveBlending;
        spr.dr = 1.4;

        here.app.start(spr, 250, 450, null, on_progress_sk, on_finish_sk);

        function on_finish(obj, action, manual_stop) {
            if (here.game_state == "game")
                if (!have_variant())
                    change_position();
        }
        here.app.start(null, 0, 700, null, null, on_finish, true);

        if (react)
            var r = 40;
        else r = 10;
        for (var i = 0; i < r; i++) {
            var spr = here.app.get_plane("msg_dest");
            here.game_scene.add(spr);
            spr.position.x = pos.x + (Math.random() - 0.5) * 0.7;
            spr.position.y = pos.y + (Math.random() - 0.5) * 0.7;
            spr.position.z = pos.z + (Math.random() - 0.5) * 0.7;
            spr.dr = Math.random() * 2;
            spr.material.opacity = 0;
            spr.material.depthWrite = false;
            //spr.material.depthTest=false;
            spr.material.blending = THREE.AdditiveBlending;
            spr.dr = (1 + Math.random()) / 7;
            spr.rsx = spr.rotation.x = Math.PI * 2 * Math.random();
            spr.rsy = spr.rotation.y = Math.PI * 2 * Math.random();
            spr.rsz = spr.rotation.z = Math.PI * 2 * Math.random();

            spr.rx = Math.random() * 3;
            spr.ry = Math.random() * 3;
            spr.rz = Math.random() * 3;

            here.app.start(spr, Math.random() * 50, 650 + Math.random() * 450, null, on_progress_sk1, on_finish_sk);
        }

        function on_progress_sk2(obj, progress, current_tk, action) {
            obj.position.x = obj.st_x + (obj.d_x - obj.st_x) * progress * progress + Math.sin(obj.r00 + obj.r0 * 6 * progress) * progress / 2;
            obj.position.y = obj.st_y + (obj.d_y - obj.st_y) * progress * progress;
            obj.position.z = obj.st_z + (obj.d_z - obj.st_z) * progress * progress + Math.sin(obj.r10 + obj.r1 * 6 * progress) * progress / 2;
            obj.visible = true;
            obj.sx = obj.sy = Math.sin(Math.PI * progress) * obj.dr / here.app.dist_3d;
        }


        if (react)
            for (var i = 0; i < 50; i++) {
                var spr = here.app.get_sprite("msg_star", true);
                here.game_scene.add(spr);


                spr.st_x = spr.position.x = pos.x + (Math.random() - 0.5) * 0.7;
                spr.st_y = spr.position.y = pos.y + (Math.random() - 0.5) * 0.7;
                spr.st_z = spr.position.z = pos.z + (Math.random() - 0.5) * 0.7;

                spr.dr = (1 + Math.random()) / 2;
                spr.children[0].material.blending = THREE.AdditiveBlending;
                spr.r0 = Math.random() + 1;
                spr.r00 = Math.random() * 2 * Math.PI;
                spr.r1 = Math.random() + 1;
                spr.r10 = Math.random() * 2 * Math.PI;

                spr.d_x = pos.x + (spr.st_x - pos.x) * (Math.random() + 0.7) * 6.7;;
                spr.d_y = pos.y + (spr.st_y - pos.y) * (Math.random() + 0.7) * 6.7;;
                spr.d_z = pos.z + (spr.st_z - pos.z) * (Math.random() + 0.7) * 6.7;

                spr.sx = spr.sy = 0;
                spr.visible = false;

                here.app.start(spr, 150 + Math.random() * 50, 1250 + Math.random() * 450, null, on_progress_sk2, on_finish_sk);
            }
    }

    function shout_music(time) {
        here.app.sounds.music_new.setVolume(0);
        setTimeout(function () {

            function on_progress_snd(obj, progress, current_tk, action) {
                here.app.sounds.music_new.setVolume(here.mus_vol / 5 * progress);
            }
            here.app.start(null, 0, 500, null, on_progress_snd);
        }, time);
    }

    function start_desrtoy_part(cube) {
        function fly(part) {
            part.drx = (Math.random() * 2 - 1) * 2;
            part.dry = (Math.random() * 2 - 1) * 2;
            part.drz = (Math.random() * 2 - 1) * 2;

            part.dx = (Math.random() * 2 - 1) * 4;
            part.dz = (Math.random() * 2 - 1) * 4;
            part.dy = 5 * (1 + Math.random());
            //part.scale.x=part.scale.y=part.scale.z=0.5;

            function on_progress(obj, progress, current_tk, action) {
                obj.rotation.x += obj.drx * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);
                obj.rotation.z += obj.drz * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);
                obj.rotation.y += obj.dry * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);

                obj.position.x += obj.dx * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);
                obj.position.z += obj.dz * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);
                obj.position.y += obj.dy * current_tk / 1000 * Math.sin(Math.PI / 2 * progress);

                //obj.scale.x=obj.scale.y=obj.scale.z=0.6-progress*progress*0.4;
                obj.dy -= current_tk * 50 / 1000;
            }

            function on_finish(obj, action, manual_stop) {
                if ((obj.start_next == here.current_pre_level) && (here.game_state == "win"))
                    next_level();
                obj.free();

                if ((here.game_state == "hint0") && (here.cubes_cnt <= 0)) {
                    here.msg.btn_close.avk.on_click();
                }

            }


            part.start_next = here.current_pre_level;

            function on_progress_compl(obj, progress, current_tk, action) {
                here.wnd.compl.alpha = Math.cos(Math.PI / 2 * progress) * 0.5 + 0.5 * Math.sin(Math.PI * progress);
            }

            here.app.start(part, 0, 1000, null, on_progress, on_finish);
            if (here.game_state == "win") {
                play("win");
                shout_music(3500);
                here.app.start(part, 0, 3500, null, on_progress_compl);
            }
        }

        for (var i = 0; i < 8; i++) {
            var obj = here.app.get_object("cube" + i);
            here.game_scene.add(obj);

            cube.getWorldPosition(here.vector);
            cube.getWorldQuaternion(here.quaternion);
            obj.position.set(here.vector.x, here.vector.y, here.vector.z);
            obj.setRotationFromQuaternion(here.quaternion);
            obj.material = cube.material;
            fly(obj);
        }

        destroy_particles(cube, true);
    }

    function play(name) {
        if (here.app.sounds[name].isPlaying)
            here.app.sounds[name].stop();
        here.app.sounds[name].setVolume(here.snd_vol);
        here.app.sounds[name].play();
    }

    here.prev_id = -1;
    function destroy_pair(cube0, cube1) {
        if (here.bonus_time > 0) {
            here.bonus_cnt++;
            play("speed_match");
        }

        var f = here.bonus_cnt - 1;
        if (f > 11)
            f = 11;
        play("mt" + f);//Math.floor(Math.random()*12));

        if (here.prev_id == cube0.game_id)
            var mul = 5;
        else var mul = 1;
        here.prev_id = cube0.game_id;
        if (here.game_state == "game") {
            if (mul > 1)
                here.add_text_part(here.wnd, "x 5", PROJECT.DAT.width / 2 - PROJECT.DAT.height / 10, PROJECT.DAT.height / 3 - PROJECT.DAT.height / 10, true);
            if (here.bonus_cnt > 1)
                here.add_text_part(here.wnd, "x " + here.bonus_cnt, PROJECT.DAT.width / 4, PROJECT.DAT.height / 3, true);

            var v0 = get_screen_pos(cube0);
            var tx = v0.x;
            var ty = v0.y;

            v0 = get_screen_pos(cube1);


            var p = here.add_text_part(here.wnd, "+ " + here.app.convert(SCORE * here.bonus_cnt * mul), -PROJECT.DAT.width / 2 + (v0.x + tx) / 2, here.wnd.txt_score.y + (v0.y + ty) / 2 - here.wnd.txt_score.p_h, false);

            p.part.avk.txt.material.color.r = 0x42 / 256;
            p.part.avk.txt.material.color.g = 0x9f / 256;
            p.part.avk.txt.material.color.b = 0x70 / 256;

            here.score += SCORE * here.bonus_cnt * mul;
            here.wnd.txt_score.text = here.app.convert(here.score);
            here.bonus_time = BONUS_TIME;
        }
        here.cubes_cnt -= 2;
        cube0.material.color.r = cube0.material.color.g = cube0.material.color.b = SELECT_COLOR;
        cube1.material.color.r = cube1.material.color.g = cube1.material.color.b = SELECT_COLOR;
        here.selected_cube = null;

        if (here.cube_0) {
            if (here.cube_0.act) {
                here.cube_0.act.stop();
                here.cube_0.act = null;
            }
            here.cube_0.free();
            here.cube_0 = null;
        }
        if (here.cube_1) {
            here.cube_1.free();
            here.cube_1 = null;
        }

        here.map[cube0.game_map_id] = null;
        here.map[cube1.game_map_id] = null;

        if (cube0.game_n[0]) {
            cube0.game_n[0].game_n[2] = null;
            cube0.game_n[0] = null;
        }
        if (cube1.game_n[0]) {
            cube1.game_n[0].game_n[2] = null;
            cube1.game_n[0] = null;
        }

        if (cube0.game_n[1]) {
            cube0.game_n[1].game_n[3] = null;
            cube0.game_n[1] = null;
        }
        if (cube1.game_n[1]) {
            cube1.game_n[1].game_n[3] = null;
            cube1.game_n[1] = null;
        }
        if (cube0.game_n[2]) {
            cube0.game_n[2].game_n[0] = null;
            cube0.game_n[2] = null;
        }
        if (cube1.game_n[2]) {
            cube1.game_n[2].game_n[0] = null;
            cube1.game_n[2] = null;
        }
        if (cube0.game_n[3]) {
            cube0.game_n[3].game_n[1] = null;
            cube0.game_n[3] = null;
        }
        if (cube1.game_n[3]) {
            cube1.game_n[3].game_n[1] = null;
            cube1.game_n[3] = null;
        }

        if ((here.game_state == "hint0") && (here.hint_step < 2)) {
            next_hint();
        }

        if (here.cubes_cnt <= 0) {
            if (here.game_state == "game") {
                here.game_state = "win";
                fin_particles();
            }

        }

        start_desrtoy_part(cube0);
        start_desrtoy_part(cube1);
        cube0.free();
        cube1.free();
    }

    function bad_select(cube) {
        play("wrong");
        if (here.game_state == "hint0")
            next_hint();
        function on_progress(obj, progress, current_tk, action) {
            obj.position.x = obj.start_x + Math.sin(Math.PI * progress) * 0.07 * Math.sin(8 * Math.PI * progress) * Math.cos(12 * Math.PI * progress);
            obj.position.z = obj.start_z + Math.sin(Math.PI * progress) * 0.07 * Math.sin(14 * Math.PI * progress) * Math.cos(9 * Math.PI * progress);

            obj.material.color.r = UNSELECT_COLOR + Math.sin(Math.PI * progress) * (SELECT_COLOR - UNSELECT_COLOR);
            obj.material.color.g = UNSELECT_COLOR - 2 * Math.sin(Math.PI * progress) * (SELECT_COLOR - UNSELECT_COLOR);
            obj.material.color.b = UNSELECT_COLOR - 2 * Math.sin(Math.PI * progress) * (SELECT_COLOR - UNSELECT_COLOR);
        }

        function on_finish(obj, action, manual_stop) {
            obj.position.x = obj.start_x;
            obj.position.y = obj.start_y;
            obj.position.z = obj.start_z;
            obj.material.color.r = obj.material.color.g = obj.material.color.b = UNSELECT_COLOR;
            obj.action = null;
        }

        cube.start_x = cube.position.x;
        cube.start_y = cube.position.y;
        cube.start_z = cube.position.z;
        cube.action = here.app.start(cube, 0, 300, null, on_progress, on_finish);
    }

    here.mat_selected = null;

    function try_select_cube(cube) {
        if (here.game_state != "game") {
            if ((here.game_state == "hint0") && (here.hint_step < 5)) {
                if (cube != here.target_cube)
                    return;
                if (here.hint_step == 0)
                    here.target_cube = here.map[1];
                else if ((here.hint_step == 1) || (here.hint_step == 3))
                    next_hint();
                else if (here.hint_step == 2) {
                    next_hint();
                    next_hint();
                }
            }
        }

        if (cube.action) {
            cube.action.stop();
            cube.action = null;
        }
        if (here.selected_cube) {
            if (cube == here.selected_cube)
                return;

            if (cube.is_free()) {
                if (cube == here.light_cube)
                    here.light_cube = null;

                if (here.cube_1) {
                    here.cube_1.free();
                    here.cube_1 = null;
                }
                play("knock");

                if (cube.game_id != here.selected_cube.game_id) {
                    here.selected_cube.material.color.r = here.selected_cube.material.color.g = here.selected_cube.material.color.b = UNSELECT_COLOR;
                    here.selected_cube = cube;
                    here.selected_cube.material.color.r = here.selected_cube.material.color.g = here.selected_cube.material.color.b = SELECT_COLOR;
                } else destroy_pair(here.selected_cube, cube);
            } else bad_select(cube);
        } else {
            if (cube.is_free()) {
                play("knock");

                if (cube == here.light_cube)
                    here.light_cube = null;
                if (here.cube_1) {
                    here.cube_1.free();
                    here.cube_1 = null;
                }
                here.selected_cube = cube;
                here.selected_cube.material.color.r = here.selected_cube.material.color.g = here.selected_cube.material.color.b = SELECT_COLOR;
            } else bad_select(cube);
        }

        if (here.cube_0) {
            if (here.cube_0.act) {
                here.cube_0.act.stop();
                here.cube_0.act = null;
            }

            here.cube_0.free();
            here.cube_0 = null;
        }
        if (here.cube_1) {
            here.cube_1.free();
            here.cube_1 = null;
        }


        if (here.selected_cube) {
            if (here.cube_0) {
                if (here.cube_0.act) {
                    here.cube_0.act.stop();
                    here.cube_0.act = null;
                }
                here.cube_0.free();
            }

            here.cube_0 = here.get_cube(here.selected_cube.game_id);
            here.cube_scene.add(here.cube_0);
            here.cube_0.position.x = 0;
            here.cube_0.position.y = 0.68;
            here.cube_0.position.z = 0;
            here.cube_0.rotation.x = Math.PI;
            here.cube_0.rotation.y = Math.PI / 4;
            here.cube_0.rotation.z = 0;

            function on_progress_q(obj, progress, current_tk, action) {
                here.cube_0.position.y = -0.68 + 2 * 0.68 * progress * progress;
                here.cube_0.scale.x = here.cube_0.scale.y = here.cube_0.scale.z = 1 + Math.sin(Math.PI * progress) / 20;
            }

            function on_finish_q(obj, action, manual_stop) {
                here.cube_0.act = null;
            }

            here.cube_0.act = here.app.start(here.cube_0, 0, 250, null, on_progress_q, on_finish_q);
            //here.mat_selected=here.app.get_sprite_t(here.app.materials["blcks_q"+here.selected_cube.game_id]);
            //here.mat_selected=PROJECT.WND.BLOCKS.children["q"+here.selected_cube.game_id].copy(here.wnd.place);
            //here.wnd.place.addChild(here.mat_selected);
            //here.mat_selected.sx=here.mat_selected.sy=0.25;
            //here.wnd.cub.visible=true;
        }
    }

    function try_light_cube(cube) {
        if (cube == here.selected_cube)
            return;

        if (cube == here.light_cube)
            return;

        if (here.light_cube) {
            if ((here.game_state == "hint0") && (here.hint_step < 1) && (here.light_cube.game_map_id > 1))
                here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
            else if ((here.game_state == "hint0") && (here.hint_step < 4) && (here.light_cube.game_map_id > 3))
                here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
            else if ((here.game_state == "hint0") && (here.hint_step == 4) && (here.light_cube.game_map_id > 4))
                here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
            else here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR;
        }

        here.light_cube = cube;
        if (here.light_cube.is_free())
            here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = LIGHT_COLOR;
        else {
            here.light_cube.material.color.r = SELECT_COLOR;
            here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
        }

        if (here.cube_1)
            here.cube_1.free();

        here.cube_1 = here.get_cube(here.light_cube.game_id);
        here.cube_scene.add(here.cube_1);
        here.cube_1.position.x = 0;
        here.cube_1.position.y = -0.68;
        here.cube_1.position.z = 0;
        here.cube_1.rotation.x = Math.PI;
        here.cube_1.rotation.y = Math.PI / 4;
        here.cube_1.rotation.z = 0;
    }

    function on_down(obj, x, y, button, ident) {
        if ((!here.app.focused) || (here.add_paused) || (PROJECT.game_paused))
            return;

        //here.wnd.txt_level.text=ident;
        if (ident <= 0) {
            here.mouse_x = x;
            here.mouse_y = y;
            //here.cube.material.color.r=here.cube.material.color.g=here.cube.material.color.b=0.9;

            coord();
            //if (here.app.busy>0)
            //    return;
            raycaster.setFromCamera(mouse, here.app.camera_3d);
            var intersects = raycaster.intersectObjects(here.level_scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                if (typeof (intersects[i].object.is_free) != "undefined") {
                    try_select_cube(intersects[i].object);
                    here.mouse_sleep_tk = 100;
                    here.is_down = true;
                    return;
                }
                //mimo(intersects[0]);//intersects[0].point
            }
            here.mouse_sleep_tk = 0;
            here.is_down = true;
        } else {
            here.old_dist = DIST;
            here.mouse_x1 = x;
            here.mouse_y1 = y;
            here.mouse_x2 = here.mouse_x;
            here.mouse_y2 = here.mouse_y;
            here.is_down1 = true;
        }
    }

    function on_up(obj, x, y, button, ident) {
        if (ident <= 0) {
            here.is_down = false;
        } else {
            here.is_down1 = false;
        }
    }

    function on_move(obj, x, y, button, ident) {
        if (here.game_paused)
            return;
        if (here.game_state == "main_screen")
            return;

        if (ident <= 0) {
            if ((here.is_down) && (here.mouse_sleep_tk <= 0)) {
                on_swipe(here.mouse_x - x, here.mouse_y - y);
                here.mouse_x = x;
                here.mouse_y = y;
            }
            here.mouse_x = x;
            here.mouse_y = y;
            coord();
            raycaster.setFromCamera(mouse, here.app.camera_3d);
            var intersects = raycaster.intersectObjects(here.level_scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                if (typeof (intersects[i].object.is_free) != "undefined") {
                    try_light_cube(intersects[i].object);
                    break;
                }
            }

            if (i == intersects.length) {
                if (here.light_cube) {
                    if ((here.game_state == "hint0") && (here.hint_step < 1) && (here.light_cube.game_map_id > 1))
                        here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
                    else if ((here.game_state == "hint0") && (here.hint_step < 4) && (here.light_cube.game_map_id > 3))
                        here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
                    else if ((here.game_state == "hint0") && (here.hint_step == 4) && (here.light_cube.game_map_id > 4))
                        here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR * HINT_COLOR;
                    else here.light_cube.material.color.r = here.light_cube.material.color.g = here.light_cube.material.color.b = UNSELECT_COLOR;
                    here.light_cube = null;
                    if (here.cube_1) {
                        here.cube_1.free();
                        here.cube_1 = null;
                    }
                }
            }
        } else {
            if ((here.is_down) && (here.is_down1)) {

                var l1 = Math.floor(here.app.get_length(here.mouse_x2 - here.mouse_x1, here.mouse_y2 - here.mouse_y1));

                var l2 = Math.floor(here.app.get_length(here.mouse_x2 - x, here.mouse_y2 - y));
                //here.wnd.txt_level.text=l1+":"+l2;
                DIST = here.old_dist + (l1 - l2) / 20;

                if (DIST > MAX_DIST)
                    DIST = MAX_DIST;

                if (DIST < MIN_DIST)
                    DIST = MIN_DIST;

                if (here.game_state == "hint0") {
                    if (here.hint_step == 5) {
                        next_hint();
                    }
                }
            }
        }
    }

    function fin_particles() {
        for (var i = 0; i < 150; i++) {

            function on_progress_part(obj, progress, current_tk, action) {
                obj.rotation = obj.dr * progress * progress;
                obj.alpha = obj.scale.x = obj.scale.y = Math.sin(Math.PI * progress);
                obj.alpha = Math.sin(Math.PI * progress);
                obj.y = obj.start_y + obj.dy * progress * progress;
                obj.scale.x = obj.scale.y = obj.scale.y * obj.sc / 4;
            }

            function on_finish_part(obj, action, manual_stop) {
                obj.free();

            }

            var obj = PROJECT.WND.MSG.children["part_" + Math.floor(Math.random() * 5)].copy(here.wnd);
            obj.x = Math.random() * (here.app.dx * 2 + PROJECT.DAT.width) - here.app.dx;
            obj.start_y = obj.y = Math.random() * PROJECT.DAT.height;

            obj.avk.img[0].center.x = (Math.random() - 0.5) * 20 + 0.5;
            obj.avk.img[0].center.y = (Math.random() - 0.5) * 20 + 0.5;

            obj.alpha = 0;
            obj.sc = obj.scale.x = obj.scale.y = Math.random() + 0.5;
            obj.dy = PROJECT.DAT.height / 10 * (0.1 + Math.random());
            obj.dr = (Math.random() - 0.5) * 2;

            obj.children[0].material.blending = THREE.AdditiveBlending;
            obj.children[0].material.transparent = true;
            here.app.start(obj, Math.random() * 50, 200 + obj.dy * 12, null, on_progress_part, on_finish_part);
        }
    }

    here.init_level_after_ads = function () {
        if (here.game_state == "game")
            return;
        here.wnd.ads_change.visible = ((here.change_cnt == 0) && (window.sgSettings.config.rewarded.enabled));
        here.wnd.ads_help.visible = ((here.help_cnt == 0) && (window.sgSettings.config.rewarded.enabled));
        here.cube_scene.visible = true;
        here.prev_id = -1;
        here.main_scene.rotation.y = Math.PI / 4;
        here.main_scene.rotation.x = 0;
        here.main_scene.rotation.z = 0;
        here.pre_main_scene.rotation.x = -Math.PI / 4;
        here.pre_main_scene.rotation.y = here.pre_main_scene.rotation.z = 0;
        here.pre_main_scene.rotation.x = -Math.PI / 16;
        here.selected_cube = null;
        here.light_cube = null;
        here.swipe_dx = 0;
        if (here.cube_0) {
            if (here.cube_0.act) {
                here.cube_0.act.stop();
                here.cube_0.act = null;
            }
            here.cube_0.free();
            here.cube_0 = null;
        }
        if (here.cube_1) {
            here.cube_1.free();
            here.cube_1 = null;
        }

        DIST = 11;
        if (here.game_state == "hint0") {
            here.pre_main_scene.rotation.x = -Math.PI / 12;
            here.level = PROJECT.STR.hint0;
            here.level.dx = -here.level.map[0][0].length / 2 + 0.5;
            here.level.dz = -here.level.map[0].length / 2 + 0.5;
            here.level.dy = here.level.map.length / 2 + 0.5;
        } else if (here.game_state == "hint1") {
            here.level = PROJECT.STR.hint1;
            here.level.dx = -here.level.map[0][0].length / 2 + 0.5;
            here.level.dz = -here.level.map[0].length / 2 + 0.5;
            here.level.dy = here.level.map.length / 2 + 0.5;
        } else {
            here.wnd.txt_level.text = "" + (1 + here.current_level);
            here.level = here.levels[here.current_level];
            here.level.dx = -here.level.map[0][0].length / 2 + 0.5;
            here.level.dz = -here.level.map[0].length / 2 + 0.5;
            here.level.dy = here.level.map.length / 2 - 0.5;
            PROJECT.sdkHandler.trigger('levelStart', {
                level: (here.current_level + 1)
            }, this);
        }
        here.level_scene.position.set(here.level.dx, here.level.dy, here.level.dz);
        if (here.current_level == 0) {
            here.score = 0;
            here.wnd.txt_score.text = here.app.convert(here.score);
        }

        var map = [];//карта блоков
        var floor_cnt = [];//количество блоков на этаже
        var cnt = 0;

        while (here.map.length > 0) {
            var obj = here.map.pop();
            if (obj)
                obj.free();
        }

        here.cubes_cnt = 0;
        for (var z = 0; z < here.level.map.length; z++) {
            var floor = here.level.map[z];
            var arr = [];
            map.push(arr);
            cnt = 0;

            for (var y = 0; y < floor.length; y++) {
                var place = [];
                arr.push(place);

                for (var x = 0; x < floor[y].length; x++) {
                    if (floor[y][x] == "1") {
                        here.cubes_cnt++;
                        cnt++;
                    }
                    place.push(null);
                }
            }
            floor_cnt.push(cnt);
        }

        //console.log(here.cubes_cnt/2);
        if (Math.floor(here.cubes_cnt / 2) * 2 != here.cubes_cnt)
            alert("Level " + here.current_level + " has mistake.");

        var colors = [];
        var colors_id = [];
        for (var i = 0; i < PROJECT.STR.num_colors; i++)
            colors_id.push(i);

        for (var i = 0; i < 200; i++) {
            var id0 = Math.floor(Math.random() * PROJECT.STR.num_colors);
            var id1 = Math.floor(Math.random() * PROJECT.STR.num_colors);
            var t = colors_id[id0];
            colors_id[id0] = colors_id[id1];
            colors_id[id1] = t;
        }

        var tmp = 0;
        for (var i = 0; i < here.level.num_colors; i++)
            colors.push(0);

        for (i = 0; i < here.cubes_cnt / 2; i++) {
            colors[tmp]++;
            tmp++;
            if (tmp >= colors.length)
                tmp = 0;
        }

        function get_color() {
            do {
                var id = Math.floor(Math.random() * colors.length);
            } while (colors[id] <= 0);
            colors[id]--;
            return colors_id[id];
        }


        function put_blocks(color) {//укладываем два блока
            var max = -1;
            var prev_max_id = -1;
            var max_id = -1;

            for (var i = 0; i < floor_cnt.length; i++) {
                if ((floor_cnt[i] > 0) && (max <= floor_cnt[i])) {
                    prev_max_id = max_id;
                    max_id = i;
                    max = floor_cnt[i];
                }
            }

            if (prev_max_id < 0)
                prev_max_id = max_id;
            if (here.first == 2)
                prev_max_id = max_id;
            floor_cnt[prev_max_id]--;
            floor_cnt[max_id]--;

            function put_block(color, floor_id) {
                function set_block(color, floor_id, x, y) {
                    var cube = here.get_cube(color);
                    cube.game_map_id = here.map.length;
                    here.map.push(cube);
                    cube.position.set(x, -floor_id, y);
                    cube.game_x = x;
                    cube.game_y = y;
                    cube.game_z = floor_id;
                    cube.game_n = [null, null, null, null];
                    map[floor_id][y][x] = cube;

                    if (x > 0) {
                        var n = map[floor_id][y][x - 1];
                        if (n) {
                            cube.game_n[3] = n;
                            n.game_n[1] = cube;
                        }
                    }

                    if (x + 1 < map[floor_id][y].length) {
                        var n = map[floor_id][y][x + 1];
                        if (n) {
                            cube.game_n[1] = n;
                            n.game_n[3] = cube;
                        }
                    }

                    if (y > 0) {
                        var n = map[floor_id][y - 1][x];
                        if (n) {
                            cube.game_n[0] = n;
                            n.game_n[2] = cube;
                        }
                    }

                    if (y + 1 < map[floor_id].length) {
                        var n = map[floor_id][y + 1][x];
                        if (n) {
                            cube.game_n[2] = n;
                            n.game_n[0] = cube;
                        }
                    }

                    cube.is_free = function () {
                        return !(((this.game_n[0] != null) && (this.game_n[2] != null)) || ((this.game_n[3] != null) && (this.game_n[1] != null)));
                    }
                }

                var floor = here.level.map[floor_id];//карта уровня
                var map_floor = map[floor_id];//хранение блоков
                var arr = [];
                if ((here.game_state == "hint0") && (here.first == 0)) {
                    here.first = 1;
                    set_block(color, floor_id, 0, 2);
                } else if ((here.game_state == "hint0") && (here.first == 1)) {
                    here.first = 2;
                    set_block(color, floor_id, 2, 2);
                } else if ((here.game_state == "hint0") && (here.first == 2)) {
                    here.first = 3;
                    set_block(color, floor_id, 2, 0);
                } else if ((here.game_state == "hint0") && (here.first == 3)) {
                    here.first = 4;
                    set_block(color, floor_id, 0, 2);
                } else if ((here.game_state == "hint0") && (here.first == 4)) {
                    here.first = 5;
                    set_block(color, floor_id, 1, 0);
                } else {

                    for (var y = 0; y < floor.length; y++) {
                        for (var x = 0; x < floor[y].length; x++) {
                            if ((floor[y][x] == "1") && (map_floor[y][x] == null))
                                arr.push([x, y]);
                        }
                    }

                    var coord_id = Math.floor(Math.random() * arr.length);

                    if ((Math.random() > 0.5) || (here.game_state == "hint1")) {//кладем по X
                        y = arr[coord_id][1];
                        if ((Math.random() > 0.5) || (here.game_state == "hint1")) {
                            for (x = 0; x < floor[y].length; x++) {
                                if ((floor[y][x] == "1") && (map_floor[y][x] == null)) {
                                    set_block(color, floor_id, x, y);
                                    return;
                                }
                            }
                        } else {
                            for (x = floor[y].length - 1; x >= 0; x--) {
                                if ((floor[y][x] == "1") && (map_floor[y][x] == null)) {
                                    set_block(color, floor_id, x, y);
                                    return;
                                }
                            }
                        }
                    } else {//кладем по Y
                        var x = arr[coord_id][0];
                        if (Math.random() > 0.5) {
                            for (y = 0; y < floor.length; y++) {
                                if ((floor[y][x] == "1") && (map_floor[y][x] == null)) {
                                    set_block(color, floor_id, x, y);
                                    return;
                                }
                            }
                        } else {
                            for (y = floor.length - 1; y >= 0; y--) {
                                if ((floor[y][x] == "1") && (map_floor[y][x] == null)) {
                                    set_block(color, floor_id, x, y);
                                    return;
                                }
                            }
                        }
                    }
                }
            }

            put_block(color, prev_max_id);
            put_block(color, max_id);
        }

        here.first = 0;
        for (var i = 0; i < here.cubes_cnt / 2; i++) {
            var col = get_color();
            put_blocks(col);
        }

        if ((here.game_state != "hint0") && (here.game_state != "hint1"))
            here.game_state = "game";
        here.wnd.visible = true;

        DIST = MIN_DIST;
        do {
            DIST += 0.5;
            camera_update();

            here.app.renderer.clear(true, true, true);
            here.app.renderer.render(here.app.scene_3d, here.app.camera_3d);

            var max_x = 0;
            var max_y = 0;
            var min_x = 100000;
            var min_y = 100000;

            for (var i = 0; i < here.map.length; i++) {
                if (here.map[i]) {
                    var v = get_screen_pos(here.map[i])
                    if (min_x > v.x - here.wnd.cub.p_w * 0.7)
                        min_x = v.x - here.wnd.cub.p_w * 0.7;
                    if (min_y > v.y - here.wnd.cub.p_w)
                        min_y = v.y - here.wnd.cub.p_w;
                    if (max_x < v.x + here.wnd.cub.p_w * 0.7)
                        max_x = v.x + here.wnd.cub.p_w * 0.7;
                    if (max_y < v.y + here.wnd.cub.p_w)
                        max_y = v.y + here.wnd.cub.p_w;
                }
            }
        } while ((min_x < -here.app.dx) || (max_x > PROJECT.DAT.width + here.app.dx) || (min_y < here.wnd.time.p_h) || (max_y > PROJECT.DAT.height - here.wnd.bottom_line.p_h));

        var dt = 1500 / here.map.length;
        if (dt < 5)
            dt = 5;
        if (dt > 50)
            dt = 50;
        here.fall_cube = 0;
        for (var i = 0; i < here.map.length; i++) {
            var cube = here.map[i];

            function on_progress(obj, progress, current_tk, action) {
                obj.position.y = obj.start_position + (obj.finish_position - obj.start_position) * progress * progress;
                new_particles(obj.position);
            }

            function on_finish(obj, action, manual_stop) {
                destroy_particles(obj, false);
                here.fall_cube--;
            }

            cube.start_position = cube.position.y + 20;
            cube.finish_position = cube.position.y;
            cube.position.y = cube.start_position;
            here.app.start(cube, i * dt, 250, null, on_progress, on_finish, true);
            here.fall_cube++;
        }
    }

    here.init_level = function () {
        here.wnd.visible = false;
        PROJECT.STR.on_start_level(here.init_level_after_ads);
    }

    here.get_cube = function (id) {
        obj = here.app.get_object("cube");
        obj.material = new THREE.MeshLambertMaterial({ map: here.app.materials["blcks_q" + id] });
        obj.material.color.r = obj.material.color.g = obj.material.color.b = UNSELECT_COLOR;
        obj.material.map.magFilter = THREE.LinearFilter;
        obj.material.map.minFilter = THREE.LinearFilter;
        obj.material.map.anisotropy = here.app.renderer.capabilities.getMaxAnisotropy();
        obj.game_id = id;
        obj.action = null;
        obj.scale.x = obj.scale.y = obj.scale.z = 1;
        obj.rotation.x = obj.rotation.y = obj.rotation.z = 0;
        here.level_scene.add(obj);
        return obj;
    }

    function have_variant() {
        var arr = [];
        for (var i = 0; i < here.map.length; i++) {
            var cube = here.map[i];
            if ((cube != null) && (cube.is_free())) {
                arr.push(cube)
            }
        }

        for (var i = 0; i < arr.length; i++) {
            var cube0 = arr[i];

            for (var n = 0; n < arr.length; n++) {
                var cube1 = arr[n];
                if ((cube0 != cube1) && (cube0.game_id == cube1.game_id)) {
                    return true;
                }
            }
        }

        return false;
    }

    function change_position() {
        var arr = [];
        for (var i = 0; i < here.map.length; i++) {
            var cube = here.map[i];
            if (cube != null) {
                arr.push(cube)
            }
        }

        function change_pair() {
            var id0 = Math.floor(Math.random() * arr.length);
            var id1 = Math.floor(Math.random() * arr.length);

            while (id0 == id1) {
                id1 = Math.floor(Math.random() * arr.length);
            }

            var cube0 = arr[id0];
            var cube1 = arr[id1];

            var n0 = cube0.game_n[0];
            var n1 = cube0.game_n[1];
            var n2 = cube0.game_n[2];
            var n3 = cube0.game_n[3];

            cube0.game_n[0] = cube1.game_n[0];
            cube0.game_n[1] = cube1.game_n[1];
            cube0.game_n[2] = cube1.game_n[2];
            cube0.game_n[3] = cube1.game_n[3];

            cube1.game_n[0] = n0;
            cube1.game_n[1] = n1;
            cube1.game_n[2] = n2;
            cube1.game_n[3] = n3;

            if (cube1.game_n[0] == cube1)
                cube1.game_n[0] = cube0;
            if (cube1.game_n[1] == cube1)
                cube1.game_n[1] = cube0;
            if (cube1.game_n[2] == cube1)
                cube1.game_n[2] = cube0;
            if (cube1.game_n[3] == cube1)
                cube1.game_n[3] = cube0;

            if (cube0.game_n[0] == cube0)
                cube0.game_n[0] = cube1;
            if (cube0.game_n[1] == cube0)
                cube0.game_n[1] = cube1;
            if (cube0.game_n[2] == cube0)
                cube0.game_n[2] = cube1;
            if (cube0.game_n[3] == cube0)
                cube0.game_n[3] = cube1;

            if (cube0.game_n[0])
                cube0.game_n[0].game_n[2] = cube0;
            if (cube1.game_n[0])
                cube1.game_n[0].game_n[2] = cube1;

            if (cube0.game_n[1])
                cube0.game_n[1].game_n[3] = cube0;
            if (cube1.game_n[1])
                cube1.game_n[1].game_n[3] = cube1;

            if (cube0.game_n[2])
                cube0.game_n[2].game_n[0] = cube0;
            if (cube1.game_n[2])
                cube1.game_n[2].game_n[0] = cube1;

            if (cube0.game_n[3])
                cube0.game_n[3].game_n[1] = cube0;
            if (cube1.game_n[3])
                cube1.game_n[3].game_n[1] = cube1;

            n0 = cube0.game_x;
            n1 = cube0.game_y;
            n2 = cube0.game_z;

            cube0.game_x = cube1.game_x;
            cube0.game_y = cube1.game_y;
            cube0.game_z = cube1.game_z;

            cube1.game_x = n0;
            cube1.game_y = n1;
            cube1.game_z = n2;
        }

        for (var i = 0; i < arr.length; i++) {
            change_pair();
        }

        while (!have_variant()) {
            change_pair();
        }

        function on_progress(obj, progress, current_tk, action) {
            obj.position.x = (obj.game_start_x + (obj.game_x - obj.game_start_x) * progress + here.level.dx * Math.sin(Math.PI * progress) / 2) * (1 + 1.4 * Math.sin(Math.PI * progress));
            obj.position.y = -(obj.game_start_z + (obj.game_z - obj.game_start_z) * progress);
            obj.position.z = (obj.game_start_y + (obj.game_y - obj.game_start_y) * progress + here.level.dz * Math.sin(Math.PI * progress) / 2) * (1 + 1.4 * Math.sin(Math.PI * progress));
        }

        function on_finish(obj, action, manual_stop) {
            obj.position.set(obj.game_x, -obj.game_z, obj.game_y);
        }

        for (var i = 0; i < arr.length; i++) {
            var cube = arr[i];
            //if ((cube.position.x!=cube.game_x)||(cube.position.y!=-cube.game_z)||(cube.position.z!=cube.game_y))
            //{
            cube.game_start_x = cube.position.x;
            cube.game_start_z = -cube.position.y;
            cube.game_start_y = cube.position.z;

            here.app.start(cube, 0, 250 + Math.random() * 150, null, on_progress, on_finish, true);
            //}
        }
    }

    here.complete_txt = function () {
        here.app.show_msg(PROJECT.WND.MSG.children.opt);
        here.app.hide_msg();
        here.app.show_msg(PROJECT.WND.MSG.children.help);
        here.app.hide_msg();
        here.app.show_msg(PROJECT.WND.MSG.children.hint);
        here.app.hide_msg();
        here.app.show_msg(PROJECT.WND.MSG.children.start);
        here.app.hide_msg();
        here.app.show_msg(PROJECT.WND.MSG.children.win);
        here.app.hide_msg();
        here.app.show_msg(PROJECT.WND.MSG.children.ads);
        here.app.hide_msg();
    }

    here.before_show = function () {//начало игры перед тем, как закроем прелоадер
        PROJECT.sdkHandler.trigger('start');
        here.app.first_click = false;
        here.app.on_first_click = function () {
            here.app.sounds.music_new.setLoop(true);
            here.app.sounds.music_new.setVolume(here.mus_vol / 5);
            here.app.sounds.music_new.play();
        }

        here.record = 0;
        here.add_paused = true;
        here.app.MainSound.setMasterVolume(0);
        load(continue_show);
    }

    here.game_paused = false;
    here.freeze = function () {
        here.game_paused = true;
        here.app.MainSound.setMasterVolume(0);
    }

    here.unfreeze = function () {
        here.game_paused = false;
    }

    function show_rot(show) {
        if (!here.app.isMob())
            show = false;
        here.app.app_gfx.visible = !show;
        here.app.preloader_gfx.visible = show;
        //here.app.preloader_gfx.x = window.innerWidth * devicePixelRatio;
        here.app.msg_up_gfx.visible = !show;
        here.app.msg_shadow_gfx.visible = !show;
        here.app.msg_down_gfx.visible = !show;
        here.app.middle_gfx.visible = !show;
    }

    function continue_show(dat) {
        here.add_paused = false;
        if (dat) {
            here.record = dat.record;//,snd_vol:here.snd_vol
            if (typeof (dat.first_help) != "undefined")
                here.first_help = dat.first_help;
            if (typeof (dat.snd_vol) != "undefined")
                here.snd_vol = dat.snd_vol;
            if (typeof (dat.mus_vol) != "undefined")
                here.mus_vol = dat.mus_vol;
        } else here.first_help = true;

        here.wnd = PROJECT.OBJ.MAIN = here.app.show(PROJECT.WND.MAIN);
        here.app.preloader_gfx.addChild(here.wnd.rot);
        show_rot(false);
        here.wnd.txt_big_part.free();
        here.wnd.txt_part.free();
        here.wnd.compl.alpha = 0;
        here.wnd.txt_cmp_add.text = "+ " + here.app.convert(PROJECT.STR.bonus_score) + " " + PROJECT.STR.get(41);
        here.app.on_resize_functions.push(here.on_resize);
        here.wnd.back.interactive = true;
        here.wnd.back.x = -4 * here.wnd.back.p_h;
        here.wnd.back.y = -4 * here.wnd.back.p_h;
        here.wnd.back.sx = here.wnd.back.sy = 20;
        here.wnd.back.avk.on_down = on_down;
        here.wnd.back.avk.on_up = on_up;
        here.wnd.back.avk.on_move = on_move;
        here.wnd.btn_next.visible = here.wnd.btn_back.visible = false;

        here.wnd.main_back.addChild(PROJECT.PRELOADER.main_back);
        PROJECT.PRELOADER.main_back.x = PROJECT.PRELOADER.main_back.y = 0;
        PROJECT.PRELOADER.main_back.sx = PROJECT.PRELOADER.main_back.sy = 1;
        here.wnd.right_back.addChild(PROJECT.PRELOADER.right);
        PROJECT.PRELOADER.right.x = PROJECT.PRELOADER.right.y = 0;
        here.wnd.left_back.addChild(PROJECT.PRELOADER.left);
        PROJECT.PRELOADER.left.x = PROJECT.PRELOADER.left.y = 0;

        //here.wnd.cub.visible=false;
        //here.wnd.no_mus.visible=(here.volume==0);

        here.wnd.btn_options.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.game_state = "options";
            play("click");

            function on_snd(p) {
                here.snd_vol = p;
                save();
            }

            function on_mus(p) {
                here.mus_vol = p;
                here.app.sounds.music_new.setVolume(here.mus_vol / 5);
                save();
            }

            here.msg = here.app.show_msg(PROJECT.WND.MSG.children.opt);
            here.msg.snd_btn.set_scroll(here.msg.snd_back, true, on_snd);
            here.msg.mus_btn.set_scroll(here.msg.mus_back, true, on_mus);
            here.msg.snd_btn.set(here.snd_vol);
            here.msg.mus_btn.set(here.mus_vol);
            here.msg.btn_continue_center.visible = false;
            here.msg.btn_continue.visible = true;
            here.msg.btn_restart.visible = true;
            here.msg.btn_help_me.avk.on_click = function () {
                play("click");
                on_hint_pause();
            }

            here.msg.btn_continue.avk.on_click = function () {
                if (here.game_paused)
                    return;
                here.game_state = "game";
                here.app.hide_msg();
                here.msg = null;

                play("click");
            }

            here.msg.btn_restart.avk.on_click = function () {
                if (here.game_paused) return;
                here.current_level = 0;
                here.start_game();
                here.app.shadow.avk.on_down = null;
                on_start();
                PROJECT.sdkHandler.trigger('gameStart');
                play("click");
            }

            /*
            here.wnd.btn_music.visible=!here.wnd.btn_music.visible;
            here.wnd.btn_home.visible=here.wnd.btn_music.visible;
            here.wnd.no_mus.visible=(here.volume==0);
            if (here.snd)
            {
                here.app.sounds.click.play();
                here.app.sounds.click.setVolume(here.snd_vol);
            }
            */
        }

        function on_progress(obj, progress, current_tk, action) {
            var r = here.main_scene.rotation.y;
            here.main_scene.rotation.y = Math.PI / 4 + here.sa * Math.PI / 2 + (here.a * Math.PI / 2 - here.sa * Math.PI / 2) * progress;

            here.angle += (r - here.main_scene.rotation.y) * 10;
            if (here.angle < -MAX_ANGLE)
                here.angle = -MAX_ANGLE;
            if (here.angle > MAX_ANGLE)
                here.angle = MAX_ANGLE;

        }

        function on_finish(obj, action, manual_stop) {

        }

        here.wnd.btn_left.avk.on_click = function () {
            if (here.game_paused)
                return;
            if (here.app.busy > 0)
                return;
            while (here.main_scene.rotation.y > Math.PI * 2)
                here.main_scene.rotation.y -= Math.PI * 2;

            while (here.main_scene.rotation.y < -Math.PI * 2)
                here.main_scene.rotation.y += Math.PI * 2;

            var a = ((here.main_scene.rotation.y - Math.PI / 4) / (Math.PI / 2));
            play("rotate");
            here.sa = (here.main_scene.rotation.y - Math.PI / 4) / (Math.PI / 2);
            here.a = a + 1;
            here.main_scene.rotation.y = Math.PI / 4 + a * Math.PI / 2;
            here.app.start(null, 0, 150, null, on_progress, on_finish);
        }

        here.wnd.btn_right.avk.on_click = function () {
            if (here.game_paused)
                return;
            if (here.app.busy > 0)
                return;
            while (here.main_scene.rotation.y > Math.PI * 2)
                here.main_scene.rotation.y -= Math.PI * 2;

            while (here.main_scene.rotation.y < -Math.PI * 2)
                here.main_scene.rotation.y += Math.PI * 2;
            play("rotate");
            var a = ((here.main_scene.rotation.y - Math.PI / 4) / (Math.PI / 2));

            here.sa = (here.main_scene.rotation.y - Math.PI / 4) / (Math.PI / 2);
            here.a = a - 1;

            here.main_scene.rotation.y = Math.PI / 4 + a * Math.PI / 2;
            here.app.start(null, 0, 150, null, on_progress, on_finish);
        }

        //свет
        // var light = new THREE.AmbientLight(0xFFFFFF, 0.93); // soft white light
        // var light = new THREE.AmbientLight(0xFFF3B2, 0.93); // soft golden/yellowish light
        var light = new THREE.AmbientLight(0xFFFAEA, 0.93); // soft golden/yellowish light
        here.app.scene_3d.add(light);
        light.position.set(0, 100, -20);

        // var directionalLight = new THREE.DirectionalLight(0xffcdd1, 0.8);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 100);
        directionalLight.target.position.set(0, 0, 0);
        here.app.scene_3d.add(directionalLight);


        var light = new THREE.AmbientLight(0xffffff, 1.06);
        here.app.quad_scene.add(light);
        // var directionalLight = new THREE.DirectionalLight(0xffcdd1, 0.9);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(1000, 1000, -1000);
        directionalLight.target.position.set(0, 0, 0);
        here.app.quad_scene.add(directionalLight);


        if (PROJECT.DAT.room_name != "none") {
            var room = here.app.get_object(PROJECT.DAT.room_name);
            for (var i = 0; i < room.material.length; i++)
                room.material[i].side = THREE.DoubleSide;

            here.app.scene_3d.add(room);
            room.scale.set(8, 8, 8);
            room.position.set(0, -18, 14);
        }
        here.app.render_gfx.add(here.wnd.main_back);
        here.app.render_gfx.add(here.wnd.left_back);
        here.app.render_gfx.add(here.wnd.right_back);
        here.wnd.bottom_line.sx = 200;
        here.wnd.bottom_line.x = -300



        //постоянные объекты сцены
        here.game_scene = new THREE.Group();
        here.app.app_gfx.add(here.game_scene);

        here.cube_scene = new THREE.Group();
        here.app.quad_scene.add(here.cube_scene);

        here.main_scene = new THREE.Group();
        here.pre_main_scene = new THREE.Group();
        here.game_scene.add(here.pre_main_scene);
        here.pre_main_scene.add(here.main_scene);

        here.level_scene = new THREE.Group();
        here.main_scene.add(here.level_scene);

        here.app.on_update_functions.push(update);
        start_particles();

        here.wnd.btn_back.avk.on_click = function () {//обработчик нажатия кнопки 
            if (here.game_paused)
                return;
            play("click");

            if (here.current_level == 0)
                here.current_level = here.levels.length;
            here.current_level--;
            here.game_state = "win";
            here.init_level();
        }

        here.wnd.btn_next.avk.on_click = function () {//обработчик нажатия кнопки 
            if (here.game_paused)
                return;
            play("click");

            if (here.current_level + 1 >= here.levels.length)
                here.current_level = -1;
            here.current_level++;
            here.game_state = "win";
            here.init_level();
        }

        // Shuffle Button
        here.wnd.btn_change.avk.on_click = function () {//обработчик нажатия кнопки 
            if (here.game_paused)
                return;
            if (here.hint_step == 6)
                next_hint();
            play("click");


            if (here.change_cnt <= 0) {
                if (window.sgSettings.config.rewarded.enabled) {
                    here.add_paused = true;
                    here.app.MainSound.setMasterVolume(0);
                    PROJECT.sdkHandler.trigger('rewardedAd', {
                        callback: (success) => {
                            here.add_paused = false;
                            if (success) {
                                here.change_cnt = PROJECT.STR.ads_booster_cnt;
                                here.wnd.txt_change.text = here.change_cnt + "/" + PROJECT.STR.change_cnt;
                                here.wnd.ads_change.visible = false;
                            } else {

                            }
                        }
                    }, this);

                }
            } else {
                here.change_cnt--;
                if (here.change_cnt < 0)
                    here.wnd.txt_change.text = "0/" + PROJECT.STR.change_cnt;
                else here.wnd.txt_change.text = here.change_cnt + "/" + PROJECT.STR.change_cnt;

                here.wnd.ads_change.visible = ((here.change_cnt == 0) && (window.sgSettings.config.rewarded.enabled));
                play("shuffle");
                change_position();
            }
        }

        // Help Button
        here.wnd.btn_help.avk.on_click = function () {//обработчик нажатия кнопки
            if (here.game_paused)
                return;
            if (here.hint_step == 6)
                next_hint();

            play("click");

            if (here.help_cnt <= 0) {
                if (window.sgSettings.config.rewarded.enabled) {
                    here.add_paused = true;
                    here.app.MainSound.setMasterVolume(0);
                    PROJECT.sdkHandler.trigger('rewardedAd', {
                        callback: (success) => {
                            here.add_paused = false;
                            if (success) {
                                here.help_cnt = PROJECT.STR.ads_booster_cnt;
                                here.wnd.txt_help.text = here.help_cnt + "/" + PROJECT.STR.help_cnt;
                                here.wnd.ads_help.visible = false;
                            } else {

                            }
                        }
                    }, this);
                }
            } else {
                here.help_cnt--;
                if (here.help_cnt < 0)
                    here.wnd.txt_help.text = "0/" + PROJECT.STR.help_cnt;
                else here.wnd.txt_help.text = here.help_cnt + "/" + PROJECT.STR.help_cnt;

                here.wnd.ads_help.visible = ((here.help_cnt == 0) && (window.sgSettings.config.rewarded.enabled));
                play("help");
                var arr = [];
                for (var i = 0; i < here.map.length; i++) {
                    var cube = here.map[i];
                    if ((cube != null) && (cube.is_free())) {
                        arr.push(cube)
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    var cube0 = arr[i];

                    for (var n = 0; n < arr.length; n++) {
                        var cube1 = arr[n];
                        if ((cube0 != cube1) && (cube0.game_id == cube1.game_id)) {
                            destroy_pair(cube0, cube1);
                            return;
                        }
                    }
                }
            }
        }

        //here.wnd.btn_change.visible=here.wnd.btn_help.visible=false;
        //here.cube=here.get_cube(0);
        update(0);

        if (!here.app.isMobile.any()) {
            function onWheel(e) {
                if (here.game_state == "main_screen")
                    return;
                e = e || window.event;

                // wheelDelta не даёт возможность узнать количество пикселей
                var delta = e.deltaY || e.detail || e.wheelDelta;

                DIST += delta / 500;
                if (DIST > MAX_DIST)
                    DIST = MAX_DIST;

                if (DIST < MIN_DIST)
                    DIST = MIN_DIST;

                if (here.game_state == "hint0") {
                    if (here.hint_step == 5) {
                        next_hint();
                    }
                }
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }

            if (here.app.renderer.domElement.addEventListener) {
                if ('onwheel' in document) {
                    here.app.renderer.domElement.addEventListener("wheel", onWheel);
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    here.app.renderer.domElement.addEventListener("mousewheel", onWheel);
                } else {
                    // Firefox < 17
                    here.app.renderer.domElement.addEventListener("MozMousePixelScroll", onWheel);
                }
            } else { // IE8-
                here.app.renderer.domElement.attachEvent("onmousewheel", onWheel);
            }
        }

        PROJECT.PRELOADER.hide(PROJECT.GAME.MAIN.start_game);//скрываем прелоадер и стартуем игру
    }

    function on_start(back) {
        here.wnd.btn_options.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.game_state = "options";
            play("click");

            function on_snd(p) {
                here.snd_vol = p;
                save();
            }

            function on_mus(p) {
                here.mus_vol = p;
                here.app.sounds.music_new.setVolume(here.mus_vol / 5);
                save();
            }

            here.msg = here.app.show_msg(PROJECT.WND.MSG.children.opt);
            here.msg.snd_btn.set_scroll(here.msg.snd_back, true, on_snd);
            here.msg.mus_btn.set_scroll(here.msg.mus_back, true, on_mus);
            here.msg.snd_btn.set(here.snd_vol);
            here.msg.mus_btn.set(here.mus_vol);
            here.msg.btn_continue_center.visible = false;
            here.msg.btn_continue.visible = true;
            here.msg.btn_restart.visible = true;
            here.msg.btn_help_me.avk.on_click = function () {
                play("click");
                on_hint_pause();
            }

            here.msg.btn_continue.avk.on_click = function () {
                if (here.game_paused)
                    return;
                here.game_state = "game";
                here.app.hide_msg();
                here.msg = null;

                play("click");
            }

            here.msg.btn_restart.avk.on_click = function () {
                if (here.game_paused) return;
                here.current_level = 0;
                here.start_game();
                here.app.shadow.avk.on_down = null;
                on_start();
                PROJECT.sdkHandler.trigger('gameStart');
                play("click");
            }

            /*
            here.wnd.btn_music.visible=!here.wnd.btn_music.visible;
            here.wnd.btn_home.visible=here.wnd.btn_music.visible;
            here.wnd.no_mus.visible=(here.volume==0);
            if (here.snd)
            {
                here.app.sounds.click.play();
                here.app.sounds.click.setVolume(here.snd_vol);
            }
            */
        }
        here.wnd.btn_left.visible = here.wnd.btn_right.visible = true;
        here.wnd.btn_next.visible = here.wnd.btn_back.visible = PROJECT.STR.debug;
        here.is_added = false;
        here.bonus_time = 0;
        here.app.hide_msg();
        here.msg = null;
        here.init_level();
        here.game_scene.visible = true;
        here.wnd.visible = true;
    }
    here.on_start = on_start;

    function get_screen_pos(obj) {
        var width = PROJECT.DAT.width + here.app.dx * 2;
        var height = PROJECT.DAT.height;
        var widthHalf = width / 2;
        var heightHalf = height / 2;

        var screen_pos = obj.getWorldPosition(here.vector);

        screen_pos.project(here.app.camera_3d);
        screen_pos.x = widthHalf + (screen_pos.x * widthHalf) - here.app.dx;
        screen_pos.y = heightHalf - (screen_pos.y * heightHalf);

        return screen_pos;
    }

    function on_progress_sel(obj, progress, current_tk, action) {
        if (((here.hint_step < 2) && (here.game_state == "hint0")) || ((here.hint_step == 3) && (here.game_state == "hint0")) || ((here.hint_step == 4) && (here.game_state == "hint0"))) {
            var p = get_screen_pos(here.target_cube)
            obj.x = p.x - 16;
            obj.y = p.y + PROJECT.DAT.height / 30;
            if ((here.hint_step == 0) && (here.selected_cube)) {
                obj.x += PROJECT.DAT.height / 30;
                obj.y = p.y + PROJECT.DAT.height / 50;
            }
            obj.sx = obj.sy = 1 + Math.sin(Math.PI * 2 * progress) * 0.04;
        }
    }

    function on_finish_sel(obj, action, manual_stop) {
        if (((here.hint_step < 2) && (here.game_state == "hint0")) || ((here.hint_step == 3) && (here.game_state == "hint0")) || ((here.hint_step == 4) && (here.game_state == "hint0")))
            here.app.start(obj, 0, 650, null, on_progress_sel, on_finish_sel);
    }

    function next_hint() {
        here.hint_cnt--;
        if (here.hint_cnt > 0)
            return;

        here.msg.h0.visible = false;
        here.msg.h1.visible = false;
        here.msg.h2.visible = false;
        //here.msg.h3.visible=false;
        //here.msg.h4.visible=false;

        function on_progress_wheel(obj, progress, current_tk, action) {
            if ((here.hint_step == 5) && (here.game_state == "hint0")) {
                obj.visible = (progress <= 0.5);
                obj.next_obj.visible = (progress > 0.5);
            }
        }

        function on_finish_wheel(obj, action, manual_stop) {
            if ((here.hint_step == 5) && (here.game_state == "hint0"))
                here.app.start(obj, 0, 750, null, on_progress_wheel, on_finish_wheel);
        }

        function on_progress(obj, progress, current_tk, action) {
            if (((here.hint_step == 2)) && (here.game_state == "hint0"))
                obj.x = here.msg.finger.start_x + Math.sin(Math.PI * 2 * progress) * here.msg.arrow_3.p_w / 2;
        }

        function on_finish(obj, action, manual_stop) {
            if (((here.hint_step == 2)) && (here.game_state == "hint0")) {
                here.app.start(obj, 0, 1250, null, on_progress, on_finish);
            }
        }


        switch (here.hint_step) {
            case 0:
                here.map[2].material.color.r = here.map[2].material.color.g = here.map[2].material.color.b = UNSELECT_COLOR;
                here.map[3].material.color.r = here.map[3].material.color.g = here.map[3].material.color.b = UNSELECT_COLOR;
                here.target_cube = here.map[3];
                here.msg.h1.visible = true;
                here.hint_step++;
                /*here.msg.h1.visible=true;
                here.msg.txt_hint.text=PROJECT.STR.get(11);
                here.msg.arrow_2.visible=false;
                here.msg.wheel_2.visible=false;
                here.msg.wheel_1.visible=false;
                here.msg.mouse.visible=false;
                here.msg.arrow_1.visible=false;
                here.msg.hand_2.visible=false;
                here.msg.hand_1.visible=false;
                here.hint_step++;
                here.msg.arrow_3.visible=true;
                here.msg.finger.visible=true;
                here.msg.finger.start_x=here.msg.arrow_3.x+here.msg.arrow_3.p_w/2-here.msg.finger.p_w/8;
                on_finish(here.msg.finger);
                here.hint_cnt=5;*/
                break;
            case 1:
                here.target_cube = here.map[2];
                here.hint_step++;
                here.msg.h1.visible = true;
                //here.msg.h2.visible=true;
                //here.msg.arrow_3.visible=false;
                //here.msg.finger.visible=false;
                here.msg.txt_hint.text = PROJECT.STR.get(11);
                here.msg.arrow_3.visible = true;
                here.msg.finger.start_x = here.msg.arrow_3.x + here.msg.arrow_3.p_w / 2 - here.msg.finger.p_w / 8;
                here.msg.finger.y = here.msg.finger.p_y;
                on_finish(here.msg.finger);
                //on_finish_sel(here.msg.finger);
                break;
            case 2:
                here.hint_step++;
                here.msg.h1.visible = true;
                here.msg.txt_hint.text = PROJECT.STR.get(10);
                here.msg.arrow_3.visible = false;
                here.wnd.btn_left.visible = here.wnd.btn_right.visible = true
                on_finish_sel(here.msg.finger);
                /*here.msg.h3.visible=true;
                here.msg.txt_hint.text=PROJECT.STR.get(13);
                here.game_state="hint1";
                here.hint_step++;
                here.init_level_after_ads();
                here.target_cube=here.map[1];
                here.hint_cnt=3;*/
                break;
            case 3:
                here.hint_step = 7;
                for (var i = 4; i < here.map.length; i++)
                    here.map[i].material.color.r = here.map[i].material.color.g = here.map[i].material.color.b = UNSELECT_COLOR;
                //here.target_cube=here.map[4];
                //here.map[4].material.color.r=here.map[4].material.color.g=here.map[4].material.color.b=UNSELECT_COLOR;
                here.msg.finger.visible = false;
                here.msg.h2.visible = true;
                here.msg.txt_hint.text = PROJECT.STR.get(12);
                here.msg.btn_close.visible = true;
                break;
            case 4:
                for (var i = 4; i < here.map.length; i++)
                    here.map[i].material.color.r = here.map[i].material.color.g = here.map[i].material.color.b = UNSELECT_COLOR;

                here.hint_step++;
                here.msg.h3.visible = true;
                here.hint_cnt = 5;
                here.msg.txt_hint.text = PROJECT.STR.get(13);
                here.msg.finger.visible = false;
                if (here.app.isMobile.any()) {
                    here.msg.arrow_1.visible = true;
                    here.msg.hand_2.visible = false;
                    here.msg.hand_1.visible = false;
                    here.msg.hand_1.next_obj = here.msg.hand_2;
                    here.msg.hand_2.next_obj = here.msg.hand_1;
                    on_finish_wheel(here.msg.hand_1);
                } else {
                    here.msg.arrow_2.visible = true;
                    here.msg.wheel_2.visible = false;
                    here.msg.wheel_1.visible = false;
                    here.msg.mouse.visible = true;
                    here.msg.wheel_1.next_obj = here.msg.wheel_2;
                    here.msg.wheel_2.next_obj = here.msg.wheel_1;
                    on_finish_wheel(here.msg.wheel_1);
                }

                setTimeout(function () {
                    if (here.hint_step == 5) {
                        here.hint_cnt = 0;
                        next_hint();
                    }
                }, 2000);

                break;
            case 5:

                here.msg.txt_hint.text = " ";
                here.msg.txt_hint_1.text = PROJECT.STR.get(14);

                //here.msg.h4.visible=true;
                here.msg.back_hint.visible = false;

                here.msg.finger.visible = false;
                here.msg.arrow_1.visible = false;
                here.msg.hand_2.visible = false;
                here.msg.hand_1.visible = false;
                here.msg.arrow_2.visible = false;
                here.msg.mouse.visible = false;

                here.hint_step++;
                here.msg.mouse.visible = false;
                here.msg.arrow_1.visible = false;
                here.msg.arrow_2.visible = false;
                here.msg.wheel_2.visible = false;
                here.msg.wheel_1.visible = false;
                here.msg.hand_2.visible = false;
                here.msg.hand_1.visible = false;
                here.wnd.btn_help.visible = here.wnd.btn_change.visible = true;
                break;
            case 6:
                here.msg.txt_hint.text = " ";
                here.msg.txt_hint_1.text = " ";
                here.msg.btn_close.visible = true;
                here.msg.back_hint.visible = false;

                here.hint_step++;
                here.msg.back_hint.visible = false;
                here.msg.mouse.visible = false;
                here.msg.arrow_1.visible = false;
                here.msg.arrow_2.visible = false;
                here.msg.wheel_2.visible = false;
                here.msg.wheel_1.visible = false;
                here.msg.hand_2.visible = false;
                here.msg.hand_1.visible = false;
                //here.wnd.txt_score.visible=here.wnd.txt_score_label.visible=true;
                break;
            default:
                break;
        }
    }

    function on_hint_pause() {
        here.pause_msg = here.app.show_msg(PROJECT.WND.MSG.children.help);

        here.pause_msg.btn_empty.visible = !here.first_help;
        here.pause_msg.btn_fill.visible = here.first_help;

        here.pause_msg.btn_empty.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.first_help = true;
            here.pause_msg.btn_empty.visible = !here.first_help;
            here.pause_msg.btn_fill.visible = here.first_help;
            save();
            play("click");
        }

        here.pause_msg.btn_fill.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.first_help = false;
            here.pause_msg.btn_empty.visible = !here.first_help;
            here.pause_msg.btn_fill.visible = here.first_help;
            save();
            play("click");
        }

        here.pause_msg.btn_help_close.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.app.hide_msg();
            play("click");
        }
    }

    function on_hint() {
        here.game_state = "help";
        here.app.hide_msg();
        here.msg = null;
        here.msg = here.app.show_msg(PROJECT.WND.MSG.children.help);

        here.msg.btn_empty.visible = !here.first_help;
        here.msg.btn_fill.visible = here.first_help;

        here.msg.btn_empty.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.first_help = true;
            here.msg.btn_empty.visible = !here.first_help;
            here.msg.btn_fill.visible = here.first_help;
            save();
            play("click");
        }

        here.msg.btn_fill.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.first_help = false;
            here.msg.btn_empty.visible = !here.first_help;
            here.msg.btn_fill.visible = here.first_help;
            save();
            play("click");
        }

        here.msg.btn_help_close.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.app.hide_msg();
            here.msg = null;
            play("click");
            here.start_game(false);
        }
    }

    function on_help() {
        here.game_scene.visible = true;
        here.wnd.visible = true;
        here.wnd.btn_next.visible = here.wnd.btn_back.visible = false;
        here.hint_step = 0;
        here.game_state = "hint0";
        here.app.hide_msg();
        here.msg = null;
        here.msg = here.app.show_msg(PROJECT.WND.MSG.children.hint);
        here.msg.back_hint.visible = true;
        here.msg.h0.visible = true;
        here.msg.h1.visible = false;
        here.msg.h2.visible = false;
        //here.msg.h3.visible=false;
        //here.msg.h4.visible=false;
        here.app.shadow.visible = false;
        here.wnd.btn_left.visible = here.wnd.btn_right.visible = here.wnd.btn_help.visible = here.wnd.btn_change.visible = here.wnd.lev.visible = here.wnd.txt_score.visible = here.wnd.txt_score_label.visible = false;
        here.init_level_after_ads();
        here.msg.txt_hint.text = PROJECT.STR.get(10);
        here.msg.arrow_3.visible = false;
        here.msg.finger.visible = false;
        here.msg.finger.x = here.msg.finger.p_x;
        here.msg.finger.y = here.msg.finger.p_y;
        here.msg.arrow_2.visible = false;
        here.msg.wheel_2.visible = false;
        here.msg.wheel_1.visible = false;
        here.msg.mouse.visible = false;
        here.msg.arrow_1.visible = false;
        here.msg.hand_2.visible = false;
        here.msg.hand_1.visible = false;
        here.hint_cnt = 0;
        here.msg.btn_close.visible = false;
        here.wnd.time.visible = false;

        here.wnd.btn_options.avk.on_click = function () {
            here.game_state_prev = here.game_state;
            here.app.shadow.visible = true;
            if (here.game_paused)
                return;
            play("click");

            function on_snd(p) {
                here.snd_vol = p;
                save();
            }

            function on_mus(p) {
                here.mus_vol = p;
                here.app.sounds.music_new.setVolume(here.mus_vol / 5);
                save();
            }

            here.msg_prev = here.msg;
            here.msg = here.app.show_msg(PROJECT.WND.MSG.children.opt);
            here.msg.snd_btn.set_scroll(here.msg.snd_back, true, on_snd);
            here.msg.mus_btn.set_scroll(here.msg.mus_back, true, on_mus);
            here.msg.snd_btn.set(here.snd_vol);
            here.msg.mus_btn.set(here.mus_vol);
            here.msg.btn_continue_center.visible = true;
            here.msg.btn_continue.visible = false;
            here.msg.btn_restart.visible = false;

            here.msg.btn_help_me.avk.on_click = function () {
                play("click");
                on_hint_pause();
            }
            //here.game_state="options";

            here.msg.btn_continue_center.avk.on_click = function () {
                if (here.game_paused)
                    return;
                //here.game_state=here.game_state_prev;
                here.app.hide_msg();
                here.msg = here.msg_prev;
                here.app.shadow.visible = false;
                play("click");
            }
        }

        here.msg.btn_close.avk.on_click = function () {
            if (here.game_paused)
                return;
            play("win");
            shout_music(3500);
            PROJECT.sdkHandler.trigger('gameStart');
            play("click");

            here.start_game();

            here.app.shadow.avk.on_down = null;
            on_start();
            here.wnd.btn_options.visible = true;
            here.wnd.time.visible = true;
            here.wnd.txt_score.visible = here.wnd.txt_score_label.visible = true;
            save();
        }

        here.msg.finger.visible = true;
        here.target_cube = here.map[0];
        for (var i = 2; i < here.map.length; i++)
            here.map[i].material.color.r = here.map[i].material.color.g = here.map[i].material.color.b = UNSELECT_COLOR * HINT_COLOR;

        on_finish_sel(here.msg.finger);
        /*
        if (here.app.isMobile.any())
        {
            here.msg.arrow_1.visible=true;
            here.msg.hand_2.visible=false;
            here.msg.hand_1.visible=false;
            here.msg.hand_1.next_obj=here.msg.hand_2;
            here.msg.hand_2.next_obj=here.msg.hand_1;
            on_finish(here.msg.hand_1);
        }else
        {
            here.msg.arrow_2.visible=true;
            here.msg.wheel_2.visible=false;
            here.msg.wheel_1.visible=false;
            here.msg.mouse.visible=true;
            here.msg.wheel_1.next_obj=here.msg.wheel_2;
            here.msg.wheel_2.next_obj=here.msg.wheel_1;
            on_finish(here.msg.wheel_1);
        }
        */
    }

    here.msg = null;
    here.start_game = function (back) {//начало игры-прелоадер закрыли
        here.wnd.btn_help.visible = here.wnd.btn_change.visible = here.wnd.lev.visible = here.wnd.txt_score.visible = true;
        here.help_cnt = PROJECT.STR.help_cnt;
        here.change_cnt = PROJECT.STR.change_cnt;
        here.wnd.txt_change.text = here.change_cnt + "/" + PROJECT.STR.change_cnt;
        here.wnd.txt_help.text = here.help_cnt + "/" + PROJECT.STR.help_cnt;

        if (here.msg)
            here.app.hide_msg();
        here.msg = null;
        here.game_state = "main_screen";
        here.time = PROJECT.STR.max_time * 1000;
        here.wnd.txt_time.text = here.app.get_time(here.time);
        here.score = 0;
        here.wnd.txt_score.text = here.app.convert(here.score);
        here.msg = here.app.show_msg(PROJECT.WND.MSG.children.start);
        here.msg.logo.addChild(PROJECT.PRELOADER.main);
        PROJECT.PRELOADER.main.x = PROJECT.PRELOADER.main.y = 0;
        //here.msg.txt_record.text=here.app.convert(here.record);
        //here.msg.btn_music.visible=false;
        //here.msg.no_mus.visible=(here.volume==0);
        here.game_scene.visible = false;
        here.wnd.visible = false;
        here.msg.btn_options.avk.on_click = function () {
            here.game_state_prev = here.game_state;
            if (here.game_paused)
                return;
            play("click");

            function on_snd(p) {
                here.snd_vol = p;
                save();
            }

            function on_mus(p) {
                here.mus_vol = p;
                here.app.sounds.music_new.setVolume(here.mus_vol / 5);
                save();
            }

            here.msg_prev = here.msg;
            here.msg = here.app.show_msg(PROJECT.WND.MSG.children.opt);
            here.msg.snd_btn.set_scroll(here.msg.snd_back, true, on_snd);
            here.msg.mus_btn.set_scroll(here.msg.mus_back, true, on_mus);
            here.msg.snd_btn.set(here.snd_vol);
            here.msg.mus_btn.set(here.mus_vol);
            here.msg.btn_continue_center.visible = true;
            here.msg.btn_continue.visible = false;
            here.msg.btn_restart.visible = false;
            here.msg.btn_help_me.avk.on_click = function () {
                play("click");
                on_hint_pause();
            }
            //here.game_state="options";

            here.msg.btn_continue_center.avk.on_click = function () {
                if (here.game_paused)
                    return;
                //here.game_state=here.game_state_prev;
                here.app.hide_msg();
                here.msg = here.msg_prev;
                here.app.shadow.visible = false;
                play("click");
            }
        }

        /*here.msg.btn_music.avk.on_click=function()
        {
            if (here.volume==0)
            {
                here.volume=1;
            }else
            {
                here.volume=0;
            }
            
            here.unfreeze();
            here.msg.no_mus.visible=(here.volume==0);
            if (here.snd)
            {
                here.app.sounds.click.play();
                here.app.sounds.click.setVolume(here.snd_vol);
            }
            save();
        }

        here.msg.btn_options.avk.on_click=function()
        {
            here.msg.btn_music.visible=!here.msg.btn_music.visible;
            here.msg.no_mus.visible=(here.volume==0);
            if (here.snd)
            {
                here.app.sounds.click.play();
                here.app.sounds.click.setVolume(here.snd_vol);
            }
        }
        
        here.app.shadow.avk.on_down=function()
        {
            here.msg.btn_music.visible=false;
        }
    */

        here.msg.btn_strt.avk.on_click = function () {
            if (here.game_paused)
                return;
            PROJECT.sdkHandler.trigger('gameStart');
            here.app.shadow.avk.on_down = null;
            if (here.first_help)
                on_help();
            else {
                on_start();
                here.wnd.btn_options.visible = true;
                here.wnd.time.visible = true;
                here.wnd.txt_score.visible = here.wnd.txt_score_label.visible = true;
            }
            here.first_help = false;
            save();

            play("click");
        }

        here.msg.btn_help.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.app.shadow.avk.on_down = null;
            on_hint();
            play("click");
        }
        //here.init_level();
    }

    function on_fail() {
        if ((here.game_state != "ads") && (here.game_state != "game"))
            return;

        here.add_paused = true;
        here.app.MainSound.setMasterVolume(0);

        PROJECT.sdkHandler.trigger('gameOver', {
            score: here.score,
            callback: (err) => {
                here.add_paused = false;
                here.cube_scene.visible = false;
                here.game_state = "fail";

                play("fail");

                here.msg = here.app.show_msg(PROJECT.WND.MSG.children.win);
                if (here.score > here.record) {
                    play("new_record");
                    shout_music(4000);
                    here.record = here.score;
                    //here.msg.txt_comment.text=PROJECT.STR.get(3);
                } else {
                    shout_music(2000);
                    //here.msg.txt_comment.text=PROJECT.STR.get(2);
                }
                here.msg.txt_score.text = here.app.convert(here.score);
                here.msg.txt_record.text = here.app.convert(here.record);

                //var dx=(here.msg.back_win.p_w-(here.msg.txt_record.avk.txt.width+here.msg.txt_tmp2.avk.txt.width+here.msg.txt_record.p_x-(here.msg.txt_tmp2.p_x+here.msg.txt_tmp2.p_w)))/2;
                //here.msg.txt_record.avk.txt.x=here.msg.txt_record.avk.txt.width/2;
                //here.msg.txt_tmp2.avk.txt.x=here.msg.txt_tmp2.p_w-here.msg.txt_tmp2.avk.txt.width/2;
                var ddx = here.msg.txt_record.p_x - (here.msg.txt_tmp2.p_x + here.msg.txt_tmp2.p_w);
                var dx = here.msg.back_win.p_x + (here.msg.back_win.p_w - (here.msg.txt_record.avk.txt.width + here.msg.txt_tmp2.avk.txt.width + ddx)) / 2;
                here.msg.txt_record.avk.txt.x = 0;
                here.msg.txt_tmp2.avk.txt.x = 0;

                here.msg.txt_record.x = dx + ddx + here.msg.txt_tmp2.avk.txt.width;
                here.msg.txt_tmp2.x = dx;

                here.msg.btn_play.x = here.msg.btn_play.p_cx;
                here.msg.btn_play.avk.on_click = function () {
                    if (here.game_paused)
                        return;
                    PROJECT.sdkHandler.trigger('gameStart');
                    here.current_level = 0;
                    here.start_game();
                    here.app.shadow.avk.on_down = null;
                    on_start();

                    play("click");
                }/*
                {
                    if (here.game_paused)
                        return;
                    play("click");

                    here.start_game();
                }*/
                save();
            }
        }, this);

    }

    function on_win() {
        /*
        if (here.game_state!="game")
            return;
        here.game_state="win_game";

        PROJECT.sdkHandler.trigger('gameOver', {
            score: here.score,
            callback: function(err) {
            }
        },this);
        here.msg=here.app.show_msg(PROJECT.WND.MSG.children.win);
        if (here.score>here.record)
        {
            here.record=here.score;
            //here.msg.txt_comment.text=PROJECT.STR.get(3);
        }else
        {
            //here.msg.txt_comment.text=PROJECT.STR.get(2);
        }
        here.msg.txt_score.text=here.app.convert(here.score);
        here.msg.txt_record.text=here.app.convert(here.record);
        here.msg.btn_start.avk.on_click=function()
        {
            here.app.sounds.click.play();
            here.app.sounds.click.setVolume(here.snd_vol);

            here.start_game();
        }
        save();*/
    }

    function camera_update() {
        //here.angle=Math.tan(here.main_scene.rotation.y);
        //here.main_scene.rotation.x-=dy/300;
        here.angle = 0;
        here.app.camera_3d.position.x = 0;
        here.app.camera_3d.position.y = DIST;//+here.pre_main_scene.rotation.x;
        here.app.camera_3d.position.z = DIST;
        here.app.camera_3d.lookAt(here.attention_pos);
    }

    here.swipe_dx = 0;
    here.swipe_x0 = 0;
    here.swipe_x1 = 0;
    here.swipe_dt = 0;

    function try_add_time() {
        if (here.is_added) {
            on_fail();
            return;
        }

        here.game_state = "ads";
        here.msg = here.app.show_msg(PROJECT.WND.MSG.children.ads);
        if (!here.msg.prg) {
            here.msg.rnd.free();
            here.msg.prg = [];

            for (var i = 0; i < 360; i += 3) {
                var obj = here.msg.rnd.copy(here.msg.wrnd);
                obj.centered();
                obj.x = here.msg.wrnd.p_w / 2 + here.msg.wrnd.p_w / 2 * Math.sin(i * Math.PI / 180);
                obj.y = here.msg.wrnd.p_w / 2 - here.msg.wrnd.p_w / 2 * Math.cos(i * Math.PI / 180);
                here.msg.prg.push(obj);
            }
        }

        here.msg.btn_no.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.msg.action.stop();
            here.app.hide_msg();
            here.msg = null;
            on_fail();
        }

        // Watch an ad while Game Over
        here.msg.btn_add.avk.on_click = function () {
            if (here.game_paused)
                return;
            here.msg.action.stop();
            here.add_paused = true;
            here.app.MainSound.setMasterVolume(0);
            PROJECT.sdkHandler.trigger('rewardedAd', {
                callback: (success) => {
                    here.add_paused = false;
                    if (success) {
                        here.is_added = true;
                        here.app.hide_msg();
                        here.msg = null;
                        here.time += 30000;
                        here.game_state = "game";
                    } else {
                        here.app.hide_msg();
                        here.msg = null;
                        on_fail();
                    }
                }
            }, this);
        }

        for (var i = 0; i < here.msg.prg.length; i++) {
            here.msg.prg[i].visible = false;
        }

        function on_progress(obj, progress, current_tk, action) {
            for (var i = 0; i < here.msg.prg.length * progress; i++) {
                here.msg.prg[i].visible = true;
            }

            here.msg.txt_time.text = Math.floor((5000 * (1 - progress) / 1000 + 1)) + "'";
        }

        function on_finish(obj, action, manual_stop) {
            if (!manual_stop)
                here.msg.btn_no.avk.on_click();
        }

        here.msg.txt_time.text = "5'";
        here.msg.action = here.app.start(null, 0, 5000, null, on_progress, on_finish);
    }

    function game_update(tk) {
        if (here.app.busy == 0)
            here.time -= tk;
        if (here.time < 0) {
            here.time = 0;
            try_add_time();
            return;
        }

        here.wnd.txt_time.text = here.app.get_time(here.time);

        if (here.time < 10000) {
            here.wnd.txt_time.avk.txt.material.color.g = 0.7 + Math.cos((10000 - here.time) / 100) * 0.3;
            here.wnd.txt_time.avk.txt.material.color.b = 0.7 + Math.cos((10000 - here.time) / 100) * 0.3;
        } else {
            here.wnd.txt_time.avk.txt.material.color.g = 1;
            here.wnd.txt_time.avk.txt.material.color.b = 1;
        }


        if ((!here.is_down) && (here.swipe_dx != 0)) {
            here.swipe_dx *= 0.9;
            here.main_scene.rotation.y += here.swipe_dx * tk / here.swipe_dt;
            while (here.main_scene.rotation.y > Math.PI * 2)
                here.main_scene.rotation.y -= Math.PI * 2;

            while (here.main_scene.rotation.y < -Math.PI * 2)
                here.main_scene.rotation.y += Math.PI * 2;
            here.angle -= 10 * here.swipe_dx * tk / here.swipe_dt;
            if (here.angle < -MAX_ANGLE)
                here.angle = -MAX_ANGLE;
            if (here.angle > MAX_ANGLE)
                here.angle = MAX_ANGLE;
        } else {
            if (here.is_down) {
                here.swipe_x1 = here.swipe_x0;
                here.swipe_x0 = here.main_scene.rotation.y;
                here.swipe_dt = tk;
                here.swipe_dx = (here.swipe_x0 - here.swipe_x1);
            }
        }
    }

    function hint_update(tk) {
        if ((!here.is_down) && (here.swipe_dx != 0)) {
            here.swipe_dx *= 0.9;
            here.main_scene.rotation.y += here.swipe_dx * tk / here.swipe_dt;
            if (here.hint_step == 3) {
                here.main_scene.rotation.y = Math.PI * 6 / 4;
                return;
            }
            if (here.hint_step == 2) {
                if ((here.main_scene.rotation.y > Math.PI * 6 / 4) || (here.main_scene.rotation.y < -Math.PI * 2 / 4)) {
                    next_hint();
                    here.main_scene.rotation.y = Math.PI * 6 / 4;
                }
            }
            here.angle -= 10 * here.swipe_dx * tk / here.swipe_dt;
            if (here.angle < -MAX_ANGLE)
                here.angle = -MAX_ANGLE;
            if (here.angle > MAX_ANGLE)
                here.angle = MAX_ANGLE;
        } else {
            if (here.is_down) {
                here.swipe_x1 = here.swipe_x0;
                here.swipe_x0 = here.main_scene.rotation.y;
                here.swipe_dt = tk;
                here.swipe_dx = (here.swipe_x0 - here.swipe_x1);
            }
        }
    }

    here.local_time = 0;
    here.set_progress = function (val) {//задаем прогресс
        if (val > 1)
            val = 1;
        if (val < 0)
            val = 0;
        //here.wnd.up_bar.sx=val;
    }

    function update(tk) {
        here.app.on_resize();
        here.on_resize_upd();
        here.app.check_focused();
        if ((here.app.focused) && (!here.add_paused) && (!PROJECT.game_paused))
            here.app.MainSound.setMasterVolume(1);
        else {
            here.app.MainSound.setMasterVolume(0);
            return;
        }
        //here.angle+=tk;
        here.local_time += tk;
        here.tk += tk;
        here.cnt++;
        here.mouse_sleep_tk -= tk;

        if (here.tk >= 1000) {
            //window.console.log(here.cnt);
            here.tk = 0;
            here.cnt = 0;
            here.time_in_game++;
        }

        if (tk > 100)
            tk = 100;

        here.bonus_time -= tk;
        if (here.bonus_time < 0) {
            here.bonus_cnt = 1;
            here.bonus_time = 0;
        }

        here.set_progress(here.bonus_time / BONUS_TIME);

        switch (here.game_state) {
            case "game":
                game_update(tk);
                break;
            case "hint0":
                hint_update(tk);
                break;
        }

        camera_update();
    }
}