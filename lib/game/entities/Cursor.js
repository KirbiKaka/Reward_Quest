ig.module(
    'game.entities.Cursor'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityCursor = ig.Entity.extend({

    size: {x:5, y:5},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	selectionLimit: 2,
    
    animSheet: new ig.AnimationSheet('media/Cursor_Sheet.png', 187.5, 150),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0]);
		this.addAnim('break', 0.1, [1,2,3,4]);
		this.addAnim('post_idle', 1, [5]);
		
		this.currentAnim = this.anims.idle;
		
		this.selection = 1;
		this.has_selected = false;
		
		this.animTimer = null;
		
		this.swing_sound = new ig.Sound('media/sounds/Swing.*');
		this.select_sound = new ig.Sound('media/sounds/Heal.*');
		this.move_sound = new ig.Sound('media/sounds/Select.*');
		this.swing_sound.volume = 0.2;
		this.select_sound.volume = 0.5;
		this.move_sound.volume = 0.2;
    },
    
    update: function(){
		if(this.has_selected == false){
			if(ig.input.pressed('up')) {		
				if(this.selection > 1){
					this.move_sound.play();
					this.selection--;
					this.pos.y -= 140;
				}
			}
			else if(ig.input.pressed('down')){
				if(this.selection < this.selectionLimit){
					this.move_sound.play();
					this.selection++;
					this.pos.y += 140;
				}
			}
			else if(ig.input.pressed('forward') ) {
				this.swing_sound.play();
				this.select_sound.play();
				this.has_selected = true;
				this.currentAnim = this.anims.break;
				this.animTimer = new ig.Timer(0.3);
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

});