(function() {
    'use strict';

    function Player(game, x,y) {
        Phaser.Sprite.call(this,game,x,y,'sprites','sub_blue_r.png');
        this.game = game;
        this.anchor.set(0.5);
        this.game.physics.p2.enable(this);
        this.body.setCircle(5);
       // this.body.setSize(this.width/2, this.height/2,this.width/8,  this.height/4);
        this.body.collideWorldBounds = true;
        this.animations.add('left',['sub_blue_l.png'],15,true);
        this.animations.add('right',['sub_blue_r.png'],15,true);
      //  this.body.maxAngular = 100; //controls rotation speed
      //  this.body.angularDrag = 50;
    //    this.body.bounce = 0.9;
      //  this.body.mass = 1;
       // this.body.gravity = 2;

    }
    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.updatePhysics = function() {

    };

    Player.prototype.update = function() {
        this.body.setZeroVelocity(); //To handle collisions in a controled way.

    };

    window['subfun'] = window['subfun'] || {};
    window['subfun'].Player = Player;

}());