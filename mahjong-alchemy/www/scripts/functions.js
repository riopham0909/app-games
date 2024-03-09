var open_levels_block = function() {
	load_levels();
	$('#main_menu_block').css('display', 'none')
	$('#levels_menu_block').css('display', 'block')
	$('#game_viewport_block').css('display', 'none')
	$("#level_passed_block").css('display', 'none')
	$('#level_passed_block_icons').css('display', 'none')
}

var open_game_block = function(map_num) {
	$('#levels_menu_block').css('display', 'none')
	$("#game_viewport_block").css('display', 'block')
	$('#main_menu_block').css('display', 'none')

	create_map(map_num)
}

var create_map = function(map_num) {
	if (music_playing == false) {
		Howler.volume(0);
	}


	cur_lvl_score = 0
	free_shuffles = 0
	placed_tiles = 0
	shuffle_finished = true
	//close_no_moves_block();
	

	$('#lpb_score_little_block_value').text(cur_lvl_score)

	$('#score_little_block_value').text(0)

	update_balance()

	$("#level_passed_block").css('display', 'none')
	$('#level_passed_block_icons').css('display', 'none')
	app.stage.children = []
	global_tiles = []
	global_dark_tiles = []
	global_tiles_pos = []
	cur_map_num = map_num
	var cur_map = map[map_num]
	if (user_type == 'mobile') {
		cell_size = Math.min((winW-10) / cur_map.size_x, (winH-10) / cur_map.size_y / 1.2)

	} else {
		cell_size = Math.min((winW-10) / cur_map.size_x * 0.85, (winH-10) / cur_map.size_y / 1.2 * 0.9)
	}
	var zoom = cell_size/235 * 1.5

    zoom = Math.min(zoom, 1)
    
    merge_light_sprite.scale.set(zoom, zoom)
	margin_x = (winW - cur_map.size_x * cell_size) / 2 + cell_size/2 + margin + 5
	margin_y = (winH - cur_map.size_y * cell_size * 1.2) / 2 + cell_size*0.6 + margin + 5
	// построим карту
	

	var pairs = get_pairs(cur_map)
	var counter = 0

	while (pairs.fail) {
		pairs = get_pairs(cur_map)
		counter ++;
	}

	//console.log(pairs.pairs)
	//console.log(counter)

	pairs = pairs.pairs

	var tiles = []

	for (var i in pairs) {
		//console.log(pairs[i])
		tiles.push({
			"type": Number(i),
			"x": pairs[i][0][0],
			"y": pairs[i][0][1],
			"z": pairs[i][0][2]
		})

		tiles.push({
			"type": Number(i),
			"x": pairs[i][1][0],
			"y": pairs[i][1][1],
			"z": pairs[i][1][2]
		})
	}

	tiles.sort(function(a,b){
	    if (a.z == b.z) {
	    	if (a.x == b.x) {
	    		return b.y - a.y
	    	}
	    	return a.x - b.x
	    	//return a.date.localeCompare(b.date);
	    
	    } 	
	    return a.z-b.z;    
	});


	var type_keys = []

	for (var i =0; i < pairs.length; i++) {
		type_keys.push(random_element(available_types))
		type_keys.push(type_keys[type_keys.length-1])
	}

	//type_keys.sort();

	
	index = 0
	for (var i in tiles) {

		//console.log(type_keys[tiles[i].type])
		//tiles[i].type = i
		
		var target_x = tiles[i].x*cell_size*0.91 + margin_x - cell_size*0.09*tiles[i].z
		var target_y = tiles[i].y * 1.2 * cell_size*0.91 + margin_y + cell_size*0.09*tiles[i].z

		global_tiles.push( new Tile(global_tiles.length, type_keys[index], target_x, - cell_size/3 * i , cell_size ) )

		global_tiles[global_tiles.length-1].set_target(target_x, target_y)
		
		var dark_target_x = tiles[i].x*cell_size*0.91 + margin_x - cell_size*0.09*tiles[i].z
		var dark_target_y = tiles[i].y * 1.2 * cell_size*0.91 + margin_y + cell_size*0.09*tiles[i].z 

		global_dark_tiles.push( new Tile(global_dark_tiles.length, 'dark_ico', dark_target_x, - cell_size/3 * i , cell_size,  true, false) )		

		global_dark_tiles[global_dark_tiles.length-1].set_target(dark_target_x, dark_target_y)
		
		global_tiles_pos.push([tiles[i].x, tiles[i].y, tiles[i].z, global_tiles.length-1, type_keys[index]])
	
		
		index += 1
	}
	selected_1 = new Tile(1000, 'selected', -100, -100, cell_size, true, false)
	hint_1 = new Tile(1001, 'hint', -100, -100, cell_size, true, false)
	hint_2 = new Tile(1002, 'hint', -100, -100, cell_size, true, false)

	recalculate_free_tiles();
	
	//selected_2 = new Tile('selected', -100, -100, cell_size, true, false)
	//light_free_tiles();
	last_merging_time = Date.now();

	//shuffle(true)
	console.log(global_tiles_pos)

}

