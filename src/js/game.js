(function() {
    'use strict';


    function Game() {
        this.player = null;
        this.cursors = null;
        this.layer = null;
        this.coins = null;
        this.seashells = null;
        this.seagrass = null;
        this.background = null;
    }

    Game.prototype = {


        create: function () {
            var map;

          //  this.background = this.add.tileSprite(0,0,this.game.width,this.game.height,'background');
            this.background = this.add.tileSprite(0,0,this.game.stage.getBounds().width,this.game.cache.getImage('background').height,'background');
            this.background.fixedToCamera = true;

            /*ADD TILEMAP AND TILES*/
            map = this.game.add.tilemap('map');

            map.addTilesetImage('_Spritesheet_tileset_blue');
            map.addTilesetImage('_Spritesheet_tileset_red');

            map.setCollisionBetween(196, 2000);

            this.layer = map.createLayer('Tile Layer 1');

            this.layer.resizeWorld();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.addObjectsToMap(map);
            /*ADD KEYS*/
            this.cursors = this.game.input.keyboard.createCursorKeys();

            /*ADD PLAYER SPRITE*/
            this.player = new subfun.Player(this.game,260,350);//this.add.sprite(260, 100, 'subsheet');
            this.game.add.existing(this.player);

            /*ADD CAMERA*/
            this.game.camera.follow(this.player);

            /*MUSIC*/
            var music = this.game.add.audio('bgm', 0.5, true);
            music.play();

        },
        update: function () {
            var x, y, cx, cy, dx, dy, angle, scale;

          //  this.background.tilePosition.x -= 1;

            x = this.input.position.x;
            y = this.input.position.y;
            cx = this.world.centerX;
            cy = this.world.centerY;


            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

            this.player.updatePhysics();

            if (this.cursors.left.isDown)
            {
                this.player.body.angularVelocity = -300;

            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.angularVelocity = 300;
            }

            if (this.cursors.up.isDown)
            {
                this.game.physics.arcade.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
            }

        },

        onInputDown: function () {
            this.game.state.start('menu');
        },

        collectCoin: function(player,coin) {
            coin.kill();
        },

      //  render: function () {
      //      this.game.debug.body(this.player);
      //  },

        addObjectsToMap: function (map) {
            /*ADD OBJECTS TO MAP*/
          //  this.coins = this.game.add.group();
          //  this.coins.enableBody = true;

            /*
            * SEASHELLS
            * */
            this.seashells = this.game.add.group();
            map.createFromObjects('Sea sheel layer', 2506, 'sprites','seashell1.png', true, false, this.seashells);
            map.createFromObjects('Sea sheel layer', 2507, 'sprites','seasheel2.png', true, false, this.seashells);
            map.createFromObjects('Sea sheel layer', 2508, 'sprites','seasheel3.png', true, false, this.seashells);

            /*
            * SEAGRASS
            * */
            this.seagrass = this.game.add.group();
            map.createFromObjects('Sea grass layer', 2512, 'sprites','grass1_large.png', true, false, this.seagrass, Phaser.Sprite,true);
            map.createFromObjects('Sea grass layer', 2513, 'sprites','grass2_large.png', true, false, this.seagrass, Phaser.Sprite,true);
            map.createFromObjects('Sea grass layer', 2514, 'sprites','grass3_large.png', true, false, this.seagrass, Phaser.Sprite,true);
            map.createFromObjects('Sea grass layer', 2515, 'sprites','grass4_large.png', true, false, this.seagrass, Phaser.Sprite,true);
            map.createFromObjects('Sea grass layer', 2516, 'sprites','grass5_large.png', true, false, this.seagrass), Phaser.Sprite,true;
            map.createFromObjects('Sea grass layer', 2517, 'sprites','grass6_large.png', true, false, this.seagrass, Phaser.Sprite,true);
            map.createFromObjects('Sea grass layer', 2522, 'sprites','grass7_large.png', true, false, this.seagrass, Phaser.Sprite,true);



            //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
           // map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, this.coins);

            //  Add animations to all of the coin sprites
          //  this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
          //  this.coins.callAll('animations.play', 'animations', 'spin');
        }


    };

    window['subfun'] = window['subfun'] || {};
    window['subfun'].Game = Game;

}());
