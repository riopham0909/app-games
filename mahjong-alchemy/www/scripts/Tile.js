var Tile = function(id, type, x, y, size, add_to_stage = true, real_tile = true) {
	var main_obj = this;
	this.id = id;
	// координаты центра плитки
	this.x = x
	this.y = y
	this.type = type;
	this.target_x = 0;
	this.target_y = 0;
	this.target2_x = 0;
	this.target2_y = 0;
	this.real_tile = real_tile
	this.destroyed = false
	this.free = true
	this.stopped_animation = false
	this.special_anim = false
	this.old_dist = 0;
	this.flag = 0

	this.set_target = function(tx, ty, special = false) {
		this.target_x = tx
		this.target_y = ty 
		var dist = Math.sqrt(Math.pow(this.x - this.target_x, 2) + Math.pow(this.y - this.target_y, 2))
		this.special_anim = special
		this.old_dist = dist
		this.stopped_animation = false
	}

	this.set_target2 = function(tx, ty) {
		this.target2_x = tx
		this.target2_y = ty 
	}

	this.move = function() {
		if (this.special_anim == false) {


			var dist = Math.sqrt(Math.pow(this.x - this.target_x, 2) + Math.pow(this.y - this.target_y, 2))

			if (dist > 0.2) {
				var angle = Math.atan2(-this.y + this.target_y, -this.x + this.target_x)

				this.x += Math.cos(angle) * dist/10/10
				this.y += Math.sin(angle) * dist/10/10

				this.pixi_sprite.x += Math.cos(angle)*dist/10/10
				this.pixi_sprite.y += Math.sin(angle)*dist/10/10
			} else {
				if (this.stopped_animation == false) {
					this.stopped_animation = true
					placed_tiles += 1

					//this.x = this.target_x- this.width;
					//this.y = this.target_y - this.height;
					//this.pixi_sprite.x = this.target_x - this.width;
					//this.pixi_sprite.y = this.target_y - this.height;
				}
				
			}
		} else {
			if (this.flag == 0) {
				var dist = Math.sqrt(Math.pow(this.pixi_sprite.x - this.target2_x, 2) + Math.pow(this.pixi_sprite.y - this.target2_y, 2))
				if (dist > 0.2) {
					var angle = Math.atan2(-this.pixi_sprite.y + this.target2_y, -this.pixi_sprite.x + this.target2_x)

					var dx = Math.cos(angle) * Math.pow(dist, 0.5)/1.5/10
					var dy = Math.sin(angle) * Math.pow(dist, 0.5)/1.5/10

					this.x += dx
					this.pixi_sprite.x += dx
					this.y += dy
					this.pixi_sprite.y += dy
				} else {
					this.flag = 1
				}
			} else {

				var dist = Math.sqrt(Math.pow(this.x - this.target_x, 2) + Math.pow(this.y - this.target_y, 2))
				//console.log(this.old_dist, dist)
				//console.log(dist)
				if (dist > 2) {
					var angle = Math.atan2(-this.y + this.target_y, -this.x + this.target_x)


					
					if (this.flag == 0) {
						var dx = Math.cos(angle) * 3
						var dy = Math.sin(angle) * 3

						this.x -= dx
						this.pixi_sprite.x -= dx
						this.y -= dy
						this.pixi_sprite.y -= dy
					} else if (this.flag == 1) {
						var dx = Math.cos(angle) * Math.pow(dist, 0.0)/1
						var dy = Math.sin(angle) * Math.pow(dist, 0.0)/1
						if (dist < cell_size/2) {
							dx = Math.cos(angle) * Math.pow(dist, 0.0)*3
							dy = Math.sin(angle) * Math.pow(dist, 0.0)*3
						}
						

						this.x += dx
						this.pixi_sprite.x += dx
						this.y += dy
						this.pixi_sprite.y += dy
					}
					
					
					
				} else {
					tiles_merged = true
					if (this.stopped_animation == false) {
						

						this.stopped_animation = true

						placed_tiles += 1

						//this.x += dx
						//this.y += dy
						//this.pixi_sprite.x += dx
						//this.pixi_sprite.y += dy
					}
					
				}
			}
		}
	}

	this.add_to_stage = function() {
		var texture = new PIXI.Texture(PIXI.Loader.shared.resources[this.type].texture)

		//var texture = PIXI.Texture.from('fire_200.png')
		var sprite = new PIXI.Sprite(texture)

		var zoom = size/235
		if (user_type == 'mobile') {
			zoom = size/235
		}

		zoom = Math.min(zoom, 1)

		this.width = texture.width*zoom
		this.height = texture.height*zoom
		
		sprite.scale.set(zoom, zoom)

		

		this.x = x 
		this.y = y 



		sprite.x = x - this.width/2;
		sprite.y = y - this.height/2;
		

		this.pixi_sprite = sprite

		this.is_available = function() {
			return this.free
			
			/*var available_tiles = get_available_tiles(global_tiles_pos)
			//console.log(available_tiles, this.id)
			var is_available = false
			for (var i in available_tiles) {
				if (available_tiles[i][1][3] == this.id) {
					is_available = true
				}
			}

			return is_available
			*/
		}

		if (this.real_tile) {
			sprite.interactive = true
			sprite.buttonMode = true
			this.pixi_sprite.addListener('pointerdown', function(e) {
				//app.stage.removeChild(main_obj.pixi_sprite)
				//console.log(isSelected_1, main_obj.is_available())
				if (isSelected_1 == false && main_obj.is_available() && merging_finished) {
					isSelected_1 = true
					selected_1.pixi_sprite.x = main_obj.pixi_sprite.x - main_obj.width/2
					selected_1.pixi_sprite.y = main_obj.pixi_sprite.y - main_obj.height/2
					selected_1.id = main_obj.id;
					selected_1.type = main_obj.type
				} else if (isSelected_1 == true && main_obj.is_available() && merging_finished) {
					//console.log('lol')
					//var available_tiles = get_available_tiles(global_tiles_pos)
					//console.log(selected_1.type, main_obj.type, selected_1.id, main_obj.id)
					if (selected_1.type == main_obj.type && selected_1.id != main_obj.id) {
						// вычислим среднюю позицию между плитками

						var center_x = (selected_1.pixi_sprite.x + main_obj.pixi_sprite.x)/2 + main_obj.width/1.35
						var center_y = (selected_1.pixi_sprite.y + main_obj.pixi_sprite.y)/2 + main_obj.height/1.35

						merge_light_sprite.x = center_x - merge_light_sprite.width/2
						merge_light_sprite.y = center_y - merge_light_sprite.height/2



						//console.log("lol2")
						for (var i in global_tiles) {
							if (global_tiles[i].id == selected_1.id) {
								var angle = Math.atan2(selected_1.pixi_sprite.y - main_obj.pixi_sprite.y, selected_1.pixi_sprite.x - main_obj.pixi_sprite.x)
								//global_tiles[i].destroyed = true
								merge_tile_1 = main_obj
								merge_tile_2 = global_tiles[i]
								if (global_tiles[i].x > main_obj.x) {
									global_tiles[i].set_target2(global_tiles[i].pixi_sprite.x + Math.cos(angle)*cell_size, global_tiles[i].pixi_sprite.y  - Math.sin(angle)*cell_size)
									main_obj.set_target2(main_obj.pixi_sprite.x - Math.cos(angle)*cell_size, main_obj.pixi_sprite.y + Math.sin(angle)*cell_size)
									

									global_tiles[i].set_target(center_x + main_obj.width/2, center_y, true)
									main_obj.set_target(center_x - main_obj.width/2.5, center_y, true)
									
									
									main_obj.pixi_sprite.bringToFront();
									global_tiles[i].pixi_sprite.bringToFront();
									
									
								} else {
									global_tiles[i].set_target2(global_tiles[i].pixi_sprite.x + Math.cos(angle)*cell_size, global_tiles[i].pixi_sprite.y - Math.sin(angle )*cell_size)
									main_obj.set_target2(main_obj.pixi_sprite.x - Math.cos(angle)*cell_size, main_obj.pixi_sprite.y + Math.sin(angle)*cell_size)
									

									global_tiles[i].set_target(center_x - main_obj.width/2, center_y, true)
									main_obj.set_target(center_x + main_obj.width/2.5, center_y, true)
									
									global_tiles[i].pixi_sprite.bringToFront();
									main_obj.pixi_sprite.bringToFront();
									
								}
								

							}
						}
						

						merge_light_sprite.bringToFront()

						//selected_1.destroyed = true
						//main_obj.destroyed = true
						isSelected_1 = false
						selected_1.pixi_sprite.x = -1000
						selected_1.pixi_sprite.y = -1000
						hint_1.pixi_sprite.x = -1000
						hint_1.pixi_sprite.y = -1000

						hint_2.pixi_sprite.x = -1000
						hint_2.pixi_sprite.y = -1000

						// начисляем очки
						var score_gain = Math.max(Math.ceil(10 - (Date.now() - last_merging_time)/1000), 1)
						cur_lvl_score += score_gain
						game_data.money += 1
						save_progress()
						//$('#score_text center').text('Очки: ' + game_data.score)
						$('#score_little_block_value').text(cur_lvl_score)
						$('#money_little_block_value').text(game_data.money)
						$('#balance_money_little_block #money_little_block_value').text(game_data.money)
						last_merging_time = Date.now();

						merging_finished = false

						// уровень пройден!
						if (global_tiles.length == 2) {
							/*y_sdk.feedback.canReview()
						        .then(({ value, reason }) => {
						            if (value) {
						                ysdk.feedback.requestReview()
						                    .then(({ feedbackSent }) => {
						                        console.log(feedbackSent);
						                        ym(85596634,'reachGoal','feedback')
						                    })
						            } else {
						                console.log(reason)
						            }
						        })
						        */
							ym(85596634,'reachGoal','1_level_complete')
							setTimeout(function() {
								level_finished();
								ready_for_game = false
								level_complete_sound.play();
							}, 1500)

							// сохраняем всё
							if (game_data.score < 500 && game_data.score + Math.max(0, cur_lvl_score-game_data.scores[map[cur_map_num].id]) >= 500) {
								ym(85596634,'reachGoal','get_500_points')
							}

							if (game_data.score < 1000 && game_data.score + Math.max(0, cur_lvl_score-game_data.scores[map[cur_map_num].id]) >= 1000) {
								ym(85596634,'reachGoal','get_1000_points')
							}

							if (game_data.score < 2000 && game_data.score + Math.max(0, cur_lvl_score-game_data.scores[map[cur_map_num].id]) >= 2000) {
								ym(85596634,'reachGoal','get_2000_points')
							}

							game_data.score += Math.max(0, cur_lvl_score-game_data.scores[map[cur_map_num].id])

							game_data.scores[map[cur_map_num].id] = Math.max(cur_lvl_score, game_data.scores[map[cur_map_num].id])

							
							$('#score_little_block_value').text(cur_lvl_score)

							
							$('#lpb_score_little_block_value').text(cur_lvl_score)

							
							update_balance();

							save_progress();
							cur_lvl_score = 0
						}

					} else if (selected_1.type != main_obj.type) {
						selected_1.pixi_sprite.x = main_obj.pixi_sprite.x - main_obj.width/2
						selected_1.pixi_sprite.y = main_obj.pixi_sprite.y - main_obj.height/2
						selected_1.id = main_obj.id;
						selected_1.type = main_obj.type
					}
				}
				
		    	
			});
		}
		app.stage.addChild(this.pixi_sprite)



	}	



	if (add_to_stage) {
		this.add_to_stage();
	}
}