var light_free_tiles = function() {
	for (var i in global_tiles) {
		if (global_tiles[i].is_available()) {
			for (var j in global_dark_tiles) {
				if (global_tiles[i].x == global_dark_tiles[j].x && global_tiles[i].y == global_dark_tiles[j].y) {
					global_dark_tiles[j].destroyed = true
				}
			}
		}
	}
}

var check_move = function() {
	var free_pairs = []
	var free_tiles = {}
	

	for (var i in global_tiles) {
		if (global_tiles[i].is_available()) {
			if (global_tiles[i].type in free_tiles) {
				free_tiles[global_tiles[i].type].push(i)
			} else {
				free_tiles[global_tiles[i].type] = [i]
			}
		}
	}

	for (var i in free_tiles) {
		if (free_tiles[i].length > 1) {
			free_pairs.push(free_tiles[i])
		}
	}
	if (free_pairs.length > 0) {
		return true
	}
	return false

}

var show_hint = function(free = false) {
	// проверим достаточно ли монет
	if (free) {
		game_data.money += hint_cost
	}
	if (game_data.money >= hint_cost) {
		if (free == false) {
			ym(85596634,'reachGoal','hint_by_money')
		}
		game_data.money -= hint_cost
		save_progress();
		update_balance()
		close_store();

		var free_pairs = []
		var free_tiles = {}
		

		for (var i in global_tiles) {
			if (global_tiles[i].is_available()) {
				if (global_tiles[i].type in free_tiles) {
					free_tiles[global_tiles[i].type].push(i)
				} else {
					free_tiles[global_tiles[i].type] = [i]
				}
			}
		}

		for (var i in free_tiles) {
			if (free_tiles[i].length > 1) {
				free_pairs.push(free_tiles[i])
			}
		}
		if (free_pairs.length > 0) {


			var cur_pair = get_random_element( free_pairs )

			var el_1 = get_random_element(cur_pair)
			var el_2 = get_random_element(cur_pair)

			hint_1.x = global_tiles[el_1].x - global_tiles[el_1].pixi_sprite.width/2;
			hint_1.y = global_tiles[el_1].y - global_tiles[el_1].pixi_sprite.height/2;

			hint_2.x = global_tiles[el_2].x - global_tiles[el_2].pixi_sprite.width/2;
			hint_2.y = global_tiles[el_2].y - global_tiles[el_2].pixi_sprite.height/2;

			hint_1.pixi_sprite.x = global_tiles[el_1].pixi_sprite.x - global_tiles[el_1].pixi_sprite.width/2;
			hint_1.pixi_sprite.y = global_tiles[el_1].pixi_sprite.y - global_tiles[el_1].pixi_sprite.height/2;

			hint_2.pixi_sprite.x = global_tiles[el_2].pixi_sprite.x - global_tiles[el_2].pixi_sprite.width/2;
			hint_2.pixi_sprite.y = global_tiles[el_2].pixi_sprite.y - global_tiles[el_2].pixi_sprite.height/2;	
		} else {
			// пар нету
			console.log('К сожалению свободных пар нет')
		}
	} else {
		// недостаточно монет(
		$("#no_money_block").fadeIn(750)
		setTimeout(function() {
			$('#no_money_block').fadeOut(500)
		}, 2000)
	}

	//console.log(free_tiles, free_pairs)
}

