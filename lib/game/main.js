ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.timer',
	'impact.sound',
    'game.entities.Player',
	'game.entities.BasicEnemy',
	'game.entities.AirEnemy',
	'game.entities.GroundEnemy',
	'game.entities.Crate',
	'game.entities.Fade',
	'game.entities.Cursor',
	'game.levels.hill2',
	'game.levels.lose',
	'game.levels.start',
	'game.levels.end',
	'game.levels.intro'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gameTime: 180,
	enemySpawnX: 1280,
	enemyBasicY: 190,
	enemyAirY: 80,
	enemyGroundY: 280,
	
	
	init: function() {
		// Bind keys
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'forward');
		
		
        this.loadLevel(LevelStart);
		this.title_cursor = this.getEntitiesByType(EntityTitleCursor);
		this.title_cursor = this.title_cursor[0];
		this.player_is_dead = false;
		
		this.cursor = null;
		
		this.game_started = false;
		this.game_music_started = 0;
		
		//fade out of title
		this.titleTimer = null;
		//fade out of game
		this.gameOverTimer = null;
		//fade out of lose screen to game
		this.gameOverTimer2 = null;
		//fade out of lose screen to title
		this.gameOverTimer3 = null;
		
		this.endingScene = null;
		this.introScene = null;
		
		ig.music.add( 'media/music/Ambler.ogg', 'menu');
		ig.music.add( 'media/music/Cipher.ogg', 'end');
		ig.music.add( 'media/music/Jaunty_Gumption.ogg', 'game');
		ig.music.add( 'media/music/Super_Friendly.ogg', 'intro');
		ig.music.loop = true;
		ig.music.play('menu');
		ig.music.volume = 0.5;
        
	},
	
	createEnemies: function(){
		this.enemyTimer = new ig.Timer(this.gameTime);
		this.spawnCounter = 0;
		this.timeDelay = this.gameTime;
		this.enemySpawns = new Array();
		//free time to learn to attack
		//practice hitting crates
		this.addEnemySpawn(0.5, 'music');
		this.addEnemySpawn(4.4, 'crate');
		this.addEnemySpawn(3.35, 'crate');
		this.addEnemySpawn(3.3, 'crate');
		//learn hitting separately
		this.addEnemySpawn(4.1, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		
		this.addEnemySpawn(4.0, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		this.addEnemySpawn(0.83, 'crate');
		//first enemy
		this.addEnemySpawn(3.2, 'basic');
		//recovery if made mistake
		this.addEnemySpawn(3.2, 'crate');
		//practice killing enemies
		this.addEnemySpawn(1.95, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		//train timing
		this.addEnemySpawn(1.61, 'basic');
		this.addEnemySpawn(1.65, 'basic');
		this.addEnemySpawn(0.53, 'basic');
		this.addEnemySpawn(1.13, 'basic');
		//kill basic and crate
		this.addEnemySpawn(1.6, 'basic');
		this.addEnemySpawn(1.65, 'crate');
		this.addEnemySpawn(1.65, 'basic');
		this.addEnemySpawn(1.65, 'crate');
		this.addEnemySpawn(1.6, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		this.addEnemySpawn(0.81, 'basic');
		//intro ground with med
		this.addEnemySpawn(2.06, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		//ground basic timing with med
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(1.28, 'basic');
		this.addEnemySpawn(0.88, 'basic');
		this.addEnemySpawn(1.94, 'ground');
		this.addEnemySpawn(1.7, 'ground');
		this.addEnemySpawn(0.5, 'basic');
		//3x rapids of same type
		this.addEnemySpawn(1.5, 'ground');
		this.addEnemySpawn(0.38, 'ground');
		this.addEnemySpawn(0.38, 'ground');
		
		this.addEnemySpawn(1.04, 'basic');
		this.addEnemySpawn(0.38, 'basic');
		this.addEnemySpawn(0.38, 'basic');
		
		this.addEnemySpawn(0.74, 'ground');
		this.addEnemySpawn(0.38, 'ground');
		this.addEnemySpawn(0.38, 'ground');
		
		this.addEnemySpawn(0.94, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		//boss - med, timing, rapids of basic + ground
		this.addEnemySpawn(0.8, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(1, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.7, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.5, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		//first air enemy + successive
		this.addEnemySpawn(2.5, 'basic');
		this.addEnemySpawn(1.6, 'basic');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(2.1, 'air');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'air');
		//practice air and basic
		this.addEnemySpawn(1.3, 'air');
		this.addEnemySpawn(0.41, 'air');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'air');
		this.addEnemySpawn(0.41, 'air');
		this.addEnemySpawn(0.41, 'ground');
		this.addEnemySpawn(0.41, 'ground');
		//practice all 3 directions
		this.addEnemySpawn(1.6, 'air');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'ground');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'air');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'ground');
		this.addEnemySpawn(0.41, 'basic');
		this.addEnemySpawn(0.41, 'air');
		
		this.addEnemySpawn(1.2, 'air');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'air');
		
		this.addEnemySpawn(0.8, 'air');
		this.addEnemySpawn(0.4, 'crate');
		this.addEnemySpawn(0.4, 'air');
		//3x with mixes
		this.addEnemySpawn(1.1, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.85, 'basic');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.6, 'air');
		this.addEnemySpawn(0.42, 'air');
		this.addEnemySpawn(0.42, 'basic');
		this.addEnemySpawn(0.42, 'basic');
		this.addEnemySpawn(0.42, 'ground');
		this.addEnemySpawn(0.42, 'air');
		this.addEnemySpawn(0.42, 'ground');
		//2x rapid chains
		this.addEnemySpawn(1.64, 'air');
		this.addEnemySpawn(0.42, 'air');
		this.addEnemySpawn(0.42, 'ground');
		this.addEnemySpawn(0.42, 'ground');
		this.addEnemySpawn(0.42, 'basic');
		this.addEnemySpawn(0.42, 'air');
		this.addEnemySpawn(0.42, 'basic');
		this.addEnemySpawn(0.42, 'ground');
		this.addEnemySpawn(0.42, 'basic');
		this.addEnemySpawn(0.42, 'ground');
		//overlap
		this.addEnemySpawn(1.055, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(1.5, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.8, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(1.1, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(1.5, 'air');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.6, 'air');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'crate');
		
		this.addEnemySpawn(0.6, 'basic');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(1, 'ground');
		
		this.addEnemySpawn(0.4, 'ground');
		
		this.addEnemySpawn(0.4, 'ground');
		
		this.addEnemySpawn(0.4, 'ground');
		
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.4, 'air');
		
		this.addEnemySpawn(0.4, 'air');
		
		this.addEnemySpawn(0.4, 'air');
		
		this.addEnemySpawn(0.4, 'air');
		
		//final boss? :D
		this.addEnemySpawn(2.4, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.45, 'ground');
		this.addEnemySpawn(0.45, 'ground');
		this.addEnemySpawn(0.43, 'air');
		this.addEnemySpawn(0.43, 'basic');
		this.addEnemySpawn(0.43, 'basic');
		
		this.addEnemySpawn(1.6, 'air');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(1.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(0.43, 'air');
		this.addEnemySpawn(0.43, 'air');
		this.addEnemySpawn(0.43, 'air');
		
		this.addEnemySpawn(0.43, 'air');
		this.addEnemySpawn(0.43, 'crate');
		
		this.addEnemySpawn(1.55, 'basic');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.8, 'air');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(1.1, 'basic');
		
		this.addEnemySpawn(0.43, 'basic');
		this.addEnemySpawn(0.43, 'air');
		
		this.addEnemySpawn(0.9, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(1.3, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.7, 'air');
		this.addEnemySpawn(0.8, 'air');
		
		this.addEnemySpawn(0.65, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(0.9, 'ground');
		
		this.addEnemySpawn(1, 'air');
		
		this.addEnemySpawn(0.8, 'basic');
		
		this.addEnemySpawn(0.9, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'air');
		
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(1.1, 'air');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.4, 'air');
		this.addEnemySpawn(0.4, 'ground');
		
		this.addEnemySpawn(0.5, 'basic');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'basic');
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		this.addEnemySpawn(0.2, 'basic');
		
		this.addEnemySpawn(0.4, 'ground');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.85, 'ground');
		this.addEnemySpawn(0.85, 'basic');
		this.addEnemySpawn(0.85, 'air');
		this.addEnemySpawn(0.85, 'ground');
		
		this.addEnemySpawn(0.8, 'basic');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.6, 'ground');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.6, 'basic');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.4, 'basic');
		this.addEnemySpawn(0.2, 'air');
		this.addEnemySpawn(0.2, 'ground');
		
		this.addEnemySpawn(0.8, 'basic');
		
		this.addEnemySpawn(3, 'fade');
		this.addEnemySpawn(2, 'end');
	},
	
	addEnemySpawn: function(spawnDelay, spawnType){
		this.timeDelay -= spawnDelay;
		this.enemySpawns[this.spawnCounter] = {time: -this.timeDelay, type: spawnType};
		this.spawnCounter++;
	},
	
	update: function() {
		// Update all entities and backgroundMaps
        
		this.parent();
		
		// Add your own, additional update code here
		
		// Spawn Enemies
		if(this.game_started){
			if(this.player_is_dead == false){
				if(this.enemySpawns.length != 0){
					if(this.enemyTimer.delta() >= this.enemySpawns[0].time){
						if(this.enemySpawns[0].type == 'basic'){
							ig.game.spawnEntity(EntityBasicEnemy, this.enemySpawnX, this.enemyBasicY);
						}
						else if(this.enemySpawns[0].type == 'air'){
							ig.game.spawnEntity(EntityAirEnemy, this.enemySpawnX, this.enemyAirY);
						}
						else if(this.enemySpawns[0].type == 'ground'){
							ig.game.spawnEntity(EntityGroundEnemy, this.enemySpawnX, this.enemyGroundY);
						}
						else if(this.enemySpawns[0].type == 'crate'){
							ig.game.spawnEntity(EntityCrate, this.enemySpawnX, this.enemyGroundY);
						}
						else if(this.enemySpawns[0].type == 'music'){
							if(ig.Sound.enabled){
								ig.music.play('game');
							}
						}
						else if(this.enemySpawns[0].type == 'fade'){
							ig.music.fadeOut(1.8);
						}
						else if(this.enemySpawns[0].type == 'end'){
							this.player_is_dead = true;
							this.loadLevel(LevelEnd);
							this.endingScene = this.getEntitiesByType(EntityEndingScene)[0];
						}
						this.enemySpawns.shift();
					}
				}
			}
			else{
				if(this.gameOverTimer != null){
					if(this.gameOverTimer.delta() >= 0){
						this.loadLevel(LevelLose);
						this.gameOverTimer = null;
						this.cursor = this.getEntitiesByType(EntityCursor);
						this.cursor = this.cursor[0];
						if(ig.Sound.enabled){
							ig.music.fadeOut(1);	
						}
					}
				}
				if(this.gameOverTimer2 != null){
					if(this.gameOverTimer2.delta() >= 0){
						this.createEnemies();
						this.loadLevel(LevelHill2);
						this.player = this.getEntitiesByType(EntityPlayer);
						this.player = this.player[0];
						this.player.isAlive = true;
						this.player_is_dead = false;
						this.gameOverTimer2 = null;
						
						var fade = ig.game.spawnEntity(EntityFade, 0, 0);
						fade.set_black();
						fade.fade_in();
					}
				}
				if(this.gameOverTimer3 != null){
					if(this.gameOverTimer3.delta() >= 0){
						this.loadLevel(LevelStart);
						this.title_cursor = this.getEntitiesByType(EntityTitleCursor);
						this.title_cursor = this.title_cursor[0];
						this.game_started = false;
						this.gameOverTimer3 = null;
						if(ig.Sound.enabled){
							ig.music.play('menu');
						}
					}
				}
				//restart the game if you select Try Again
				if(this.cursor != null){
					if(this.cursor.has_selected){
						if(this.cursor.selection == 1){
							var fade = ig.game.spawnEntity(EntityFade, 0, 0);
							fade.fade_out();
							this.gameOverTimer2 = new ig.Timer(fade.fadeDuration);
							this.cursor = null;
						}
						else if(this.cursor.selection == 2){
							var fade = ig.game.spawnEntity(EntityFade, 0, 0);
							fade.fade_out();
							this.gameOverTimer3 = new ig.Timer(fade.fadeDuration);
							this.cursor = null;
						}
					}
				}
				if(this.endingScene != null){
					if(this.endingScene.done){
						this.loadLevel(LevelStart);
						this.title_cursor = this.getEntitiesByType(EntityTitleCursor);
						this.title_cursor = this.title_cursor[0];
						this.game_started = false;
						this.gameOverTimer3 = null;
						this.endingScene = null;
						if(ig.Sound.enabled){
							ig.music.play('menu');
						}
					}
				}
			}
			
			if(this.player.isAlive == false && this.player_is_dead == false){
				var fade = ig.game.spawnEntity( EntityFade, 0, 0);
				fade.fade_out();
				this.player_is_dead = true;
				this.gameOverTimer = new ig.Timer(fade.fadeDuration);	
			}
		}
		else if(this.game_started == false){
			if(this.title_cursor != null){
				if(this.title_cursor.has_selected){
					if(this.title_cursor.selection == 1){
						var fade = ig.game.spawnEntity(EntityFade, 0, 0);
						fade.fade_out();
						this.titleTimer = new ig.Timer(fade.fadeDuration);
						this.title_cursor = null;
						ig.music.fadeOut(0.9);
					}
				}
			}
			if(this.titleTimer != null){
				if(this.titleTimer.delta() >= 0){
						this.loadLevel(LevelIntro);
						this.introScene = this.getEntitiesByType(EntityIntroScene)[0];
						this.titleTimer = null;
				}
			}
			if(this.introScene != null){
				if(this.introScene.done){
					this.introScene = null;
					this.createEnemies();
					this.loadLevel(LevelHill2);
					this.player = this.getEntitiesByType(EntityPlayer);
					this.player = this.player[0];
					this.player_is_dead = false;
					this.game_started = true;
					this.titleTimer = null;
					
					var fade = ig.game.spawnEntity(EntityFade, 0, 0);
					fade.set_black();
					fade.fade_in();
				}
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
	}
});


// Start the Game with 60fps, a resolution of 1280x960, scaled
// up by a factor of 1
ig.main( '#canvas', MyGame, 50, 1280, 960, 1 );

});
