ig.module(
    'game.entities.AirEnemy'
)
.requires(
    'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){

EntityAirEnemy = ig.Entity.extend({

    size: {x:20, y:20},
	offset: {x:20, y:20},
    collides: ig.Entity.COLLIDES.PASSIVE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	maxVel: {x: 500, y: 500},
    
    animSheet: new ig.AnimationSheet('media/Buzzy_Sheet.png', 125, 75),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 0.1, [0,1]);
		this.addAnim('death', 0.075, [2,3,4,5,6,7]);
		this.currentAnim = this.anims.idle;
		
		this.maxVel.x = 500;
		this.vel.x = -400;
		this.vel.y = 183;
		
		this.death_sound = new ig.Sound('media/sounds/Air_Kill.*');
		
		this.move_swap = new ig.Timer(0.46);
    },
    
    update: function(){
        if(this.pos.x < -50){
			this.kill();
		}
		
		if(this.move_swap.delta() >= 0){
			if(this.vel.y == 183){
				this.vel.y -= 100;
			}
			else if(this.vel.y == 83){
				this.vel.y += 100;
			}
			this.move_swap.set(0.46);
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