var shuffle = function(free = false) {
	if (game_data.money >= shuffle_cost || free) {
		if (free == false) {
			ym(85596634,'reachGoal','shuffle_by_money')
			game_data.money -= shuffle_cost
			save_progress();
		} else {
			free_shuffles += 1
			if (free_shuffles == 1) {
				var no_moves_block_display = $('#no_moves_block').css('display')

				if (no_moves_block_display == 'none') {
			        $('#no_moves_block').css('display', 'block')
			        $('#no_moves_block').css('opacity', 0)
			    }

			    $('#nmb_fox_text').text('Как интересно... Я сам перемешаю, и посмотрим что получится')

			    textFit($('#nmb_fox_text'), {multiLine: true})

			    if (no_moves_block_display == 'none') {
			        $('#no_moves_block').css('display', 'none')
			        $('#no_moves_block').css('opacity', 1)
			    }
			} else if (free_shuffles == 2) {
				var no_moves_block_display = $('#no_moves_block').css('display')

				if (no_moves_block_display == 'none') {
			        $('#no_moves_block').css('display', 'block')
			        $('#no_moves_block').css('opacity', 0)
			    }

			    $('#nmb_fox_text').text('Хм... Перемешаем, пожалуй, ещё раз')

			    textFit($('#nmb_fox_text'), {multiLine: true})

			    if (no_moves_block_display == 'none') {
			        $('#no_moves_block').css('display', 'none')
			        $('#no_moves_block').css('opacity', 1)
			    }


			} else if (free_shuffles > 2) {
				shuffle_finished = false
				fail();
				
			} 
		}
		update_balance()
		close_store();
		if (shuffle_finished) {

			shuffle_finished = false
			var cur_map = map[cur_map_num]
			
			var old_types = {}
			var old_pos = {}

			for (var i in global_tiles_pos) {
				var cur_type = global_tiles_pos[i][4]
				//console.log(cur_type)
				if (cur_type in old_types) {
					old_types[cur_type] += 1
					//old_pos
					old_pos[cur_type].push([global_tiles[i].pixi_sprite.x, global_tiles[i].pixi_sprite.y])
				} else {
					old_types[cur_type] = 1
					old_pos[cur_type] = [[global_tiles[i].pixi_sprite.x, global_tiles[i].pixi_sprite.y]]
				}
			}

			var colors = []
			var pos = []

			for (var i in old_types) {
				for (var j=0; j <  old_types[i]/2; j++) {
					colors.push(i)
				}
			}

			

			if (user_type == 'mobile') {
				cell_size = Math.min((winW-10) / cur_map.size_x, (winH-10) / cur_map.size_y / 1.2)

			} else {
				cell_size = Math.min((winW-10) / cur_map.size_x * 0.85, (winH-10) / cur_map.size_y / 1.2 * 0.9)
			}
			
			margin_x = (winW - cur_map.size_x * cell_size) / 2 + cell_size/2 + margin + 5
			margin_y = (winH - cur_map.size_y * cell_size * 1.2) / 2 + cell_size*0.6 + margin + 5
			// построим карту
			var pairs = get_pairs_from_pos( global_tiles_pos, global_tiles_pos.length/2 )
			var counter = 0

			while (pairs.fail && counter < 10) {
				pairs = get_pairs_from_pos( global_tiles_pos, global_tiles_pos.length/2)
				counter ++;
			}

			if (pairs.fail == false) {
				pairs = pairs.pairs
				var tiles = []

				for (var i in pairs) {
					tiles.push({
						"type": Number(i),
						'id': pairs[i][0][3],
						"x": pairs[i][0][0],
						"y": pairs[i][0][1],
						"z": pairs[i][0][2]
					})
					tiles.push({
						"type": Number(i),
						"id": pairs[i][1][3],
						"x": pairs[i][1][0],
						"y": pairs[i][1][1],
						"z": pairs[i][1][2]
					})
				}

				tiles.sort(function(a,b){
				    if (a.z == b.z) {
				    	if (a.x == b.x) {
				    		return b.y - a.y
				    	}
				    	return a.x - b.x
				    	//return a.date.localeCompare(b.date);
				    
				    } 	
				    return a.z-b.z;    
				});
				type_keys = colors

				app.stage.children = []
				global_tiles = []
				global_dark_tiles = []
				global_tiles_pos = []
				
				for (var i in tiles) {
					var old_position = get_random_element(old_pos[type_keys[tiles[i].type]])
					
					var old_x = old_position[0]
					var old_y = old_position[1]

					global_tiles.push( new Tile(global_tiles.length, type_keys[tiles[i].type], old_x, old_y, cell_size  ) )
					global_tiles[global_tiles.length-1].set_target(tiles[i].x*cell_size*0.91 + margin_x - cell_size*0.09*tiles[i].z, tiles[i].y * 1.2 * cell_size*0.91 + margin_y + cell_size*0.09*tiles[i].z)

					global_dark_tiles.push( new Tile(global_dark_tiles.length, 'dark_ico', old_x, old_y, cell_size,  true, false) )
					global_dark_tiles[global_dark_tiles.length-1].set_target(tiles[i].x*cell_size*0.91 + margin_x - cell_size*0.09*tiles[i].z, tiles[i].y * 1.2 * cell_size*0.91 + margin_y + cell_size*0.09*tiles[i].z)

					global_tiles_pos.push([tiles[i].x, tiles[i].y, tiles[i].z, global_tiles.length-1,type_keys[tiles[i].type]])
				}
				
				selected_1 = new Tile(1000, 'selected', -100, -100, cell_size, true, false)
				hint_1 = new Tile(1001, 'hint', -100, -100, cell_size, true, false)
				hint_2 = new Tile(1002, 'hint', -100, -100, cell_size, true, false)
				
				recalculate_free_tiles();
				light_free_tiles();
				shuffle_finished = true
				return {'success': true}
			} else {
				shuffle_finished = true
				console.log('Невозможно перемешать')
				
				ready_for_game = false
				$('#no_moves_block').css('opacity', '0')
				$('#no_moves_block_button').css('opacity', '0')
				setTimeout(function() {
					
					$('#no_moves_block').css('display', 'none')
					$('#no_moves_block_button').css('display', 'none')

					cur_lvl_score += 50
					game_data.score += Math.max(0, cur_lvl_score-game_data.scores[map[cur_map_num].id])
					game_data.scores[map[cur_map_num].id] = Math.max(cur_lvl_score, game_data.scores[map[cur_map_num].id])

					
					$('#score_little_block_value').text(cur_lvl_score)

					
					$('#lpb_score_little_block_value').text(cur_lvl_score)

					update_balance()

					save_progress();
					cur_lvl_score = 0
					
					fail();

				},1500)
				
				return {'success': false}
			}
		}
	} else {
		// недостаточно монет(
		$("#no_money_block").fadeIn(750)
		setTimeout(function() {
			$('#no_money_block').fadeOut(500)
		}, 2000)
	}
}

