export default class Escena2 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("escena2");
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
    this.load.image("escena2", "./public/images/escena2.jpg");
    this.load.image("nave", "./public/images/nave.png");
    this.load.image("meteorito", "./public/images/Meteorito.png");
    this.load.image("estrella", "./public/images/estrella.png");
    this.load.image("laser", "./public/images/laser.png");
    this.load.image("satelite","./public/images/satelite.png")
  }

  create() {
    // create game objects
    this.add.image(400, 300, "escena2");
    this.add.image("meteorito");
    this.add.image("estrella");
    this.add.image("satelite");

    this.shapesGroup = this.physics.add.group();

    this.jugador = this.physics.add
      .sprite(500, 400, "nave");
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(false);

    this.physics.add.collider(
      this.shapesGroup,
      this.laserGroup,
      this.collectShape
    );

    this.physics.add.collider(
      this.shapesGroup,
      this.jugador,
      this.handleCollision,
      null,
      this
    );

    // Falta agregar colision del jugador con el mundo
    // Le resta una vida ??

    this.time.addEvent({
      delay: 2000,
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

    this.vidasText = this.add.text(20, 120, `❤️: ${this.vidas}/3`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.timer = 35;
    this.timerText = this.add.text(380, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.scoreM = 0;
    this.scoreTextM = this.add.text(20, 20, `🌑: ${this.scoreM}/2`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreE = 0;
    this.scoreTextE = this.add.text(20, 50, `⭐: ${this.scoreE}/2`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreS = 0;
    this.scoreTextS = this.add.text(20, 80, `🛰️: ${this.scoreS}/3`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.pause("escena2");
      this.scene.launch('PantallaPausa', { sceneToResume: 'Escena2' });
    });
  }

  update() {
    // si los dos marcadores son mayores a 2, se gana el juego
    if (this.scoreM >= 2 && this.scoreE >= 2) {
      this.scene.start("fin");
    }
    if (this.scoreS === 3){
      this.scene.start("derrota");
    }

    if (this.defeat ) {
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
    const randomShape = Phaser.Math.RND.pick(["meteorito", "estrella","satelite"]);
    const randomX = Phaser.Math.Between(0, 800);

    const shape = this.physics.add.image(randomX, 0, randomShape).setScale(1.5);
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
    laser.setScale(0.5);
    laser.setVelocityY(-600);

    laser.setCollideWorldBounds(true);

    laser.body.onWorldBounds = true;
    this.physics.world.on("worldbounds", (body) => {
      if (body.gameObject === laser) {
        laser.destroy(); // Remove the laser when it collides with the world boundaries
      }
    }, this);
    // Configurar colisiones
    this.physics.add.collider(
      laser,
      this.shapesGroup,
      this.collectShape,
      null,
      this
    );

    // agregar colisiones a los bordes para eliminar el laser
  }

  collectShape(laser, shape) {
    console.log("colecta forma");
    shape.destroy();
    laser.destroy();

    if (shape.texture.key === "meteorito") {
      this.scoreM++;
    }
    if (shape.texture.key === "estrella") {
      this.scoreE++;
    }
    if (shape.texture.key=== "satelite"){
      this.scoreS++;
    }
    this.updateScoreText();
  }

  updateScoreText() {
    this.scoreTextM.setText(`🌑: ${this.scoreM}/2`);
    this.scoreTextE.setText(`⭐: ${this.scoreE}/2`);
    this.scoreTextS.setText(`🛰️: ${this.scoreS}/3`);
  }

  handleCollision(jugador, shape) {
    shape.destroy();
    this.vidas--;

    // Actualizar el texto de las vidas
    this.vidasText.setText(`❤️: ${this.vidas}/3`);

    if (this.vidas <= 0) {
      // Si se quedan sin vidas, puedes hacer algo aquí, como llamar a una función de Game Over.
      // Por ejemplo:
      this.gameOver();
    }
  }

  gameOver() {
    // Aquí puedes realizar acciones cuando el jugador pierda todas las vidas.
    // Puedes reiniciar el juego, mostrar un mensaje de game over, etc.
    this.scene.start("derrota") // Por ejemplo, iniciar la escena de derrota.
  }
}

