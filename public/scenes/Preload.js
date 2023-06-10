
export default class Preload extends Phaser.Scene {
    // escena para optimiozar tiempos
    // carga el preload solo una vez y sirve para todo el juego
    constructor() {
      // key of the scene
      super("preload");
    }
  
    preload() {
      // load assets
      
      };
  
      create (){
        this.scene.start("menuprincipal");
      }
    }