var get_pairs = function(cur_map) {
	var pairs_num = cur_map.tiles / 2

	var tiles_pos = []
	var pairs = []

	var counter = 0
	var counter_2 = 0

	for (var i in cur_map.layers) {
		for (var j in cur_map.layers[i]) {
			tiles_pos.push([cur_map.layers[i][j][0], cur_map.layers[i][j][1], Number(i)])
		}
	}
	var pairs = []
	var fail = false

	while (pairs.length < pairs_num && fail == false) {
		
		var available_tiles = get_available_tiles(tiles_pos)
		
		if (available_tiles.length > 1 ) {
			available_tiles = get_available_tiles(tiles_pos)
			
			var tile_1 = get_random_element(available_tiles)
			
			tiles_pos.splice(Number(tile_1[0]), 1)

			available_tiles = get_available_tiles(tiles_pos)

			var tile_2 = get_random_element(available_tiles)
			
			tiles_pos.splice(Number(tile_2[0]), 1)

			
			//console.log('tile_1, tile_2', tile_1, tile_2)
			
			pairs.push([tile_1[1], tile_2[1]])
			
		} else {
			fail = true
			break
		}
	}

	return {"fail": fail, "pairs": pairs}
}

var get_pairs_from_pos = function(tiles_pos, pairs_num) {
	var pairs = []
	var fail = false

	var tiles_pos_copy = []

	for (var i in tiles_pos) {
		tiles_pos_copy.push(tiles_pos[i])
	}

	while (pairs.length < pairs_num && fail == false) {
		
		var available_tiles = get_available_tiles(tiles_pos_copy)
		
		if (available_tiles.length > 1 ) {
			available_tiles = get_available_tiles(tiles_pos_copy)
			
			var tile_1 = get_random_element(available_tiles)
			
			tiles_pos_copy.splice(Number(tile_1[0]), 1)

			available_tiles = get_available_tiles(tiles_pos_copy)

			var tile_2 = get_random_element(available_tiles)
			
			tiles_pos_copy.splice(Number(tile_2[0]), 1)

			
			//console.log('tile_1, tile_2', tile_1, tile_2)
			
			pairs.push([tile_1[1], tile_2[1]])
			
		} else {
			fail = true
			break
		}
	}

	return {"fail": fail, "pairs": pairs}
}



var get_random_element = function(arr) {
	return arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
}

var random_element = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

var change_music = function() {
	if (music_playing) {
		back_music.mute(true)
		music_playing = false
		$('#ico_2').attr('id', 'ico_2_off')
		Howler.volume(0);
	} else {
		back_music.mute(false);
		//back_music.volume(0)
    	//back_music.fade(0, 0.5, 3000)
		music_playing = true
		$('#ico_2_off').attr('id', 'ico_2')
		Howler.volume(1);
	}
}

var open_description_block = function() {
	$('#description_block').fadeIn(500)
}

var close_description_block = function() {
	$('#description_block').fadeOut(500)
}

var restart_level = function() {
	$("#level_passed_block").css('display', 'none')
	$('#level_passed_block_icons').css('display', 'none')
	create_map(cur_map_num)

}

var open_next_level = function() {
	$("#level_passed_block").css('display', 'none')
	$('#level_passed_block_icons').css('display', 'none')
	cur_map_num += 1
	create_map(cur_map_num)
	if (music_playing == false) {
		Howler.volume(0);
	}
}

var recalculate_free_tiles = function() {
	for (var j in global_tiles) {			
		global_tiles[j].free = false
	}
	var available_tiles = get_available_tiles(global_tiles_pos)

	for (var i in available_tiles) {
		for (var j in global_tiles) {
			if (available_tiles[i][1][3] == global_tiles[j].id) {
				global_tiles[j].free = true
			}
		}
	}
}

var fail = function(cur_lang=lang) {
	game_ready = false
	// немного изменим дизайн
	// другой заголовок блока
	$('#level_passed_block #text').text(texts.lpb_title_2[cur_lang])

	// размера блока внутреннего текста
    set_size('#level_passed_block #text', get_size('#level_passed_block').x * 0.45, get_size('#level_passed_block').y * 0.25)

    // позиция блока внутреннего текста
    set_pos2('#level_passed_block #text', (get_size('#level_passed_block').x - get_size('#level_passed_block #text').x)/2, get_size('#level_passed_block').y * 0.17)

   	// другой текст лисы
   	$('#fox_text').html(texts.lpb_fox_text_2[cur_lang])
    

    //BigText("#level_passed_block #text");


	$('#level_passed_block').fadeIn(1000)
	$('#level_passed_block_icons').fadeIn(1000)
	// размер шрифта внутреннего текста
	textFit($('#level_passed_block #text'),  {alignHoriz: true, alignVert: true, multiLine: true})
	// размер шрифта диалога
	textFit($('#fox_text'), {alignHoriz: true, multiLine: true})


}

