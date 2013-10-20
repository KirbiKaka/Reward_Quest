ig.module(
    'game.entities.IntroScene'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound',
	'game.entities.Fade'
)
.defines(function(){

EntityIntroScene = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NEVER,
    pos: {x:0, y:0},
	zIndex: -10,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
    
    animSheet: new ig.AnimationSheet('media/Intro_Sheet.png', 1280, 960),

    init: function(x, y, settings){
        this.parent(x, y, settings);
		this.addAnim('S1', 1, [0]);
		this.addAnim('S2', 1, [1]);
		this.addAnim('S4', 1, [3]);
		this.addAnim('S5', 1, [4]);
		this.addAnim('S6', 1, [5]);
		this.addAnim('S7', 1, [6]);
		this.currentAnim = this.anims.S1;
		
		this.nextTimer = new ig.Timer(6);
		this.fadeTimer = null;
		
		this.firstFadeOut = false;
		this.secondFinish = false;
		this.thirdFadeOut = false;
		this.fourthFadeOut = false;
		this.fifthFadeOut = false;
		this.sixthFadeOut = false;
		this.gameFadeOut = false;
		
		this.done = false;
		
		if(ig.Sound.enabled){
			ig.music.play('intro');
		}
		
		this.key = null;
		
		//COMMENT OUT IF USING WELTMESITER
		this.fade = ig.game.spawnEntity(EntityFade, 0, 0, {fadeDuration: 0.5});
		this.fade.set_black();
		this.fade.fade_in();
    },
    
    update: function(){
		if(this.nextTimer.delta() >= 0){
			if(this.key == null){
				this.key = ig.game.spawnEntity(EntityArrowKey, 1200, 850);
			}
		}
		if(this.nextTimer.delta() >= -4){
			if(ig.input.pressed('forward')) {	
				if(this.key != null){
					this.key.kill();
					this.key = null;
				}
				if(this.currentAnim == this.anims.S1 && this.firstFadeOut == false){
					this.fade.fade_out();
					this.firstFadeOut = true;
					this.fadeTimer = new ig.Timer(1);
					this.nextTimer.set(7.5);
				}
				else if(this.currentAnim == this.anims.S2 &&(this.secondFinish == false || this.thirdFadeOut == false)){
					if(this.secondFinish){
						this.fade.kill();
						this.fade = ig.game.spawnEntity(EntityFade, 0, 0, {fadeDuration: 1});
						this.fade.fade_out();
						this.thirdFadeOut = true;
						this.secondFinish = false;
						this.fadeTimer.set(2);
						this.nextTimer.set(7);
						this.fade.fadeDuration = 0.5;
					}
					else if(this.thirdFadeOut == false){
						this.thirdScene = ig.game.spawnEntity( EntityThird, 0, 0);	
						this.secondFinish = true;
						this.nextTimer.set(5);
					}
				}
				else if(this.currentAnim == this.anims.S4 && this.fourthFadeOut == false){
					this.fade.fade_out();
					this.fourthFadeOut = true;
					this.fadeTimer.set(0.5);
					this.nextTimer.set(5.5);
				}
				else if(this.currentAnim == this.anims.S5 && this.fifthFadeOut == false){
					this.fade.fade_out();
					this.fifthFadeOut = true;
					this.fadeTimer.set(0.5);
					this.nextTimer.set(5.5);
				}
				else if(this.currentAnim == this.anims.S6 && this.sixthFadeOut == false){
					this.fade.fadeDuration = 1;
					this.fade.fade_out();
					this.sixthFadeOut = true;
					this.fadeTimer.set(1.5);
					this.nextTimer.set(6.5);
				}
				else if(this.currentAnim == this.anims.S7 && this.gameFadeOut == false){
					this.fade.fade_out();
					this.gameFadeOut = true;
					this.fadeTimer.set(2);
					this.nextTimer.set(20);
					if(ig.Sound.enabled){
						ig.music.fadeOut(0.9);
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
		else if(this.thirdFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S4;
				this.fade.fade_in();
				this.thirdFadeOut = false;	
				this.thirdScene.done = true;
			}
		}
		else if(this.fourthFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S5;
				this.fade.fade_in();
				this.fourthFadeOut = false;
			}
		}
		else if(this.fifthFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S6;
				this.fade.fade_in();
				this.fifthFadeOut = false;
			}
		}
		else if(this.sixthFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.currentAnim = this.anims.S7;
				this.fade.fade_in();
				this.sixthFadeOut = false;
			}
		}
		else if(this.gameFadeOut){
			if(this.fadeTimer.delta() >= 0){
				this.done = true;
			}
		}
		
		
        this.parent();
    },

});

	EntityThird = ig.Entity.extend({
	
		size: {x:20, y:20},
		collides: ig.Entity.COLLIDES.NONE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		zIndex: 10,
		
		animSheet: new ig.AnimationSheet('media/Intro_Sheet.png', 1280, 960),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			this.addAnim('S3', 1, [2]);
			
			this.anims.S3.alpha = 0;
			this.currentAnim = this.anims.S3;
			this.fadeTimer = new ig.Timer(0.5);
			this.fadeDuration = 2;
			this.done = false;
		},
		
		update: function(){
			if(this.done){
				this.kill();
			}
			
			var delta = this.fadeTimer.delta();
			if(delta >= 0){
				this.anims.S3.alpha = 1;
			}
			else if(delta >= -0.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.95;	
			}
			else if(delta >= -this.fadeDuration / 10){
				this.anims.S3.alpha = 0.9;
			}
			else if(delta >= -1.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.85;	
			}
			else if(delta >= -2*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.8;
			}
			else if(delta >= -2.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.75;	
			}
			else if(delta >= -3*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.7;
			}
			else if(delta >= -3.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.65;	
			}
			else if(delta >= -4*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.6;
			}
			else if(delta >= -4.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.55;	
			}
			else if(delta >= -5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.5;
			}
			else if(delta >= -5.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.45;	
			}
			else if(delta >= -6*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.4;
			}
			else if(delta >= -6.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.35;	
			}
			else if(delta >= -7*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.3;
			}
			else if(delta >= -7.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.25;	
			}
			else if(delta >= -8*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.2;
			}
			else if(delta >= -8.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.15;	
			}
			else if(delta >= -9*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.1;
			}
			else if(delta >= -9.5*this.fadeDuration / 10){
				this.anims.S3.alpha = 0.05;	
			}
			
			this.parent();
		},
		
		check: function( other ) {
		}
	
	});
	
	EntityArrowKey = ig.Entity.extend({

		size: {x:50, y:50},
		collides: ig.Entity.COLLIDES.PASSIVE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		player: null,
		
		animSheet: new ig.AnimationSheet('media/Arrow_Sheet.png', 70, 60),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			/*	4 Full health
				0 Empty health
			*/
			this.addAnim('invis', 1, [0]);
			this.addAnim('appear', 1, [1]);
			
			this.animTimer = new ig.Timer(0.8);
			this.currentAnim = this.anims.appear;
		},
		
		update: function(){
			if(this.animTimer.delta() >= 0){
				if(this.currentAnim == this.anims.appear){
					this.currentAnim = this.anims.invis;	
				}
				else if(this.currentAnim == this.anims.invis){
					this.currentAnim = this.anims.appear;	
				}
				this.animTimer.set(0.8);
			}
			this.parent();
		},
		
	
	});

});