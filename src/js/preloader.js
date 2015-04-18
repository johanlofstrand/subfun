(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      
      this.loadResources();
    },
      
    loadResources: function () {
        this.load.image('player', 'assets/sprites/player.png');
    	this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
	this.load.tilemap('map', 'assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
	this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
	this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
        this.load.image('phaser', 'assets/sprites/arrow.png');
        this.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
      //  this.game.state.start('menu');
	this.game.state.start('game'); //go direct to game instead of menu during dev...
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['subfun'] = window['subfun'] || {};
  window['subfun'].Preloader = Preloader;

}());
