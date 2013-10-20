ig.module(
    'game.entities.FillGrass'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityFillGrass = ig.Entity.extend({

    size: {x:20, y:20},
    collides: ig.Entity.COLLIDES.NONE,
    pos: {x:0, y:0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
    
    animSheet: new ig.AnimationSheet('media/Grass_fill_Sheet.png', 72, 72),

    init: function(x, y, settings){
        this.parent(x, y, settings);
    
        this.addAnim('idle', 1, [0,1,2,3]);
		
    },
    
    update: function(){
		
        this.parent();
    },
	
	check: function( other ) {
	}

});

});