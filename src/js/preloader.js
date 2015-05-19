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
        this.load.tilemap('map', 'assets/tilemaps/maps/subfun.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('_Spritesheet_tileset_blue', 'assets/tilemaps/tiles/_Spritesheet_tileset_blue.png');
        this.load.image('_Spritesheet_tileset_red', 'assets/tilemaps/tiles/_Spritesheet_tileset_red.png');
        this.load.image('background','assets/background.png');
        this.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
        this.load.atlasJSONHash('sprites', 'assets/sprites.png', 'assets/sprites.json');
        this.load.audio('bgm', ['assets/sounds/bgm.mp3']);
        this.load.image('compass', 'assets/sprites/compass_rose.png');
        this.load.image('touch_segment', 'assets/sprites/touch_segment.png');
        this.load.image('touch', 'assets/sprites/touch.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
      //  this.game.state.start('menu');
          //TESTA  if (this.cache.isSoundDecoded('bgm')
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
