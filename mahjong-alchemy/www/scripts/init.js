var show_ad = function() {
  if (performance.now() - last_ad_time >= 30*1000) {
    if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
        console.log('ad started')
        //Howler.volume(0);
         gdsdk.showAd();
         last_ad_time = performance.now()
    }
  }
}


// размер экрана пользователя
var	winW = $(window).width();
var winH = $(window).height();

var selected_1;
var selected_2;

var hint_1;
var hint_2;

var margin_x = 0;
var margin_y = 0;
var cell_size = 50;

var ready_for_game = false
var cur_lvl_score = 0

var free_shuffles = 0
var last_ad_time = performance.now()

var hint_cost = 3
var shuffle_cost = 5

var uncommon_cost = 10
var rare_cost = 20
var epic_cost = 50
var legendary_cost = 100

var player_auth = false

var uncommon_amount = 8
var rare_amount = 5
var epic_amount = 5
var legendary_amount = 5

var money_by_ad = 5

var bying_card_type = 1

var lang ='en'

var user_type = 'pc'

var want_refresh = false

var app = new PIXI.Application({ 
    width: Math.floor(winW)*2,
    height: Math.floor(winH)*2,
    transparent: true
});


app.renderer.autoDensity = true;

app.view.id = 'render_block'
app.view.style['z-index'] = -900;
$('#game_viewport_block').append(app.view)



