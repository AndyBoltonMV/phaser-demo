import Phaser, { Game } from "phaser";
let platforms;
let player;
let cursors;

const myGame = new Game({
  type: Phaser.AUTO,
  width: 850,
  height: 695,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: {
    preload() {
      // Code that needs to run before the game is on the screen
      this.load.image("background", "./assets/forest.png");
      this.load.image("floor", "./assets/floor.png");
      this.load.spritesheet("person", "./assets/sprite.png", {
        frameWidth: 32,
        frameHeight: 32,
      });
      cursors = this.input.keyboard.createCursorKeys();
    },
    create() {
      // Code that runs as soon as the game is on the screen
      this.add.image(400, 300, "background");
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 395, "floor").setScale(0.5).refreshBody();
      player = this.physics.add.sprite(200, 100, "person");
      player.setBounce(0.5);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("person", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("person", {
          start: 8,
          end: 15,
        }),
        frameRate: 10,
        repeat: -1,
      });
    },
    update() {
      // Code that runs for every frame rendered in the browser
      if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("right", true);
      } else if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("left", true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
      } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play("right", false);
        player.anims.play("left", false);
      }
    },
  },
});