var level_finished = function(cur_lang=lang) {
	// немного изменим дизайн
	// другой заголовок блока
	$('#level_passed_block #text').text(texts.lpb_title_1[cur_lang])

	// размера блока внутреннего текста
    set_size('#level_passed_block #text', get_size('#level_passed_block').x * 0.4, get_size('#level_passed_block').y * 0.15)

    // позиция блока внутреннего текста
    set_pos2('#level_passed_block #text', (get_size('#level_passed_block').x - get_size('#level_passed_block #text').x)/2, get_size('#level_passed_block').y * 0.25)

   	// другой текст лисы
   	$('#fox_text').html(texts.lpb_fox_text_1[cur_lang])
    

    //BigText("#level_passed_block #text");


	$('#level_passed_block').fadeIn(1000)
	$('#level_passed_block_icons').fadeIn(1000)
	// размер шрифта внутреннего текста
	textFit($('#level_passed_block #text'),  {alignHoriz: true, alignVert: true, multiLine: true})
	// размер шрифта диалога
	textFit($('#fox_text'), {alignHoriz: true, multiLine: true})
}

var want_hint = function(cur_lang=lang) {
	$('#store_block_title').html(texts.sb_title_1[cur_lang])

	$('#store_block_fox_text').html(texts.sb_text_1[cur_lang])

	$('#store_button_1').text(texts.store_button_1_1[cur_lang])
	$('#store_button_1').attr('onclick', 'show_hint(); click_sound.play();')
	$('#store_button_2').attr('onclick', 'get_hint_by_videoad(); click_sound.play();')

	$('#store_block').fadeIn(1000)
	$('#store_block_buttons').fadeIn(1000)

	// размер шрифта внутреннего текста
    textFit($('#store_block_title'),  {alignHoriz: true, multiLine: true})

    // размер шрифта речи лисы
    textFit($('#store_block_fox_text'),  {alignHoriz: true, multiLine: true})

	// размер шрифта диалога
    textFit($('#store_block_fox_text'), {alignHoriz: true, multiLine: true})

    // размер спец символа монетки
    set_size('.green_coin', num(noPX($('#store_block_title span').css('font-size')))*1,  num(noPX($('#store_block_title span').css('font-size')))*1)

    // выравним спец символ монетки
    set_pos('#store_block_title .green_coin', 'none', get_size('#store_block_title .green_coin').y * 0.15)

    textFit($('#store_button_1, #store_button_2'), {"alignHoriz": true, multiLine: true})

}

var want_shuffle = function(cur_lang=lang) {
	$('#store_block_title').html(texts.sb_title_2[cur_lang])

	$('#store_block_fox_text').html(texts.sb_text_2[cur_lang])

	$('#store_button_1').text(texts.store_button_1_2[cur_lang])
	$('#store_button_1').attr('onclick', 'shuffle(); click_sound.play();')
	$('#store_button_2').attr('onclick', 'shuffle_by_videoad(); click_sound.play();')

	$('#store_block').fadeIn(1000)
	$('#store_block_buttons').fadeIn(1000)



	// размер шрифта внутреннего текста
    textFit($('#store_block_title'),  {alignHoriz: true, multiLine: true})

    // размер шрифта речи лисы
    textFit($('#store_block_fox_text'),  {alignHoriz: true, multiLine: true})

	// размер шрифта диалога
    textFit($('#store_block_fox_text'), {alignHoriz: true, multiLine: true})

    // размер спец символа монетки
    set_size('.green_coin', num(noPX($('#store_block_title span').css('font-size')))*1,  num(noPX($('#store_block_title span').css('font-size')))*1)

    // выравним спец символ монетки
    set_pos('#store_block_title .green_coin', 'none', get_size('.green_coin').y * 0.15)

    textFit($('#store_button_1, #store_button_2'), {"alignHoriz": true, multiLine: true})


}

var close_store = function() {
	$('#store_block').fadeOut(0)
	$('#store_block_buttons').fadeOut(0)

}



var open_no_moves_block = function() {
	$("#no_moves_block").fadeIn(750)
	$('#no_moves_block_button').fadeIn(750)
	$('#no_moves_block_button_2').fadeIn(750)
}

var close_no_moves_block = function() {
	$("#no_moves_block").fadeOut(750)
	$('#no_moves_block_button').fadeOut(750)
	$('#no_moves_block_button_2').fadeOut(750)
}

var open_update_block = function() {
	$("#no_moves_block2").fadeIn(750)
	$('#no_moves_block2_button').fadeIn(750)
	$('#no_moves_block2_button_2').fadeIn(750)
}

var close_update_block = function() {
	$("#no_moves_block2").fadeOut(750)
	$('#no_moves_block2_button').fadeOut(750)
	$('#no_moves_block2_button_2').fadeOut(750)
}

var change_lang = function() {
	if (lang == 'ru') {
		set_lang('en')
	} else if (lang == 'en') {
		set_lang('tr')
	} else if (lang == 'tr') {
		set_lang('ru')
	}
}


