(function() {
    'use strict';

    function Player(game, x,y) {
        Phaser.Sprite.call(this,game,x,y,'subsheet');
        this.game = game;
        this.frame = 1;
        this.anchor.set(0.5);
        this.game.physics.arcade.enable(this);
        this.body.setSize(this.width/2, this.height/2,this.width/8,  this.height/4);
        this.body.collideWorldBounds = true;
      //  this.body.maxAngular = 100; //controls rotation speed
      //  this.body.angularDrag = 50;
    //    this.body.bounce = 0.9;
      //  this.body.mass = 1;
       // this.body.gravity = 2;

    }
    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.updatePhysics = function() {
        //Needs to be called early in game update method, and hence here instead of in Sub's update method...
      //  this.body.velocity.x = 0;
        //this.body.velocity.y = 0;
       // this.body.angularVelocity = 0;
     //   this.body.angle = 0;
    };

    Player.prototype.update = function() {
    };

    window['subfun'] = window['subfun'] || {};
    window['subfun'].Player = Player;

}());