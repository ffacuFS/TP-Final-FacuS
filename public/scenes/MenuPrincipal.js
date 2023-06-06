export default class MenuPrincipal extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("menuprincipal");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("btnjugar", "./public/images/jugar.png");
  }

  create() {
    // create game objects
    const btnjugar = this.add
      .image(400, 300, "btnjugar")
      .setScale(0.5)
      .setInteractive();

    btnjugar.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer";
    });
    btnjugar.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });
    btnjugar.on("pointerdown", () => {
      this.scene.start("escena1");
    });
  }

  update() {
    // update game objects
  }
}