var set_lang = function(cur_lang) {
	lang = cur_lang
	if (cur_lang == 'ru') {
		$('#flag').css('background-image', 'url("images/icons/russia_ico.png")')
	} else if (cur_lang == 'en') {
		$('#flag').css('background-image', 'url("images/icons/usa_ico.png")')
	} else if (cur_lang == 'tr') {
		$('#flag').css('background-image', 'url("images/icons/turkey_ico.png")')
	
	}
	document.title = texts.title[cur_lang]

	$('#main_menu_title').text(texts.main_menu_title[cur_lang])
	$('#main_menu_title2').text(texts.main_menu_title2[cur_lang])

	$("#mm_button_1").text(texts.mm_button_1[cur_lang])	
	$("#mm_button_2").text(texts.mm_button_2[cur_lang])

	$('#description_text #title').text(texts.description_title[cur_lang])
	$('#desc_text_text').empty()
	$('#desc_text_text').text(texts.description_text[cur_lang])

	$('#lm_title center').text(texts.lm_title[cur_lang])

	$('#level_passed_block #text').text(texts.lpb_title_1[cur_lang])

	$('#level_passed_block #score #left').text(texts.lpb_score_left[cur_lang])

	$('#level_passed_block #fox_text').html(texts.lpb_fox_text_1[cur_lang])

	$('#store_block_title').html(texts.sb_title_1[cur_lang])

	$('#store_block_fox_text').html(texts.sb_text_1[cur_lang])

	$('#balance_left').text(texts.balance_left[cur_lang])

	$('#no_money_block').text(texts.no_money_block[cur_lang])

	$('#store_button_1').text(texts.store_button_1_1[cur_lang])

	$('#store_button_2').text(texts.store_button_2[cur_lang])

	$('#no_moves_block_title').html(texts.no_moves_block_title[cur_lang])

	$('#nmb_fox_text').text(texts.nmb_fox_text[cur_lang])

	$('#no_moves_block_button').text(texts.ok[cur_lang])

	$('#no_moves_block_button_2').text(texts.later[cur_lang])

	$('#no_moves_block2_title').text(texts.no_moves_block2_title[cur_lang])

	$('#nmb_fox_text2').html(texts.nmb_fox_text2[cur_lang])

	$('#no_moves_block2_button').text(texts.ok[cur_lang])

	$('#no_moves_block2_button_2').text(texts.later[cur_lang])

	$('#sb_title center').text(texts.sb_title[cur_lang])

	$('#uncommon_block center').text(texts.uncommon_block_title[cur_lang])

	$('#rare_block center').text(texts.rare_block_title[cur_lang])
	
	$('#epic_block center').text(texts.epic_block_title[cur_lang])
	
	$('#legendary_block center').text(texts.legendary_block_title[cur_lang])
	
	$('#gallery_button').text(texts.gallery_button[cur_lang])

	$('#swb_title').html(texts.swb_title_1[cur_lang])

	$('#swb_no_money_block').text(texts.swb_no_money_block[cur_lang])

	$('#shop_warn_button').text(texts.shop_warn_button[cur_lang])

	$('#rcb_title').text(texts.rcb_title[cur_lang])

	$('#gb_title').text(texts.gallery_button[cur_lang])

	$('#uncommon_cards_type').text(texts.uncommon_block_title[cur_lang])
	$('#rare_cards_type').text(texts.rare_block_title[cur_lang])
	$('#epic_cards_type').text(texts.epic_block_title[cur_lang])
	$('#legendary_cards_type').text(texts.legendary_block_title[cur_lang])
	

	resizeScreen();

}

var back_to_menu = function() {
	$('#shop_block').fadeOut(500)
	$('#levels_menu_block').fadeOut(500)
	$('#main_menu_block').fadeIn(500)
}

var open_shop = function() {
	$('#shop_block').fadeIn(500)
	$('#main_menu_block').css('display', 'none')
	$('#levels_menu_block').css('display', 'none')
	$('#game_viewport_block').css('display', 'none')

}

var scroll_shop_left = function() {
	$('#shop_cards_block').animate({
        scrollLeft: $('#shop_cards_block').scrollLeft() - get_size('#shop_cards_block').x
    }, 600);
}

var scroll_shop_right = function() {
	$('#shop_cards_block').animate({
        scrollLeft: $('#shop_cards_block').scrollLeft() + get_size('#shop_cards_block').x
    }, 600);
}

var scroll_gallery_left = function() {
	$('#gallery_all_cards_block').animate({
        scrollLeft: $('#gallery_all_cards_block').scrollLeft() - get_size('#gallery_all_cards_block').x
    }, 600);
}

var scroll_gallery_right = function() {
	$('#gallery_all_cards_block').animate({
        scrollLeft: $('#gallery_all_cards_block').scrollLeft() + get_size('#gallery_all_cards_block').x
    }, 600);
}

var update_balance = function() {
	$('#money_little_block_value').text(game_data.money)
	$('#lpb_money_little_block_value').text(game_data.money)
	$('#balance_money_little_block #money_little_block_value').text(game_data.money)

	$('#lmb_score_little_block_value').text(game_data.score)
	$('#lmb_money_little_block_value').text(game_data.money)

	$('#sb_score_little_block_value').text(game_data.score)
	$('#sb_money_little_block_value').text(game_data.money)

	$('#swb_money_little_block_value').text(game_data.money)
}

