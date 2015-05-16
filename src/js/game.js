(function() {
    'use strict';


    function Game() {
        this.player = null;
        this.cursors = null;
        this.layer = null;
        this.coins = null;
        this.seashells = null;
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

            map.addTilesetImage('ground_1x1');
            map.addTilesetImage('walls_1x2');
            map.addTilesetImage('tiles2');
            map.addTilesetImage('_Spritesheet_tileset_blue');

            map.setCollisionBetween(1, 12);

            this.layer = map.createLayer('Tile Layer 1');

            this.layer.resizeWorld();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            /*ADD OBJECTS TO MAP*/
            this.coins = this.game.add.group();
            this.coins.enableBody = true;
            this.seashells = this.game.add.group();

            //  And now we convert all of the Tiled objects with an ID of 9 into sprites within the coins group
            map.createFromObjects('Sea sheel layer', 1364, 'sprites', 'animsheel.png', true, false, this.seashells);

            //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
            map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, this.coins);

            //  Add animations to all of the coin sprites
            this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
            this.coins.callAll('animations.play', 'animations', 'spin');


            /*ADD KEYS*/
            this.cursors = this.game.input.keyboard.createCursorKeys();

            /*ADD PLAYER SPRITE*/
            this.player = new subfun.Player(this.game,260,100);//this.add.sprite(260, 100, 'subsheet');
            this.game.add.existing(this.player);

            /*ADD CAMERA*/
            this.game.camera.follow(this.player);

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

        render: function () {
            this.game.debug.body(this.player);
        }


    };

    window['subfun'] = window['subfun'] || {};
    window['subfun'].Game = Game;

}());
