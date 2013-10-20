ig.module(
    'game.entities.Player'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

    size: {x:120, y:300},
    pos: {x:0, y:0},
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	healthLimit: 40,
	invincibleAnim: false,
	invincibleTimer: new ig.Timer(0),
	invincibleDuration: 3,
	attackAnim: false,
	attackCooldown: new ig.Timer(0),
	cooldownDuration: 0.23,
	savedAttack: '',
	saveAttackTiming: 0.23,
    
    animSheet: new ig.AnimationSheet('media/RoryRun_SheetWithAtk.png', 325, 260),

    init: function(x, y, settings){
        this.parent(x, y, settings);
		
		// set health
		this.health = this.healthLimit;
		this.isAlive = true;
		
		//create lifebar ***MUST COMMENT OUT IF USING WELTMEISTER***
		ig.game.spawnEntity( EntityLifeBar, 1010, 20, {player: this});
		
		/*	Set Animations:
    		0 Blank
			1-10 Run
			11-14 MidAtk
			15-18 UpAtk
			19-22 DownAtk
		*/
		this.addAnim('idle', 0.075, [1,2,3,4,5,6,7,8,9,10]);
		this.addAnim('invinc_idle', 0.0375, [1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0]);
		this.addAnim('midAtk', 0.075, [11,12,13,14]);
		this.addAnim('invinc_midAtk', 0.0375, [11,0,12,0,13,0,14]);
		this.addAnim('upAtk', 0.075, [15,16,17,18]);
		this.addAnim('invinc_upAtk', 0.0375, [15,0,16,0,17,0,18,0]);
		this.addAnim('downAtk', 0.075, [19,20,21,22]);
		this.addAnim('invinc_downAtk', 0.0375, [19,0,20,0,21,0,22,0]);
		this.currentAnim = this.anims.idle;
		
		this.swing_sound = new ig.Sound('media/sounds/Swing.*');
		this.swing_sound.volume = 0.1;
		this.hit_sound = new ig.Sound('media/sounds/Player_Hit.*');
    },
    
    update: function(){
		if(this.isAlive){
			this.checkAnimation();
			
			//Controls for Attack
			if(ig.input.pressed('up')) {
				this.attack('up');
			}
			else if(ig.input.pressed('down')){
				this.attack('down');
			}
			else if(ig.input.pressed('forward') ) {
				this.attack('forward');
			}
			//Attack if an attack was ordered early
			else if(this.savedAttack != ''){
				if(this.attackCooldown.delta() >= 0){
					this.swing_sound.play();
					ig.game.spawnEntity( EntitySword, this.pos.x, this.pos.y, {direction: this.savedAttack, player: this});
					this.setAttackAnim(this.savedAttack);
					this.attackCooldown.set(this.cooldownDuration);
					this.savedAttack = '';
				}
			}
		}
        this.parent();
    },
	
	/*	Attack if off-cooldown, otherwise save the attack
	*/
	attack: function(dir){
		if(this.attackCooldown.delta() >= 0){
				this.swing_sound.play();
				ig.game.spawnEntity( EntitySword, this.pos.x, this.pos.y, {direction: dir, player: this});
				this.setAttackAnim(dir);
				this.attackCooldown.set(this.cooldownDuration);
			}
			else if(this.attackCooldown.delta() >= -this.saveAttackTiming){
				this.savedAttack = dir;
			}
	},
	
	/*	Set the invincibleTimer and the invincible boolean variable
		Change the animation to the invincible form
	*/
	setInvincible: function(){
		this.invincibleTimer.set(this.invincibleDuration);
		this.invincibleAnim = true;
		frame = this.currentAnim.frame;
		if(this.currentAnim == this.anims.idle){
			this.currentAnim = this.anims.invinc_idle;
		}
		else if(this.currentAnim == this.anims.midAtk){
			this.currentAnim = this.anims.invinc_midAtk;
		}
		else if(this.currentAnim == this.anims.upAtk){
			this.currentAnim = this.anims.invinc_upAtk;
		}
		else if(this.currentAnim == this.anims.downAtk){
			this.currentAnim = this.anims.invinc_downAtk;
		}
		this.currentAnim.gotoFrame(frame*2);
		
		
	},
	
	/*	Set the attackCooldown timer and the attack boolean variable
		Change the animation to the attack of specified direction
	*/
	setAttackAnim: function(dir){
		
		if(this.invincibleAnim){
			if(dir == 'forward'){
				this.currentAnim = this.anims.invinc_midAtk;
			}
			else if(dir == 'up'){
				this.currentAnim = this.anims.invinc_upAtk;
			}
			else if(dir == 'down'){
				this.currentAnim = this.anims.invinc_downAtk;
			}
		}
		else if(dir == 'forward'){
			this.currentAnim = this.anims.midAtk;
		}
		else if(dir == 'up'){
			this.currentAnim = this.anims.upAtk;
		}
		else if(dir == 'down'){
			this.currentAnim = this.anims.downAtk;
		}
		
		this.attackAnim = true;
	},
	
	/*	Checks if invincibility should end
		Checks if attack animation should end and whether it should become idle or invinc_idle
	*/
	checkAnimation: function(){
		if(this.invincibleAnim && this.invincibleTimer.delta() >= 0){
			frame = this.currentAnim.frame;
			this.currentAnim = this.anims.idle;
			this.currentAnim.gotoFrame(frame/2);
			
			this.invincibleAnim = false;
		}
		if(this.attackAnim && this.attackCooldown.delta() >= 0){
			if(this.invincibleAnim){
				this.currentAnim = this.anims.invinc_idle;
			}
			else{
				this.currentAnim = this.anims.idle;
			}
			this.attackAnim = false;
		}
	},
	
	//	Only receive damage if not invincible
	receiveDamage: function( amount, from ) {
		if(!this.invincibleAnim && this.isAlive){
			this.hit_sound.play();
			this.health -= amount;
			this.setInvincible();
			if( this.health <= 0 ) {
				this.isAlive = false;
			}
		}
	},
	
	//	Gain health and ensure it doesn't exceed healthLimit
	gainHealth: function(amount, from){
		this.health += amount;
		if(this.health > this.healthLimit){
			this.health = this.healthLimit;
		}
	}

});

	/*	Hitbox for the attacks
	*/
	EntitySword = ig.Entity.extend({
	
		size: {x:100, y:20},
		collides: ig.Entity.COLLIDES.NEVER,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		direction: '',
		player: null,
		
		//animSheet: new ig.AnimationSheet('media/EditedTileSet2.png', 100, 20),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
			this.maxVel.x = 500;
			this.maxVel.y = 500;
			
			if(this.direction == 'up'){
				this.pos.x += 80;
				this.pos.y += 40;
				this.vel.y = -100;
				this.vel.x = 200;
			}
			else if(this.direction == 'down'){
				this.pos.x += 70;
				this.pos.y += 210;
				this.vel.x = 400;
				this.vel.y = -150;
			}
			else if(this.direction == 'forward'){
				this.pos.x += 100;
				this.pos.y += 150;
				this.vel.x = 400;
				this.vel.y = -350;
			}
			//this.addAnim('regular', 1, [0,1,2,3,4,5,5,4,3,2,2,1]);
			//this.currentAnim = this.anims.regular;
			
			// swingTimer causes the sword to disappear after whatever time
			this.swingTimer = new ig.Timer(0.25);
		},
		
		update: function(){
			//Kills the sword
			if(this.swingTimer.delta() >= 0){
				this.kill();
			}
			this.parent();
		},
		
		check: function(other){
			other.receiveDamage(10, this);
			this.kill();
		}
	
	});

	/*	Lifebar at the top of the screen
	*/
	EntityLifeBar = ig.Entity.extend({

		size: {x:200, y:50},
		collides: ig.Entity.COLLIDES.PASSIVE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		player: null,
		
		animSheet: new ig.AnimationSheet('media/Lifebar_Sheet.png', 240, 60),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			/*	4 Full health
				0 Empty health
			*/
			this.addAnim('full', 1, [4]);
			this.addAnim('minus10', 1, [3]);
			this.addAnim('minus20', 1, [2]);
			this.addAnim('minus30', 1, [1]);
			this.addAnim('minus40', 1, [0]);
			this.currentAnim = this.anims.full;
		},
		
		update: function(){
			/*	Sets animation to match player health
			*/
			if(this.player.health == this.player.healthLimit){
				this.currentAnim = this.anims.full;
			}
			else if(this.player.health == this.player.healthLimit - 10){
				this.currentAnim = this.anims.minus10;
			}
			else if(this.player.health == this.player.healthLimit - 20){
				this.currentAnim = this.anims.minus20;
			}
			else if(this.player.health == this.player.healthLimit - 30){
				this.currentAnim = this.anims.minus30;
			}
			else if(this.player.health == this.player.healthLimit - 40){
				this.currentAnim = this.anims.minus40;
			}
			this.parent();
		},
		
	
	});
});