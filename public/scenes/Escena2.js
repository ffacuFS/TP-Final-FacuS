export default class Escena2 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("escena2");
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
    this.load.image("escena2", "./public/images/escena2.jpg");
    this.load.image("nave", "./public/images/nave.png");
    this.load.image("meteorito", "./public/images/Meteorito.png");
    this.load.image("estrella", "./public/images/estrella.png");
    this.load.image("laser", "./public/images/laser.png");
    this.load.image("satelite","./public/images/satelite.png");
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
    this.add.image(400, 300, "escena2");
    this.add.image("meteorito");
    this.add.image("estrella");
    this.add.image("satelite");

    this.shapesGroup = this.physics.add.group();

    this.jugador = this.physics.add
      .sprite(400, 500, "nave");
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(false);

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

    this.timer = 60;
    this.timerText = this.add.text(380, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.scoreM = 0;
    this.scoreTextM = this.add.text(20, 20, `🌑: ${this.scoreM}/6`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreE = 0;
    this.scoreTextE = this.add.text(20, 50, `⭐: ${this.scoreE}/6`, {
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

    this.btnPausa = this.add.sprite(750, 50, "btnpausa").setInteractive().setScale(0.8);
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
    if (this.scoreM >= 6 && this.scoreE >= 6) {
      this.scene.start("fin");
    }
    if (this.scoreS === 3){
      this.scene.start("derrota");
    }

    if (this.defeat ) {
      this.scene.start("derrota");
    }
    
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(250);
    } else {
      this.jugador.setVelocityX(0);
    }
    if (this.cursors.up.isDown){
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
      this.jugador.anims.stop(true); 
    }
    if (Phaser.Input.Keyboard.JustDown(this.fireButton)) {
      this.shoot();
    }
  }


  addShape() {
    const randomShape = Phaser.Math.RND.pick(["meteorito", "estrella","satelite"]);
    const randomX = Phaser.Math.Between(0, 800);

    const shape = this.physics.add.image(randomX, 0, randomShape).setScale(0.8);
    shape.setCollideWorldBounds(true);
    shape.body.setAllowGravity(false);
    this.shapesGroup.add(shape);
    shape.body.setGravityY(100);

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
        laser.destroy(); 
      }
    }, this);
    this.physics.add.collider(
      laser,
      this.shapesGroup,
      this.collectShape,
      null,
      this
    );
    this.sonidoDisparo.play();
 
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
    this.scoreTextM.setText(`🌑: ${this.scoreM}/6`);
    this.scoreTextE.setText(`⭐: ${this.scoreE}/6`);
    this.scoreTextS.setText(`🛰️: ${this.scoreS}/3`);
  }

  handleCollision(jugador, shape) {
    shape.destroy();
    this.vidas--;
    const explosion = this.add.sprite(jugador.x, jugador.y, "explosion");
    explosion.play("explosion_anim");
    this.vidasText.setText(`❤️: ${this.vidas}/3`);

    if (this.vidas <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.scene.start("derrota") 
  }
  pausarjuego() {
    this.reanudar = this.add.sprite(409, 320, "continuar").setScale(2);
    this.reanudar.setInteractive();
    this.reanudar.on("pointerdown", () => this.reanudarJuego(), this);
    this.reanudar.setDepth(4);
    this.reanudar.setVisible(true).setActive(true);
  
    this.reiniciar = this.add.sprite(409, 376, "btnreiniciar").setScale(2);
    this.reiniciar.setInteractive();
    this.reiniciar.on("pointerdown", () => this.reiniciarJuego(), this);
    this.reiniciar.setDepth(4);
    this.reiniciar.setVisible(true).setActive(true);
  
    this.pantallaPausa = this.add.image(400, 300, "pantpausa").setVisible(true).setScale(2);
    this.pantallaPausa.setDepth(3);
  
    this.physics.pause();
    this.timerPaused = true;
    this.scene.bringToTop();
    
    this.pausado = true;
  }
  
  reanudarJuego() {
    this.reanudar.destroy();
    this.reiniciar.destroy();
    this.pantallaPausa.setVisible(false);
  
    this.physics.resume();
    this.timerPaused = false;
    this.pausado = false;
  }
  
  reiniciarJuego() {
    this.scene.restart();
    this.pausado = false;
  }
}


