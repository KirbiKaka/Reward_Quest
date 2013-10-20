ig.module(
    'game.entities.GroundEnemy'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityGroundEnemy = ig.Entity.extend({

    size: {x:20, y:20},
	offset: {x:20, y:60},
    collides: ig.Entity.COLLIDES.PASSIVE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	maxVel: {x: 500, y: 500},
    
    animSheet: new ig.AnimationSheet('media/Groundy_Sheet.png', 125, 75),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 0.1, [0,0,0,0,0,0,0,1,2,3,2,3,2,3,1]);
		this.addAnim('death', 0.1, [4,5]);
		this.currentAnim = this.anims.idle;
		
		this.vel.x = -400;
		this.vel.y = 133;
		
		this.death_sound = new ig.Sound('media/sounds/Ground_Kill.*');
		this.death_sound.volume = 0.4;
		
		
    },
    
    update: function(){
		if(this.pos.x < -100){
			this.kill();
		}
        
        this.parent();
    },
	
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.checkAgainst = ig.Entity.TYPE.NONE;
	},
	
	receiveDamage: function( amount, from ) {
		this.health -= amount;
		if( this.health <= 0 ) {
			this.currentAnim = this.anims.death;
			this.death_sound.play();
			this.type = ig.Entity.TYPE.NONE;
			this.checkAgainst = ig.Entity.TYPE.NONE;
			this.vel.x = -600;
			this.vel.y = -100;
			this.accel.y = 500;
		}
	}

});

});