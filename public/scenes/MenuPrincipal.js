export default class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super("menuprincipal"); // Sets the key of the scene
  }

  init() {
    // Initialization method, called before the scene is created
    // You can initialize variables and access data passed from other scenes
  }

  preload() {
    // Preload method, used to load game assets
    this.load.image("btnjugar", "./public/images/jugar.png"); // Loads an image asset with the key "btnjugar"
    this.load.image("menu", "./public/images/MenuPRINCIPAL.jpg");
    this.load.image("logo","./public/images/logo.png") // Loads an image asset with the key "menu"
  }

  create() {
    // Create method, called when the scene is created
    const menuImage = this.add.image(400, 300, "menu");
    menuImage.setInteractive(); // Enables input interaction on the image

    menuImage.on('pointerdown', () => {
      this.scene.start('selecnivel'); // Starts the 'escena1' scene when the image is clicked
    });

    this.add.image(390,270,"logo").setScale();
    
    // Adds text to the scene at position (200, 300) with the specified style
  }

  update() {
    // Update method, called in the game loop for continuous updates
    // You can update game objects and perform logic here
  }
}
