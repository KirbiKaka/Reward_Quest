ig.module(
    'game.entities.EndingScene'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound',
	'game.entities.Fade'
)
.defines(function(){

EntityEndingScene = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NEVER,
    pos: {x:0, y:0},
	zIndex: -10,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
    
    animSheet: new ig.AnimationSheet('media/Ending_Sheet.png', 1280, 960),

    init: function(x, y, settings){
        this.parent(x, y, settings);
		this.addAnim('S1', 1, [0]);
		this.addAnim('S2', 1, [1]);
		this.addAnim('S3', 1, [2]);
		this.addAnim('S4', 1, [3]);
		this.addAnim('S6', 1, [5]);
		this.currentAnim = this.anims.S1;
		
		this.nextTimer = new ig.Timer(5.5);
		this.fadeTimer = null;
		
		this.firstFadeOut = false;
		this.secondFadeOut = false;
		this.thirdFadeOut = false;
		this.fourthFinish = false;
		this.fifthFadeOut = false;
		this.gameFadeOut = false;
		
		this.done = false;
		
		if(ig.Sound.enabled){
			ig.music.play('end');
		}
		
		//COMMENT OUT IF USING WELTMESITER
		this.fade = ig.game.spawnEntity(EntityFade, 0, 0, {fadeDuration: 1});
		this.fade.set_black();
		this.fade.fade_in();
    },
    
    update: function(){
		if(this.nextTimer.delta() >= 0){		
			if(this.currentAnim == this.anims.S1 && this.firstFadeOut == false){
				this.fade.fade_out();
				this.firstFadeOut = true;
				this.fadeTimer = new ig.Timer(1);
				this.nextTimer.set(6.5);
			}
			else if(this.currentAnim == this.anims.S2 && this.secondFadeOut == false){
				this.fade.fadeDuration = 0.5;
				this.fade.fade_out();
				this.secondFadeOut = true;
				this.fadeTimer.set(1);
				this.nextTimer.set(6);
			}
			else if(this.currentAnim == this.anims.S3 && this.thirdFadeOut == false){
				this.fade.fade_out();
				this.thirdFadeOut = true;
				this.fadeTimer.set(1);
				this.nextTimer.set(4);
			}
			else if(this.currentAnim == this.anims.S4 && (this.fourthFinish == false || this.fifthFadeOut == false)){
				if(this.fourthFinish){
					this.fade.kill();
					this.fade = ig.game.spawnEntity(EntityFade, 0, 0, {fadeDuration: 2});
					this.fade.fade_out();
					this.fifthFadeOut = true;
					this.fourthFinish = false;
					this.fadeTimer.set(3);
					this.nextTimer.set(8);
				}
				else if(this.fifthFadeOut == false){
					this.fifthScene = ig.game.spawnEntity( EntityFifth, 0, 0);	
					this.fourthFinish = true;
					this.nextTimer.set(2.5);
				}
			}
			if(ig.input.pressed('forward')) {	
				if(this.currentAnim == this.anims.S6 && this.gameFadeOut == false){
					this.fade.fade_out();
					this.gameFadeOut = true;
					this.fadeTimer.set(5);
					if(ig.Sound.enabled){
						ig.music.fadeOut(3);
					}
				}
			}
		}
		if(this.firstFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S2;
				this.fade.fade_in();
				this.firstFadeOut = false;
			}
		}
		else if(this.secondFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S3;
				this.fade.fade_in();
				this.secondFadeOut = false;
			}
		}
		else if(this.thirdFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S4;
				this.fade.fade_in();
				this.thirdFadeOut = false;	
			}
		}
		else if(this.fifthFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S6;
				this.fade.fade_in();
				this.fifthFadeOut = false;
				this.fifthScene.done = true;
			}
		}
		else if(this.gameFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.done = true;
				this.gameFadeOut = false;
			}
		}
		
		
        this.parent();
    },

});

	EntityFifth = ig.Entity.extend({
	
		size: {x:20, y:20},
		collides: ig.Entity.COLLIDES.NONE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		zIndex: 10,
		
		animSheet: new ig.AnimationSheet('media/Ending_Sheet.png', 1280, 960),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			this.addAnim('S5', 1, [4]);
			
			this.anims.S5.alpha = 0;
			this.currentAnim = this.anims.S5;
			this.fadeTimer = new ig.Timer(0.5);
			this.fadeDuration = 1;
			this.done = false;
		},
		
		update: function(){
			if(this.done){
				this.kill();
			}
			
			var delta = this.fadeTimer.delta();
			if(delta >= 0){
				this.anims.S5.alpha = 1;
			}
			else if(delta >= -0.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.95;	
			}
			else if(delta >= -this.fadeDuration / 10){
				this.anims.S5.alpha = 0.9;
			}
			else if(delta >= -1.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.85;	
			}
			else if(delta >= -2*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.8;
			}
			else if(delta >= -2.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.75;	
			}
			else if(delta >= -3*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.7;
			}
			else if(delta >= -3.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.65;	
			}
			else if(delta >= -4*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.6;
			}
			else if(delta >= -4.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.55;	
			}
			else if(delta >= -5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.5;
			}
			else if(delta >= -5.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.45;	
			}
			else if(delta >= -6*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.4;
			}
			else if(delta >= -6.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.35;	
			}
			else if(delta >= -7*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.3;
			}
			else if(delta >= -7.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.25;	
			}
			else if(delta >= -8*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.2;
			}
			else if(delta >= -8.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.15;	
			}
			else if(delta >= -9*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.1;
			}
			else if(delta >= -9.5*this.fadeDuration / 10){
				this.anims.S5.alpha = 0.05;	
			}
			
			this.parent();
		},
		
		check: function( other ) {
		}
	
	});

});