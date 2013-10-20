ig.module(
    'game.entities.Crate'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityCrate = ig.Entity.extend({

    size: {x:20, y:20},
	offset: {x: 20, y:60},
    collides: ig.Entity.COLLIDES.PASSIVE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.NONE,
	maxVel: {x: 500, y: 500},
    
    animSheet: new ig.AnimationSheet('media/Crate_Sheet.png', 125, 75),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0]);
		this.addAnim('broken', 0.1, [1,2,3,4,5]);
		this.addAnim('after', 1, [6]);
		this.currentAnim = this.anims.idle;
		
		this.vel.x = -400;
		this.vel.y = 133;
		
		this.deathAnimTimer = null;
		
		this.death_sound = new ig.Sound('media/sounds/Crate_Kill.*');
		this.heal_sound = new ig.Sound('media/sounds/Heal.*');
		
		this.death_sound.volume = 0.7;
		this.heal_sound.volume = 0.4;
    },
    
    update: function(){
		if(this.deathAnimTimer != null){
			if(this.deathAnimTimer.delta() >= 0){
				this.heal_sound.play();
				this.currentAnim = this.anims.after;
				this.deathAnimTimer = null;
			}
		}
		
		if(this.pos.x < -50){
			this.kill();
		}
		
        this.parent();
    },
	
	check: function( other ) {
		
	},
	
	receiveDamage: function( amount, from ) {
		this.death_sound.play();
		this.currentAnim = this.anims.broken;
		this.deathAnimTimer = new ig.Timer(0.4);
		from.player.gainHealth(10, this);
		this.type = ig.Entity.TYPE.NONE;
	}

});

});