var open_shop_warn_block = function(type, cur_lang = lang) {
	bying_card_type = type
	$('#shop_warn_block').fadeIn(750)
	// поставим правильный текст
	if (type == 1) {
		$('#swb_title').html(texts.swb_title_1[cur_lang])
		$('#swb_info_balance_money_little_block .balance_block_value').text(uncommon_cost)
		$('#swb_info_unlocked_balance_money_little_block .balance_block_value').text(game_data.opened_cards[0].length + '/' + uncommon_amount)
		$('#swb_img').css('background-image', 'url("images/new_cards_1.webp")')
	} else if (type == 2) {
		$('#swb_title').html(texts.swb_title_2[cur_lang])
		$('#swb_info_balance_money_little_block .balance_block_value').text(rare_cost)
		$('#swb_info_unlocked_balance_money_little_block .balance_block_value').text(game_data.opened_cards[1].length + '/' + rare_amount)
		$('#swb_img').css('background-image', 'url("images/new_cards_2.webp")')
	
	} else if (type == 3) {
		$('#swb_title').html(texts.swb_title_3[cur_lang])
		$('#swb_info_balance_money_little_block .balance_block_value').text(epic_cost)
		$('#swb_info_unlocked_balance_money_little_block .balance_block_value').text(game_data.opened_cards[2].length + '/' + epic_amount)
		$('#swb_img').css('background-image', 'url("images/new_cards_3.webp")')
	
	} else if (type == 4) {
		$('#swb_title').html(texts.swb_title_4[cur_lang])
		$('#swb_info_balance_money_little_block .balance_block_value').text(legendary_cost)
		$('#swb_info_unlocked_balance_money_little_block .balance_block_value').text(game_data.opened_cards[3].length + '/' + legendary_amount)
		$('#swb_img').css('background-image', 'url("images/new_cards_4.webp")')
	
	}
	
	textFit($('#swb_title'))
}


var close_shop_warn_block = function() {
	$('#shop_warn_block').fadeOut(250)
}

var open_gallery_block = function() {
	$('#shop_block').fadeOut(250)
	$('#gallery_block').fadeIn(750)
}

var back_to_shop = function() {
	$('#gallery_block').fadeOut(750)
	$('#shop_block').fadeIn(750)
}

var buy_card = function(type=bying_card_type, cur_lang = lang) {
	
	if (type == 1 && game_data.opened_cards[0].length < uncommon_amount) {
		if (game_data.money >= uncommon_cost) {
			//ym(85596634,'reachGoal','get_uncommon_card')
			$('#shop_warn_block').css('display', 'none')
			game_data.money -= uncommon_cost
			update_balance()
			available_cards = []
			// посмотрим, какие вообще карточки остались
			for (var i=0; i < uncommon_amount; i++) {
				if (game_data.opened_cards[0].indexOf(i) == -1) {
					available_cards.push(i)
				}
			}
			random_card = get_random_element(available_cards)

			game_data.opened_cards[0].push(random_card)

			$('#rcb_img_2').css('background-image', 'url("images/cards/uncommon/new1_'+(random_card+1)+'.webp")')
			
			available_types.push('uncommon_' + (random_card+1))

			$('#recieved_card_block').fadeIn(750)
			$('#rcb_protector').css('display', 'block')
			
			save_progress()
			load_gallery()
			ym(85596634,'reachGoal','get_uncommon_card')
			PIXI.Loader.shared.add('uncommon_' + (random_card+1), 'images/cards/uncommon/new1_'+(random_card+1)+'.webp')
		} else {
			$("#swb_no_money_block").fadeIn(750)
			setTimeout(function() {
				$('#swb_no_money_block').fadeOut(500)
			}, 2000)
		}

	} else if (type == 2 && game_data.opened_cards[1].length < rare_amount) {
		
		if (game_data.money >= rare_cost) {
			$('#shop_warn_block').css('display', 'none')
			game_data.money -= rare_cost
			update_balance()
			available_cards = []
			// посмотрим, какие вообще карточки остались
			for (var i=0; i < rare_amount; i++) {
				if (game_data.opened_cards[1].indexOf(i) == -1) {
					available_cards.push(i)
				}
			}
			random_card = get_random_element(available_cards)

			game_data.opened_cards[1].push(random_card)

			$('#rcb_img_2').css('background-image', 'url("images/cards/rare/new2_'+(random_card+1)+'.webp")')

			
			available_types.push('rare_' + (random_card+1))

			$('#recieved_card_block').fadeIn(750)
			$('#rcb_protector').css('display', 'block')
			
			save_progress()
			load_gallery()
			ym(85596634,'reachGoal','get_rare_card')
			PIXI.Loader.shared.add('rare_' + (random_card+1), 'images/cards/rare/new2_'+(random_card+1)+'.webp')
		} else {
			$("#swb_no_money_block").fadeIn(750)
			setTimeout(function() {
				$('#swb_no_money_block').fadeOut(500)
			}, 2000)
		}

	} else if (type == 3 && game_data.opened_cards[2].length < epic_amount) {
		if (game_data.money >= epic_cost) {
			
			$('#shop_warn_block').css('display', 'none')
			game_data.money -= epic_cost
			update_balance()
			available_cards = []
			// посмотрим, какие вообще карточки остались
			for (var i=0; i < epic_amount; i++) {
				if (game_data.opened_cards[2].indexOf(i) == -1) {
					available_cards.push(i)
				}
			}
			random_card = get_random_element(available_cards)

			game_data.opened_cards[2].push(random_card)

			$('#rcb_img_2').css('background-image', 'url("images/cards/epic/new3_'+(random_card+1)+'.webp")')
			
			available_types.push('epic_' + (random_card+1))

			$('#rcb_protector').css('display', 'block')
			$('#recieved_card_block').fadeIn(750)
			save_progress()
			load_gallery()
			ym(85596634,'reachGoal','get_epic_card')
			PIXI.Loader.shared.add('epic_' + (random_card+1), 'images/cards/epic/new3_'+(random_card+1)+'.webp')
		} else {
			$("#swb_no_money_block").fadeIn(750)
			setTimeout(function() {
				$('#swb_no_money_block').fadeOut(500)
			}, 2000)
		}

	} else if (type == 4 && game_data.opened_cards[3].length < legendary_amount) {
		if (game_data.money >= legendary_cost) {
			
			$('#shop_warn_block').css('display', 'none')
			game_data.money -= legendary_cost
			update_balance()
			available_cards = []
			// посмотрим, какие вообще карточки остались
			for (var i=0; i < legendary_amount; i++) {
				if (game_data.opened_cards[3].indexOf(i) == -1) {
					available_cards.push(i)
				}
			}
			random_card = get_random_element(available_cards)

			game_data.opened_cards[3].push(random_card)

			$('#rcb_img_2').css('background-image', 'url("images/cards/legendary/new4_'+(random_card+1)+'.webp")')
			
			available_types.push('legendary_' + (random_card+1))

			$('#rcb_protector').css('display', 'block')
			$('#recieved_card_block').fadeIn(750)
			save_progress()
			load_gallery()
			ym(85596634,'reachGoal','get_legendary_card')
			PIXI.Loader.shared.add('legendary_' + (random_card+1), 'images/cards/legendary/new4_'+(random_card+1)+'.webp')
		} else {
			$("#swb_no_money_block").fadeIn(750)
			setTimeout(function() {
				$('#swb_no_money_block').fadeOut(500)
			}, 2000)
		}

	}
	
}



