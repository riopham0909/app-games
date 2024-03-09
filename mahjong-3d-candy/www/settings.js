PROJECT = {};
PROJECT.GAME = {};//объекты-файлы управления
PROJECT.PRT = {};//прототипы
PROJECT.OBJ = {};//объекты
PROJECT.WND = {};//прототипы

PROJECT.DAT = new function () {//информация проекта
    var here = this;

    here.room_name = "none";//jap_room;dod_room;room;none;back_image
    here.angle = 35;
    here.width = 1080;//640;////400;//640;//1024;//2048;//1080;
    here.height = 1920;//1136;//710;//1136;//768;//1536;//1920;
    here.color = 0x00BFAC;//070b6c
    here.gui_images_cnt = 1;
    here.snd_folder = "data/snd/";
    here.gfx_folder = "data/pics/";
    here.gfx_gui_folder = "data/gui/pics/";
    here.preloader = ["blocks/blcks_q0", "blocks/blcks_q1", "blocks/blcks_q2", "blocks/blcks_q3", "blocks/blcks_q4", "blocks/blcks_q5", "blocks/blcks_q6", "blocks/blcks_q7", "blocks/blcks_q8", "blocks/blcks_q9", "blocks/blcks_q10", "blocks/blcks_q11", "blocks/blcks_q12", "blocks/blcks_q13", "blocks/blcks_q14", "blocks/blcks_q15", "blocks/blcks_q16", "blocks/blcks_q17", "blocks/blcks_q18", "blocks/blcks_q19", "blocks/blcks_q20", "blocks/blcks_q21", "blocks/blcks_q22", "blocks/blcks_q23", "blocks/blcks_q24", "blocks/blcks_q25", "blocks/blcks_q26", "blocks/blcks_q27", "blocks/blcks_q28", "blocks/blcks_q29", "blocks/blcks_q30", "blocks/blcks_q31", "blocks/blcks_q32", "blocks/blcks_q33", "blocks/blcks_q34", "blocks/blcks_q35", "blocks/blcks_q36", "blocks/blcks_q37", "blocks/blcks_q38", "blocks/blcks_q39", "blocks/blcks_q40", "blocks/blcks_q41", "blocks/blcks_q42", "blocks/blcks_q43", "bar", "back", "main", "main_ja", "main_back", "right", "left"];
    here.object = "data/sector";
    here.font = "data/fnt.json";
    here.ja_font = "data/ja.json";
    here.fonts = ["Yusei Magic:bold"];
    here.shadow = "shadow";
    here.assets = {};
    here.sounds = ["rotate", "speed_match", "add_time", "shuffle", "help", "music_new", "click", "fail", "win", "knock", "mt0", "mt1", "mt2", "mt3", "mt4", "mt5", "mt6", "mt7", "mt8", "mt9", "mt10", "mt11", "nil", "wrong", "new_record"];

    for (var i = 0; i < here.gui_images_cnt; i++)
        here.assets["images_" + i] = "data/gui/images_" + i + ".json";
}