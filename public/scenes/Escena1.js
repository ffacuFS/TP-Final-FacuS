export default class Escena1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("escena1");
    this.vidas = 3;
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
    this.defeat = false;
  }

  preload() {
    // load assets
    this.load.image("espacio", "./public/images/espacio.jpg");
    this.load.image("nave", "./public/images/nave.jpg");
    this.load.image("meteorito", "./public/images/meteorito.jpg");
    this.load.image("estrella", "./public/images/estrella.png");
    this.load.image("laser", "./public/images/laser.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "espacio");
    this.add.image("meteorito");
    this.add.image("estrella");

    this.laserGroup = this.physics.add.group();
    this.laserGroup.setVelocity(0, -500);

    this.shapesGroup = this.physics.add.group();

    this.jugador = this.physics.add
      .sprite(500, 400, "nave")
      .setScale(0.3)
      .refreshBody();
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(false);

    this.physics.add.collider(
      this.shapesGroup,
      this.laserGroup,
      this.collectShape
    );

    this.physics.add.collider(this.shapesGroup, this.jugador, this.choca);

    this.time.addEvent({
      delay: 2500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    this.vidasText = this.add.text(20, 80, `Vidas: ${this.vidas}`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.timer = 15;
    this.timerText = this.add.text(750, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.scoreM = 0;
    this.scoreTextM = this.add.text(20, 20, `M: ${this.scoreM}`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreE = 0;
    this.scoreTextE = this.add.text(20, 50, `E: ${this.scoreE}`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  choca(shape, jugador) {
    //shape.disableBody = false
    console.log("chaca persobaje");
  }

  update() {
    if (this.scoreM > 2) {
      this.scene.start("win");
    } else if (this.scoreE > 2) {
      this.scene.start("win");
    }

    if (this.defeat) {
      this.scene.start("derrota");
    }
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
    if (Phaser.Input.Keyboard.JustDown(this.fireButton)) {
      this.shoot();
    }
  }

  addShape() {
    const randomShape = Phaser.Math.RND.pick(["meteorito", "estrella"]);
    const randomX = Phaser.Math.Between(0, 800);

    const shape = this.physics.add.image(randomX, 0, randomShape).setScale(0.3);
    shape.setCollideWorldBounds(true);
    shape.body.setAllowGravity(false);
    this.shapesGroup.add(shape);
    shape.body.setGravityY(-150);

    //console.log("shape is added", randomX, randomShape);
  }

  onSecond() {
    this.timer--;
    this.timerText.setText(this.timer);
    if (this.timer == 0) {
      this.defeat = true;
    }
  }

  shoot() {
    const laser = this.physics.add.sprite(
      this.jugador.x,
      this.jugador.y,
      "laser"
    );
    laser.setScale(0.02);
    laser.setVelocityY(-500);

    this.laserGroup.add(laser);
  }

  collectShape(laser, shape) {
    console.log("colecta forma");
    // Elimina el láser y el sprite recolectado
    laser.destroy();
    shape.destroy();

    // Actualiza el puntaje dependiendo del tipo de sprite recolectado
    if (shape.texture.key === "meteorito") {
      this.scoreM += 10;
    } else if (shape.texture.key === "estrella") {
      this.scoreE += 5;
    }

    // Actualiza el texto del puntaje
    this.updateScoreText();
  }

  updateScoreText() {
    this.scoreTextM.setText(`M: ${this.scoreM}`);
    this.scoreTextE.setText(`E: ${this.scoreE}`);
  }
  handleCollision(jugador, shape) {
    shape.destroy();
    this.vidas--;

    // Actualizar el texto de las vidas
    this.vidasText.setText(`Vidas: ${this.vidas}`);

    if (this.vidas <= 0) {
      // Si se quedan sin vidas, puedes hacer algo aquí, como llamar a una función de Game Over.
      // Por ejemplo:
      this.gameOver();
    }
  }

  gameOver() {
    // Aquí puedes realizar acciones cuando el jugador pierda todas las vidas.
    // Puedes reiniciar el juego, mostrar un mensaje de game over, etc.
    this.scene.start("derrota"); // Por ejemplo, iniciar la escena de derrota.
  }
}
