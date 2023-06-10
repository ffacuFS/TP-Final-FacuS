
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

  }

  preload() {
    // load assets
    this.load.image("espacio", "./public/images/espacio.jpg");
    this.load.image("nave","./public/images/nave.jpg");
    this.load.image("meteorito","./public/images/meteorito.jpg");
    this.load.image("estrella","./public/images/estrella.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "espacio");
    this.add.image("meteorito");
    this.add.image("estrella");

    this.shapesGroup = this.physics.add.group();
    this.shapesGroup.create(this.add.image( "meteorito").setScale(0.3));
    this.shapesGroup.create(this.add.image( "estrella").setScale(0.3));

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

    this.timer = 50;
    this.timerText = this.add.text(750, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    this.scoreM=0;
    this.scoreText= this.add.text(20,20, "M: ", {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });
    this.scoreE=0;
    this.scoreText=this.add.text(20,50,"E: ",{
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#FFFFFF", 
    })

    this.jugador = this.physics.add
      .sprite(500, 400, "nave")
      .setScale(0.3)
      .refreshBody();
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.score>200) {
      this.scene.start("win");
    }

    if(this.defeat){
      this.scene.start("derrota")
      
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
  }

  addShape() {
  const randomShape = Phaser.Math.RND.pick(["meteorito", "estrella"]);
  const randomX = Phaser.Math.Between(0, 800);

  const shape = this.add.image(randomX, 0, randomShape).setScale(0.3);
  this.shapesGroup.add(shape);
  shape.body.setGravityY(-150);

  console.log("shape is added", randomX, randomShape);

  }

  onSecond(){
    this.timer--;
    this.timerText.setText(this.timer);
    if(this.timer == 0){
      this.defeat = true;
    }
  }

}
