
 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // код для мобильных устройств
    user_type = 'mobile';
  } else {
    user_type = 'pc';
    // код для обычных устройств
}

var tutorial_tracks = []

var noPX = function(string) {
    return string.slice(0, string.length-2);
}

var num = function(variable) {
    return Number(variable);
}

var make_visible_for_dom = function(element) {
    $(element).css('display', 'block')
    $(element).css('opacity', 0)
    
}

var make_invisible_for_dom = function(element) {
    $(element).css('display', 'none')
    $(element).css('opacity', 1)
}

var set_size = function(el_id, w='none', h='none') {
    if (w != 'none') {
	   $(el_id).css('width', w);
	}
    if (h != 'none') {
        $(el_id).css('height', h);
    }
}

var set_pos = function(el_id, left, top) {
    $(el_id).css('left', left);
    $(el_id).css('top', top)
}

var set_pos2 = function(el_id, left='none', top='none') {
    if (left != 'none') {
        $(el_id).css('margin-left', left);
    }
    if (top != 'none') {
        $(el_id).css('margin-top', top)
    }
}

var get_pos = function(selector) {
var el = $(selector);
    var x = num(noPX(el.css('left')));
    if (isNaN(x)) {
        x = num(noPX(el.css('margin-left')));
    }

    var y = num(noPX(el.css('top')));
    if (isNaN(y)) {
        y = num(noPX(el.css('margin-top')));
    }

	return {"x": x, "y": y}
}

var get_global_pos = function(selector) {
    var el = document.querySelector(selector)

    var rect = el.getBoundingClientRect();
//console.log(rect.top, rect.right, rect.bottom, rect.left);
    return {"x": rect.left, "y": rect.top}
}

var get_size = function(selector) {
	var el = $(selector);

	return {"x": num(noPX(el.css('width'))), "y": num(noPX(el.css('height')))}
}

var get_center = function(selector) {
    var size = get_size(selector)
    var pos = get_pos(selector)
    return {"x": pos.x + size.x/2, "y": pos.y + size.y/2}
}

var fullscreen = function(selector) {
    set_size(selector, winW, winH)
}

var mouse_in_element = function(selector) {
    var pos = get_pos(selector);
    var size = get_size(selector);

    var x1 = pos.x;
    var y1 = pos.y;

    var x2 = x1 + size.x;
    var y2 = y1 + size.y;

    if (x1 < mouse_x && mouse_x < x2 &&
        y1 < mouse_y && mouse_y < y2) {
        return true
    } else {
        return false
    }
}


var comp_func_1 = function(a, b) {
    return a['tiles'] - b['tiles']
}



