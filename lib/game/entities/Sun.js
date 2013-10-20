ig.module(
    'game.entities.Sun'
)
.requires(
    'impact.entity',
	'impact.timer'
)
.defines(function(){

EntitySun = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
    
    animSheet: new ig.AnimationSheet('media/Sun.png', 400, 300),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0]);
		this.timer = new ig.Timer(3);
		
		this.zIndex =-20;
		
    },
    
    update: function(){
		if(this.timer.delta() >= 0){
			this.pos.x -= 1;
			this.timer.set(3);
		}
		
        this.parent();
    },
	
	check: function( other ) {
	}

});

});