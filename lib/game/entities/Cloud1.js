ig.module(
    'game.entities.Cloud1'
)
.requires(
    'impact.entity',
	'impact.timer'
)
.defines(function(){

EntityCloud1 = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
    
    animSheet: new ig.AnimationSheet('media/Cloud1.png', 400, 200),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0]);
		this.timer = new ig.Timer(0.5);
		
		this.down_counter = 0;
    },
    
    update: function(){
		if(this.timer.delta() >= 0){
			this.pos.x -= 1;
			this.down_counter++;
			this.timer.set(0.5);
			if(this.down_counter == 3){
				this.down_counter = 0;
				this.pos.y += 1;
			}
		}
		
        this.parent();
    },
	
	check: function( other ) {
	}

});

});