var texts = {
  "title": {
    "ru": "Маджонг Алхимия",
    "en": "Mahjong Alchemy",
    "tr": "Mahjong Simyası"
  },
  "main_menu_title": {
    "ru": "МаджонГ",
    "en": "Mahjong",
    "tr": "Mahjong "
  },
  "main_menu_title2": {
    "ru": "Алхимия",
    "en": "Alchemy",
    "tr": "Simyası"
  },
  "mm_button_1": {
    "ru": "ИГрать",
    "en": "Play",
    "tr": "Oynamak"
  },
  "mm_button_2": {
    "ru": "об иГре",
    "en": "about game",
    "tr": "oyun hakkında"
  },
  "description_title": {
    "ru": "Об иГре:",
    "en": "About game:",
    "tr": "Oyun hakkında:"
  },
  "description_text": {
    "ru": "Устали от обычной Алхимии? Надоел маджонг?\
        Прикоснитесь к алхимическим карточкам, пронизанных древней магией в антураже чарующего Востока!\
        Окунитесь в атмосферу нескончаемого праздника вместе с Маджонг Алхимия!"
        ,
    "en": `
    Tired of the usual Alchemy? Tired of mahjong?
  Touch the alchemical cards imbued with ancient magic in the entourage of the charming East!
  Immerse yourself in the atmosphere of an endless holiday with Mahjong Alchemy!
    `,
    "tr": `
    Her zamanki Simyadan bıktınız mı? Mahjong'dan bıktınız mı?
Büyüleyici Doğu'nun antik büyüsüyle dolu simya kartlarına dokunun!
Kendinizi Mahjong Simyası ile bitmeyen bir tatil atmosferine bırakın!
    `
  },
  'lm_title': {
    "ru": "Выберите уровень",
    "en": "Choose level",
    "tr": "Seviyeyi seçin"
  },
  "lpb_title_1": {
    "ru": "Уровень пройден!",
    "en": "Level completed!",
    "tr": "Seviye geçti!"
  },
  "lpb_title_2": {
    "ru": "Следующий ход невозможен!",
    "en": "The next move is impossible!",
    "tr": "Bir sonraki hamle mümkün değil!"
  },
  "lpb_score_left": {
    "ru": "Счёт уровня:",
    "en": "Level score:",
    "tr": "Seviye puanı:"
  }, 

  "lpb_fox_text_1": {
    "ru": `
      Это было 
      <br>
      бесподобно! 
      <br>
      Молодец!
    `,
    "en": `
      That was 
      <br>
      amazing! 
      <br>
      Well done!
    `,
    "tr": `
      Bu harikaydı! <br>
      Aferin sana!
    `
  },
  "lpb_fox_text_2": {
    "ru": 'Только не <br>растраивайся!<br> Лови 50 очков!',
    "en": "Just don't get upset!<br> Catch 50 points!",
    "tr": "Sadece üzülme!< br> 50 puan yakala!"
  },
  "sb_title_1": {
    "ru": `
      Хотите получить <br>
      одну подсказку <br>
      за `+hint_cost+` <span class="green_coin"></span> ?
    `,
    "en": `
    Do you want to <br>
    get a hint for <br>
    `+hint_cost+` <span class="green_coin"></span> ?
    `,
    "tr": `
      `+hint_cost+` <span class="green_coin"></span> için bir 
      <br>ipucu almak 
      <br>ister misiniz?
    `
  },
  "sb_title_2": {
    "ru": `
      Хотите перемешать <br>
      за `+shuffle_cost+` <span class="green_coin"></span> ?
    `,
    "en": `
    Do you want to <br>
    shuffle for <br>
    `+shuffle_cost+` <span class="green_coin"></span> ?
    `,
    "tr": `
      Karıştırmak istiyorum <br>
      `+shuffle_cost+` <span class="green_coin"></span> için ?
    `
  },
  "sb_text_1": {
    "ru": `
      Я моГу дать тебе подсказку <br> 
      за просмотр рекламы. Это быстро.
    `,
    "en": `
      I can give you a hint <br>
      for viewing ad. It's fast.
    `,
    "tr": `
      Size bir ipucu verebilirim <br>
      reklamları görüntülemek için. Hızlı.
    `
  },
  "sb_text_2": {
    "ru": "Мне не нужны монеты, если ты посмотришь со мной рекламу.",
    "en": "I don't need coins if you watch an ad with me.",
    "tr": "Benimle reklamı izlersen paraya ihtiyacım yok."
  },
  "balance_left": {
    "ru": "У вас сейчас",
    "en": "You have now",
    "tr": "Şimdi sizde"
  },
  "no_money_block": {
    "ru": "Не хватает монет!",
    "en": "Not enough coins!",
    "tr": "Yeterli para yok!"
  },
  "store_button_1_1": {
    "ru": "Потратить " + hint_cost + " монет",
    "en": "Spend "+hint_cost+" coins",
    "tr": hint_cost+" jeton harcayın"
  },
   "store_button_1_2": {
    "ru": "Потратить " + shuffle_cost + " монет",
    "en": "Spend "+shuffle_cost+" coins",
    "tr": shuffle_cost+" jeton harcayın"
  },
  "store_button_2": {
    "ru": "Посмотреть рекламу",
    "en": "Watch ad",
    "tr": "Reklamı izle"
  },
  "no_moves_block_title": {
    "ru": "Желаете <br> зареГистрироваться?",
    "en": "Would you like <br> to register ?",
    "tr": "Arzu <br> kayıt?"
  },
  "nmb_fox_text": {
    "ru":"Так проГресс будет сохраняться на всех устройствах.",
    "en": "This way the progress will be saved on all devices.",
    "tr": "Böylece ilerleme tüm cihazlarda kaydedilecektir."
  },
  "ok": {
    "ru": "Ок!",
    "en": "Ok!",
    "tr": "Tamam!"
  },
  "later": {
    "ru": "Позже",
    "en": "Later",
    "tr": "Sonra"
  },
  "no_moves_block2_title": {
    "ru": "С возвращением!",
    "en": "Welcome back!",
    "tr": "Tekrar hoş geldiniz!"
  },
  "nmb_fox_text2": {
    "ru": "Вышло обновление! <br> Желаете обновиться?",
    "en": "An update has been released! <br> Would you like to upgrade?",
    "tr": "Bir güncelleştirme yayımlanmıştır. <br> Yükseltmek ister misiniz?"
  },
  "sb_title": {
    "ru": "МаГазин",
    "en": "Shop",
    "tr": "Dükkan"
  },
  "uncommon_block_title": {
    "ru": "необычные",
    "en": "uncommon",
    "tr": "iyiler"
  },
  "rare_block_title": {
    "ru": "редкие",
    "en": "rare",
    "tr": "nadir"
  },
  "epic_block_title": {
    "ru": "эпические",
    "en": "epic",
    "tr": "destansı"
  },
  "legendary_block_title": {
    "ru": "леГендарные",
    "en": "legendary",
    "tr": "efsanevi"
  },
  "gallery_button": {
    "ru": "Галерея",
    "en": "Gallery",
    "tr": "Galeri"
  },
  "swb_title_1": {
    "ru": "Хотите получить <br> 1 необычную карточку?",
    "en": "Do you want to get <br> 1 uncommon card?",
    "tr": "1 Iyiler kart <br> almak ister misiniz?"
  },
  "swb_title_2": {
    "ru": "Хотите получить <br> 1 редкую карточку?",
    "en": "Do you want to get <br> 1 rare card?",
    "tr": "1 Nadir kart <br> almak ister misin?"
  },
  "swb_title_3": {
    "ru": "Хотите получить <br> 1 эпическую карточку?",
    "en": "Do you want to get <br> 1 epic card?",
    "tr": "1 Destansı kart <br> almak ister misin?"
  },
  "swb_title_4": {
    "ru": "Хотите получить <br> 1 леГендарную карточку",
    "en": "Do you want to get <br> 1 legendary card?",
    "tr": "1 Efsanevi kart <br> almak ister misin?"
  },
  "swb_no_money_block": {
    "ru": "Не хватает монет!",
    "en": "Not enough coins!",
    "tr": "Yeterli para yok!"
  },
  "shop_warn_button": {
    "ru": "Купить",
    "en": "Buy",
    "tr": "Almak"
  },
  "rcb_title": {
    "ru": "Новая карточка!",
    "en": "New card!",
    "tr": "Yeni kart"
  }

  
}