var load_levels = function(cur_lang = lang) {
    lang = cur_lang
    var levels_menu_block_display = $("#levels_menu_block").css('display')
    
    if (levels_menu_block_display == 'none') {
        $('#levels_menu_block').css('display', 'block')
        $('#levels_menu_block').css('opacity', 0)
    }

    $('#levels_block').empty()


    // для начала отсортируем всё
    map.sort(comp_func_1)

    // затем добавим всё
    for (var i=0; i < map.length; i++) {
        $('#levels_block').append(`
            <div class="level_block" onclick="open_game_block(`+i+`);  click_sound.play();">
            

            <img class="mini_img" src="`+map[i]['icon_src']+`">
            <div class="lb_score_little_block">
                <div class="lb_score_little_block_ico">
                </div>
                
                <div class="lb_score_little_block_value">
                `+game_data.scores[map[i].id]+`
                </div>
            </div>
            <center>`+map[i]['name'][cur_lang]+`</center>
        </div>
            `)
    }

    if (winW > winH*1.05) {
        // размера блока конкретного уровня
        set_size('.level_block', 'none', get_size('#levels_block').x * 0.4 / (744/612))

        // размер миниатюры конкретного уровня
        $(".mini_img").attr('height', get_size('.level_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.mini_img', (get_size('.level_block').x - get_size('.mini_img').x)/2, (get_size('.level_block').y - get_size('.mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.level_block center', 'none', (get_size('.level_block').y - get_size('.level_block center').y*1.35))

        // размер шрифта названия конкретного уровня
        $('.level_block center').css('font-size', Math.min((get_size('.level_block').y - get_size('.level_block center').y-12)*0.7, get_size('.level_block').x / 12) + 'px')
        
        // размера блока конкретного уровня
        set_size('.level_block', 'none', get_size('#levels_block').x * 0.4 / (744/612))

        // размер миниатюры конкретного уровня
        $(".mini_img").attr('height', get_size('.level_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.mini_img', (get_size('.level_block').x - get_size('.mini_img').x)/2, (get_size('.level_block').y - get_size('.mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.level_block center', 'none', (get_size('.level_block').y - get_size('.level_block center').y*1.35))

        // размер шрифта названия конкретного уровня
        $('.level_block center').css('font-size', Math.min((get_size('.level_block').y - get_size('.level_block center').y-12)*0.7, get_size('.level_block').x / 12) + 'px')
        

    }  else {
        // размера блока конкретного уровня
        set_size('.level_block', get_size('#levels_block').x * 0.9, get_size('#levels_block').x * 0.9 / (744/612))

        // размер миниатюры конкретного уровня
        $(".mini_img").attr('height', get_size('.level_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.mini_img', (get_size('.level_block').x - get_size('.mini_img').x)/2, (get_size('.level_block').y - get_size('.mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.level_block center', 'none', (get_size('.level_block').y - get_size('.level_block center').y*1.45))

        // размер шрифта названия конкретного уровня
        $('.level_block center').css('font-size', Math.min((get_size('.level_block').y - get_size('.level_block center').y-12)*0.7, get_size('.level_block').x / 15) + 'px')
        
        // размера блока конкретного уровня
        set_size('.level_block', get_size('#levels_block').x * 0.9, get_size('#levels_block').x * 0.9 / (744/612))

        // размер миниатюры конкретного уровня
        $(".mini_img").attr('height', get_size('.level_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.mini_img', (get_size('.level_block').x - get_size('.mini_img').x)/2, (get_size('.level_block').y - get_size('.mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.level_block center', 'none', (get_size('.level_block').y - get_size('.level_block center').y*1.45))

        // размер шрифта названия конкретного уровня
        $('.level_block center').css('font-size', Math.min((get_size('.level_block').y - get_size('.level_block center').y-12)*0.7, get_size('.level_block').x / 15) + 'px')
        
    }

    var little_block_h = get_size('.level_block').y*0.08
        // размер области монеток и
        set_size('.lb_score_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('.lb_score_little_block', get_size('.level_block').x * 0.15, get_size('.level_block').y * 0.15 )

        
        // размер иконок монеток
        set_size('.lb_score_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('.lb_score_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('.lb_score_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

    if (levels_menu_block_display == 'none') {
        $('#levels_menu_block').css('display', 'none')
        $('#levels_menu_block').css('opacity', 1)
    }
}

var load_gallery = function() {
    var card_width = get_size('.gallery_cards_block').x * 0.15
    
    var absolute_margin_x = get_size('.gallery_cards_block').x * 0.1
    var margin_x = get_size('.gallery_cards_block').x * 0.04

    var card_h = card_width * (210/175)
    var absolute_margin_y = get_size('.gallery_cards_block').y * 0.1
    var margin_y = (get_size('.gallery_cards_block').y - card_h * 2 - absolute_margin_y * 2 )/3


    $('#uncommon_cards').empty()
    $('#rare_cards').empty()
    $('#epic_cards').empty()
    $('#legendary_cards').empty()

    for (var i=0; i < uncommon_amount; i++) {
        $('#uncommon_cards').append('<div id="uncommon_card_'+i+'" class="uncommon_card"></div>')
        set_pos('#uncommon_card_' + i, card_width*(i%4) + (i%4+1) * margin_x + absolute_margin_x, Math.floor(i / 4) * card_h + (Math.floor(i / 4) + 1) * margin_y + absolute_margin_y)
    }

    for (var i=0; i < rare_amount; i++) {
        $('#rare_cards').append('<div id="rare_card_'+i+'" class="rare_card"></div>')
        set_pos('#rare_card_' + i, card_width*(i%4) + (i%4+1) * margin_x + absolute_margin_x, Math.floor(i / 4) * card_h + (Math.floor(i / 4) + 1) * margin_y + absolute_margin_y)
    }

    for (var i=0; i < epic_amount; i++) {
        $('#epic_cards').append('<div id="epic_card_'+i+'" class="epic_card"></div>')
        set_pos('#epic_card_' + i, card_width*(i%4) + (i%4+1) * margin_x + absolute_margin_x, Math.floor(i / 4) * card_h + (Math.floor(i / 4) + 1) * margin_y + absolute_margin_y)
    }

    for (var i=0; i < legendary_amount; i++) {
        $('#legendary_cards').append('<div id="legendary_card_'+i+'" class="legendary_card"></div>')
        set_pos('#legendary_card_' + i, card_width*(i%4) + (i%4+1) * margin_x + absolute_margin_x, Math.floor(i / 4) * card_h + (Math.floor(i / 4) + 1) * margin_y + absolute_margin_y)
    }

    // а теперь отобразим картинки
    for (var i in game_data.opened_cards[0]) {
        //console.log(i, game_data.opened_cards[0][i], '#uncommon_card_' + game_data.opened_cards[0][i])
        $('#uncommon_card_' + game_data.opened_cards[0][i]).css('background-image', 'url("images/cards/uncommon/new1_' + (game_data.opened_cards[0][i] + 1) + '.webp")')
    }

    for (var i in game_data.opened_cards[1]) {
        //console.log(i, game_data.opened_cards[0][i], '#rare_card_' + game_data.opened_cards[0][i])
        $('#rare_card_' + game_data.opened_cards[1][i]).css('background-image', 'url("images/cards/rare/new2_' + (game_data.opened_cards[1][i] + 1) + '.webp")')
    }

    for (var i in game_data.opened_cards[2]) {
        //console.log(i, game_data.opened_cards[0][i], '#epic_card_' + game_data.opened_cards[0][i])
        $('#epic_card_' + game_data.opened_cards[2][i]).css('background-image', 'url("images/cards/epic/new3_' + (game_data.opened_cards[2][i] + 1) + '.webp")')
    }

    for (var i in game_data.opened_cards[3]) {
        //console.log(i, game_data.opened_cards[0][i], '#legendary_card_' + game_data.opened_cards[0][i])
        $('#legendary_card_' + game_data.opened_cards[3][i]).css('background-image', 'url("images/cards/legendary/new4_' + (game_data.opened_cards[3][i] + 1) + '.webp")')
    }
    
    set_size('.uncommon_card, .rare_card, .epic_card, .legendary_card', card_width, card_h)


}

// PC horizontal
var profile_1 = function(winW, winH) {
    $('#filter4_img').css('display', 'block')
    var width_10px = 'Маджонг'.width('10px font_1')
    var width2_10px = 'Алхимия'.width('10px font_2')
    var width3_10px = 'Выберите уровень'.width('10px font_2')
    var width4_10px = 'Магазин'.width('10px font_2')
    var width5_10px = 'Галерея'.width('10px font_2')

    // Заголовок: Маджонг
        // Размер
        var block_h = Math.min(winW * 0.4 / width_10px*10, winH * 0.2)
        set_size('#main_menu_title', block_h * width_10px / 10, block_h)
        // Позиция
        set_pos('#main_menu_title', (winW - get_size('#main_menu_title').x)/2, winH * 0.1)
        // Размер шрифта
        $('#main_menu_title').css('font-size', block_h + 'px')

        $('.filter_img').css('background-size', '600px 600px')


    // Заголовок: Алхимия
        // Размер
        var block_h = get_size('#main_menu_title').y * 0.7
        set_size('#main_menu_title2', block_h * width2_10px / 10, block_h)
        // Позиция
        set_pos('#main_menu_title2', winW * 0.5, get_size('#main_menu_title').y + get_pos('#main_menu_title').y)
        // Размер шрифта
        $('#main_menu_title2').css('font-size', block_h + 'px')


    // левая картинка дерева на главном меню
        var left_tree_img_h = Math.min(winW*0.3, winH)
        set_size("#main_menu_block .filter3_img", left_tree_img_h * (1260/1340), left_tree_img_h)


    // правая картинка дерева в главном меню
        var right_tree_img_h = Math.min(winW*0.3 / 0.85, winH * 0.8)
        set_size('#main_menu_block .filter4_img', right_tree_img_h * (0.85), right_tree_img_h)
        set_pos('#main_menu_block .filter4_img', winW - get_size('.filter4_img').x, (winH - get_size('.filter4_img').y)/2 ) 


    // Блок кнопок главного меню
        // Размер самой кнопки
        var block_h = Math.min(winW * 0.35 / (1617/753), winH * 0.25)
        set_size('.mm_button', block_h * (1617/753), block_h)

        // позиции самих кнопок
        // центирование по горизонтали
        set_pos('.mm_button', (winW - block_h * (1617/753))/2 )

        // позиция первой кнопки
        set_pos('#mm_button_1', 'none', (winH - get_size('.mm_button').y) * 0.6 ) 

        // позиция второй кнопки
        set_pos('#mm_button_2', 'none', get_pos('#mm_button_1').y + get_size('#mm_button_1').y * 1)

        // укажем padding
        $('.mm_button').css('padding', get_size('.mm_button').y*0.4 + 'px')

        // вмещаем текст в кнопку
        textFit($('.mm_button'),  {alignHoriz: true, alignVert: true, widthOnly: true})


    // **левая картина дерева в меню уровней и в игровом окне и в магазине и в галерее
        var img_x = 1260
        var img_y = 1340
        var left_tree_img_h = Math.min(winW*0.5 / (img_x/img_y), winH*0.4)
        set_size("#levels_menu_block .filter3_img, #game_viewport_block .filter3_img, #shop_block .filter3_img,  #gallery_block .filter3_img", left_tree_img_h * (img_x/img_y), left_tree_img_h)


    // **правая картинка дерева в меню уровней и в игровом окне и в магазине и в галерее
        var img_x = 516
        var img_y = 470
        var right_tree_img_h = Math.min(winW * 0.4 / (img_x/img_y), winH * (1/4))
        set_size('#levels_menu_block .filter5_img, #game_viewport_block .filter5_img, #shop_block .filter5_img, #gallery_block .filter5_img', right_tree_img_h * (img_x/img_y), right_tree_img_h)
        set_pos('#levels_menu_block .filter5_img, #game_viewport_block .filter5_img, #shop_block .filter5_img, #gallery_block .filter5_img', winW - get_size('.filter5_img').x, 0 ) 


    // заголовок: Выберите уровень
        // Размер
        set_size('#lm_title', winW * 0.45)
        // Позиция
        set_pos('#lm_title', winW * 0.275, left_tree_img_h*0.2)
        // Размер шрифта
        $('#lm_title').css('font-size', winW * 0.45 / width3_10px * 10 + 'px')

    // заголовок: магазин
        // Размер
        set_size('#sb_title', winW * 0.25)
        // Позиция
        set_pos('#sb_title', (winW  - get_size('#sb_title').x) / 2, left_tree_img_h*0.25)
        // Размер шрифта
        $('#sb_title').css('font-size', winW * 0.25 / width4_10px * 10 + 'px')

    // **Заголовок: Галерея
        // Размер
        set_size('#gb_title', winW * 0.25)
        // Позиция
        set_pos('#gb_title', (winW  - get_size('#gb_title').x) / 2, left_tree_img_h*0.05)
        // Размер шрифта
        $('#gb_title').css('font-size', winW * 0.25 / width5_10px * 10 + 'px')

    // БЛОК МАГАЗИНА
        // размера блока карточек
        var block_h = winH * 0.6
        set_size('#shop_cards_block', block_h*(744/612), block_h)
        // Позиция
        set_pos2('#shop_cards_block', (winW - get_size('#shop_cards_block').x)/2, winH * 0.25)
        set_size('.shop_card_block', get_size('#shop_cards_block').y*(744/612), get_size('#shop_cards_block').y )

        set_pos('#uncommon_block', 0)
        set_pos('#rare_block', block_h*(744/612), - get_size('#rare_block').y )
        set_pos('#epic_block', block_h*(744/612) * 2, - get_size('#rare_block').y * 2)
        set_pos('#legendary_block', block_h*(744/612) * 3, - get_size('#rare_block').y * 3)


        
        // размер миниатюры конкретного уровня
        $(".scb_mini_img").attr('height', get_size('.shop_card_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.scb_mini_img', (get_size('.shop_card_block').x - get_size('.scb_mini_img').x)/2, (get_size('.shop_card_block').y - get_size(' .scb_mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.shop_card_block center', 'none', (get_size('.shop_card_block').y - get_size('.shop_card_block center').y*1.35))

        // размер шрифта названия конкретного уровня
        $('.shop_card_block center').css('font-size', Math.min((get_size('.shop_card_block').y - get_size('.shop_card_block center').y-12)*0.7, get_size('.shop_card_block').x / 12) + 'px')
        /*
        // размера блока конкретного уровня
        set_size('.shop_card_block', 'none', get_size('#shop_cards_block').x * 0.4 / (744/612))

        // размер миниатюры конкретного уровня
        $(".scb_mini_img").attr('height', get_size('.shop_card_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.scb_mini_img', (get_size('.shop_card_block').x - get_size('.scb_mini_img').x)/2, (get_size('.shop_card_block').y - get_size('.scb_mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.shop_card_block center', 'none', (get_size('.shop_card_block').y - get_size('.shop_card_block center').y*1.35))

        // размер шрифта названия конкретного уровня
        $('.shop_card_block center').css('font-size', Math.min((get_size('.shop_card_block').y - get_size('.shop_card_block center').y-12)*0.7, get_size('.shop_card_block').x / 12) + 'px')
        */
        // баланс очков/монеток в блоке уровней
        var block_h = Math.min(winW * 0.6 / 2 / (238/81), winH*0.2)
        // размер блока
        set_size('#sb_balance_block', block_h * 2 * (238/81), block_h )

        set_pos('#sb_balance_block', (winW - get_size('#sb_balance_block').x)/2, winH * 0.05 )

           
        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#sb_balance_block').y*0.3
        // размер области монеток и
        set_size('#sb_balance_block #sb_score_little_block, #sb_balance_block #sb_money_little_block, #sb_balance_block #sb_balance_money_little_block', little_block_h* (238/81) * 1.2, little_block_h ) 
        // позиция области монеток
        set_pos2('#sb_balance_block #sb_money_little_block', (get_size('#sb_balance_block').x*1.2 - get_size('#sb_money_little_block').x*1.2), (get_size('#sb_balance_block').y/2 - get_size('#sb_money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#sb_balance_block #sb_score_little_block', (get_size('#sb_balance_block').x*1.2 - get_size('#sb_money_little_block').x*2.4), (get_size('#sb_balance_block').y/2 - get_size('#sb_money_little_block').y)/2 )

        // размер иконок монеток
        set_size('#sb_balance_block #sb_score_little_block_ico, #sb_balance_block #sb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#sb_balance_block #sb_score_little_block_ico, #sb_balance_block #sb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#sb_balance_block #sb_score_little_block_value, #sb_balance_block #sb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        var icon_h = Math.min(winW / 8, winH / 8)
        set_size('#sb_back_button, #sb_ad_button', icon_h, icon_h)

        set_pos('#sb_back_button', icon_h * 0.2, winH - icon_h * 0.2 - icon_h)
        set_pos('#sb_ad_button', icon_h * 0.2, winH - icon_h * 0.2 - icon_h - icon_h)

        // кнопка ведущая в галерею
        var button_h = winH * 0.1

        set_size('#gallery_button', button_h * (567/140), button_h)

        set_pos('#gallery_button', (winW - get_size('#gallery_button').x)/2, winH * 0.86 )

        textFit($('#gallery_button'), {alignHoriz: true})
        //textFit($('#gallery_button'), {alignVert: true, alignHoriz: true})


        // боковые кнопки стрелки
        var arrow_block_h = get_size('#shop_cards_block').y * 0.5

        set_size('#shop_left_arrow, #shop_right_arrow', arrow_block_h * (264/491), arrow_block_h)

        set_pos('#shop_left_arrow', get_global_pos('#shop_cards_block').x - arrow_block_h * (264/491) * 1, get_global_pos('#shop_cards_block').y + arrow_block_h/2)

        set_pos('#shop_right_arrow', get_global_pos('#shop_cards_block').x + get_size('#shop_cards_block').x*1 , get_global_pos('#shop_cards_block').y + arrow_block_h/2)

    // БЛОК ПОДТВЕРЖДЕНИЯ ПОКУПКИ МАГАЗИНА
        // высота
        var block_h = Math.min(winH, winW * 0.55 / (828/771))

        // размер
        set_size('#shop_warn_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#shop_warn_block', (winW - get_size('#shop_warn_block').x )/2, (winH - get_size('#shop_warn_block').y)/2)

        // размера блока внутреннего текста
        set_size('#swb_title', get_size('#shop_warn_block').x * 0.5, get_size('#shop_warn_block').y * 0.15)

        // позиция блока внутреннего текста
        set_pos2('#swb_title', (get_size('#shop_warn_block').x - get_size('#swb_title').x)/2, get_size('#shop_warn_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#swb_title'),  {alignHoriz: true, multiLine: true})

       
        // Блок баланса
            // размер
            set_size('#swb_balance', get_size('#store_block').x*0.4, get_size('#shop_warn_block').y * 0.05)

            // позиция блока баланса
            set_pos('#swb_balance', get_size('#store_block').x * 0.2, get_size('#shop_warn_block').y * 0.7 )

            // позиция блока оставшегося кол-ва монеток
            set_pos('#swb_balance_money_little_block', get_size('#swb_balance').x - get_size('#swb_balance_money_little_block').x)

            var little_block_h = get_size('#swb_balance').y

            // размер иконок монеток
            set_size('#swb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('#swb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('#swb_balance_money_little_block #score_little_block_value, #swb_balance_money_little_block #swb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

            // размер шрифта надписи баланса
            $('#swb_balance_left').css('font-size', get_size('#swb_balance').y*0.7 + 'px')

        // размер блока информации о цене
        set_size('#swb_info_cost, #swb_info_unlocked', get_size('#swb_info').x, get_size('#swb_info').y/2)

        // размера блока с монеткой

        var block_h = get_size('#swb_info_cost').y * 0.5
        set_size('#swb_info_balance_money_little_block, #swb_info_unlocked_balance_money_little_block', block_h * (238/81), block_h)

        // позиция блока с монеткой
        set_pos('#swb_info_balance_money_little_block, #swb_info_unlocked_balance_money_little_block', get_size('#swb_info').x * 0.5)



        // ОБЩИЙ БЛОК БАЛАНСА
            var little_block_h = get_size('.balance_block').y

            // размер иконок монеток
            set_size('.balance_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('.balance_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('.balance_block_value, .balance_left_block').css('font-size', little_block_h * 0.7 + 'px')


        // блок недостаточно монет
        // размер
        var no_money_block_h = get_size('#shop_warn_block').y * 0.15
        set_size('#swb_no_money_block', no_money_block_h * (915/339), no_money_block_h)
        // позиция
        set_pos('#swb_no_money_block', (get_size('#store_block').x - get_size('#no_money_block').x)*0.6, (get_size('#shop_warn_block').y - get_size('#no_money_block').y)*0.76)
        // размер шрифта
        textFit($('#swb_no_money_block'), {alignHoriz: true, alignVert: true})
        textFit($('#swb_no_money_block'), {alignHoriz: true, alignVert: true})

        // кнопка - крестик
        set_size('#swb_store_close_button', get_size('#shop_warn_block').x * 0.07, get_size('#shop_warn_block').x * 0.07)

        set_pos('#swb_store_close_button', get_size('#shop_warn_block').x*0.88 - get_size('#store_close_button').x, get_size('#shop_warn_block').y*0.18)


        // картинка
            set_size('#swb_img', get_size('#shop_warn_block').y * 0.2, get_size('#shop_warn_block').y * 0.2 / (364/328))

            set_pos('#swb_img', get_size('#shop_warn_block').x * 0.25, get_size('#shop_warn_block').y * 0.45)

        // блок информации
            set_size('#swb_info', get_size('#shop_warn_block').x*0.6 - get_size('#shop_warn_block').y * 0.2, get_size('#shop_warn_block').y * 0.2 )

            set_pos('#swb_info', get_size('#swb_img').x*1.2 + get_pos('#swb_img').x, get_size('#shop_warn_block').y * 0.45)

        // кнопка купить
            var button_h = get_size('#shop_warn_block').x * 0.45 / (1492/646)
            set_size('#shop_warn_button', button_h * (1492/646), button_h)
            set_pos('#shop_warn_button', (get_size('#shop_warn_block').x - get_size('#shop_warn_button').x)/2, get_size('#shop_warn_block').y * 0.735)

            textFit($('#shop_warn_button'), {alignHoriz: true, alignVert: true})

    // БЛОК карточка получена
        var block_h = Math.min(winH, winW * 0.55 / (828/771))

        // размер
        set_size('#recieved_card_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#recieved_card_block', (winW - get_size('#recieved_card_block').x )/2, (winH - get_size('#recieved_card_block').y)/2)

        // картинка лучей
        set_size('#rcb_img_1', block_h * 0.45 * (722/738), block_h * 0.45)
        set_pos('#rcb_img_1', (get_size('#recieved_card_block').x - get_size('#rcb_img_1').x) / 2, block_h * 0.23)

        // картинка самого блока
        set_size('#rcb_img_2', block_h * 0.235 * (177/210), block_h * 0.235)
        set_pos('#rcb_img_2', (get_size('#recieved_card_block').x - get_size('#rcb_img_2').x) / 2, block_h * 0.23 * 1.5)

        // блок текста
        set_size('#rcb_title', get_size('#recieved_card_block').x * 0.8, block_h * 0.1 )
        set_pos2('#rcb_title', (get_size('#recieved_card_block').x - get_size('#rcb_title').x)/2, block_h * 0.7)

        textFit($('#rcb_title'), {alignHoriz: true, alignVert: true})

    // БЛОК ГАЛЕРЕИ
        // общий блок 
        var block_h = Math.min(winW * 0.7/(1000/888), winH * 0.8)
        set_size('#gallery_all_cards_block', block_h * (1000/888), block_h)
        set_pos('#gallery_all_cards_block', (winW - get_size('#gallery_all_cards_block').x)/2, (winH - get_size('#gallery_all_cards_block').y) * 0.85 )


        // блок с карточками
        var block_h = Math.min(winW * 0.6/(1432/888), winH * 0.55)
        
        set_size('.gallery_cards_block', block_h * (1432/888), block_h)
        set_pos('.gallery_cards_block', (get_size('#gallery_all_cards_block').x - get_size('.gallery_cards_block').x)/2, (get_size('#gallery_all_cards_block').y - get_size('.gallery_cards_block').y) * 0.85 )

        // блок с указанием типа
        var block_h = winH * 0.2

        set_size('.gallery_cards_type_block', block_h * (1031/400), block_h)
        set_pos('.gallery_cards_type_block', get_pos('.gallery_cards_block').x + get_size('.gallery_cards_block').x * 0.075, get_pos('.gallery_cards_block').y - block_h * 0.85)

        $('.gallery_cards_type_block').css('padding-top', get_size('.gallery_cards_type_block').y * 0.6 + 'px')
        $('.gallery_cards_type_block').css('padding-left', get_size('.gallery_cards_type_block').x * 0.2 + 'px')

        textFit($('.gallery_cards_type_block'), {alignHoriz: true})

        // боковые кнопки стрелки
        var arrow_block_h = get_size('.gallery_cards_block').y * 0.5

        set_size('#gallery_left_arrow, #gallery_right_arrow', arrow_block_h * (264/491), arrow_block_h)

        set_pos('#gallery_left_arrow', get_global_pos('#gallery_all_cards_block').x - arrow_block_h * (264/491) * 1, get_global_pos('.gallery_cards_block').y + arrow_block_h/2)

        set_pos('#gallery_right_arrow', get_global_pos('#gallery_all_cards_block').x + get_size('#gallery_all_cards_block').x*1 , get_global_pos('.gallery_cards_block').y + arrow_block_h/2)

        // позиции блоков с карточками разных типов
        set_pos('#rare_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x)
        set_pos('#rare_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x)

        set_pos('#epic_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x*2)
        set_pos('#epic_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x*2)

        set_pos('#legendary_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x*3)
        set_pos('#legendary_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x*3)

        // вернуться обратно
        var icon_h = Math.min(winW / 8, winH / 8)
        set_size('#gb_back_button', icon_h, icon_h)

        set_pos('#gb_back_button', icon_h * 0.2, winH - icon_h * 0.2 - icon_h)

        

    // Боковые кнопки
        // размер
        //$('.side_icon').attr('width', winH * 0.15)
        set_size('.side_icon', winH * 0.15, winH * 0.15)

        // Позиции каждой из кнопок
        set_pos('#ico_1', winW * 0.03, winH * 0.6)
        set_pos('#ico_2', winW * 0.03, winH * 0.75)

        set_pos('#ico_3', winW * 0.97 - winH * 0.15, winH * 0.5)
        set_pos('#ico_4', winW * 0.97 - winH * 0.15, winH * 0.65)


    // блок пройденного уровня
        var block_h = Math.min(winH, winW * 0.55 / (828/771))

        // размер
        set_size('#level_passed_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#level_passed_block', (winW - get_size('#level_passed_block').x )/2, (winH - get_size('#level_passed_block').y)/2)

        // размера блока внутреннего текста
        set_size('#level_passed_block #text', get_size('#level_passed_block').x * 0.4, get_size('#level_passed_block').y * 0.15)

        // позиция блока внутреннего текста
        set_pos2('#level_passed_block #text', (get_size('#level_passed_block').x - get_size('#level_passed_block #text').x)/2, get_size('#level_passed_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#level_passed_block #text'),  {alignHoriz: true, alignVert: true, multiLine: true})

        // размер области очков
        set_size('#level_passed_block #score', get_size('#level_passed_block').x*0.6 , get_size('#level_passed_block').x*0.6 / (935/120))

        // позиция области очков
        set_pos2('#level_passed_block #score', (get_size('#level_passed_block').x - get_size('#level_passed_block #score').x)/2, get_size('#level_passed_block').y * 0.0)

        // размер шрифта области очков
        $('#level_passed_block #score').css('font-size', get_size('#level_passed_block #score').y*0.4 + 'px')

        // выровним текст по середине по вертикали
        set_pos2('#level_passed_block #score #left', 'none', (get_size('#level_passed_block #score').y - get_size('#level_passed_block #score #left').y)/2)

        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#level_passed_block #score').y*0.6
        // размер области монеток и
        set_size('#lpb_score_little_block, #lpb_money_little_block, #balance_money_little_block, #swb_balance_money_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('#lpb_money_little_block', (get_size('#level_passed_block #score').x - get_size('#lpb_money_little_block').x*1.2), (get_size('#level_passed_block #score').y - get_size('#lpb_money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#lpb_score_little_block', (get_size('#level_passed_block #score').x - get_size('#lpb_score_little_block').x*2.4), (get_size('#level_passed_block #score').y - get_size('#lpb_score_little_block').y)/2 )

        // размер иконок монеток
        set_size('#lpb_score_little_block_ico, #lpb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#lpb_score_little_block_ico, #lpb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#lpb_score_little_block_value, #lpb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        // размер блока диалога
        var text_block_h = get_size('#level_passed_block').y * 0.2
        set_size('#fox_text', text_block_h * (639/250), text_block_h)
        set_pos2('#fox_text', get_size('#level_passed_block').x * 0.2, get_size('#level_passed_block').y * 0.05)

        // размер шрифта диалога
        textFit($('#fox_text'), {alignHoriz: true, multiLine: true})

        // размер лисы
        var fox_block_h = get_size('#level_passed_block').y * 0.2
        set_size('#fox', fox_block_h * (310/324), fox_block_h)
        set_pos2('#fox',  get_size('#level_passed_block').x*0.85 - fox_block_h * (310/324), get_size('#level_passed_block').y * 0.1)

        // кнопки
        // размер
        var ico_size = get_size('#level_passed_block').x * (1/6)
        set_size('.level_passed_ico', ico_size, ico_size)

        // позиция
        set_pos('#level_passed_ico_1', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_2', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25 + ico_size*1.1, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_3', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25 + ico_size*2.2, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )


    // Блок магазина подсказок-перемешиваний
        
        // блок магазина
        var block_h = Math.min(winH, winW * 0.55 / (828/771))

        // размер
        set_size('#store_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#store_block', (winW - get_size('#store_block').x )/2, (winH - get_size('#store_block').y)/2)

        // размера блока внутреннего текста
        set_size('#store_block_title', get_size('#store_block').x * 0.5, get_size('#store_block').y * 0.17)

        // позиция блока внутреннего текста
        set_pos2('#store_block_title', (get_size('#store_block').x - get_size('#store_block_title').x)/2, get_size('#store_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#store_block_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
            var text_block_h = get_size('#store_block').y * 0.2
            set_size('#store_block_fox_text', text_block_h * (639/250), text_block_h)
            set_pos2('#store_block_fox_text', get_size('#store_block').x * 0.2, get_size('#store_block').y * 0.05)

        

        // Лиса
            var fox_block_h = get_size('#store_block').y * 0.2
            set_size('#store_block #fox', fox_block_h * (310/324), fox_block_h)
            set_pos2('#store_block #fox',  get_size('#store_block').x*0.85 - fox_block_h * (310/324), get_size('#store_block').y * 0.1)

        // Блок баланса
            // размер
            set_size('#balance', get_size('#store_block').x*0.4, get_size('#store_block').y * 0.05)

            // позиция блока баланса
            set_pos('#balance', get_size('#store_block').x * 0.2, get_size('#store_block').y * 0.7 )

            // позиция блока оставшегося кол-ва монеток
            set_pos('#balance_money_little_block', get_size('#balance').x - get_size('#balance_money_little_block').x)

            var little_block_h = get_size('#balance').y

            // размер иконок монеток
            set_size('#balance_money_little_block #score_little_block_ico, #balance_money_little_block #money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('#balance_money_little_block #score_little_block_ico, #balance_money_little_block #money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('#balance_money_little_block #score_little_block_value, #balance_money_little_block #money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

            // размер шрифта надписи баланса
            $('#balance_left').css('font-size', get_size('#balance').y*0.7 + 'px')



        // размер шрифта диалога
        textFit($('#store_block_fox_text'), {alignHoriz: true, multiLine: true})

        // размер спец символа монетки
        //console.log('.green_coin',num(noPX($('#store_block_title span').css('font-size')))*1.2)
        set_size('.green_coin', num(noPX($('#store_block_title span').css('font-size')))*1.2,  num(noPX($('#store_block_title span').css('font-size')))*1.2)

        // выравним спец символ монетки
        set_pos('.green_coin', 'none', get_size('.green_coin').y * 0.15)

        // блок недостаточно монет
        // размер
        var no_money_block_h = get_size('#store_block').y * 0.15
        set_size('#no_money_block', no_money_block_h * (915/339), no_money_block_h)
        // позиция
        set_pos('#no_money_block', (get_size('#store_block').x - get_size('#no_money_block').x)*0.6, (get_size('#store_block').y - get_size('#no_money_block').y)*0.76)
        // размер шрифта
        textFit($('#no_money_block'), {alignHoriz: true, alignVert: true})

        // кнопка - крестик
        set_size('#store_close_button', get_size('#store_block').x * 0.07, get_size('#store_block').x * 0.07)

        set_pos('#store_close_button', get_size('#store_block').x*0.88 - get_size('#store_close_button').x, get_size('#store_block').y*0.18)



    // блок кнопок магазина
        // размер блока
        var block_width = get_size('#store_block').x * 0.8
        //1617/753
        set_size('#store_block_buttons', block_width, (block_width/2) / 1617 * 753)

        // позиция этого блока
        set_pos('#store_block_buttons', (winW - block_width)/2, get_global_pos('#store_block').y + get_size('#store_block').y*0.75)

        // размер самих кнопок
        set_size('#store_button_1, #store_button_2', block_width/2, (block_width / 2) / 1617 * 753)

        // позиция второй кнопки
        set_pos('#store_button_2', block_width/2)

        // размер текста на этих кнопках
        textFit($('#store_button_1, #store_button_2'), {"alignHoriz": true, multiLine: true})


    // баланс очков и монеток
        // размер блока
        set_size('#balance_block', winW * 0.5, winW * 0.5 / 2 / (238/81) )

        set_pos('#balance_block', (winW - get_size('#balance_block').x)/2, winH * 0.05 )

           
        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#balance_block').y*0.4
        // размер области монеток и
        set_size('#balance_block #score_little_block, #balance_block #money_little_block, #balance_block #balance_money_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('#balance_block #money_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*1.2), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#balance_block #score_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*2.4), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // размер иконок монеток
        set_size('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#balance_block #score_little_block_value, #balance_block #money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')


    // блок описания
        // размер
        var block_h = Math.min(winW * 0.6 / (1091/991) , winH * 0.6)
        set_size('#description_block', block_h * (1091/991), block_h)

        // позиция
        set_pos('#description_block', (winW - get_size('#description_block').x)/2, get_pos('#mm_button_1').y - get_size('#mm_button_1').y*0.5)

        // размер иконки закрытия
        set_size('#close_button', block_h * 0.12, block_h * 0.12)

        // позиция иконка закрытия
        set_pos('#close_button', block_h * (1091/991) - block_h * 0.12 - block_h*0.02, block_h * 0.02)

        // размер шрифта
        $('#description_block').css('font-size', block_h / 18 + 'px')


    // блок когда нет ходов
        // блок магазина
        var block_h = Math.min(winH, winW * 0.55 / (832/556))

        // размер
        set_size('#no_moves_block', block_h * (832/556), block_h)
        
        // позиция
        set_pos('#no_moves_block', (winW - get_size('#no_moves_block').x )/2, (winH - get_size('#no_moves_block').y)/2)

        // размера блока внутреннего текста
        set_size('#no_moves_block_title', get_size('#no_moves_block').x * 0.6, get_size('#no_moves_block').y * 0.25)

        // позиция блока внутреннего текста
        set_pos2('#no_moves_block_title', (get_size('#no_moves_block').x - get_size('#no_moves_block_title').x)/2, get_size('#no_moves_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#no_moves_block_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
        var text_block_h = get_size('#no_moves_block').y * 0.28
        set_size('#nmb_fox_text2', text_block_h * (639/250), text_block_h)
        set_pos2('#nmb_fox_text2', get_size('#no_moves_block').x * 0.2, get_size('#no_moves_block').y * 0.05)

        

        // размер лисы
        var fox_block_h = get_size('#no_moves_block').y * 0.35
        set_size('#nmb_fox2', fox_block_h * (310/324), fox_block_h)
        set_pos2('#nmb_fox2',  get_size('#store_block').x*0.93 - fox_block_h * (310/324), get_size('#no_moves_block').y * 0.05)

        
        // размер шрифта диалога
        textFit($('#nmb_fox_text2'), {alignHoriz: true, multiLine: true})

        // кнопка понятно
        var block_width = get_size('#no_moves_block').x * 0.4
        //1617/753
        set_size('#no_moves_block_button, #no_moves_block_button_2', block_width, block_width / 1617 * 753)


        // позиция этого блока
        set_pos('#no_moves_block_button', (winW - block_width) / 2 - get_size('#no_moves_block_button').x * 0.5, get_global_pos('#no_moves_block').y + get_size('#no_moves_block').y*0.9)
        set_pos('#no_moves_block_button_2', (winW - block_width) / 2 + get_size('#no_moves_block_button_2').x * 0.5, get_global_pos('#no_moves_block').y + get_size('#no_moves_block').y*0.9)

        // размер текста на этих кнопках
        textFit($('#no_moves_block_button'), {"alignHoriz": true})
        textFit($('#no_moves_block_button_2'), {"alignHoriz": true})

    // блок гласящий что вышло новое обновление
        // 
        var block_h = Math.min(winH*0.6, winW * 0.55 / (832/556))

        // размер
        set_size('#no_moves_block2', block_h * (832/556), block_h)
        
        // позиция
        set_pos('#no_moves_block2', (winW - get_size('#no_moves_block2').x )/2, (winH - get_size('#no_moves_block2').y)/2)

        // размера блока внутреннего текста
        set_size('#no_moves_block2_title', get_size('#no_moves_block2').x * 0.6, get_size('#no_moves_block2').y * 0.25)

        // позиция блока внутреннего текста
        set_pos2('#no_moves_block2_title', (get_size('#no_moves_block2').x - get_size('#no_moves_block2_title').x)/2, get_size('#no_moves_block2').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#no_moves_block2_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
        var text_block_h = get_size('#no_moves_block2').y * 0.28
        set_size('#nmb_fox_text2', text_block_h * (639/250), text_block_h)
        set_pos2('#nmb_fox_text2', get_size('#no_moves_block2').x * 0.15, get_size('#no_moves_block2').y * 0.05)

        

        // размер лисы
        var fox_block_h = get_size('#no_moves_block2').y * 0.35
        set_size('#nmb_fox2', fox_block_h * (310/324), fox_block_h)
        set_pos2('#nmb_fox2',  get_size('#no_moves_block2').x*0.9 - fox_block_h * (310/324), get_size('#no_moves_block2').y * 0.05)

        
        // размер шрифта диалога
        textFit($('#nmb_fox_text2'), {alignHoriz: true, multiLine: true})

        // кнопка понятно
        var block_width = get_size('#no_moves_block2').x * 0.4
        //1617/753
        set_size('#no_moves_block2_button, #no_moves_block2_button_2', block_width, block_width / 1617 * 753)


        // позиция этого блока
        set_pos('#no_moves_block2_button', (winW - block_width) / 2 - get_size('#no_moves_block2_button').x * 0.5, get_global_pos('#no_moves_block2').y + get_size('#no_moves_block2').y*0.9)
        set_pos('#no_moves_block2_button_2', (winW - block_width) / 2 + get_size('#no_moves_block2_button_2').x * 0.5, get_global_pos('#no_moves_block2').y + get_size('#no_moves_block2').y*0.9)

        // размер текста на этих кнопках
        textFit($('#no_moves_block2_button'), {"alignHoriz": true})
        textFit($('#no_moves_block2_button_2'), {"alignHoriz": true})

    // Блок уровней
        // Размер
        set_size('#levels_block', winW * 0.9, winH * 0.6)
        // Позиция
        set_pos2('#levels_block', winW * 0.05, winH * 0.3)

        // баланс очков/монеток в блоке уровней
            var block_h = Math.min(winW * 0.6 / 2 / (238/81), winH*0.2)
            // размер блока
            set_size('#lmb_balance_block', block_h * 2 * (238/81), block_h )

            set_pos('#lmb_balance_block', (winW - get_size('#lmb_balance_block').x)/2, winH * 0.2 )

               
            // маленькие блоки количества очков и монеток
            var little_block_h = get_size('#lmb_balance_block').y*0.3
            // размер области монеток и
            set_size('#lmb_balance_block #lmb_score_little_block, #lmb_balance_block #lmb_money_little_block, #lmb_balance_block #lmb_balance_money_little_block', little_block_h* (238/81) * 1.2, little_block_h ) 
            // позиция области монеток
            set_pos2('#lmb_balance_block #lmb_money_little_block', (get_size('#lmb_balance_block').x*1.2 - get_size('#lmb_money_little_block').x*1.2), (get_size('#lmb_balance_block').y/2 - get_size('#lmb_money_little_block').y)/2 )

            // позиция области очков
            set_pos2('#lmb_balance_block #lmb_score_little_block', (get_size('#lmb_balance_block').x*1.2 - get_size('#lmb_money_little_block').x*2.4), (get_size('#lmb_balance_block').y/2 - get_size('#lmb_money_little_block').y)/2 )

            // размер иконок монеток
            set_size('#lmb_balance_block #lmb_score_little_block_ico, #lmb_balance_block #lmb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('#lmb_balance_block #lmb_score_little_block_ico, #lmb_balance_block #lmb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('#lmb_balance_block #lmb_score_little_block_value, #lmb_balance_block #lmb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        // иконки
        var icon_h = Math.min(winW / 8, winH / 8)
        set_size('#lm_back_button, #lm_shop_button', icon_h, icon_h)

        set_pos('#lm_back_button', icon_h * 0.2, winH - icon_h * 0.2 - icon_h)
        set_pos('#lm_shop_button', icon_h * 0.2, winH - icon_h * 0.2 - icon_h - icon_h)


     var ss = document.styleSheets[0];

    ss.insertRule('::-webkit-scrollbar {width: 10px}', 0)

    ss.insertRule('::-webkit-scrollbar {box-shadow: inset 0 0 5px grey}', 0);
    ss.insertRule('::-webkit-scrollbar {border-radius: 10px}', 0);

    ss.insertRule('::-webkit-scrollbar-thumb {background: #ffc95c}', 0)
    ss.insertRule('::-webkit-scrollbar-thumb {border-radius: 10px}', 0)
    ss.insertRule('::-webkit-scrollbar-thumb {width: 5px}', 0)
}




// mobile vertical
var profile_3 = function(winW, winH) {
    // левая картинка дерева на главном меню
        var left_tree_img_h = Math.min(winW*0.5, winH)
        set_size("#main_menu_block .filter3_img", left_tree_img_h * (1260/1340), left_tree_img_h)

        var width_10px = 'Маджонг'.width('10px font_1')
        var width2_10px = 'Алхимия'.width('10px font_2')
        var width3_10px = 'Выберите уровень'.width('10px font_2')
        var width4_10px = 'Магазин'.width('10px font_2')
        var width5_10px = 'Галерея'.width('10px font_2')

    // Заголовок: Маджонг
        // Размер
        var block_h = Math.min(winW * 0.6 / width_10px*10, winH * 0.2)
        set_size('#main_menu_title', block_h * width_10px / 10, block_h)
        // Позиция
        set_pos('#main_menu_title', winW*0.3+(winW*0.6 - get_size('#main_menu_title').x)/2, left_tree_img_h*0.5)
        // Размер шрифта
        $('#main_menu_title').css('font-size', block_h + 'px')

    $('.filter_img').css('background-size', '600px 600px')

    // Заголовок: Алхимия
        // Размер
        var block_h = get_size('#main_menu_title').y * 0.7
        set_size('#main_menu_title2', block_h * width2_10px / 10, block_h)
        // Позиция
        set_pos('#main_menu_title2', winW * 0.6, get_size('#main_menu_title').y + get_pos('#main_menu_title').y)
        // Размер шрифта
        $('#main_menu_title2').css('font-size', block_h + 'px')


    // Блок кнопок главного меню
        // Размер самой кнопки
        var block_h = Math.min(winW * 0.5 / (1617/753), winH * 0.3)
        if (user_type == 'mobile') {
            block_h = Math.min(winW * 0.75 / (1617/753), winH * 0.3)
        }

        set_size('.mm_button', block_h * (1617/753), block_h)

        // позиции самих кнопок
        // центирование по горизонтали
        set_pos('.mm_button', (winW - block_h * (1617/753))/2 )

        // позиция первой кнопки
        set_pos('#mm_button_1', 'none', (winH - get_size('.mm_button').y) * 0.6 ) 

        // позиция второй кнопки
        set_pos('#mm_button_2', 'none', get_pos('#mm_button_1').y + get_size('#mm_button_1').y * 1)

        // укажем padding
        $('.mm_button').css('padding', get_size('.mm_button').y*0.4 + 'px')

        // вмещаем текст в кнопку
        textFit($('.mm_button'),  {alignHoriz: true, alignVert: true, widthOnly: true})


    // левая картина дерева в меню уровней и в игровом окне
        var img_x = 1260
        var img_y = 1340
        var left_tree_img_h = Math.min(winW*0.4 / (img_x/img_y), winH*0.3)
        set_size("#levels_menu_block .filter3_img, #game_viewport_block .filter3_img, #shop_block .filter3_img, #gallery_block .filter3_img", left_tree_img_h * (img_x/img_y), left_tree_img_h)


    // правая картинка дерева в меню уровней и в игрковом окне
        var img_x = 516
        var img_y = 470
        var right_tree_img_h = Math.min(winW * 0.3 / (img_x/img_y), winH * (1/5))
        set_size('#levels_menu_block .filter5_img, #game_viewport_block .filter5_img, #shop_block .filter5_img, #gallery_block .filter5_img', right_tree_img_h * (img_x/img_y), right_tree_img_h)
        set_pos('#levels_menu_block .filter5_img, #game_viewport_block .filter5_img, #shop_block .filter5_img, #gallery_block .filter5_img', winW - get_size('.filter5_img').x, 0 ) 


    // Заголовок: Выберите уровень
        // Размер
        set_size('#lm_title', winW * 0.55)
        // Позиция
        set_pos('#lm_title', (winW - get_size('#lm_title').x)/2, left_tree_img_h*0.5)
        // Размер шрифта
        $('#lm_title').css('font-size', get_size('#lm_title').x / width3_10px * 10 + 'px')

    // заголовок: магазин
        // Размер
        set_size('#sb_title', winW * 0.25)
        // Позиция
        set_pos('#sb_title', (winW  - get_size('#sb_title').x) / 2, left_tree_img_h*0.05)
        // Размер шрифта
        $('#sb_title').css('font-size', winW * 0.25 / width4_10px * 10 + 'px')

    // **Заголовок: Галерея
        // Размер
        set_size('#gb_title', winW * 0.25)
        // Позиция
        set_pos('#gb_title', (winW  - get_size('#gb_title').x) / 2, left_tree_img_h*0.25)
        // Размер шрифта
        $('#gb_title').css('font-size', winW * 0.25 / width5_10px * 10 + 'px')

    // БЛОК МАГАЗИНА
     // размера блока карточек
        var block_h = winW / (744/612) *0.7
        set_size('#shop_cards_block', block_h*(744/612), block_h)
        // Позиция
        set_pos2('#shop_cards_block', (winW - get_size('#shop_cards_block').x)/2, (winH - get_size('#shop_cards_block').y)/2)
        set_size('.shop_card_block', get_size('#shop_cards_block').y*(744/612), get_size('#shop_cards_block').y )

        set_pos('#uncommon_block', 0)
        set_pos('#rare_block', block_h*(744/612), - get_size('#rare_block').y )
        set_pos('#epic_block', block_h*(744/612) * 2, - get_size('#rare_block').y * 2)
        set_pos('#legendary_block', block_h*(744/612) * 3, - get_size('#rare_block').y * 3)


        
        // размер миниатюры конкретного уровня
        $(".scb_mini_img").attr('height', get_size('.shop_card_block').y*0.6-20)

        // центрирование миниатюры конкретного уровня
        set_pos('.scb_mini_img', (get_size('.shop_card_block').x - get_size('.scb_mini_img').x)/2, (get_size('.shop_card_block').y - get_size(' .scb_mini_img').y)/2)

        // центрирование названия конкретного уровня
        set_pos('.shop_card_block center', 'none', (get_size('.shop_card_block').y - get_size('.shop_card_block center').y*1.35))

        // размер шрифта названия конкретного уровня
        $('.shop_card_block center').css('font-size', Math.min((get_size('.shop_card_block').y - get_size('.shop_card_block center').y-12)*0.7, get_size('.shop_card_block').x / 12) + 'px')

        // баланс очков/монеток в блоке уровней
        var block_h = Math.min(winW * 0.6 / 2 / (238/81), winH*0.07)
        // размер блока
        set_size('#sb_balance_block', block_h * 2 * (238/81), block_h )

        set_pos('#sb_balance_block', (winW - get_size('#sb_balance_block').x)/2, get_global_pos('#sb_title').y + get_size('#sb_title').y )

           
        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#sb_balance_block').y*0.7
        // размер области монеток и
        set_size('#sb_balance_block #sb_score_little_block, #sb_balance_block #sb_money_little_block, #sb_balance_block #sb_balance_money_little_block', little_block_h* (238/81) * 1.2, little_block_h ) 
        // позиция области монеток
        set_pos2('#sb_balance_block #sb_money_little_block', (get_size('#sb_balance_block').x*1.2 - get_size('#sb_money_little_block').x*1.2), (get_size('#sb_balance_block').y/2 - get_size('#sb_money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#sb_balance_block #sb_score_little_block', (get_size('#sb_balance_block').x*1.2 - get_size('#sb_money_little_block').x*2.4), (get_size('#sb_balance_block').y/2 - get_size('#sb_money_little_block').y)/2 )

        // размер иконок монеток
        set_size('#sb_balance_block #sb_score_little_block_ico, #sb_balance_block #sb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#sb_balance_block #sb_score_little_block_ico, #sb_balance_block #sb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#sb_balance_block #sb_score_little_block_value, #sb_balance_block #sb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        var icon_h = Math.min(winW / 6, winH / 6)
        set_size('#sb_back_button, #sb_ad_button', icon_h, icon_h)

        set_pos('#sb_back_button', icon_h * 0.1, winH - icon_h * 0.1 - icon_h)
        set_pos('#sb_ad_button', winW - icon_h - icon_h * 0.1, winH - icon_h * 0.1 - icon_h)
        // кнопка ведущая в галерею
        var button_h = get_size('#shop_cards_block').x * 0.95 / (567/140)

        set_size('#gallery_button', button_h * (567/140), button_h)

        set_pos('#gallery_button', (winW - get_size('#gallery_button').x)/2, get_global_pos('#shop_cards_block').y + get_size('#shop_cards_block').y * 1.2 )

        textFit($('#gallery_button'), {alignHoriz: true})
        //textFit($('#gallery_button'), {alignVert: true, alignHoriz: true})


        // боковые кнопки стрелки
        var arrow_block_h = get_size('#shop_cards_block').y * 0.5

        set_size('#shop_left_arrow, #shop_right_arrow', arrow_block_h * (264/491), arrow_block_h)

        set_pos('#shop_left_arrow', get_global_pos('#shop_cards_block').x - arrow_block_h * (264/491) * 1, get_global_pos('#shop_cards_block').y + arrow_block_h/2)

        set_pos('#shop_right_arrow', get_global_pos('#shop_cards_block').x + get_size('#shop_cards_block').x*1 , get_global_pos('#shop_cards_block').y + arrow_block_h/2)

    // БЛОК ПОДТВЕРЖДЕНИЯ ПОКУПКИ МАГАЗИНА
        // высота
        var block_h = Math.min(winH, winW / (828/771))

        // размер
        set_size('#shop_warn_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#shop_warn_block', (winW - get_size('#shop_warn_block').x )/2, (winH - get_size('#shop_warn_block').y)/2)

        // размера блока внутреннего текста
        set_size('#swb_title', get_size('#shop_warn_block').x * 0.5, get_size('#shop_warn_block').y * 0.15)

        // позиция блока внутреннего текста
        set_pos2('#swb_title', (get_size('#shop_warn_block').x - get_size('#swb_title').x)/2, get_size('#shop_warn_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#swb_title'),  {alignHoriz: true, multiLine: true})

       
        // Блок баланса
            // размер
            set_size('#swb_balance', get_size('#store_block').x*0.4, get_size('#shop_warn_block').y * 0.05)

            // позиция блока баланса
            set_pos('#swb_balance', get_size('#store_block').x * 0.2, get_size('#shop_warn_block').y * 0.7 )

            // позиция блока оставшегося кол-ва монеток
            set_pos('#swb_balance_money_little_block', get_size('#swb_balance').x - get_size('#swb_balance_money_little_block').x)

            var little_block_h = get_size('#swb_balance').y

            // размер иконок монеток
            set_size('#swb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('#swb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('#swb_balance_money_little_block #score_little_block_value, #swb_balance_money_little_block #swb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

            // размер шрифта надписи баланса
            $('#swb_balance_left').css('font-size', get_size('#swb_balance').y*0.7 + 'px')

        // размер блока информации о цене
        set_size('#swb_info_cost, #swb_info_unlocked', get_size('#swb_info').x, get_size('#swb_info').y/2)

        // размера блока с монеткой

        var block_h = get_size('#swb_info_cost').y * 0.5
        set_size('#swb_info_balance_money_little_block, #swb_info_unlocked_balance_money_little_block, #swb_balance_money_little_block', block_h * (238/81), block_h)

        // позиция блока с монеткой
        set_pos('#swb_info_balance_money_little_block, #swb_info_unlocked_balance_money_little_block, #swb_balance_money_little_block', get_size('#swb_info').x * 0.5)



        // ОБЩИЙ БЛОК БАЛАНСА
            var little_block_h = get_size('.balance_block').y

            // размер иконок монеток
            set_size('.balance_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('.balance_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('.balance_block_value, .balance_left_block').css('font-size', little_block_h * 0.7 + 'px')


        // блок недостаточно монет
        // размер
        var no_money_block_h = get_size('#shop_warn_block').y * 0.15
        set_size('#swb_no_money_block', no_money_block_h * (915/339), no_money_block_h)
        // позиция
        set_pos('#swb_no_money_block', (get_size('#store_block').x - get_size('#no_money_block').x)*0.6, (get_size('#shop_warn_block').y - get_size('#no_money_block').y)*0.76)
        // размер шрифта
        textFit($('#swb_no_money_block'), {alignHoriz: true, alignVert: true})
        textFit($('#swb_no_money_block'), {alignHoriz: true, alignVert: true})

        // кнопка - крестик
        set_size('#swb_store_close_button', get_size('#shop_warn_block').x * 0.07, get_size('#shop_warn_block').x * 0.07)

        set_pos('#swb_store_close_button', get_size('#shop_warn_block').x*0.88 - get_size('#store_close_button').x, get_size('#shop_warn_block').y*0.18)


        // картинка
            set_size('#swb_img', get_size('#shop_warn_block').y * 0.2, get_size('#shop_warn_block').y * 0.2/ (364/328))

            set_pos('#swb_img', get_size('#shop_warn_block').x * 0.25, get_size('#shop_warn_block').y * 0.45)

        // блок информации
            set_size('#swb_info', get_size('#shop_warn_block').x*0.6 - get_size('#shop_warn_block').y * 0.2, get_size('#shop_warn_block').y * 0.2 )

            set_pos('#swb_info', get_size('#swb_img').x*1.2 + get_pos('#swb_img').x, get_size('#shop_warn_block').y * 0.45)

        // кнопка купить
            var button_h = get_size('#shop_warn_block').x * 0.45 / (1492/646)
            set_size('#shop_warn_button', button_h * (1492/646), button_h)
            set_pos('#shop_warn_button', (get_size('#shop_warn_block').x - get_size('#shop_warn_button').x)/2, get_size('#shop_warn_block').y * 0.735)

            textFit($('#shop_warn_button'), {alignHoriz: true, alignVert: true})

    // БЛОК карточка получена
        var block_h = Math.min(winH, winW * 0.75 / (828/771))

        // размер
        set_size('#recieved_card_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#recieved_card_block', (winW - get_size('#recieved_card_block').x )/2, (winH - get_size('#recieved_card_block').y)/2)

        // картинка лучей
        set_size('#rcb_img_1', block_h * 0.45 * (722/738), block_h * 0.45)
        set_pos('#rcb_img_1', (get_size('#recieved_card_block').x - get_size('#rcb_img_1').x) / 2, block_h * 0.23)

        // картинка самого блока
        set_size('#rcb_img_2', block_h * 0.235 * (177/210), block_h * 0.235)
        set_pos('#rcb_img_2', (get_size('#recieved_card_block').x - get_size('#rcb_img_2').x) / 2, block_h * 0.23 * 1.5)

        // блок текста
        set_size('#rcb_title', get_size('#recieved_card_block').x * 0.8, block_h * 0.1 )
        set_pos2('#rcb_title', (get_size('#recieved_card_block').x - get_size('#rcb_title').x)/2, block_h * 0.7)

        textFit($('#rcb_title'), {alignHoriz: true, alignVert: true})

    // БЛОК ГАЛЕРЕИ
        // общий блок 
        var block_h = Math.min(winW * 0.9/(1000/888), winH * 0.9)
        set_size('#gallery_all_cards_block', block_h * (1000/888), block_h)
        set_pos('#gallery_all_cards_block', (winW - get_size('#gallery_all_cards_block').x)/2, (winH - get_size('#gallery_all_cards_block').y) * 0.5 )


        // блок с карточками
        var block_h = Math.min(winW * 0.8/(1432/888), winH * 0.8)
        
        set_size('.gallery_cards_block', block_h * (1432/888), block_h)
        set_pos('.gallery_cards_block', (get_size('#gallery_all_cards_block').x - get_size('.gallery_cards_block').x)/2, (get_size('#gallery_all_cards_block').y - get_size('.gallery_cards_block').y) * 0.85 )

        // блок с указанием типа
        var block_h = block_h * 0.5

        set_size('.gallery_cards_type_block', block_h * (1031/400), block_h)
        set_pos('.gallery_cards_type_block', get_pos('.gallery_cards_block').x + get_size('.gallery_cards_block').x * 0.075, get_pos('.gallery_cards_block').y - block_h * 0.85)

        $('.gallery_cards_type_block').css('padding-top', get_size('.gallery_cards_type_block').y * 0.6 + 'px')
        $('.gallery_cards_type_block').css('padding-left', get_size('.gallery_cards_type_block').x * 0.2 + 'px')

        textFit($('.gallery_cards_type_block'), {alignHoriz: true})

        // боковые кнопки стрелки
        var arrow_block_h = get_size('.gallery_cards_block').y * 0.35

        set_size('#gallery_left_arrow, #gallery_right_arrow', arrow_block_h * (264/491), arrow_block_h)

        set_pos('#gallery_left_arrow', get_global_pos('#gallery_all_cards_block').x - arrow_block_h * (264/491) * 0.5, get_global_pos('.gallery_cards_block').y + (get_size('.gallery_cards_block').y - arrow_block_h)/2)

        set_pos('#gallery_right_arrow', get_global_pos('#gallery_all_cards_block').x + get_size('#gallery_all_cards_block').x*1 - arrow_block_h * (264/491) * 0.5 , get_global_pos('.gallery_cards_block').y + (get_size('.gallery_cards_block').y - arrow_block_h)/2)

        // позиции блоков с карточками разных типов
        set_pos('#rare_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x)
        set_pos('#rare_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x)

        set_pos('#epic_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x*2)
        set_pos('#epic_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x*2)

        set_pos('#legendary_cards_type', get_pos('#uncommon_cards_type').x + get_size('#gallery_all_cards_block').x*3)
        set_pos('#legendary_cards', get_pos('#uncommon_cards').x + get_size('#gallery_all_cards_block').x*3)

        // вернуться обратно
        var icon_h = Math.min(winW / 6, winH / 6)
        set_size('#gb_back_button', icon_h, icon_h)

        set_pos('#gb_back_button', icon_h * 0.1, winH - icon_h * 0.1 - icon_h)


    // Боковые кнопки
        // Размер
        var icon_size = Math.min(winW * 0.15, winH * 0.15)
        //$('.side_icon').attr('width', icon_size)
        set_size('.side_icon', icon_size, icon_size)

        // позиции каждой из кнопок
        set_pos('#ico_1', winW * 0.25 - icon_size/2, winH*0.97 - icon_size)
        set_pos('#ico_2', winW * 0.5 - icon_size/2, winH*0.97 - icon_size)
        set_pos('#ico_3', winW * 0.75 - icon_size/2, winH*0.97 - icon_size)
        set_pos('#ico_4', winW * 0.97 - icon_size, winH * 0.15)


    $('.filter4_img').css('display', 'none')
    $('.background_img').css('background-size', 'auto 100%');

    /*
    // блок пройденного уровня
        var block_h = Math.min(winH*0.5, winW * 0.9 / (828/771))

        // размер
        set_size('#level_passed_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#level_passed_block', (winW - get_size('#level_passed_block').x )/2, (winH - get_size('#level_passed_block').y)/2)

        // размера блока внутреннего текста
        set_size('#level_passed_block #text', get_size('#level_passed_block').x * 0.4, get_size('#level_passed_block').y * 0.3)

        // позиция блока внутреннего текста
        set_pos2('#level_passed_block #text', (get_size('#level_passed_block').x - get_size('#level_passed_block #text').x)/2, get_size('#level_passed_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#level_passed_block #text'),  {alignHoriz: true, alignVert: true, multiLine: true})

        // размер области очков
        set_size('#level_passed_block #score', get_size('#level_passed_block').x*0.6 , get_size('#level_passed_block').x*0.6 / (505/89))

        // позиция области очков
        set_pos2('#level_passed_block #score', (get_size('#level_passed_block').x - get_size('#level_passed_block #score').x)/2, get_size('#level_passed_block').y * 0.05)

        // размер шрифта области очков
        $('#level_passed_block #score').css('font-size', get_size('#level_passed_block #score').y*0.8 + 'px')

        // кнопки
        // размер
        var ico_size = get_size('#level_passed_block').x * (1/6)
        set_size('.level_passed_ico', ico_size, ico_size)

        // позиция
        set_pos('#level_passed_ico_1', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_2', (winW - ico_size) / 2, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_3', (winW - ico_size) / 2 + get_size('#level_passed_block').x * 0.25, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
    */

    // текст количества очков
        // баланс очков и монеток
        // размер блока
        //set_size('#score_text', winW * 0.5)
        set_size('#balance_block', winW * 0.5, winW * 0.5 / 2 / (238/81) )

        set_pos('#balance_block', (winW - get_size('#balance_block').x)/2, winH * 0.05 )

           
        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#balance_block').y*0.4
        // размер области монеток и
        set_size('#balance_block #score_little_block, #balance_block #money_little_block, #balance_block #balance_money_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('#balance_block #money_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*1.2), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#balance_block #score_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*2.4), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // размер иконок монеток
        set_size('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#balance_block #score_little_block_value, #balance_block #money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')


    // блок описания
        // размер
        var block_h = Math.min(winW * 0.9 / (1091/991) , winH * 0.6)
        set_size('#description_block', block_h * (1091/991), block_h)

        // позиция
        set_pos('#description_block', (winW - get_size('#description_block').x)/2, get_pos('#mm_button_1').y - get_size('#mm_button_1').y*0.5)

        // размер иконки закрытия
        set_size('#close_button', block_h * 0.12, block_h * 0.12)

        // позиция иконка закрытия
        set_pos('#close_button', block_h * (1091/991) - block_h * 0.12 - block_h*0.02, block_h * 0.02)

        // размер шрифта описания
        $('#description_block').css('font-size', block_h / 17 + 'px')


    // блок пройденного уровня
        var block_h = Math.min(winH, winW * 0.95 / (828/771))

        // размер
        set_size('#level_passed_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#level_passed_block', (winW - get_size('#level_passed_block').x )/2, (winH - get_size('#level_passed_block').y)/2)

        // размера блока внутреннего текста
        set_size('#level_passed_block #text', get_size('#level_passed_block').x * 0.4, get_size('#level_passed_block').y * 0.15)

        // позиция блока внутреннего текста
        set_pos2('#level_passed_block #text', (get_size('#level_passed_block').x - get_size('#level_passed_block #text').x)/2, get_size('#level_passed_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#level_passed_block #text'),  {alignHoriz: true, alignVert: true, multiLine: true})

        // размер области очков
        set_size('#level_passed_block #score', get_size('#level_passed_block').x*0.6 , get_size('#level_passed_block').x*0.6 / (935/120))

        // позиция области очков
        set_pos2('#level_passed_block #score', (get_size('#level_passed_block').x - get_size('#level_passed_block #score').x)/2, get_size('#level_passed_block').y * 0.0)

        // размер шрифта области очков
        $('#level_passed_block #score').css('font-size', get_size('#level_passed_block #score').y*0.4 + 'px')

        // выровним текст по середине по вертикали
        set_pos2('#level_passed_block #score #left', 'none', (get_size('#level_passed_block #score').y - get_size('#level_passed_block #score #left').y)/2)

        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#level_passed_block #score').y*0.6
        // размер области монеток и
        set_size('#lpb_score_little_block, #lpb_money_little_block, #balance_money_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('#lpb_money_little_block', (get_size('#level_passed_block #score').x - get_size('#lpb_money_little_block').x*1.2), (get_size('#level_passed_block #score').y - get_size('#lpb_money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#lpb_score_little_block', (get_size('#level_passed_block #score').x - get_size('#lpb_score_little_block').x*2.4), (get_size('#level_passed_block #score').y - get_size('#lpb_score_little_block').y)/2 )

        // размер иконок монеток
        set_size('#lpb_score_little_block_ico, #lpb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#lpb_score_little_block_ico, #lpb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#lpb_score_little_block_value, #lpb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        // размер блока диалога
        var text_block_h = get_size('#level_passed_block').y * 0.2
        set_size('#fox_text', text_block_h * (639/250), text_block_h)
        set_pos2('#fox_text', get_size('#level_passed_block').x * 0.2, get_size('#level_passed_block').y * 0.05)

        // размер шрифта диалога
        textFit($('#fox_text'), {alignHoriz: true, multiLine: true})

        // размер лисы
        var fox_block_h = get_size('#level_passed_block').y * 0.2
        set_size('#fox', fox_block_h * (310/324), fox_block_h)
        set_pos2('#fox',  get_size('#level_passed_block').x*0.85 - fox_block_h * (310/324), get_size('#level_passed_block').y * 0.1)

        // кнопки
        // размер
        var ico_size = get_size('#level_passed_block').x * (1/6)
        set_size('.level_passed_ico', ico_size, ico_size)

        // позиция
        set_pos('#level_passed_ico_1', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_2', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25 + ico_size*1.1, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )
        set_pos('#level_passed_ico_3', (winW - ico_size) / 2 - get_size('#level_passed_block').x * 0.25 + ico_size*2.2, get_pos("#level_passed_block").y + get_size('#level_passed_block').y*0.8 - ico_size*0.3 )


    // Блок магазина подсказок-перемешиваний
        
        // блок магазина
        var block_h = Math.min(winH, winW * 0.95 / (828/771))

        // размер
        set_size('#store_block', block_h * (828/771), block_h)
        
        // позиция
        set_pos('#store_block', (winW - get_size('#store_block').x )/2, (winH - get_size('#store_block').y)/2)

        // размера блока внутреннего текста
        set_size('#store_block_title', get_size('#store_block').x * 0.5, get_size('#store_block').y * 0.15)

        // позиция блока внутреннего текста
        set_pos2('#store_block_title', (get_size('#store_block').x - get_size('#store_block_title').x)/2, get_size('#store_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#store_block_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
        var text_block_h = get_size('#store_block').y * 0.2
        set_size('#store_block_fox_text', text_block_h * (639/250), text_block_h)
        set_pos2('#store_block_fox_text', get_size('#store_block').x * 0.2, get_size('#store_block').y * 0.05)

        

        // размер лисы
        var fox_block_h = get_size('#store_block').y * 0.2
        set_size('#store_block #fox', fox_block_h * (310/324), fox_block_h)
        set_pos2('#store_block #fox',  get_size('#store_block').x*0.85 - fox_block_h * (310/324), get_size('#store_block').y * 0.1)

        // размер блока баланса
        set_size('#balance', get_size('#store_block').x*0.4, get_size('#store_block').y * 0.05)

        // позиция блока баланса
        set_pos('#balance', get_size('#store_block').x * 0.2, get_size('#store_block').y * 0.7 )

        // позиция блока оставшегося кол-ва монеток
        set_pos('#balance_money_little_block', get_size('#balance').x - get_size('#balance_money_little_block').x)

        var little_block_h = get_size('#balance').y

        // размер иконок монеток
        set_size('#balance_money_little_block #score_little_block_ico, #balance_money_little_block #money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#balance_money_little_block #score_little_block_ico, #balance_money_little_block #money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#balance_money_little_block #score_little_block_value, #balance_money_little_block #money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')




        // размер шрифта надписи баланса
        $('#balance_left').css('font-size', get_size('#balance').y*0.7 + 'px')

        // размер шрифта диалога
        textFit($('#store_block_fox_text'), {alignHoriz: true, multiLine: true})

        // размер спец символа монетки
        //console.log('.green_coin',num(noPX($('#store_block_title span').css('font-size')))*1.2)
        set_size('.green_coin', num(noPX($('#store_block_title span').css('font-size')))*1.2,  num(noPX($('#store_block_title span').css('font-size')))*1.2)

        // выравним спец символ монетки
        set_pos('.green_coin', 'none', get_size('.green_coin').y * 0.15)

        // блок недостаточно монет
        // размер
        var no_money_block_h = get_size('#store_block').y * 0.15
        set_size('#no_money_block', no_money_block_h * (915/339), no_money_block_h)
        // позиция
        set_pos('#no_money_block', (get_size('#store_block').x - get_size('#no_money_block').x)*0.6, (get_size('#store_block').y - get_size('#no_money_block').y)*0.76)
        // размер шрифта
        textFit($('#no_money_block'), {alignHoriz: true, alignVert: true})

        // кнопка - крестик
        set_size('#store_close_button', get_size('#store_block').x * 0.07, get_size('#store_block').x * 0.07)

        set_pos('#store_close_button', get_size('#store_block').x*0.88 - get_size('#store_close_button').x, get_size('#store_block').y*0.18)


    // блок кнопок магазина
        // размер блока
        var block_width = get_size('#store_block').x * 0.8
        //1617/753
        set_size('#store_block_buttons', block_width, (block_width/2) / 1617 * 753)

        // позиция этого блока
        set_pos('#store_block_buttons', (winW - block_width)/2, get_global_pos('#store_block').y + get_size('#store_block').y*0.75)

        // размер самих кнопок
        set_size('#store_button_1, #store_button_2', block_width/2, (block_width / 2) / 1617 * 753)

        // позиция второй кнопки
        set_pos('#store_button_2', block_width/2)

        // размер текста на этих кнопках
        textFit($('#store_button_1, #store_button_2'), {"alignHoriz": true, multiLine: true})


    // баланс очков и монеток
        // размер блока
        //set_size('#score_text', winW * 0.5)
        set_size('#balance_block', winW * 0.5, winW * 0.5 / 2 / (238/81) )

        set_pos('#balance_block', (winW - get_size('#balance_block').x)/2, winH * 0.05 )

           
        // маленькие блоки количества очков и монеток
        var little_block_h = get_size('#balance_block').y*0.9
        // размер области монеток и
        set_size('#balance_block #score_little_block, #balance_block #money_little_block, #balance_block #balance_money_little_block', little_block_h* (238/81), little_block_h ) 
        // позиция области монеток
        set_pos2('#balance_block #money_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*1.2), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // позиция области очков
        set_pos2('#balance_block #score_little_block', (get_size('#level_passed_block #score').x - get_size('#money_little_block').x*2.4), (get_size('#level_passed_block #score').y - get_size('#money_little_block').y)/2 )

        // размер иконок монеток
        set_size('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

        // позиция иконок монеток
        set_pos2('#balance_block #score_little_block_ico, #balance_block #money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

        // размер шрифта текста маленького блока
        $('#balance_block #score_little_block_value, #balance_block #money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')


    // блок описания
        // размер
        var block_h = Math.min(winW * 0.9 / (1091/991) , winH * 0.6)
        set_size('#description_block', block_h * (1091/991), block_h)

        // позиция
        set_pos('#description_block', (winW - get_size('#description_block').x)/2, get_pos('#mm_button_1').y - get_size('#mm_button_1').y*0.5)

        // размер иконки закрытия
        set_size('#close_button', block_h * 0.12, block_h * 0.12)

        // позиция иконка закрытия
        set_pos('#close_button', block_h * (1091/991) - block_h * 0.12 - block_h*0.02, block_h * 0.02)

        // размер шрифта
        $('#description_block').css('font-size', block_h / 17 + 'px')
        

    // блок когда нет ходов
        // блок магазина
        var block_h = Math.min(winH, winW * 0.95 / (832/556))

        // размер
        set_size('#no_moves_block', block_h * (832/556), block_h)
        
        // позиция
        set_pos('#no_moves_block', (winW - get_size('#no_moves_block').x )/2, (winH - get_size('#no_moves_block').y)/2)

        // размера блока внутреннего текста
        set_size('#no_moves_block_title', get_size('#no_moves_block').x * 0.6, get_size('#no_moves_block').y * 0.25)

        // позиция блока внутреннего текста
        set_pos2('#no_moves_block_title', (get_size('#no_moves_block').x - get_size('#no_moves_block_title').x)/2, get_size('#no_moves_block').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#no_moves_block_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
        var text_block_h = get_size('#no_moves_block').y * 0.28
        set_size('#nmb_fox_text', text_block_h * (639/250), text_block_h)
        set_pos2('#nmb_fox_text', get_size('#no_moves_block').x * 0.2, get_size('#no_moves_block').y * 0.05)

        // размер лисы
        var fox_block_h = get_size('#no_moves_block').y * 0.35
        set_size('#nmb_fox', fox_block_h * (310/324), fox_block_h)
        set_pos2('#nmb_fox',  get_size('#store_block').x*0.93 - fox_block_h * (310/324), get_size('#no_moves_block').y * 0.05)

        
        // размер шрифта диалога
        textFit($('#nmb_fox_text'), {alignHoriz: true, multiLine: true})

        // кнопка понятно
        var block_width = get_size('#no_moves_block').x * 0.4
        //1617/753
        set_size('#no_moves_block_button, #no_moves_block_button_2', block_width, block_width / 1617 * 753)


        // позиция этого блока
        set_pos('#no_moves_block_button', (winW - block_width) / 2 - get_size('#no_moves_block_button').x * 0.5, get_global_pos('#no_moves_block').y + get_size('#no_moves_block').y*0.9)
        set_pos('#no_moves_block_button_2', (winW - block_width) / 2 + get_size('#no_moves_block_button_2').x * 0.5, get_global_pos('#no_moves_block').y + get_size('#no_moves_block').y*0.9)
        // размер текста на этих кнопках
        textFit($('#no_moves_block_button'), {"alignHoriz": true})
        textFit($('#no_moves_block_button_2'), {"alignHoriz": true})


    // блок гласящий о новом обновлении
        var block_h = Math.min(winH, winW * 0.95 / (832/556))

        // размер
        set_size('#no_moves_block2', block_h * (832/556), block_h)
        
        // позиция
        set_pos('#no_moves_block2', (winW - get_size('#no_moves_block2').x )/2, (winH - get_size('#no_moves_block2').y)/2)

        // размера блока внутреннего текста
        set_size('#no_moves_block2_title', get_size('#no_moves_block2').x * 0.6, get_size('#no_moves_block2').y * 0.25)

        // позиция блока внутреннего текста
        set_pos2('#no_moves_block2_title', (get_size('#no_moves_block2').x - get_size('#no_moves_block2_title').x)/2, get_size('#no_moves_block2').y * 0.25)

        // размер шрифта внутреннего текста
        textFit($('#no_moves_block2_title'),  {alignHoriz: true, multiLine: true})

       
        // размер блока диалога
        var text_block_h = get_size('#no_moves_block2').y * 0.28
        set_size('#nmb_fox_text2', text_block_h * (639/250), text_block_h)
        set_pos2('#nmb_fox_text2', get_size('#no_moves_block2').x * 0.2, get_size('#no_moves_block2').y * 0.05)

        // размер лисы
        var fox_block_h = get_size('#no_moves_block2').y * 0.35
        set_size('#nmb_fox2', fox_block_h * (310/324), fox_block_h)
        set_pos2('#nmb_fox2',  get_size('#store_block').x*0.93 - fox_block_h * (310/324), get_size('#no_moves_block2').y * 0.05)

        
        // размер шрифта диалога
        textFit($('#nmb_fox_text2'), {alignHoriz: true, multiLine: true})

        // кнопка понятно
        var block_width = get_size('#no_moves_block2').x * 0.4
        //1617/753
        set_size('#no_moves_block2_button, #no_moves_block2_button_2', block_width, block_width / 1617 * 753)


        // позиция этого блока
        set_pos('#no_moves_block2_button', (winW - block_width) / 2 - get_size('#no_moves_block2_button').x * 0.5, get_global_pos('#no_moves_block2').y + get_size('#no_moves_block2').y*0.9)
        set_pos('#no_moves_block2_button_2', (winW - block_width) / 2 + get_size('#no_moves_block2_button_2').x * 0.5, get_global_pos('#no_moves_block2').y + get_size('#no_moves_block2').y*0.9)
        // размер текста на этих кнопках
        textFit($('#no_moves_block2_button'), {"alignHoriz": true})
        textFit($('#no_moves_block2_button_2'), {"alignHoriz": true})

    // Блок уровней
        // Размер
        set_size('#levels_block', winW * 0.9, winH * 0.6)
        // Позиция
        set_pos2('#levels_block', winW * 0.05, winH * 0.3)

        // баланс очков/монеток в блоке уровней
            // размер блока
            var block_h = Math.min(winW * 0.6 / 2 / (238/81), winH*0.07)
            // размер блока
            set_size('#lmb_balance_block', block_h * 2 * (238/81), block_h )

            set_pos('#lmb_balance_block', (winW - get_size('#lmb_balance_block').x)/2, get_global_pos('#lm_title').y + get_size('#lm_title').y )

               
            // маленькие блоки количества очков и монеток
            var little_block_h = get_size('#lmb_balance_block').y*0.7
            // размер области монеток и
            set_size('#lmb_balance_block #lmb_score_little_block, #lmb_balance_block #lmb_money_little_block, #lmb_balance_block #lmb_balance_money_little_block', little_block_h* (238/81) * 1.2, little_block_h ) 
            // позиция области монеток
            set_pos2('#lmb_balance_block #lmb_money_little_block', (get_size('#lmb_balance_block').x*1.2 - get_size('#lmb_money_little_block').x*1.2), (get_size('#lmb_balance_block').y/2 - get_size('#lmb_money_little_block').y)/2 )

            // позиция области очков
            set_pos2('#lmb_balance_block #lmb_score_little_block', (get_size('#lmb_balance_block').x*1.2 - get_size('#lmb_money_little_block').x*2.4), (get_size('#lmb_balance_block').y/2 - get_size('#lmb_money_little_block').y)/2 )

            // размер иконок монеток
            set_size('#lmb_balance_block #lmb_score_little_block_ico, #lmb_balance_block #lmb_money_little_block_ico', little_block_h*0.8, little_block_h*0.8)

            // позиция иконок монеток
            set_pos2('#lmb_balance_block #lmb_score_little_block_ico, #lmb_balance_block #lmb_money_little_block_ico', little_block_h*0.1, little_block_h * 0.1)

            // размер шрифта текста маленького блока
            $('#lmb_balance_block #lmb_score_little_block_value, #lmb_balance_block #lmb_money_little_block_value').css('font-size', little_block_h * 0.7 + 'px')

        // иконки
        var icon_h = Math.min(winW / 6, winH / 6)
        set_size('#lm_back_button, #lm_shop_button', icon_h, icon_h)

        set_pos('#lm_back_button', icon_h * 0.1, winH - icon_h * 0.1 - icon_h)
        set_pos('#lm_shop_button', winW - icon_h - icon_h * 0.1, winH - icon_h * 0.1 - icon_h)
//get_pos('#lmb_balance_block').y + get_size('#lmb_balance_block').y - icon_h * 0.2

    // заголовок: магазин
    // Размер
        set_size('#sb_title', winW * 0.45)
        // Позиция
        set_pos('#sb_title', (winW  - get_size('#sb_title').x) / 2, left_tree_img_h*0.45)
        // Размер шрифта
        $('#sb_title').css('font-size', winW * 0.45 / width4_10px * 10 + 'px')

    



    var ss = document.styleSheets[0];

    ss.insertRule('::-webkit-scrollbar {width: 10px}', 0)

    ss.insertRule('::-webkit-scrollbar {box-shadow: inset 0 0 5px grey}', 0);
    ss.insertRule('::-webkit-scrollbar {border-radius: 10px}', 0);

    ss.insertRule('::-webkit-scrollbar-thumb {background: #ffc95c}', 0)
    ss.insertRule('::-webkit-scrollbar-thumb {border-radius: 10px}', 0)
    ss.insertRule('::-webkit-scrollbar-thumb {width: 5px}', 0)

} 

var resizeScreen = function() {
    console.log('resized')
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // код для мобильных устройств
        user_type = 'mobile';
    } else {
        user_type = 'pc';
        // код для обычных устройств
    }

    // размер экрана пользователя
	winW = $(window).width();
    winH = $(window).height();

    // Сделаем блоки видимыми для Jquery
    var main_menu_block_display = $('#main_menu_block').css('display')
    var levels_menu_block_display = $("#levels_menu_block").css('display')
    var game_viewport_block_display = $('#game_viewport_block').css('display')
    var level_passed_block_display = $('#level_passed_block').css('display')
    var description_block_display = $('#description_block').css('display')
    var store_block_display = $('#store_block').css('display')
    var store_block_buttons_display = $('#store_block_buttons').css('display')
    
    var no_moves_block_display = $('#no_moves_block').css('display')
    var no_moves_block_button_display = $('#no_moves_block_button').css('display')
    var no_moves_block_button_2_display = $('#no_moves_block_button_2').css('display')


    var no_moves_block2_display = $('#no_moves_block2').css('display')
    var no_moves_block2_button_display = $('#no_moves_block2_button').css('display')
    var no_moves_block2_button_2_display = $('#no_moves_block2_button_2').css('display')

    var no_money_block_display = $('#no_money_block').css('display')
    var swb_no_money_block_display = $('#swb_no_money_block').css('display')

    var shop_block_display = $('#shop_block').css('display')
    var shop_warn_block_display = $('#shop_warn_block').css('display')

    var recieved_card_block_display = $('#recieved_card_block').css('display')
    var gallery_block_display = $('#gallery_block').css('display')

    if (main_menu_block_display == 'none') {
        $('#main_menu_block').css('display', 'block')
        $('#main_menu_block').css('opacity', 0)
    }

    if (levels_menu_block_display == 'none') {
        $('#levels_menu_block').css('display', 'block')
        $('#levels_menu_block').css('opacity', 0)
    }

    if (game_viewport_block_display == 'none') {
        $('#game_viewport_block').css('display', 'block')
        $('#game_viewport_block').css('opacity', 0)
    }

    if (level_passed_block_display == 'none') {
        $('#level_passed_block').css('display', 'block')
        $('#level_passed_block').css('opacity', 0)
    }

    if (description_block_display == 'none') {
        $('#description_block').css('display', 'block')
        $('#description_block').css('opacity', 0)
    }

    if (store_block_display == 'none') {
        $('#store_block').css('display', 'block')
        $('#store_block').css('opacity', 0)
    }

    if (store_block_buttons_display == 'none') {
        $('#store_block_buttons').css('display', 'block')
        $('#store_block_buttons').css('opacity', 0)
    }

    if (no_money_block_display == 'none') {
        $('#no_money_block').css('display', 'block')
        $('#no_money_block').css('opacity', 0)
    }

    if (swb_no_money_block_display == 'none') {
        $('#swb_no_money_block').css('display', 'block')
        $('#swb_no_money_block').css('opacity', 0)
    }

    if (no_moves_block_display == 'none') {
        $('#no_moves_block').css('display', 'block')
        $('#no_moves_block').css('opacity', 0)
    }

    if (no_moves_block_button_display == 'none') {
        $('#no_moves_block_button').css('display', 'block')
        $('#no_moves_block_button').css('opacity', 0)
    }

    if (no_moves_block_button_2_display == 'none') {
        $('#no_moves_block_button_2').css('display', 'block')
        $('#no_moves_block_button_2').css('opacity', 0)
    }

    if (no_moves_block2_display == 'none') {
        $('#no_moves_block2').css('display', 'block')
        $('#no_moves_block2').css('opacity', 0)
    }

    if (no_moves_block2_button_display == 'none') {
        $('#no_moves_block2_button').css('display', 'block')
        $('#no_moves_block2_button').css('opacity', 0)
    }

    if (no_moves_block2_button_2_display == 'none') {
        $('#no_moves_block2_button_2').css('display', 'block')
        $('#no_moves_block2_button_2').css('opacity', 0)
    }

    if (shop_block_display == 'none') {
        $('#shop_block').css('display', 'block')
        $('#shop_block').css('opacity', 0)
    }

    if (shop_warn_block_display == 'none') {
        $('#shop_warn_block').css('display', 'block')
        $('#shop_warn_block').css('opacity', 0)
    }
    
    if (recieved_card_block_display == 'none') {
        $('#recieved_card_block').css('display', 'block')
        $('#recieved_card_block').css('opacity', 0)
    }

    if (gallery_block_display == 'none') {
        $('#gallery_block').css('display', 'block')
        $('#gallery_block').css('opacity', 0)
    }
    
    // растянем определенные блоки на весь экран
    fullscreen('#main_menu_block')
    fullscreen('#levels_menu_block')
    fullscreen('#game_viewport_block')
    fullscreen('#shop_block')

    fullscreen('.background_img')
    fullscreen('.filter_img')
    fullscreen('.filter2_img')

    fullscreen('.filter_ton')

    fullscreen('#gallery_block')


    margin = Math.min(winW, winH) * 0.02

    // Размер фона на главном меню и в игровом окне
    set_size(
        `#levels_menu_block .background_img,
         #levels_menu_block .filter_img,
         #levels_menu_block .filter2_img,
         #game_viewport_block .background_img,
         #game_viewport_block .filter_img,
         #game_viewport_block .filter2_img
        `, 
        winW - margin*2, winH - margin*2)

    // Отступ фона на главном меню и в игровом окне
    set_pos(
        `#levels_menu_block .background_img,
         #levels_menu_block .filter_img,
         #levels_menu_block .filter2_img,
         #game_viewport_block .background_img,
         #game_viewport_block .filter_img,
         #game_viewport_block .filter2_img
        `, 
        margin, margin)

  
    




    // размер больших уголоков
    //$('.big_corner_left, .big_corner_right').attr('width', Math.min(winW, winH)*0.2)
    
    // позиции больших уголков
    //set_pos('.big_corner_left', 'none', winH -  Math.min(winW, winH)*0.2)
    //set_pos('.big_corner_right', winW - Math.min(winW, winH)*0.2, winH - Math.min(winW, winH)*0.2)

    

    
    // настроим чёткость PIXI.js
    $('#render_block').attr('width', (winW)*2)
    $('#render_block').attr('height', (winH)*2)
    app.view.style.width = (winW) + 'px';
    app.view.style.height = (winH) + 'px';
    app.stage.scale.set(2, 2)


    // Разделение на профили в зависимости от пропорций экрана игрока
    if (winW > winH*1.05) {
        profile_1(winW, winH)
         set_pos('#version_info', 'none', winH - 20)
        var flag_size = Math.min(winW / 8, winH / 8)
        set_size('#flag', flag_size, flag_size)
        set_pos('#flag', winW - flag_size, winH - flag_size)
    }  else {
        profile_3(winW, winH)
         set_pos('#version_info', 'none', winH - 20)
        var flag_size = Math.min(winW / 5, winH / 5)
        set_size('#flag', flag_size, flag_size)
        set_pos('#flag', winW - flag_size, winH - flag_size)
    }


    
    if (iOS()) {
        $('.filter2_img').css('display', 'none')
        $('.filter_ton').css('display', 'none')
    }

     //$('.filter2_img').css('display', 'none')
     //$('.filter_ton').css('display', 'none')
    load_levels()
    load_gallery()

    // Сделаем блоки снова невидимыми
    if (main_menu_block_display == 'none') {
        $('#main_menu_block').css('display', 'none')
        $('#main_menu_block').css('opacity', 1)
    }

    if (levels_menu_block_display == 'none') {
        $('#levels_menu_block').css('display', 'none')
        $('#levels_menu_block').css('opacity', 1)
    }

    if (game_viewport_block_display == 'none') {
        $('#game_viewport_block').css('display', 'none')
        $('#game_viewport_block').css('opacity', 1)
    }

    if (level_passed_block_display == 'none') {
        $('#level_passed_block').css('display', 'none')
        $('#level_passed_block').css('opacity', 1)
    }

    if (description_block_display == 'none') {
        $('#description_block').css('display', 'none')
        $('#description_block').css('opacity', 1)
    }

    if (store_block_display == 'none') {
        $('#store_block').css('display', 'none')
        $('#store_block').css('opacity', 1)
    }

    if (store_block_buttons_display == 'none') {
        $('#store_block_buttons').css('display', 'none')
        $('#store_block_buttons').css('opacity', 1)
    }

    if (no_money_block_display == 'none') {
        $('#no_money_block').css('display', 'none')
        $('#no_money_block').css('opacity', 1)
    }

    if (swb_no_money_block_display == 'none') {
        $('#swb_no_money_block').css('display', 'none')
        $('#swb_no_money_block').css('opacity', 1)
    }

    if (no_moves_block_display == 'none') {
        $('#no_moves_block').css('display', 'none')
        $('#no_moves_block').css('opacity', 1)
    }

    if (no_moves_block_button_display == 'none') {
        $('#no_moves_block_button').css('display', 'none')
        $('#no_moves_block_button').css('opacity', 1)
    }

    if (no_moves_block_button_2_display == 'none') {
        $('#no_moves_block_button_2').css('display', 'none')
        $('#no_moves_block_button_2').css('opacity', 1)
    }

    if (no_moves_block2_display == 'none') {
        $('#no_moves_block2').css('display', 'none')
        $('#no_moves_block2').css('opacity', 1)
    }

    if (no_moves_block2_button_display == 'none') {
        $('#no_moves_block2_button').css('display', 'none')
        $('#no_moves_block2_button').css('opacity', 1)
    }

    if (no_moves_block2_button_2_display == 'none') {
        $('#no_moves_block2_button_2').css('display', 'none')
        $('#no_moves_block2_button_2').css('opacity', 1)
    }

    if (shop_block_display == 'none') {
        $('#shop_block').css('display', 'none')
        $('#shop_block').css('opacity', 1)
    }

    if (shop_warn_block_display == 'none') {
        $('#shop_warn_block').css('display', 'none')
        $('#shop_warn_block').css('opacity', 1)
    }

    if (recieved_card_block_display == 'none') {
        $('#recieved_card_block').css('display', 'none')
        $('#recieved_card_block').css('opacity', 1)
    }

    if (gallery_block_display == 'none') {
        $('#gallery_block').css('display', 'none')
        $('#gallery_block').css('opacity', 1)
    }

    
}


//resizeScreen();
window.addEventListener('resize',function() {resizeScreen(); resizeScreen()}, false);
window.addEventListener('fullscreenchange', resizeScreen, false)


resizeScreen();
