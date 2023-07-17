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
    this.defeat = false;
    this.timerPaused = false;
    this.vidas = 3;
    this.shootSound = null;

  }

  preload() {
    // load assets
    this.load.image("escena1", "./public/images/escena3.jpg");
    this.load.image("nave", "./public/images/nave.png");
    this.load.image("meteorito", "./public/images/meteorito.png");
    this.load.image("estrella", "./public/images/estrella.png");
    this.load.image("laser", "./public/images/laser.png");
    this.load.image("pantpausa","./public/images/pantallapausa.png");
    this.load.image("continuar","./public/images/btn_continuar.png");
    this.load.image("btnreiniciar","./public/images/btnreinicar.png");
    this.load.image("btnpausa","./public/images/btnpausa.png");
    this.load.audio("sonidodisparo","./public/sounds/laser4.wav", {
      instances: 1
    });
    this.load.spritesheet("navederecha","./public/images/nave-derecha82x82.png", {
      frameWidth: 82,
      frameHeight: 82
    });
    this.load.spritesheet("naveizquierda","./public/images/nave-izquierda82x82.png",{
      frameWidth: 82,
      frameHeight: 82
    });
    this.load.spritesheet("navesalto","./public/images/navesalto-sheet82x82.png",{
      frameWidth: 82,
      frameHeight: 82
    });
    this.load.spritesheet("explosion","./public/images/explosion-sheet82x82.png",{
      frameHeight:82,
      frameWidth:82
    });
    }

  create() {
    // create game objects
    this.add.image(400, 300, "escena1");
    this.add.image("meteorito");
    this.add.image("estrella");

    
    this.shapesGroup = this.physics.add.group();

    this.jugador = this.physics.add
      .sprite(400, 500, "nave")
    this.jugador.setBounce(0);
    this.jugador.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.shapesGroup,
      this.laserGroup,
      this.collectShape.bind(this)
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
      delay: 1500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.timerEvent = this.time.addEvent({
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
    this.scoreTextM = this.add.text(20, 20, `🌑: ${this.scoreM}/4`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreE = 0;
    this.scoreTextE = this.add.text(20, 50, `⭐: ${this.scoreE}/4`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.btnPausa = this.add.sprite(750, 50, "btnpausa").setInteractive().setScale(0.6);
    this.btnPausa.setDepth(4);
    this.btnPausa.on("pointerdown", () => this.pausarjuego(), this)

    this.anims.create({
      key: "nave_right",
      frames: this.anims.generateFrameNumbers("navederecha", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "nave_left",
      frames: this.anims.generateFrameNumbers("naveizquierda", {start:1, end:3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "nave_up",
      frames: this.anims.generateFrameNumbers("navesalto", {start:1, end:3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: 0, 
      hideOnComplete: true
    });
    this.sound.mute = false;
    this.sonidoDisparo = this.sound.add("sonidodisparo");

  }
  
  update() {
    // si los dos marcadores son mayores a 2, se gana el juego
    if (this.scoreM >= 4 && this.scoreE >= 4) {
      this.scene.start("victoria");
    }

    if (this.defeat) {
      this.scene.start("derrota");
    }
    
    // update game objects
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(250);
    } else {
      this.jugador.setVelocityX(0);
    }
    if (this.cursors.up.isDown) {
     this.jugador.setVelocityY(-250);
    } else if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(160);
    } else {
      this.jugador.setVelocityY(0);
    } 

    if (this.cursors.up.isDown) {
      this.jugador.anims.play("nave_up", true);
    } else if (this.cursors.left.isDown) {
      this.jugador.anims.play("nave_left", true);
    } else if (this.cursors.right.isDown) {
      this.jugador.anims.play("nave_right", true);
    } else {
      this.jugador.anims.stop(true); // Detiene la animación cuando no se presiona ninguna tecla
    }
    if (Phaser.Input.Keyboard.JustDown(this.fireButton)) {
      this.shoot();
    }
  }

  addShape() {
    const randomShape = Phaser.Math.RND.pick(["meteorito", "estrella"]);
    const randomX = Phaser.Math.Between(0, 800);

    const shape = this.physics.add.image(randomX, 0, randomShape).setScale(0.8);
    shape.setCollideWorldBounds(true);
    shape.body.setAllowGravity(false);
    this.shapesGroup.add(shape);
    shape.body.setGravityY(100);

    //console.log("shape is added", randomX, randomShape);
  }

  onSecond() {
    if (!this.timerPaused) {
      this.timer--;
      this.timerText.setText(this.timer);
      if (this.timer === 0) {
        this.defeat = true;
      }
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
      this.sonidoDisparo.play();

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
    this.updateScoreText();
  }

  updateScoreText() {
    this.scoreTextM.setText(`🌑: ${this.scoreM}/4`);
    this.scoreTextE.setText(`⭐: ${this.scoreE}/4`);
  }

  handleCollision(jugador, shape) {
    shape.destroy();
    this.vidas--;

    const explosion = this.add.sprite(jugador.x, jugador.y, "explosion");
  explosion.play("explosion_anim");

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
    this.scene.start("derrota"); // Por ejemplo, iniciar la escena de derrota.
  }

  pausarjuego() {
    // Create the "Continuar" button
    this.reanudar = this.add.sprite(409, 320, "continuar").setScale(2);
    this.reanudar.setInteractive();
    this.reanudar.on("pointerdown", () => this.reanudarJuego(), this);
    this.reanudar.setDepth(4);
    this.reanudar.setVisible(true).setActive(true);
  
    // Create the "Reiniciar" button
    this.reiniciar = this.add.sprite(409, 376, "btnreiniciar").setScale(2);
    this.reiniciar.setInteractive();
    this.reiniciar.on("pointerdown", () => this.reiniciarJuego(), this);
    this.reiniciar.setDepth(4);
    this.reiniciar.setVisible(true).setActive(true);
  
    // Create the pause overlay
    this.pantallaPausa = this.add.image(400, 300, "pantpausa").setVisible(true).setScale(2);
    this.pantallaPausa.setDepth(3);
  
    // Pause the game and bring the pause overlay to the top
    this.physics.pause();
    this.timerPaused = true;
    this.scene.bringToTop();
    
    this.pausado = true;
  }
  
  reanudarJuego() {
    // Remove the pause elements
    this.reanudar.destroy();
    this.reiniciar.destroy();
    this.pantallaPausa.setVisible(false);
  
    // Resume the game
    this.physics.resume();
    this.timerPaused = false;
    this.pausado = false;
  }
  
  reiniciarJuego() {
    // Restart the scene
    this.scene.restart();
    this.pausado = false;
  }
  
}
