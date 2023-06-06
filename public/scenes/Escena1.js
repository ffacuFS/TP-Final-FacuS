export default class Escena1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("escena1");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("espacio", "./public/images/espacio.jpg");
    this.load.image("nave", "./public/images/nave.jpg");
    this.load.image("estrella", "./public/images/estrella.png");
    this.load.image("meteorito", "./public/images/meteorito.jpg");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "espacio");
    this.add.image(200, 300, "meteorito").setScale(0.5);
    this.add.image(200, 450, "estrella").setScale(0.5);

    this.jugador = this.physics.add
      .sprite(500, 400, "nave")
      .setScale(0.5)
      .refreshBody();
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // update game objects
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(200);
    } else {
      this.jugador.setVelocityX(0);
    }
    if (this.cursors.up.isDown) this.jugador.setVelocityY(-200);
    if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(160);
    }
  }
}
