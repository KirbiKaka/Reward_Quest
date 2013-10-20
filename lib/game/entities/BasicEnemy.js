ig.module(
    'game.entities.BasicEnemy'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityBasicEnemy = ig.Entity.extend({

    size: {x:20, y:20},
	offset: {x: 20, y:30},
    collides: ig.Entity.COLLIDES.PASSIVE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	maxVel: {x: 700, y: 700},
    
    animSheet: new ig.AnimationSheet('media/Smokey_Sheet.png', 125, 75),
	//animSheet: new ig.AnimationSheet('media/EditedTileSet2.png', 20, 20),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 0.1, [0,1,2,3]);
		this.addAnim('death', 0.1, [4,5]);
		
		this.vel.x = -400;
		this.vel.y = 133;
		
		this.death_sound = new ig.Sound('media/sounds/Basic_Kill.*');
    },
    
    update: function(){
		
		if(this.pos.x < -50){
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
		this.currentAnim = this.anims.death;
		if( this.health <= 0 ) {
			this.death_sound.play();
			this.type = ig.Entity.TYPE.NONE;
			this.checkAgainst = ig.Entity.TYPE.NONE;
			this.vel.x = -400;
			this.vel.y = -600;
			this.accel.y = 1000;
		}
	}

});

});