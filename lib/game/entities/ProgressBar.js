ig.module(
    'game.entities.ProgressBar'
)
.requires(
    'impact.entity',
	'impact.timer'
)
.defines(function(){

EntityProgressBar = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	gameDuration: 173,
	position: 70,
	zIndex: 20,
    
    animSheet: new ig.AnimationSheet('media/Progress Bar.png', 1280, 214),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0]);
		this.timer = new ig.Timer(this.gameDuration / 32);
    },
    
    update: function(){
		if(this.timer.delta() >= 0){
			ig.game.spawnEntity(EntityRedBar, this.position, this.pos.y + 40);
			this.timer.set(this.gameDuration / 32 );
			this.position += 36;
		}
		
        this.parent();
    },
	
	check: function( other ) {
	}

});

	EntityRedBar = ig.Entity.extend({

		size: {x:20, y:50},
		collides: ig.Entity.COLLIDES.PASSIVE,
		pos: {x:0, y:0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		player: null,
		zIndex: 20,
		
		animSheet: new ig.AnimationSheet('media/Red_Bar.png', 36, 112),
	
		init: function(x, y, settings){
			this.parent(x, y, settings);
		
			/*	4 Full health
				0 Empty health
			*/
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},
		
		update: function(){
			this.parent();
		},
		
	
	});

});