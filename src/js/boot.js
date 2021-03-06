(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 1;

      // if (this.game.device.desktop) {
     //   this.game.scale.pageAlignHorizontally = true;
      //} else {
     //   this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      /*  this.game.scale.minWidth =  480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 2560;
        this.game.scale.maxHeight = 1600;*/
        this.game.scale.forceOrientation(true);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignHorizontally = true;

    //  }
      this.game.state.start('preloader');
    }
  };

  window['subfun'] = window['subfun'] || {};
  window['subfun'].Boot = Boot;

}());

