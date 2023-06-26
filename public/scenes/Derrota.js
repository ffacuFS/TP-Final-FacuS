export default class Derrota extends Phaser.Scene {
  constructor(){
      super("derrota")
  }
  preload(){
    this.load.image("derrota", "./public/images/derrota.jpg");

  }
  create(){
    this.add.image(400, 300, "derrota")
    .setScale()
    .setInteractive()
    .on('pointerdown', () => this.scene.start("selecnivel"));
  }
}