var save_progress = function() {
  localStorage.setItem('ma_progress', JSON.stringify(game_data))
   /*y_sdk.getPlayer({ scopes: false }).then(_player => {
        player_auth = true
        player = _player;
        player.setData({
          ma_progress: JSON.stringify(game_data),
      }).then(() => {
          console.log('progress_saved');
      });

  }).catch(err => {
      
  });
  */
}



var last_merging_time = 0
var shuffle_finished = true
var merging_finished = true
var placed_tiles = 0

var cur_map_num = 0;

var isSelected_1 = false;

var music_playing = true;

var margin;

var merge_light_sprite = {"alpha": 0};
var tiles_merged = false

var merge_tile_1;
var merge_tile_2;

var global_tiles = []
var global_dark_tiles = []
var global_tiles_pos = []




var click_sound = new Howl({
  volume: 1.0,
  src: ['./sounds/click_sound.mp3']
})

var merge_sound = new Howl({
  volume: 1.0,
  src: ['./sounds/merge_sound.mp3']
})

var level_complete_sound = new Howl({
  volume: 1.0,
  src: ['./sounds/level_complete_sound.mp3']
})

String.prototype.width = function(font) {
  var f = font || '12px arial',
      o = $('<div></div>')
            .text(this)
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}
PIXI.Sprite.prototype.bringToFront = function() {   
    if (this.parent) {      
        var parent = this.parent;       
        parent.removeChild(this);       
        parent.addChild(this);  
    }
}
PIXI.settings.ROUND_PIXELS = true





var get_available_tiles = function(tiles_pos) {
  // какие плитки можно прямо сейчас извлечь

  var available_pos = []

  for (var i in tiles_pos) {
    var tile_free = true;
    var left_free = true;
    var right_free = true;
    var top_free = true;

    var tile_1 = tiles_pos[i]
    //console.log('tile ', i)
    for (var j in tiles_pos) {
      if (i != j) {
        var tile_2 = tiles_pos[j]
        //console.log('tile_2 ', tiles_pos[j])
        if ( left_collision(tile_1, tile_2) ) {
          left_free = false
        }

        if ( right_collision(tile_1, tile_2) ) {
          right_free = false
        }
        if ( top_collision(tile_1, tile_2) ) {
          top_free = false
        }
        
        

        //console.log(left_free, right_free, top_free)
      }  
    }
    if (top_free == false) {
      tile_free = false
    }
    if (left_free == false && right_free == false) {
      tile_free = false
    }
    if (tile_free) {
      available_pos.push([Number(i), tile_1])
    }
    //console.log('TILE ', tile_1, top_free, left_free, right_free)
  }
  //console.log(available_pos)
  return available_pos
}

var left_collision = function(tile_1, tile_2) {
  if (tile_1[0] - tile_2[0] == 1 && Math.abs(tile_1[1] - tile_2[1]) <= 0.5 && tile_1[2] == tile_2[2]) {
    return true
  }

  return false
}

var right_collision = function(tile_1, tile_2) {
  //console.log(tile_1, tile_2)
  if (tile_1[0] - tile_2[0] == -1 && Math.abs(tile_1[1] - tile_2[1]) <= 0.5 && tile_1[2] == tile_2[2]) {
    //console.log(true)
    return true
  }
  //console.log(false)
  return false
}

var top_collision = function(tile_1, tile_2) {
  if (Math.abs(tile_1[0] - tile_2[0]) <= 0.5 && Math.abs(tile_1[1] - tile_2[1]) <= 0.5 && tile_1[2] - tile_2[2] == -1) {
    return true
  }
  return false
}


