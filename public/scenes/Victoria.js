export default class Victoria extends Phaser.Scene {
  constructor(){
      super("victoria")
  }
  preload(){
    this.load.image("win","./public/images/victoria.jpg")

  }
  create(){
      this.add.image(400, 300,"win")
          .setScale(2.5)
          .setInteractive()
          .on('pointerdown', () => this.scene.start('menuprincipal')); ;
  }
}