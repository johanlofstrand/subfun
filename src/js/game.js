(function() {
    'use strict';

    function Game() {
        this.player = null;
        this.cursors = null;
        this.layer = null;
        this.coins = null;
    }

    Game.prototype = {

        create: function () {
            var map;

            /*ADD TILEMAP AND TILES*/
            map = this.game.add.tilemap('map');

            map.addTilesetImage('ground_1x1');
            map.addTilesetImage('walls_1x2');
            map.addTilesetImage('tiles2');

            map.setCollisionBetween(1, 12);

            this.layer = map.createLayer('Tile Layer 1');

            this.layer.resizeWorld();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            /*ADD OBJECTS TO MAP*/
            this.coins = this.game.add.group();
            this.coins.enableBody = true;

            //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
            map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, this.coins);

            //  Add animations to all of the coin sprites
            this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
            this.coins.callAll('animations.play', 'animations', 'spin');

            /*ADD PLAYER SPRITE*/
            this.player = this.add.sprite(260, 100, 'player');
            this.player.anchor.set(0.5);

            this.game.physics.arcade.enable(this.player);

            //  This adjusts the collision body size.
            this.player.body.setSize(32, 32, 16, 16);

            //  We'll set a lower max angular velocity here to keep it from going totally nuts
            this.player.body.maxAngular = 500;

            //  Apply a drag otherwise the sprite will just spin and never slow down
            this.player.body.angularDrag = 50;

            /*ADD CAMERA*/
            this.game.camera.follow(this.player);

            /*ADD KEYS*/
            this.cursors = this.game.input.keyboard.createCursorKeys();

        },
        update: function () {
            var x, y, cx, cy, dx, dy, angle, scale;

            x = this.input.position.x;
            y = this.input.position.y;
            cx = this.world.centerX;
            cy = this.world.centerY;

            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.body.angularVelocity = 0;

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
            };

        },

        onInputDown: function () {
            this.game.state.start('menu');
        },

        collectCoin: function(player,coin) {
            coin.kill();
        },

      /*  render: function () {
            this.game.debug.body(this.player);
        }*/


    };

    window['subfun'] = window['subfun'] || {};
    window['subfun'].Game = Game;

}());
