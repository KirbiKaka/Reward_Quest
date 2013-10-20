ig.module(
    'game.entities.TitleCursor'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityTitleCursor = ig.Entity.extend({

    size: {x:5, y:5},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	selectionLimit: 2,
    
    animSheet: new ig.AnimationSheet('media/Cursor_Sheet.png', 187.5, 150),

    init: function(x, y, settings){
        this.parent(x, y, settings);
		this.pos.y -= 180;
    
        this.addAnim('idle', 1, [0]);
		this.addAnim('break', 0.1, [1,2,3,4]);
		this.addAnim('post_idle', 1, [5]);
		
		this.currentAnim = this.anims.idle;
		
		this.selection = 2;
		this.has_selected = false;
		
		this.animTimer = null;
		
		//COMMENT OUT TO USE WELTMEISTER
		ig.game.spawnEntity( EntityStart, this.pos.x + 170, this.pos.y + 10);
		this.sound_button = ig.game.spawnEntity( EntitySoundButton, this.pos.x + 220, this.pos.y + 160);
		this.up_down_arrow = ig.game.spawnEntity( EntityUpDownArrow, this.pos.x + 50, this.pos.y + 155);
		
		this.swing_sound = new ig.Sound('media/sounds/Swing.*');
		this.select_sound = new ig.Sound('media/sounds/Heal.*');
		this.move_sound = new ig.Sound('media/sounds/Select.*');
		this.swing_sound.volume = 0.2;
		this.select_sound.volume = 0.5;
		this.move_sound.volume = 0.2;
		
		this.pos.y += 145;
    },
    
    update: function(){
		if(this.has_selected == false){
			if(ig.input.pressed('up')) {		
				if(this.selection > 1){
					this.up_down_arrow.currentAnim = this.up_down_arrow.anims.down;
					this.move_sound.play();
					this.selection--;
					this.pos.y -= 145;
				}
			}
			else if(ig.input.pressed('down')){
				if(this.selection < this.selectionLimit){
					this.up_down_arrow.currentAnim = this.up_down_arrow.anims.up;
					this.move_sound.play();
					this.selection++;
					this.pos.y += 145;
				}
			}
			else if(ig.input.pressed('forward') ) {
				this.currentAnim = this.anims.break;
				this.animTimer = new ig.Timer(0.3);
				if(this.selection == 2){
					if(ig.Sound.enabled){
						ig.Sound.enabled = false;
						ig.music.volume = 0;
						this.sound_button.currentAnim = this.sound_button.anims.off;
					}
					else if(ig.Sound.enabled == false){
						ig.Sound.enabled = true;
						ig.music.volume = 0.5;
						this.swing_sound.play();
						this.select_sound.play();
						this.sound_button.currentAnim = this.sound_button.anims.on;
					}
				}
				else if(this.selection == 1){
					this.swing_sound.play();
					this.select_sound.play();
					this.has_selected = true;
				}
			}
			if(this.animTimer != null && this.animTimer.delta() >= 0){
				this.currentAnim = this.anims.idle;
			}
		}
		else{
			if(this.animTimer != null && this.animTimer.delta() >= 0){
				this.currentAnim = this.anims.post_idle;
				this.animTimer = null;
			}
		}
		
        this.parent();
    },
	
	check: function( other ) {
	}

});

	EntityStart = ig.Entity.extend({
	
		size: {x:20, y:20},
		collides: ig.Entity.COLLIDES.NONE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		animSheet: new ig.AnimationSheet('media/Start.png', 300, 120),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			this.addAnim('idle', 1, [0]);
			
			this.currentAnim = this.anims.idle;
		},
		
		update: function(){
			
			this.parent();
		},
		
		check: function( other ) {
		}

});

	EntitySoundButton = ig.Entity.extend({
	
		size: {x:20, y:20},
		collides: ig.Entity.COLLIDES.NONE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		animSheet: new ig.AnimationSheet('media/Sound_Sheet.png', 200, 80),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			this.addAnim('off', 1, [0]);
			this.addAnim('on', 1, [1]);
			
			if(ig.Sound.enabled){
				this.currentAnim = this.anims.on;
			}
			else if(ig.Sound.enabled == false){
				this.currentAnim = this.anims.off;
			}
			
			
		},
		
		update: function(){
			
			this.parent();
		},
		
		check: function( other ) {
		}

});

	EntityUpDownArrow = ig.Entity.extend({
	
		size: {x:20, y:20},
		collides: ig.Entity.COLLIDES.NONE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		animSheet: new ig.AnimationSheet('media/Up_Down_Arrow.png', 35, 30),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			this.addAnim('up', 1, [0]);
			this.addAnim('down', 1, [1]);
			this.currentAnim = this.anims.up;
			
			
		},
		
		update: function(){
			
			this.parent();
		},
		
		check: function( other ) {
		}
		
});

});