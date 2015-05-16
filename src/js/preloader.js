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
        this.load.spritesheet('subsheet', 'assets/sprites/subsheet.png',177,71);
        this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
        this.load.tilemap('map', 'assets/tilemaps/maps/subfun.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
        this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
        this.load.image('_Spritesheet_tileset_blue', 'assets/tilemaps/tiles/_Spritesheet_tileset_blue.png');
        this.load.image('phaser', 'assets/sprites/arrow.png');
        this.load.image('background','assets/background.png');
        this.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
        this.load.atlasJSONHash('sprites', 'assets/sprites.png', 'assets/sprites.json');
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