var map = [
// бабочка
{
"layers": [
// 1 слой

[
[0, 2.5], [1, 2],
[1, 3], [1, 4],
[1, 7.5], [2, 2.5],
[2, 3.5], [2, 4.5],
[2, 7], [2, 8],
[3, 0], [3, 2.5],
[3, 3.5], [3, 4.5],
[3, 6.5], [3, 7.5],
[4, 1], [4, 3],
[4, 4], [4, 5],
[4, 6], [4, 7],
[5, 2], [5, 3.5],
[5, 4.5], [5, 5.5],
[6, 1], [6, 3],
[6, 4], [6, 5],
[6, 6], [6, 7],
[7, 0], [7, 2.5],
[7, 3.5], [7, 4.5],
[7, 6.5], [7, 7.5],
[8, 2.5], [8, 3.5],
[8, 4.5], [8, 7],
[8, 8], [9, 2],
[9, 3], [9, 4],
[9, 7.5], [10, 2.5],
],

// 2 слой

[
[0, 2],
[1, 2], [1, 3],
[2, 2], [2, 3], [2, 4], [2, 7.5],
[3, 0], [3, 3], [3, 4],
[4, 1], [4, 3.5],
[5, 2], [5, 3], [5, 4], [5, 5],
[6, 1], [6, 3.5],
[7, 0], [7, 3], [7, 4],
[8, 2], [8, 3], [8, 4], [8, 7.5],
[9, 2], [9, 3],
[10, 2],
],

// 3 слой

[
[2, 3], [5, 2], [5, 3.5], [8, 3]
]

],
"size_x": 11,
"size_y": 9,
"tiles": 80,
"name": {
"ru": "Бабочка",
"en": "Butterfly",
"tr": "Kelebek",
},
"icon_src": "images/mini/butterfly.webp",
"id": 0,
},
// паучок
{
"layers": [
// 1 слой

[
[0, 0.5], [0, 3], [0, 6.5],
[1, 0], [1, 2.5], [1, 5.5],
[2, 0], [2, 3], [2, 4], [2, 5], [2, 8], [2, 9],
[3, 0.5], [3, 1.5], [3, 2.5], [3, 5.5], [3, 6.5], [3, 7.5],
[4, 1], [4, 7],
[4.5, 5],
[5, 0.5], [5, 3.5], [5, 7.5],
[5.5, 5.5],
[6, 0.5], [6, 7.5],
[6.5, 5.5],
[7, 0.5], [7, 3.5], [7, 7.5],
[7.5, 5],
[8, 1], [8, 7],
[9, 0.5], [9, 1.5], [9, 2.5], [9, 5.5], [9, 6.5], [9, 7.5],
[10, 0], [10, 3], [10, 4], [10, 5], [10, 8], [10, 9],
[11, 0], [11, 2.5], [11, 5.5],
[12, 0.5], [12, 3], [12, 6.5]
],

// 2 слой

[
[0, 0.5], [0, 3], [0, 6.5],
[1, 0], [1, 2.5], [1, 5.5],
[2, 0], [2, 3], [2, 4], [2, 5], [2, 8], [2, 9],
[3, 0.5], [3, 1.5], [3, 2.5], [3, 5.5], [3, 6.5], [3, 7.5],
[4, 1], [4, 7],
[4.5, 5],
[5, 0.5], [5, 3.5], [5, 7.5],
[5.5, 5.5],
[6, 0.5], [6, 7.5],
[6.5, 5.5],
[7, 0.5], [7, 3.5], [7, 7.5],
[7.5, 5],
[8, 1], [8, 7],
[9, 0.5], [9, 1.5], [9, 2.5], [9, 5.5], [9, 6.5], [9, 7.5],
[10, 0], [10, 3], [10, 4], [10, 5], [10, 8], [10, 9],
[11, 0], [11, 2.5], [11, 5.5],
[12, 0.5], [12, 3], [12, 6.5]
],

// 3 слой

[
[2, 3], [2, 4], [2, 5],
[3, 1.5], [3, 2.5], [3, 5.5], [3, 6.5],
[4, 1], [4, 7],
[4.5, 5],
[5, 0.5], [5, 3.5], [5, 7.5],
[5.5, 5.5],
[6, 0.5], [6, 7.5],
[6.5, 5.5],
[7, 0.5], [7, 3.5], [7, 7.5],
[7.5, 5],
[8, 1], [8, 7],
[9, 1.5], [9, 2.5], [9, 5.5], [9, 6.5],
[10, 3], [10, 4], [10, 5],
]

],
"size_x": 13,
"size_y": 10,
"tiles": 134,
"name": {
"ru": "Паучок",
"en": "Spider",
"tr": "Örümcek"
},
"icon_src": "images/mini/spider.webp",
"id": 1,
},

// иньянь
{
"layers": [
// 1 слой

[
[0, 0], [0, 7],
[1, 2.5], [1, 3.5], [1, 4.5],
[2, 1], [2, 2], [2, 5], [2, 6],
[3, 0.5], [3, 6.5],
[4, 0], [4, 5], [4, 7],
[5, 0], [5, 2.5], [5, 3.5], [5, 7],
[6, 0], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
[7, 0.5], [7, 1.5], [7, 2.5], [7, 4.5], [7, 5.5], [7, 6.5],
[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
[9, 2.5], [9, 3.5], [9, 4.5],
[10, 0], [10, 7]
],

// 2 слой

[
[0, 0], [0, 7],
[1, 2.5], [1, 3.5], [1, 4.5],
[2, 1], [2, 2], [2, 5], [2, 6],
[3, 0.5], [3, 6.5],
[4, 0], [4, 5], [4, 7],
[5, 0], [5, 2.5], [5, 3.5], [5, 7],
[6, 0], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
[7, 0.5], [7, 1.5], [7, 2.5], [7, 4.5], [7, 5.5], [7, 6.5],
[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
[9, 2.5], [9, 3.5], [9, 4.5],
[10, 0], [10, 7]
],

// 3 слой

[
[0, 0], [0, 7],
[10, 0], [10, 7]
]

],
"size_x": 11,
"size_y": 8,
"tiles": 88,
"name": {
"ru": "Инь Янь",
"en": "Yin Yang",
"tr": "Yin Yang"
},
"icon_src": "images/mini/harmony.webp",
"id": 2,
},

// спираль
{
"layers": [
// 1 слой

[
[0, 3.5], [0, 4.5], [0, 5.5],
[1, 2], [1, 3], [1, 6], [1, 7],
[2, 1.5], [2, 4.5], [2, 7.5],
[3, 1], [3, 3], [3, 4], [3, 5], [3, 6], [3, 8],
[4, 0.5], [4, 2.5], [4, 6.5], [4, 8],
[5, 0.5], [5, 2], [5, 4.5], [5, 6.5], [5, 8],
[6, 0.5], [6, 3], [6, 5], [6, 6], [6, 8],
[7, 1], [7, 3.5], [7, 7.5],
[8, 1.5], [8, 4], [8, 5], [8, 6], [8, 7],
[9, 2], [9, 5], [9, 6],
[10, 3],
],

// 2 слой


[
[0, 3.5], [0, 4.5], [0, 5.5],
[1, 2], [1, 3], [1, 6], [1, 7],
[2, 1.5], [2, 4.5], [2, 7.5],
[3, 1], [3, 3], [3, 4], [3, 5], [3, 6], [3, 8],
[4, 0.5], [4, 2.5], [4, 6.5], [4, 8],
[5, 2], [5, 4.5], [5, 6.5], [5, 8],
[6, 3], [6, 5], [6, 6], [6, 8],
[7, 3.5], [7, 7.5],
[8, 4], [8, 5], [8, 6], [8, 7],
[9, 5], [9, 6],
],

// 3 слой

[
[1, 6], [1, 7],
[2, 4.5], [2, 7.5],
[3, 3], [3, 4], [3, 5], [3, 6], [3, 8],
[4, 2.5], [4, 6.5], [4, 8],
[5, 2], [5, 4.5], [5, 6.5], [5, 8],
[6, 3], [6, 5], [6, 6], [6, 8],
[7, 3.5], [7, 7.5],
[8, 4], [8, 5], [8, 6], [8, 7],
[9, 5], [9, 6],
],

// 4 слой


[
[2, 4.5],
[3, 3], [3, 4], [3, 5], [3, 6],
[4, 2.5], [4, 6.5],
[5, 2], [5, 4.5], [5, 6.5],
[6, 5], [6, 6],
],

],
"size_x": 11,
"size_y": 9,
"tiles": 118,
"name": {
"ru": "Спираль",
"en": "Helix",
"tr": "Spiral"
},
"icon_src": "images/mini/helix.webp",
"id": 3,
},

// импостер
{
"layers": [
// 1 слой

[
[0, 4], [0, 5], [0, 6],
[1, 2.5], [1, 6],
[2, 1.5], [2, 2.5], [2, 3.5], [2, 4.5], [2, 5.5], [2, 6.5], [2, 7.5], [2, 8.5],
[3, 1], [3, 9],
[4, 0.5], [4, 2.5], [4, 3.5], [4, 7.5], [4, 8.5],
[5, 0.5], [5, 2], [5, 4], [5, 6.5],
[6, 0.5], [6, 2], [6, 4], [6, 6.5], [6, 7.5], [6, 8.5],
[7, 1], [7, 2], [7, 4], [7, 8.5],
[8, 2], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],
[9, 2.5], [9, 3.5],
],

// 2 слой


[
[0, 4], [0, 5], [0, 6],
[1, 2.5], [1, 6],
[2, 1.5], [2, 2.5], [2, 3.5], [2, 4.5], [2, 5.5], [2, 6.5], [2, 7.5], [2, 8.5],
[3, 1], [3, 9],
[4, 0.5], [4, 2.5], [4, 3.5], [4, 7.5], [4, 8.5],
[5, 0.5], [5, 2], [5, 4], [5, 6.5],
[6, 0.5], [6, 2], [6, 4], [6, 6.5], [6, 7.5], [6, 8.5],
[7, 1], [7, 2], [7, 4], [7, 8.5],
[8, 2], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],
[9, 2.5], [9, 3.5],
],

// 3 слой

[
[0, 4], [0, 5], [0, 6],
[1, 2.5], [1, 6],
[2, 1.5], [2, 2.5], [2, 3.5], [2, 4.5], [2, 5.5], [2, 6.5], [2, 7.5], [2, 8.5],
[3, 1], [3, 9],
[4, 0.5], [4, 2.5], [4, 3.5], [4, 7.5], [4, 8.5],
[5, 0.5], [5, 2], [5, 4], [5, 6.5],
[6, 0.5], [6, 2], [6, 4], [6, 6.5], [6, 7.5], [6, 8.5],
[7, 1], [7, 2], [7, 4], [7, 8.5],
[8, 2], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],
[9, 2.5], [9, 3.5],
],

// 4 слой

[
[0, 4], [0, 5], [0, 6],
[1, 2.5], [1, 6],
[2, 1.5], [2, 2.5], [2, 3.5], [2, 4.5], [2, 5.5], [2, 6.5], [2, 7.5], [2, 8.5],
[3, 1], [3, 9],
[4, 0.5], [4, 2.5], [4, 3.5], [4, 7.5], [4, 8.5],
[5, 0.5], [5, 2], [5, 4], [5, 6.5],
[6, 0.5], [6, 2], [6, 4], [6, 6.5], [6, 7.5], [6, 8.5],
[7, 1], [7, 2], [7, 4], [7, 8.5],
[8, 2], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],
[9, 2.5], [9, 3.5],
],

],
"size_x": 10,
"size_y": 10,
"tiles": 168,
"name": {
"ru": "Импостер",
"en": "Imposter",
"tr": "İmposter"
},
"icon_src": "images/mini/imposter.webp",
"id": 4,
},

