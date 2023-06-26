export default class Victoria extends Phaser.Scene {
  constructor(){
      super("victoria")
  }
  preload(){
    this.load.image("win","./public/images/victoria.png")

  }
  create(){
      this.add.image(400, 300,"win")
          .setScale()
          .setInteractive()
          .on('pointerdown', () => this.scene.start('escena2')); ;
  }
}