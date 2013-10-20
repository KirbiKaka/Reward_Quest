ig.module(
    'game.entities.Fade'
)
.requires(
    'impact.entity',
	'impact.timer'
)
.defines(function(){

EntityFade = ig.Entity.extend({

    size: {x:1, y:1},
    collides: ig.Entity.COLLIDES.NEVER,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	fadeDuration: 1,
	zIndex: 20,
    
    animSheet: new ig.AnimationSheet('media/black.png', 1280, 960),

    init: function(x, y, settings){
        this.parent(x, y, settings);
		this.addAnim('idle', 1, [0]);
		this.anims.idle.alpha = 0;
		this.currentAnim = this.anims.idle;
		this.fadeTimer = new ig.Timer(0);
		this.fading_in = false;
		this.fading_out = false;
    },
    
    update: function(){
        if(this.fading_out){
			var delta = this.fadeTimer.delta();
			if(delta >= 0){
				this.anims.idle.alpha = 1;
				this.fading_out = false;
			}
			else if(delta >= -0.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.95;	
			}
			else if(delta >= -this.fadeDuration / 10){
				this.anims.idle.alpha = 0.9;
			}
			else if(delta >= -1.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.85;	
			}
			else if(delta >= -2*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.8;
			}
			else if(delta >= -2.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.75;	
			}
			else if(delta >= -3*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.7;
			}
			else if(delta >= -3.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.65;	
			}
			else if(delta >= -4*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.6;
			}
			else if(delta >= -4.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.55;	
			}
			else if(delta >= -5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.5;
			}
			else if(delta >= -5.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.45;	
			}
			else if(delta >= -6*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.4;
			}
			else if(delta >= -6.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.35;	
			}
			else if(delta >= -7*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.3;
			}
			else if(delta >= -7.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.25;	
			}
			else if(delta >= -8*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.2;
			}
			else if(delta >= -8.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.15;	
			}
			else if(delta >= -9*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.1;
			}
			else if(delta >= -9.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.05;	
			}
		}
		else if(this.fading_in){
			var delta = this.fadeTimer.delta();
			if(delta >= 0){
				this.anims.idle.alpha = 0;
				this.fading_in = false;
			}
			else if(delta >= -0.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.05;	
			}
			else if(delta >= -1*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.1;
			}
			else if(delta >= -1.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.15;	
			}
			else if(delta >= -2*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.2;
			}
			else if(delta >= -2.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.25;	
			}
			else if(delta >= -3*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.3;
			}
			else if(delta >= -3.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.35;	
			}
			else if(delta >= -4*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.4;
			}
			else if(delta >= -4.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.45;	
			}
			else if(delta >= -5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.5;
			}
			else if(delta >= -5.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.55;	
			}
			else if(delta >= -6*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.6;
			}
			else if(delta >= -6.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.65;	
			}
			else if(delta >= -7*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.7;
			}
			else if(delta >= -7.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.75;	
			}
			else if(delta >= -8*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.8;
			}
			else if(delta >= -8.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.85;	
			}
			else if(delta >= -9*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.9;
			}
			else if(delta >= -9.5*this.fadeDuration / 10){
				this.anims.idle.alpha = 0.95;	
			}
		}
		
        this.parent();
    },
	
	fade_in: function(){
		this.set_black;
		this.fadeTimer.set(this.fadeDuration);
		this.fading_in = true;
		this.fading_out = false;
	},
	
	fade_out: function(){
		this.anims.idle.alpha = 0;
		this.fadeTimer.set(this.fadeDuration);
		this.fading_out = true;
	},
	
	set_black: function(){
		this.anims.idle.alpha = 1;
	}

});

});