var get_money_by_videoad = function() {
	if (gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
	    gdsdk.showAd('rewarded')
	    .then(response => {
	      // Reward the player here.
	      	console.log('Rewarded!');	
		    game_data.money += money_by_ad 
		    ym(85596634,'reachGoal','money_by_ad')
		    update_balance()
		    save_progress();
	    })
	    .catch(error => {
	      // An error catched. Please don't give reward here.
	    });
	  }
	/*
	y_sdk.adv.showRewardedVideo({
    	callbacks: {
	        onOpen: () => {
	            console.log('Video ad open.');
	        },
	        onRewarded: () => {
	            console.log('Rewarded!');	
	            game_data.money += money_by_ad 
	            ym(85596634,'reachGoal','money_by_ad')
	            update_balance()
	            save_progress();

	        },
	        onClose: () => {
	            console.log('Video ad closed.');
	        }, 
	        onError: (e) => {
	            console.log('Error while open video ad:', e);
	        }
    	}
	})
	*/
	if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
	  gdsdk.preloadAd('rewarded')
	}
}

var get_hint_by_videoad = function() {
	if (gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
	    gdsdk.showAd('rewarded')
	    .then(response => {
	      // Reward the player here.
	      console.log('Rewarded!');	
		            show_hint(true)
		            ym(85596634,'reachGoal','hint_by_ad')
		            update_balance()
		            save_progress();
	    })
	    .catch(error => {
	      // An error catched. Please don't give reward here.
	    });
	  }
	/*
	y_sdk.adv.showRewardedVideo({
    	callbacks: {
	        onOpen: () => {
	            console.log('Video ad open.');
	        },
	        onRewarded: () => {
	            console.log('Rewarded!');	
	            show_hint(true)
	            ym(85596634,'reachGoal','hint_by_ad')
	            update_balance()
	            save_progress();

	        },
	        onClose: () => {
	            console.log('Video ad closed.');
	        }, 
	        onError: (e) => {
	            console.log('Error while open video ad:', e);
	        }
    	}
	})
	*/
	if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
	  gdsdk.preloadAd('rewarded')
	}
}

var shuffle_by_videoad = function() {
	if (gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
    gdsdk.showAd('rewarded')
    .then(response => {
      // Reward the player here.
      console.log('Rewarded!');	
	            shuffle(true)
	             ym(85596634,'reachGoal','shuffle_by_ad')
	            update_balance()
	            save_progress();
    })
    .catch(error => {
      // An error catched. Please don't give reward here.
    });
  }
	/*
	y_sdk.adv.showRewardedVideo({
    	callbacks: {
	        onOpen: () => {
	            console.log('Video ad open.');
	        },
	        onRewarded: () => {
	            console.log('Rewarded!');	
	            shuffle(true)
	             ym(85596634,'reachGoal','shuffle_by_ad')
	            update_balance()
	            save_progress();

	        },
	        onClose: () => {
	            console.log('Video ad closed.');
	        }, 
	        onError: (e) => {
	            console.log('Error while open video ad:', e);
	        }
    	}
	})
	*/
	if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
	  gdsdk.preloadAd('rewarded')
	}
}