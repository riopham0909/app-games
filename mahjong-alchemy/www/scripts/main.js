window.onload = function() {
	console.log('WINDOW ONLOAD')
	resizeScreen();
    $('#preloader').fadeOut(250)
	$('#main_menu_block').fadeIn(250)	

    game_data = load_progress()

    update_balance()


	//back_music.fade(0, 0.5, 5000);
	//back_music.play();
    set_lang('en')    
  	resizeScreen();
	//Start the game loop 
	app.ticker.add(delta => gameLoop(delta));

    if (gdsdk !== 'undefined' && gdsdk.preloadAd !== 'undefined') {
  gdsdk
    .preloadAd('rewarded')
    .then(response => {
      // A rewarded ad can be shown to user when he/she clicked it.
    })
    .catch(error => {
      // Any Rewarded ad is not available to user.
    });
}
}


function gameLoop(delta) {
    if (music_playing == false) {
        Howler.volume(0);
    }
    if ((performance.now() - last_ad_time > 180*1000)) {
        //y_sdk.adv.showFullscreenAdv()
        last_ad_time = performance.now();
    }
	var i=0
    var really_can_move = false
	while (i < global_tiles.length) {
		if (global_tiles[i].destroyed) {
			app.stage.removeChild(global_tiles[i].pixi_sprite)
			global_tiles.splice(i, 1)
			global_tiles_pos.splice(i, 1)
            recalculate_free_tiles();
			light_free_tiles();

            
            
		}var can_move = check_move()
//console.log(can_move)
            // если нет - перемешаем (попытаемся скажем так:))
            if (can_move) {
                really_can_move = true
            }
		i++;
	}

    //console.log(placed_tiles).

    // посмотрим, есть ли дальше ходы
    
    /*
    if (really_can_move == false && ready_for_game && free_shuffles < 3 && global_tiles.length > 0) {
        var delay = 3000
        if (free_shuffles > 0) {
            delay = 5000
        }
        setTimeout(function() {
            if (really_can_move == false && ready_for_game && global_tiles.length > 0 && free_shuffles < 3) {
                //console.log(ready_for_game, global_tiles.length)
                fail()
                //open_no_moves_block();
            }
        }, delay)            
    }  
    */ 

	i=0

	while (i < global_dark_tiles.length) {
		if (global_dark_tiles[i].destroyed) {
			app.stage.removeChild(global_dark_tiles[i].pixi_sprite)
			global_dark_tiles.splice(i, 1)
			//global_tiles_pos.splice(i, 1)

		}
		i++;
	}

    for (var i in global_tiles) {
        for (var j=0; j < 10; j++) {
            global_tiles[i].move();
        }
    }

    for (var i in global_dark_tiles) {
        for (var j=0; j < 10; j++) {
            global_dark_tiles[i].move();
        }
    }

    if (tiles_merged) {
        //console.log('merged!')
        if ( merge_light_sprite.alpha < 1 ) {
            merge_light_sprite.alpha = Math.min(merge_light_sprite.alpha+0.075, 1)
        } else {
            //console.log('!!!!!')
            tiles_merged = false

            merge_tile_1.destroyed = true
            merge_tile_2.destroyed = true
            merging_finished = true
            merge_sound.play()

        }
    }

    if (tiles_merged == false && merge_light_sprite.alpha > 0) {
        merge_light_sprite.alpha = Math.max(merge_light_sprite.alpha-0.075, 0)
    }

    if (placed_tiles == global_tiles.length + global_dark_tiles.length && placed_tiles > 0) {
        placed_tiles = -1
        light_free_tiles();
        ready_for_game = true
    } 


}

document.addEventListener("visibilitychange", function(){
	if (document.hidden) {
		back_music.mute(true)
		
	} else {
		back_music.mute(false)
	}
});
/*
function invokeServiceWorkerUpdateFlow(registration) {
    // TODO implement your own UI notification element
    console.log("НОВОЕ ОБНОВЛЕНИЕ")
    $('#no_moves_block2').fadeIn(750)
    $('#no_moves_block2_button').fadeIn(750)
    $('#no_moves_block2_button_2').fadeIn(750)
    //notification.show("New version of the app is available. Refresh now?");
    //notification.addEventListener('click', () => {
    $('#no_moves_block2_button').on('click', function() {

        click_sound.play();
        if (registration.waiting) {
            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    })
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('sw.js')

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration)
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time')
                        }
                    }
                })
            }
        })

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })
    })
}
*/