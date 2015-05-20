(function() {
    'use strict';


    function Game() {
        this.player = null;
        this.cursors = null;
        this.layer = null;
        this.polys = null;
        this.seashells = null;
        this.seagrass = null;
        this.background = null;
        this.direction = null;
        this.touchControls = null;
        this.rotationDirection = 0;
    }

    var easeInSpeed = function(x){
        return x * Math.abs(x) / 1000;
    };

    Game.prototype = {


        create: function () {
            var map;

          //  this.background = this.add.tileSprite(0,0,this.game.width,this.game.height,'background');
            this.game.world.setBounds(0, 0, 5760, 1216);
            this.background = this.add.tileSprite(0,0,5760,1216,'sb');
           // this.background.fixedToCamera = true;

            /*ADD TILEMAP AND TILES*/
            map = this.game.add.tilemap('map');

           // map.addTilesetImage('_Spritesheet_tileset_blue');
            //map.addTilesetImage('_Spritesheet_tileset_red');

//            map.setCollisionBetween(196, 2000);

         //   map.createFromObjects('Collision layer', 'Collision layer', 'polys', 0, true, false, this.polys);

         // this.layer.resizeWorld();

            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.defaultRestitution = 0.9;
            this.polys = this.game.physics.p2.convertCollisionObjects(map, 'Collision layer', true);

         //   this.game.physics.setBounds(x, y, width, height, left, right, top, bottom, setCollisionGroup)

            this.addObjectsToMap(map);
            /*ADD KEYS*/
            this.cursors = this.game.input.keyboard.createCursorKeys();
           // this.touchControls = this.game.input.pointer1;
            this.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.touchControl.inputEnable();
            this.touchControl.settings.singleDirection = false;

            /*ADD PLAYER SPRITE*/
            this.player = new subfun.Player(this.game,300,350);//this.add.sprite(260, 100, 'subsheet');
            this.game.add.existing(this.player);

           // this.player.body.collide([this.polys]);



            /*ADD CAMERA*/
            this.game.camera.follow(this.player);

            /*MUSIC*/
            var music = this.game.add.audio('bgm', 0.5, true);
            music.play();

        },

        updateDebugText: function(){
            console.log('directions: {\n  up: ' + this.touchControl.cursors.up +
                ',\n  down: ' + this.touchControl.cursors.down + ',\n  left: ' + this.touchControl.cursors.left +
                ',\n  right: ' + this.touchControl.cursors.right + ',\n}');
            console.log('velocity: {\n  x: ' + this.touchControl.speed.x + ',\n  y: ' + this.touchControl.speed.y + '\n}');

        },

        update: function () {
            var speed = this.touchControl.speed;

            this.player.body.y -= easeInSpeed(speed.y);
            this.player.body.x -= easeInSpeed(speed.x);
        //    console.log("sx: " + speed.x + " sy: " + speed.y);

            this.game.physics.arcade.collide(this.player, this.layer);
           // this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

            this.player.updatePhysics();

            if (this.cursors.left.isDown || this.touchControl.cursors.left )
            {
                //this.player.body.angularVelocity = -30;
                this.player.body.x--;
                this.rotationDirection = 1;
                this.player.animations.play('left', 15, true);
             //   this.rotationSpeed = 0.001;
            }
            else if (this.cursors.right.isDown || this.touchControl.cursors.right)
            {
                //this.player.body.angularVelocity = 30;
                this.player.body.x++;
                this.rotationDirection = -1;
                this.player.animations.play('right', 15, true);
               // this.rotationSpeed = 0.001;
            }

            if (this.cursors.down.isDown || this.touchControl.cursors.down)
            {
               // this.game.physics.arcade.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
                this.player.body.y++;
                this.player.body.rotation = (speed.y / 100) * this.rotationDirection;
                this.rotationDirection = -1;
            }
            else if (this.cursors.up.isDown || this.touchControl.cursors.up)
            {
                // this.game.physics.arcade.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
                this.player.body.y--;
                this.player.body.rotation = (speed.y / 100) * this.rotationDirection;
                this.rotationDirection = 1;
            }


            this.player.body.velocity = speed;



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