// хаос
{
"layers": [
// 1 слой

[
[0, 5], [0, 6],
[1, 2], [1, 3], [1, 7], [1, 8],
[2, 1.5], [2, 4], [2, 5], [2, 9],
[3, 3], [3, 6], [3, 7],
[4, 2], [4, 4], [4, 5], [4, 8],
[5, 0], [5, 2], [5, 6], [5, 8.5],
[6, 2], [6, 4], [6, 6.5], [6, 9],
[7, 0], [7, 3], [7, 5], [7, 7], [7, 8],
[8, 0.5], [8, 4.5], [8, 6.5],
[9, 2], [9, 7], [9, 9],
[10, 1], [10, 3], [10, 5], [10, 8],
[11, 1.5], [11, 4], [11, 6], [11, 7],
],

// 2 слой

[
[0, 5], [0, 6],
[1, 2], [1, 3], [1, 7], [1, 8],
[2, 1.5], [2, 4], [2, 5], [2, 9],
[3, 3], [3, 6], [3, 7],
[4, 2], [4, 4], [4, 5], [4, 8],
[5, 0], [5, 2], [5, 6], [5, 8.5],
[6, 2], [6, 4], [6, 6.5], [6, 9],
[7, 0], [7, 3], [7, 5], [7, 7], [7, 8],
[8, 0.5], [8, 4.5], [8, 6.5],
[9, 2], [9, 7], [9, 9],
[10, 1], [10, 3], [10, 5], [10, 8],
[11, 1.5], [11, 4], [11, 6], [11, 7],
],

// 3 слой

[
[0, 5], [0, 6],
[1, 2], [1, 3], [1, 7], [1, 8],
[2, 1.5], [2, 4], [2, 5], [2, 9],
[3, 3], [3, 6], [3, 7],
[4, 2], [4, 4], [4, 5], [4, 8],
[5, 0], [5, 2], [5, 6], [5, 8.5],
[6, 2], [6, 4], [6, 6.5], [6, 9],
[7, 0], [7, 3], [7, 5], [7, 7], [7, 8],
[8, 0.5], [8, 4.5], [8, 6.5],
[9, 2], [9, 7], [9, 9],
[10, 1], [10, 3], [10, 5], [10, 8],
[11, 1.5], [11, 4], [11, 6],
[11, 7],
],

// 4 слой

[
[0, 5], [0, 6],
[1, 2], [1, 3], [1, 7], [1,
8],
[2, 1.5], [2, 4], [2, 5], [2, 9],
[3, 3], [3, 6], [3, 7],
[4, 2], [4, 4], [4, 5], [4, 8],
[5, 0], [5, 2], [5, 6], [5, 8.5],
[6, 2], [6, 4], [6, 6.5], [6, 9],
[7, 0], [7, 3], [7, 5], [7, 7], [7, 8],
[8, 0.5], [8, 4.5], [8, 6.5],
[9, 2], [9, 7], [9, 9],
[10, 1], [10, 3], [10, 5], [10, 8],
[11, 1.5], [11, 4], [11, 6], [11, 7],
],

],
"size_x": 12,
"size_y": 10,
"tiles": 176,
"name": {
"ru": "Хаос",
"en": "Chaos",
"tr": "Kaos"
},
"icon_src": "images/mini/chaos.webp",
"id": 5,
},
// пирамида
{
"layers": [
// 1 слой

[
[0, 0], [0, 3], [0, 4], [0, 7],
[1, 0], [1, 2], [1, 3], [1, 4], [1, 5], [1, 7],
[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],

[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],

[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],

[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],

[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],

[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],

[8, 0], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7],
[9, 0], [9, 3], [9, 4], [9, 7]
],

// 2 слой

[
[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
[3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
[4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
[5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]
],

// 3 слой

[
[3, 2], [3, 3], [3, 4], [3, 5],
[4, 2], [4, 3], [4, 4], [4, 5],
[5, 2], [5, 3], [5, 4], [5, 5],
[6, 2], [6, 3], [6, 4], [6, 5]
],

// 4 слой

[
[4, 3], [4, 4],
[5, 3], [5, 4]
]


],
"size_x": 10,
"size_y": 9,
"tiles": 124,
"name": {
"ru": "Пирамида",
"en": "Pyramid",
"tr": "Piramit"
},
"icon_src": "images/mini/pyramid.webp",
"id": 6,
},
// талисман удачи
{
"layers": [
// 1 слой

[
[0, 2],
[1, 1], [1, 3],
[2, 0], [2, 1], [2, 3], [2, 4],
[3, 0], [3, 1], [3, 3], [3, 4],
[4, 1], [4, 3],
[5, 2]
],

// 2 слой

[
[0, 2],
[1.5, 1], [1.5, 3],
[2.5, 1], [2.5, 3],
[3.5, 1], [3.5, 3],
[5, 2]
]

],
"size_x": 6,
"size_y": 5,
"tiles": 22,

"name": {
"ru": "Талисман удачи",
"en": "Good luck talisman",
"tr": "Şans tılsımı",
},
"icon_src": "images/mini/good luck talisman.webp",
"id": 7,
},
// журавль
{
"layers": [
// 1 слой

[
[0, 0],
[1, 0], [1, 1],
[1.5, 3], [1.5, 4],
[2, 2],
[2.5, 4], [2.5, 5], [2.5, 6],
[3, 2],
[3.5, 3],
[4, 2],
[5, 3],
[6, 3.5]
],

// 2 слой

[
[0, 0],
[1, 0], [1, 1],
[1.5, 3], [1.5, 4],
[2, 2],
[2.5, 4], [2.5, 5], [2.5, 6],
[3, 2],
[3.5, 3],
[4, 2],
[5, 3],
[6, 3.5]
]

],
"size_x": 7,
"size_y": 7,
"tiles": 28,
"name": {
"ru": "Журавль",
"en": "Crane",
"tr": "Turna"
},
"icon_src": "images/mini/crane.webp",
"id": 8,
},
// оГонь
{
"layers": [
// 1 слой

[
[0, 2.5], [0, 4.5],
[0.5, 3.5], [0.5, 5.5],
[1.5, 0], [1.5, 6.5],
[2, 4.5], [2, 5.5],
[2.5, 1], [2.5, 7],
[3, 2], [3, 3], [3, 4], [3, 5.5],
[3.5, 6.5],
[4.5, 5], [4.5, 6],
[5, 4]
],

// 2 слой

[
[0, 2.5], [0, 4.5],
[0.5, 3.5], [0.5, 5.5],
[1.5, 0], [1.5, 6.5],
[2, 4.5], [2, 5.5],
[2.5, 1], [2.5, 7],
[3, 2], [3, 3], [3, 4], [3, 5.5],
[3.5, 6.5],
[4.5, 5], [4.5, 6],
[5, 4]
]

],
"size_x": 6,
"size_y": 8,
"tiles": 36,
"name": {
"ru": "ОГонь",
"en": "Fire",
"tr": "Ateş"
},
"icon_src": "images/mini/fire.webp",
"id": 9,
},
// дерево
{
"layers": [
// 1 слой

[
[0, 0.5], [0, 2.5], [0, 3.5],
[0.5, 4.5],
[1, 1],
[1.5, 2], [1.5, 3], [1.5, 4],
[2.5, 5], [2.5, 6],
[3.5, 2], [3.5, 3], [3.5, 4],
[4, 1],
[4.5, 4.5],
[5, 0.5], [5, 2.5], [5, 3.5]
],

// 2 слой

[
[0, 0.5], [0, 2.5], [0, 3.5],
[0.5, 4.5],
[1, 1],
[1.5, 2], [1.5, 3], [1.5, 4],
[2.5, 5], [2.5, 6],
[3.5, 2], [3.5, 3], [3.5, 4],
[4, 1],
[4.5, 4.5],
[5, 0.5], [5, 2.5], [5, 3.5]
],

],
"size_x": 6,
"size_y": 7,
"tiles":
36,
"name": {
"ru": "Дерево",
"en": "Tree",
"tr": "Ağaç"
},
"icon_src": "images/mini/tree.webp",
"id": 10,
},
// тории
{
"layers": [
// 1 слой

[
[0, 0],
[0.5, 2.5],
[1, 0.5],
[1.5, 2.5], [1.5, 3.5], [1.5, 4.5],
[2, 0.5],
[2.5, 1.5],
[3, 0.5], [3, 3.5],
[3.5, 1.5],
[4, 0.5],
[4.5, 2.5], [4.5, 3.5], [4.5, 4.5],
[5, 0.5],
[5.5, 2.5],
[6, 0]
],

// 2 слой

[
[0.5, 2.5],
[1, 0.5],
[1.5, 3.5], [1.5, 4.5],
[2, 0.5],
[2.5, 1.5],
[3, 0.5], [3, 3.5],
[3.5, 1.5],
[4, 0.5],
[4.5, 3.5], [4.5, 4.5],
[5, 0.5],
[5.5, 2.5]
]

],
"size_x": 7,
"size_y": 6,
"tiles": 32,
"name": {
"ru": "Тории",
"en": "Torii",
"tr":
"Toryumlar"
},
"icon_src": "images/mini/torii.webp",
"id": 11,
},

// ляГушка
{
"layers": [
// 1 слой

[
[0, 2],
[1, 0], [1, 2], [1, 3], [1, 4],
[2, 1], [2, 3],
[3, 1], [3, 3],
[4, 0], [4, 2], [4, 3], [4, 4],
[5, 2]
],

// 2 слой

[
[0, 2],
[1, 0], [1, 2], [1, 3], [1, 4],
[2, 1], [2, 3],
[3, 1], [3, 3],
[4, 0], [4, 2], [4, 3], [4, 4],
[5, 2]
]

],
"size_x": 6,
"size_y": 5,
"tiles": 28,
"name": {
"ru": "ЛяГушка",
"en": "Frog",
"tr": "Kurbağa"
},
"icon_src": "images/mini/frog.webp",
"id": 12,
},

// зомби бежит
{
"layers": [
// 1 слой

[
[0, 3], [0, 4],
[1, 1], [1, 4],
[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
[3, 2], [3, 5],
[4, 2], [4, 3]
],

// 2 слой


[
[0, 3], [0, 4],
[1, 1], [1, 4],
[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
[3, 2], [3, 5],
[4, 2], [4, 3]

]

],
"size_x": 5,
"size_y": 6,
"tiles": 28,
"name": {
"ru": "Зомби бежит",
"en": "Running zombie",
"tr": "Koşan zombi"
},
"icon_src": "images/mini/zombie.webp",
"id": 13,
},
// фрукт ниндзя
{
"layers": [
// 1 слой

[
[0, 1], [0, 2], [0, 3],
[1, 0], [1, 4],
[3, 0], [3, 4],
[4, 1], [4, 2], [4, 3]
],

// 2 слой

[
[0, 1], [0, 2], [0, 3],
[4, 1], [4, 2], [4, 3]
],

// 3 слой

[
[0, 2],
[4, 2]
]


],
"size_x": 5,
"size_y": 5,
"tiles": 18,
"name": {
"ru": "Фрукт ниндзя",
"en": "Fruit Ninja",
"tr": "Meyveli ninja"
},
"icon_src": "images/mini/fruit ninja.webp",
"id": 14,
},

// сокровище
{
"layers": [
// 1 слой

[
[0, 1.5],
[1, 1], [1, 2],
[2, 0], [2, 1], [2, 2], [2, 3],
[3, 0], [3, 1], [3, 2], [3, 3],
[4, 1], [4, 2],
[5, 1.5]
],

// 2 слой

[
[1, 1], [1, 2],
[2, 1], [2, 2],
[3, 1], [3, 2],
[4, 1], [4, 2]
],

// 3 слой

[
[1.5, 1.5],
[2.5, 0], [2.5, 3],
[3.5, 1.5]
]

],
"size_x": 6,
"size_y": 4,
"tiles": 26,
"name": {
"ru": "Сокровище",
"en": "Treasure",
"tr": "Hazine"
},
"icon_src": "images/mini/treasure.webp",
"id": 15,
},

// литера
{
"layers": [
// 1 слой

[
[0, 3],
[1, 2],
[2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
[3, 3],
[4, 2], [4, 3], [4, 4],
[5, 4]
],

// 2 слой

[
[2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
[4, 2], [4, 3], [4, 4]
]


],
"size_x": 6,
"size_y": 5,
"tiles": 20,
"name": {
"ru": "Литера",
"en": "Litera",
"tr": "Litera"
},
"icon_src": "images/mini/litera.webp",
"id": 16,
}


]

// Проверка сенсорноГо экрана
function isTouchDeviceCheck() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

// Добавляем класс к body в зависимости от типа экрана
if (isTouchDeviceCheck()) {
  document.body.classList.add("touch-device");
} else {
  document.body.classList.add("pointer-device");
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}